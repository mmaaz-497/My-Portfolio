'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, FormEvent } from 'react';
import { siteConfig } from '@/config/site';

const GithubIcon = () => (
  <svg className="w-5 h-5 inline-block mr-2" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-5 h-5 inline-block mr-2" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // Replace with your Formspree endpoint
    // Sign up at https://formspree.io and get your form ID
    // TODO: Update formspreeUrl in src/config/site.ts with your real form ID
    const FORMSPREE_URL = siteConfig.formspreeUrl;

    // Check if placeholder is still being used
    if (FORMSPREE_URL.includes('YOUR_FORM_ID')) {
      setStatus('error');
      console.warn('⚠️ Formspree URL not configured! Please update formspreeUrl in src/config/site.ts with your real form ID from https://formspree.io');
      return;
    }

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="px-6 py-20 bg-gradient-to-b from-teal-950 via-teal-900 to-black">
      <motion.h2
        className="text-3xl md:text-5xl font-bold mb-6 text-center text-teal-400 drop-shadow-md"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Contact Me
      </motion.h2>
      
      <motion.p
        className="text-center text-teal-200 mb-10 text-base sm:text-lg"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        Open to professional collaborations and project opportunities. Let&apos;s connect.
      </motion.p>

      <div className="max-w-2xl mx-auto">
        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-black/50 backdrop-blur p-8 rounded-xl shadow-lg border border-teal-700 mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="mb-6">
            <label htmlFor="name" className="block text-teal-300 font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-teal-950 border border-teal-700 rounded-lg text-teal-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              placeholder="Your Name"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-teal-300 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-teal-950 border border-teal-700 rounded-lg text-teal-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              placeholder="your@email.com"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-teal-300 font-semibold mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-3 bg-teal-950 border border-teal-700 rounded-lg text-teal-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
              placeholder="Your message..."
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-orange-500/50 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {status === 'sending' ? 'Sending...' : status === 'success' ? 'Message Sent! ✓' : status === 'error' ? 'Failed. Try Again' : 'Send Message'}
          </button>

          {status === 'success' && (
            <p className="mt-4 text-center text-green-400">Thank you! I&apos;ll get back to you soon.</p>
          )}
          {status === 'error' && (
            <p className="mt-4 text-center text-red-400">Something went wrong. Please try again.</p>
          )}
        </motion.form>

        {/* Contact Links */}
        <motion.div
          className="flex flex-col items-center gap-4 text-base sm:text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-teal-300 font-semibold mb-2">Or reach me directly:</p>
          <Link href={`mailto:${siteConfig.email}`} className="text-teal-400 hover:text-orange-400 hover:underline transition-colors">
            📧 {siteConfig.email}
          </Link>
          <Link href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-orange-400 hover:underline transition-colors flex items-center">
            <GithubIcon /> GitHub Profile
          </Link>
          <Link href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-orange-400 hover:underline transition-colors flex items-center">
            <LinkedInIcon /> LinkedIn Profile
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
