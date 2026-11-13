import { siteConfig } from '@/config/site';
import { footerNavLinks } from '@/config/navigation';
import Logo from './ui/Logo';
import { DownloadIcon, GithubIcon, LinkedInIcon, MailIcon, XIcon } from './ui/Icons';

const socials = [
  { label: 'GitHub', href: siteConfig.social.github, Icon: GithubIcon },
  { label: 'LinkedIn', href: siteConfig.social.linkedin, Icon: LinkedInIcon },
  { label: 'X', href: siteConfig.social.x, Icon: XIcon },
  { label: 'Email', href: `mailto:${siteConfig.email}`, Icon: MailIcon },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-line bg-background/85 px-5 pt-14 backdrop-blur-xl lg:px-10">
      {/* Closing call to action: the last thing a visitor sees should be a way to start. */}
      <div className="glass slab relative mx-auto mb-14 max-w-6xl overflow-hidden rounded-3xl px-6 py-10 sm:px-12 sm:py-12">
        <div
          className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-accent">Got an idea?</p>
            <h2 className="heading-section mt-3 text-foreground">
              Let&apos;s build <span className="text-gradient">something great.</span>
            </h2>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a href={`mailto:${siteConfig.email}`} className="btn btn-primary">
              <MailIcon className="h-4 w-4" />
              Email Me
            </a>
            <a href={siteConfig.resume} download className="btn btn-ghost">
              <DownloadIcon className="h-4 w-4" />
              Download CV
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 pb-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <a href="#hero" className="inline-flex items-center gap-3" aria-label="Back to top">
            <Logo size={48} />
            <span className="text-lg font-bold text-foreground">{siteConfig.name}</span>
          </a>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            {siteConfig.role} | Building Intelligent Solutions
          </p>
          <ul className="mt-5 flex gap-2">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  aria-label={label}
                  className="control-3d h-10 w-10 rounded-xl"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-accent">Quick Links</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 md:grid-cols-1">
            {footerNavLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-sm text-muted underline-offset-4 transition-colors hover:text-accent hover:underline">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-accent">Contact</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-muted">
            <li>
              <a href={`mailto:${siteConfig.email}`} className="break-all transition-colors hover:text-accent">
                {siteConfig.email}
              </a>
            </li>
            <li>{siteConfig.location}</li>
            <li>
              <a href={siteConfig.resume} download className="transition-colors hover:text-accent">
                Download CV
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Extra bottom padding on phones keeps the last lines clear of the floating back-to-top button. */}
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 border-t border-line pb-24 pt-6 text-xs text-muted sm:flex-row sm:pb-6">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
        <p className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
          Designed &amp; built in Karachi
        </p>
      </div>
    </footer>
  );
}
