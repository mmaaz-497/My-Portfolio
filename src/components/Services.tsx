'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Image from 'next/image';
import { additionalServices, coreServices, processSteps, proofUrl, type Service } from '@/data/services';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';
import TiltCard from './ui/TiltCard';
import { ArrowUpRightIcon, CheckIcon } from './ui/Icons';

function ServiceIcon({ paths }: { paths: string[] }) {
  return (
    <svg
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

function ServiceCard({ service, wide = false }: { service: Service; wide?: boolean }) {
  // A state flag (not reassigning src) so a failing image cannot retrigger onError in a loop.
  const [imageFailed, setImageFailed] = useState(false);
  const url = proofUrl(service);

  return (
    <TiltCard
      className="group h-full rounded-3xl"
      contentClassName={`flex h-full ${wide ? 'flex-col sm:flex-row' : 'flex-col'}`}
    >
      {/* The card itself cannot clip (that would flatten its floating layers), so the image rounds its own corners. */}
      <div
        className={`relative m-px flex-shrink-0 overflow-hidden rounded-t-[calc(1.5rem-1px)] bg-card ${
          wide ? 'h-44 sm:h-auto sm:w-2/5 sm:rounded-l-[calc(1.5rem-1px)] sm:rounded-tr-none' : 'h-44'
        }`}
      >
        {!imageFailed && (
          <Image
            src={service.image}
            alt=""
            fill
            sizes={wide ? '(max-width: 640px) 100vw, 280px' : '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px'}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] motion-reduce:transform-none"
            onError={() => setImageFailed(true)}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
      </div>
      {/* Outside the clipped image so it can stand proud of the card. */}
      <span data-depth="3" className={`chip-3d absolute left-5 top-28 h-12 w-12 ${wide ? 'sm:bottom-5 sm:top-auto' : ''}`}>
        <ServiceIcon paths={service.iconPaths} />
      </span>

      <div className="preserve-3d flex flex-1 flex-col p-6">
        {/* Room for two lines in the grid, so descriptions start level across a row. */}
        <h3 data-depth="1" className={`text-lg font-bold leading-snug text-foreground ${wide ? '' : 'md:min-h-[2.75em]'}`}>
          {service.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">{service.description}</p>
        <ul className="mt-5 grid gap-2 text-[13px] text-foreground sm:grid-cols-2">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2">
              <CheckIcon className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-accent" />
              {feature}
            </li>
          ))}
        </ul>
        {/* Pinned to the bottom of the card, so the proof rows line up across a row. */}
        {service.proof && url && (
          <div className="mt-auto pt-6">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="group/proof flex items-center justify-between gap-3 border-t border-line pt-4 text-sm font-semibold text-accent"
            >
              <span className="min-w-0 truncate">
                <span className="font-normal text-muted">Shipped: </span>
                <span className="underline-offset-4 group-hover/proof:underline">{service.proof.label}</span>
              </span>
              <ArrowUpRightIcon className="h-4 w-4 flex-shrink-0 transition-[translate] duration-300 group-hover/proof:-translate-y-0.5 group-hover/proof:translate-x-0.5" />
            </a>
          </div>
        )}
      </div>
    </TiltCard>
  );
}

/** The five-step engagement process, with a line that fills as it scrolls past. */
function Process() {
  const list = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: list, offset: ['start 80%', 'end 55%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <Reveal variant="tilt" className="glass mt-16 rounded-3xl p-7 sm:p-10">
      <h3 className="text-center text-xl font-bold text-foreground sm:text-2xl">How we&apos;ll work together</h3>
      <div ref={list} className="relative mt-9">
        {/* Rail: vertical beside the steps on small screens, horizontal through them on desktop. */}
        <span className="well absolute bottom-6 left-[22px] top-6 w-[5px] rounded-full lg:hidden" aria-hidden="true" />
        <motion.span
          className="rail-fill absolute bottom-6 left-[23px] top-6 w-[3px] origin-top rounded-full lg:hidden"
          style={{ scaleY: progress }}
          aria-hidden="true"
        />
        <span className="well absolute left-[10%] right-[10%] top-[22px] hidden h-[5px] rounded-full lg:block" aria-hidden="true" />
        <motion.span
          className="rail-fill absolute left-[10%] right-[10%] top-[23px] hidden h-[3px] origin-left rounded-full lg:block"
          style={{ scaleX: progress }}
          aria-hidden="true"
        />
        <ol className="relative grid gap-7 lg:grid-cols-5 lg:gap-4">
        {processSteps.map((step) => (
          <li key={step.step} className="relative flex items-center gap-5 lg:block lg:text-center">
            <span className="chip-3d h-12 w-12 !rounded-full font-mono text-sm font-bold lg:mx-auto">
              {step.step}
            </span>
            <div>
              <p className="text-base font-bold text-foreground lg:mt-4">{step.label}</p>
              <p className="mt-0.5 text-sm text-muted lg:mt-1">{step.detail}</p>
            </div>
          </li>
        ))}
        </ol>
      </div>
    </Reveal>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative px-5 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="03"
          eyebrow="Services"
          title={
            <>
              What I Can <span className="text-gradient">Build For You</span>
            </>
          }
          subtitle="Production systems, not proofs of concept — every service below is backed by something I've shipped and deployed."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {coreServices.map((service, i) => (
            <Reveal key={service.id} variant="tilt" delay={(i % 3) * 0.08} className="h-full">
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mb-6 mt-16 flex items-center gap-4">
          <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-accent">Also available</h3>
          <span className="h-px flex-1 bg-line" aria-hidden="true" />
        </Reveal>
        <div className="grid gap-6 lg:grid-cols-2">
          {additionalServices.map((service, i) => (
            <Reveal key={service.id} variant={i % 2 ? 'right' : 'left'} delay={i * 0.08} className="h-full">
              <ServiceCard service={service} wide />
            </Reveal>
          ))}
        </div>

        <Process />

        <Reveal className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-foreground sm:text-3xl">Have a workflow worth automating?</h3>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Tell me what&apos;s slowing your team down — I&apos;ll tell you what an agent or a full-stack build could take
            off your plate.
          </p>
          <a href="#contact" className="btn btn-primary mt-8">
            Start a Project
            <ArrowUpRightIcon className="btn-arrow h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
