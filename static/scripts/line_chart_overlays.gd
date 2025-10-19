extends DV_LineChart

func _ready() -> void:
	set_value_format(DVComponent.DECIMAL)

	set_show_points(false)
	var P := PackedFloat32Array([30,35,40,50,80,115,90,85,60,65])
	set_categories(PackedStringArray(["11","12","13","14","15","16","17","18","19","20"]))
	set_index_range(3, 10)

	set_title("Sanity dataset (10 bars)")
	set_y_axis_label("Price")
	set_x_axis_label("Index")

	# Use short windows so overlays are visible on 10 bars
	var mask :int = DVChart.OVL_SMA | DVChart.OVL_EMA | DVChart.OVL_BBANDS
	var s_price := add_series_with_overlays("Price", P, mask, 3, 5, 3, 2.0)
	set_series_filled(s_price,true)
	# Give each overlay its own style (don’t re-override with set_series_overlay_style)
	set_series_sma_style(s_price, Color8(200,200,200), 2.0)
	set_series_ema_style(s_price, Color8( 46,204,113), 2.0)
	set_series_bbands_style(s_price, Color8(41,128,185), Color(0.16,0.5,0.83,0.12), 2.0)
