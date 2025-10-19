extends DV_LineChart

var rng := RandomNumberGenerator.new()

func _ready() -> void:
	set_title("Weekly Revenue")
	set_y_axis_label("Rev")
	set_x_axis_label("Week")
	set_value_format(DVComponent.DECIMAL)

	var labels := PackedStringArray()
	for i in range(1, 13):
		labels.push_back("W" + str(i))
	set_categories(labels)

	rng.randomize()
	var baseline := 800.0
	var values := PackedFloat32Array()
	for i in labels.size():
		var drift := i * 45.0
		var noise := rng.randf_range(-70.0, 110.0)
		values.push_back(max(baseline + drift + noise, 0.0))

	var series_index := add_series("Revenue", values)
	set_series_filled(series_index, true)
