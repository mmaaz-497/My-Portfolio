'use client';

import { useEffect, useRef, useState, type ChangeEvent, type FocusEvent, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '@/config/site';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';
import { CheckIcon, CopyIcon, GithubIcon, LinkedInIcon, MailIcon, PinIcon, XIcon } from './ui/Icons';

const channels = [
  { label: 'GitHub', value: 'mmaaz-497', href: siteConfig.social.github, Icon: GithubIcon },
  { label: 'LinkedIn', value: 'Muhammad Maaz', href: siteConfig.social.linkedin, Icon: LinkedInIcon },
  { label: 'X', value: '@MMaaz2547', href: siteConfig.social.x, Icon: XIcon },
];

type Field = 'name' | 'email' | 'whatsapp' | 'message';
type FormData = Record<Field, string>;

const EMPTY: FormData = { name: '', email: '', whatsapp: '', message: '' };
const MESSAGE_MAX = 2000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Returns the problem with a field's value, or '' when it is fine. */
function validate(field: Field, value: string): string {
  const text = value.trim();
  switch (field) {
    case 'name':
      return text ? '' : 'Please tell me your name.';
    case 'email':
      if (!text) return 'Please add an email so I can reply.';
      return EMAIL_PATTERN.test(text) ? '' : "That email doesn't look right.";
    case 'message':
      if (!text) return 'Please write a short message.';
      return text.length < 10 ? 'A little more detail helps — at least 10 characters.' : '';
    default:
      return '';
  }
}

const FIELDS: Field[] = ['name', 'email', 'whatsapp', 'message'];
const labelClass = 'mb-2 block text-xs font-semibold uppercase tracking-widest text-foreground';
const iconPlate = 'chip-3d h-12 w-12';

export default function Contact() {
  const [formData, setFormData] = useState<FormData>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [copied, setCopied] = useState(false);
  // Filled only by bots: real visitors never see this field.
  const honeypot = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const errorFor = (field: Field) => (touched[field] ? validate(field, formData[field]) : '');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Show every problem at once and put the cursor on the first one.
    const firstInvalid = FIELDS.find((field) => validate(field, formData[field]));
    if (firstInvalid) {
      setTouched({ name: true, email: true, whatsapp: true, message: true });
      e.currentTarget.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    // A filled honeypot means a bot: pretend it worked and send nothing.
    if (honeypot.current?.value) {
      setStatus('success');
      return;
    }

    setStatus('sending');

    const FORMSPREE_URL = siteConfig.formspreeUrl;

    if (FORMSPREE_URL.includes('YOUR_FORM_ID')) {
      setStatus('error');
      console.warn('Formspree URL not configured. Update formspreeUrl in src/config/site.ts');
      return;
    }

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData(EMPTY);
        setTouched({});
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // A stale "something went wrong" should not sit under a form being corrected.
    if (status === 'error') setStatus('idle');
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
    } catch {
      // Clipboard blocked (permissions / insecure context): the mailto link still works.
    }
  };

  /** Shared wiring for a validated field: value, handlers and error linkage. */
  const fieldProps = (field: Field) => {
    const error = errorFor(field);
    return {
      id: field,
      name: field,
      value: formData[field],
      onChange: handleChange,
      onBlur: handleBlur,
      className: 'field',
      'aria-invalid': error ? true : undefined,
      'aria-describedby': error ? `${field}-error` : undefined,
    };
  };

  const fieldError = (field: Field) => {
    const error = errorFor(field);
    return error ? (
      <p id={`${field}-error`} className="mt-1.5 text-xs font-medium text-red-500">
        {error}
      </p>
    ) : null;
  };

  const sending = status === 'sending';

  return (
    <section id="contact" className="relative px-5 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="07"
          eyebrow="Get In Touch"
          title={
            <>
              Let&apos;s Build <span className="text-gradient">Something</span>
            </>
          }
          subtitle="Open to professional collaborations and project opportunities. Let's connect."
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_1.35fr]">
          <Reveal variant="left" className="space-y-4">
            {/* Email: the address opens the mail app, the button copies it. */}
            <div className="glass lift flex items-center gap-4 rounded-2xl p-4">
              <span className={iconPlate}>
                <MailIcon className="h-5 w-5" />
              </span>
              <a href={`mailto:${siteConfig.email}`} className="group min-w-0 flex-1">
                <span className="block text-xs font-semibold uppercase tracking-widest text-muted">Email</span>
                <span className="block truncate text-sm font-semibold text-foreground group-hover:text-accent">
                  {siteConfig.email}
                </span>
              </a>
              <button
                type="button"
                onClick={copyEmail}
                aria-label={copied ? 'Email address copied' : 'Copy email address'}
                className={`control-3d h-10 w-10 rounded-xl ${copied ? '!border-accent !text-accent' : ''}`}
              >
                {copied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
              </button>
              <span className="sr-only" role="status">
                {copied ? 'Email address copied to clipboard' : ''}
              </span>
            </div>

            {channels.map(({ label, value, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass lift group flex items-center gap-4 rounded-2xl p-4"
              >
                <span className={iconPlate}>
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-semibold uppercase tracking-widest text-muted">{label}</span>
                  <span className="block truncate text-sm font-semibold text-foreground group-hover:text-accent">{value}</span>
                </span>
              </a>
            ))}
            <div className="glass flex items-center gap-4 rounded-2xl p-4">
              <span className={iconPlate}>
                <PinIcon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-xs font-semibold uppercase tracking-widest text-muted">Based in</span>
                <span className="block text-sm font-semibold text-foreground">{siteConfig.location} · Working remotely</span>
              </span>
            </div>
          </Reveal>

          <Reveal variant="right" delay={0.1}>
            {status === 'success' ? (
              <div className="glass flex h-full min-h-[26rem] flex-col items-center justify-center rounded-3xl p-8 text-center" role="status">
                {/* The tick spins round to face the visitor, like a coin landing. */}
                <motion.span
                  className="chip-3d h-16 w-16 !rounded-full"
                  initial={{ scale: 0.4, rotateY: 180, opacity: 0 }}
                  animate={{ scale: 1, rotateY: 0, opacity: 1 }}
                  transition={{ type: 'spring', damping: 14, stiffness: 160 }}
                  style={{ transformPerspective: 600 }}
                >
                  <CheckIcon className="h-8 w-8" />
                </motion.span>
                <h3 className="mt-6 text-2xl font-bold text-foreground">Message sent</h3>
                <p className="mt-3 max-w-sm text-muted">
                  Thank you for reaching out. I&apos;ll get back to you soon, usually within a day or two.
                </p>
                <button type="button" onClick={() => setStatus('idle')} className="btn btn-ghost mt-8">
                  Send another message
                </button>
              </div>
            ) : (
              // noValidate: the messages below replace the browser's own bubbles.
              <form onSubmit={handleSubmit} noValidate className="glass rounded-3xl p-6 sm:p-9">
                {/* Honeypot: hidden from people and assistive tech, tempting to bots. */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="company-website">Leave this field empty</label>
                  <input ref={honeypot} id="company-website" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className={labelClass}>
                      Name
                    </label>
                    <input {...fieldProps('name')} type="text" autoComplete="name" required maxLength={100} placeholder="John Doe" />
                    {fieldError('name')}
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>
                      Email
                    </label>
                    <input
                      {...fieldProps('email')}
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      required
                      maxLength={254}
                      placeholder="john@example.com"
                    />
                    {fieldError('email')}
                  </div>
                </div>

                <div className="mt-5">
                  <label htmlFor="whatsapp" className={labelClass}>
                    WhatsApp Number <span className="font-normal normal-case tracking-normal text-muted">(optional)</span>
                  </label>
                  <input
                    {...fieldProps('whatsapp')}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    maxLength={30}
                    placeholder="+92 300 1234567"
                  />
                </div>

                <div className="mt-5">
                  <div className="flex items-baseline justify-between">
                    <label htmlFor="message" className={labelClass}>
                      Message
                    </label>
                    <span className="font-mono text-[11px] text-muted" aria-hidden="true">
                      {formData.message.length} / {MESSAGE_MAX}
                    </span>
                  </div>
                  <textarea
                    {...fieldProps('message')}
                    required
                    rows={5}
                    maxLength={MESSAGE_MAX}
                    className="field resize-y"
                    placeholder="Tell me about your project..."
                  />
                  {fieldError('message')}
                </div>

                <button type="submit" disabled={sending} className="btn btn-primary mt-6 w-full">
                  {sending && (
                    <span
                      className="animate-spin-slow h-4 w-4 rounded-full border-2 border-current border-t-transparent"
                      aria-hidden="true"
                    />
                  )}
                  {sending ? 'Sending...' : 'Send Message'}
                </button>

                <p role="status" aria-live="polite" className="mt-4 min-h-6 text-center text-sm font-semibold">
                  {status === 'error' && (
                    <span className="text-red-500">
                      Something went wrong. Please try again or{' '}
                      <a href={`mailto:${siteConfig.email}`} className="underline underline-offset-4">
                        email me directly
                      </a>
                      .
                    </span>
                  )}
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
