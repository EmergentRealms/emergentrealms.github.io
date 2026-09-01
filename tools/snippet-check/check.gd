extends SceneTree

const DIR := "res://docscheck"
const BUILTIN := ["if","for","while","return","print","match","range","max","min","clamp",
	"await","assert","preload","pass","elif","var","str","push_error","push_warning"]

func _init() -> void:
	var files := []
	var d := DirAccess.open(DIR)
	for f in d.get_files():
		if f.ends_with(".gd") and f != "check.gd": files.append(f)
	files.sort()
	var n := 0
	for f in files: n += _check(DIR + "/" + f, f)
	print("\n%d problem(s)" % n)
	quit(1 if n > 0 else 0)

func _members(cls: String, kind: String) -> Dictionary:
	var out := {}
	var l: Array
	match kind:
		"m": l = ClassDB.class_get_method_list(cls)
		"p": l = ClassDB.class_get_property_list(cls)
		"s": l = ClassDB.class_get_signal_list(cls)
	for x in l: out[x["name"]] = x
	return out

func _check(path: String, name: String) -> int:
	var src := FileAccess.get_file_as_string(path)
	var out := []
	var lines := src.split("\n")

	var tabs := 0; var spaces := 0
	for l in lines:
		if l.begins_with("\t"): tabs += 1
		elif l.begins_with("    "): spaces += 1
	if tabs > 0 and spaces > 0:
		out.append("MIXED INDENTATION (%d tab / %d space lines) - will not parse" % [tabs, spaces])

	var base := ""
	var m := RegEx.create_from_string("(?m)^extends\\s+(\\w+)").search(src)
	if m: base = m.get_string(1)
	if not ClassDB.class_exists(base):
		out.append("unknown base class '%s'" % base); _report(name, out); return out.size()

	# things declared in this file
	var local := {}
	for c in RegEx.create_from_string("(?m)^func\\s+([a-z_][A-Za-z0-9_]*)").search_all(src):
		local[c.get_string(1)] = true
	for c in RegEx.create_from_string("(?m)var\\s+([a-z_][A-Za-z0-9_]*)").search_all(src):
		local[c.get_string(1)] = true
	for c in RegEx.create_from_string("(?m)^const\\s+([A-Za-z_][A-Za-z0-9_]*)").search_all(src):
		local[c.get_string(1)] = true

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

	# signal connect + handler arity
	for c in RegEx.create_from_string("(?m)^[ \\t]*([a-z_][a-z0-9_]*)\\.connect\\((\\w+)\\)").search_all(src):
		var sn := c.get_string(1); var h := c.get_string(2)
		if not sigs.has(sn):
			out.append("no signal %s.%s" % [base, sn]); continue
		var want: int = sigs[sn]["args"].size()
		var hm := RegEx.create_from_string("(?m)^func\\s+%s\\s*\\(([^)]*)\\)" % h).search(src)
		if hm:
			var a := hm.get_string(1).strip_edges()
			var got := 0 if a == "" else a.split(",").size()
			if got != want:
				var names := []
				for x in sigs[sn]["args"]: names.append(x["name"])
				out.append("signal %s.%s has %d args %s, handler %s takes %d" % [base, sn, want, names, h, got])

	for c in RegEx.create_from_string("\\b(DV_?[A-Za-z][A-Za-z0-9_]*)\\.([A-Za-z_][A-Za-z0-9_]*)").search_all(src):
		var cls := c.get_string(1); var mem := c.get_string(2)
		if mem == "new" or local.has(cls): continue
		if not ClassDB.class_exists(cls):
			out.append("unknown class %s (used as %s.%s)" % [cls, cls, mem]); continue
		if mem == mem.to_upper() and mem != mem.to_lower():
			if ClassDB.class_get_integer_constant_list(cls, false).find(mem) == -1:
				out.append("no constant %s.%s" % [cls, mem])
		elif not (_members(cls,"m").has(mem) or _members(cls,"s").has(mem) or _members(cls,"p").has(mem)):
			out.append("no member %s.%s" % [cls, mem])

	# properties set on a locally constructed addon object:  x := DV_Field.new() ... x.foo =
	for c in RegEx.create_from_string("(?m)([a-z_][A-Za-z0-9_]*)\\s*:?=\\s*(DV_?[A-Za-z0-9_]+)\\.new\\(\\)").search_all(src):
		var v := c.get_string(1); var cls := c.get_string(2)
		if not ClassDB.class_exists(cls): continue
		var cp := _members(cls, "p"); var cm := _members(cls, "m")
		for a in RegEx.create_from_string("(?m)^[ \\t]*%s\\.([a-z_][a-z0-9_]*)\\s*=[^=]" % v).search_all(src):
			var pn := a.get_string(1)
			if not (cp.has(pn) or cm.has(pn)):
				out.append("no property %s.%s (on local '%s')" % [cls, pn, v])
	_report(name, out)
	return out.size()

func _report(name: String, out: Array) -> void:
	if out.is_empty(): print("  ok    %s" % name)
	else:
		print("  FAIL  %s" % name)
		for o in out: print("          - %s" % o)
