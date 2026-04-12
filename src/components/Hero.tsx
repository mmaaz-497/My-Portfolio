'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import TypewriterEffect from './TypewriterEffect';
import ParticlesBackground from './ParticlesBackground';

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[80vh] text-center px-4 py-20 bg-gradient-to-b from-teal-900 via-teal-800 to-black overflow-hidden">
      {/* Particles Background */}
      <ParticlesBackground />
      {/* Profile Photo Placeholder */}
      <motion.div
        className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-tr from-teal-400 to-orange-500 p-1 mb-8 shadow-2xl"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center text-5xl md:text-6xl font-bold text-teal-400 overflow-hidden">
          <img src="/profile.jpg" alt="Muhammad Maaz" className="w-full h-full object-cover rounded-full" />
        </div>
      </motion.div>

      <motion.h2
        className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-teal-400 mb-6 drop-shadow-xl"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Hi, I&apos;m <TypewriterEffect 
          texts={['an Agentic AI Developer', 'a Full-Stack Engineer', 'a Python Expert', 'a Next.js Specialist']}
          typingSpeed={80}
          deletingSpeed={50}
          delayBetween={2000}
        />
      </motion.h2>

      <motion.p
        className="text-base sm:text-lg md:text-xl max-w-5xl text-teal-200 px-2 mb-8 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        I am an <b>Agentic AI Developer</b> and <b>Full-Stack Engineer</b> specializing in building intelligent, scalable, and high-performance digital solutions. With expertise in <b>Next.js, Node.js, Python, Streamlit, and the OpenAI Agents SDK</b>, I design systems that combine strong engineering with advanced <b>AI automation.</b>
      </motion.p>

      <motion.div
        className="flex flex-col sm:flex-row gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <Link
          href="#projects"
          className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-orange-500/50 hover:scale-105 transition-all duration-300"
        >
          View My Work
        </Link>
        <Link
          href="#contact"
          className="px-8 py-3 bg-transparent border-2 border-teal-400 text-teal-400 font-semibold rounded-lg hover:bg-teal-400 hover:text-black transition-all duration-300"
        >
          Get In Touch
        </Link>
        <a
          href="/resume.pdf"
          download
          className="px-8 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-teal-500/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download CV
        </a>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        aria-label="Scroll down"
      >
        <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
}
