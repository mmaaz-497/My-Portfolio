'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section className="px-6 py-16 bg-gradient-to-r from-teal-900 via-teal-800 to-teal-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(249, 115, 22, 0.3) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(45, 212, 191, 0.3) 0%, transparent 50%)',
        }} />
      </div>

      <motion.div
        className="max-w-3xl mx-auto text-center relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Stay Updated 🚀
        </h3>
        <p className="text-teal-100 mb-8 text-base md:text-lg">
          Get notified about new projects, articles, and AI insights. No spam, unsubscribe anytime.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="flex-1 px-5 py-3 bg-black/50 backdrop-blur border border-teal-600 rounded-lg text-white placeholder-teal-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
          />
          <button
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-orange-500/50 hover:scale-105 transition-all duration-300 whitespace-nowrap"
          >
            {status === 'success' ? '✓ Subscribed!' : 'Subscribe'}
          </button>
        </form>

        {status === 'success' && (
          <motion.p
            className="mt-4 text-green-400 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Thanks for subscribing! I&apos;ll keep you updated.
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}
