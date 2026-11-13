'use client';

import { useEffect } from 'react';
import { setView, type Theme } from './three/sceneStore';
import { useView } from './three/useView';
import { MoonIcon, SunIcon } from './ui/Icons';

const readTheme = (): Theme => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');

// Same values as --background in globals.css.
const BROWSER_BAR: Record<Theme, string> = { dark: '#0a0a0a', light: '#f3f6f9' };

/** Tints the mobile browser's address bar to match the site theme, not the OS setting. */
const syncBrowserBar = (theme: Theme) => {
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', BROWSER_BAR[theme]);
};

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme } = useView();

  // The inline script in layout.tsx has already applied the saved theme to
  // <html>; mirror it into the store so the toggle and the 3D scene agree.
  useEffect(() => {
    setView({ theme: readTheme() });
    syncBrowserBar(readTheme());
  }, []);

  const toggle = () => {
    const next: Theme = readTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      // Private browsing: the choice simply lasts for this visit.
    }
    setView({ theme: next });
    syncBrowserBar(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`control-3d h-10 w-10 rounded-xl ${className}`}
    >
      {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
    </button>
  );
}
