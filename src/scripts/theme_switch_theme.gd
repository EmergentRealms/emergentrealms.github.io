extends Node

@onready var theme_manager := DVThemeManager.get_singleton()
var light_theme: DVTheme = preload("res://themes/dashboard_light.tres")
var dark_theme: DVTheme = preload("res://themes/dashboard_dark.tres")

func _ready() -> void:
    theme_manager.theme_changed.connect(_on_theme_changed)
    theme_manager.set_active_theme(light_theme)
    print("Started in light mode")

    # Toggle to dark mode after a short delay to demonstrate runtime switching.
    await get_tree().create_timer(2.0).timeout
    theme_manager.set_active_theme(dark_theme)

func _on_theme_changed(theme: DVTheme) -> void:
    print("Theme changed to:", theme.resource_path)
