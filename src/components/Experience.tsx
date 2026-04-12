'use client';

import { motion } from 'framer-motion';

const experiences = [
  {
    year: '2025 - 2026',
    title: 'Senior Agentic AI Developer',
    company: 'Freelance / Independent',
    description: 'Building advanced AI agents and automation solutions using OpenAI Agents SDK, Python, and cutting-edge AI frameworks. Leading complex AI integration projects.',
    icon: '🤖',
  },
  {
    year: '2024 - 2025',
    title: 'Full-Stack AI Developer',
    company: 'Various Projects',
    description: 'Developed scalable web applications with integrated AI features using Next.js, React, Node.js, and advanced LLM implementations.',
    icon: '💻',
  },
  {
    year: '2023 - 2024',
    title: 'AI & Machine Learning Specialist',
    company: 'Self-Directed Learning',
    description: 'Deep expertise in AI, ML, LLMs, and agentic workflows. Built multiple production-ready AI applications and intelligent chatbots.',
    icon: '🧠',
  },
  {
    year: '2022 - 2023',
    title: 'Full-Stack Development Journey',
    company: 'Skill Building',
    description: 'Mastered React, TypeScript, Tailwind CSS, and modern frontend/backend frameworks. Built comprehensive portfolio of projects.',
    icon: '🎨',
  },
];

export default function Experience() {
  return (
    <section id="experience" className="px-6 py-20 bg-gradient-to-b from-teal-900 via-teal-950 to-black">
      <motion.h3
        className="text-3xl md:text-5xl font-bold mb-12 text-center text-teal-400 drop-shadow-md"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        My Journey
      </motion.h3>

      <div className="max-w-4xl mx-auto relative">
        {/* Timeline Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-400 to-orange-400 transform -translate-x-1/2" />

        {/* Timeline Items */}
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            className={`relative mb-12 md:mb-20 ${
              index % 2 === 0 ? 'md:pr-[calc(50%+2rem)]' : 'md:pl-[calc(50%+2rem)]'
            }`}
          >
            <div className="md:text-left">
              {/* Timeline Dot */}
              <div
                className="absolute w-10 h-10 rounded-full bg-gradient-to-tr from-teal-400 to-orange-500 flex items-center justify-center text-xl shadow-lg shadow-orange-500/30 z-20 left-1/2 -translate-x-1/2"
              >
                <span className="text-base">{exp.icon}</span>
              </div>

              {/* Content Card */}
              <div className={`ml-16 md:ml-0 ${index % 2 === 0 ? 'md:text-right' : ''} bg-gradient-to-br from-teal-900/50 to-black/50 backdrop-blur p-5 rounded-xl border border-teal-700/50 hover:border-orange-400/50 transition-all duration-300`}>
                <span className="inline-block px-3 py-1 bg-orange-500/20 text-orange-400 text-xs font-semibold rounded-full mb-2">
                  {exp.year}
                </span>
                <h4 className="text-xl font-bold text-white mb-1">{exp.title}</h4>
                <p className="text-teal-400 text-sm mb-3 font-medium">{exp.company}</p>
                <p className="text-teal-200 text-sm leading-relaxed">{exp.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
