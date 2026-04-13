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
    <section id="experience" className="relative px-6 lg:px-12 py-24 bg-[#0A0A0A]">
      {/* Section Title */}
      <motion.div
        className="text-center mb-20"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-[#00F5FF] text-sm font-semibold uppercase tracking-[0.3em]">My Path</span>
        <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#F1F1F1] mt-3">
          Work <span className="text-[#00F5FF]">Experience</span>
        </h3>
        <div className="w-20 h-1 bg-gradient-to-r from-[#00F5FF] to-[#00BFFF] mx-auto mt-6 rounded-full" />
      </motion.div>

      <div className="max-w-5xl mx-auto relative">
        {/* Timeline Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00F5FF]/50 to-[#00BFFF]/20" />

        {/* Timeline Items */}
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            className={`relative mb-16 md:mb-24 ${
              index % 2 === 0 ? 'md:pr-[calc(50%+2rem)] md:text-right' : 'md:pl-[calc(50%+2rem)] md:ml-auto'
            }`}
          >
            {/* Timeline Dot */}
            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#0A0A0A] border-2 border-[#00F5FF]/50 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(0,245,255,0.2)] z-10">
              <span>{exp.icon}</span>
            </div>

            {/* Content Card */}
            <div className="ml-16 md:ml-0 glass-card rounded-xl p-6 hover:border-[#00F5FF]/30 transition-all duration-300">
              <span className="inline-block px-4 py-1.5 bg-[#00F5FF]/10 text-[#00F5FF] text-xs font-bold uppercase tracking-wider rounded-full mb-3">
                {exp.year}
              </span>
              <h4 className="text-xl font-bold text-[#F1F1F1] mb-1">{exp.title}</h4>
              <p className="text-[#00BFFF] text-sm mb-3 font-semibold">{exp.company}</p>
              <p className="text-[#A3A3A3] text-sm leading-relaxed">{exp.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
