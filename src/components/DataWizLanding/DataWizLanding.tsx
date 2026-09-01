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
            Declare a class, call <code>save_to_db()</code>. DataWizard maps your script variables to SQLite columns,
            creates and migrates the tables, keeps writes off the main thread, and hands the rows back as your own
            types &mdash; no SQL, no schema file, no serialisation code. There is no autoload to add.
          </p>

          <div className={styles.heroIllustration}>
            <img src="/img/datawiz-toolkit.svg" alt="DataWiz workflow overview" loading="lazy" />
          </div>

          <div className={styles.heroActions}>
            <button type="button" className="button button--secondary" onClick={handleQuickStartClick}>
              Follow the quick start
            </button>
            
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
              Writes are queued on their own thread and batched into transactions; reads lease a connection from a pool.
              Binaries ship for Windows, macOS, Linux and the web, against Godot 4.5 and newer.
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
            Drop the GDExtension into <code>res://addons/datawiz/</code> and define your records. There is no plugin to
            enable and no autoload to add &mdash; the addon registers a <code>DataWiz</code> singleton and opens the
            database named in Project Settings the first time anything uses it.
          </p>

          <div className={styles.quickGrid}>
            {/* 1. Boot */}
            <div className={styles.quickCard}>
              <h3>1. Nothing to boot</h3>
              <p>
                The database opens by itself. Connect <code>sql_error</code> wherever you like, and open a file yourself
                only when you want save slots.
              </p>
              <CodeBlock language="gdscript">{`func _ready() -> void:
    DataWiz.sql_error.connect(func(context, message):
        push_error("[DataWiz] %s: %s" % [context, message]))

    print(DataWiz.db_connected())   # already true, unless auto_open is off

# Save slots: turn datawiz/database/auto_open off, then
func load_slot(n: int) -> void:
    DataWiz.open("user://slot_%d.db" % n, 4)   # path, reader pool size`}</CodeBlock>
            </div>

            {/* 2. Model */}
            <div className={styles.quickCard}>
              <h3>2. Model your data</h3>
              <p>Use <code>DWRecord</code> resources to declare columns, primary keys, and unique constraints.</p>
              <CodeBlock language="gdscript">{`class_name InventoryRecord
extends DWRecord

# Convention variables configure storage and are not stored as columns.
var table_name := "inventory"
var unique_fields := ["slot"]      # defaults to the generated guid
var index_fields := ["item_id"]

# Every other script variable becomes a column, exported or not.
# Prefix one with _ to keep it out of the database.
var slot: int = 0
var item_id: String = ""
var quantity: int = 1
`}</CodeBlock>
            </div>

            {/* 3. Easy select (NEW) */}
            <div className={styles.quickCard}>
              <h3>3. Load records with <code>select()</code></h3>
              <p>
                Pull rows back as live resource instances, nested records and all—no manual hydration needed.
              </p>
              <CodeBlock language="gdscript">{`# select() hands back Array[DWRecord]; the objects in it are your class.
var npcs := DataWiz.select(NPC.new(), "is_alive = 1")
for n in npcs:
	print(n.name, " hp:", n.hp)

# Bind your values, never format them into the string.
var guards := DataWiz.select(NPC.new(), "faction = ?", ["Guard"])

# Want a statically typed array? assign() converts it.
var typed: Array[NPC] = []
typed.assign(DataWiz.select(NPC.new()))`}</CodeBlock>
            </div>

            {/* 4. (moved) Persist/query with helpers */}
            <div className={styles.quickCard}>
              <h3>4. Persist and iterate</h3>
              <p>Save a record and fetch it back—write SQL only when you need full control.</p>
              <CodeBlock language="gdscript">{`var record := InventoryRecord.new()
record.slot = 1
record.item_id = "healing_potion"
record.save_to_db()          # queued; pass true to wait for the commit

# select(record, where, params, limit, order_by, offset)
var inventory := DataWiz.select(record, "", [], -1, "slot ASC")
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
