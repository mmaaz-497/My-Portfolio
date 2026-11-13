export type ProjectCategory = 'ai' | 'web' | 'tool';

export interface Project {
  id: string;
  title: string;
  url: string;
  description: string;
  tech: string[];
  screenshot: string;
  category: ProjectCategory;
}

export const projectCategories: { id: 'all' | ProjectCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'ai', label: 'AI' },
  { id: 'web', label: 'Web' },
  { id: 'tool', label: 'Tools' },
];

export const projects: Project[] = [
  {
    id: 'zaraat-ai',
    title: 'ZaraatAI',
    url: 'https://crop-disease-detector-topaz.vercel.app/',
    description:
      'AI-powered web app that detects crop diseases from leaf photos using GPT-4 Vision — returns disease name, severity, treatment steps, and medicine recommendations in both Urdu and English.',
    tech: ['Next.js 14', 'TypeScript', 'GPT-4 Vision', 'OpenAI Agents SDK', 'GSAP', 'jsPDF'],
    screenshot: '/project-screenshots/zaraat-ai.png',
    category: 'ai',
  },
  {
    id: 'physical-ai-book',
    title: 'Physical AI Humanoid Robotics Book',
    url: 'https://physical-ai-humanoid-robotics-textb-vert.vercel.app/',
    description:
      "An interactive digital textbook on humanoid robotics, powered by a RAG-based AI chatbot that answers your questions directly from the book's content.",
    tech: ['Next.js', 'RAG', 'OpenAI', 'OpenAI Agents SDK', 'MCP Tools'],
    screenshot: '/project-screenshots/physical-ai-robotics-book.png',
    category: 'ai',
  },
  {
    id: 'todo-reminder',
    title: 'Todo App with Reminder',
    url: 'https://todo-full-stack-web-application-self.vercel.app/',
    description:
      'A full-stack todo application with smart reminders to keep you on track — never miss a deadline or forget an important task again.',
    tech: ['Next.js', 'PostgreSQL', 'OpenAI', 'Tailwind CSS', 'TypeScript', 'Auth'],
    screenshot: '/project-screenshots/todo-app-reminder.jpg',
    category: 'tool',
  },
  {
    id: 'restaurant',
    title: 'Restaurant Website',
    url: 'https://quick-commerce-hackathon-zthw.vercel.app/',
    description:
      'A modern, visually rich restaurant website featuring menu browsing, online ordering, and a seamless user experience built for speed and style.',
    tech: ['Next.js', 'Stripe', 'Sanity', 'TailwindCSS', 'TypeScript'],
    screenshot: '/project-screenshots/restaurant-website-new.png',
    category: 'web',
  },
  {
    id: 'task-manager',
    title: 'Task Manager App',
    url: 'https://task-manager-one-psi-50.vercel.app/',
    description:
      'A minimal yet powerful daily task manager to organize your day, set priorities, and track progress — built for focus and productivity.',
    tech: ['Next.js', 'TailwindCSS', 'TypeScript'],
    screenshot: '/project-screenshots/task-manager-new.png',
    category: 'tool',
  },
  {
    id: 'cooking-recipes',
    title: 'Cooking Recipes AI Agent',
    url: 'https://mmaaz-497-cooking-recipies-ai-agent-main-owgks1.streamlit.app/',
    description: 'AI-powered cooking recipe suggestions based on ingredients and preferences.',
    tech: ['AI', 'OpenAI', 'Streamlit'],
    screenshot: '/project-screenshots/cooking-recipes-ai.jpg',
    category: 'ai',
  },
  {
    id: 'essay-pilot',
    title: 'Agentic Essay Pilot',
    url: 'https://agentic-essay-pilot.vercel.app/',
    description: 'AI agent for essay generation and intelligent writing assistance.',
    tech: ['OpenAI Agents SDK', 'OpenAI', 'ChatKit'],
    screenshot: '/project-screenshots/agentic-essay-pilot.png',
    category: 'ai',
  },
  {
    id: 'cv-generator',
    title: 'CV Generator',
    url: 'https://cvlamarankerja.com/en/',
    description: 'Dynamic resume builder with customizable templates and live preview.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    screenshot: '/project-screenshots/cv-maker.png',
    category: 'tool',
  },
  {
    id: 'growth-mindset',
    title: 'Growth Mindset App',
    url: 'https://mmaaz-497-growth-mindset-app-gfeevb.streamlit.app/',
    description: 'An app focused on developing and tracking growth mindset habits.',
    tech: ['Streamlit', 'Python'],
    screenshot: '/project-screenshots/growth-mindset-app.jpg',
    category: 'web',
  },
  {
    id: 'blog',
    title: 'Blog Website',
    url: 'https://blog-website-beige-psi.vercel.app/',
    description: 'A full-featured blog website for content sharing and publishing.',
    tech: ['Next.js', 'Sanity'],
    screenshot: '/project-screenshots/blog-website.png',
    category: 'web',
  },
];

export const projectById = (id: string) => projects.find((p) => p.id === id);
