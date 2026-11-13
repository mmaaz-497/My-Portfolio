'use client';

import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from './ui/usePrefersReducedMotion';

interface TypewriterEffectProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetween?: number;
}

export default function TypewriterEffect({
  texts,
  typingSpeed = 80,
  deletingSpeed = 45,
  delayBetween = 1800,
}: TypewriterEffectProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const current = texts[index % texts.length];

  // One timer per step, always cleared on cleanup, so nothing fires after unmount.
  useEffect(() => {
    if (reducedMotion) return;
    let delay = deleting ? deletingSpeed : typingSpeed;
    let step: () => void;

    if (!deleting && length === current.length) {
      delay = delayBetween;
      step = () => setDeleting(true);
    } else if (deleting && length === 0) {
      delay = 250;
      step = () => {
        setDeleting(false);
        setIndex((i) => (i + 1) % texts.length);
      };
    } else {
      step = () => setLength((n) => n + (deleting ? -1 : 1));
    }

    const timer = setTimeout(step, delay);
    return () => clearTimeout(timer);
  }, [reducedMotion, length, deleting, current, texts.length, typingSpeed, deletingSpeed, delayBetween]);

  return (
    <span>
      {/* Screen readers get the stable list instead of letter-by-letter churn. */}
      <span className="sr-only">{texts.join(', ')}</span>
      {reducedMotion ? (
        // Reduced motion: the first role, standing still.
        <span aria-hidden="true">{texts[0]}</span>
      ) : (
        <span aria-hidden="true">
          {current.slice(0, length)}
          <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-accent align-middle" style={{ height: '1em' }} />
        </span>
      )}
    </span>
  );
}
