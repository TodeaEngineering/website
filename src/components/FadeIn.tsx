'use client';

import { useEffect, useRef, type ReactNode } from 'react';

export default function FadeIn({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'none';
          observer.unobserve(el);
        }
      },
      { threshold: 0.06 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: 'translateY(32px)',
        transition: `opacity 0.8s cubic-bezier(0.25,1,0.5,1) ${delay}s, transform 0.8s cubic-bezier(0.25,1,0.5,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
