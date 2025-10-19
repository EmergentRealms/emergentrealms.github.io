extends DV_Gauge

func _ready() -> void:
	# 360 clockwise, -360 reverse
	set_sweep_deg(180)                 
	
	set_show_center_value(true)
	set_center_title("Progress")
	
	# Range & starting value
	set_min_value(0.0)
	set_max_value(100.0)
	set_value(26.0)
