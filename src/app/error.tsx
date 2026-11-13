'use client';

import { useEffect } from 'react';
import Logo from '@/components/ui/Logo';
import TiltCard from '@/components/ui/TiltCard';

export default function Error({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="relative flex min-h-dvh items-center justify-center px-5 py-16">
      <div className="scene-fallback" aria-hidden="true" />
      <TiltCard className="relative z-10 w-full max-w-xl rounded-[2rem]" plate="glass slab" contentClassName="px-6 py-12 text-center sm:px-12 sm:py-14" max={6}>
        <Logo size={56} className="animate-hover mx-auto" />
        <h1 data-depth="2" className="heading-section mt-8 text-foreground">
          Something <span className="text-gradient">went wrong</span>
        </h1>
        <p className="mt-4 leading-relaxed text-muted">
          An unexpected error stopped this page from loading. Trying again usually fixes it.
        </p>
        <div data-depth="1" className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <button type="button" onClick={() => retry()} className="btn btn-primary">
            Try Again
          </button>
          {/* A full page load on purpose: it resets any broken client state. */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/" className="btn btn-ghost">
            Go Home
          </a>
        </div>
      </TiltCard>
    </div>
  );
}
