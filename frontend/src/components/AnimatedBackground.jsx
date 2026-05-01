import React, { useEffect, useRef } from 'react';

/**
 * Lightweight canvas background: pulsing dots + connecting lines + subtle matrix columns
 * Designed for dark hero backgrounds.
 */
export default function AnimatedBackground({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    let w = 0, h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    };

    // Particles
    const PARTICLE_COUNT = 55;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0006,
      vy: (Math.random() - 0.5) * 0.0006,
      r: Math.random() * 1.6 + 0.5,
    }));

    // Matrix-like columns (sparse)
    const COLS = 14;
    const columns = Array.from({ length: COLS }, () => ({
      x: Math.random(),
      y: Math.random(),
      speed: 0.0004 + Math.random() * 0.0008,
      length: 60 + Math.random() * 140,
      alpha: 0.15 + Math.random() * 0.25,
    }));

    const tick = () => {
      ctx.clearRect(0, 0, w, h);

      // Matrix columns (vertical gradient lines)
      columns.forEach((c) => {
        c.y += c.speed;
        if (c.y > 1.2) {
          c.y = -0.2;
          c.x = Math.random();
        }
        const x = c.x * w;
        const y = c.y * h;
        const grad = ctx.createLinearGradient(x, y - c.length, x, y);
        grad.addColorStop(0, 'rgba(34, 211, 238, 0)');
        grad.addColorStop(1, `rgba(34, 211, 238, ${c.alpha})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, y - c.length);
        ctx.lineTo(x, y);
        ctx.stroke();
      });

      // Connecting lines between close particles
      const maxDist = 120;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = (a.x - b.x) * w;
          const dy = (a.y - b.y) * h;
          const dist = Math.hypot(dx, dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.25;
            ctx.strokeStyle = `rgba(103, 232, 249, ${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(a.x * w, a.y * h);
            ctx.lineTo(b.x * w, b.y * h);
            ctx.stroke();
          }
        }
      }

      // Particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) p.vy *= -1;
        ctx.fillStyle = 'rgba(34, 211, 238, 0.85)';
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(tick);
    };

    resize();
    tick();
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
}
