'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface Project {
  title: string;
  url: string;
  category: 'ai' | 'web' | 'tool';
  description: string;
  tech: string[];
}

const projects: Project[] = [
  { title: 'Growth Mindset App', url: 'https://mmaaz-497-growth-mindset-app-gfeevb.streamlit.app/', category: 'web', description: 'An app focused on developing and tracking growth mindset habits.', tech: ['Streamlit', 'Python', 'UI'] },
  { title: 'CV Generator', url: 'https://dynamic-resume-builder-xi-orcin.vercel.app/', category: 'tool', description: 'Dynamic resume builder with customizable templates.', tech: ['Next.js', 'React', 'Vercel'] },
  { title: 'Personal Library', url: 'https://rk-personallibrarymanager.streamlit.app/', category: 'web', description: 'Manage and organize your personal book library.', tech: ['Streamlit', 'Python', 'Database'] },
  { title: 'Unit Convertor', url: 'https://mmaaz-497-unit-convertor-app-unit-convertor-sht9oj.streamlit.app/', category: 'tool', description: 'Convert between various units of measurement.', tech: ['Streamlit', 'Python', 'Math'] },
  { title: 'Interactive Resume', url: 'https://static-interactive-resume-ochre-one.vercel.app/', category: 'web', description: 'An interactive digital resume experience.', tech: ['HTML', 'CSS', 'Vercel'] },
  { title: 'Blog Website', url: 'https://blog-website-beige-psi.vercel.app/', category: 'web', description: 'A full-featured blog website for content sharing.', tech: ['Next.js', 'React', 'Sanity'] },
  { title: 'Restaurant Website', url: 'https://quick-commerce-hackathon-zthw.vercel.app/', category: 'web', description: 'Quick commerce restaurant website with ordering.', tech: ['Next.js', 'Tailwind', 'Vercel'] },
  { title: 'Password Strength Meter', url: 'https://mmaaz-497-password-strength-meter-password-generator-5nohxp.streamlit.app/', category: 'tool', description: 'Measure and generate secure passwords.', tech: ['Streamlit', 'Python', 'Security'] },
  { title: 'Task Manager', url: 'https://task-manager-one-psi-50.vercel.app/', category: 'tool', description: 'Organize and manage your daily tasks efficiently.', tech: ['Next.js', 'React', 'Vercel'] },
  { title: 'Random Joke Generator', url: 'https://mmaaz-497-random-joke-genrator-main-0mjngs.streamlit.app/', category: 'tool', description: 'Get entertained with random jokes on demand.', tech: ['Streamlit', 'Python', 'API'] },
  { title: 'Planets Weight Calculator', url: 'https://mmaaz-497-time-zone-convertor-main-ossttg.streamlit.app/', category: 'tool', description: 'Calculate your weight on different planets.', tech: ['Streamlit', 'Python', 'Math'] },
  { title: 'Time Zone Converter', url: 'https://mmaaz-497-time-zone-convertor-main-ossttg.streamlit.app/', category: 'tool', description: 'Convert time across different time zones.', tech: ['Streamlit', 'Python', 'Utils'] },
  { title: 'Cafe Management System', url: 'https://mmaaz-497-cafe-managment-system-main-tkwitb.streamlit.app/', category: 'web', description: 'Complete cafe management and ordering system.', tech: ['Streamlit', 'Python', 'Database'] },
  { title: 'Cooking Recipes AI Agent', url: 'https://mmaaz-497-cooking-recipies-ai-agent-main-owgks1.streamlit.app/', category: 'ai', description: 'AI-powered cooking recipe suggestions.', tech: ['AI', 'OpenAI', 'Streamlit'] },
  { title: 'Agentic Essay Pilot', url: 'https://agentic-essay-pilot.vercel.app/', category: 'ai', description: 'AI agent for essay generation and assistance.', tech: ['AI', 'OpenAI', 'Next.js'] },
  { title: 'Physical AI Humanoid & Robotics Textbook', url: 'https://physical-ai-humanoid-robotics-textb-vert.vercel.app/', category: 'ai', description: 'Educational platform for robotics and AI learning.', tech: ['AI', 'Next.js', 'Education'] },
];

const categories = [
  { key: 'all', label: 'All' },
  { key: 'ai', label: 'AI Projects' },
  { key: 'web', label: 'Web Apps' },
  { key: 'tool', label: 'Tools' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1 },
};

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="px-6 py-20 bg-[#0a0a0a]">
      <motion.h3
        className="text-3xl md:text-5xl font-bold mb-8 text-center text-teal-400 drop-shadow-md"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        My Projects
      </motion.h3>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-5 py-2 rounded-lg font-semibold transition-all duration-300 ${
              activeCategory === cat.key
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/50'
                : 'bg-teal-900 text-teal-300 hover:bg-teal-800'
            }`}
            aria-pressed={activeCategory === cat.key}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <motion.div
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        key={activeCategory}
      >
        {filteredProjects.map((project) => (
          <motion.a
            key={project.title}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            variants={item}
            className="bg-gradient-to-tr from-teal-900 to-black rounded-xl shadow-lg border border-teal-700 hover:shadow-orange-500/30 hover:bg-orange-900/20 transition-all duration-300 overflow-hidden group"
            whileHover={{ y: -5 }}
          >
            {/* Placeholder Screenshot */}
            <div className="w-full h-40 bg-gradient-to-br from-teal-800 to-teal-950 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="text-5xl opacity-30">🖥️</span>
              {/* Replace with actual screenshot: 
                  <img src={`/screenshots/${project.title.toLowerCase().replace(/\s+/g, '-')}.png`} alt={project.title} className="w-full h-full object-cover" /> 
              */}
            </div>
            
            <div className="p-6">
              <h4 className="text-xl font-semibold mb-2 text-orange-400 group-hover:text-orange-300 transition-colors">
                {project.title}
              </h4>
              <p className="text-sm text-teal-200 mb-4">{project.description}</p>
              
              {/* Tech Stack Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-teal-800/50 text-teal-300 text-xs rounded-full border border-teal-700/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <span className="text-xs text-teal-400 underline group-hover:text-orange-400 transition-colors">
                View Project →
              </span>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}
