extends DV_Timeline

func _ready() -> void:
    set_show_grid(true)
    set_grid_step(60.0)

    var main_track := add_track("Main Story")
    var side_track := add_track("Contracts")

    add_event(main_track, 0.0, 240.0, "Prologue", Color(0.24, 0.56, 0.85), {})
    add_event(main_track, 240.0, 540.0, "Siege", Color(0.78, 0.32, 0.28), {})
    add_event(main_track, 540.0, 720.0, "Council", Color(0.32, 0.75, 0.45), {})

    add_event(side_track, 120.0, 300.0, "Gather Intel", Color(0.58, 0.5, 0.82), {})
    add_event(side_track, 360.0, 480.0, "Escort Caravan", Color(0.4, 0.65, 0.92), {})

    set_time_range(0.0, 720.0)
    set_now_enabled(true)
    set_now_time(360.0)

    event_clicked.connect(_on_event_clicked)

func _on_event_clicked(track: int, index: int, start: float, end: float, label: String, meta: Dictionary) -> void:
    print("Clicked", label, "from", start, "to", end)
