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
            types &mdash; no SQL, no schema file, no serialisation code. There is no autoload to add and no plugin to
            enable.
          </p>
          <p className={styles.heroSub}>
            It is a real SQLite database, not a save format. Windows, macOS, Linux and the browser.
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
              <strong>0 lines</strong>
              <span>of SQL required</span>
            </div>
          </div>
        </div>
      </header>

      <main className={clsx('container', styles.main)}>
        <section className={styles.contrast}>
          <h2>The code you do not write</h2>
          <p className={styles.contrastLede}>
            Saving an NPC and its inventory, by hand and with DataWizard. Both do the same thing.
          </p>
          <div className={styles.contrastGrid}>
            <div>
              <h3>By hand</h3>
              <CodeBlock language="gdscript">{`# Open, and hope the schema matches what shipped last patch
db.query("CREATE TABLE IF NOT EXISTS npc (...)")
db.query("CREATE TABLE IF NOT EXISTS item (...)")

# Flatten the object yourself
var row := {
	"name": npc.name,
	"age": npc.age,
	"pos": var_to_str(npc.position),
	"stats": JSON.stringify(npc.stats),
}
db.insert_or_update("npc", row, "name")

# Now the children, and the link back to the parent
for it in npc.inventory:
	db.insert_or_update("item", {
		"owner": npc.name, "name": it.name, "qty": it.qty
	}, "name")

# ...then all of it again, backwards, to load.
# ...on the main thread, so the frame waits.
# ...and again next patch, when you add a field.`}</CodeBlock>
            </div>
            <div>
              <h3>With DataWizard</h3>
              <CodeBlock language="gdscript">{`npc.save_to_db()`}</CodeBlock>
              <p className={styles.contrastNote}>
                Every script variable is a column. Nested records go to their own table and come back with their
                parent. The write is queued on a background thread, so the call returns in microseconds and your
                frame never waits on the disk.
              </p>
              <p className={styles.contrastNote}>
                Loading is the mirror image:
              </p>
              <CodeBlock language="gdscript">{`var npcs := DataWiz.select(Npc.new())
# inventory is already populated`}</CodeBlock>
            </div>
          </div>
        </section>

        <section className={styles.highlights}>
          <article>
            <h2>It never stalls your frame</h2>
            <p>
              Writes go to a dedicated writer thread and are batched into transactions. Reads lease a connection
              from a pool. Values are copied off your object on the calling thread, so the writer never touches a
              Godot object and you can keep mutating it the moment the call returns.
            </p>
            <p>
              When a read is big enough to matter, <code>select_async()</code> moves it off the main thread and hands
              the rows to a callback: in our benchmark a 2,000-row load that blocked for 28&nbsp;ms returned in
              0.03&nbsp;ms and delivered six frames later, with the game still running underneath.
            </p>
          </article>
          <article>
            <h2>It survives your next patch</h2>
            <p>
              The hard part of shipping a save system is not the first version &mdash; it is the second. Add a field to
              a class players already have data for and DataWizard adds the column on next use, then tells you through
              a <code>schema_changed</code> signal so you can backfill a default.
            </p>
            <p>
              For anything bigger there is a versioned migration hook: <code>get_user_version()</code>,{' '}
              <code>set_user_version()</code> and <code>migrate(target, step)</code>.
            </p>
          </article>
          <article>
            <h2>It is a real database</h2>
            <p>
              SQLite 3, bundled and tuned &mdash; WAL journaling, prepared-statement caching, pragma tuning. Not an
              opaque save blob.
            </p>
            <p>
              That means you can open the file in any SQLite browser, write a tool against it, query it with{' '}
              <code>DataWiz.query()</code> when you want the full power of SQL, and hand a support ticket's save file
              to a script instead of a debugger.
            </p>
          </article>
        </section>

        <section className={styles.numbers}>
          <h2>Measured, not claimed</h2>
          <p>2,000 records, 500 of them carrying two nested children each, on a desktop Linux build.</p>
          <div className={styles.numberGrid}>
            <div><strong>~5.5&nbsp;&micro;s</strong><span>per row loaded</span></div>
            <div><strong>~27&nbsp;&micro;s</strong><span>per row with 2 nested records</span></div>
            <div><strong>0.03&nbsp;ms</strong><span>to fire an async select</span></div>
            <div><strong>0.01&nbsp;ms</strong><span>to fetch one row by key</span></div>
          </div>
          <p className={styles.numbersFoot}>
            Rule of thumb: a few hundred records is free, and past a few thousand &mdash; or a few hundred with nested
            children &mdash; reach for <code>select_async()</code> so the load never shows.
          </p>
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

        <section className={styles.platforms}>
          <h2>Everywhere your game goes</h2>
          <p>
            Windows, Linux, macOS (universal) and WebAssembly, against the Godot 4.5 extension API and every later 4.x.
          </p>
          <p>
            The browser build is real: threads, WAL journaling and a persistent database in a tab. It needs
            cross-origin isolation headers and one extra line to flush the browser filesystem after a save &mdash;{' '}
            <Link to="/docs/toolkits/platforms">the platforms page covers both</Link>.
          </p>
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
