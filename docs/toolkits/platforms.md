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

Both toolkits compile to WebAssembly. Charts, grids, the heat map and a live
SQLite database all run in a browser tab — worth stating plainly, because "C++
GDExtension" and "runs on the web" have not historically gone together.

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

### 4. Nothing, if you are using DataWizard

This one is worth explaining, because it will bite you with anything else that
writes files from C++.

In a browser your `user://` directory lives in memory, backed by IndexedDB. It
only reaches IndexedDB when something asks the browser to persist it, and Godot
asks whenever *Godot* writes a file. A GDExtension writing through the C library
— which is what SQLite does — never triggers that. The symptom is nasty: saves
report success, reads come back correct, and the player's data is gone the moment
they reload the page.

DataWizard handles this for you. The database is pushed to browser storage at the
points where you have already said durability matters:

- `save_to_db(true)` — a waited save
- `DataWiz.flush()`
- `DataWiz.checkpoint()`
- `DataWiz.close()`

A queued `save_to_db()` does not sync on its own, the same way it is not committed
on its own. If it matters, wait for it.

```gdscript
func save_game() -> void:
	player.save_to_db(true)      # committed, and persisted on web
```

Verified across three consecutive page loads in a clean browser profile, with no
application-side workaround: the row count goes 1, 2, 3.

:::note Writing your own files?
The same trap applies to any C++ extension, and to anything writing through a
library that bypasses Godot's `FileAccess`. Godot's own `FileAccess` is fine — it
syncs on its own.
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
