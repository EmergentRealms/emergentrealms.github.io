extends ColorPickerButton

@onready var theme_manager := DVThemeManager.get_singleton()

func _ready() -> void:
    var active_theme := theme_manager.get_active_theme()
    color = active_theme.get_primary_seed()

    theme_manager.theme_changed.connect(_on_theme_changed)
    color_changed.connect(_on_color_changed)

func _on_color_changed(new_color: Color) -> void:
    var theme := theme_manager.get_active_theme().duplicate() as DVTheme
    theme.set_primary_seed(new_color)
    theme_manager.set_active_theme(theme)

func _on_theme_changed(theme: DVTheme) -> void:
    color = theme.get_primary_seed()
