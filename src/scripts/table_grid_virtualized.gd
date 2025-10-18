extends DV_Grid

func _ready() -> void:
    set_columns(PackedStringArray(["Item", "SKU", "Category", "Location"]))
    set_data([
        ["Wheat Flour", "SKU-1024", "Food", "Aisle A"],
        ["Steel Nails", "SKU-2048", "Hardware", "Yard"],
        ["Copper Wire", "SKU-3072", "Hardware", "Aisle C"],
        ["Healing Potion", "SKU-4096", "Alchemy", "Stall 4"],
    ])

    set_sortable(true)
    set_keyboard_nav_enabled(true)
    cell_clicked.connect(_on_cell_clicked)

func _on_cell_clicked(row: int, col: int) -> void:
    print("Row", row, "Col", col, "=", get_data()[row][col])
