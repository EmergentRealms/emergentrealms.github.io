extends SceneTree

# Actually parses and runs every website snippet against the live addon.
# preload()s of illustrative assets are swapped for a placeholder so the
# snippet itself is what gets tested, not the missing art.

const DIR := "res://docscheck"

func _init() -> void:
	var ph := PlaceholderTexture2D.new()
	ph.size = Vector2(64, 64)
	var files := []
	var d := DirAccess.open(DIR)
	for f in d.get_files():
		if f.ends_with(".gd") and f not in ["check.gd", "run.gd"]: files.append(f)
	files.sort()

	var bad := 0
	for f in files:
		var src := FileAccess.get_file_as_string(DIR + "/" + f)
		var base := RegEx.create_from_string("(?m)^extends\\s+(\\w+)").search(src).get_string(1)
		# stub the illustrative preloads
		src = RegEx.create_from_string("preload\\([^)]*\\)").sub(src, "PLACEHOLDER", true)
		var ins := src.find("\n", src.find("extends "))
		src = src.insert(ins, "\nconst PLACEHOLDER = null")
		var gd := GDScript.new()
		gd.source_code = src
		var err := gd.reload()
		if err != OK:
			print("  PARSE FAIL  %s (err %d)" % [f, err]); bad += 1; continue
		if not ClassDB.class_exists(base) or not ClassDB.can_instantiate(base):
			print("  skip        %s (cannot instantiate %s)" % [f, base]); continue
		var node = ClassDB.instantiate(base)
		node.set_script(gd)
		var errs_before := 0
		root.add_child(node)          # triggers _ready
		await process_frame
		await process_frame
		print("  ran         %s  (%s)" % [f, base])
		node.queue_free()
		await process_frame
	print("\n%d parse failure(s)" % bad)
	quit(1 if bad > 0 else 0)
