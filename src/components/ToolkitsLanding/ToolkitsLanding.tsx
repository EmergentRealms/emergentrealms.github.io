import React, { JSX } from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import CodeBlock from '@theme/CodeBlock';
import controlsData from '@site/src/data/controls.json';
import styles from './styles.module.css';

type ControlEntry = { category?: string };

type ToolkitCard = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  to: string;
  badge: string;
  stats: string[];
  code: string;
  codeCaption: string;
  itch?: string;
};

const controlsRecord = controlsData as Record<string, ControlEntry>;
const controls = Object.values(controlsRecord);
const categorySet = new Set<string>(controls.map((c) => c.category || 'Components'));

const toolkits: ToolkitCard[] = [
  {
    id: 'godot-dataviz',
    title: 'DataViz UI Kit',
    tagline: 'Charts that keep up with real data.',
    description:
      'Charts, gauges, KPI tiles, a virtualised grid and a heat map — every one a Control node you drop in the scene tree. One theme resource colours all of them, they emit the same interaction signals, and they work from a keyboard or a gamepad.',
    image: '/img/dataviz/showcase/dashboard.png',
    to: '/docs/toolkits/godot-dataviz',
    badge: 'GDExtension • Godot 4.5+',
    stats: [`${controls.length} controls`, `${categorySet.size} categories`, '100k points, no hitch'],
    codeCaption: 'A working chart, in full:',
    code: `@onready var chart := $LineChart

func _ready() -> void:
\tchart.set_categories(["Mon", "Tue", "Wed", "Thu", "Fri"])
\tchart.add_series("Revenue", PackedFloat32Array([820, 932, 901, 1290, 1330]))
\tchart.item_clicked.connect(func(series, index, value):
\t\tprint("clicked ", value))`,
    itch: 'https://emergent-realms.itch.io/godot-dataviz-ui',
  },
  {
    id: 'godot-datawiz',
    title: 'DataWizard',
    tagline: 'Persistence you do not have to think about.',
    description:
      'Declare a class; every variable becomes a SQLite column. Tables are created and migrated for you, nested objects are saved and rehydrated with their parent, and writes are queued on a background thread so a save never costs you a frame.',
    image: '/img/dataviz/showcase/persistence.png',
    to: '/docs/toolkits/godot-datawiz',
    badge: 'GDExtension • Godot 4.5+',
    stats: ['Writer thread + reader pool', 'Schemas from your classes', 'Zero SQL required'],
    codeCaption: 'A save system, in full:',
    code: `class_name Hero extends DWRecord

var name: String = ""
var level: int = 1
var inventory: Array[Item] = []    # its own table, saved with the hero

# somewhere else
hero.save_to_db()
var everyone := DataWiz.select(Hero.new())`,
    itch: 'https://emergent-realms.itch.io/godot-datawiz',
  },
];

export default function ToolkitsLanding(): JSX.Element {
  return (
    <>
      {/* HERO */}
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <span className="badge badge--primary">Toolkits &amp; Assets</span>
          <h1>Godot GDExtensions, built for real games.</h1>
          <p className={styles.lede}>
            We ship the exact tools we use in <em>Cobblestone Legacy</em>: C++ cores with plain GDScript APIs, one
            shared theme system, and the awkward parts &mdash; threading, schema migration, virtualised drawing &mdash;
            already handled. Windows, macOS, Linux, and now the browser.
          </p>

          <div className={styles.heroCtas}>
            <Link className="button button--primary button--lg" to="/docs/toolkits/godot-dataviz">
              Explore DataViz
            </Link>
            <Link className="button button--secondary button--lg" to="/docs/toolkits/godot-datawiz">
              Explore DataWizard
            </Link>
          </div>
        </div>
      </header>

      <main className="container">
        {/* PLATFORMS */}
        <section className={styles.platformStrip}>
          <div>
            <h2>Runs where your game runs</h2>
            <p>
              Both toolkits ship binaries for Windows, Linux and macOS (universal, Intel and Apple Silicon), and both
              compile to WebAssembly &mdash; charts, grids and a live SQLite database, in a browser tab. That last one
              is unusual for a C++ GDExtension, so we wrote down exactly what it takes.
            </p>
            <Link className="button button--secondary" to="/docs/toolkits/platforms">
              Platform notes &amp; web setup
            </Link>
          </div>
          <ul className={styles.platformList}>
            <li><strong>Windows</strong><span>x86_64</span></li>
            <li><strong>Linux</strong><span>x86_64</span></li>
            <li><strong>macOS</strong><span>universal</span></li>
            <li><strong>Web</strong><span>wasm32 + threads</span></li>
          </ul>
        </section>

        {/* GRID OF TOOLKITS */}
        <section className={styles.intro}>
          <h2>Two toolkits</h2>
          <p>
            One draws your data, the other stores it. They are independent &mdash; take either on its own.
          </p>
        </section>

        <div className={styles.grid}>
          {toolkits.map((tk) => (
            <article key={tk.id} className={styles.card}>
              <div className={styles.cardImage}>
                <img src={useBaseUrl(tk.image)} alt={`${tk.title} preview`} loading="lazy" />
              </div>

              <div className={styles.cardBody}>
                <div className={styles.cardMeta}>
                  <span className="badge badge--secondary">{tk.badge}</span>
                  <ul>{tk.stats.map((s) => <li key={s}>{s}</li>)}</ul>
                </div>

                <h3>{tk.title}</h3>
                <p className={styles.tagline}>{tk.tagline}</p>
                <p>{tk.description}</p>

                <p className={styles.codeCaption}>{tk.codeCaption}</p>
                <CodeBlock language="gdscript">{tk.code}</CodeBlock>
              </div>

              <div className={styles.cardFooter}>
                <Link className="button button--primary button--block" to={tk.to}>
                  Explore toolkit
                </Link>
                {tk.itch && (
                  <a className="button button--secondary button--block" href={tk.itch}>
                    Get it on itch.io
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* WHY SECTION */}
        <section className={styles.why}>
          <h2>Why these and not a GDScript addon?</h2>
          <ul className={styles.points}>
            <li>
              <strong>They stay fast when the data gets big.</strong> The grid draws only the rows on screen and the
              line chart decimates to roughly two samples per horizontal pixel. Redrawing a 100,000-point series went
              from 460&nbsp;ms in 1.0 to below the measurement floor in 1.1; sorting a 10,000-row grid takes about
              10&nbsp;ms. That is the whole reason for the C++.
            </li>
            <li>
              <strong>Nothing blocks the main thread.</strong> DataWizard writes on its own thread and reads from a
              pool; big reads can be moved off the frame entirely with a callback.
            </li>
            <li>
              <strong>One theme, everything.</strong> Set colour seeds once and every control follows, light or dark,
              with contrast checked against the background rather than eyeballed.
            </li>
            <li>
              <strong>They are documented like a product.</strong> Every example on this site is compiled and executed
              against the shipped binaries before it goes up, so what you paste is what runs.
            </li>
          </ul>
        </section>

        {/* ITCH PROMO STRIP */}
        <section className={styles.itchStrip}>
          <div className={styles.itchInner}>
            <div>
              <h3 style={{ marginBottom: 6 }}>Support indie tools you can trust.</h3>
              <p className={styles.stripText}>
                These are the same extensions we use to ship our own games. Buying one funds better docs, more
                examples, and the next feature.
              </p>
              <p>
                <iframe
                  frameBorder="0"
                  src="https://itch.io/embed/3973773?bg_color=464646&amp;fg_color=f4f0f0&amp;border_color=b58b00"
                  width="552"
                  height="167"
                >
                  <a href="https://emergent-realms.itch.io/godot-dataviz-ui">
                    DataViz UI – Advanced Visualization Addon for Godot 4.5+ by Emergent-Realms
                  </a>
                </iframe>
              </p>
            </div>
            <a className="button button--primary button--lg" href="https://emergent-realms.itch.io/godot-dataviz-ui/">
              Browse on itch.io
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
