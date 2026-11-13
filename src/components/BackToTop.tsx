'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowUpIcon } from './ui/Icons';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  // The ring around the button fills as the page is read.
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });

  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      setVisible(window.scrollY > 600);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      href="#hero"
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      className={`control-3d fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-5 z-40 h-12 w-12 rounded-full !border-transparent !text-accent duration-300 sm:right-6 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <circle cx="24" cy="24" r="22.5" stroke="var(--line)" strokeWidth="2" />
        <motion.circle
          cx="24"
          cy="24"
          r="22.5"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ pathLength: progress }}
        />
      </svg>
      <ArrowUpIcon className="relative h-5 w-5" />
    </a>
  );
}
