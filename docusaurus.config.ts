import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Cobblestone Legacy',
  tagline: 'Devlog & docs for Emergent Realms',
  favicon: 'img/favicon.ico',

  future: { v4: true },

  // Your public site URL (no trailing slash, use https)
  url: 'https://docs.emergent-realms.com',
  // Served at the root of the subdomain
  baseUrl: '/',

  // GitHub Pages info
  organizationName: 'EmergentRealms',         // GitHub org/user
  projectName: 'emergentrealms.github.io',    // Repo that hosts Pages

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: { defaultLocale: 'en', locales: ['en'] },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/EmergentRealms/emergentrealms.github.io/edit/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: { type: ['rss', 'atom'], xslt: true },
          editUrl: 'https://github.com/EmergentRealms/emergentrealms.github.io/edit/main/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: { customCss: './src/css/custom.css' },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: { defaultMode: 'dark', respectPrefersColorScheme: true },
    image: 'img/ChatterdRealms.png',
    navbar: {
      title: 'Cobblestone Legacy',
      logo: { alt: 'Cobblestone Legacy', src: 'img/logo.pgn' },
      items: [
        { to: '/docs/overview', label: 'Docs', position: 'left' },
        { to: '/blog', label: 'Devlog', position: 'left' },
        { href: 'https://discord.gg/23MyDvkW', label: 'Join Discord', position: 'right' },
        { href: 'https://github.com/EmergentRealms', label: 'GitHub', position: 'right' },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        { title: 'Docs', items: [{ label: 'Overview', to: '/docs/overview' }] },
        { title: 'Community', items: [{ label: 'Discord', href: 'https://discord.gg/23MyDvkW' }] },
        { title: 'More', items: [{ label: 'Devlog', to: '/blog' }] },
      ],
      copyright: `© ${new Date().getFullYear()} Emergent Realms`,
    },
    prism: { theme: prismThemes.github, darkTheme: prismThemes.dracula },
  } satisfies Preset.ThemeConfig,
};

export default config;
