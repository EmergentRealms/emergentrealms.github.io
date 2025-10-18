---
title: Central Theme Manager
description: Configure light/dark palettes and shared colors that drive every DataViz control.
---

import React from 'react';
import ComponentPage from '@site/src/components/Control/Control';

export default function Page() {
  return (
    <>
      <h1>Central Theme Manager</h1>
      <p>
        The Theme Manager is the foundation of the toolkit. Define your color seeds, typography accents, and light/dark presets
        once, then let every chart, graph, and panel consume the same palette automatically.
      </p>
      <ComponentPage id="theme-manager" />
    </>
  );
}
