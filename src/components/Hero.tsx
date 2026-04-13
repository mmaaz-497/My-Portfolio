'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import TypewriterEffect from './TypewriterEffect';
import ParticlesBackground from './ParticlesBackground';

export default function Hero() {
  return (
    <section id="hero" className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 py-20 bg-[#0A0A0A] overflow-hidden">
      {/* Particles Background */}
      <ParticlesBackground />

      {/* Gradient Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00F5FF]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Profile Photo */}
      <motion.div
        className="relative mb-8 z-10"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="w-36 h-36 md:w-44 md:h-44 rounded-full p-[3px] bg-gradient-to-tr from-[#00F5FF] via-[#00BFFF] to-[#00F5FF] shadow-[0_0_40px_rgba(0,245,255,0.3)]">
          <div className="w-full h-full rounded-full bg-[#1A1A1A] flex items-center justify-center overflow-hidden">
            <img
              src="/profile.jpg"
              alt="Muhammad Maaz"
              className="w-full h-full object-cover rounded-full"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = '<span class="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#00F5FF] to-[#00BFFF] bg-clip-text text-transparent">MM</span>';
                }
              }}
            />
          </div>
        </div>
        {/* Status Badge */}
        <motion.div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#0A0A0A] border border-[#00F5FF]/30 rounded-full text-xs font-semibold text-[#00F5FF] whitespace-nowrap"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <span className="inline-block w-2 h-2 bg-[#00F5FF] rounded-full mr-2 animate-pulse" />
          Available for Work
        </motion.div>
      </motion.div>

      {/* Main Heading */}
      <motion.h1
        className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-[#F1F1F1] mb-4 leading-tight z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Hi, I&apos;m{' '}
        <span className="bg-gradient-to-r from-[#00F5FF] via-[#00BFFF] to-[#00F5FF] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
          Muhammad Maaz
        </span>
      </motion.h1>

      {/* Typewriter Subtitle */}
      <motion.div
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#A3A3A3] mb-6 z-10 h-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <TypewriterEffect
          texts={['Agentic AI Developer', 'Full-Stack Engineer', 'Python Expert', 'Next.js Specialist']}
          typingSpeed={70}
          deletingSpeed={40}
          delayBetween={2000}
        />
      </motion.div>

      {/* Description */}
      <motion.p
        className="text-base sm:text-lg md:text-xl max-w-3xl text-[#A3A3A3] px-2 mb-10 leading-relaxed z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Building intelligent, scalable solutions with{' '}
        <span className="text-[#00F5FF] font-semibold">Next.js</span>,{' '}
        <span className="text-[#00F5FF] font-semibold">Python</span>, and{' '}
        <span className="text-[#00F5FF] font-semibold">AI Agents</span>{' '}
        that drive innovation.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        <Link
          href="#projects"
          className="group relative px-8 py-4 bg-[#00F5FF] text-[#0A0A0A] font-bold text-sm uppercase tracking-wider rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,245,255,0.5)] hover:scale-105"
        >
          <span className="relative z-10">View Projects</span>
          <div className="absolute inset-0 bg-gradient-to-r from-[#00BFFF] to-[#00F5FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>

        <a
          href="/resume.pdf"
          download
          className="group px-8 py-4 border-2 border-[#00F5FF]/50 text-[#00F5FF] font-bold text-sm uppercase tracking-wider rounded-lg hover:bg-[#00F5FF]/10 hover:border-[#00F5FF] hover:shadow-[0_0_20px_rgba(0,245,255,0.2)] transition-all duration-300 flex items-center justify-center gap-3"
        >
          <svg className="w-5 h-5 transition-transform group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download CV
        </a>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        aria-label="Scroll down"
      >
        <div className="w-6 h-10 border-2 border-[#00F5FF]/30 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-[#00F5FF] rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
