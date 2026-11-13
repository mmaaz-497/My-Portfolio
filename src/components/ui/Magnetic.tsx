'use client';

import { useRef, type PointerEvent, type ReactNode } from 'react';

/** Wrapper that drifts its child a few pixels toward the mouse pointer. */
export default function Magnetic({
  children,
  strength = 0.25,
  className = 'inline-block',
}: {
  children: ReactNode;
  strength?: number;
  /** Display utilities for the wrapper, e.g. to make it full-width on phones. */
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  const handleMove = (event: PointerEvent<HTMLSpanElement>) => {
    const el = ref.current;
    if (!el || event.pointerType !== 'mouse') return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - (rect.left + rect.width / 2)) * strength;
    const y = (event.clientY - (rect.top + rect.height / 2)) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  return (
    <span
      ref={ref}
      className={`${className} transition-transform duration-300 ease-out motion-reduce:!transform-none`}
      onPointerMove={handleMove}
      onPointerLeave={reset}
    >
      {children}
    </span>
  );
}
