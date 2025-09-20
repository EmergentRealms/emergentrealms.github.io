import React from 'react';
import clsx from 'clsx';
import styles from './MilestoneCard.module.css';

type Stage = 1|2|3|4|5;
const STAGE = {1:'Not Started',2:'Ongoing',3:'In Testing',4:'Ready for QA',5:'Completed'} as const;

export type MilestoneCardProps = {
  title: string;
  target?: string;         // ISO or readable date
  stage: Stage;            // 1..5
  percent?: number;        // optional 0..100
  links?: {label: string; href: string}[];
  note?: string;
};

export default function MilestoneCard({title, target, stage, percent, links=[], note}: MilestoneCardProps) {
  const pct = Math.max(0, Math.min(100, percent ?? (stage-1)*25)) | 0;
  const due = target ? new Date(target) : null;
  const days = due ? Math.ceil((+due - Date.now()) / (1000*60*60*24)) : null;
  const status =
    stage===5 ? 'done' :
    days!==null && days<0 ? 'late' :
    days!==null && days<=7 ? 'soon' : 'active';

  return (
    <article className={clsx(styles.card, styles[status])}>
      <header className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <span className={clsx(styles.stage, styles[`s${stage}`])}>
          {STAGE[stage]}
        </span>
      </header>

      <div className={styles.bar} aria-label={`Progress ${pct}%`}>
        <span className={styles.fill} style={{width:`${pct}%`}} />
      </div>

      <div className={styles.meta}>
        {target && <span className={styles.date}>
          {days!==null ? (days<0 ? `Due ${Math.abs(days)}d ago` : `Due in ${days}d`) : target}
        </span>}
        <span className={styles.pct}>{pct}%</span>
      </div>

      {note && <p className={styles.note}>{note}</p>}

      {!!links.length && (
        <div className={styles.links}>
          {links.map(l => <a key={l.href} className="button button--sm button--secondary" href={l.href}>{l.label}</a>)}
        </div>
      )}
    </article>
  );
}
