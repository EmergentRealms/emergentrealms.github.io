---
id: dynamic-dialog
slug: /cobblestone/systems/dynamic-dialog
title: Dynamic Dialog System
sidebar_label: Dynamic Dialog System
---

## Adaptive Conversations

The Dynamic Dialog System keeps every conversation grounded in context and memory.

- **Memory-Driven Exchanges** — NPCs remember prior encounters and respond accordingly.
- **Dynamic Rumors** — Dialogue reflects rumors the player sparked or unearthed, letting information spread across the city.
- **Personalized Greetings** — NPC tone shifts with their mood, relationship score, and knowledge of your deeds.

## Immersive NPC Interaction

- **Reputation Awareness** — Responses adapt to faction alignment and notoriety.
- **Mood & Disposition** — Emotional states such as friendly, neutral, or hostile flavor dialogue choices and branching paths.
- **Faction Loyalty** — NPC allegiances influence their willingness to help, betray, or warn the player.

## Quest & Event Integration

- Quests begin, update, or conclude naturally inside conversations.
- NPCs acknowledge world events—recent thefts, battles, festivals, or curfews.
- Foresight and warnings foreshadow upcoming encounters.

## Rumor System Hooks

- NPCs trade gossip with accuracy that shifts as stories spread.
- Rumors unlock quests, reveal locations, and nudge relationships in new directions.
- Detailed metadata (participants, timestamps, reputational impact) powers investigative gameplay.

## Smart Option Filtering

- Dialogue options appear or hide based on reputation, mood, prior choices, or current objectives.
- Logical progression keeps conversations fresh—no repeated loops unless context warrants it.

## Modular Content Creation

- JSON-driven conversation files make it easy to author, reuse, or customize dialogue at scale.
- Shared templates with NPC-specific overrides accelerate content production.
- Scales to hundreds of NPCs and thousands of branching options.

## Interactive World Features

- NPCs converse in real time, exchange rumors, and react to proximity.
- Player choices reshape relationships, trigger events, and modify the world state.

## Developer Tooling

- Inspect active NPCs, conversation history, and rumor propagation in debugging views.
- Built-in validation prevents broken conditions and tracks NPC mood, reputation, and rumor knowledge live.

## Time-Aware Immersion

- Dialogue reflects current in-game time, season, and scheduled events.
- Time-gated interactions encourage planning and reinforce daily routines.

## Event Hooks

- Conversations can reveal map locations, spawn encounters, update inventories, or trigger custom events.
- Fully integrated with quest, event, and inventory managers for cohesive storytelling.

**Why it matters:** Immersion, flexibility, and consequence-driven dialogue turn NPCs into memorable characters whose stories evolve with the player.
