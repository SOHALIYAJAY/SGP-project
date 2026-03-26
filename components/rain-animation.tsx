"use client";

import { useEffect, useRef } from 'react';

interface RainDrop {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
}

export default function RainAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const rainDropsRef = useRef<RainDrop[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const initRain = () => {
      rainDropsRef.current = [];
      const dropCount = window.innerWidth < 768 ? 0 : window.innerWidth < 1024 ? 80 : 120;
      for (let i = 0; i < dropCount; i++) {
        rainDropsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height - canvas.height,
          length: Math.random() * 15 + 8,
          speed: Math.random() * 2 + 1,
          opacity: Math.random() * 0.1 + 0.05,
        });
      }
    };

    const drawRain = (drop: RainDrop) => {
      ctx.beginPath();
      ctx.moveTo(drop.x, drop.y);
      ctx.lineTo(drop.x, drop.y + drop.length);
      ctx.strokeStyle = `rgba(248, 250, 252, ${drop.opacity})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    const updateRain = () => {
      rainDropsRef.current.forEach((drop) => {
        drop.y += drop.speed;

        if (drop.y > canvas.height) {
          drop.y = -drop.length;
          drop.x = Math.random() * canvas.width;
        }
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      updateRain();
      rainDropsRef.current.forEach(drawRain);

      animationRef.current = requestAnimationFrame(animate);
    };

    initRain();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
}
