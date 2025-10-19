extends DV_RadarGraph

func _ready() -> void:
    set_layer_count(5)
    set_rotate_labels_to_center(true)
    set_show_grid(true)
    set_show_labels(true)
    set_show_points(true)

    set_min_value(0.0)
    set_max_value(100.0)

    set_categories(PackedStringArray([
        "Stealth",
        "Lockpicking",
        "Crafting",
        "Combat",
        "Acrobatics"
    ]))

    set_data_points(PackedFloat32Array([72.0, 65.0, 48.0, 55.0, 83.0]))
