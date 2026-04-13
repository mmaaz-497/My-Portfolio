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
  { href: '#experience', label: 'Experience', section: 'experience' },
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];
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
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0A0A0A]/90 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,245,255,0.08)] border-b border-[#00F5FF]/10'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="flex flex-wrap md:flex-nowrap justify-between items-center px-6 lg:px-12 py-4 max-w-[1400px] mx-auto">
        {/* Logo */}
        <Link
          href="#"
          onClick={() => handleNavClick('hero')}
          className="group flex items-center gap-1 text-2xl md:text-3xl font-black tracking-tight"
        >
          <span className="text-[#F1F1F1] group-hover:text-[#00F5FF] transition-colors duration-300">
            Maaz
          </span>
          <span className="text-[#00F5FF] text-3xl md:text-4xl animate-pulse">.</span>
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
                className={`relative px-4 py-2 text-sm font-semibold tracking-wide uppercase transition-all duration-300 group ${
                  isActive
                    ? 'text-[#00F5FF]'
                    : 'text-[#A3A3A3] hover:text-[#F1F1F1]'
                }`}
              >
                <span className="relative z-10">{link.label}</span>
                <motion.span
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-[#00F5FF] rounded-full transition-all duration-300 ${
                    isActive ? 'w-full shadow-[0_0_10px_#00F5FF]' : 'w-0 group-hover:w-full'
                  }`}
                  layoutId="activeNavIndicator"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              </Link>
            );
          })}

          {/* Social Icons */}
          <div className="flex items-center gap-2 ml-4 pl-4 border-l border-[#00F5FF]/20">
            <Link
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[#A3A3A3] hover:text-[#00F5FF] hover:bg-[#00F5FF]/5 rounded-lg transition-all duration-300"
              aria-label="GitHub"
            >
              <GithubIcon className="w-5 h-5" />
            </Link>
            <Link
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[#A3A3A3] hover:text-[#00F5FF] hover:bg-[#00F5FF]/5 rounded-lg transition-all duration-300"
              aria-label="LinkedIn"
            >
              <LinkedInIcon className="w-5 h-5" />
            </Link>
          </div>

          {/* Hire Me Button */}
          <Link
            href="#contact"
            onClick={() => handleNavClick('contact')}
            className="ml-4 px-6 py-2 border border-[#00F5FF] text-[#00F5FF] font-semibold text-sm uppercase tracking-wide rounded-lg hover:bg-[#00F5FF]/10 hover:shadow-[0_0_20px_rgba(0,245,255,0.3)] transition-all duration-300"
          >
            Hire Me
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-[#00F5FF] focus:outline-none p-2"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center relative">
              <span
                className={`block w-6 h-0.5 bg-[#00F5FF] transition-all duration-300 absolute ${
                  isOpen ? 'rotate-45' : '-translate-y-2'
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-[#00F5FF] transition-all duration-300 absolute ${
                  isOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-[#00F5FF] transition-all duration-300 absolute ${
                  isOpen ? '-rotate-45' : 'translate-y-2'
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-screen w-72 bg-[#0A0A0A]/95 backdrop-blur-2xl border-l border-[#00F5FF]/10 shadow-2xl z-50 md:hidden"
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-end p-4">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-[#00F5FF] p-2 rounded-lg hover:bg-[#00F5FF]/10 transition-all"
                    aria-label="Close menu"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

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
                              ? 'bg-[#00F5FF]/10 text-[#00F5FF] border-l-2 border-[#00F5FF]'
                              : 'text-[#A3A3A3] hover:bg-[#00F5FF]/5 hover:text-[#F1F1F1]'
                          }`}
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                <div className="px-6 py-4 border-t border-[#00F5FF]/10">
                  <Link
                    href="#contact"
                    onClick={() => { setIsOpen(false); handleNavClick('contact'); }}
                    className="block w-full text-center px-6 py-3 border border-[#00F5FF] text-[#00F5FF] font-semibold rounded-lg hover:bg-[#00F5FF]/10 transition-all duration-300"
                  >
                    Hire Me
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
