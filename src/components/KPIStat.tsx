import React from 'react';
import styles from './KPIStat.module.css';

export type KPIStatProps = {
  label: string;
  value: string | number;
  delta?: string;          // "+4%", "-12min"
  hint?: string;           // small caption
  accent?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
};

export default function KPIStat({label, value, delta, hint, accent='primary'}: KPIStatProps) {
  return (
    <div className={`${styles.card} ${styles[accent]}`}>
      <div className={styles.value}>{value}</div>
      <div className={styles.label}>{label}</div>
      {(delta || hint) && (
        <div className={styles.meta}>
          {delta && <span className={styles.delta}>{delta}</span>}
          {hint && <span className={styles.hint}>{hint}</span>}
        </div>
      )}
    </div>
  );
}
