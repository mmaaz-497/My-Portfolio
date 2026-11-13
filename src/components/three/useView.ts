'use client';

import { useSyncExternalStore } from 'react';
import { getServerView, getView, subscribeView } from './sceneStore';

/** Subscribes a component to the discrete scene state (theme, quality, enabled). */
export function useView() {
  return useSyncExternalStore(subscribeView, getView, getServerView);
}
