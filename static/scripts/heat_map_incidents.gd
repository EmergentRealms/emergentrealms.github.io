extends DV_HeatMap

const REGION_ORIGIN := Vector2(-2000, -1000)
const REGION_SIZE := Vector2(4000, 3000)
const REGION_MAP := preload("res://maps/city_floorplan.png")

const INCIDENTS := [
    ["Theft", "Market wallet", Vector2(300, 200), 0.2],
    ["Smuggling", "Pier three crates", Vector2(-1500, -180), 0.6],
    ["Assault", "Tavern brawl", Vector2(480, 420), 0.4],
    ["Theft", "Tavern break-in", Vector2(490, 410), 0.8],
]

func _ready() -> void:
    set_background_texture(REGION_MAP)
    set_texture_fit_mode(DV_HeatMap.FIT_CONTAIN)
    set_world_region(REGION_ORIGIN, REGION_SIZE)
    set_point_radius(24.0)
    set_autoscale(true)

    for row in INCIDENTS:
        add_point(row[0], row[1], row[2], row[3])

    # Signals
	point_hovered.connect(_on_point_moused_over)
	point_clicked.connect(_on_point_clicked)

func _on_point_moused_over(idx:int, id:String, event_type:String, tooltip:String, pos:Vector2, intensity:float) -> void:
	print("Hover #", idx, " | ", event_type, " | ", tooltip, " @ ", pos, " (", "%.2f" % intensity, ")")

func _on_point_clicked(idx:int, id:String,  event_type:String, tooltip:String, pos:Vector2, intensity:float) -> void:
	print("Click  #", idx, " | ", event_type, " | ", tooltip, " @ ", pos, " (", "%.2f" % intensity, ")")
