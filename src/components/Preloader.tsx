'use client';

import { useEffect, useState } from 'react';
import { useView } from './three/useView';

const MIN_VISIBLE_MS = 900;
const FADE_MS = 550;

/**
 * Brief branded cover while the 3D scene compiles. It leaves as soon as the
 * scene reports ready; a CSS animation removes it regardless after ~3s, so it
 * can never trap a visitor (see .preloader in globals.css).
 */
export default function Preloader() {
  const { ready } = useView();
  const [minElapsed, setMinElapsed] = useState(false);
  const [gone, setGone] = useState(false);
  const done = ready && minElapsed;

  useEffect(() => {
    const timer = setTimeout(() => setMinElapsed(true), MIN_VISIBLE_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!done) return;
    const timer = setTimeout(() => setGone(true), FADE_MS);
    return () => clearTimeout(timer);
  }, [done]);

  if (gone) return null;

  return (
    <div className={`preloader ${done ? 'is-done' : ''}`} aria-hidden="true">
      <div className="preloader-tile">
        <svg width="76" height="76" viewBox="0 0 64 64">
          <g fill="none" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 9 24 A 9 9 0 0 1 27 25 L 9 46 L 28.5 46" stroke="var(--accent)" />
            <path d="M 36 46 L 36 18 L 46.5 33 L 57 18 L 57 46" stroke="var(--foreground)" />
          </g>
        </svg>
      </div>
      <div className="preloader-bar" />
      <span className="font-mono text-[11px] uppercase tracking-[0.4em] text-muted">Loading</span>
    </div>
  );
}
