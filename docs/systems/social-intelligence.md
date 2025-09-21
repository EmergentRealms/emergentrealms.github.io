---
id: social-intelligence
title: Social Intelligence Suite
slug: /systems/social-intelligence
sidebar_position: 3
---

The Social Intelligence Suite fuses dialog, rumor propagation, personality modeling, and relationship tracking to create NPCs that feel alive. Conversations are remembered, gossip travels, and alliances shift in response to your deeds.

## Dynamic Dialog System

### Adaptive Conversations
- **Memory-Driven Responses:** NPCs recall past encounters and adjust tone, greetings, and options accordingly.
- **Context-Aware Choices:** Reputation, faction allegiance, mood, time of day, and prior outcomes filter available dialog branches.
- **Quest Integration:** Conversations trigger missions, provide clues, and update objectives based on real-time progress.

### Rumor-Driven Worldbuilding
- **Living Gossip Network:** NPCs exchange rumors in real time, each spread risking degradation, embellishment, or outright fabrication.
- **Accuracy Meter:** Every rumor tracks reliability (0–100%), encouraging investigative play to uncover the truth.
- **Rumor Metadata:** Entries log descriptions, involved NPCs, locations, reputation effects, and timestamps for deep systemic hooks.

### Developer & Debug Tooling
- JSON-authored dialog trees speed content creation and reuse across hundreds of NPCs.
- Built-in validation, history tracking, and real-time monitors make iteration and QA smooth.

## Personality & Relationship Simulation

### Personality-Driven Behavior
- Each NPC is defined by a **Big Five** personality profile that shapes decision making, trust, and social compatibility.
- Personalities influence greetings, affinity growth, conflict resolution, and even which quests they are willing to offer.

### Relationship Manager
- Relationships track **Affinity** and **Trust**, evolving with every interaction, rumor, or betrayal.
- Trait compatibility modifies relationship gains or losses, adding nuance to how bonds form or fracture.
- Player choices in dialog immediately feed back into relationship stats, unlocking new options or closing doors.

## Rumor Journals & Investigative Play

- Players maintain a **Rumor Journal** that records sources, accuracy, version history, and contextual notes.
- Skills such as perception and wisdom improve rumor comprehension and reveal hidden details when eavesdropping.
- Tracking the rumor spread history lets players triangulate the truth, confront liars, or weaponize misinformation.

## NPC Schedules & World Reactivity

- Hundreds of NPCs follow daily routines—working, running errands, socializing, and returning home at night.
- Proximity-based conversations and NPC-to-NPC interactions make markets, taverns, and alleys feel bustling.
- Player actions generate new rumors; your reputation precedes you, altering how strangers and allies behave.

## Why It Matters

- **Immersion:** NPCs react believably, grounding the city in personality and memory.
- **Player Agency:** Information warfare, diplomacy, and social engineering become viable playstyles.
- **Scalability:** Modular data structures keep content creation efficient even as the cast grows.

Dive into the [Dynamic Quest & Goal System](/docs/systems/dynamic-quest-goal) to see how these social insights feed mission generation.
