'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

/**
 * How the element arrives:
 * - `rise`  fades up (default)
 * - `tilt`  tips up from lying back, like a panel being stood upright
 * - `left` / `right`  swings in from that side on a vertical hinge
 */
export type RevealVariant = 'rise' | 'tilt' | 'left' | 'right';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Distance in px the element rises from. */
  y?: number;
  variant?: RevealVariant;
}

const HIDDEN: Record<RevealVariant, { rotateX?: number; rotateY?: number; x?: number }> = {
  rise: {},
  tilt: { rotateX: 18 },
  left: { rotateY: 22, x: -36 },
  right: { rotateY: -22, x: 36 },
};

/** Brings content in the first time it scrolls into view. */
export default function Reveal({ children, className, delay = 0, y = 28, variant = 'rise' }: RevealProps) {
  const flat = variant === 'rise';
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, ...HIDDEN[variant] }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: flat ? 0.7 : 0.9, delay, ease: [0.2, 0.8, 0.2, 1] }}
      style={flat ? undefined : { transformPerspective: 1100, transformOrigin: variant === 'tilt' ? '50% 100%' : '50% 50%' }}
    >
      {children}
    </motion.div>
  );
}
