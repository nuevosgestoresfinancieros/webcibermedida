import React, { useRef } from 'react';

/**
 * Subtle 3D tilt on hover. Uses mouse position to compute rotateX/rotateY.
 * Degrades gracefully on touch devices (no tilt).
 */
export default function TiltCard({ children, max = 8, className = '', as: Tag = 'div' }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * (max * 2);
    const rotateX = (0.5 - y) * (max * 2);
    el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
  };

  return (
    <Tag
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transformStyle: 'preserve-3d', transition: 'transform 0.2s ease-out' }}
      className={className}
    >
      {children}
    </Tag>
  );
}
