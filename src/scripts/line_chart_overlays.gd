extends DV_LineChart

var rng := RandomNumberGenerator.new()

func _ready() -> void:
    set_title("Weekly Revenue")
    set_y_axis_label("Credits")
    set_x_axis_label("Week")
    set_value_format(DVComponent.CURRENCY)

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

    var mask := DVChart.OVL_SMA | DVChart.OVL_EMA
    var series_index := add_series_with_overlays("Revenue", values, mask, 3, 5, 0, 0.0)
    set_series_filled(series_index, true)
    set_show_points(true)
