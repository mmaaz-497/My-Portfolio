'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'CEO at TechVision',
    company: 'TechVision',
    quote:
      "Maaz delivered an exceptional AI agent that transformed our workflow. His expertise in Agentic AI is unmatched.",
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 2,
    name: 'Alex Rodriguez',
    role: 'CTO at InnovateLabs',
    company: 'InnovateLabs',
    quote:
      "Working with Maaz on full-stack development was a game-changer. Highly professional and delivered beyond expectations.",
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 3,
    name: 'Dr. James Wilson',
    role: 'AI Researcher',
    company: 'AI Research Lab',
    quote:
      "Outstanding AI solutions and clear communication. Maaz is one of the best developers I've collaborated with.",
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 4,
    name: 'Emily Park',
    role: 'Product Manager at CloudScale',
    company: 'CloudScale',
    quote:
      "Maaz built a multi-agent system that automated 60% of our manual processes. Incredibly reliable and clean code.",
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 5,
    name: 'Marcus Johnson',
    role: 'Lead Engineer at DataForge',
    company: 'DataForge',
    quote:
      "His full-stack expertise and attention to performance made our platform 3x faster. Maaz is a true professional.",
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 6,
    name: 'Priya Sharma',
    role: 'VP Engineering at NexGen AI',
    company: 'NexGen AI',
    quote:
      "From concept to deployment, Maaz shipped a production-grade RAG pipeline in record time. Exceptional quality.",
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 7,
    name: 'David Kim',
    role: 'Founder of SmartOps',
    company: 'SmartOps',
    quote:
      "Maaz's AI chatbot reduced our support tickets by 45%. He understands both the tech and the business side perfectly.",
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 8,
    name: 'Rachel Torres',
    role: 'Director of Engineering at FinLeap',
    company: 'FinLeap',
    quote:
      "Working with Maaz on our fintech platform was seamless. His AI integrations are robust, scalable, and elegant.",
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 9,
    name: 'Omar Al-Fayed',
    role: 'CTO at HealthAI',
    company: 'HealthAI',
    quote:
      "Maaz architected an intelligent diagnostics agent that exceeded our accuracy benchmarks. Brilliant developer.",
    avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face',
  },
];

const cardsVisible = 3;

function getCardsPerView() {
  if (typeof window === 'undefined') return 3;
  if (window.innerWidth < 640) return 1;
  if (window.innerWidth < 1024) return 2;
  return 3;
}

function getGapPercent() {
  if (typeof window === 'undefined') return 4;
  if (window.innerWidth < 640) return 4;
  return 5;
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showNav, setShowNav] = useState(false);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [gapPx, setGapPx] = useState(20);

  useEffect(() => {
    const update = () => {
      const cpv = getCardsPerView();
      setCardsPerView(cpv);
      setGapPx(cpv === 1 ? 16 : 20);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const extended = [...testimonials, ...testimonials];
  const maxIndex = Math.max(0, extended.length - cardsPerView);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const handleInteraction = () => setShowNav(true);

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.min(index, maxIndex));
  };

  const cardWidth = 100 / cardsPerView;
  const slideOffset = currentIndex * (cardWidth + (gapPx * cardsPerView) / 100);

  return (
    <section
      className="relative w-full py-20 overflow-hidden"
      style={{ background: '#0A0A0A' }}
    >
      {/* Subtle radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(0,245,255,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Section Title */}
      <motion.div
        className="relative z-10 text-center mb-14 px-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
          style={{
            color: '#F1F1F1',
            textShadow: '0 0 30px rgba(0,245,255,0.15)',
          }}
        >
          What People{' '}
          <span style={{ color: '#00F5FF' }}>
            Say About Me
          </span>
        </h2>
      </motion.div>

      {/* Carousel Container */}
      <div
        className="relative z-10 max-w-6xl mx-auto px-4"
        onClick={handleInteraction}
        onMouseEnter={() => setShowNav(true)}
        onMouseLeave={() => setShowNav(false)}
      >
        {/* Cards Viewport */}
        <div className="overflow-hidden rounded-2xl">
          <motion.div
            className="flex"
            style={{ gap: `${gapPx}px` }}
            animate={{ x: `-${slideOffset}%` }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            {extended.map((testimonial, idx) => (
              <div
                key={`${testimonial.id}-${idx}`}
                className="flex-shrink-0 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 flex flex-col"
                style={{
                  width: `${cardWidth}%`,
                  minHeight: '240px',
                  background: '#FFFFFF',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,245,255,0.08)',
                }}
              >
                {/* Client Photo */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0"
                    style={{
                      border: '2px solid rgba(0,245,255,0.4)',
                      boxShadow: '0 0 12px rgba(0,245,255,0.15)',
                    }}
                  >
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4
                      className="font-bold text-base leading-tight"
                      style={{ color: '#1A1A1A' }}
                    >
                      {testimonial.name}
                    </h4>
                    <p
                      className="text-xs mt-1"
                      style={{ color: '#6B7280' }}
                    >
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                {/* 5-Star Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="#00F5FF"
                      style={{
                        filter: 'drop-shadow(0 0 3px rgba(0,245,255,0.4))',
                      }}
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p
                  className="text-[15px] leading-relaxed line-clamp-3 flex-grow"
                  style={{ color: '#374151' }}
                >
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Company Badge */}
                <div
                  className="inline-block mt-4 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide uppercase"
                  style={{
                    background: 'rgba(0,245,255,0.1)',
                    color: '#00B8D4',
                  }}
                >
                  {testimonial.company}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Navigation Icons (appear on interaction) */}
        <AnimatePresence>
          {showNav && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center gap-6 mt-8"
            >
              {/* Prev Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevSlide();
                }}
                className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110"
                style={{
                  background: 'rgba(26,26,26,0.8)',
                  border: '1px solid rgba(0,245,255,0.3)',
                  boxShadow: '0 0 15px rgba(0,245,255,0.15)',
                }}
                aria-label="Previous"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#00F5FF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              {/* Pagination Dots */}
              <div className="flex gap-2">
                {Array.from({ length: testimonials.length }).map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      goToSlide(index);
                    }}
                    className="rounded-full transition-all duration-300 cursor-pointer"
                    style={{
                      width: index === currentIndex ? '24px' : '8px',
                      height: '8px',
                      background:
                        index === currentIndex ? '#00F5FF' : 'rgba(163,163,163,0.4)',
                      boxShadow:
                        index === currentIndex
                          ? '0 0 10px rgba(0,245,255,0.5)'
                          : 'none',
                    }}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextSlide();
                }}
                className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110"
                style={{
                  background: 'rgba(26,26,26,0.8)',
                  border: '1px solid rgba(0,245,255,0.3)',
                  boxShadow: '0 0 15px rgba(0,245,255,0.15)',
                }}
                aria-label="Next"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#00F5FF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
