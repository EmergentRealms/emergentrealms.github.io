extends DV_KPI_Tile

func _ready() -> void:
    custom_minimum_size = Vector2(280, 150)
    set_title("Daily Revenue")
    set_value(12843.0)
    set_prefix("$")
    set_delta(+3.8)
    set_suffix("")
    set_subtitle("Last 24h")
    set_footnote("vs. yesterday")

    set_sparkline(PackedFloat32Array([0.18, 0.24, 0.21, 0.33, 0.29, 0.37, 0.43, 0.4]))
    tile_clicked.connect(_on_tile_clicked)

func _on_tile_clicked() -> void:
    print("Open revenue dashboard")
