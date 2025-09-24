import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className={clsx('hero__title', styles.title)}>
          Emergent Realms Inc.
        </Heading>
        <p className={clsx('hero__subtitle', styles.subtitle)}>Worlds forged of chaos.</p>
        <p className={styles.heroLead}>
          Emergent Realms is an indie studio building living, breathing game worlds where every choice echoes.
          We’re the creators of Cobblestone Legacy—a sandbox RPG with rogue-lite survival, systemic factions,
          and emergent storytelling—built on Godot with high-performance C++ GDExtensions.
        </p>

        <div className={styles.buttons}>
          <Link className="button button--primary button--lg" to="/blog">
            Read the Devlog
          </Link>
          <Link className="button button--secondary button--lg" to="/docs/cobblestone/overview">
            View Docs
          </Link>
          <Link
            className={clsx('button button--lg', styles.discord)}
            href="https://discord.gg/23MyDvkW"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Join our Discord server"
          >
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
      title="Emergent Realms — Worlds forged of chaos"
      description="Emergent Realms builds living game worlds: follow the devlog, explore docs, and grab tools."
    >
      <HomepageHeader />
      <main className={styles.main}>
        <section className={styles.section}>
          <Heading as="h2" className={styles.sectionTitle}>
            What we do
          </Heading>
          <ul className={styles.copyList}>
            <li>
              <strong>Make games that feel alive:</strong> AI-driven NPCs with memory, routines, and relationships;
              procedural cities; dynamic economy and heist systems.
            </li>
            <li>
              <strong>Share the journey:</strong> Devlogs, technical write-ups, and design docs that open our process to
              players and fellow developers.
            </li>
            <li>
              <strong>Build tools for developers:</strong> Production-ready Godot UI components, data-viz controls, and
              high-throughput SQLite/GDExtension backends—designed for performance, clarity, and reuse.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <Heading as="h2" className={styles.sectionTitle}>
            Explore
          </Heading>
          <ul className={clsx(styles.copyList, styles.exploreList)}>
            <li>
              <strong>Devlogs &amp; Docs</strong> — Follow the build, from AI perception to world simulation.
            </li>
            <li>
              <strong>Game Hub</strong> — Learn about Cobblestone Legacy’s survival loop, factions, and roadmap.
            </li>
            <li>
              <strong>Toolkits &amp; Assets</strong> — Browse our Godot components and backend systems to accelerate your
              project.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <Heading as="h2" className={styles.sectionTitle}>
            How we build
          </Heading>
          <p className={styles.sectionLead}>
            Performance-minded. Multithreaded where it counts. Data-driven. We favor clean APIs, predictable behavior,
            and thorough examples—so our worlds (and your projects) scale gracefully.
          </p>
        </section>

        <section className={styles.section}>
          <Heading as="h2" className={styles.sectionTitle}>
            Join us
          </Heading>
          <p className={styles.sectionLead}>
            Whether you’re here to play, to learn, or to ship faster: welcome to the realm. Start with the latest devlog,
            try a live demo (when available), or grab a toolkit and build with us.
          </p>
        </section>
      </main>
    </Layout>
  );
}
