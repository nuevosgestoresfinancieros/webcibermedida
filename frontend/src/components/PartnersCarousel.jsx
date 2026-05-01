import React from 'react';
import { partners } from '../mock';

export default function PartnersCarousel() {
  // Duplicate list for infinite marquee effect
  const list = [...partners, ...partners];
  return (
    <section className="bg-slate-950 py-12 border-y border-slate-800 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 text-center mb-8">
        <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase text-cyan-400">
          Partners y certificaciones
        </span>
        <h3 className="text-slate-300 text-lg md:text-xl mt-2">Trabajamos con los mejores del sector</h3>
      </div>
      <div className="relative">
        <div className="flex gap-10 md:gap-16 animate-marquee whitespace-nowrap">
          {list.map((p, i) => (
            <div key={i} className="shrink-0 flex items-center gap-3 text-slate-400 hover:text-cyan-400 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 font-black">
                {p.name[0]}
              </div>
              <span className="text-lg font-semibold tracking-wide">{p.name}</span>
            </div>
          ))}
        </div>
        {/* Edge fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-950 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-950 to-transparent" />
      </div>
    </section>
  );
}
