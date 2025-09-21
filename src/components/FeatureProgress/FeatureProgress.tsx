import React from 'react';
import clsx from 'clsx';
import styles from './FeatureProgress.module.css';

type Stage = 1 | 2 | 3 | 4 | 5;

const STAGES: Record<Stage, string> = {
  1: 'Not Started',
  2: 'Ongoing',
  3: 'In Testing',
  4: 'Ready for QA',
  5: 'Completed',
};

export type FeatureProgressProps = {
  /** Display name, e.g. "Quest system" */
  title: string;
  /** 1..5 */
  stage: Stage;
  /** Optional compact style (smaller dots/labels) */
  size?: 'md' | 'sm';
  /** Optional note shown under the bar */
  note?: string;
};

export default function FeatureProgress({
  title,
  stage,
  size = 'md',
  note,
}: FeatureProgressProps) {
  // Clamp (defensive)
  const value = Math.min(5, Math.max(1, stage)) as Stage;

  return (
    <section
      className={clsx(styles.card, styles[size])}
      aria-labelledby={`${slugify(title)}-label`}
    >
      <header className={styles.header}>
        <h3 id={`${slugify(title)}-label`} className={styles.title}>
          {title}
        </h3>

        <span
          className={clsx(styles.stagePill, {
            [styles.done]: value === 5,
            [styles.active]: value < 5 && value > 1,
            [styles.idle]: value === 1,
          })}
          title={`Stage ${value}: ${STAGES[value]}`}
        >
          {value === 5 ? (
            <>
              <CheckIcon className={styles.pillIcon} />
              Completed
            </>
          ) : (
            <>
              <DotIcon className={styles.pillIcon} />
              {STAGES[value]}
            </>
          )}
        </span>
      </header>

      {/* Stepper */}
      <div
        className={styles.steps}
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={5}
        aria-valuenow={value}
        aria-label={`${title} progress: ${STAGES[value]}`}
      >
        {([1, 2, 3, 4, 5] as Stage[]).map((i, idx) => {
          const reached = i <= value;
          return (
            <div key={i} className={styles.step}>
              {/* Connector line (left) */}
              {idx > 0 && (
                <span
                  className={clsx(styles.line, reached ? styles.lineActive : undefined)}
                  aria-hidden="true"
                />
              )}

              {/* Node */}
              <span
                className={clsx(
                  styles.node,
                  reached ? styles.nodeActive : styles.nodeIdle,
                )}
                title={`${i}. ${STAGES[i]}`}
              >
                {i < value || value === 5 ? (
                  <CheckIcon className={styles.icon} />
                ) : (
                  <span className={styles.index}>{i}</span>
                )}
              </span>
            </div>
          );
        })}
      </div>

      {note && <p className={styles.note}>{note}</p>}
    </section>
  );
}

/** Helpers */

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M20.285 6.708a1 1 0 0 1 0 1.414l-9.192 9.192a1 1 0 0 1-1.414 0L3.707 11.343a1 1 0 0 1 1.414-1.414l4.071 4.07 8.485-8.485a1 1 0 0 1 1.414 0z"
      />
    </svg>
  );
}

function DotIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="6" fill="currentColor" />
    </svg>
  );
}
