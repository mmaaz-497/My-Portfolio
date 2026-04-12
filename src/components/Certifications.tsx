'use client';

import { motion } from 'framer-motion';

const certifications = [
  {
    title: 'OpenAI & AI Engineering',
    issuer: 'Self-Directed Learning',
    icon: '🤖',
    color: 'from-teal-400 to-teal-600',
  },
  {
    title: 'Next.js Full-Stack Development',
    issuer: 'Project-Based Learning',
    icon: '⚛️',
    color: 'from-orange-400 to-orange-600',
  },
  {
    title: 'Python for Data Science',
    issuer: 'Professional Development',
    icon: '🐍',
    color: 'from-blue-400 to-blue-600',
  },
  {
    title: 'Cloud & DevOps (AWS/Docker)',
    issuer: 'Infrastructure Learning',
    icon: '☁️',
    color: 'from-purple-400 to-purple-600',
  },
  {
    title: 'UI/UX Design with Figma',
    issuer: 'Design Fundamentals',
    icon: '🎨',
    color: 'from-pink-400 to-pink-600',
  },
  {
    title: 'Agentic AI & Automation',
    issuer: 'Advanced AI Workflows',
    icon: '🔄',
    color: 'from-green-400 to-green-600',
  },
];

export default function Certifications() {
  return (
    <section id="certifications" className="px-6 py-20 bg-gradient-to-b from-teal-950 via-black to-teal-950">
      <motion.h3
        className="text-3xl md:text-5xl font-bold mb-4 text-center text-teal-400 drop-shadow-md"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Certifications & Learning
      </motion.h3>

      <motion.p
        className="text-center text-teal-200 mb-12 text-base md:text-lg max-w-3xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        Continuous learning through courses, projects, and hands-on experience
      </motion.p>

      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.title}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-gradient-to-br from-teal-900/50 to-black/50 backdrop-blur p-6 rounded-xl border border-teal-700/50 hover:border-orange-400/50 transition-all duration-300"
          >
            <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${cert.color} flex items-center justify-center text-2xl mb-4 shadow-lg`}>
              {cert.icon}
            </div>
            <h4 className="text-lg font-bold text-white mb-2">{cert.title}</h4>
            <p className="text-teal-400 text-sm">{cert.issuer}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
