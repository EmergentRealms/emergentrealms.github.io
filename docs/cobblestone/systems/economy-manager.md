---
id: economy-manager
slug: /cobblestone/systems/economy-manager
title: Economy Manager
sidebar_label: Economy Manager
description: Architecture notes for the Cobblestone Legacy economy manager, a Godot C++ system backed by SQLite for large scale simulations.
keywords:
  - Godot economy system
  - SQLite in Godot
  - Cobblestone Legacy
  - large scale Godot project
  - Godot C++ RPG systems
---

## Dynamic Market Simulation

The economy stack lives in C++ via GDExtension so it can juggle thousands of background transactions without blocking the main thread—an approach we call out frequently in our **large scale Godot project** devlogs.

The Economy Manager keeps prices fluid based on supply, demand, and player influence.

### Getting Started

```gdscript title="Initialize the economy"
var base_prices = {
    "Iron": 100,
    "Gold": 500,
    "Wheat": 50
}
EconomyManager.initialize(base_prices)
```

### Supply, Demand & Price Updates
- `change_supply()` and `change_demand()` automatically call `update_prices()`.
- Price updates emit signals (`price_updated`, `supply_demand_updated`) so UI and events can react instantly.

### Player Agency
- `player_influence_event()` lets player actions manipulate markets—corner a resource, sabotage supply, or flood merchants with goods.
- Background transactions simulate shipments, embargoes, and other world events.

```gdscript title="Add a shipment"
EconomyManager.add_transaction("Iron", 50, "shipment", delay=15.0)
```

### Background Processing
- Queue events with `add_transaction()` and resolve them via `process_transactions(delta)` in the main loop.
- Invoke `random_event()` periodically to keep markets unpredictable.
- SQLite-backed history writes batch asynchronously, mirroring the strategies documented in the [Leveling Up with C++ devlog](/blog/leveling-up-with-cpp) for sustainable **SQLite in Godot** usage.

```gdscript
func _process(delta):
    EconomyManager.process_transactions(delta)
```

### Debugging & Analytics
- `debug_economy()` prints the current state.
- `record_price_history()` tracks trends for dashboards or merchant UIs.

### Integration Points

- **Merchants** fetch prices with `get_price()` and update UI when signals fire.
- **Quests** can spike demand or reduce supply for targeted items.
- **EventManager** injects global events such as wars or festivals.
- **FactionManager** personalizes pricing based on reputation.
- **Crafting & Stashes** use current prices to evaluate profitability.

### Gameplay Implications

1. **Dynamic Economy** — Markets react to systemic and player-driven changes.
2. **Player Exploitation** — Players can manipulate supply chains for profit or chaos.
3. **Interactive World** — Shipments, embargoes, and faction moves shape the market.
4. **Meaningful Decisions** — Choose between short-term gains or long-term stability.
