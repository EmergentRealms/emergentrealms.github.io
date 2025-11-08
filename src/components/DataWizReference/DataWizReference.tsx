import React from 'react';
import Layout from '@theme/Layout';
import CodeBlock from '@theme/CodeBlock';
import clsx from 'clsx';

import references from '@site/src/data/datawiz.json';
import styles from './styles.module.css';

type UsageSnippet = {
  title: string;
  description?: string;
  code: string;
  language?: string;
};

type NamedItem = {
  name: string;
  description: string;
};

type ReferenceEntry = {
  title: string;
  subtitle?: string;
  category?: string;
  status?: string;
  updatedAt?: string;
  tags?: string[];
  summary?: string;
  hero?: string;
  highlights?: string[];
  usage?: UsageSnippet[];
  signals?: NamedItem[];
  methods?: NamedItem[];
  tips?: string[];
};

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
  return parsed.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function DataWizReference({ id }: { id: string }) {
  const entry = (references as Record<string, ReferenceEntry>)[id];

  if (!entry) {
    return (
      <Layout title="Reference not found">
        <main className="container padding-vert--lg">
          <h1>Reference not found</h1>
          <p>
            No DataWiz reference with id <code>{id}</code> in <code>src/data/datawiz.json</code>.
          </p>
        </main>
      </Layout>
    );
  }

  const title = entry.title;
  const description = entry.summary ?? entry.subtitle ?? `${title} reference`;

  return (
    <Layout title={`${title} — DataWiz`} description={description}>
      <header className={styles.hero}>
        <div className={clsx('container', styles.heroContent)}>
          {entry.category && <span className="badge badge--primary">{entry.category}</span>}
          <h1>{title}</h1>
          {entry.subtitle && <p className={styles.subtitle}>{entry.subtitle}</p>}

          <div className={styles.metaRow}>
            {formatStatus(entry.status) && (
              <span className="badge badge--secondary">{formatStatus(entry.status)}</span>
            )}
            {formatDate(entry.updatedAt) && (
              <span className="badge">Updated {formatDate(entry.updatedAt)}</span>
            )}
            {entry.tags?.map((tag) => (
              <span key={tag} className="badge badge--secondary">{tag}</span>
            ))}
          </div>

          {entry.summary && <p className={styles.summary}>{entry.summary}</p>}

         {entry.highlights && entry.highlights.length > 0 && (
           <div className={styles.highlights}>
              {entry.highlights.map((item) => {
                const [title, ...rest] = item.split(' — ');
                const hasBody = rest.length > 0;
                const body = rest.join(' — ');

                return (
                  <div key={item} className={styles.highlightCard}>
                    {hasBody ? <h3>{title}</h3> : null}
                    <p>{hasBody ? body : title}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </header>

      <main className={clsx('container', styles.main)}>
        {entry.usage && entry.usage.length > 0 && (
          <section className={styles.section}>
            <h2>Usage patterns</h2>
            <div className={styles.usageGrid}>
              {entry.usage.map((snippet) => (
                <article key={snippet.title} className={styles.usageCard}>
                  <div className={styles.usageHeader}>
                    <h3>{snippet.title}</h3>
                    {snippet.description && <p>{snippet.description}</p>}
                  </div>
                  <CodeBlock language={snippet.language ?? 'gdscript'}>{snippet.code.trim()}</CodeBlock>
                </article>
              ))}
            </div>
          </section>
        )}

        {entry.signals && entry.signals.length > 0 && (
          <section className={styles.section}>
            <h2>Signals</h2>
            <ul className={styles.definitionList}>
              {entry.signals.map((signal) => (
                <li key={signal.name}>
                  <strong>{signal.name}</strong>
                  <p>{signal.description}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {entry.methods && entry.methods.length > 0 && (
          <section className={styles.section}>
            <h2>Key methods</h2>
            <ul className={styles.definitionList}>
              {entry.methods.map((method) => (
                <li key={method.name}>
                  <strong>{method.name}</strong>
                  <p>{method.description}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {entry.tips && entry.tips.length > 0 && (
          <section className={styles.section}>
            <h2>Operational tips</h2>
            <ul className={styles.tipList}>
              {entry.tips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </Layout>
  );
}
