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
          <Link className={clsx('button button--lg', styles.ghost)} href="https://discord.gg/23MyDvkW">
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
