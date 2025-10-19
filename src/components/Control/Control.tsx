import React from 'react';
import { CodeBlock } from 'react-code-block';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
// import CodeBlock from '@theme/CodeBlock';
import clsx from 'clsx';

// Data file (adjust path if different)
import components from '@site/src/data/controls.json';

type Tutorial = {
  title: string;
  description?: string;
  codeHref: string;
  codeLanguage?: string;
  image?: string;       // legacy field name (still supported)
  screenshot?: string;  // preferred field name
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
  const desc = data.summary ?? data.subtitle ?? `${data.title}${data.status ? ` — ${data.status}` : ''}`;
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
              <span className="badge">Updated:&nbsp;{new Date(data.updatedAt).toLocaleDateString()}</span>
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
              display: 'block',           // <-- makes margin:auto work
              width: '60%',
              margin: '0 auto 16px',      // <-- centers horizontally
              borderRadius: 12,
              border: '1px solid var(--ifm-border-color)',
              objectFit: 'cover'
            }}
          />
        )}

        {/* Summary */}
        {data.summary && <p style={{ fontSize: '1.05rem', marginBottom: 16 }}>{data.summary}</p>}

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
            <TutorialList tutorials={data.tutorials} />
          </>
        )}
      </main>
    </Layout>
  );
}

/* ---------- Tutorials: full-width, two-column rows ---------- */

function TutorialList({ tutorials }: { tutorials: Tutorial[] }) {
  return (
    <div className="tutorial-list">
      {tutorials.map((t, i) => (
        <TutorialRow key={`${t.title}-${i}`} item={t} />
      ))}
    </div>
  );
}

function TutorialRow({ item }: { item: Tutorial }) {
  const imgSrc = useBaseUrl(item.screenshot ?? item.image ?? '');

  return (
    <section
      className="tutorial-row"
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0,35%) minmax(0,65%)', // ← 35% text+image | 65% code
        gap: 16,
        alignItems: 'start',
        width: '100%',
        padding: 12,
        border: '1px solid var(--ifm-border-color)',
        borderRadius: 12,
        background: 'var(--ifm-background-surface-color)',
      }}
    >
      {/* Left column */}
      <div className="tutorial-col tutorial-col--left" style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
        <h3 className="tutorial-title" style={{ margin: 0 }}>{item.title}</h3>
        {item.description && <p className="tutorial-desc" style={{ margin: 0 }}>{item.description}</p>}
        <a href={imgSrc} target="_blank" rel="noopener noreferrer">
        {imgSrc && (
          <div className="tutorial-shot card">
            <div className="card__image" style={{ '--card-hero-h': '260px' } as React.CSSProperties}>
              <img src={imgSrc} alt={item.title} />
            </div>
          </div>
        )}
        </a>
      </div>

      {/* Right column */}
      <div className="tutorial-col tutorial-col--right" style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
        <TutorialCodeBlock href={item.codeHref} language={item.codeLanguage} />
        
      </div>
    </section>
  );
}

/* ---------- Code loader stays the same ---------- */
function TutorialCodeBlock({ href, language }: { href: string; language?: string }) {
  const [code, setCode] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const rawUrl = React.useMemo(() => toRawGithubUrl(href), [href]);
  const lang = React.useMemo(() => language ?? inferLanguageFromHref(href), [language, href]);

  React.useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    setIsLoading(true);
    setError(null);
    setCode(null);

    fetch(rawUrl, { signal: controller.signal })
      .then(async response => {
        if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
        const text = await response.text();
        if (isMounted) setCode(text.trimEnd());
      })
      .catch(err => {
        if (isMounted && err.name !== 'AbortError') {
          console.error('Failed to load tutorial code', err);
          setError('Unable to load code preview.');
        }
      })
      .finally(() => isMounted && setIsLoading(false));

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [rawUrl]);

  if (isLoading && !code) {
    return (
      <div className="tutorial-code-skeleton">
        Loading code sample...
      </div>
    );
  }

  if (error) {
    return <div className="tutorial-code-error">{error}</div>;
  }

  if (!code) return null;

  return <CodeBlock language={lang}>{code}</CodeBlock>;
}


/* ---------- small utils ---------- */

function toRawGithubUrl(url: string) {
  const m = url.match(/^https:\/\/github\.com\/(.+?)\/(.+?)\/blob\/(.+?)\/(.+)$/);
  if (!m) return url;
  const [, owner, repo, branch, filePath] = m;
  return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filePath}`;
}

function inferLanguageFromHref(href: string) {
  if (href.endsWith('.gd')) return 'gdscript';
  const ext = href.match(/\.([\w]+)(?:\?|#|$)/);
  return ext ? ext[1] : undefined;
}
