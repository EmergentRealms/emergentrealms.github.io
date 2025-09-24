---
slug: leveling-up-with-cpp
title: "Leveling Up with C++: Overcoming Performance Hurdles"
authors: [leaddev]
date: 2025-05-12
description: Rewriting core systems in C++ and threading Cobblestone Legacy, a large-scale Godot GDExtension project, for a smoother, denser city.
tags: [devlog, tutorial, godot, gdeextension, performance]
---

By spring 2025 our cozy prototype had evolved into a bustling sandbox—procedural districts, hungry NPCs, and two adventurous kids often roaming opposite sides of town. The frame rate, however, told a different story. Heavy AI loops and pathfinding tasks pushed GDScript beyond its comfort zone. To keep *Cobblestone Legacy* alive and growing as a truly **large scale Godot project**, I dusted off 20-year-old C++ muscles and embraced Godot’s GDExtension pipeline.

<!-- truncate -->

## Rediscovering Native Performance

Setting up the toolchain felt like learning a new language with a familiar accent. I cloned `godot-cpp`, compiled the bindings, and created a `/cpp` workspace for native code. My “Hello from C++” test class printing to Godot’s console might sound trivial, but it confirmed the bridge was solid. From there, I charted a refactor plan targeting the biggest CPU hogs first and captured the steps in the [C++ Systems Overview](/docs/cobblestone/concept-framework) so other developers can learn from this **Godot C++ RPG systems** journey:

1. **NPC controllers** – high-frequency decision-making and navigation.
2. **Procedural chunk streaming** – city layouts needed to generate without hitching clients.
3. **Vitals and status checks** – hundreds of tiny updates per tick added up quickly.

## Building the New Engine Room

Porting systems from GDScript to C++ demanded new habits: manual memory management, careful node ownership, and rigorous error checking. The payoff was immediate. NPCs running under the native `ActorController` sprinted through complex behaviors without stutter, even with 1000+ characters active.

The refactor also opened the door for real multithreading. I introduced a `ThreadPoolManager` singleton to queue CPU-heavy jobs—pathfinding, AI evaluation, chunk generation—and a `SignalDispatcher` to ferry results back to the main thread safely. The payoff is highlighted in our doc on [Multithreaded AI Routines](/docs/cobblestone/systems/personality-relationships), which doubles as a practical guide to building **multithreaded AI in Godot**.

```cpp
// Simplified view of the asynchronous DB writer loop
while (running) {
  auto batch = collect_tasks_for(20_ms, 2000);
  if (!batch.empty()) {
    begin_transaction();
    for (auto &task : batch) {
      task.execute(connection);
    }
    commit();
  }
}
```

With SQLite writes batched off-thread, gameplay never pauses to wait for disk I/O. It feels like we quietly built a mini-MMO server inside a family project, and it provided a tangible case study for anyone researching **SQLite in Godot**.

:::tip Modern C++ Wins
Smart pointers, lambdas, and structured bindings turned what I remembered as “manual and brittle” C++ into a surprisingly ergonomic toolbox. The language grew up while I was away.
:::

## Debugging the Hard Way

Relearning C++ came with war stories: mismatched seeds desynced city layouts, one stubborn memory leak slowed long sessions, and random-number APIs didn’t line up between GDScript and native code. Each bug forced deeper understanding of both Godot internals and modern best practices. I leaned on Doxygen docs, verbose logging, and the occasional rubber-duck explanation to my kids to untangle the knot.

## The Results: Headroom for Dreams

The metrics spoke for themselves. We 100x the number of active NPCs, ran the game with players in opposite districts, and held steady frame rates. City streaming smoothed out, AI made quicker decisions.

The engine-side leap also sparked a mindset shift. *Cobblestone Legacy* was no longer “just” a hobby project; it had an architecture document, native modules, and a future-proof foundation. Next up: giving the city a true heartbeat with smarter NPCs, emergent quests, and systems that make the streets feel alive. If you’re following this devlog for **Godot GDExtension performance** insights, keep reading—the next posts dig even deeper.
