import React, { useEffect, useState } from 'react';
import useInView from '../hooks/useInView';

export default function Counter({ to = 0, duration = 1600, suffix = '', prefix = '', className = '' }) {
  const [ref, inView] = useInView();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const end = Number(to) || 0;
    let raf;
    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(end * eased));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{value.toLocaleString('es-ES')}{suffix}
    </span>
  );
}
