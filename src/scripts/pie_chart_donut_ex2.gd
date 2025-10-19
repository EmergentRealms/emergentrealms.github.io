extends DV_PieChart

func _ready() -> void:
	set_center_title("9,204")
	set_center_subtitle("Active Users")
	
	set_categories(PackedStringArray(["Desktop", "Tablet", "Mobile"]))
	add_series("Users", PackedFloat32Array([5204.0, 1510.0, 2490.0]))
	
	#bring out the labels
	label_inside = false

	slice_clicked.connect(_on_slice_clicked)

func _on_slice_clicked(index: int, category: String, value: float) -> void:
	print("Clicked", category, value)
