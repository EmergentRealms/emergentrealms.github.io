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

## Known false positives

- `DV_ThemeManager` is an autoload the plugin registers, not a class, so ClassDB
  does not know it. Its members are on `DVThemeManager`.
- `run.gd` replaces every `preload()` with `null`, so a snippet that calls a method
  on a preloaded resource aborts. Check those by hand.
- Fragments that reference a class the reader is assumed to have written (`Npc`,
  `Item`) will not resolve. Only whole-file snippets under `static/scripts/` are
  expected to pass cleanly.
