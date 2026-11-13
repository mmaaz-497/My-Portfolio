'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { navLinks } from '@/config/navigation';
import { siteConfig } from '@/config/site';
import Logo from './ui/Logo';
import Portal from './ui/Portal';
import ThemeToggle from './ThemeToggle';
import { lockScroll, scrollToHash } from './ui/SmoothScroll';
import { useFocusTrap } from './ui/useFocusTrap';
import { CloseIcon, GithubIcon, LinkedInIcon, MenuIcon, XIcon } from './ui/Icons';

const socials = [
  { label: 'GitHub', href: siteConfig.social.github, Icon: GithubIcon },
  { label: 'LinkedIn', href: siteConfig.social.linkedin, Icon: LinkedInIcon },
  { label: 'X', href: siteConfig.social.x, Icon: XIcon },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const drawer = useRef<HTMLDivElement>(null);
  // Section a drawer link asked for; scrolled to once the drawer has released the page.
  const pendingHash = useRef<string | null>(null);

  useEffect(() => {
    const sections = navLinks.map((link) => link.section);
    // Section elements are looked up once (and again on resize) rather than on
    // every scroll tick, and the handler is throttled to one run per frame, so
    // scroll-spy never forces repeated layout work while scrolling.
    let elements: (HTMLElement | null)[] = sections.map((id) => document.getElementById(id));
    const cacheElements = () => {
      elements = sections.map((id) => document.getElementById(id));
    };

    let ticking = false;
    const updateFromScroll = () => {
      ticking = false;
      setScrolled(window.scrollY > 40);
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
      for (let i = elements.length - 1; i >= 0; i--) {
        const element = elements[i];
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateFromScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', cacheElements, { passive: true });
    updateFromScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', cacheElements);
    };
  }, []);

  // While the drawer is open: freeze the page behind it and close on Escape.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    // The drawer only exists below the desktop breakpoint; never leave the
    // page locked if the window is widened past it.
    const desktop = window.matchMedia('(min-width: 1280px)');
    const onDesktop = () => {
      if (desktop.matches) setIsOpen(false);
    };
    lockScroll(true);
    window.addEventListener('keydown', onKey);
    desktop.addEventListener('change', onDesktop);
    return () => {
      lockScroll(false);
      window.removeEventListener('keydown', onKey);
      desktop.removeEventListener('change', onDesktop);
      if (pendingHash.current) {
        scrollToHash(pendingHash.current);
        pendingHash.current = null;
      }
    };
  }, [isOpen]);

  useFocusTrap(drawer, isOpen);

  // Drawer links close the drawer first; the scroll runs once the page is unlocked.
  const followFromDrawer = (event: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    event.preventDefault();
    pendingHash.current = hash;
    setIsOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-2.5 sm:px-4">
      {/* At the top the bar is invisible; once the page scrolls it lifts off
          the edge and becomes a floating glass bar. */}
      <div
        className={`mx-auto flex max-w-[1400px] items-center justify-between gap-4 rounded-2xl transition-[padding,margin] duration-500 ${
          scrolled
            ? 'glass mt-2.5 px-3 py-2 sm:px-4 lg:px-5'
            : 'mt-0 border border-transparent px-2.5 py-3.5 sm:px-1 lg:px-6'
        }`}
      >
        <a href="#hero" aria-label="Muhammad Maaz — back to top" className="flex items-center gap-3">
          <Logo size={44} />
          <span className="hidden text-sm font-semibold tracking-wide text-foreground sm:block">Muhammad Maaz</span>
        </a>

        {/* A pill of links; the highlight slides to whichever section is on screen. */}
        <nav
          className="well hidden items-center rounded-full p-1 xl:flex"
          aria-label="Primary"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.section;
            return (
              <a
                key={link.label}
                href={link.href}
                aria-current={isActive ? 'location' : undefined}
                className={`relative rounded-full px-3.5 py-2 text-[13px] font-semibold tracking-wide transition-colors ${
                  isActive ? 'text-accent' : 'text-muted hover:text-foreground'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="key absolute inset-0 rounded-full"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <ThemeToggle />
          <a href="#contact" className="btn btn-primary hidden !px-5 !py-2.5 sm:inline-flex">
            Hire Me
          </a>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="control-3d h-10 w-10 rounded-xl !text-accent xl:hidden"
            aria-label="Open menu"
            aria-haspopup="dialog"
            aria-expanded={isOpen}
          >
            <MenuIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Portalled to <body>: the header's backdrop-filter would otherwise trap
          these fixed layers inside the header bar. */}
      <Portal>
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                key="menu-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm xl:hidden"
                onClick={() => setIsOpen(false)}
              />
              <motion.div
                key="menu-drawer"
                ref={drawer}
                role="dialog"
                aria-modal="true"
                aria-label="Menu"
                tabIndex={-1}
                // Swings in on its outer edge, like a door opening toward the page.
                initial={{ x: '100%', rotateY: -28 }}
                animate={{ x: 0, rotateY: 0 }}
                exit={{ x: '100%', rotateY: -28 }}
                transition={{ type: 'spring', damping: 30, stiffness: 260 }}
                style={{ transformPerspective: 1200, transformOrigin: '100% 50%' }}
                className="fixed right-0 top-0 z-[90] flex h-dvh w-[min(20rem,88vw)] flex-col border-l border-line bg-background pb-[env(safe-area-inset-bottom)] shadow-[-30px_0_80px_-20px_var(--shadow)] outline-none xl:hidden"
              >
                <div className="flex items-center justify-between border-b border-line p-4">
                  <Logo size={40} />
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="control-3d h-10 w-10 rounded-xl !text-accent"
                    aria-label="Close menu"
                  >
                    <CloseIcon className="h-5 w-5" />
                  </button>
                </div>

                <nav className="flex flex-1 flex-col gap-1 overflow-y-auto overscroll-contain p-4" aria-label="Mobile" data-lenis-prevent>
                  {navLinks.map((link, i) => {
                    const isActive = activeSection === link.section;
                    return (
                      <motion.a
                        key={link.label}
                        href={link.href}
                        onClick={(event) => followFromDrawer(event, link.href)}
                        aria-current={isActive ? 'location' : undefined}
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35, delay: 0.08 + i * 0.04, ease: [0.2, 0.8, 0.2, 1] }}
                        className={`flex items-center gap-4 rounded-xl px-4 py-3 text-base font-semibold transition-colors ${
                          isActive ? 'key text-accent' : 'border border-transparent text-muted hover:bg-accent/5 hover:text-foreground'
                        }`}
                      >
                        <span className="font-mono text-[11px] text-accent/80">{String(i + 1).padStart(2, '0')}</span>
                        {link.label}
                      </motion.a>
                    );
                  })}
                </nav>

                <div className="space-y-4 border-t border-line p-4">
                  <ul className="flex justify-center gap-2">
                    {socials.map(({ label, href, Icon }) => (
                      <li key={label}>
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={label}
                          className="control-3d h-11 w-11 rounded-xl"
                        >
                          <Icon className="h-[18px] w-[18px]" />
                        </a>
                      </li>
                    ))}
                  </ul>
                  <a href="#contact" onClick={(event) => followFromDrawer(event, '#contact')} className="btn btn-primary w-full">
                    Hire Me
                  </a>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </Portal>
    </header>
  );
}
