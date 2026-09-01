# Snippet check

The example code on this site is not compiled by anything. `Color.hex("5F0F40")`,
`DVThemeManager.get_singleton()`, `schema.table_name`, `save_to_db(wait = true)` and
`var npcs: Array[NPC] = DataWiz.select(...)` all shipped here at one point; none of
them run. This catches that class of rot.

## Running it

You need a Godot project with the DataViz and Datawiz addons installed —
`~/Projects/gdext-showcase` is the obvious one.

```bash
SHOWCASE=~/Projects/gdext-showcase
python3 tools/snippet-check/extract.py "$SHOWCASE/docscheck"
cp tools/snippet-check/{check,run}.gd "$SHOWCASE/docscheck/"

godot --headless --path "$SHOWCASE" --script docscheck/check.gd   # static, via ClassDB
godot --headless --path "$SHOWCASE" --script docscheck/run.gd     # compiles and executes
```

`check.gd` resolves every method, property, signal and constant against ClassDB and
compares signal arity to the handler that connects to it. `run.gd` compiles each
snippet and runs `_ready()` on a real node, which is what catches wrong argument
types — a static pass cannot tell that `Color.hex()` wants an int.

Fragments (snippets with no `extends`) skip the `self.*` resolution, since there is
no self, but still get the class-member, constant and indentation checks. Autoloads
and engine singletons are invisible to ClassDB, so `check.gd` carries a small
`GLOBALS` map — `DV_ThemeManager` → `DVThemeManager`, `DataWiz` → `DWService`. Add
to it when a new one appears.

A canary is worth running when you touch `check.gd`: paste a snippet with a made-up
method, property, constant and signal, plus a handler with the wrong argument count,
and confirm all five are reported. A checker that has quietly stopped checking looks
exactly like a clean run.

## Known false positives

- `run.gd` replaces every `preload()` with `null`, so a snippet that calls a method
  on a preloaded resource aborts. Check those by hand.
- Fragments that reference a class the reader is assumed to have written (`Npc`,
  `Item`) cannot be compiled by `run.gd`. `check.gd` still covers them.
