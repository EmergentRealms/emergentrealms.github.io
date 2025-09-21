import React from 'react';
import styles from './Timeline.module.css';

export type TimelineItem = {
  date: string;          // "2025-09-19"
  title: string;
  body?: React.ReactNode;
  tag?: string;          // e.g. "Devlog", "Release", "Fix"
};

export default function Timeline({items}: {items: TimelineItem[]}) {
  return (
    <div className={styles.wrap}>
      {items.map((it, i) => (
        <div key={i} className={styles.item}>
          <div className={styles.dot} />
          <div className={styles.content}>
            <div className={styles.header}>
              <time className={styles.date}>{format(it.date)}</time>
              {it.tag && <span className={styles.tag}>{it.tag}</span>}
            </div>
            <h4 className={styles.title}>{it.title}</h4>
            {it.body && <div className={styles.body}>{it.body}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}

function format(s: string) {
  const d = new Date(s);
  return d.toLocaleDateString(undefined, {year:'numeric', month:'short', day:'2-digit'});
}
