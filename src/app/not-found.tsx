import Link from 'next/link';
import Logo from '@/components/ui/Logo';
import TiltCard from '@/components/ui/TiltCard';

export default function NotFound() {
  return (
    <div className="relative flex min-h-dvh items-center justify-center px-5 py-16">
      <div className="scene-fallback" aria-hidden="true" />
      <TiltCard className="relative z-10 w-full max-w-xl rounded-[2rem]" plate="glass slab" contentClassName="px-6 py-12 text-center sm:px-12 sm:py-14" max={6}>
        <Logo size={56} className="mx-auto" />
        {/* The number is the page title; it stands proud of the panel and bobs slowly. */}
        <h1 data-depth="3" className="mt-8">
          <span className="text-extrude animate-hover inline-block text-8xl font-extrabold sm:text-9xl">404</span>
        </h1>
        <h2 data-depth="1" className="mt-8 text-2xl font-bold text-foreground sm:text-3xl">
          Page not found
        </h2>
        <p className="mt-4 leading-relaxed text-muted">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Even AI agents get lost sometimes.
        </p>
        <div data-depth="2" className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/" className="btn btn-primary">
            Go Home
          </Link>
          <Link href="/#projects" className="btn btn-ghost">
            View Projects
          </Link>
        </div>
      </TiltCard>
    </div>
  );
}
