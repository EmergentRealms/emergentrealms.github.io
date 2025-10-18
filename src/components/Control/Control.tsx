import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import clsx from 'clsx';

/*
Example usage:
import React from 'react';
import ComponentPage from '@site/src/components/ComponentPage/ComponentPage';

export default function Page() {
  return <ComponentPage id="theme-manager" />;
}
*/

// Update path if needed:
import components from '@site/src/data/controls.json';

type Tutorial = {
  title: string;
  description?: string;
  codeHref: string;
  image?: string;
};

type ComponentEntry = {
  title: string;
  subtitle?: string;
  category?: string;
  status?: 'alpha' | 'beta' | 'stable' | string;
  updatedAt?: string;
  tags?: string[];
  summary?: string;
  docsHref?: string;
  thumbnail?: string;
  tutorials?: Tutorial[];
};

export default function ComponentPage({ id }: { id: string }) {
  const data = (components as Record<string, ComponentEntry>)[id];

  if (!data) {
    return (
      <Layout title="Component not found">
        <main className="container padding-vert--lg">
          <h1>Component not found</h1>
          <p>No component with id <code>{id}</code> in <code>src/data/components.json</code>.</p>
          <p><Link to="/features">Back to Features</Link></p>
        </main>
      </Layout>
    );
  }

  const title = data.title;
  const desc =
    data.summary ??
    data.subtitle ??
    `${data.title}${data.status ? ` — ${data.status}` : ''}`;

  const thumb = data.thumbnail ? useBaseUrl(data.thumbnail) : undefined;

  return (
    <Layout title={`${title} — Component`} description={desc}>
      {/* Header */}
      <header className="hero" style={{ borderBottom: '1px solid var(--ifm-border-color)' }}>
        <div className="container">
          <h1 className="hero__title" style={{ marginBottom: 6 }}>{title}</h1>
          {data.subtitle && <p className="hero__subtitle">{data.subtitle}</p>}

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginTop: 12 }}>
            {data.category && <span className="badge badge--primary">{data.category}</span>}
            {data.status && <span className="badge">{data.status}</span>}
            {data.updatedAt && (
              <span className="badge">
                Updated:&nbsp;{new Date(data.updatedAt).toLocaleDateString()}
              </span>
            )}
            {data.tags?.map(t => (
              <span key={t} className="badge badge--secondary">{t}</span>
            ))}
          </div>
        </div>
      </header>

      <main className="container padding-vert--lg">
        {/* Thumbnail */}
        {thumb && (
          <img
            src={thumb}
            alt={`${title} thumbnail`}
            style={{
              width: '100%',
              borderRadius: 12,
              border: '1px solid var(--ifm-border-color)',
              marginBottom: 16,
              objectFit: 'cover'
            }}
          />
        )}

        {/* Summary */}
        {data.summary && (
          <p style={{ fontSize: '1.05rem', marginBottom: 16 }}>{data.summary}</p>
        )}

        {/* Docs link */}
        {data.docsHref && (
          <p style={{ marginTop: 4, marginBottom: 24 }}>
            <Link className={clsx('button', 'button--secondary', 'button--sm')} to={data.docsHref}>
              Open Component Docs
            </Link>
          </p>
        )}

        {/* Tutorials */}
        {!!data.tutorials?.length && (
          <>
            <h2 style={{ marginTop: 0 }}>Tutorials</h2>
            <TutorialGrid tutorials={data.tutorials} />
          </>
        )}
      </main>
    </Layout>
  );
}

/* ---------- Tutorial Grid ---------- */

function TutorialGrid({ tutorials }: { tutorials: Tutorial[] }) {
  return (
    <div className="row" style={{ rowGap: 16 }}>
      {tutorials.map((tut, idx) => (
        <div className="col col--6" key={`${tut.title}-${idx}`}>
          <TutorialCard item={tut} />
        </div>
      ))}
    </div>
  );
}

function TutorialCard({ item }: { item: Tutorial }) {
  const img = item.image ? useBaseUrl(item.image) : undefined;

  return (
    <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {img && (
        <div className="card__image" style={{ '--card-hero-h': '220px' } as React.CSSProperties}>
          <img
            src={img}
            alt={item.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      )}
      <div className="card__body" style={{ flex: 1 }}>
        <h3 style={{ marginBottom: 6 }}>{item.title}</h3>
        {item.description && <p style={{ marginBottom: 8 }}>{item.description}</p>}
      </div>
      <div className="card__footer" style={{ display: 'flex', gap: 8 }}>
        <a
          className={clsx('button', 'button--primary', 'button--sm', 'button--block')}
          href={item.codeHref}
        >
          View GDScript
        </a>
      </div>
    </div>
  );
}
