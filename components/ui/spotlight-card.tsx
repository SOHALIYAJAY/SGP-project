"use client";

import React, { useEffect, useRef, ReactNode } from "react";

interface GlowCardProps {
  children?: ReactNode;
  className?: string;
  glowColor?: "blue" | "purple" | "green" | "red" | "orange";
  size?: "sm" | "md" | "lg";
  customSize?: boolean;
}

const glowColorMap = {
  blue: { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  green: { base: 120, spread: 200 },
  red: { base: 0, spread: 200 },
  orange: { base: 30, spread: 200 },
};

const sizeMap = {
  sm: "w-48 h-56",
  md: "w-64 h-72",
  lg: "w-80 h-96",
};

export function GlowCard({
  children,
  className = "",
  glowColor = "blue",
  size = "md",
  customSize = false,
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointer = (e: PointerEvent) => {
      if (!cardRef.current) return;

      cardRef.current.style.setProperty("--x", `${e.clientX}`);
      cardRef.current.style.setProperty("--y", `${e.clientY}`);
      cardRef.current.style.setProperty(
        "--xp",
        `${e.clientX / window.innerWidth}`
      );
      cardRef.current.style.setProperty(
        "--yp",
        `${e.clientY / window.innerHeight}`
      );
    };

    window.addEventListener("pointermove", handlePointer);
    return () => window.removeEventListener("pointermove", handlePointer);
  }, []);

  const { base, spread } = glowColorMap[glowColor];

  return (
    <>
      <style>{`
        [data-glow] {
          --base: ${base};
          --spread: ${spread};
          --radius: 16;
          --border: 2;
          --size: 220;
          --border-size: calc(var(--border) * 1px);
          --spotlight-size: calc(var(--size) * 1px);
          --hue: calc(var(--base) + (var(--xp, 0) * var(--spread)));
          position: relative;
          border-radius: 1rem;
          background: hsl(0 0% 100% / 0.03);
          border: var(--border-size) solid transparent;
          backdrop-filter: blur(10px);
        }

        [data-glow]::before {
          content: "";
          position: absolute;
          inset: -2px;
          border-radius: inherit;
          background: radial-gradient(
            var(--spotlight-size) var(--spotlight-size) at
            calc(var(--x) * 1px)
            calc(var(--y) * 1px),
            hsl(var(--hue) 100% 65% / 0.8),
            transparent 70%
          );
          pointer-events: none;
        }
      `}</style>

      <div
        ref={cardRef}
        data-glow
        className={`
          ${!customSize ? sizeMap[size] : ""}
          p-6
          ${className}
        `}
      >
        {children}
      </div>
    </>
  );
}
