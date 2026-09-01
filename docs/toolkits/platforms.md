---
title: Platforms
sidebar_position: 2
description: Windows, macOS, Linux and the browser — what ships, and what the web build needs.
---

# Platforms

Both toolkits are C++ GDExtensions. That buys the speed, and it means a binary
has to exist for every platform you ship to. Here is what exists.

| | Windows | Linux | macOS | Web |
|---|---|---|---|---|
| **DataViz UI Kit** | x86_64 | x86_64 | universal (Intel + Apple Silicon) | wasm32 |
| **DataWizard** | x86_64 | x86_64 | universal (Intel + Apple Silicon) | wasm32 |

Built against the Godot 4.5 extension API, so they load on 4.5 and every later
4.x. macOS binaries are ad-hoc signed; you may need to allow them once on first
run, or sign them with your own certificate when you ship.

## The browser

Both toolkits compile to WebAssembly, and the [showcase demo](https://emergent-realms.itch.io/godot-dataviz-ui)
runs the whole thing — charts, grids, heat map, and a live SQLite database — in a
browser tab. It is worth stating plainly, because "C++ GDExtension" and "runs on
the web" have not historically gone together.

There are four things to get right, and one of them is not obvious.

### 1. Turn on extension and thread support

In your Web export preset:

- **Extensions Support** — on. Without it the export silently omits the addon.
- **Thread Support** — on. Both toolkits use threads; DataWizard's writer thread
  and reader pool are the whole point of it.

### 2. Use the Compatibility renderer

```ini
# project.godot
[rendering]
renderer/rendering_method.web="gl_compatibility"
```

### 3. Serve with cross-origin isolation headers

Threads in the browser mean `SharedArrayBuffer`, and browsers only hand that out
to a cross-origin-isolated page. Your host must send:

```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

itch.io does this for you — tick **SharedArrayBuffer support** in the project's
embed settings. On your own host you set the headers yourself. Godot's export
preset also has a service-worker option that adds them, for hosts that will not.

### 4. Flush the filesystem after you save — DataWizard only

This is the one that will catch you, so it is worth understanding.

In a browser your `user://` directory lives in memory, backed by IndexedDB. It is
only written to IndexedDB when something calls a sync, and **Godot triggers that
sync when Godot writes a file** — not when a GDExtension does. DataWizard's
SQLite writes go straight through to the filesystem underneath Godot's file API,
so they never trip the sync.

The visible symptom: everything works perfectly, saves report success, reads come
back correctly — and then the player reloads the page and their save is gone.

The fix is one line. After a save that matters, write anything at all through
Godot's own `FileAccess`:

```gdscript
func save_game() -> void:
	player.save_to_db(true)
	DataWiz.checkpoint()

	if OS.get_name() == "Web":
		# SQLite writes bypass Godot's file layer, so nothing has asked the
		# browser to persist them yet. Any Godot-side write syncs the whole
		# mount, this database included.
		var f := FileAccess.open("user://.flush", FileAccess.WRITE)
		f.store_64(Time.get_unix_time_from_system())
		f.close()
```

Verified across three consecutive page loads in a fresh browser profile: without
the flush the database is empty every time; with it, the row count keeps
climbing.

:::note
This is a rough edge, and it is on our list to handle inside the addon so you do
not have to think about it. Until then, the line above is the whole workaround.
:::

## Building from source

If you would rather build the binaries yourself, both repositories use SCons and
carry godot-cpp as a pinned submodule:

```bash
git submodule update --init --recursive
scons platform=linux target=template_release -j8
```

For the web target you need the **exact** Emscripten version the engine's export
templates were built with — a mismatch fails inside the browser with an
unhelpful `resolved is not a function`. Godot 4.7.x wants Emscripten 4.0.11.

```bash
scons platform=web target=template_release arch=wasm32 threads=yes
```
