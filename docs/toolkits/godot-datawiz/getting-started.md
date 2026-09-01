---
title: Getting started
description: Declare a class, call save_to_db(). No SQL, no schema file, no serialisation code.
sidebar_position: 1
---

# Getting started

Copy `addons/datawiz/` into your project. There is no step two: the addon registers
a `DataWiz` singleton and opens the database on first use.

```gdscript
class_name Npc extends DWRecord

var table_name := "npc"          # optional; defaults to the class name
var unique_fields := ["name"]    # optional; defaults to the generated guid

var name: String = ""
var age: int = 0
var position: Vector2 = Vector2.ZERO
var inventory: Array[Item] = []  # nested records are saved as their own rows
```

```gdscript
var npc := Npc.new()
npc.name = "Borin"
npc.age = 51
npc.save_to_db()                          # queued on a writer thread
var everyone := DataWiz.select(Npc.new())  # Array[DWRecord] of Npc, nested items included
```

Every script variable becomes a column, exported or not. Prefix one with `_` to keep
it out of the database.

:::note Typed arrays
`select()` and nested-record loading both hand back `Array[DWRecord]` — the objects
inside are your class, but the array's element type is the base. Iterate it, index it
and `is`-check it as normal; if you need a statically typed array, convert it:

```gdscript
var npcs: Array[Npc] = []
npcs.assign(DataWiz.select(Npc.new()))
```
:::

## Project settings

| Setting | Default | What it does |
|---|---|---|
| `datawiz/database/path` | `user://game.db` | Where the database lives |
| `datawiz/database/auto_open` | `true` | Open it on first use |
| `datawiz/database/reader_pool_size` | `4` | Concurrent read connections |
| `datawiz/database/auto_open_in_editor` | `false` | Also open while the editor runs |
| `datawiz/logging/verbose` | `false` | Print connection and migration progress |

## Changing a class after you have shipped it

Adding a variable is handled: on the next use, Datawiz diffs the live table and adds
the column, then emits `schema_changed(table, added_columns)`. Added columns are
`NULL` for rows written earlier, which is your cue to backfill them.

```gdscript
DataWiz.schema_changed.connect(func(table, added):
	if table == "hero" and "skills" in added:
		for h in DataWiz.select(Hero.new()):
			h.skills = default_skills_for(h)
			h.save_to_db()
)
```

For data migrations tied to a version, use the hook:

```gdscript
DataWiz.migrate(3, func(from_version):
	match from_version:
		0: DataWiz.enqueue_write("UPDATE npc SET faction = 'neutral' WHERE faction IS NULL")
		1: ...
)
```

`migrate()` records progress with `PRAGMA user_version` after each step, so an
interrupted migration resumes in the right place.

## What runs where

- **Writes** are queued and executed on one writer thread, batched into transactions.
  Values are read from your objects on the calling thread, so the writer never touches
  a Godot object.
- **Reads** run on the calling thread with a pooled read-only connection, or on a
  worker thread through `select_async()`.
- **Nested records** are resolved after the reader is back in the pool: one query per
  table per level, and two references to the same row give you one instance.

## Status

Datawiz is at **0.1.0** — the API may still change before its first public release,
and it has not yet shipped in a game. The core is well covered by tests: nested
reads, concurrent readers against live writes, schema migration, and save-slot
isolation.
