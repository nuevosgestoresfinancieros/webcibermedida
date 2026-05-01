import React from 'react';
import { TrendingUp, Clock, Users, Shield } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import StatsBand from '../components/StatsBand';
import Reveal from '../components/Reveal';
import TiltCard from '../components/TiltCard';
import { successCases } from '../mock';

const iconMap = { TrendingUp, Clock, Users, Shield };

export default function CasosExitoPage() {
  return (
    <>
      <PageHeader tag="Casos de éxito" title="Resultados reales con nuestros clientes" subtitle="Descubre cómo hemos ayudado a empresas y organizaciones a proteger sus activos digitales." />
      <StatsBand />

      <section className="bg-slate-900 py-20">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-8 space-y-10">
          {successCases.map((c, idx) => (
            <Reveal key={c.id} delay={idx * 80}>
              <TiltCard max={4} className="grid lg:grid-cols-2 gap-0 bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-colors">
                <div className="aspect-video lg:aspect-auto overflow-hidden">
                  <img src={c.image} alt={c.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-8 space-y-4">
                  <span className="inline-block px-3 py-1 text-xs font-bold rounded bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 uppercase tracking-wider">
                    {c.sector}
                  </span>
                  <h3 className="text-white text-2xl font-bold">{c.title}</h3>
                  <p className="text-slate-300 leading-relaxed">{c.description}</p>
                  <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-700">
                    {c.metrics.map((m) => {
                      const Icon = iconMap[m.icon] || TrendingUp;
                      return (
                        <div key={m.label} className="text-center">
                          <Icon size={18} className="mx-auto text-cyan-400 mb-1" />
                          <div className="text-white text-lg font-bold">{m.value}</div>
                          <div className="text-slate-400 text-[11px]">{m.label}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
