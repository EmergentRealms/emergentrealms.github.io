import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Emergent Realms',
  tagline: 'Worlds forged of chaos.',
  favicon: 'img/favicon.ico',

  future: { v4: true },

  url: 'https://docs.emergent-realms.com',
  baseUrl: '/',

  organizationName: 'EmergentRealms',
  projectName: 'emergentrealms.github.io',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: { defaultLocale: 'en', locales: ['en'] },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // editUrl: 'https://github.com/EmergentRealms/emergentrealms.github.io/edit/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: { type: ['rss', 'atom'], xslt: true },
          // editUrl: 'https://github.com/EmergentRealms/emergentrealms.github.io/edit/main/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: { customCss: './src/css/custom.css' },
        gtag: { trackingID: 'G-JHR14QEHVP', anonymizeIP: true },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    metadata: [
      { name: 'keywords', content: 'Cobblestone Legacy, Emergent Realms, large scale Godot project, Godot GDExtension performance, multithreaded AI in Godot, Godot C++ RPG systems, SQLite in Godot, procedural city builder devlog' },
    { name: 'description', content: 'Cobblestone Legacy devlogs and docs covering our Godot 4.4 rogue-lite sandbox RPG, C++ GDExtension pipelines, and scalable simulation systems.' },
    ],
    colorMode: { defaultMode: 'dark', respectPrefersColorScheme: true },
    image: 'img/EmergentRealmLogo.png',
    navbar: {
      title: 'Emergent Realms',
      logo: { alt: 'Emergent Realms', src: 'img/EmergentRealmLogo.png' },
      items: [
        { to: '/docs', label: 'Docs', position: 'left' },
        { to: '/blog', label: 'Devlog', position: 'left' },
        { to: '/features', label: 'Features', position: 'left' },
        { href: 'https://discord.gg/23MyDvkW', label: 'Join Discord', position: 'right' },
        { href: 'https://github.com/EmergentRealms', label: 'GitHub', position: 'right' },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        { title: 'Docs', items: [{ label: 'Overview', to: '/docs/cobblestone/overview' }] },
        { title: 'Community', items: [{ label: 'Discord', href: 'https://discord.gg/23MyDvkW' }] },
        { title: 'More', items: [{ label: 'Devlog', to: '/blog' }] },
      ],
      copyright: `© ${new Date().getFullYear()} Emergent Realms`,
    },
    prism: { theme: prismThemes.github, darkTheme: prismThemes.dracula },
  } satisfies Preset.ThemeConfig,
};

export default config;
