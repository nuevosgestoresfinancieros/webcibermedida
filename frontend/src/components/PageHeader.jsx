import React from 'react';
import Breadcrumbs from './Breadcrumbs';

export default function PageHeader({ tag, title, subtitle }) {
  return (
    <section className="bg-cyan-400 py-14">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 text-center space-y-4">
        <Breadcrumbs />
        <span className="inline-block px-5 py-2 rounded-full bg-slate-900 text-white text-xs font-bold tracking-[0.2em] uppercase">
          {tag}
        </span>
        <h1 className="text-slate-900 text-3xl md:text-5xl font-bold leading-tight max-w-4xl mx-auto">
          {title}
        </h1>
        {subtitle && (
          <p className="text-slate-800 text-base md:text-lg max-w-2xl mx-auto">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
