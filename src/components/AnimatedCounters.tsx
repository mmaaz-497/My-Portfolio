'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { counters } from '@/data/about';

function Counter({ end, suffix, label, duration = 1600 }: { end: number; suffix: string; label: string; duration?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const frameId = requestAnimationFrame(() => setValue(end));
      return () => cancelAnimationFrame(frameId);
    }
    let frameId = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setValue(Math.round(end * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [inView, end, duration]);

  return (
    // dt comes first in the markup (term, then value); the column is reversed
    // so the number still reads on top.
    <div ref={ref} className="glass lift flex flex-col-reverse justify-end rounded-2xl px-2 py-7 text-center sm:rounded-3xl sm:px-4 sm:py-8">
      <dt className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-muted sm:text-xs sm:tracking-widest">{label}</dt>
      {/* tabular-nums: digits keep one width, so the number does not wobble as it counts. */}
      <dd className="font-[family-name:var(--font-display)] text-3xl font-bold tabular-nums text-gradient sm:text-5xl">
        {value}
        {suffix}
      </dd>
    </div>
  );
}

export default function AnimatedCounters() {
  return (
    // Three separate raised tiles rather than one divided strip.
    <dl className="grid grid-cols-3 gap-3 sm:gap-5">
      {counters.map((counter) => (
        <Counter key={counter.label} {...counter} />
      ))}
    </dl>
  );
}
