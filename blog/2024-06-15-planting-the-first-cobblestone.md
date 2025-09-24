---
slug: planting-the-first-cobblestone
title: "Planting the First Cobblestone: Inspiration and Early Prototyping"
authors: [leaddev]
date: 2024-06-15
description: Kickstarting Cobblestone Legacy, a large-scale Godot 4.4 rogue-lite sandbox RPG I’m making for my kids, and charting the first prototypes that proved the vision.
tags: [devlog, design, worldbuilding, godot, indie-rpg, sandbox-worldbuilding]
---

In the summer of 2024 I set out to build a game for my children. What started as a bedtime-story side project quickly snowballed into *Cobblestone Legacy*—a rogue-lite sandbox survival RPG about grit, discovery, and hope in a procedurally generated city. This first entry looks back on the spark that ignited the project, how the earliest Godot 4.4 prototypes took shape, and why positioning the work as a **large scale Godot project** matters for the journey ahead. If you want a broader snapshot of the vision, the [Project Overview](/docs/cobblestone/overview) expands on the pillars this devlog introduces.

<!-- truncate -->

## From Bedtime Stories to Design Pillars

My boys became the most enthusiastic design partners I could ask for. We bounced ideas off each other almost every day, with them constantly pitching new scenarios and “cool” things they wanted to see in the game. Their imaginations never stopped flowing—one moment it was daring rooftop chases, the next it was secret hideouts or rival gangs with dramatic names. Those conversations became the heartbeat of the project, each idea sparking another and pushing the game into directions I’d never have discovered alone.

To keep us aligned, I distilled every idea into a handful of guiding pillars:

| Pillar | What It Means In-Game | Early Notes |
| --- | --- | --- |
| Survival-first sandbox | Track thirst, hunger, stamina, and exhaustion like “real life.” | “If you don’t drink water, you get weaker. No food, you slow down.” |
| Exploratory wonder | Reveal the city through fog of war as the kids uncover alleyways and hideouts. | The youngest mapped “secret stashes” on notebook paper. |
| Reactive factions | Rival gangs, merchants, and city guards respond to the player’s choices. | A family debate decided that alliances should matter. |
| Narrative heart | Follow a twelve-year-old orphan carving their own destiny. | I drafted short vignettes to give districts personality. |

:::tip Family Insight
Kids are honest playtesters. Their laughter, gasps, and even the occasional eye-roll became the compass for which systems deserved attention.
:::

## First Steps in Godot

Late-night prototyping sessions paid off fast thanks to Godot’s approachable scene system and GDScript. The very first milestone—a tiny sprite running through a grey-box block—produced grins that lit up our living room. Within a few weeks we layered on:

- A looping day/night cycle that bathed the city in warm evenings and chilly dawns.
- Early Vitals bars that punished careless sprinting with comedic “collapse from exhaustion” animations.
- A curious NPC wandering the street, ready to be poked, prodded, and inevitably broken by curious testers.

Every playtest revealed unexpected edge cases (“Yes, son, you *did* find a way to escape the map.”), but that chaos pushed the design forward faster than any spec sheet could.

## Procedural Streets, Personal Stories

By late summer we dared to dream bigger. I introduced procedural generation so each new save would remix the city into fresh alleys and plazas. The kids instinctively adapted, plotting routes to water sources before stamina dipped into the red.

Behind the scenes, a `VitalsComponent` kept tabs on needs like hydration, energy, and stamina. If hydration dropped, status effects kicked in: **thirst** slowed sprinting, **exhaustion** eventually knocked characters out cold. Hearing my kids shout “Quick, find a tap!” was the moment I knew the simulation loop was working. Those early vitals experiments became the blueprint for the [Dynamic Health & Vitality system](/docs/cobblestone/systems/dynamic-health-vitality), and they laid the groundwork for the **emergent NPC behavior** we’re chasing in later devlogs.

## The Spark of Something Larger

What began as a heartfelt gift was clearly becoming something greater. We set the story in a stylized 19th-century metropolis, wrote quick lore snippets for districts and factions.

One rainy October afternoon, inspiration struck: what if they could play together? Multiplayer felt wildly ambitious for a one-person side project—but the idea stuck. Their immediate, resounding “YES!” sealed the next milestone.

:::info Developer Reflection
Building those first prototypes taught me two enduring lessons:

1. **Listen to your audience, even if they’re under twelve.** The systems that made it into the core loop—survival, exploration, reactive story beats—were forged by their reactions.
2. **Embrace the scope creep fueled by excitement.** Ambition can be scary, but it transformed a tiny hobby into a world worth sharing.
:::

The next entry explores how that spark pushed *Cobblestone Legacy* from solo sandbox to a shared adventure. If you’re hunting for **Godot tutorials** on survival loops or just curious how a parent-led studio can build a scalable world, stick around—this devlog series is about sharing the wins, the stumbles, and the heart behind making a game for my kids.
