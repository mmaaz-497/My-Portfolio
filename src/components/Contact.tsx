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
    whatsapp: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    const FORMSPREE_URL = siteConfig.formspreeUrl;

    if (FORMSPREE_URL.includes('YOUR_FORM_ID')) {
      setStatus('error');
      console.warn('⚠️ Formspree URL not configured! Please update formspreeUrl in src/config/site.ts');
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
        setFormData({ name: '', email: '', whatsapp: '', message: '' });
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
    <section id="contact" className="relative px-6 lg:px-12 py-24 bg-[#0A0A0A]">
      {/* Section Title */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-[#00F5FF] text-sm font-semibold uppercase tracking-[0.3em]">Get In Touch</span>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#F1F1F1] mt-3">
          Contact <span className="text-[#00F5FF]">Me</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-[#00F5FF] to-[#00BFFF] mx-auto mt-6 rounded-full" />
      </motion.div>

      <motion.p
        className="text-center text-[#A3A3A3] mb-12 text-base sm:text-lg max-w-xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        Open to professional collaborations and project opportunities. Let&apos;s connect.
      </motion.p>

      <div className="max-w-3xl mx-auto">
        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="glass-card rounded-2xl p-8 md:p-10 shadow-[0_0_40px_rgba(0,245,255,0.05)] mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-[#F1F1F1] font-semibold mb-2 text-sm uppercase tracking-wider">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3.5 bg-[#0A0A0A] border border-[#00F5FF]/10 rounded-lg text-[#F1F1F1] placeholder-[#A3A3A3] focus:outline-none focus:border-[#00F5FF]/50 focus:shadow-[0_0_15px_rgba(0,245,255,0.1)] transition-all"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-[#F1F1F1] font-semibold mb-2 text-sm uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3.5 bg-[#0A0A0A] border border-[#00F5FF]/10 rounded-lg text-[#F1F1F1] placeholder-[#A3A3A3] focus:outline-none focus:border-[#00F5FF]/50 focus:shadow-[0_0_15px_rgba(0,245,255,0.1)] transition-all"
                placeholder="john@example.com"
              />
            </div>
          </div>

          {/* WhatsApp Number Field */}
          <div className="mb-6">
            <label htmlFor="whatsapp" className="block text-[#F1F1F1] font-semibold mb-2 text-sm uppercase tracking-wider">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Number
              </span>
            </label>
            <input
              type="tel"
              id="whatsapp"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              className="w-full px-4 py-3.5 bg-[#0A0A0A] border border-[#00F5FF]/10 rounded-lg text-[#F1F1F1] placeholder-[#A3A3A3] focus:outline-none focus:border-[#25D366]/50 focus:shadow-[0_0_15px_rgba(37,211,102,0.1)] transition-all"
              placeholder="+92 300 1234567"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-[#F1F1F1] font-semibold mb-2 text-sm uppercase tracking-wider">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-3.5 bg-[#0A0A0A] border border-[#00F5FF]/10 rounded-lg text-[#F1F1F1] placeholder-[#A3A3A3] focus:outline-none focus:border-[#00F5FF]/50 focus:shadow-[0_0_15px_rgba(0,245,255,0.1)] transition-all resize-none"
              placeholder="Tell me about your project..."
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full px-8 py-4 bg-[#00F5FF] text-[#0A0A0A] font-bold text-sm uppercase tracking-wider rounded-lg hover:shadow-[0_0_30px_rgba(0,245,255,0.4)] hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {status === 'sending' ? 'Sending...' : status === 'success' ? 'Message Sent! ✓' : status === 'error' ? 'Failed. Try Again' : 'Send Message'}
          </button>

          {status === 'success' && (
            <p className="mt-4 text-center text-[#00F5FF] font-semibold">Thank you! I&apos;ll get back to you soon.</p>
          )}
          {status === 'error' && (
            <p className="mt-4 text-center text-red-400 font-semibold">Something went wrong. Please try again.</p>
          )}
        </motion.form>

        {/* Contact Links */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 text-base"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Link
            href={`mailto:${siteConfig.email}`}
            className="flex items-center gap-2 text-[#A3A3A3] hover:text-[#00F5FF] transition-colors group"
          >
            <span className="w-10 h-10 rounded-lg bg-[#1A1A1A] border border-[#00F5FF]/10 flex items-center justify-center group-hover:border-[#00F5FF]/30 transition-colors">
              📧
            </span>
            <span className="text-sm font-medium">{siteConfig.email}</span>
          </Link>
          <Link
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[#A3A3A3] hover:text-[#00F5FF] transition-colors group"
          >
            <span className="w-10 h-10 rounded-lg bg-[#1A1A1A] border border-[#00F5FF]/10 flex items-center justify-center group-hover:border-[#00F5FF]/30 transition-colors">
              <GithubIcon />
            </span>
            <span className="text-sm font-medium">GitHub</span>
          </Link>
          <Link
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[#A3A3A3] hover:text-[#00F5FF] transition-colors group"
          >
            <span className="w-10 h-10 rounded-lg bg-[#1A1A1A] border border-[#00F5FF]/10 flex items-center justify-center group-hover:border-[#00F5FF]/30 transition-colors">
              <LinkedInIcon />
            </span>
            <span className="text-sm font-medium">LinkedIn</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
