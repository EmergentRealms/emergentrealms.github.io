---
title: Timeline Chart
description: Plot events across tracks with a live "now" marker.
---

import React from 'react';
import ComponentPage from '@site/src/components/Control/Control';

export default function Page() {
  return (
    <>
      <h1>Timeline Chart</h1>
      <p>
        Organize quests, incidents, or production beats across multiple tracks and highlight the current time marker in real time.
      </p>
      <ComponentPage id="timeline" />
    </>
  );
}
