---
title: Pie / Donut Chart
description: Communicate composition with slice labels and totals.
---

import React from 'react';
import ComponentPage from '@site/src/components/Control/Control';

export default function Page() {
  return (
    <>
      <h1>Pie / Donut Chart</h1>
      <p>
        Present category shares with inner or outer labels, optional center totals, and animated transitions.
      </p>
      <ComponentPage id="pie-chart" />
    </>
  );
}
