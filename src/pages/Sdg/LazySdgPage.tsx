import { lazy } from 'react';

/** SDG page loaded on demand so it does not add weight to the Home bundle. */
export const LazySdgPage = lazy(() =>
  import('./SdgPage').then((module) => ({ default: module.SdgPage })),
);
