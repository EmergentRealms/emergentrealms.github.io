import React, { JSX } from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import clsx from 'clsx';
import controlsData from '@site/src/data/controls.json';
import styles from './styles.module.css';

type ControlEntry = {
  title: string;
  subtitle?: string;
  summary?: string;
  category?: string;
  status?: string;
  updatedAt?: string;
  tags?: string[];
  docsHref?: string;
  thumbnail?: string;
};

const statusClassMap: Record<string, string> = {
  stable: 'badge badge--success',
  beta: 'badge badge--warning',
  alpha: 'badge badge--danger',
};

function getStatusClass(status?: string): string {
  if (!status) return 'badge badge--secondary';
  const normalized = status.toLowerCase();
  return statusClassMap[normalized] || 'badge badge--secondary';
}

function formatStatus(status?: string): string | null {
  if (!status) return null;
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function formatDate(value?: string): string | null {
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }
  return parsed.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

const categoryDescriptions: Record<string, string> = {
  Theme: 'Configure global palettes, typography, and dark/light modes before wiring controls.',
  Charts: 'Plot timelines, quartiles, and categorical breakdowns with responsive chart controls.',
  Graphs: 'Surface KPIs, gauges, and comparative radar plots for at-a-glance insights.',
  Other: 'Data grids and detail panels for drilling into the numbers behind your dashboards.',
  'Other UI': 'Tables, inspectors, and supporting widgets to round out the toolkit.',
};

export default function DataVizLanding(): JSX.Element {
  const controlsRecord = controlsData as Record<string, ControlEntry>;
  const controls = Object.values(controlsRecord);

  const grouped: Record<string, ControlEntry[]> = {};
  controls.forEach((control) => {
    const category = control.category || 'Other UI';
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(control);
  });

  const sortedCategories = Object.keys(grouped)
    .sort((a, b) => a.localeCompare(b))
    .map((category) => [category, grouped[category].slice().sort((a, b) => a.title.localeCompare(b.title))] as [string, ControlEntry[]]);

  return (
    <>
      <header className={styles.hero}>
        <div className={clsx('container', styles.heroContent)}>
          <span className="badge badge--primary">Godot Toolkit</span>
          <h1>Godot DataViz UI Kit</h1>
          <p>
            Production-ready charts, KPI tiles, graphs, and data grids that plug directly into Godot dashboards.
            Every control ships with theme-aware styles, integration tips, and runnable GDScript snippets.
          </p>
          <div className={styles.cardImage}>
            <img src="/img/dataviz/ChartsDashboard.png" alt="Charts Dashboard preview" loading="lazy" />
          </div>

          <iframe frameBorder="0" src="https://itch.io/embed/3973773?bg_color=464646&amp;fg_color=f4f0f0&amp;border_color=b58b00" width="552" height="167"><a href="https://emergent-realms.itch.io/godot-dataviz-ui">DataViz UI – Advanced Visualization Addon for Godot 4.5+ by Emergent-Realms</a></iframe>

          <div className={styles.heroStats}>
            <div>
              <strong>{controls.length}</strong>
              <span>Controls</span>
            </div>
            <div>
              <strong>{sortedCategories.length}</strong>
              <span>Categories</span>
            </div>
            <div>
              <strong>100%</strong>
              <span>Theme-aware</span>
            </div>
          </div>

          <div className={styles.heroActions}>
            <Link className="button button--secondary" to="/docs/toolkits/godot-dataviz/central-theme">
              Configure the theme manager
            </Link>
            <Link className="button button--primary" to="/docs/toolkits">
              Browse other toolkits
            </Link>
          </div>
        </div>
      </header>

      <main className={clsx('container', styles.main)}>
        <section className={styles.intro}>
          <h2>Pick a control to start building</h2>
          <p>
            Use the categorized gallery below to jump straight into component docs. Each card links to detailed usage guidance,
            editable code, and theme recommendations so you can compose dashboards without pixel pushing.
          </p>
          <div className={styles.cardImage}>
            <img src="/img/DataVis-Toolkit.png" alt="Charts Dashboard preview" loading="lazy" />
          </div>
        </section>

        {sortedCategories.map(([category, items]) => (
          <section key={category} className={styles.categorySection}>
            <div className={styles.categoryHeader}>
              <div>
                <h2>{category}</h2>
                {categoryDescriptions[category] && <p>{categoryDescriptions[category]}</p>}
              </div>
              <span className={styles.categoryCount}>{items.length} item{items.length > 1 ? 's' : ''}</span>
            </div>

            <div className={styles.cardGrid}>
              {items.map((control) => (
                <article key={control.title} className={styles.controlCard}>
                  <div className={styles.controlThumb}>
                    {control.thumbnail ? (
                      <img src={useBaseUrl(control.thumbnail)} alt={`${control.title} thumbnail`} loading="lazy" />
                    ) : (
                      <div className={styles.controlThumbPlaceholder}>No preview</div>
                    )}
                  </div>
                  <div className={styles.controlBody}>
                    <div className={styles.controlMeta}>
                      {formatStatus(control.status) && (
                        <span className={getStatusClass(control.status)}>{formatStatus(control.status)}</span>
                      )}
                      {formatDate(control.updatedAt) && (
                        <span className={styles.controlUpdated}>Updated {formatDate(control.updatedAt)}</span>
                      )}
                    </div>
                    <h3>{control.title}</h3>
                    <p>{control.summary || control.subtitle}</p>
                  </div>
                  <div className={styles.controlFooter}>
                    <div className={styles.controlTags}>
                      {(control.tags || []).slice(0, 3).map((tag) => (
                        <span key={tag} className="badge badge--secondary">{tag}</span>
                      ))}
                    </div>
                    {control.docsHref && (
                      <Link className="button button--sm button--secondary" to={control.docsHref}>
                        View docs
                      </Link>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </main>
    </>
  );
}
