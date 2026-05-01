import React from 'react';
import { Linkedin, Mail, Award, Target, Users, Sparkles } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import StatsBand from '../components/StatsBand';
import { team } from '../mock';

const values = [
  { icon: Target, title: 'Excelencia técnica', desc: 'Formación basada en experiencia real, no en teoría abstracta.' },
  { icon: Sparkles, title: 'Innovación continua', desc: 'Actualizamos contenidos con cada avance del sector.' },
  { icon: Users, title: 'Enfoque humano', desc: 'Acompañamos a cada alumno y organización en su proceso.' },
  { icon: Award, title: 'Rigor y calidad', desc: 'Metodologías validadas y certificaciones reconocidas.' },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        tag="Sobre nosotros"
        title="Expertos en ciberseguridad y transformación digital"
        subtitle="Ayudamos a empresas, centros formativos y administraciones a protegerse y evolucionar en el entorno digital."
      />

      {/* Mission */}
      <section className="bg-slate-900 py-20">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal direction="left">
            <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80" alt="Equipo Cibermedida" className="rounded-xl border border-slate-800 w-full" />
          </Reveal>
          <Reveal direction="right" className="space-y-5">
            <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 text-xs font-bold tracking-wider uppercase">Nuestra misión</span>
            <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight">Formación técnica aplicada al mundo real</h2>
            <p className="text-slate-300 leading-relaxed">
              En Cibermedida combinamos experiencia técnica de primera línea con metodología docente estructurada. Diseñamos programas formativos orientados a la aplicación práctica, no a la teoría abstracta.
            </p>
            <p className="text-slate-300 leading-relaxed">
              Trabajamos con empresas que buscan proteger sus activos digitales, centros formativos que necesitan actualizar sus programas, y administraciones públicas comprometidas con la transformación digital de sus servicios.
            </p>
          </Reveal>
        </div>
      </section>

      <StatsBand />

      {/* Values */}
      <section className="bg-slate-950 py-20">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-5 py-2 rounded-full bg-cyan-500 text-white text-xs font-bold tracking-[0.15em] uppercase">Nuestros valores</span>
            <h2 className="text-white text-3xl md:text-4xl font-bold mt-4">Lo que nos define</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <Reveal key={v.title} delay={i * 80} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-cyan-500/50 transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mb-4">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-white font-bold mb-2">{v.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{v.desc}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-slate-900 py-20">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-5 py-2 rounded-full bg-violet-500/20 border border-violet-500/40 text-violet-300 text-xs font-bold tracking-[0.15em] uppercase">Equipo</span>
            <h2 className="text-white text-3xl md:text-4xl font-bold mt-4">Profesionales que te acompañan</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((p, i) => (
              <Reveal key={p.name} delay={i * 80} className="bg-slate-800/60 border border-slate-700 rounded-xl overflow-hidden group hover:-translate-y-1 transition-transform">
                <div className="aspect-square overflow-hidden bg-slate-800">
                  <img src={p.photo} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <h3 className="text-white font-bold">{p.name}</h3>
                  <p className="text-cyan-400 text-sm">{p.role}</p>
                  <p className="text-slate-400 text-sm mt-2 line-clamp-3">{p.bio}</p>
                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-700">
                    <a href="#" aria-label="LinkedIn" className="w-8 h-8 rounded-full bg-slate-700 text-slate-300 hover:bg-cyan-500 hover:text-white flex items-center justify-center transition-colors">
                      <Linkedin size={13}/>
                    </a>
                    <a href="#" aria-label="Email" className="w-8 h-8 rounded-full bg-slate-700 text-slate-300 hover:bg-cyan-500 hover:text-white flex items-center justify-center transition-colors">
                      <Mail size={13}/>
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
