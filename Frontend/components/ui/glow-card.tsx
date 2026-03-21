"use client";

import React, { useEffect, useRef, ReactNode } from 'react';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  status?: 'success' | 'warning' | 'danger' | 'neutral';
}

// Status-based glow colors (HSL base values)
const statusColorMap = {
  success: { base: 142, spread: 40 },   // Green
  warning: { base: 38, spread: 40 },    // Orange  
  danger: { base: 0, spread: 40 },      // Red
  neutral: { base: 190, spread: 60 },   // Cyan
};

const GlowCard: React.FC<GlowCardProps> = ({ 
  children, 
  className = '', 
  status = 'neutral',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { base, spread } = statusColorMap[status];

  useEffect(() => {
    const handlePointer = (e: PointerEvent) => {
      if (!cardRef.current) return;

      cardRef.current.style.setProperty('--x', `${e.clientX}`);
      cardRef.current.style.setProperty('--y', `${e.clientY}`);
      cardRef.current.style.setProperty('--xp', `${e.clientX / window.innerWidth}`);
      cardRef.current.style.setProperty('--yp', `${e.clientY / window.innerHeight}`);
    };

    window.addEventListener('pointermove', handlePointer);
    return () => window.removeEventListener('pointermove', handlePointer);
  }, []);

  const uniqueId = useRef(`glow-${Math.random().toString(36).slice(2, 9)}`);

  return (
    <>
      <style>{`
        [data-glow-id="${uniqueId.current}"] {
          --base: ${base};
          --spread: ${spread};
          --radius: 12;
          --border: 2;
          --size: 180;
          --border-size: calc(var(--border) * 1px);
          --spotlight-size: calc(var(--size) * 1px);
          --hue: calc(var(--base) + (var(--xp, 0) * var(--spread)));
          position: relative;
          border-radius: calc(var(--radius) * 1px);
          background: hsl(222 47% 11% / 0.95);
          border: var(--border-size) solid hsl(0 0% 100% / 0.08);
          backdrop-filter: blur(10px);
          overflow: hidden;
        }

        [data-glow-id="${uniqueId.current}"]::before {
          content: "";
          position: absolute;
          inset: calc(var(--border-size) * -1);
          border-radius: inherit;
          background: radial-gradient(
            var(--spotlight-size) var(--spotlight-size) at
            calc(var(--x, 0) * 1px)
            calc(var(--y, 0) * 1px),
            hsl(var(--hue) 100% 60% / 0.7),
            transparent 100%
          );
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          -webkit-mask-composite: xor;
          padding: var(--border-size);
          pointer-events: none;
        }

        [data-glow-id="${uniqueId.current}"]::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: radial-gradient(
            calc(var(--spotlight-size) * 1.5) calc(var(--spotlight-size) * 1.5) at
            calc(var(--x, 0) * 1px)
            calc(var(--y, 0) * 1px),
            hsl(var(--hue) 100% 70% / 0.08),
            transparent 100%
          );
          pointer-events: none;
        }
      `}</style>

      <div
        ref={cardRef}
        data-glow-id={uniqueId.current}
        className={`${className}`}
      >
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </>
  );
};

export { GlowCard };
