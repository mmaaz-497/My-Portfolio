import { projectById } from './projects';

export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  image: string;
  /** SVG path data drawn on a 24x24 stroke icon. */
  iconPaths: string[];
  /** Label + id of the project that proves this service; the URL comes from projects.ts. */
  proof?: { label: string; projectId: string };
}

export const coreServices: Service[] = [
  {
    id: 'agentic-ai',
    title: 'Agentic AI Systems & Digital FTEs',
    description:
      'Autonomous multi-agent systems that plan tasks, hold memory, call tools and run entire workflows 24/7 — built with the OpenAI Agents SDK. I turn a manual, repetitive process into a "Digital FTE" that just does the job.',
    features: ['Multi-agent orchestration', 'Task planning & memory', 'Tool / API integration', 'Human-in-the-loop'],
    image: '/service-images/agentic-ai.jpg',
    proof: { label: 'Agentic Essay Pilot', projectId: 'essay-pilot' },
    iconPaths: ['M6 8h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2z', 'M12 4v4M9 2h6M9 14h.01M15 14h.01M2 13h2M20 13h2'],
  },
  {
    id: 'rag-chatbots',
    title: 'RAG Chatbots & Knowledge Assistants',
    description:
      'Chatbots that actually know your business — trained on your documents, wikis and data with vector search over Qdrant or ChromaDB. Accurate, cited answers instead of generic LLM guesses.',
    features: ['Document ingestion pipelines', 'Semantic / hybrid search', 'Source citations', 'Multi-agent reasoning'],
    image: '/service-images/rag-chatbots.jpg',
    proof: { label: 'Physical AI RAG Chatbot', projectId: 'physical-ai-book' },
    iconPaths: ['M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z', 'M8 9h8M8 13h5'],
  },
  {
    id: 'fullstack',
    title: 'Full-Stack Web & E-Commerce Development',
    description:
      'Production web apps from database schema to deployed UI — Next.js, TypeScript, FastAPI, PostgreSQL. Storefronts with checkout, payments, headless CMS, admin panels and PDF invoicing included.',
    features: ['Next.js / React front-ends', 'FastAPI & Node APIs', 'Stripe checkout', 'Sanity CMS & dashboards'],
    image: '/service-images/fullstack-ecommerce.jpg',
    proof: { label: 'Restaurant E-Commerce', projectId: 'restaurant' },
    iconPaths: ['M5 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', 'M3 9h18M7 14h4M3 22h18'],
  },
  {
    id: 'ai-integration',
    title: 'AI Feature Integration',
    description:
      'Already have a product? I add the AI layer — semantic search, content generation, smart assistants, document processing — into your existing codebase without a rewrite.',
    features: ['LLM feature design', 'Streaming chat UIs', 'Prompt & context engineering', 'Cost / latency tuning'],
    image: '/service-images/ai-integration.jpg',
    proof: { label: 'Todo App with Reminder', projectId: 'todo-reminder' },
    iconPaths: ['M12 3l1.9 4.6L18.5 9.5 14 11.4 12 16l-2-4.6L5.5 9.5 10 7.6z', 'M19 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z'],
  },
  {
    id: 'automation',
    title: 'Workflow Automation & API Integrations',
    description:
      'Silent agents that watch a channel, filter noise and act — file tickets, update sheets, sync systems, send alerts. Connect the tools your team already uses so the busywork disappears.',
    features: ['Event-driven agents', 'Sheets / CRM / messaging APIs', 'Scheduled jobs', 'Structured data extraction'],
    image: '/service-images/workflow-automation.jpg',
    iconPaths: ['M4 4h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z', 'M16 14h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z', 'M9 7h4a3 3 0 0 1 3 3v4M6 10v3a3 3 0 0 0 3 3h3'],
  },
  {
    id: 'computer-vision',
    title: 'Computer Vision & Multimodal AI Apps',
    description:
      'Apps that see and reason — GPT-4 Vision for image classification, inspection and diagnosis, with bilingual output and auto-generated PDF reports (as in ZaraatAI for farmers).',
    features: ['Image analysis & classification', 'Multimodal reasoning', 'Bilingual (Urdu / English) output', 'PDF report generation'],
    image: '/service-images/computer-vision.jpg',
    proof: { label: 'ZaraatAI Crop Detector', projectId: 'zaraat-ai' },
    iconPaths: ['M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z', 'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z'],
  },
];

export const additionalServices: Service[] = [
  {
    id: 'private-llm',
    title: 'On-Prem / Private LLM Solutions',
    description:
      "For sensitive data that can't leave your building. Local LLM deployments where every inference runs on-prem — the privacy-first architecture behind my silent WhatsApp ticketing agent.",
    features: ['Local model hosting', 'Air-gapped RAG', 'Data-residency compliance', 'Hardware sizing guidance'],
    image: '/service-images/private-llm-servers.jpg',
    iconPaths: ['M5 4h14a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', 'M5 13h14a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2z', 'M7 7.5h.01M7 16.5h.01'],
  },
  {
    id: 'consulting',
    title: 'Consulting, Code Review & AI Training',
    description:
      'Architecture decisions, code reviews and hands-on training for teams adopting agentic AI. Award-winning Gen-AI background plus two years of teaching — I make complex things click.',
    features: ['AI architecture review', 'Codebase audits', 'Team workshops', 'Spec-driven development coaching'],
    image: '/service-images/consulting-code-review.jpg',
    iconPaths: ['M8 9l-3 3 3 3M16 9l3 3-3 3M13 6l-2 12'],
  },
];

export const processSteps = [
  { step: '01', label: 'Discover', detail: 'Map the workflow & success metrics' },
  { step: '02', label: 'Architect', detail: 'Spec-driven design & tech choices' },
  { step: '03', label: 'Build', detail: 'Ship in iterations, reviewed as we go' },
  { step: '04', label: 'Deploy', detail: 'Dockerized, on the cloud or on-prem' },
  { step: '05', label: 'Support', detail: 'Monitor, tune & hand over docs' },
];

export const proofUrl = (service: Service) =>
  service.proof ? projectById(service.proof.projectId)?.url : undefined;
