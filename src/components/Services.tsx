'use client';

import { motion } from 'framer-motion';

const services = [
  {
    icon: '🤖',
    title: 'AI Agent Development',
    description: 'Custom AI agents and automation workflows using OpenAI Agents SDK, LangChain, and modern AI frameworks.',
    features: ['Chatbots', 'AI Workflows', 'Process Automation'],
  },
  {
    icon: '💻',
    title: 'Full-Stack Web Development',
    description: 'End-to-end web application development with Next.js, React, Node.js, and modern cloud technologies.',
    features: ['Responsive Design', 'API Development', 'Database Design'],
  },
  {
    icon: '☁️',
    title: 'Cloud & DevOps',
    description: 'Deployment, containerization, and CI/CD pipelines using Docker, AWS, Vercel, and cloud platforms.',
    features: ['Docker', 'AWS', 'CI/CD'],
  },
  {
    icon: '🎨',
    title: 'UI/UX Design',
    description: 'Beautiful, intuitive interfaces with modern design principles, responsive layouts, and smooth animations.',
    features: ['Figma Design', 'Prototyping', 'User Testing'],
  },
  {
    icon: '📊',
    title: 'Data Solutions',
    description: 'Data pipelines, dashboards, and analytics solutions using Python, Streamlit, and modern data tools.',
    features: ['Data Visualization', 'Dashboards', 'Analytics'],
  },
  {
    icon: '🔧',
    title: 'Consulting & Training',
    description: 'Technical consulting, code reviews, and training sessions on AI integration and modern web development.',
    features: ['Code Review', 'Mentoring', 'Workshops'],
  },
];

export default function Services() {
  return (
    <section id="services" className="px-6 py-20 bg-gradient-to-b from-black via-teal-950 to-teal-900">
      <motion.h3
        className="text-3xl md:text-5xl font-bold mb-4 text-center text-teal-400 drop-shadow-md"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Services I Offer
      </motion.h3>

      <motion.p
        className="text-center text-teal-200 mb-12 text-base md:text-lg max-w-3xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        Ready to bring your ideas to life. Let&apos;s build something amazing together.
      </motion.p>

      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="bg-gradient-to-br from-teal-900/50 to-black/50 backdrop-blur p-6 rounded-xl border border-teal-700/50 hover:border-orange-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20 group"
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
              {service.icon}
            </div>
            <h4 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">
              {service.title}
            </h4>
            <p className="text-teal-200 text-sm mb-4 leading-relaxed">{service.description}</p>
            <ul className="space-y-2">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-teal-300">
                  <span className="text-orange-400 text-xs">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
