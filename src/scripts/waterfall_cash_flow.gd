extends DV_Waterfall

func _ready() -> void:
    set_title("Monthly Cash Flow")
    set_bar_gap_px(8.0)
    set_value_format(DVComponent.COMPACT)

    var labels := PackedStringArray([
        "Starting Balance",
        "Sales",
        "Refunds",
        "Logistics",
        "Marketing",
        "Subscriptions",
        "Taxes"
    ])

    var deltas := PackedFloat32Array([120000.0, 45000.0, -12000.0, -8000.0, -5000.0, 22000.0, -18000.0])
    set_categories(labels)
    add_series("Δ Cash", deltas)

    set_show_value_labels(true)
