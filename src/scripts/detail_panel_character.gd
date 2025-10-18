extends DV_DetailPanel

func _ready() -> void:
    set_title("Operative Profile")

    var identity := DV_Field.new()
    identity.key = "call_sign"
    identity.label = "Call Sign"
    identity.value = "Wren"
    identity.group = "Identity"
    identity.copyable = true
    add_field(identity)

    var rating := DV_Field.new()
    rating.key = "reputation"
    rating.label = "Reputation"
    rating.value = "Trusted"
    rating.badge_text = "Rank A"
    rating.group = "Identity"
    add_field(rating)

    var stealth := DV_Field.new()
    stealth.key = "stealth"
    stealth.label = "Stealth"
    stealth.value = 78
    stealth.progress_percent = 78
    stealth.group = "Skills"
    add_field(stealth)

    row_clicked.connect(_on_row_clicked)

func _on_row_clicked(row: int, key: String, label: String, value: Variant) -> void:
    print("Clicked row", row, key, label, value)
