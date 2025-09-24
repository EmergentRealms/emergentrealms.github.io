---
id: dynamic-health-vitality
slug: /cobblestone/systems/dynamic-health-vitality
title: Dynamic Health & Vitality System
sidebar_label: Dynamic Health & Vitality
description: Survival stat architecture for Cobblestone Legacy, detailing how we simulate needs in a large scale Godot sandbox RPG.
keywords:
  - survival systems Godot
  - dynamic vitals
  - rogue-lite sandbox RPG
  - large scale Godot project
  - Cobblestone Legacy
---

## Survival Is More Than a Health Bar

The Dynamic Health & Vitality System turns every calorie burned, sip of water, and restless night into a meaningful gameplay decision. Survival stats are modeled as interconnected resources that respond to the player's habits, environment, and long-term choices, echoing the earliest experiments described in the [Planting the First Cobblestone devlog](/blog/planting-the-first-cobblestone).

### Health & Stamina Management
- Track health, stamina, energy, hydration, and weight simultaneously.
- Regeneration depends on rest quality, injuries, and environment—instant heals do not exist.

### Weight & Body Composition
- Weight, fat, and muscle change based on caloric intake, physical exertion, and age.
- Starvation, overexertion, and extreme conditions degrade performance until the player adapts or recovers.

### Energy & Starvation
- Daily caloric intake drives energy reserves; negative states trigger muscle loss and stat degradation.
- Starvation unfolds gradually, forcing hard choices about rationing, rest, and risk.

### Hydration Model
- Hydration affects stamina recovery, coordination, and reaction time.
- Environmental heat, humidity, and activity levels accelerate water loss.

### Environment & Activity Interactions
- Extreme weather drains vitals faster; safe zones offer accelerated recovery.
- Activity intensity (running, climbing, hauling) determines caloric burn and fatigue.

### Aging & Development
- Characters age naturally; body composition shifts with growth and neglect.
- Strength and endurance peak before tapering off without ongoing training.

### Tactical Resource Planning
- Food, water, and carried weight directly influence stamina and movement speed.
- Players must balance survival gear with mobility and combat readiness.

## Gameplay Impact

- **Stat Evolution** — Activity raises strength and endurance, while malnutrition or dehydration erodes them.
- **Adaptive Body Systems** — Weight and body fat fluctuate, altering stamina recovery and combat performance.
- **World Pressure** — Weather and rest quality determine whether the city wears you down or lets you rebound.
- **Energy & Stamina Loop** — Energy governs stamina regeneration, making retreats, rest, and preparation critical.
- **Threaded Simulation** — Because every subsystem runs inside a C++ and GDExtension backend, the city can evaluate thousands of actors without sacrificing our **Godot GDExtension performance** targets.

## Unique Selling Points

- Deeply integrated survival loop where the body feels tangible and reactive.
- Progression reflects player choices and lifestyle over the course of a run.
- Strategic resource management that elevates every scavenging trip and meal.
- A world that reacts to your condition, making survival storytelling personal and tense.

**Tagline:** _"Survive, Adapt, Overcome: Your body is your greatest asset—or your greatest weakness."_
