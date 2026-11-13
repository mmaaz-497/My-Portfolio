'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { experiences } from '@/data/experience';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';
import TiltCard from './ui/TiltCard';

const isCurrent = (year: string) => /present/i.test(year);

export default function Experience() {
  const timeline = useRef<HTMLDivElement>(null);
  // The accent line grows down the timeline as it scrolls through the viewport.
  const { scrollYProgress } = useScroll({ target: timeline, offset: ['start 75%', 'end 60%'] });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section id="experience" className="relative px-5 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          index="05"
          eyebrow="My Journey"
          title={
            <>
              Experience & <span className="text-gradient">Education</span>
            </>
          }
        />

        <div ref={timeline} className="relative">
          {/* A sunken channel that fills with light as the timeline is read. */}
          <span className="well absolute bottom-0 left-[9px] top-0 w-[5px] rounded-full md:left-1/2 md:-translate-x-1/2" aria-hidden="true" />
          <motion.span
            className="rail-fill absolute bottom-0 left-[10px] top-0 w-[3px] origin-top rounded-full md:left-1/2 md:-translate-x-1/2"
            style={{ scaleY: lineScale }}
            aria-hidden="true"
          />

          <ol className="relative">
            {experiences.map((item, i) => {
              const right = i % 2 === 1;
              const current = isCurrent(item.year);
              return (
                <li key={item.title} className="relative pb-10 pl-10 last:pb-0 md:grid md:grid-cols-2 md:gap-x-14 md:pl-0">
                  <span
                    className="orb absolute left-[4px] top-7 h-[15px] w-[15px] md:left-1/2 md:-translate-x-1/2"
                    aria-hidden="true"
                  >
                    {current && (
                      <span className="absolute -inset-1 animate-ping rounded-full border border-accent motion-reduce:hidden" />
                    )}
                  </span>

                  {/* Desktop only: the period sits across the line from its card, so neither half is empty. */}
                  <p
                    aria-hidden="true"
                    className={`hidden pt-5 font-[family-name:var(--font-display)] text-2xl font-bold text-foreground/25 md:row-start-1 md:block ${
                      right ? 'md:col-start-1 md:text-right' : 'md:col-start-2'
                    }`}
                  >
                    {item.year}
                  </p>

                  {/* Each card swings in from its own side of the rail. */}
                  <Reveal
                    variant={right ? 'right' : 'left'}
                    className={`md:row-start-1 ${right ? 'md:col-start-2' : 'md:col-start-1'}`}
                    delay={0.05}
                  >
                    <TiltCard className="rounded-2xl" contentClassName="p-6" max={6}>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-block rounded-full bg-accent/10 px-3 py-1 font-mono text-xs font-semibold text-accent">
                          {item.year}
                        </span>
                        {current && (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-300">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                            Current
                          </span>
                        )}
                      </div>
                      <h3 data-depth="1" className="mt-3 text-lg font-bold text-foreground">{item.title}</h3>
                      <p className="mt-1 text-sm font-semibold text-accent-secondary">{item.company}</p>
                      <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
                    </TiltCard>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
