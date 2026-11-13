'use client';

import { useSyncExternalStore, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

const subscribe = () => () => {};

/**
 * Renders children directly under <body>. Overlays need this: an ancestor with
 * `backdrop-filter` or `transform` becomes the containing block for
 * `position: fixed`, which would otherwise shrink a full-screen overlay to the
 * size of that ancestor.
 */
export default function Portal({ children }: { children: ReactNode }) {
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  return mounted ? createPortal(children, document.body) : null;
}
