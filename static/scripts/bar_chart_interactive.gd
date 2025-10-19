extends DV_BarChart

func _ready() -> void:
    set_categories(["Desktop", "Tablet", "Mobile"])
    add_series("Active Users", PackedFloat32Array([5204.0, 1510.0, 2490.0]))
    add_series("Subscriptions", PackedFloat32Array([1400.0, 600.0, 950.0]))

    set_gaps(16.0, 6.0)
    set_stacked(false)

    bar_clicked.connect(_on_bar_clicked)
    bar_hovered.connect(_on_bar_hovered)

func _on_bar_clicked(series_idx: int, category_idx: int, value: float) -> void:
    var label := get_categories()[category_idx]
    print("Clicked", label, "series", series_idx, "=", value)

func _on_bar_hovered(series_idx: int, category_idx: int, value: float) -> void:
    var label := get_categories()[category_idx]
    print("Hover", label, "series", series_idx, "=", value)
