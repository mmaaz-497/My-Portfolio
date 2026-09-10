'use client';

import { motion } from 'framer-motion';

interface Service {
  title: string;
  description: string;
  features: string[];
  image: string;
  proof?: { label: string; url: string };
  icon: React.ReactNode;
}

const iconProps = {
  className: 'w-6 h-6',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  viewBox: '0 0 24 24',
};

const coreServices: Service[] = [
  {
    title: 'Agentic AI Systems & Digital FTEs',
    description:
      'Autonomous multi-agent systems that plan tasks, hold memory, call tools and run entire workflows 24/7 — built with the OpenAI Agents SDK. I turn a manual, repetitive process into a "Digital FTE" that just does the job.',
    features: ['Multi-agent orchestration', 'Task planning & memory', 'Tool / API integration', 'Human-in-the-loop'],
    image: '/service-images/agentic-ai.jpg',
    proof: { label: 'Agentic Essay Pilot', url: 'https://agentic-essay-pilot.vercel.app/' },
    icon: (
      <svg {...iconProps}>
        <rect x="4" y="8" width="16" height="12" rx="2" />
        <path d="M12 4v4M9 2h6M9 14h.01M15 14h.01M2 13h2M20 13h2" />
      </svg>
    ),
  },
  {
    title: 'RAG Chatbots & Knowledge Assistants',
    description:
      'Chatbots that actually know your business — trained on your documents, wikis and data with vector search over Qdrant or ChromaDB. Accurate, cited answers instead of generic LLM guesses.',
    features: ['Document ingestion pipelines', 'Semantic / hybrid search', 'Source citations', 'Multi-agent reasoning'],
    image: '/service-images/rag-chatbots.jpg',
    proof: { label: 'Physical AI RAG Chatbot', url: 'https://physical-ai-humanoid-robotics-textb-vert.vercel.app/' },
    icon: (
      <svg {...iconProps}>
        <path d="M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z" />
        <path d="M8 9h8M8 13h5" />
      </svg>
    ),
  },
  {
    title: 'Full-Stack Web & E-Commerce Development',
    description:
      'Production web apps from database schema to deployed UI — Next.js, TypeScript, FastAPI, PostgreSQL. Storefronts with checkout, payments, headless CMS, admin panels and PDF invoicing included.',
    features: ['Next.js / React front-ends', 'FastAPI & Node APIs', 'Stripe checkout', 'Sanity CMS & dashboards'],
    image: '/service-images/fullstack-ecommerce.jpg',
    proof: { label: 'Restaurant E-Commerce', url: 'https://quick-commerce-hackathon-zthw.vercel.app/' },
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <path d="M3 9h18M7 14h4M3 22h18" />
      </svg>
    ),
  },
  {
    title: 'AI Feature Integration',
    description:
      'Already have a product? I add the AI layer — semantic search, content generation, smart assistants, document processing — into your existing codebase without a rewrite.',
    features: ['LLM feature design', 'Streaming chat UIs', 'Prompt & context engineering', 'Cost / latency tuning'],
    image: '/service-images/ai-integration.jpg',
    proof: { label: 'AI Task Manager', url: 'https://task-manager-one-psi-50.vercel.app/' },
    icon: (
      <svg {...iconProps}>
        <path d="M12 3l1.9 4.6L18.5 9.5 14 11.4 12 16l-2-4.6L5.5 9.5 10 7.6z" />
        <path d="M19 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z" />
      </svg>
    ),
  },
  {
    title: 'Workflow Automation & API Integrations',
    description:
      'Silent agents that watch a channel, filter noise and act — file tickets, update sheets, sync systems, send alerts. Connect the tools your team already uses so the busywork disappears.',
    features: ['Event-driven agents', 'Sheets / CRM / messaging APIs', 'Scheduled jobs', 'Structured data extraction'],
    image: '/service-images/workflow-automation.jpg',
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="4" width="6" height="6" rx="1" />
        <rect x="15" y="14" width="6" height="6" rx="1" />
        <path d="M9 7h4a3 3 0 0 1 3 3v4M6 10v3a3 3 0 0 0 3 3h3" />
      </svg>
    ),
  },
  {
    title: 'Computer Vision & Multimodal AI Apps',
    description:
      'Apps that see and reason — GPT-4 Vision for image classification, inspection and diagnosis, with bilingual output and auto-generated PDF reports (as in ZaraatAI for farmers).',
    features: ['Image analysis & classification', 'Multimodal reasoning', 'Bilingual (Urdu / English) output', 'PDF report generation'],
    image: '/service-images/computer-vision.jpg',
    proof: { label: 'ZaraatAI Crop Detector', url: 'https://crop-disease-detector-topaz.vercel.app/' },
    icon: (
      <svg {...iconProps}>
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
];

const additionalServices: Service[] = [
  {
    title: 'On-Prem / Private LLM Solutions',
    description:
      "For sensitive data that can't leave your building. Local LLM deployments where every inference runs on-prem — the privacy-first architecture behind my silent WhatsApp ticketing agent.",
    features: ['Local model hosting', 'Air-gapped RAG', 'Data-residency compliance', 'Hardware sizing guidance'],
    image: '/service-images/private-llm-servers.jpg',
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="4" width="18" height="7" rx="2" />
        <rect x="3" y="13" width="18" height="7" rx="2" />
        <path d="M7 7.5h.01M7 16.5h.01" />
      </svg>
    ),
  },
  {
    title: 'Consulting, Code Review & AI Training',
    description:
      'Architecture decisions, code reviews and hands-on training for teams adopting agentic AI. Award-winning Gen-AI background plus two years of teaching — I make complex things click.',
    features: ['AI architecture review', 'Codebase audits', 'Team workshops', 'Spec-driven development coaching'],
    image: '/service-images/consulting-code-review.jpg',
    icon: (
      <svg {...iconProps}>
        <path d="M8 9l-3 3 3 3M16 9l3 3-3 3M13 6l-2 12" />
      </svg>
    ),
  },
];

const processSteps = [
  { step: '01', label: 'Discover', detail: 'Map the workflow & success metrics' },
  { step: '02', label: 'Architect', detail: 'Spec-driven design & tech choices' },
  { step: '03', label: 'Build', detail: 'Ship in iterations, reviewed as we go' },
  { step: '04', label: 'Deploy', detail: 'Dockerized, on the cloud or on-prem' },
  { step: '05', label: 'Support', detail: 'Monitor, tune & hand over docs' },
];

const fallbackImage = (title: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 340"><rect fill="#141416" width="600" height="340"/><text x="300" y="180" text-anchor="middle" font-size="40" fill="#00F5FF" opacity="0.3">${title.split(' ')[0]}</text></svg>`,
  )}`;

function ServiceCard({ service, index, large = false }: { service: Service; index: number; large?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#00F5FF]/10 bg-[#1A1A1A]/70 backdrop-blur-xl transition-all duration-500 hover:border-[#00F5FF]/50 hover:shadow-[0_0_40px_rgba(0,245,255,0.2)]"
    >
      {/* Visual */}
      <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A]">
        <div className="absolute inset-0 z-10 bg-gradient-to-tr from-[#00F5FF]/25 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        {/* persistent vignette so light screenshots blend into the dark card */}
        <div className="absolute inset-x-0 bottom-0 z-10 h-2/3 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent" />
        <img
          src={service.image}
          alt={`${service.title} visual`}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            const t = e.target as HTMLImageElement;
            t.onerror = null;
            t.src = fallbackImage(service.title);
          }}
        />
        {/* Icon tile */}
        <div className="absolute bottom-3 left-3 z-20 flex h-11 w-11 items-center justify-center rounded-xl border border-[#00F5FF]/30 bg-[#0A0A0A]/85 text-[#00F5FF] backdrop-blur-sm transition-all duration-300 group-hover:bg-[#00F5FF]/10 group-hover:shadow-[0_0_15px_rgba(0,245,255,0.35)]">
          {service.icon}
        </div>
      </div>

      {/* Body */}
      <div className={`flex flex-1 flex-col p-5 ${large ? 'md:p-6' : ''}`}>
        <h3 className="mb-2 text-[17px] font-bold leading-snug text-[#F1F1F1] transition-colors duration-300 group-hover:text-[#00F5FF]">
          {service.title}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-[#A3A3A3]">{service.description}</p>

        <ul className="mb-4 flex flex-wrap gap-1.5">
          {service.features.map((f) => (
            <li
              key={f}
              className="rounded-full border border-[#00F5FF]/20 bg-[#00F5FF]/5 px-2.5 py-1 text-[11px] font-medium text-[#00F5FF] transition-all duration-300 group-hover:border-[#00F5FF]/40"
            >
              {f}
            </li>
          ))}
        </ul>

        {service.proof && (
          <a
            href={service.proof.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center gap-1.5 self-start text-xs font-semibold text-[#00F5FF]/80 transition-colors hover:text-[#00F5FF]"
          >
            <span>See it live — {service.proof.label}</span>
            <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-[#0A0A0A] px-6 py-24 lg:px-12">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-[#00F5FF]/5 blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[380px] w-[380px] rounded-full bg-[#00F5FF]/[0.03] blur-[120px]" />
      </div>

      {/* Header */}
      <motion.div
        className="relative z-10 mb-16 text-center"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span className="text-sm font-semibold uppercase tracking-[0.3em] text-[#00F5FF]">Services</span>
        <h2 className="mt-4 text-4xl font-black leading-tight text-[#F1F1F1] md:text-5xl lg:text-6xl">
          What I Can <span className="neon-glow text-[#00F5FF]">Build For You</span>
        </h2>
        <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-[#00F5FF] to-[#00BFFF]" />
        <p className="mx-auto mt-6 max-w-2xl text-lg text-[#A3A3A3]">
          Production systems, not proofs of concept — every service below is backed by something I&apos;ve shipped and deployed.
        </p>
      </motion.div>

      {/* Core grid */}
      <div className="relative z-10 mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
        {coreServices.map((service, i) => (
          <ServiceCard key={service.title} service={service} index={i} />
        ))}
      </div>

      {/* Additional */}
      <div className="relative z-10 mx-auto mt-20 max-w-6xl">
        <div className="mb-8 flex items-center gap-4">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A3A3A3]">Also available</span>
          <div className="h-px flex-1 bg-gradient-to-r from-[#00F5FF]/30 to-transparent" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {additionalServices.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} large />
          ))}
        </div>
      </div>

      {/* Process */}
      <motion.div
        className="relative z-10 mx-auto mt-20 max-w-6xl rounded-2xl border border-[#00F5FF]/10 bg-[#1A1A1A]/50 p-6 backdrop-blur-xl md:p-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="mb-6 text-center text-sm font-semibold uppercase tracking-[0.25em] text-[#F1F1F1]">
          How I Work
        </h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {processSteps.map((p) => (
            <div key={p.step} className="group text-center">
              <div className="mb-2 text-2xl font-black text-[#00F5FF]/30 transition-colors group-hover:text-[#00F5FF]">
                {p.step}
              </div>
              <div className="text-sm font-bold text-[#F1F1F1]">{p.label}</div>
              <div className="mt-1 text-xs leading-relaxed text-[#A3A3A3]">{p.detail}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        className="relative z-10 mx-auto mt-16 max-w-3xl text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-2xl font-bold text-[#F1F1F1] md:text-3xl">
          Have a workflow worth automating?
        </h3>
        <p className="mx-auto mt-3 max-w-xl text-[#A3A3A3]">
          Tell me what&apos;s slowing your team down — I&apos;ll tell you what an agent or a full-stack build could take off your plate.
        </p>
        <a
          href="#contact"
          className="mt-6 inline-flex items-center gap-2 rounded-lg border border-[#00F5FF] px-7 py-3 text-sm font-semibold uppercase tracking-wide text-[#00F5FF] transition-all duration-300 hover:bg-[#00F5FF]/10 hover:shadow-[0_0_20px_rgba(0,245,255,0.3)]"
        >
          Start a Project
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </motion.div>

      {/* Decorative corners */}
      <div className="pointer-events-none absolute left-10 top-20 h-20 w-20 rounded-tl-lg border-l-2 border-t-2 border-[#00F5FF]/10" />
      <div className="pointer-events-none absolute bottom-20 right-10 h-20 w-20 rounded-br-lg border-b-2 border-r-2 border-[#00F5FF]/10" />
    </section>
  );
}
