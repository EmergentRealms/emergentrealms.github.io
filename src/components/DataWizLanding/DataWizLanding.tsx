import React, { JSX } from 'react';
import Link from '@docusaurus/Link';
import CodeBlock from '@theme/CodeBlock';
import clsx from 'clsx';

import references from '@site/src/data/datawiz.json';
import styles from './styles.module.css';

type ReferenceEntry = {
  title: string;
  subtitle?: string;
  category?: string;
  status?: string;
  updatedAt?: string;
  tags?: string[];
  summary?: string;
};

export default function DataWizLanding(): JSX.Element {
  const record = references as Record<string, ReferenceEntry>;
  const entries = Object.entries(record);

  const handleQuickStartClick = React.useCallback(() => {
    const target = document.getElementById('quick-start');
    target?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <>
      <header className={styles.hero}>
        <div className={clsx('container', styles.heroContent)}>
          <span className="badge badge--primary">Godot Toolkit</span>
          <h1>Godot DataWizard SQLite Toolkit</h1>
          <p>
            Ship persistent progression, inventories, and analytics without leaving Godot. DataWizard bundles SQLite with
            a schema-aware C++ extension, async helpers, and ergonomics tailored for game teams.
          </p>

          <div className={styles.heroIllustration}>
            <img src="/img/datawiz-toolkit.svg" alt="DataWiz workflow overview" loading="lazy" />
          </div>

          <div className={styles.heroActions}>
            <button type="button" className="button button--secondary" onClick={handleQuickStartClick}>
              Follow the quick start
            </button>
            <Link className="button button--primary" to="https://emergent-realms.itch.io/godot-datawiz" target="_blank">
              Download on itch.io
            </Link>
          </div>

          <div className={styles.heroStats}>
            <div>
              <strong>SQLite 3</strong>
              <span>bundled & tuned</span>
            </div>
            <div>
              <strong>Async</strong>
              <span>writer thread + reader pool</span>
            </div>
            <div>
              <strong>{entries.length}</strong>
              <span>core building blocks</span>
            </div>
          </div>
        </div>
      </header>

      <main className={clsx('container', styles.main)}>
        <section className={styles.highlights}>
          <article>
            <h2>Production-ready persistence</h2>
            <p>
              DataWiz leans on WAL mode, pragma tuning, and pooled connections so your save system keeps pace with gameplay.
              The GDExtension ships with binaries for Godot 4.4 (Jolt) and safe fallbacks for editor previews.
            </p>
          </article>
          <article>
            <h2>Schema automation</h2>
            <p>
              Describe your data once with <code>DWRecord</code> or <code>DWAutoLoad</code> resources. DataWiz generates tables, unique keys, and
              indices on demand, keeping the database synchronized with your exported properties.
            </p>
          </article>
          <article>
            <h2>Typed Godot ergonomics</h2>
            <p>
              Hydrate complex dictionaries, arrays, and GUIDs without custom serializers. Helpers in <code>DWTypes</code> keep your
              resource fields strongly typed while persisting through SQLite.
            </p>
          </article>
        </section>

        <section id="quick-start" className={styles.quickStart}>
          <h2>Quick start</h2>
          <p>
            Drop the GDExtension into <code>res://addons/datawiz/</code>, Activate the plugin, then define
            your records. These four steps get you from install to querying live data.
          </p>

          <div className={styles.quickGrid}>
            {/* 1. Boot */}
            <div className={styles.quickCard}>
              <h3>1. Boot the service</h3>
              <p>Register the singleton and open your database with a reader pool sized for your project.</p>
              <CodeBlock language="gdscript">{`@onready var data_wiz: DWService = get_node("/root/DataWiz")

func _ready() -> void:
    if data_wiz.open("user://SaveSlot1/data.dw", reader_pool_size = 6):
        await data_wiz.connected
        data_wiz.log_tuning_snapshot()
    else:
        push_error(data_wiz.get_last_error())`}</CodeBlock>
            </div>

            {/* 2. Model */}
            <div className={styles.quickCard}>
              <h3>2. Model your data</h3>
              <p>Use <code>DWRecord</code> resources to declare columns, primary keys, and unique constraints.</p>
              <CodeBlock language="gdscript">{`@tool
class_name InventoryRecord
extends DWRecord

@export var slot: int
@export var item_id: String
@export var quantity: int = 1

func _init() -> void:
    schema.table_name = "inventory"
    schema.primary_key = "slot"
    schema.unique_keys = [["item_id"]]`}</CodeBlock>
            </div>

            {/* 3. Easy select (NEW) */}
            <div className={styles.quickCard}>
              <h3>3. Load records with <code>select()</code></h3>
              <p>
                Pull rows into a typed <code>Array[T]</code> of live resource instances—no manual hydration needed.
              </p>
              <CodeBlock language="gdscript">{`# Load all data from db (typed arrays if your classes exist)
var npcs: Array[NPC] = DataWiz.select(NPC.new(), "is_alive = 1")
var factions: Array[Faction] = DataWiz.select(Faction.new())

for n in npcs:
    print(n.name, " hp:", n.hp)

# With params:
# var guards: Array[NPC] = DataWiz.select(NPC.new(), "faction = ?", ["Guard"])`}</CodeBlock>
            </div>

            {/* 4. (moved) Persist/query with helpers */}
            <div className={styles.quickCard}>
              <h3>4. Persist and iterate</h3>
              <p>Save a record and fetch it back—write SQL only when you need full control.</p>
              <CodeBlock language="gdscript">{`var record := InventoryRecord.new()
record.slot = 1
record.item_id = "healing_potion"
record.save_to_db()

var inventory := DataWiz.select(record, "ORDER BY slot ASC")
for entry in inventory:
    print(entry.slot, entry.item_id)`}</CodeBlock>
            </div>
          </div>
        </section>

        <section className={styles.referenceSection}>
          <div className={styles.referenceHeader}>
            <h2>Explore the building blocks</h2>
            <p>
              Dive into focused component pages for the service singleton, schema resources, Autoload helpers, and utility
              functions. Each page highlights common usage patterns and the most important APIs.
            </p>
          </div>

          <div className={styles.referenceGrid}>
            {entries.map(([id, entry]) => (
              <article key={id} className={styles.referenceCard}>
                <div>
                  <h3>{entry.title}</h3>
                  {entry.subtitle && <p>{entry.subtitle}</p>}
                </div>
                <div className={styles.referenceMeta}>
                  {entry.category && <span className="badge badge--primary">{entry.category}</span>}
                  {entry.status && <span className="badge badge--secondary">{entry.status}</span>}
                </div>
                <p className={styles.referenceSummary}>{entry.summary}</p>
                <Link className="button button--sm button--secondary" to={`/docs/toolkits/godot-datawiz/${id}`}>
                  View reference
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
