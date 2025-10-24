extends DV_HeatMap

const REGION_ORIGIN := Vector2(0, 0)
const REGION_SIZE   := Vector2(1100, 800)

# Sample incidents (unchanged)
const INCIDENTS := [
	["Theft",     "Wallet lifted @ market",     Vector2( 300,  200), 0.2],
	["Smuggling", "Crates offloaded @ pier 3",  Vector2( 180,  120), 0.6],
	["Assault",   "Brawl near tavern",          Vector2( 480,  420), 0.4],
	["Theft",     "Break-in near tavern",       Vector2( 490,  410), 0.8],
]

# Icons
const BUILDING        = preload("uid://bsulqcqpddmex")
const HOME            = preload("uid://c3b2bnxy7p3b2")
const IDENTIFICATION  = preload("uid://cudv1kkixj1s7")
const INDUSTRY        = preload("uid://c54ecbnpjcvna")
const LOCATION        = preload("uid://bsukjqjog3inr")
const NPC             = preload("uid://cb5rqg8nt3wdy")
const PLAYER          = preload("uid://c15n0y6l7jsd7")
const POLICE          = preload("uid://cvwjsiknmerdp")

# ---- config for scatter ----------------------------------------------------
const STICKER_SET := [
	{ "tex": BUILDING, "label": "Building", "count": 10, "size": Vector2(20,20) },
	{ "tex": HOME,     "label": "Home",     "count":  8, "size": Vector2(20,20) },
	{ "tex": INDUSTRY, "label": "Industry", "count":  6, "size": Vector2(22,22) },
	{ "tex": LOCATION, "label": "POI",      "count":  6, "size": Vector2(18,18) },

	{ "tex": NPC,     "label": "NPC",     "count": 12, "size": Vector2(18,18) },
	{ "tex": PLAYER,  "label": "Player",  "count":  1, "size": Vector2(22,22) },
	{ "tex": POLICE,  "label": "Police",  "count":  4, "size": Vector2(20,20) },
	{ "tex": IDENTIFICATION, "label": "ID", "count": 3, "size": Vector2(16,16) },
]

# Min distance between sticker centers (world units)
const MIN_DIST := 50.0
const EDGE_PADDING := 12.0

# ----------------------------------------------------------------------------

func _ready() -> void:
	set_texture_fit_mode(DV_HeatMap.FIT_CONTAIN)
	set_world_region(REGION_ORIGIN, REGION_SIZE)
	set_point_radius(20.0)
	set_autoscale(true)

	# Heat points
	for row in INCIDENTS:
		add_point(row[0], row[1], row[2], row[3])

	# Scatter stickers across the world bounds
	_scatter_stickers()

	# Signals
	point_hovered.connect(_on_point_hover)
	point_clicked.connect(_on_point_click)
	# Sticker signals in the addon: (idx, label, world_pos, meta)
	sticker_hovered.connect(_on_sticker_hover)
	sticker_clicked.connect(_on_sticker_click)

# --- scatter logic ----------------------------------------------------------

func _scatter_stickers() -> void:
	var rng := RandomNumberGenerator.new()
	rng.randomize()

	var placed: Array[Vector2] = []

	for def in STICKER_SET:
		var tex: Texture2D = def.tex
		var label: String  = def.label
		var count: int     = def.count
		var size_px: Vector2 = def.size

		for i in count:
			var pos := _find_free_position(rng, placed, MIN_DIST, EDGE_PADDING)
			# remember position to enforce spacing
			placed.append(pos)

			var meta :Dictionary = {"group": label}
			add_sticker(label, tex, "%s #%d" % [label, i+1], pos, size_px, meta, true, 0.0, 1.0)
	

# Find a position within world bounds with min spacing to previous placements
func _find_free_position(rng: RandomNumberGenerator, placed: Array, min_d: float, pad: float) -> Vector2:
	var tries := 0
	while true:
		var x := REGION_ORIGIN.x + pad + rng.randf() * (REGION_SIZE.x - 2.0 * pad)
		var y := REGION_ORIGIN.y + pad + rng.randf() * (REGION_SIZE.y - 2.0 * pad)
		var p := Vector2(x, y)

		var ok := true
		for q in placed:
			if p.distance_to(q) < min_d:
				ok = false
				break
		if ok or tries > 200:
			return p
		tries += 1
	
	return Vector2()

# --- signal handlers --------------------------------------------------------

func _on_point_hover(idx:int,event_type:String, tooltip:String, pos:Vector2, intensity:float) -> void:
	print("[Point] Hover:", event_type, tooltip, " @ ", pos, " I=", intensity)

func _on_point_click(idx:int, event_type:String, tooltip:String, pos:Vector2, intensity:float) -> void:
	print("[Point] Click:", event_type, tooltip, " @ ", pos, " I=", intensity)

func _on_sticker_hover(idx:int,id:String,  label:String, pos:Vector2, meta:Dictionary) -> void:
	print("[Sticker] Hover:", idx, label, " @ ", pos, " meta:", meta)

func _on_sticker_click(idx:int,id:String,  label:String, pos:Vector2, meta:Dictionary) -> void:
	print("[Sticker] Click:", idx, label, " @ ", pos, " meta:", meta)
