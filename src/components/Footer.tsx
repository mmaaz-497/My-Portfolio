'use client';

import Link from 'next/link';
import { siteConfig } from '@/config/site';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  {
    label: 'GitHub',
    href: siteConfig.social.github,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: siteConfig.social.linkedin,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'X / Twitter',
    href: siteConfig.social.x,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: `mailto:${siteConfig.email}`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="relative w-full overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0A0A0A 0%, #111111 100%)',
      }}
    >
      {/* Subtle top border glow */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(0,245,255,0.3), transparent)',
        }}
      />

      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,245,255,1px) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,1px) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Column 1: Logo & Tagline */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="inline-block">
              <span
                className="text-3xl font-bold tracking-tight"
                style={{
                  color: '#F1F1F1',
                  textShadow: '0 0 20px rgba(0,245,255,0.15)',
                }}
              >
                M<span style={{ color: '#00F5FF' }}>aaz</span>
              </span>
            </Link>
            <p
              className="text-sm leading-relaxed"
              style={{ color: '#A3A3A3' }}
            >
              Agentic AI & Full-Stack Developer | Building Intelligent Solutions
            </p>

            {/* Small decorative line */}
            <div
              className="w-12 h-[2px] rounded-full"
              style={{
                background: 'linear-gradient(90deg, #00F5FF, transparent)',
              }}
            />
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-4">
            <h4
              className="text-sm font-semibold uppercase tracking-wider"
              style={{ color: '#F1F1F1' }}
            >
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm relative inline-block group"
                    style={{ color: '#A3A3A3' }}
                  >
                    {link.label}
                    <span
                      className="absolute -bottom-1 left-0 h-[2px] w-0 transition-all duration-300 group-hover:w-full"
                      style={{
                        background: '#00F5FF',
                        boxShadow: '0 0 8px rgba(0,245,255,0.5)',
                      }}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Social Icons */}
          <div className="flex flex-col gap-4">
            <h4
              className="text-sm font-semibold uppercase tracking-wider"
              style={{ color: '#F1F1F1' }}
            >
              Connect
            </h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group"
                  style={{
                    background: 'rgba(26,26,26,0.6)',
                    border: '1px solid rgba(163,163,163,0.15)',
                    color: '#A3A3A3',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(0,245,255,0.4)';
                    (e.currentTarget as HTMLAnchorElement).style.color = '#00F5FF';
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 25px rgba(0,245,255,0.2)';
                    (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(163,163,163,0.15)';
                    (e.currentTarget as HTMLAnchorElement).style.color = '#A3A3A3';
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
                    (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
                  }}
                  aria-label={social.label}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 4: Contact Info */}
          <div className="flex flex-col gap-5">
            <h4
              className="text-sm font-semibold uppercase tracking-wider"
              style={{ color: '#F1F1F1' }}
            >
              Get in Touch
            </h4>

            {/* Contact Info */}
            <div className="flex flex-col gap-2">
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-sm flex items-center gap-2 transition-colors duration-200 hover:text-[#00F5FF]"
                style={{ color: '#A3A3A3' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                {siteConfig.email}
              </a>
              <div
                className="text-sm flex items-center gap-2"
                style={{ color: '#A3A3A3' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Karachi, Pakistan
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="relative z-10 border-t py-5"
        style={{
          borderColor: 'rgba(163,163,163,0.1)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-xs text-center sm:text-left"
            style={{ color: '#A3A3A3' }}
          >
            &copy; {currentYear} {siteConfig.name}. All Rights Reserved.
          </p>
          <p
            className="text-xs"
            style={{ color: '#A3A3A3' }}
          >
            Made with <span style={{ color: '#00F5FF' }}>passion</span> in Karachi
          </p>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 group"
            style={{
              background: 'rgba(26,26,26,0.6)',
              border: '1px solid rgba(163,163,163,0.15)',
              color: '#A3A3A3',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(0,245,255,0.4)';
              (e.currentTarget as HTMLButtonElement).style.color = '#00F5FF';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 15px rgba(0,245,255,0.2)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(163,163,163,0.15)';
              (e.currentTarget as HTMLButtonElement).style.color = '#A3A3A3';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
            }}
            aria-label="Back to top"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m18 15-6-6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
