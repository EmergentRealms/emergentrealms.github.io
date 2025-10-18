---
title: Detail Panel
description: Present entity overviews with labeled sections and tags.
---

import React from 'react';
import ComponentPage from '@site/src/components/Control/Control';

export default function Page() {
  return (
    <>
      <h1>Detail Panel</h1>
      <p>
        Combine rich text, icons, and tag lists to summarize game entities, quests, or inventory items in a responsive layout.
      </p>
      <ComponentPage id="detail-panel" />
    </>
  );
}
