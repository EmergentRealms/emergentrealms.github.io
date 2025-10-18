---
title: Heat Map
description: Visualize weighted grids with gradients and legends.
---

import React from 'react';
import ComponentPage from '@site/src/components/Control/Control';

export default function Page() {
  return (
    <>
      <h1>Heat Map</h1>
      <p>
        Show density, affinity, or AI pathfinding costs using configurable gradients, tooltips, and auto legends.
      </p>
      <ComponentPage id="heat-map" />
    </>
  );
}
