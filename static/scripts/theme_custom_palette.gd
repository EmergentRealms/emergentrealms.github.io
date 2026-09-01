extends Node

@onready var theme_manager: DVThemeManager = get_node("/root/DV_ThemeManager")

func _ready() -> void:
	var custom_theme := DVTheme.new()
	custom_theme.set_dark_mode(false)
	custom_theme.set_primary_seed(Color("5F0F40"))
	custom_theme.set_success_seed(Color("70E000"))
	custom_theme.set_warning_seed(Color("FFB400"))
	custom_theme.set_error_seed(Color("E5383B"))
	custom_theme.set_info_seed(Color("4895EF"))
	custom_theme.set_neutral_seed(Color("F8F9FA"))

	# Use these colours for chart series instead of the generated ones.
	custom_theme.set_use_palette(true)
	custom_theme.set_palette([
		Color("1B998B"),
		Color("ED217C"),
		Color("2D3047"),
		Color("FFFD82")
	])

	theme_manager.set_active_theme(custom_theme)
