---
id: economy-crafting
title: Economy & Crafting Loop
slug: /systems/economy-crafting
sidebar_position: 5
---

The city’s marketplace is a living organism. Prices, supply, and demand ebb and flow with player action, faction politics, and random events. Crafting professions plug directly into this economy, giving players multiple paths to wealth and influence.

## Economy Manager Overview

- **Initialize Base Prices:** `EconomyManager.initialize(base_prices)` seeds the world with commodity values drawn from `GameData`.
- **Responsive Pricing:** `change_supply()` and `change_demand()` automatically call `update_prices()`, emitting signals for UI, merchants, and analytics.
- **Player Agency:** `player_influence_event()` lets heists, hoarding, or sabotage ripple through supply chains.
- **Background Simulation:** Queue shipments, shortages, or festivals with `add_transaction()` and process them in `_process(delta)`.
- **Random Events:** Scheduled shocks keep markets volatile—earthquakes, festivals, and wars all shift demand.
- **Debug Friendly:** `debug_economy()` prints the current state; price history tracking powers graphs and data-driven tuning.

## Gameplay Implications

| Scenario | Result |
| --- | --- |
| Massive iron shipment arrives | Supply surges, prices drop, crafting becomes cheaper. |
| Player hoards gold | Supply falls, prices spike, merchants tighten security. |
| Festival announced | Food and drink demand increases; taverns profit. |
| Guard embargo | Weapon prices soar, black markets flourish. |

## System Integrations

- **Merchants:** Pull live prices via `get_price(item)` and react to signals for instant UI updates.
- **Quests:** Missions can directly manipulate supply/demand—deliver goods, sabotage warehouses, or corner a market.
- **Event Manager:** Global events inject transactions or adjust economic parameters on the fly.
- **Faction Manager:** Reputation grants discounts or premiums, modifying final prices without breaking the core simulation.
- **Crafting Systems:** Material costs align with market conditions, keeping recipes meaningful across runs.

## Professions & Playstyles

### Crafting Professions
Blacksmithing, Alchemy, Tailoring, Carpentry, Tinkering, Cooking/Baking, Jewelry Crafting.

### Resource Gathering
Fishing, Hunting, Mining, Farming, Herbalism, Lumberjacking, Scavenging.

### Trade & Commerce
Merchanting, Bartering, Innkeeping, Banking, Smuggling.

### Combat & Covert Specialists
Weapon Masters, Guards, Bounty Hunters, Assassins, Beast Tamers.

### Social & Support Roles
Diplomats, Storytellers, Healers, Teachers, Spies, Performers.

### Mystical Pursuits
Runecrafters, Enchanters, Diviners, Necromancers, Herbal Alchemists.

### City & Underground Specialists
Chimney Sweeps, Rat Catchers, Street Performers, Couriers, Locksmiths, Thieves, Counterfeiters, Fences, Gang Leaders, Poisoners.

### Explorers & Navigators
Cartographers, Pathfinders, Explorers, Sailors, Shipwrights.

These professions feed resources into the economy, unlock new crafting recipes, and open social doors across the city.

## Strategic Decisions

- **Exploit vs. Stabilize:** Players decide whether to profit from shortages or support their chosen faction’s stability.
- **Logistics Planning:** Balancing loadout weight with high-value goods influences travel risk and stamina drain.
- **Market Mastery:** Observing price history and rumor-driven hints helps players buy low, sell high, or crash markets intentionally.

Pair this system with the [Dynamic Health & Vitality](/docs/systems/dynamic-health-vitality) and [Social Intelligence Suite](/docs/systems/social-intelligence) pages to see how survival and relationships interact with your economic ambitions.
