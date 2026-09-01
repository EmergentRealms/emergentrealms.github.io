---
title: Central Theme Manager
description: Configure light/dark palettes and shared colors that drive every DataViz control.
---

import React from 'react';
import ComponentPage from '@site/src/components/Control/Control';
import CodeBlock from '@theme/CodeBlock';

export default function Page() {
  return (
    <>
      <h1>Central Theme Manager</h1>
      <p>
        The Theme Manager is the foundation of the toolkit. Define your color seeds, typography accents, and light/dark presets
        once, then let every chart, graph, and panel consume the same palette automatically.
      </p>
      <ComponentPage id="theme-manager" />

      <h2>Reading colours yourself</h2>
      <p>
        A game usually draws its own UI next to a chart, and it should not have to copy hex
        values out of the theme resource by hand. Since 1.1 the palette is readable at runtime.
      </p>
      <CodeBlock language="gdscript">{`var theme: DVTheme = DV_ThemeManager.active_theme

# get_token_color(domain, sub = 0, variant = 0)
var panel_bg := theme.get_token_color(DVColorScale.Background)
var body_text := theme.get_token_color(DVColorScale.Text)
var accent := theme.get_token_color(DVColorScale.Accent)

# The Series domain is the categorical palette charts draw from.
for i in 6:
	print(theme.get_token_color(DVColorScale.Series, i))`}</CodeBlock>

      <p>
        The domains are <code>Background</code>, <code>Border</code>, <code>Text</code>,{' '}
        <code>Graph</code>, <code>Accent</code>, <code>Status</code> and <code>Series</code>.
        Every colour is generated from your seeds against the theme&apos;s contrast target, so
        the same call gives you a readable result in light or dark mode without a branch.
      </p>

      <h2>Checking contrast</h2>
      <p>
        <code>get_contrast_ratio()</code> returns the WCAG ratio between two colours &mdash;
        21 for black on white, 1 for a colour against itself. Useful in a test, or when you are
        picking a custom seed and want to know whether label text will survive on top of it.
      </p>
      <CodeBlock language="gdscript">{`if theme.get_contrast_ratio(label_color, panel_bg) < 4.5:
	push_warning("Label text will be hard to read on this panel")`}</CodeBlock>

      <h2>Where a series colour comes from</h2>
      <p>
        Four things can decide the colour of a chart series. They are checked in this order,
        first match wins:
      </p>
      <ol>
        <li><code>chart.set_series_color(index, color)</code> &mdash; a per-series override.</li>
        <li><code>chart.palette</code> &mdash; a palette set on that one chart.</li>
        <li><code>theme.palette</code>, when the theme has <code>use_palette</code> on.</li>
        <li>The theme&apos;s generated <code>Series</code> tokens.</li>
      </ol>
      <p>
        In 1.0 a theme change silently discarded anything you had set in code. It no longer
        does: an override survives a theme swap, and <code>chart.reset_palette()</code> is how
        you hand control back to the theme. <code>chart.has_palette_override()</code> tells you
        which state a chart is in.
      </p>
      <p>
        The generated <code>Series</code> palette is ordered so that adjacent series stay
        distinguishable for the common forms of colour blindness, and every entry is checked
        for at least 3:1 contrast against the chart background.
      </p>

      <h2>Naming</h2>
      <p>
        <code>use_pallet</code> was a spelling mistake, and it is still there so 1.0 projects
        and saved <code>.tres</code> files keep loading. <code>use_palette</code> is the name to
        use in new code; both drive the same value, and neither will be removed before 2.0.
      </p>
    </>
  );
}
