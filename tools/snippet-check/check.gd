extends SceneTree

## Resolves every symbol in the site's documentation snippets against ClassDB.
##
## Whole-file snippets (those with an `extends`) get the full treatment: methods,
## properties and signals are resolved against the base class, and each signal's
## arity is compared to the handler that connects to it. Fragments -- most of the
## snippets in the docs -- skip the self.* resolution, because there is no self,
## but still get the class-member, constant and indentation checks.

const DIR := "res://docscheck"

const BUILTIN := ["if", "for", "while", "return", "print", "match", "range", "max", "min",
	"clamp", "await", "assert", "preload", "pass", "elif", "var", "str", "push_error",
	"push_warning", "type_string", "load"]

## Autoloads and engine singletons: real at runtime, invisible to ClassDB.
## Each maps to the class whose members it actually exposes.
const GLOBALS := {
	"DV_ThemeManager": "DVThemeManager",
	"DataWiz": "DWService",
}

func _init() -> void:
	var files: Array[String] = []
	var d := DirAccess.open(DIR)
	for f in d.get_files():
		if f.ends_with(".gd") and f not in ["check.gd", "run.gd"]:
			files.append(f)
	files.sort()

	var problems := 0
	for f in files:
		problems += _check(DIR + "/" + f, f)
	print("\n%d problem(s)" % problems)
	quit(1 if problems > 0 else 0)

func _members(cls: String, kind: String) -> Dictionary:
	var out := {}
	var l: Array
	match kind:
		"m": l = ClassDB.class_get_method_list(cls)
		"p": l = ClassDB.class_get_property_list(cls)
		"s": l = ClassDB.class_get_signal_list(cls)
	for x in l:
		out[x["name"]] = x
	return out

func _resolve(cls: String) -> String:
	return GLOBALS.get(cls, cls)

func _check(path: String, name: String) -> int:
	var src := FileAccess.get_file_as_string(path)
	var out: Array[String] = []

	var tabs := 0
	var spaces := 0
	for l in src.split("\n"):
		if l.begins_with("\t"): tabs += 1
		elif l.begins_with("    "): spaces += 1
	if tabs > 0 and spaces > 0:
		out.append("MIXED INDENTATION (%d tab / %d space lines) - will not parse" % [tabs, spaces])

	var m := RegEx.create_from_string("(?m)^extends\\s+(\\w+)").search(src)
	var base := m.get_string(1) if m else ""
	var fragment := base == ""
	if not fragment and not ClassDB.class_exists(base):
		out.append("unknown base class '%s'" % base)
		_report(name, out)
		return out.size()

	# names declared inside this snippet
	var local := {}
	for c in RegEx.create_from_string("(?m)^func\\s+([a-z_][A-Za-z0-9_]*)").search_all(src):
		local[c.get_string(1)] = true
	for c in RegEx.create_from_string("var\\s+([a-z_][A-Za-z0-9_]*)").search_all(src):
		local[c.get_string(1)] = true
	for c in RegEx.create_from_string("(?m)^const\\s+([A-Za-z_][A-Za-z0-9_]*)").search_all(src):
		local[c.get_string(1)] = true

	if not fragment:
		var methods := _members(base, "m")
		var props := _members(base, "p")
		var sigs := _members(base, "s")

		for c in RegEx.create_from_string("(?m)^[ \\t]+([a-z_][a-z0-9_]*)[ \\t]*\\(").search_all(src):
			var n := c.get_string(1)
			if n in BUILTIN or local.has(n) or methods.has(n): continue
			out.append("no method %s.%s()" % [base, n])

		for c in RegEx.create_from_string("(?m)^[ \\t]+([a-z_][a-z0-9_]*)[ \\t]*=[^=]").search_all(src):
			var n := c.get_string(1)
			if local.has(n) or props.has(n) or methods.has(n): continue
			out.append("no property %s.%s" % [base, n])

		for c in RegEx.create_from_string("(?m)^[ \\t]*([a-z_][a-z0-9_]*)\\.connect\\((\\w+)\\)").search_all(src):
			var sn := c.get_string(1)
			var h := c.get_string(2)
			if not sigs.has(sn):
				out.append("no signal %s.%s" % [base, sn])
				continue
			var hm := RegEx.create_from_string("(?m)^func\\s+%s\\s*\\(([^)]*)\\)" % h).search(src)
			if hm == null: continue
			var a := hm.get_string(1).strip_edges()
			var got := 0 if a == "" else a.split(",").size()
			var want: int = sigs[sn]["args"].size()
			if got != want:
				var names := []
				for x in sigs[sn]["args"]: names.append(x["name"])
				out.append("signal %s.%s has %d args %s, handler %s takes %d" % [base, sn, want, names, h, got])

	# Class.member and Autoload.member, in fragments too
	for c in RegEx.create_from_string("\\b(DV_?[A-Za-z][A-Za-z0-9_]*|DataWiz|DW[A-Za-z][A-Za-z0-9_]*)\\.([A-Za-z_][A-Za-z0-9_]*)").search_all(src):
		var raw := c.get_string(1)
		var mem := c.get_string(2)
		if mem == "new" or local.has(raw): continue
		var cls := _resolve(raw)
		if not ClassDB.class_exists(cls):
			out.append("unknown class %s (used as %s.%s)" % [raw, raw, mem])
			continue
		if mem == mem.to_upper() and mem != mem.to_lower():
			if Array(ClassDB.class_get_integer_constant_list(cls, false)).find(mem) == -1:
				out.append("no constant %s.%s" % [raw, mem])
		elif not (_members(cls, "m").has(mem) or _members(cls, "s").has(mem) or _members(cls, "p").has(mem)):
			out.append("no member %s.%s" % [raw, mem])

	# properties set on a locally constructed addon object
	for c in RegEx.create_from_string("(?m)([a-z_][A-Za-z0-9_]*)\\s*:?=\\s*(DV_?[A-Za-z0-9_]+|DW[A-Za-z0-9_]+)\\.new\\(\\)").search_all(src):
		var v := c.get_string(1)
		var cls := c.get_string(2)
		if not ClassDB.class_exists(cls): continue
		var cp := _members(cls, "p")
		var cm := _members(cls, "m")
		for a in RegEx.create_from_string("(?m)^[ \\t]*%s\\.([a-z_][a-z0-9_]*)\\s*=[^=]" % v).search_all(src):
			var pn := a.get_string(1)
			if not (cp.has(pn) or cm.has(pn)):
				out.append("no property %s.%s (on local '%s')" % [cls, pn, v])

	_report(name, out)
	return out.size()

func _report(name: String, out: Array) -> void:
	if out.is_empty():
		print("  ok    %s" % name)
	else:
		print("  FAIL  %s" % name)
		for o in out:
			print("          - %s" % o)
