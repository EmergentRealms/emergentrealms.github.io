---
title: Box Plot
description: Visualize quartiles, whiskers, and outliers.
---

import React from 'react';
import ComponentPage from '@site/src/components/Control/Control';

export default function Page() {
  return (
    <>
      <h1>Box Plot</h1>
      <p>
        Highlight distribution spread, medians, and outliers with automatic quartile calculations and optional jitter overlays.
      </p>
      <ComponentPage id="box-plot" />
    </>
  );
}
