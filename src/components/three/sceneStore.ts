// Shared state between the DOM and the WebGL scene.
//
// `frame` holds values that change every frame (scroll, pointer). They are
// plain mutable fields read inside useFrame, so updating them never triggers a
// React render. `view` holds the few discrete values components render from
// (theme, quality, whether the scene is running) and is subscribable.

export type Theme = 'dark' | 'light';
export type Quality = 'high' | 'low';

export const SECTION_IDS = [
  'hero',
  'about',
  'skills',
  'services',
  'projects',
  'experience',
  'certifications',
  'contact',
] as const;

export const frame = {
  /** Fractional section index: 2.5 means halfway between section 2 and 3. */
  section: 0,
  /** Pointer in normalised device coordinates, -1..1. */
  pointerX: 0,
  pointerY: 0,
};

export interface ViewState {
  theme: Theme;
  quality: Quality;
  /** True once the WebGL scene has drawn its first frame. */
  ready: boolean;
  /** False when WebGL is unavailable or the visitor prefers reduced motion. */
  enabled: boolean;
}

let view: ViewState = { theme: 'dark', quality: 'high', ready: false, enabled: false };
const serverView = view;
const listeners = new Set<() => void>();

export const getView = () => view;
export const getServerView = () => serverView;

export function setView(patch: Partial<ViewState>) {
  const next = { ...view, ...patch };
  const changed = (Object.keys(patch) as (keyof ViewState)[]).some((key) => view[key] !== next[key]);
  if (!changed) return;
  view = next;
  // Mirrored onto <html> so CSS can drop costly effects on low-power devices.
  if (typeof document !== 'undefined') document.documentElement.dataset.quality = next.quality;
  listeners.forEach((listener) => listener());
}

export function subscribeView(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
