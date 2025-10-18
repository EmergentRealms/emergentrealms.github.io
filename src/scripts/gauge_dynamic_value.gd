extends DV_Gauge

func _ready() -> void:
    set_center_title("Server Load")
    set_unit("%")
    set_min_value(0.0)
    set_max_value(100.0)
    set_sweep_deg(220.0)
    set_round_caps(true)
    set_ticks(5, 3)

    clear_zones()
    add_zone("Normal", Color(0.32, 0.75, 0.45), 0.6)
    add_zone("Warning", Color(0.95, 0.74, 0.26), 0.85)
    add_zone("Critical", Color(0.86, 0.31, 0.28), 1.0)

    set_value(48.0)
    value_changed.connect(_on_value_changed)

func animate_to(value: float) -> void:
    set_value(clamp(value, get_min_value(), get_max_value()))

func _on_value_changed(value: float) -> void:
    var zone_idx := find_zone_at_value(value)
    if zone_idx >= 0:
        var zone := get_zone(zone_idx)
        print("Gauge now", value, "% (", zone["label"], ")")
