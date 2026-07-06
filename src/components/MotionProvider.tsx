'use client';

import { MotionConfig } from 'framer-motion';

// Makes every Framer Motion animation respect the user's OS-level
// "reduce motion" accessibility setting (transforms are skipped,
// opacity changes still apply so content never gets stuck hidden).
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
