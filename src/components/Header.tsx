'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/config/site';

const navLinks = [
  { href: '#', label: 'Home', section: 'hero' },
  { href: '#about', label: 'About', section: 'about' },
  { href: '#skills', label: 'Skills', section: 'skills' },
  { href: '#projects', label: 'Projects', section: 'projects' },
  { href: '#contact', label: 'Contact', section: 'contact' },
];

const GithubIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedInIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);

  // Track scroll position for active section and header styling
  useEffect(() => {
    const handleScroll = () => {
      // Header background on scroll
      setScrolled(window.scrollY > 50);

      // Active section detection
      const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i] === 'hero' ? '' : sections[i];
        const element = document.getElementById(sectionId);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (section: string) => {
    setActiveSection(section);
    setIsOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/95 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-teal-600/50'
          : 'bg-gradient-to-b from-black/80 to-transparent backdrop-blur-md border-b border-transparent'
      }`}
    >
      <div className="flex flex-wrap md:flex-nowrap justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <Link
          href="#"
          onClick={() => handleNavClick('hero')}
          className="group flex items-center gap-2 text-xl sm:text-2xl font-extrabold tracking-wide drop-shadow-lg"
        >
          <span className="bg-gradient-to-r from-teal-400 via-teal-300 to-orange-400 bg-clip-text text-transparent group-hover:from-orange-400 group-hover:to-teal-400 transition-all duration-500">
            {siteConfig.name}
          </span>
          <span className="text-orange-400 text-2xl sm:text-3xl group-hover:scale-110 transition-transform duration-300">
            .
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-1" aria-label="Desktop navigation">
          {navLinks.map((link) => {
            const isActive = activeSection === link.section;
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => handleNavClick(link.section)}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 group ${
                  isActive
                    ? 'text-teal-400'
                    : 'text-teal-200/80 hover:text-teal-300'
                }`}
              >
                <span className="relative z-10">{link.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-teal-400/10 rounded-lg"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-teal-400 to-orange-400 rounded-full transition-all duration-300 ${
                    isActive ? 'w-3/4' : 'w-0 group-hover:w-3/4'
                  }`}
                />
              </Link>
            );
          })}

          {/* Social Icons */}
          <div className="flex items-center gap-2 ml-4 pl-4 border-l border-teal-700/50">
            <Link
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-teal-300 hover:text-orange-400 hover:bg-teal-400/10 rounded-lg transition-all duration-300"
              aria-label="GitHub"
            >
              <GithubIcon className="w-5 h-5" />
            </Link>
            <Link
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-teal-300 hover:text-orange-400 hover:bg-teal-400/10 rounded-lg transition-all duration-300"
              aria-label="LinkedIn"
            >
              <LinkedInIcon className="w-5 h-5" />
            </Link>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-teal-400 font-semibold focus:outline-none focus:ring-2 focus:ring-teal-400 rounded p-2 hover:bg-teal-400/10 transition-colors"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center relative">
              <span
                className={`block w-6 h-0.5 bg-teal-400 transition-all duration-300 absolute ${
                  isOpen ? 'rotate-45' : '-translate-y-2'
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-teal-400 transition-all duration-300 absolute ${
                  isOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-teal-400 transition-all duration-300 absolute ${
                  isOpen ? '-rotate-45' : 'translate-y-2'
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-screen w-72 bg-gradient-to-b from-black via-teal-950/95 to-black/95 backdrop-blur-xl border-l border-teal-700/50 shadow-2xl z-50 md:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Close Button */}
                <div className="flex justify-end p-4">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-teal-400 hover:text-orange-400 p-2 rounded-lg hover:bg-teal-400/10 transition-all"
                    aria-label="Close menu"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Nav Links */}
                <nav className="flex flex-col px-6 py-4 space-y-2 flex-1">
                  {navLinks.map((link, index) => {
                    const isActive = activeSection === link.section;
                    return (
                      <motion.div
                        key={link.label}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => handleNavClick(link.section)}
                          className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                            isActive
                              ? 'bg-gradient-to-r from-teal-400/20 to-orange-400/20 text-teal-400 border-l-2 border-teal-400'
                              : 'text-teal-200/80 hover:bg-teal-400/10 hover:text-teal-300'
                          }`}
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                {/* Social Links at Bottom */}
                <div className="px-6 py-4 border-t border-teal-700/50">
                  <div className="flex items-center gap-4">
                    <Link
                      href={siteConfig.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 text-teal-300 hover:text-orange-400 hover:bg-teal-400/10 rounded-lg transition-all duration-300"
                    >
                      <GithubIcon className="w-5 h-5" />
                      <span className="text-sm">GitHub</span>
                    </Link>
                    <Link
                      href={siteConfig.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 text-teal-300 hover:text-orange-400 hover:bg-teal-400/10 rounded-lg transition-all duration-300"
                    >
                      <LinkedInIcon className="w-5 h-5" />
                      <span className="text-sm">LinkedIn</span>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
