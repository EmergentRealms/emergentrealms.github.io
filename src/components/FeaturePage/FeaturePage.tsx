import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import clsx from 'clsx';

import features from '@site/src/data/features.json';
import FeatureProgress from '@site/src/components/FeatureProgress/FeatureProgress';
import Timeline from '@site/src/components/Timeline/Timeline';

type Stage = 1|2|3|4|5;

type TimelineItem = { date: string; title: string; body?: string };
type LinkItem = { label: string; href: string };

type Feature = {
  title: string;
  subtitle?: string;
  stage: Stage;
  percent?: number;
  owner?: string;
  updatedAt?: string;
  tags?: string[];
  hero?: string;
  summary?: string;
  links?: LinkItem[];
  timeline?: TimelineItem[];
};

const STAGE_LABEL: Record<Stage,string> = {
  1:'Not Started', 2:'Ongoing', 3:'In Testing', 4:'Ready for QA', 5:'Completed'
};

export default function FeaturePage({id}: {id: string}) {
  const data = (features as Record<string, Feature>)[id];

  if (!data) {
    return (
      <Layout title="Feature not found">
        <main className="container padding-vert--lg">
          <h1>Feature not found</h1>
          <p>No feature with id <code>{id}</code> in <code>src/data/features.json</code>.</p>
          <p><Link to="/features">Back to Features</Link></p>
        </main>
      </Layout>
    );
  }

  const title = data.title;
  const desc = data.summary ?? data.subtitle ?? `${title} — ${STAGE_LABEL[data.stage]}`;

  return (
    <Layout title={`${title} — Feature`} description={desc}>
      {/* Hero / header */}
      <header className="hero" style={{borderBottom: '1px solid var(--ifm-border-color)'}}>
        <div className="container">
          <h1 className="hero__title" style={{marginBottom: 4}}>{title}</h1>
          {data.subtitle && <p className="hero__subtitle">{data.subtitle}</p>}
          <div style={{display:'flex', gap:12, flexWrap:'wrap', alignItems:'center', marginTop:12}}>
            <span className="badge badge--primary">{STAGE_LABEL[data.stage]}</span>
            {data.owner && <span className="badge">Owner: {data.owner}</span>}
            {data.updatedAt && <span className="badge">Updated: {new Date(data.updatedAt).toLocaleDateString()}</span>}
            {data.tags?.map(t => <span key={t} className="badge badge--secondary">{t}</span>)}
          </div>
        </div>
      </header>

      <main className="container padding-vert--lg">
        {/* Optional hero image */}
        {data.hero && (
          <img
            src={data.hero}
            alt={`${title} hero`}
            style={{width:'100%', borderRadius:12, border:'1px solid var(--ifm-border-color)', marginBottom:16}}
          />
        )}

        {/* Summary */}
        {data.summary && <p style={{fontSize:'1.05rem'}}>{data.summary}</p>}

        {/* Progress */}
        <section style={{marginTop:16, marginBottom:16}}>
          <FeatureProgress title={title} stage={data.stage} note={desc} />
        </section>

        {/* Links */}
        {!!data.links?.length && (
          <section style={{marginTop:8, marginBottom:24}}>
            <div style={{display:'flex', flexWrap:'wrap', gap:8}}>
              {data.links.map(l => (
                <a key={l.href} className={clsx('button', 'button--secondary', 'button--sm')} href={l.href}>
                  {l.label}
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Timeline */}
        {!!data.timeline?.length && (
          <>
            <h2>Timeline</h2>
            <Timeline items={data.timeline.map(it => ({
              date: it.date, title: it.title, body: it.body
            }))} />
          </>
        )}
      </main>
    </Layout>
  );
}
