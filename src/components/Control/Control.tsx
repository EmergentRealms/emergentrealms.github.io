import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import CodeBlock from '@theme/CodeBlock';
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
  codeLanguage?: string;
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
    <div
      className="card"
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      {img && (
        <div className="card__image" style={{ '--card-hero-h': '220px' } as React.CSSProperties}>
          <img
            src={img}
            alt={item.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      )}
      <div
        className="card__body"
        style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}
      >
        <div>
          <h3 style={{ marginBottom: 6 }}>{item.title}</h3>
          {item.description && <p style={{ marginBottom: 0 }}>{item.description}</p>}
        </div>
        <TutorialCodeBlock href={item.codeHref} language={item.codeLanguage} />
      </div>
      <div className="card__footer" style={{ display: 'flex', gap: 8 }}>
        <a
          className={clsx('button', 'button--secondary', 'button--sm', 'button--block')}
          href={item.codeHref}
        >
          View on GitHub
        </a>
      </div>
    </div>
  );
}

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
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const text = await response.text();
        if (isMounted) {
          setCode(text.trimEnd());
        }
      })
      .catch(err => {
        if (isMounted && err.name !== 'AbortError') {
          console.error('Failed to load tutorial code', err);
          setError('Unable to load code preview.');
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [rawUrl]);

  if (isLoading && !code) {
    return (
      <div
        style={{
          border: '1px solid var(--ifm-color-emphasis-200)',
          borderRadius: 8,
          padding: '12px 16px',
          fontStyle: 'italic',
          color: 'var(--ifm-color-emphasis-600)'
        }}
      >
        Loading code sample...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          border: '1px solid var(--ifm-color-danger)',
          borderRadius: 8,
          padding: '12px 16px',
          color: 'var(--ifm-color-danger)'
        }}
      >
        {error}
      </div>
    );
  }

  if (!code) {
    return null;
  }

  return (
    <CodeBlock language={lang}>
      {code}
    </CodeBlock>
  );
}

function toRawGithubUrl(url: string) {
  const githubBlobPattern = /^https:\/\/github\.com\/(.+?)\/(.+?)\/blob\/(.+?)\/(.+)$/;
  const match = url.match(githubBlobPattern);
  if (!match) {
    return url;
  }

  const [, owner, repo, branch, filePath] = match;
  return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filePath}`;
}

function inferLanguageFromHref(href: string) {
  if (href.endsWith('.gd')) {
    return 'gdscript';
  }

  const extensionMatch = href.match(/\.([\w]+)(?:\?|#|$)/);
  if (extensionMatch) {
    return extensionMatch[1];
  }

  return undefined;
}
