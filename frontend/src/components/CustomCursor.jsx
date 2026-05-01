import React, { useEffect, useState } from 'react';

/**
 * Custom cursor with a soft ring that grows on interactive elements.
 * Disabled on touch devices (where there's no pointer).
 */
export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const touch = matchMedia('(hover: none)').matches;
    setIsTouch(touch);
    if (touch) return;

    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
      const el = e.target;
      const interactive =
        el && (el.closest?.('a, button, input, textarea, select, [role=button]'));
      setActive(Boolean(interactive));
    };
    const leave = () => setVisible(false);

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseleave', leave);
    };
  }, []);

  if (isTouch) return null;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed top-0 left-0 z-[9999] transition-[opacity,transform] duration-150 ease-out ${visible ? 'opacity-100' : 'opacity-0'}`}
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
      }}
    >
      <div
        className={`relative -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-200 ${
          active
            ? 'w-10 h-10 border-cyan-400/80 bg-cyan-400/10'
            : 'w-6 h-6 border-cyan-400/50'
        }`}
      />
      <div
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-cyan-400"
      />
    </div>
  );
}
