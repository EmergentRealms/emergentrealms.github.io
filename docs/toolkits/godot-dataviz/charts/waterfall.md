---
title: Waterfall Chart
description: Show how incremental changes lead to a final total.
---

import React from 'react';
import ComponentPage from '@site/src/components/Control/Control';

export default function Page() {
  return (
    <>
      <h1>Waterfall Chart</h1>
      <p>
        Communicate running totals by visualizing positive and negative deltas from a baseline through to the final value.
      </p>
      <ComponentPage id="waterfall" />
    </>
  );
}
