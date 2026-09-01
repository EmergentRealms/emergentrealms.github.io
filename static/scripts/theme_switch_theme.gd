extends Node

const CUSTOM_THEME: DVTheme = preload("uid://do618wffeyrt0")

func _ready() -> void:
	DV_ThemeManager.theme_changed.connect(_on_theme_changed)

	# Duplicate before editing: the preloaded resource is shared, and GDScript
	# will not let you assign through a const in any case.
	var theme: DVTheme = CUSTOM_THEME.duplicate()
	theme.set_dark_mode(false)
	DV_ThemeManager.active_theme = theme

func _on_theme_changed(theme: DVTheme) -> void:
	print("Theme changed, dark mode is ", theme.is_dark_mode())
