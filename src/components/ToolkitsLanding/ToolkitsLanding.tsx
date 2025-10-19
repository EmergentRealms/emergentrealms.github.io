import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import controlsData from '@site/src/data/controls.json';
import styles from './styles.module.css';

type ControlEntry = {
  category?: string;
};

type ToolkitCard = {
  id: string;
  title: string;
  description: string;
  image: string;
  to: string;
  badge: string;
  stats: string[];
};

const controlsRecord = controlsData as Record<string, ControlEntry>;
const datavizControls = Object.values(controlsRecord);
const datavizCategorySet = new Set<string>();
datavizControls.forEach((control) => {
  datavizCategorySet.add(control.category || 'Components');
});

const toolkits: ToolkitCard[] = [
  {
    id: 'godot-dataviz',
    title: 'Godot DataViz UI Kit',
    description: 'Charts, tables, graph widgets, and the central theme manager for data-driven Godot games and tools.',
    image: '/img/DataVis-Toolkit.png',
    to: '/docs/toolkits/godot-dataviz',
    badge: 'Godot',
    stats: [
      `${datavizControls.length} controls`,
      `${datavizCategorySet.size} categories`,
    ],
  },
];

export default function ToolkitsLanding(): JSX.Element {
  return (
    <>
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <span className="badge badge--primary">Toolkits &amp; Assets</span>
          <h1>Craft polished in-game dashboards faster.</h1>
          <p>
            Browse production-ready UI kits and reusable building blocks for Emergent Realms projects.
            Each toolkit bundles themed controls, authoring guides, and copy-ready GDScript snippets.
          </p>
        </div>
      </header>

      <main className="container">
        <section className={styles.intro}>
          <h2>Pick a toolkit</h2>
          <p>
            Every toolkit ships with screenshots, API references, and editable examples. Start with a quick overview
            or jump straight to the controls that match your current dashboard.
          </p>
        </section>

        <div className={styles.grid}>
          {toolkits.map((toolkit) => (
            <article key={toolkit.id} className={styles.card}>
              <div className={styles.cardImage}>
                <img src={useBaseUrl(toolkit.image)} alt={`${toolkit.title} preview`} loading="lazy" />
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardMeta}>
                  <span className="badge badge--secondary">{toolkit.badge}</span>
                  <ul>
                    {toolkit.stats.map((stat) => (
                      <li key={stat}>{stat}</li>
                    ))}
                  </ul>
                </div>
                <h3>{toolkit.title}</h3>
                <p>{toolkit.description}</p>
              </div>
              <div className={styles.cardFooter}>
                <Link className="button button--primary button--block" to={toolkit.to}>
                  Explore toolkit
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
