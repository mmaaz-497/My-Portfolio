'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const articles = [
  {
    title: 'Building AI Agents with OpenAI Agents SDK',
    excerpt: 'A comprehensive guide to creating autonomous AI agents that can reason, plan, and execute complex tasks.',
    date: 'Coming Soon',
    readTime: '10 min read',
    tags: ['AI', 'OpenAI', 'Agents'],
  },
  {
    title: 'Next.js 15: What\'s New and Why It Matters',
    excerpt: 'Exploring the latest features in Next.js 15 and how they improve developer experience and performance.',
    date: 'Coming Soon',
    readTime: '8 min read',
    tags: ['Next.js', 'React', 'Web Dev'],
  },
  {
    title: 'From Zero to Production: Deploying with Docker & AWS',
    excerpt: 'Step-by-step guide to containerizing your apps and deploying them to production using modern DevOps practices.',
    date: 'Coming Soon',
    readTime: '12 min read',
    tags: ['Docker', 'AWS', 'DevOps'],
  },
];

export default function Blog() {
  return (
    <section id="blog" className="px-6 py-20 bg-gradient-to-b from-black via-teal-900 to-teal-950">
      <motion.h3
        className="text-3xl md:text-5xl font-bold mb-4 text-center text-teal-400 drop-shadow-md"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Latest Articles
      </motion.h3>

      <motion.p
        className="text-center text-teal-200 mb-12 text-base md:text-lg max-w-3xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        Insights, tutorials, and thoughts on AI, web development, and modern tech
      </motion.p>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 md:gap-8 mb-8">
        {articles.map((article, index) => (
          <motion.div
            key={article.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
            className="bg-gradient-to-br from-teal-900/50 to-black/50 backdrop-blur rounded-xl border border-teal-700/50 hover:border-orange-400/50 transition-all duration-300 overflow-hidden group"
          >
            {/* Placeholder for featured image */}
            <div className="h-40 bg-gradient-to-br from-teal-800/50 to-teal-950/50 flex items-center justify-center relative">
              <span className="text-5xl opacity-30">📝</span>
              <div className="absolute top-3 right-3 px-2 py-1 bg-black/50 backdrop-blur rounded text-xs text-teal-300">
                {article.date}
              </div>
            </div>

            <div className="p-5">
              <div className="flex flex-wrap gap-2 mb-3">
                {article.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 bg-teal-800/50 text-teal-300 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <h4 className="text-lg font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                {article.title}
              </h4>
              <p className="text-teal-200 text-sm mb-3 leading-relaxed">{article.excerpt}</p>
              <span className="text-xs text-teal-400">{article.readTime}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p
        className="text-center text-teal-400 text-sm italic"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        Articles coming soon! Stay tuned for insightful content.
      </motion.p>
    </section>
  );
}
