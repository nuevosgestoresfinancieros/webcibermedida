import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { heroSlides } from '../mock';

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % heroSlides.length), 7000);
    return () => clearInterval(t);
  }, []);

  const slide = heroSlides[current];

  return (
    <section className="relative bg-cyan-400 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 pb-8">
        <div className="relative rounded-lg overflow-hidden min-h-[560px] lg:min-h-[640px]">
          {/* Background image with dark overlay */}
          <div
            key={slide.id}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/60 to-slate-900/30" />

          {/* Neon lines overlay */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[15%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent"></div>
            <div className="absolute bottom-[15%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="w-full grid lg:grid-cols-2 gap-8 p-8 lg:p-16">
              <div className="hidden lg:block" />
              <div className="space-y-6 animate-fadeIn">
                <span className="inline-block px-5 py-2 rounded-full bg-cyan-500/90 text-white text-xs font-bold tracking-[0.2em] uppercase">
                  {slide.tag}
                </span>
                <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  {slide.title}
                </h1>
                <p className="text-cyan-100 text-base md:text-lg max-w-xl leading-relaxed">
                  {slide.description}
                </p>
                <div className="pt-4">
                  <button className="px-8 py-3.5 rounded-md bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold hover:shadow-xl hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all">
                    {slide.cta}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Slide controls */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`transition-all rounded-full ${
                  i === current ? 'w-8 h-2 bg-cyan-400' : 'w-2 h-2 bg-white/60'
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => setCurrent((c) => (c - 1 + heroSlides.length) % heroSlides.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white flex items-center justify-center hover:bg-cyan-500/60 transition-colors z-20"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => setCurrent((c) => (c + 1) % heroSlides.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white flex items-center justify-center hover:bg-cyan-500/60 transition-colors z-20"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
