'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  url: string;
  description: string;
  tech: string[];
  screenshot: string;
  category: 'ai' | 'web' | 'tool';
}

const projects: Project[] = [
  {
    id: 7,
    title: 'ZaraatAI',
    url: 'https://crop-disease-detector-topaz.vercel.app/',
    description: 'AI-powered web app that detects crop diseases from leaf photos using GPT-4 Vision — returns disease name, severity, treatment steps, and medicine recommendations in both Urdu and English.',
    tech: ['Next.js 14', 'TypeScript', 'GPT-4 Vision', 'OpenAI Agents SDK', 'GSAP', 'jsPDF'],
    screenshot: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=400&fit=crop&q=80',
    category: 'ai',
  },
  {
    id: 8,
    title: 'Physical AI Humanoid Robotics Book',
    url: 'https://physical-ai-humanoid-robotics-textb-vert.vercel.app/',
    description: 'An interactive digital textbook on humanoid robotics, powered by a RAG-based AI chatbot that answers your questions directly from the book\'s content.',
    tech: ['Next.js', 'RAG', 'OpenAI', 'OpenAI Agents SDK', 'MCP Tools'],
    screenshot: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop&q=80',
    category: 'ai',
  },
  {
    id: 9,
    title: 'Todo App with Reminder',
    url: 'https://todo-full-stack-web-application-self.vercel.app/',
    description: 'A full-stack todo application with smart reminders to keep you on track — never miss a deadline or forget an important task again.',
    tech: ['Next.js', 'PostgreSQL', 'OpenAI', 'Tailwind CSS', 'TypeScript', 'Auth'],
    screenshot: '/project-screenshots/todo-app-reminder.jpg',
    category: 'tool',
  },
  {
    id: 10,
    title: 'Restaurant Website',
    url: 'https://quick-commerce-hackathon-zthw.vercel.app/',
    description: 'A modern, visually rich restaurant website featuring menu browsing, online ordering, and a seamless user experience built for speed and style.',
    tech: ['Next.js', 'Stripe', 'Sanity', 'TailwindCSS', 'TypeScript'],
    screenshot: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop&q=80',
    category: 'web',
  },
  {
    id: 11,
    title: 'Task Manager App',
    url: 'https://task-manager-one-psi-50.vercel.app/',
    description: 'A minimal yet powerful daily task manager to organize your day, set priorities, and track progress — built for focus and productivity.',
    tech: ['Next.js', 'TailwindCSS', 'TypeScript'],
    screenshot: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=600&h=400&fit=crop&q=80',
    category: 'tool',
  },
  {
    id: 1,
    title: 'Cooking Recipes AI Agent',
    url: 'https://mmaaz-497-cooking-recipies-ai-agent-main-owgks1.streamlit.app/',
    description: 'AI-powered cooking recipe suggestions based on ingredients and preferences.',
    tech: ['AI', 'OpenAI', 'Streamlit'],
    screenshot: '/project-screenshots/cooking-recipes-ai.jpg',
    category: 'ai',
  },
  {
    id: 2,
    title: 'Agentic Essay Pilot',
    url: 'https://agentic-essay-pilot.vercel.app/',
    description: 'AI agent for essay generation and intelligent writing assistance.',
    tech: ['OpenAI Agents SDK', 'OpenAI', 'ChatKit'],
    screenshot: '/project-screenshots/agentic-essay-pilot.png',
    category: 'ai',
  },
  {
    id: 3,
    title: 'CV Generator',
    url: 'https://dynamic-resume-builder-xi-orcin.vercel.app/',
    description: 'Dynamic resume builder with customizable templates and live preview.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    screenshot: '/project-screenshots/cv-generator.png',
    category: 'tool',
  },
  {
    id: 4,
    title: 'Growth Mindset App',
    url: 'https://mmaaz-497-growth-mindset-app-gfeevb.streamlit.app/',
    description: 'An app focused on developing and tracking growth mindset habits.',
    tech: ['Streamlit', 'Python'],
    screenshot: '/project-screenshots/growth-mindset-app.jpg',
    category: 'web',
  },
  {
    id: 5,
    title: 'Personal Library',
    url: 'https://rk-personallibrarymanager.streamlit.app/',
    description: 'Manage and organize your personal book library efficiently.',
    tech: ['Streamlit', 'Python'],
    screenshot: '/project-screenshots/personal-library.jpg',
    category: 'web',
  },
  {
    id: 6,
    title: 'Blog Website',
    url: 'https://blog-website-beige-psi.vercel.app/',
    description: 'A full-featured blog website for content sharing and publishing.',
    tech: ['Next.js', 'Sanity'],
    screenshot: '/project-screenshots/blog-website.png',
    category: 'web',
  },
];

// Duplicate projects for infinite loop effect
const extendedProjects = [...projects, ...projects];

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Update visible cards based on screen width
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else if (window.innerWidth < 1280) {
        setVisibleCount(3);
      } else {
        setVisibleCount(4);
      }
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      // Reset when we reach the end of the original set
      if (nextIndex >= projects.length) {
        return 0;
      }
      return nextIndex;
    });
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex <= 0) {
        return projects.length - 1;
      }
      return prevIndex - 1;
    });
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isPaused) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 3000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isPaused, nextSlide]);

  const cardWidth = 100 / visibleCount;

  return (
    <section id="projects" className="relative px-6 lg:px-12 py-24 bg-[#0A0A0A] overflow-hidden">
      {/* Ambient Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#00F5FF]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#00F5FF]/3 rounded-full blur-[120px]" />
      </div>

      {/* Section Title */}
      <motion.div
        className="text-center mb-20 relative z-10"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span className="text-[#00F5FF] text-sm font-semibold uppercase tracking-[0.3em]">
          Portfolio
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#F1F1F1] mt-4 leading-tight">
          Featured <span className="text-[#00F5FF] neon-glow">Projects</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-[#00F5FF] to-[#00BFFF] mx-auto mt-6 rounded-full" />
      </motion.div>

      {/* Carousel Container */}
      <div className="relative max-w-7xl mx-auto z-10 px-14 lg:px-16">
        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-[#1A1A1A] border border-[#00F5FF]/30 flex items-center justify-center group hover:bg-[#00F5FF]/10 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,245,255,0.3)]"
          aria-label="Previous project"
        >
          <svg
            className="w-6 h-6 text-[#00F5FF] group-hover:scale-110 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-[#1A1A1A] border border-[#00F5FF]/30 flex items-center justify-center group hover:bg-[#00F5FF]/10 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,245,255,0.3)]"
          aria-label="Next project"
        >
          <svg
            className="w-6 h-6 text-[#00F5FF] group-hover:scale-110 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Carousel Viewport */}
        <div
          ref={carouselRef}
          className="overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            className="flex"
            animate={{
              x: `-${currentIndex * cardWidth}%`,
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
          >
            {extendedProjects.map((project, index) => {
              const isActive = index % projects.length === currentIndex;
              const isAdjacent =
                index % projects.length === (currentIndex + 1) % projects.length ||
                index % projects.length === (currentIndex - 1 + projects.length) % projects.length;

              return (
                <div
                  key={`${project.id}-${index}`}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${cardWidth}%` }}
                >
                  <motion.a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block rounded-xl overflow-hidden transition-all duration-500 ${
                      isActive
                        ? 'opacity-100 scale-100'
                        : isAdjacent
                        ? 'opacity-70 scale-95'
                        : 'opacity-50 scale-90 blur-[1px]'
                    }`}
                    whileHover={{ y: -8, scale: 1.02 }}
                  >
                    {/* Card */}
                    <div className="glass-card rounded-xl overflow-hidden group relative border border-[#00F5FF]/10 hover:border-[#00F5FF]/50 hover:shadow-[0_0_40px_rgba(0,245,255,0.2)] transition-all duration-500">
                      {/* Screenshot Container */}
                      <div className="relative w-full h-48 bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] overflow-hidden">
                        {/* Neon overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#00F5FF]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                        {/* External link icon */}
                        <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <div className="w-14 h-14 rounded-full bg-black/70 backdrop-blur-sm border border-[#00F5FF]/40 flex items-center justify-center">
                            <svg
                              className="w-6 h-6 text-[#00F5FF]"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </div>
                        </div>

                        {/* Image */}
                        <img
                          src={project.screenshot}
                          alt={`${project.title} screenshot`}
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = `data:image/svg+xml,${encodeURIComponent(
                              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400"><rect fill="#1A1A1A" width="600" height="400"/><text x="300" y="200" text-anchor="middle" font-size="48" fill="#00F5FF" opacity="0.3">${project.title.split(' ')[0]}</text></svg>`
                            )}`;
                          }}
                        />
                      </div>

                      {/* Card Content */}
                      <div className="p-5">
                        <h3 className="text-lg font-bold text-[#F1F1F1] mb-2 group-hover:text-[#00F5FF] transition-colors duration-300">
                          {project.title}
                        </h3>
                        <p className="text-sm text-[#A3A3A3] mb-4 leading-relaxed line-clamp-2">
                          {project.description}
                        </p>

                        {/* Tech Stack Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tech.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1.5 bg-[#00F5FF]/5 text-[#00F5FF] text-xs font-medium rounded-full border border-[#00F5FF]/20 hover:bg-[#00F5FF]/10 hover:border-[#00F5FF]/40 hover:shadow-[0_0_10px_rgba(0,245,255,0.2)] transition-all duration-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* View Project Button */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-transparent border border-[#00F5FF]/30 rounded-lg text-[#00F5FF] text-sm font-semibold group-hover:bg-[#00F5FF]/10 group-hover:border-[#00F5FF]/50 group-hover:shadow-[0_0_15px_rgba(0,245,255,0.3)] transition-all duration-300">
                          <span>View Project</span>
                          <svg
                            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </motion.a>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center items-center gap-3 mt-12">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                currentIndex === index
                  ? 'w-8 h-2 bg-[#00F5FF] shadow-[0_0_10px_rgba(0,245,255,0.5)]'
                  : 'w-2 h-2 bg-[#A3A3A3]/30 hover:bg-[#00F5FF]/50'
              }`}
              aria-label={`Go to project ${index + 1}`}
              aria-current={currentIndex === index ? 'true' : 'false'}
            />
          ))}
        </div>

        {/* Auto-play Indicator */}
        <div className="flex justify-center items-center gap-2 mt-4 text-xs text-[#A3A3A3]">
          <div className={`flex gap-1 ${isPaused ? 'opacity-50' : 'opacity-100'}`}>
            <motion.div
              className="w-1 h-1 bg-[#00F5FF] rounded-full"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.div
              className="w-1 h-1 bg-[#00F5FF] rounded-full"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
            />
            <motion.div
              className="w-1 h-1 bg-[#00F5FF] rounded-full"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
            />
          </div>
          <span>{isPaused ? 'Paused' : 'Auto-playing'}</span>
        </div>
      </div>

      {/* Decorative Corner Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 border-l-2 border-t-2 border-[#00F5FF]/10 rounded-tl-lg pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-20 h-20 border-r-2 border-b-2 border-[#00F5FF]/10 rounded-br-lg pointer-events-none" />
    </section>
  );
}
