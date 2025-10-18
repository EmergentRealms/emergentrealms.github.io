---
title: Gauge
description: Display KPI ranges with sweeping arcs and center text.
---

import React from 'react';
import ComponentPage from '@site/src/components/Control/Control';

export default function Page() {
  return (
    <>
      <h1>Gauge</h1>
      <p>
        Visualize thresholds, tick marks, and live values with a radial gauge that responds to theme colors.
      </p>
      <ComponentPage id="gauge" />
    </>
  );
}
