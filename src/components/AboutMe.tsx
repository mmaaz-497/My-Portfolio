'use client';

import { motion } from 'framer-motion';
import AnimatedCounters from './AnimatedCounters';

export default function AboutMe() {
  return (
    <section id="about" className="relative px-6 lg:px-12 py-24 bg-[#0A0A0A]">
      {/* Section Title */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-[#00F5FF] text-sm font-semibold uppercase tracking-[0.3em]">Get to Know Me</span>
        <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#F1F1F1] mt-3">
          About <span className="text-[#00F5FF]">Me</span>
        </h3>
        <div className="w-20 h-1 bg-gradient-to-r from-[#00F5FF] to-[#00BFFF] mx-auto mt-6 rounded-full" />
      </motion.div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          className="grid md:grid-cols-2 gap-12 mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {/* Bio */}
          <div className="space-y-6 text-[#A3A3A3] text-base md:text-lg leading-relaxed">
            <p>
              I&apos;m a passionate <span className="text-[#00F5FF] font-semibold">Agentic AI Developer</span> and{' '}
              <span className="text-[#00F5FF] font-semibold">Full-Stack Engineer</span> dedicated to building intelligent,
              scalable digital solutions that make a real impact.
            </p>
            <p>
              With expertise spanning <span className="text-[#00F5FF] font-semibold">Next.js, Python, OpenAI Agents SDK</span>,
              and modern web technologies, I specialize in creating systems that combine strong engineering practices with
              advanced AI automation.
            </p>
            <p>
              My journey in tech is driven by curiosity and a constant desire to push boundaries. I believe in writing clean,
              maintainable code and building user experiences that are both beautiful and functional.
            </p>
          </div>

          {/* What I Do */}
          <div className="glass-card rounded-2xl p-8">
            <h4 className="text-xl font-bold text-[#F1F1F1] mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg bg-[#00F5FF]/10 flex items-center justify-center text-[#00F5FF]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </span>
              What I Do
            </h4>
            <ul className="space-y-4">
              {[
                'AI Agent Development & Automation',
                'Full-Stack Web Application Development',
                'UI/UX Design & Implementation',
                'API Integration & System Architecture',
                'Data Pipeline & Workflow Management',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[#A3A3A3]">
                  <span className="text-[#00F5FF] mt-1 flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Stats Counters */}
        <AnimatedCounters />
      </div>
    </section>
  );
}
