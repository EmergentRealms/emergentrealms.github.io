import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className={clsx('hero__title', styles.title)}>
          Cobblestone Legacy
        </Heading>
        <p className={clsx('hero__subtitle', styles.subtitle)}>
          Devlog, roadmap, and systems documentation for Emergent Realms.
        </p>

        <div className={styles.buttons}>
          <Link className="button button--primary button--lg" to="/blog">
            Read the Devlog
          </Link>
          <Link className="button button--secondary button--lg" to="/docs/overview">
            View Docs
          </Link>
          <Link
            className={clsx('button button--lg', styles.discord)}
            href="https://discord.gg/23MyDvkW"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Join our Discord server"
          >
            {/* Inline Discord icon for crisp rendering */}
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              style={{marginRight: 8, verticalAlign: 'text-bottom'}}
            >
              <path
                fill="currentColor"
                d="M20.317 4.369A19.79 19.79 0 0 0 16.558 3c-.184.322-.399.755-.547 1.095a18.27 18.27 0 0 0-4.022 0A7.07 7.07 0 0 0 11.442 3a19.85 19.85 0 0 0-3.761 1.369C4.245 7.197 3.61 9.96 3.837 12.676c1.58 1.179 3.112 1.896 4.599 2.37.37-.505.701-1.043.987-1.61-.545-.204-1.067-.452-1.56-.742.131-.096.26-.197.385-.301 3.02 1.415 6.291 1.415 9.27 0 .127.104.256.205.388.301-.493.29-1.017.538-1.563.742.287.567.617 1.105.987 1.61 1.487-.474 3.02-1.191 4.6-2.37.376-4.35-.64-7.08-1.9-8.307ZM9.75 12.348c-.909 0-1.648-.84-1.648-1.874 0-1.035.739-1.875 1.648-1.875.914 0 1.651.84 1.648 1.875 0 1.035-.734 1.874-1.648 1.874Zm4.5 0c-.91 0-1.648-.84-1.648-1.874 0-1.035.739-1.875 1.648-1.875.914 0 1.651.84 1.648 1.875 0 1.035-.734 1.874-1.648 1.874Z"
              />
            </svg>
            Join Discord
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Cobblestone Legacy — Devlog & Docs"
      description="Project hub for Emergent Realms: progress updates, roadmap, and technical docs.">
      <HomepageHeader />
      <main className={styles.main}>
        {/* Optional: add your own sections or keep the default features component */}
      </main>
    </Layout>
  );
}
