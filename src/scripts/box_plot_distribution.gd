extends DV_BoxPlot

func _ready() -> void:
    set_title("Quarterly Returns")
    set_y_axis_label("% Delta")
    set_categories(["Tech", "Health", "Energy"])

    add_series("Tech", PackedFloat32Array([2, 5, 7, 1, 9, 4, 6, 8, 3, 10]))
    add_series("Health", PackedFloat32Array([1, 2, 2, 3, 4, 4, 5, 6, 7, 9]))
    add_series("Energy", PackedFloat32Array([-2, 0, 1, 3, 3, 4, 8]))

    set_show_outliers(true)
    set_gap_group(12.0)
    set_box_width_frac(0.55)

    box_clicked.connect(_on_box_clicked)

func _on_box_clicked(group_idx: int, median: float) -> void:
    print("Median for", get_categories()[group_idx], "=", median)
