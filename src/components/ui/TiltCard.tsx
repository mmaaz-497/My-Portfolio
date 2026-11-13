'use client';

import { useEffect, useRef, type PointerEvent, type ReactNode } from 'react';

interface TiltCardProps {
  children: ReactNode;
  /** Size, radius and layout of the card itself. */
  className?: string;
  /** Classes for the backing panel. Pass '' for a card that brings its own surface. */
  plate?: string;
  /** Layout classes for the content wrapper, e.g. a flex column. */
  contentClassName?: string;
  /** Maximum rotation in degrees. */
  max?: number;
}

/**
 * Card that leans toward the pointer. The panel, the content and the highlight
 * are separate layers, so children marked `data-depth="1|2|3"` lift off the
 * card and shift against it as it turns (see .tilt in globals.css).
 *
 * Pointer movement writes CSS variables straight to the element, once per
 * frame, so it never re-renders React. Touch input is ignored: tilting under a
 * finger fights scrolling.
 */
export default function TiltCard({
  children,
  className = '',
  plate = 'glass',
  contentClassName = '',
  max = 7,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rect = useRef<DOMRect | null>(null);
  const measuredAt = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const frame = useRef(0);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const apply = () => {
    frame.current = 0;
    const el = ref.current;
    const box = rect.current;
    if (!el || !box) return;
    const px = Math.min(Math.max((pointer.current.x - box.left) / box.width, 0), 1);
    const py = Math.min(Math.max((pointer.current.y - box.top) / box.height, 0), 1);
    const tx = (px - 0.5) * 2;
    const ty = (py - 0.5) * 2;
    el.style.setProperty('--ry', `${tx * max}deg`);
    el.style.setProperty('--rx', `${-ty * max}deg`);
    el.style.setProperty('--tx', tx.toFixed(3));
    el.style.setProperty('--ty', ty.toFixed(3));
    el.style.setProperty('--gx', `${px * 100}%`);
    el.style.setProperty('--gy', `${py * 100}%`);
  };

  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || event.pointerType !== 'mouse') return;
    // Measured once per hover, and again if the page has scrolled under the pointer.
    if (!rect.current || measuredAt.current !== window.scrollY) {
      rect.current = el.getBoundingClientRect();
      measuredAt.current = window.scrollY;
      el.classList.add('is-tilting');
      el.style.setProperty('--glare', '1');
    }
    pointer.current.x = event.clientX;
    pointer.current.y = event.clientY;
    if (!frame.current) frame.current = requestAnimationFrame(apply);
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(frame.current);
    frame.current = 0;
    rect.current = null;
    el.classList.remove('is-tilting');
    for (const name of ['--rx', '--ry']) el.style.setProperty(name, '0deg');
    for (const name of ['--tx', '--ty', '--glare']) el.style.setProperty(name, '0');
  };

  return (
    <div ref={ref} className={`tilt ${className}`} onPointerMove={handleMove} onPointerLeave={handleLeave}>
      <div className={`tilt-plate ${plate}`} aria-hidden="true" />
      <div className={`tilt-content ${contentClassName}`}>{children}</div>
      <div className="tilt-glare" aria-hidden="true" />
    </div>
  );
}
