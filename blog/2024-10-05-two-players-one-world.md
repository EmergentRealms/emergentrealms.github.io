---
slug: two-players-one-world
title: "Two Players, One World: Taking a Solo Adventure Multiplayer"
authors: [leaddev]
date: 2024-10-05
description: Architecting, testing, and celebrating the first multiplayer build of Cobblestone Legacy.
tags: [devlog, design]
---

By October 2024, *Cobblestone Legacy* no longer felt like a humble solo experiment. The idea of exploring the city together refused to leave the dinner table. Turning a single-player sandbox into a shared world was daunting, but the motivation—letting my children collaborate (and occasionally compete) in the same space—made the leap irresistible.

<!-- truncate -->

## Designing for Togetherness

Multiplayer demanded a fresh look at every system. We started with a few core principles:

- **Shared simulation:** One host instance acts as authority; all clients generate identical procedural cities by syncing random seeds over RPC.
- **Parallel exploration:** The `WorldTerrain` system watches each player’s position so it can stream in the right city chunks for everyone, even on opposite sides of town.
- **One heartbeat:** A global `TickManager` keeps NPC AI, timers, and day/night cycles locked in sync across machines, so the world tells the same story to every player.

I sketched diagrams, annotated Godot nodes, and trimmed any feature that didn’t serve the cooperative fantasy.

:::note Why Godot’s Networking?
Godot’s high-level multiplayer API let me focus on gameplay instead of protocol boilerplate. Remote procedure calls (RPCs) carried seeds, state changes, and even NPC alerts without forcing me to build a custom server stack.
:::

Night after night I chipped away—adding client-side interpolation for movement, enforcing host authority on conflicts (like two players grabbing the same item), and teaching the game new etiquette (for example, **only one player per bed**). The moment the kids will reliably trade items, distract guards for each other, and see the same NPC reactions, the room will erupted in cheers.

## New Dynamics in a Shared Sandbox

Making systems multiplayer-aware unlocked delightful emergent stories:

- Survival loops encouraged teamwork. “I’m thirsty—drop me a bottle?”.
- Faction reputation now tracked per player, so siblings could role-play different moral paths and see guards or gangs respond accordingly.
- Mischief gained consequences. One child making noise in a back alley lured NPC guards for both players, forcing on-the-fly cooperation.

Behind the scenes, I leaned heavily on logging and two simultaneous debugger sessions. Multiplayer magnifies every assumption, but it also multiplies the fun once the pieces click into place.

## Developer’s Insight

> *Multiplayer multiplies everything: the bugs, the edge cases, and the joy.*
>
> It forced me to write more authoritative code, observe how real people interact in my systems, and constantly balance performance with clarity. The experience also planted a seed—if we wanted to keep expanding this living city, we’d eventually need more horsepower than raw GDScript could provide.

The next chapter picks up there: chasing performance, embracing C++, and preparing the city for even more players, NPCs, and possibilities.
