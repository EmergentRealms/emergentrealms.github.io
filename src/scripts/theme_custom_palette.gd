extends Node

@onready var theme_manager := DVThemeManager.get_singleton()

func _ready() -> void:
    var custom_theme := DVTheme.new()
    custom_theme.set_dark_mode(false)
    custom_theme.set_primary_seed(Color.hex("5F0F40"))
    custom_theme.set_success_seed(Color.hex("70E000"))
    custom_theme.set_warning_seed(Color.hex("FFB400"))
    custom_theme.set_error_seed(Color.hex("E5383B"))
    custom_theme.set_info_seed(Color.hex("4895EF"))
    custom_theme.set_neutral_seed(Color.hex("F8F9FA"))

    # Apply a manual series palette for charts when light mode is active.
    custom_theme.set_use_pallet(true)
    custom_theme.set_palette([
        Color.hex("1B998B"),
        Color.hex("ED217C"),
        Color.hex("2D3047"),
        Color.hex("FFFD82")
    ])

    theme_manager.set_active_theme(custom_theme)
