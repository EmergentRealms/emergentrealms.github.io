import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import features from '@site/src/data/features.json';

export default function FeaturesIndex() {
  const entries = Object.entries(features as Record<string, any>);

  return (
    <Layout title="Features" description="All project features">
      <main className="container padding-vert--lg">
        <h1>Features</h1>
        <div
          style={{
            display:'grid',
            gap:12,
            gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',
            marginTop:12
          }}
        >
          {entries.map(([id, f]) => (
            <Link
              key={id}
              to={`/features/${id}`}
              className="card"
              style={{padding:12, textDecoration:'none'}}
            >
              <div className="card__header">
                <h3 style={{marginBottom:4}}>{f.title}</h3>
                {f.subtitle && <small>{f.subtitle}</small>}
              </div>
              <div className="card__footer" style={{display:'flex', gap:8, flexWrap:'wrap'}}>
                {f.tags?.slice(0,3).map((t: string) => <span key={t} className="badge badge--secondary">{t}</span>)}
              </div>
            </Link>
          ))}
        </div>
      </main>
    </Layout>
  );
}
