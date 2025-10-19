import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import clsx from 'clsx';

import features from '@site/src/data/features.json';
import FeatureProgress from '@site/src/components/FeatureProgress/FeatureProgress';
import KPIStat from '@site/src/components/KPIStat/KPIStat';
import MilestoneCard from '@site/src/components/MilestoneCard/MilestoneCard';
import type {MilestoneCardProps} from '@site/src/components/MilestoneCard/MilestoneCard';
import Timeline from '@site/src/components/Timeline/Timeline';
import type {TimelineItem} from '@site/src/components/Timeline/Timeline';

const STAGE_LABEL: Record<number, string> = {
  1: 'Not Started',
  2: 'Ongoing',
  3: 'In Testing',
  4: 'Ready for QA',
  5: 'Completed',
};

type Feature = {
  title: string;
  stage: number;
  percent?: number;
  summary?: string;
  links?: {label: string; href: string}[];
};

const featureEntries = Object.entries(features as Record<string, Feature>);
const totalFeatures = featureEntries.length;
const completedFeatures = featureEntries.filter(([, f]) => f.stage === 5).length;
const activeFeatures = featureEntries.filter(([, f]) => f.stage > 1 && f.stage < 5).length;
const docsPublished = 10; // New Cobblestone Legacy documentation pages added in this pass

const milestones: MilestoneCardProps[] = [
  {
    title: 'Rumor Journal UI pass',
    target: '2025-09-27',
    stage: 3,
    percent: 65,
    note: 'Surface accuracy meter + spread history in the UI mock.',
    links: [{label: 'Rumor System', href: '/features/rumor-system'}],
  },
  {
    title: 'Dialog personality blending',
    target: '2025-10-02',
    stage: 2,
    percent: 40,
    note: 'Prototype mood-to-tone blending for greetings and quest pitches.',
    links: [{label: 'Dynamic Dialog', href: '/features/dynamic-dialog'}],
  },
  {
    title: 'Economy telemetry hooks',
    target: '2025-09-29',
    stage: 2,
    percent: 45,
    note: 'Expose price history graphs inside debug overlay.',
    links: [{label: 'Economy Manager', href: '/features/economy-manager'}],
  },
];

const timelineItems: TimelineItem[] = [
  {
    date: '2025-09-21',
    title: 'Health & Vitality balancing pass',
    body: 'Tuned body composition changes and starvation pacing based on first round of playtests.',
    tag: 'Systems',
  },
  {
    date: '2025-09-20',
    title: 'Dialog reputation gates online',
    body: 'Faction standing now unlocks bespoke quest pitches and rumour responses.',
    tag: 'Narrative',
  },
  {
    date: '2025-09-19',
    title: 'Economy player influence hooks',
    body: 'Merchants respond to hoarding, with transaction queues visible in the debugger.',
    tag: 'Simulation',
  },
];

export default function StatusPage() {
  return (
    <Layout title="Project Status" description="Live project dashboard for Cobblestone Legacy.">
      <header className="hero" style={{borderBottom: '1px solid var(--ifm-border-color)'}}>
        <div className="container" style={{paddingTop: '3rem', paddingBottom: '2.5rem'}}>
          <h1 className="hero__title" style={{marginBottom: '.5rem'}}>Cobblestone Legacy — Status Board</h1>
          <p className="hero__subtitle" style={{maxWidth: 720}}>
            Snapshot of feature progress, milestones, and recent updates. Jump into the docs for full breakdowns or track
            individual features below.
          </p>
          <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1.5rem'}}>
            <Link className="button button--primary button--lg" to="/docs/cobblestone/concept-framework">
              Read Concept Framework
            </Link>
            <Link className="button button--secondary button--lg" to="/features">
              Browse Feature Library
            </Link>
          </div>
        </div>
      </header>

      <main className="container" style={{paddingTop: '2.5rem', paddingBottom: '3rem'}}>
        <section>
          <h2 style={{marginBottom: '1rem'}}>Key Metrics</h2>
          <div
            style={{
              display: 'grid',
              gap: '1rem',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            }}
          >
            <KPIStat label="Tracked Features" value={totalFeatures} hint="Across core systems" />
            <KPIStat label="Active Workstreams" value={activeFeatures} hint="Stages 2–4" accent="warning" />
            <KPIStat label="Systems Complete" value={`${completedFeatures}/${totalFeatures}`} hint="Stage 5" accent="success" />
            <KPIStat label="Docs Published" value={docsPublished} hint="Cobblestone Legacy library" accent="neutral" />
          </div>
        </section>

        <section style={{marginTop: '3rem'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem'}}>
            <h2 style={{margin: 0}}>Feature Progress</h2>
            <Link className="button button--sm button--link" to="/features">
              View all features
            </Link>
          </div>
          <div
            style={{
              display: 'grid',
              gap: '1rem',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            }}
          >
            {featureEntries.map(([id, feature]) => (
              <div key={id} className="card" style={{padding: '1rem'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem'}}>
                  <div>
                    <h3 style={{marginBottom: '0.25rem'}}>{feature.title}</h3>
                    <small style={{opacity: 0.8}}>{STAGE_LABEL[feature.stage]}</small>
                  </div>
                  <Link className="button button--sm button--secondary" to={`/features/${id}`}>
                    Open
                  </Link>
                </div>

                <FeatureProgress
                  title={feature.title}
                  stage={feature.stage as 1 | 2 | 3 | 4 | 5}
                  size="sm"
                  note={feature.summary}
                />

                {!!feature.links?.length && (
                  <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.75rem'}}>
                    {feature.links.map((link) => (
                      <Link key={link.href} className={clsx('button', 'button--sm', 'button--secondary')} to={link.href}>
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section style={{marginTop: '3rem'}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem'}}>
            <h2 style={{margin: 0}}>Upcoming Milestones</h2>
            <Link className="button button--sm button--link" to="/docs/cobblestone/roadmap">
              View roadmap
            </Link>
          </div>
          <div
            style={{
              display: 'grid',
              gap: '1rem',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              marginTop: '1.5rem',
            }}
          >
            {milestones.map((milestone) => (
              <MilestoneCard key={milestone.title} {...milestone} />
            ))}
          </div>
        </section>

        <section style={{marginTop: '3rem'}}>
          <h2>Recent Updates</h2>
          <Timeline items={timelineItems} />
        </section>
      </main>
    </Layout>
  );
}
