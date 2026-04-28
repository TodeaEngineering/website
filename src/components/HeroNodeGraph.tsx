'use client';

import { useEffect, useRef } from 'react';

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

const NODE_DENSITY = 1 / 14000;
const MIN_NODES = 30;
const MAX_NODES = 90;
const LINK_DISTANCE = 130;
const MAX_SPEED = 0.6;

export default function HeroNodeGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const nodes: Node[] = [];
    let rafId = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      nodes.length = 0;
      const target = Math.round(width * height * NODE_DENSITY);
      const count = Math.max(MIN_NODES, Math.min(MAX_NODES, target));
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * MAX_SPEED * 2,
          vy: (Math.random() - 0.5) * MAX_SPEED * 2,
          r: 1.4 + Math.random() * 1.6,
        });
      }
    };

    const step = () => {
      ctx.clearRect(0, 0, width, height);

      const pointer = pointerRef.current;

      for (const n of nodes) {
        if (!prefersReducedMotion) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;
          n.x = Math.max(0, Math.min(width, n.x));
          n.y = Math.max(0, Math.min(height, n.y));
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DISTANCE) {
            const alpha = (1 - dist / LINK_DISTANCE) * 0.35;
            ctx.strokeStyle = `rgba(0, 0, 0, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        let highlight = 0;
        if (pointer.active) {
          const d = Math.hypot(n.x - pointer.x, n.y - pointer.y);
          if (d < LINK_DISTANCE) highlight = 1 - d / LINK_DISTANCE;
        }
        const fill = 0.55 + highlight * 0.4;
        ctx.fillStyle = `rgba(0, 0, 0, ${fill})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + highlight * 1.5, 0, Math.PI * 2);
        ctx.fill();

        if (pointer.active) {
          const d = Math.hypot(n.x - pointer.x, n.y - pointer.y);
          if (d < LINK_DISTANCE) {
            const alpha = (1 - d / LINK_DISTANCE) * 0.5;
            ctx.strokeStyle = `rgba(0, 0, 0, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.stroke();
          }
        }
      }

      rafId = requestAnimationFrame(step);
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current.x = e.clientX - rect.left;
      pointerRef.current.y = e.clientY - rect.top;
      pointerRef.current.active = true;
    };
    const handlePointerLeave = () => {
      pointerRef.current.active = false;
    };

    const handleResize = () => {
      resize();
      seed();
    };

    resize();
    seed();
    rafId = requestAnimationFrame(step);

    window.addEventListener('resize', handleResize);
    const parent = canvas.parentElement;
    parent?.addEventListener('pointermove', handlePointerMove);
    parent?.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      parent?.removeEventListener('pointermove', handlePointerMove);
      parent?.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
