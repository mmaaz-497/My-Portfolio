'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const certificate = {
  title: 'Generative AI Application Developer',
  issuer: 'UETIANS Lahore Endowment Foundation, USA',
  collaborators: 'In collaboration with NCEAC, HEC, Pak Angels, iCode Guru & Spire Pakistan',
  program: 'NCEAC – HEC Generative AI Training · Cohort 3',
  duration: 'Mar – May 2026',
  issued: '30 May 2026',
  credentialId: '5ad17f8d3f87134d',
  image: '/certificates/generative-ai-hec.jpg',
  pdf: '/certificates/generative-ai-hec.pdf',
};

const learningAreas = [
  {
    title: 'OpenAI & AI Engineering',
    issuer: 'Self-Directed Learning',
    icon: '🤖',
  },
  {
    title: 'Next.js Full-Stack Development',
    issuer: 'Project-Based Learning',
    icon: '⚛️',
  },
  {
    title: 'Python for Data Science',
    issuer: 'Professional Development',
    icon: '🐍',
  },
  {
    title: 'Cloud & DevOps (AWS/Docker)',
    issuer: 'Infrastructure Learning',
    icon: '☁️',
  },
  {
    title: 'UI/UX Design with Figma',
    issuer: 'Design Fundamentals',
    icon: '🎨',
  },
  {
    title: 'Agentic AI & Automation',
    issuer: 'Advanced AI Workflows',
    icon: '🔄',
  },
];

const imageFallback = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420"><rect fill="#1A1A1A" width="600" height="420"/><text x="300" y="210" text-anchor="middle" font-size="42" fill="#00F5FF" opacity="0.3">Certificate</text></svg>`
)}`;

export default function Certifications() {
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <section id="certifications" className="relative px-6 lg:px-12 py-24 bg-[#0A0A0A]">
      {/* Section Title */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-[#00F5FF] text-sm font-semibold uppercase tracking-[0.3em]">Credentials</span>
        <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#F1F1F1] mt-3">
          Certifications & <span className="text-[#00F5FF]">Learning</span>
        </h3>
        <div className="w-20 h-1 bg-gradient-to-r from-[#00F5FF] to-[#00BFFF] mx-auto mt-6 rounded-full" />
      </motion.div>

      <div className="max-w-6xl mx-auto">
        {/* Featured Credential */}
        <motion.div
          className="glass-card rounded-2xl p-6 md:p-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid md:grid-cols-5 gap-8 items-center">
            {/* Certificate Preview */}
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              aria-label="View the Generative AI Application Developer certificate full size"
              className="md:col-span-3 group relative block w-full overflow-hidden rounded-xl border border-[#00F5FF]/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F5FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
            >
              <img
                src={certificate.image}
                alt={`${certificate.title} certificate awarded to Muhammad Maaz`}
                className="w-full h-auto transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = imageFallback;
                }}
              />
              <div className="absolute inset-0 bg-[#0A0A0A]/60 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#00F5FF]/50 bg-[#0A0A0A]/80 text-[#00F5FF] text-sm font-semibold uppercase tracking-wide">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                    />
                  </svg>
                  Click to enlarge
                </span>
              </div>
            </button>

            {/* Credential Details */}
            <div className="md:col-span-2">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
                <span aria-hidden="true">🏆</span> Top Performer
              </span>

              <h4 className="text-2xl font-bold text-[#F1F1F1] mb-2">{certificate.title}</h4>
              <p className="text-[#00BFFF] text-sm font-semibold mb-1">{certificate.issuer}</p>
              <p className="text-[#A3A3A3] text-xs leading-relaxed mb-5">{certificate.collaborators}</p>

              <dl className="space-y-2 text-sm mb-6">
                <div className="flex gap-2">
                  <dt className="text-[#A3A3A3] flex-shrink-0">Program</dt>
                  <dd className="text-[#F1F1F1] ml-auto text-right">{certificate.program}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="text-[#A3A3A3] flex-shrink-0">Duration</dt>
                  <dd className="text-[#F1F1F1] ml-auto text-right">{certificate.duration}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="text-[#A3A3A3] flex-shrink-0">Issued</dt>
                  <dd className="text-[#F1F1F1] ml-auto text-right">{certificate.issued}</dd>
                </div>
              </dl>

              <p className="text-xs text-[#A3A3A3] mb-6">
                Credential ID{' '}
                <span className="font-mono text-[#00F5FF] break-all">{certificate.credentialId}</span>
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(true)}
                  className="px-5 py-2.5 rounded-lg border border-[#00F5FF] text-[#00F5FF] text-sm font-semibold uppercase tracking-wide hover:bg-[#00F5FF]/10 hover:shadow-[0_0_20px_rgba(0,245,255,0.3)] transition-all duration-300"
                >
                  View Certificate
                </button>
                <a
                  href={certificate.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-lg border border-[#00F5FF]/20 text-[#A3A3A3] text-sm font-semibold uppercase tracking-wide hover:text-[#F1F1F1] hover:border-[#00F5FF]/50 transition-all duration-300"
                >
                  Download PDF
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Continuous Learning */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h4 className="text-2xl md:text-3xl font-bold text-[#F1F1F1]">Continuous Learning</h4>
          <p className="text-[#A3A3A3] text-sm md:text-base mt-3 max-w-2xl mx-auto">
            Self-directed focus areas I keep sharpening through courses and hands-on projects.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {learningAreas.map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="glass-card rounded-xl p-5"
            >
              <div className="w-12 h-12 rounded-lg bg-[#00F5FF]/10 flex items-center justify-center text-2xl mb-4">
                <span aria-hidden="true">{area.icon}</span>
              </div>
              <h5 className="text-base font-bold text-[#F1F1F1] mb-1">{area.title}</h5>
              <p className="text-[#A3A3A3] text-sm">{area.issuer}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${certificate.title} certificate`}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close certificate preview"
              className="absolute top-4 right-4 p-2 rounded-lg text-[#00F5FF] hover:bg-[#00F5FF]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F5FF] transition-all duration-300"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <motion.img
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              src={certificate.image}
              alt={`${certificate.title} certificate awarded to Muhammad Maaz`}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] max-w-full w-auto object-contain rounded-lg shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
