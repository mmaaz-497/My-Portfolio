'use client';

import { motion } from 'framer-motion';
import AnimatedCounters from './AnimatedCounters';

export default function AboutMe() {
  return (
    <section id="about" className="px-6 py-20 bg-gradient-to-b from-black via-teal-950 to-teal-900">
      <motion.h3
        className="text-3xl md:text-5xl font-bold mb-10 text-center text-teal-400 drop-shadow-md"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        About Me
      </motion.h3>

      <div className="max-w-4xl mx-auto">
        <motion.div
          className="grid md:grid-cols-2 gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="text-teal-200 text-base md:text-lg leading-relaxed space-y-4">
            <p>
              I&apos;m a passionate <span className="text-orange-400 font-semibold">Agentic AI Developer</span> and{' '}
              <span className="text-orange-400 font-semibold">Full-Stack Engineer</span> dedicated to building intelligent, 
              scalable digital solutions that make a real impact.
            </p>
            <p>
              With expertise spanning <span className="text-teal-400 font-semibold">Next.js, Python, OpenAI Agents SDK</span>, 
              and modern web technologies, I specialize in creating systems that combine strong engineering practices with 
              advanced AI automation.
            </p>
            <p>
              My journey in tech is driven by curiosity and a constant desire to push boundaries. I believe in writing clean, 
              maintainable code and building user experiences that are both beautiful and functional.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-bold text-teal-400 mb-4">What I Do</h4>
            <ul className="space-y-3 text-teal-200">
              <li className="flex items-start">
                <span className="text-orange-400 mr-3 text-xl">&#9654;</span>
                <span>AI Agent Development & Automation</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-400 mr-3 text-xl">&#9654;</span>
                <span>Full-Stack Web Application Development</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-400 mr-3 text-xl">&#9654;</span>
                <span>UI/UX Design & Implementation</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-400 mr-3 text-xl">&#9654;</span>
                <span>API Integration & System Architecture</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-400 mr-3 text-xl">&#9654;</span>
                <span>Data Pipeline & Workflow Management</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Stats Counters */}
        <AnimatedCounters />
      </div>
    </section>
  );
}
