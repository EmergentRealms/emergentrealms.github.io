extends Node

const CUSTOM_THEME = preload("uid://do618wffeyrt0")

func _ready() -> void:
	DV_ThemeManager.theme_changed.connect(_on_theme_changed)
	DV_ThemeManager.active_theme = CUSTOM_THEME
	print("Started in light mode")
	CUSTOM_THEME.dark_mode(false)
	
func _on_theme_changed(theme: DVTheme) -> void:
	print("Theme changed to:", theme.resource_path)
