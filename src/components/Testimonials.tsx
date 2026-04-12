'use client';

import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Senior Developer at TechCorp',
    content: "Muhammad's ability to translate complex AI requirements into elegant, working solutions is impressive. His work on our AI automation pipeline saved us hundreds of hours.",
    avatar: 'SC',
  },
  {
    name: 'Alex Rodriguez',
    role: 'Project Manager, StartupXYZ',
    content: "Working with Muhammad was a game-changer. He delivered a full-stack application with integrated AI features ahead of schedule and exceeded our expectations.",
    avatar: 'AR',
  },
  {
    name: 'Dr. James Wilson',
    role: 'AI Research Lead, DataMind',
    content: "His deep understanding of both frontend development and AI systems makes him a rare talent. The chatbots he built for us had a 95% user satisfaction rate.",
    avatar: 'JW',
  },
];

export default function Testimonials() {
  return (
    <section className="px-6 py-20 bg-gradient-to-b from-teal-950 via-black to-teal-950">
      <motion.h3
        className="text-3xl md:text-5xl font-bold mb-12 text-center text-teal-400 drop-shadow-md"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        What People Say
      </motion.h3>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 md:gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            className="bg-gradient-to-br from-teal-900/50 to-black/50 backdrop-blur p-6 rounded-xl border border-teal-700/50 hover:border-orange-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20"
          >
            {/* Quote Icon */}
            <svg className="w-8 h-8 text-orange-400/30 mb-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>

            <p className="text-teal-200 text-sm md:text-base leading-relaxed mb-6 italic">
              &ldquo;{testimonial.content}&rdquo;
            </p>

            <div className="flex items-center gap-3 pt-4 border-t border-teal-800/50">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-teal-400 to-orange-500 flex items-center justify-center font-bold text-white text-sm">
                {testimonial.avatar}
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{testimonial.name}</p>
                <p className="text-teal-400 text-xs">{testimonial.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
