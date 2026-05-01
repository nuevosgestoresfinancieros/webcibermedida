import React, { useState, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { testimonials } from '../mock';

export default function TestimonialsCarousel() {
  const [i, setI] = useState(0);
  const count = testimonials.length;

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % count), 6000);
    return () => clearInterval(t);
  }, [count]);

  const go = (n) => setI(((n % count) + count) % count);
  const t = testimonials[i];

  return (
    <section className="bg-slate-900 py-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{
        background: 'radial-gradient(circle at 50% 50%, rgba(139,92,246,0.35), transparent 60%)'
      }} />
      <div className="relative max-w-[1200px] mx-auto px-4 lg:px-8">
        <div className="text-center mb-10 space-y-3">
          <span className="inline-block px-5 py-2 rounded-full bg-cyan-500 text-white text-xs font-bold tracking-[0.15em] uppercase">
            Testimonios
          </span>
          <h2 className="text-white text-3xl md:text-5xl font-bold">Lo que dicen nuestros clientes</h2>
        </div>

        <div className="relative">
          <div key={t.id} className="bg-slate-800/60 border border-slate-700 rounded-2xl p-8 md:p-12 text-center animate-fadeIn">
            <Quote size={40} className="mx-auto text-cyan-400/60 mb-6" />
            <p className="text-slate-200 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
              “{t.quote}”
            </p>
            <div className="flex items-center justify-center gap-1 mt-6">
              {Array.from({ length: 5 }).map((_, k) => (
                <Star key={k} size={16} className={k < t.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'} />
              ))}
            </div>
            <div className="mt-6 flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center text-white font-bold">
                {t.name.split(' ').map((p) => p[0]).slice(0, 2).join('')}
              </div>
              <div className="text-left">
                <div className="text-white font-semibold">{t.name}</div>
                <div className="text-slate-400 text-sm">{t.role} · {t.company}</div>
              </div>
            </div>
          </div>

          <button onClick={() => go(i - 1)} aria-label="Anterior"
            className="absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-800 border border-slate-700 text-white flex items-center justify-center hover:border-cyan-500 hover:text-cyan-400 transition-colors">
            <ChevronLeft size={18} />
          </button>
          <button onClick={() => go(i + 1)} aria-label="Siguiente"
            className="absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-800 border border-slate-700 text-white flex items-center justify-center hover:border-cyan-500 hover:text-cyan-400 transition-colors">
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 mt-6">
          {testimonials.map((_, k) => (
            <button key={k} onClick={() => go(k)} aria-label={`Testimonio ${k + 1}`}
              className={`rounded-full transition-all ${k === i ? 'w-8 h-2 bg-cyan-400' : 'w-2 h-2 bg-slate-600 hover:bg-slate-500'}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
