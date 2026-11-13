'use client';

import Image from 'next/image';
import { siteConfig } from '@/config/site';
import { bio, whatIDo } from '@/data/about';
import AnimatedCounters from './AnimatedCounters';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';
import TiltCard from './ui/TiltCard';
import { CheckIcon, PinIcon } from './ui/Icons';

/** Renders **highlighted** fragments of a bio paragraph in the accent colour. */
function Highlighted({ text }: { text: string }) {
  return (
    <>
      {text.split('**').map((part, i) =>
        i % 2 ? (
          <strong key={i} className="font-semibold text-accent">
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}

export default function AboutMe() {
  return (
    <section id="about" className="relative px-5 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="01"
          eyebrow="Get To Know Me"
          title={
            <>
              About <span className="text-gradient">Me</span>
            </>
          }
        />

        <div className="grid items-start gap-10 lg:grid-cols-[320px_1fr]">
          <Reveal variant="left">
            <TiltCard className="mx-auto max-w-[320px] rounded-3xl" contentClassName="p-3" max={9}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-card ring-1 ring-accent/30">
                <Image
                  src="/profile.jpg"
                  alt={`Portrait of ${siteConfig.name}`}
                  fill
                  sizes="320px"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent" aria-hidden="true" />
              </div>
              {/* Floats above the photo and slides against it as the card turns. */}
              <span
                data-depth="3"
                className="absolute bottom-[7.25rem] left-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/70 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white shadow-[0_10px_24px_-8px_rgba(0,0,0,0.7)]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                Open to work
              </span>
              <div data-depth="1" className="px-2 pb-2 pt-4">
                <p className="text-lg font-bold text-foreground">{siteConfig.name}</p>
                <p className="text-sm text-accent">{siteConfig.role}</p>
                <p className="mt-2 flex items-center gap-1.5 text-xs text-muted">
                  <PinIcon className="h-3.5 w-3.5" />
                  {siteConfig.location}
                </p>
              </div>
            </TiltCard>
          </Reveal>

          <div className="space-y-8">
            <Reveal variant="tilt" delay={0.1} className="glass space-y-5 rounded-3xl p-7 text-base leading-relaxed text-muted sm:p-9 sm:text-lg">
              {bio.map((paragraph) => (
                <p key={paragraph}>
                  <Highlighted text={paragraph} />
                </p>
              ))}
            </Reveal>

            <Reveal variant="tilt" delay={0.2} className="glass rounded-3xl p-7 sm:p-9">
              <h3 className="text-xl font-bold text-foreground">What I Do</h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {whatIDo.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-foreground/90 sm:text-base">
                    <span className="chip-3d mt-0.5 h-5 w-5 !rounded-full">
                      <CheckIcon className="h-3 w-3" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.1} className="mt-10">
          <AnimatedCounters />
        </Reveal>
      </div>
    </section>
  );
}
