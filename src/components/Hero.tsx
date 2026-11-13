'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '@/config/site';
import { heroLine, heroOffers, roles } from '@/data/about';
import TypewriterEffect from './TypewriterEffect';
import Magnetic from './ui/Magnetic';
import TiltCard from './ui/TiltCard';
import {
  ArrowUpRightIcon,
  BotIcon,
  ChatIcon,
  DownloadIcon,
  GithubIcon,
  LayersIcon,
  LinkedInIcon,
  XIcon,
} from './ui/Icons';

const socials = [
  { label: 'GitHub', href: siteConfig.social.github, Icon: GithubIcon },
  { label: 'LinkedIn', href: siteConfig.social.linkedin, Icon: LinkedInIcon },
  { label: 'X', href: siteConfig.social.x, Icon: XIcon },
];

// One icon per entry of `heroOffers`, in the same order.
const offerIcons = [BotIcon, ChatIcon, LayersIcon];

const EASE = [0.2, 0.8, 0.2, 1] as const;

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: EASE },
});

// The name is split on spaces so each word can rise out of its own mask.
const nameWords = siteConfig.name.split(' ');

/** How far a layer drifts against the pointer, in px: nearer layers move more. */
const drift = (px: number) => ({ translate: `calc(var(--px, 0) * ${px}px) calc(var(--py, 0) * ${px}px)` });

export default function Hero() {
  const section = useRef<HTMLElement>(null);

  // Mouse parallax between the text layers. The pointer position is written to
  // two CSS variables once per frame; nothing re-renders.
  useEffect(() => {
    const el = section.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frameId = 0;
    let x = 0;
    let y = 0;
    const apply = () => {
      frameId = 0;
      el.style.setProperty('--px', x.toFixed(3));
      el.style.setProperty('--py', y.toFixed(3));
    };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      x = (event.clientX / window.innerWidth) * 2 - 1;
      y = (event.clientY / window.innerHeight) * 2 - 1;
      if (!frameId) frameId = requestAnimationFrame(apply);
    };
    el.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      el.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <section ref={section} id="hero" className="relative flex min-h-dvh items-center px-5 pb-20 pt-28 lg:px-10">
      <div className="mx-auto w-full max-w-[1400px]">
        {/* Text sits in the left column on desktop; the 3D core occupies the right. */}
        {/* Width and heading size follow the viewport on desktop, so the text never runs under the core. */}
        <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:max-w-[min(42rem,50vw)] lg:text-left">
          <motion.div {...rise(0.9)} style={drift(-10)}>
            <span className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-widest text-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Available for Work
            </span>
          </motion.div>

          <motion.p {...rise(1.0)} className="mt-7 font-mono text-sm uppercase tracking-[0.3em] text-muted">
            Hi, I&apos;m
          </motion.p>
          <h1
            aria-label={siteConfig.name}
            style={drift(-5)}
            className="mt-3 text-[clamp(2.75rem,12vw,3.75rem)] font-bold leading-[1.02] text-foreground sm:text-6xl lg:text-[clamp(3.5rem,5.6vw,6rem)]"
          >
            {nameWords.map((word, i) => (
              // Padding/negative margin keep descenders inside the mask.
              <span key={word} aria-hidden="true" className="-mb-2 inline-block overflow-hidden pb-2 align-bottom">
                <motion.span
                  className={`inline-block ${i === nameWords.length - 1 ? 'text-gradient' : ''}`}
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 1.05 + i * 0.12, ease: EASE }}
                >
                  {word}
                </motion.span>
                {i < nameWords.length - 1 && ' '}
              </span>
            ))}
          </h1>

          <motion.p {...rise(1.3)} className="mt-5 h-9 text-xl font-semibold text-accent sm:text-2xl">
            <TypewriterEffect texts={roles} />
          </motion.p>

          <motion.p {...rise(1.4)} className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg lg:mx-0">
            {heroLine}
          </motion.p>

          {/* Phones: buttons stack full-width, socials get their own row. */}
          <motion.div
            {...rise(1.5)}
            className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4 lg:justify-start"
          >
            <Magnetic className="block sm:inline-block">
              <a href="#projects" className="btn btn-primary w-full sm:w-auto">
                View Projects
              </a>
            </Magnetic>
            <Magnetic className="block sm:inline-block">
              <a href={siteConfig.resume} download className="btn btn-ghost w-full sm:w-auto">
                <DownloadIcon className="h-4 w-4" />
                Download CV
              </a>
            </Magnetic>
            <div className="mt-2 flex items-center justify-center gap-2 sm:ml-2 sm:mt-0">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="control-3d h-11 w-11 rounded-xl"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* What he sells, readable at a glance. */}
          <motion.ul {...rise(1.65)} style={drift(-14)} className="mt-12 grid gap-3 text-left sm:grid-cols-3">
            {heroOffers.map((offer, i) => {
              const Icon = offerIcons[i % offerIcons.length];
              return (
                <li key={offer.label}>
                  <TiltCard className="h-full rounded-2xl" max={10}>
                    <a href="#services" className="preserve-3d group flex h-full items-start gap-3 rounded-2xl p-4 sm:block">
                      <span data-depth="2" className="flex items-center justify-between">
                        <span className="chip-3d h-10 w-10">
                          <Icon className="h-[18px] w-[18px]" />
                        </span>
                        <ArrowUpRightIcon className="hidden h-4 w-4 text-muted transition-[translate,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent sm:block" />
                      </span>
                      <span data-depth="1" className="block sm:mt-3">
                        <span className="block text-sm font-bold text-foreground">{offer.label}</span>
                        <span className="mt-1 block text-xs leading-snug text-muted">{offer.detail}</span>
                      </span>
                    </a>
                  </TiltCard>
                </li>
              );
            })}
          </motion.ul>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted transition-colors hover:text-accent md:[@media(min-height:820px)]:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.35em]">Scroll</span>
        <span className="animate-float flex h-9 w-5 justify-center rounded-full border border-current pt-1.5">
          <span className="h-1.5 w-0.5 rounded-full bg-current" />
        </span>
      </a>
    </section>
  );
}
