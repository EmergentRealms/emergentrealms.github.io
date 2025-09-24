---
id: dynamic-rumors
slug: /cobblestone/systems/dynamic-rumors
title: Dynamic Rumor System
sidebar_label: Dynamic Rumor System
description: Documentation for the rumor network that powers emergent investigations in Cobblestone Legacy’s sandbox world.
keywords:
  - emergent NPC behavior
  - rumor system Godot
  - sandbox worldbuilding
  - large scale Godot project
  - Cobblestone Legacy
---

## Living Information Economy

Rumors evolve as they travel, creating investigative gameplay and a reactive city. The system’s perception hooks are shared in the [Threads & Thoughts devlog](/blog/threads-and-thoughts) if you want more narrative context.

- **Evolving Accuracy** — Each retelling can distort locations, witnesses, and descriptions. Accuracy ranges from 0–100% and is only guaranteed when the original source is found.
- **Degraded Details** — NPCs misplace landmarks, forget names, or embellish events depending on their personality and relationship to the source.
- **Spread History** — Every rumor records who told whom, letting players trace the most reliable version by interviewing the network.

## NPC Schedules & Presence

- NPCs follow daily routines—work, errands, rest—that determine where rumors propagate.
- Errand states send characters wandering markets or docks, creating lived-in crowds.
- Pathfinding keeps traffic flowing realistically through districts.

## Investigative Tools

- **Rumor Journal** — Track all leads with source NPCs, accuracy ratings, and version numbers.
- **Dynamic Conversations** — NPCs naturally mention rumors mid-dialogue, seeding new objectives or clues.
- **Skill Impact** — Perception and wisdom skills improve the fidelity of information heard.

## World Reactivity

- Player actions seed new rumors about heroism, theft, or infamy.
- NPCs share intel with each other, altering faction attitudes and opportunities.
- Time-of-day awareness ensures rumors circulate differently across shifts and neighborhoods.

## Selling Points

1. Organic network of evolving information keeps investigations engaging.
2. NPC ecosystem that feels alive thanks to schedules and rumor sharing.
3. Player-driven detective gameplay—separate truth from fiction.
4. A reputation layer where the city reacts to your deeds long before you arrive.
