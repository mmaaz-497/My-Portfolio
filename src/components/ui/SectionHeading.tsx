import type { ReactNode } from 'react';
import Reveal from './Reveal';

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  align?: 'left' | 'center';
  /** Section number shown as a large faint numeral behind the heading, e.g. "01". */
  index?: string;
}

export default function SectionHeading({ eyebrow, title, subtitle, align = 'center', index }: SectionHeadingProps) {
  const centered = align === 'center';
  return (
    <Reveal variant="tilt" className={`relative mb-14 ${centered ? 'text-center' : ''}`}>
      {index && (
        <span
          aria-hidden="true"
          className={`ghost-index absolute -top-20 -z-10 text-[7rem] sm:-top-28 sm:text-[10rem] ${
            centered ? 'left-1/2 -translate-x-1/2' : '-left-2'
          }`}
        >
          {index}
        </span>
      )}
      <span className="inline-flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-[0.3em] text-accent">
        <span className="h-px w-8 bg-accent shadow-[0_0_8px_var(--glow)]" aria-hidden="true" />
        {eyebrow}
        {centered && <span className="h-px w-8 bg-accent shadow-[0_0_8px_var(--glow)]" aria-hidden="true" />}
      </span>
      <h2 className="heading-section mt-4 text-foreground">{title}</h2>
      {subtitle && (
        <p className={`mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg ${centered ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
