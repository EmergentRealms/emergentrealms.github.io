
extends DV_DetailPanel

func _ready() -> void:
	set_title("Profile")
	
	var f1:=DV_Field.new()
	f1.label = "First Name"
	f1.value = "John"
	f1.group = "Identity"
	add_field(f1)
	var f2:=DV_Field.new()
	f2.label = "Last Name"
	f2.value = "Smith"
	f2.group = "Identity"
	add_field(f2)
	
	var f3:=DV_Field.new()
	f3.label = "Birth Place"
	f3.value = "Womb"
	f3.group = "Identity"
	add_field(f3)
	
	var str := DV_Field.new()
	str.label = "Strength"
	str.value = 24
	str.progress_percent = 43
	str.group = "Stats"
	str.coppyable = true
	str.accent = Color("54a6ed")
	add_field(str)
	
	var dex := DV_Field.new()
	dex.label = "Dexterity"
	dex.value = 51
	dex.progress_percent = 89
	dex.group = "Stats"
	dex.coppyable = true
	dex.accent = Color("54a6ed")
	add_field(dex)

	var t := DV_Field.new()
	t.label = "Traits"
	t.value = ["Chatty","Clever","Cautious"]
	t.group = "Personality"
	add_field(t)
	
	row_clicked.connect(_on_row_clicked)

func _on_row_clicked(row:int, key:String, label:String,value:Variant):
	print("Row clicked: ", row, " k:, ", key, " l:", label," value: ",value  )
