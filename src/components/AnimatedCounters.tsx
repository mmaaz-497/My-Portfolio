'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  label: string;
}

function Counter({ end, duration = 2000, suffix = '', label }: CounterProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime: number;
          let animationFrame: number;

          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
              animationFrame = requestAnimationFrame(animate);
            }
          };

          animationFrame = requestAnimationFrame(animate);
          return () => cancelAnimationFrame(animationFrame);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [end, duration, hasAnimated]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-[#00F5FF] to-[#00BFFF] bg-clip-text text-transparent mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-[#A3A3A3] text-sm md:text-base font-medium">{label}</div>
    </div>
  );
}

export default function AnimatedCounters() {
  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 glass-card rounded-2xl p-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Counter end={15} suffix="+" label="Projects Completed" />
      <Counter end={15} suffix="+" label="Technologies" />
      <Counter end={1000} suffix="+" label="Lines of Code" />
      <Counter end={100} suffix="%" label="Commitment" />
    </motion.div>
  );
}
