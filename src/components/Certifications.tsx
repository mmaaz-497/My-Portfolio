'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { siteConfig } from '@/config/site';
import { certificate, learningAreas } from '@/data/certifications';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';
import TiltCard from './ui/TiltCard';
import Portal from './ui/Portal';
import { lockScroll } from './ui/SmoothScroll';
import { useFocusTrap } from './ui/useFocusTrap';
import { CloseIcon, DownloadIcon, ZoomIcon } from './ui/Icons';

const details = [
  { label: 'Program', value: certificate.program },
  { label: 'Duration', value: certificate.duration },
  { label: 'Issued', value: certificate.issued },
];

export default function Certifications() {
  const [isOpen, setIsOpen] = useState(false);
  const dialog = useRef<HTMLDivElement>(null);
  const alt = `${certificate.title} certificate awarded to ${siteConfig.name}`;

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    lockScroll(true);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      lockScroll(false);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Moves focus into the lightbox, keeps it there, and returns it on close.
  useFocusTrap(dialog, isOpen);

  return (
    <section id="certifications" className="relative px-5 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="06"
          eyebrow="Credentials"
          title={
            <>
              Certifications & <span className="text-gradient">Learning</span>
            </>
          }
        />

        <Reveal variant="tilt">
          <div className="glass grid items-center gap-8 rounded-3xl p-6 md:grid-cols-5 md:p-8">
            <TiltCard plate="" className="mb-4 mr-4 rounded-2xl md:col-span-3" max={6}>
              {/* Two sheets set back behind the certificate give the frame its thickness. */}
              <span
                className="absolute inset-0 rounded-2xl border border-foreground/15 bg-foreground/10 [transform:translate3d(16px,16px,-28px)]"
                aria-hidden="true"
              />
              <span
                className="absolute inset-0 rounded-2xl border border-foreground/20 bg-foreground/20 [transform:translate3d(8px,8px,-14px)]"
                aria-hidden="true"
              />
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                aria-label={`View the ${certificate.title} certificate full size`}
                className="group relative block w-full overflow-hidden rounded-2xl border border-line shadow-[var(--elev-2)]"
              >
                <Image
                  src={certificate.image}
                  alt={alt}
                  width={1280}
                  height={925}
                  sizes="(max-width: 767px) 100vw, 660px"
                  className="h-auto w-full"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-black/55 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="flex items-center gap-2 rounded-lg bg-black/70 px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-white">
                    <ZoomIcon className="h-4 w-4" />
                    Click to enlarge
                  </span>
                </span>
              </button>
            </TiltCard>

            <div className="md:col-span-2">
              <span className="inline-flex items-center rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-300">
                {certificate.badge}
              </span>
              <h3 className="mt-4 text-2xl font-bold text-foreground">{certificate.title}</h3>
              <p className="mt-2 text-sm font-semibold text-accent-secondary">{certificate.issuer}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">{certificate.collaborators}</p>

              <dl className="mt-5 space-y-2 text-sm">
                {details.map((row) => (
                  <div key={row.label} className="flex gap-3 border-b border-line pb-2 last:border-0 last:pb-0">
                    <dt className="flex-shrink-0 text-muted">{row.label}</dt>
                    <dd className="ml-auto text-right text-foreground">{row.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 text-xs text-muted">
                Credential ID <span className="break-all font-mono text-accent">{certificate.credentialId}</span>
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button type="button" onClick={() => setIsOpen(true)} className="btn btn-primary !px-5 !py-2.5">
                  View Certificate
                </button>
                <a href={certificate.pdf} target="_blank" rel="noopener noreferrer" className="btn btn-ghost !px-5 !py-2.5">
                  <DownloadIcon className="h-4 w-4" />
                  PDF
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="mb-8 mt-16 text-center">
          <h3 className="text-2xl font-bold text-foreground sm:text-3xl">Continuous Learning</h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted sm:text-base">
            Self-directed focus areas I keep sharpening through courses and hands-on projects.
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {learningAreas.map((area, i) => (
            <Reveal key={area.title} variant="tilt" delay={(i % 3) * 0.08} className="h-full">
              <TiltCard className="h-full rounded-2xl" contentClassName="flex items-center gap-4 p-5" max={9}>
                <span data-depth="2" className="chip-3d h-11 w-11 font-mono text-sm font-bold">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h4 className="text-sm font-bold text-foreground">{area.title}</h4>
                  <p className="mt-0.5 text-xs text-muted">{area.issuer}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Portalled to <body> so no transformed ancestor can clip the overlay. */}
      <Portal>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={dialog}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              role="dialog"
              aria-modal="true"
              aria-label={`${certificate.title} certificate`}
              tabIndex={-1}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[95] flex flex-col items-center justify-center gap-4 bg-black/90 p-4 outline-none backdrop-blur-sm md:p-8"
            >
              <motion.img
                // Tips up toward the viewer, like a print lifted off a table.
                initial={{ scale: 0.9, rotateX: 16, y: 30 }}
                animate={{ scale: 1, rotateX: 0, y: 0 }}
                // A short tween on the way out, so closing never waits on the spring settling.
                exit={{ scale: 0.94, rotateX: -8, y: 10, transition: { duration: 0.2 } }}
                transition={{ type: 'spring', damping: 26, stiffness: 240 }}
                style={{ transformPerspective: 1200 }}
                src={certificate.image}
                alt={alt}
                onClick={(event) => event.stopPropagation()}
                className="max-h-[calc(100dvh-9rem)] w-auto max-w-full rounded-lg object-contain shadow-2xl"
              />
              {/* Caption bar. Always dark, whatever the site theme, because it sits on the black backdrop. */}
              <div
                onClick={(event) => event.stopPropagation()}
                className="flex w-full max-w-3xl flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-white"
              >
                <p className="min-w-0 text-sm">
                  <span className="block truncate font-semibold">{certificate.title}</span>
                  <span className="block truncate text-xs text-white/65">{certificate.issuer}</span>
                </p>
                <div className="flex items-center gap-2">
                  <a
                    href={certificate.pdf}
                    download
                    className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-colors hover:bg-white/10"
                  >
                    <DownloadIcon className="h-4 w-4" />
                    Download
                  </a>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close certificate preview"
                    className="inline-flex items-center gap-2 rounded-lg bg-white px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-black transition-opacity hover:opacity-85"
                  >
                    <CloseIcon className="h-4 w-4" />
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>
    </section>
  );
}
