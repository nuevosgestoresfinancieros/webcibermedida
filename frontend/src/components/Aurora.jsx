import React from 'react';

/**
 * Subtle aurora/gradient-mesh background. Pure CSS with slow animation.
 * Uses only brand colors (cyan/violet) at low opacity to avoid overwhelming content.
 */
export default function Aurora({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div className="absolute -top-1/4 -left-1/4 w-[60%] h-[60%] rounded-full opacity-30 blur-3xl animate-aurora-1"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.6), transparent 70%)' }}
      />
      <div className="absolute -bottom-1/4 -right-1/4 w-[60%] h-[60%] rounded-full opacity-25 blur-3xl animate-aurora-2"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.6), transparent 70%)' }}
      />
      <div className="absolute top-1/3 right-1/4 w-[40%] h-[40%] rounded-full opacity-20 blur-3xl animate-aurora-3"
        style={{ background: 'radial-gradient(circle, rgba(103,232,249,0.6), transparent 70%)' }}
      />
    </div>
  );
}
