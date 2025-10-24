import React, { JSX } from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import controlsData from '@site/src/data/controls.json';
import styles from './styles.module.css';



type ControlEntry = { category?: string };

type ToolkitCard = {
  id: string;
  title: string;
  description: string;
  image: string;
  to: string;
  badge: string;
  stats: string[];
  itch?: string;     // optional itch page for CTA
};

const controlsRecord = controlsData as Record<string, ControlEntry>;
const controls = Object.values(controlsRecord);
const categorySet = new Set<string>(controls.map(c => c.category || 'Components'));

const toolkits: ToolkitCard[] = [
  {
    id: 'godot-dataviz',
    title: 'Godot DataViz UI Kit',
    description:
      'Production-ready charts, tables, and graph widgets built on a theme engine. Drop-in nodes with signals and polished defaults.',
    image: '/img/DataVis-Toolkit.png',
    to: '/docs/toolkits/godot-dataviz',
    badge: 'GDExtension • Godot 4.x',
    stats: [`${controls.length} controls`, `${categorySet.size} categories`],
    itch: 'https://emergent-realms.itch.io/godot-dataviz-ui', 
  },
];

export default function ToolkitsLanding(): JSX.Element {
  return (
    <>
      {/* HERO */}
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <span className="badge badge--primary">Toolkits &amp; Assets</span>
          <h1>High-quality Godot GDExtensions, built for real games.</h1>
          <p className={styles.lede}>
            We ship the exact tools we use in <em>Cobblestone Legacy</em>: performant C++ GDExtensions with clean
            GDScript APIs, consistent theming, and editor-friendly workflows. Battle-tested in a large, data-driven
            project—shared with the community on itch.io.
          </p>

          <div className={styles.heroCtas}>
            <Link className="button button--primary button--lg" to="/docs/cobblestone/overview">
              See what we’re building
            </Link>
            <a className="button button--secondary button--lg" href="https://discord.gg/2Rj5EVrP9e">
              Join our Discord
            </a>
          </div>
        </div>
      </header>

      <main className="container">
        {/* WHY SECTION */}
        <section className={styles.why}>
          <h2>Why our GDExtensions?</h2>
          <ul className={styles.points}>
            <li><strong>Performance first.</strong> Tight C++ cores exposed via GDScript for rapid iteration.</li>
            <li><strong>Theme-aware UI.</strong> Central theme manager with light/dark and color seeds.</li>
            <li><strong>Production polish.</strong> Sensible defaults, hover/click signals, and docs with code.</li>
            <li><strong>Cross-platform.</strong> Windows, macOS, and Linux builds in active use.</li>
          </ul>
        </section>

        {/* GRID OF TOOLKITS */}
        <section className={styles.intro}>
          <h2>Pick a toolkit</h2>
          <p>Each toolkit includes screenshots, API notes, and copy-ready examples. Start with an overview or jump straight to the controls you need.</p>
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
                <p>{tk.description}</p>
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

        {/* ITCH PROMO STRIP */}
        <section className={styles.itchStrip}>
          <div className={styles.itchInner}>
            <div>
              <h3 style={{marginBottom: 6}}>Support indie tools you can trust.</h3>
              <p className={styles.stripText}>
                Our extensions are the same ones we use to ship our games. Your feedback funds better docs, examples, and features.
              </p>
              <p>
                <iframe frameborder="0" src="https://itch.io/embed/3973773?bg_color=464646&amp;fg_color=f4f0f0&amp;border_color=b58b00" width="552" height="167">
              <a href="https://emergent-realms.itch.io/godot-dataviz-ui">DataViz UI – Advanced Visualization Addon for Godot 4.5+ by Emergent-Realms</a>
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
