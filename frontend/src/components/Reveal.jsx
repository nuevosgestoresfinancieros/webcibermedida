import React from 'react';
import useInView from '../hooks/useInView';

const variants = {
  up: 'translate-y-8',
  down: '-translate-y-8',
  left: 'translate-x-8',
  right: '-translate-x-8',
  scale: 'scale-95',
};

export default function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 700,
  className = '',
  as: Tag = 'div',
}) {
  const [ref, inView] = useInView();
  const hidden = `opacity-0 ${variants[direction] || variants.up}`;
  const shown = 'opacity-100 translate-x-0 translate-y-0 scale-100';
  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms`, transitionDuration: `${duration}ms` }}
      className={`transition-[opacity,transform] ease-out will-change-transform ${
        inView ? shown : hidden
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
