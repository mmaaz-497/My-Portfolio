'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { frame, SECTION_IDS } from '@/components/three/sceneStore';

let lenis: Lenis | null = null;

/** Freezes page scrolling while a modal is open, and releases it afterwards. */
export function lockScroll(locked: boolean) {
  if (locked) lenis?.stop();
  else lenis?.start();
  document.documentElement.style.overflow = locked ? 'hidden' : '';
}

/**
 * Scrolls to an in-page `#section`. For links that cannot rely on the default
 * click behaviour, e.g. one that closes a scroll-locked menu first.
 */
export function scrollToHash(hash: string) {
  const target = document.querySelector<HTMLElement>(hash);
  if (!target) return;
  // Both paths stop clear of the fixed header through `scroll-padding-top` on
  // <html>, which Lenis reads as well as the browser.
  if (lenis) lenis.scrollTo(target);
  else target.scrollIntoView();
  history.replaceState(null, '', hash);
}

/**
 * Sets up inertial scrolling (skipped for reduced motion) and reports which
 * section is on screen to the 3D scene as a fractional index.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reducedMotion) {
      // `anchors` makes in-page #links glide. No offset here: Lenis already
      // subtracts the `scroll-padding-top` set on <html> in globals.css, so an
      // extra offset would leave sections stranded far below the header.
      lenis = new Lenis({ autoRaf: true, lerp: 0.11, anchors: true });
    }

    let tops: number[] = [];
    let ticking = false;

    const update = () => {
      ticking = false;
      if (tops.length === 0) return;
      const y = window.scrollY;
      const vh = window.innerHeight;
      // The scene holds a section's pose while that section fills the screen,
      // and blends to the next one over the last viewport-height before it.
      let section = tops.length - 1;
      for (let i = 0; i < tops.length - 1; i++) {
        if (y < tops[i + 1]) {
          const t = (y - (tops[i + 1] - vh)) / vh;
          section = i + Math.min(Math.max(t, 0), 1);
          break;
        }
      }
      frame.section = section;
    };

    const measure = () => {
      tops = SECTION_IDS.map((id) => {
        const el = document.getElementById(id);
        return el ? el.getBoundingClientRect().top + window.scrollY : 0;
      });
      update();
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    // Section offsets move when images load or the layout reflows.
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure, { passive: true });
    measure();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  return null;
}
