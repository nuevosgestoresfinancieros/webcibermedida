import React from 'react';
import {
  CheckCircle2, ShieldAlert, KeyRound, Network, AppWindow, Radar, Bug,
  FileSearch, ScanSearch, CloudCog, Siren, BadgeCheck, GraduationCap,
  Database, ServerCrash, Users, Fish, Lock, ChevronRight, Globe, Quote,
  Target, Sparkles,
} from 'lucide-react';
import {
  whyPoints, specializationAreas, aboutImages, services,
  onlineSolutions, cyberAttacks, guideSteps,
} from '../mock';
import Reveal from './Reveal';

const iconMap = {
  ShieldAlert, KeyRound, Network, AppWindow, Radar, Bug, FileSearch,
  ScanSearch, CloudLock: CloudCog, Siren, BadgeCheck, GraduationCap,
  Database, ServerCrash, Users, Fish, Lock,
};

export function WhyCibermedida() {
  return (
    <section className="bg-gradient-to-b from-violet-400 to-violet-500 py-20">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <span className="inline-block px-5 py-2 rounded-full bg-cyan-500 text-white text-xs font-bold tracking-[0.15em] uppercase">
            Por qué formar con Cibermedida
          </span>
          <h2 className="text-white text-3xl md:text-5xl font-bold leading-tight">
            Especialización técnica con enfoque formativo estructurado
          </h2>
          <p className="text-white/90 text-base md:text-lg max-w-3xl leading-relaxed">
            Cibermedida desarrolla e imparte programas de formación orientados a la transformación digital de organizaciones. La metodología combina experiencia técnica real, actualización constante y adaptación a entornos empresariales, académicos y administrativos.
          </p>
          <ul className="space-y-4 pt-2">
            {whyPoints.map((p, i) => (
              <li key={i} className="flex items-start gap-3 text-white font-semibold">
                <CheckCircle2 className="mt-0.5 shrink-0 text-cyan-300" size={22} />
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <div className="pt-4">
            <button className="px-8 py-3.5 rounded-md bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-900 font-semibold hover:shadow-xl hover:shadow-cyan-400/40 hover:-translate-y-0.5 transition-all">
              Solicitar información
            </button>
          </div>
        </div>

        <div className="bg-cyan-500 rounded-xl p-8 shadow-2xl">
          <h3 className="text-white font-bold text-lg mb-6 border-b border-cyan-400 pb-3">
            Áreas técnicas de especialización
          </h3>
          <ul className="space-y-4">
            {specializationAreas.map((a, i) => (
              <li key={i} className="flex items-start gap-3 text-white">
                <div className="w-2 h-2 rounded-full bg-white mt-2 shrink-0" />
                <span className="text-sm font-medium leading-snug">{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function About() {
  const pillars = [
    { icon: Target, title: 'Aplicación práctica', desc: 'Conocimientos aplicables desde el primer día, no teoría abstracta.' },
    { icon: Sparkles, title: 'Actualización constante', desc: 'Contenidos revisados con cada avance del sector tecnológico.' },
    { icon: Users, title: 'Adaptación a tu entorno', desc: 'Programas ajustados a empresas, centros formativos y administraciones.' },
  ];
  return (
    <section id="cibermedida" className="bg-slate-900 py-20 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(34,211,238,0.2) 0%, transparent 50%)'
      }}></div>

      <div className="max-w-[1200px] mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative">
        {/* Visual block */}
        <div className="relative">
          <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl aspect-[4/5]">
            <img src={aboutImages[0]} alt="Equipo Cibermedida" className="w-full h-full object-cover" />
          </div>
          {/* Secondary image */}
          <div className="hidden md:block absolute -bottom-8 -right-6 w-56 aspect-[4/3] rounded-xl overflow-hidden border-4 border-slate-900 shadow-2xl">
            <img src={aboutImages[1]} alt="Formación Cibermedida" className="w-full h-full object-cover" />
          </div>
          {/* Floating stat badge */}
          <div className="absolute -top-5 -left-5 md:-left-8 bg-cyan-400 text-slate-900 rounded-xl p-4 shadow-xl border-4 border-slate-900">
            <div className="text-3xl md:text-4xl font-black leading-none">5+</div>
            <div className="text-[10px] font-bold uppercase tracking-wider mt-1">Años de experiencia</div>
          </div>
          {/* Decorative ring */}
          <div className="absolute -z-0 -top-10 -right-10 w-32 h-32 rounded-full border-2 border-cyan-500/20 hidden lg:block"></div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <span className="inline-block px-5 py-2 rounded-full bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 text-xs font-bold tracking-[0.15em] uppercase">
            Sobre Cibermedida
          </span>
          <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Entidad especializada en formación técnica y transformación digital
          </h2>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed">
            Desarrollamos e impartimos programas formativos para empresas, centros de formación y administración pública, combinando experiencia técnica real con metodología docente estructurada.
          </p>

          {/* Pillars */}
          <ul className="space-y-3 pt-2">
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <li key={p.title} className="flex items-start gap-3 bg-slate-800/40 border border-slate-700/60 rounded-lg p-3 hover:border-cyan-500/40 transition-colors">
                  <div className="w-9 h-9 rounded-md bg-cyan-500/15 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shrink-0">
                    <Icon size={16} />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{p.title}</div>
                    <div className="text-slate-400 text-sm leading-snug">{p.desc}</div>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Mini stats */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
            <div>
              <div className="text-cyan-400 text-2xl md:text-3xl font-black">50+</div>
              <div className="text-slate-400 text-xs uppercase tracking-wider font-semibold mt-0.5">Empresas formadas</div>
            </div>
            <div>
              <div className="text-cyan-400 text-2xl md:text-3xl font-black">1.000+</div>
              <div className="text-slate-400 text-xs uppercase tracking-wider font-semibold mt-0.5">Alumnos capacitados</div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a href="/contacto" className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold hover:shadow-xl hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all">
              Solicitar información
            </a>
            <a href="/sobre-nosotros" className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-transparent border border-slate-600 text-slate-200 font-semibold hover:border-cyan-500 hover:text-cyan-400 transition-colors">
              Conocer al equipo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section id="soluciones" className="bg-slate-900 py-20 relative">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <span className="inline-block px-5 py-2 rounded-full bg-cyan-500 text-white text-xs font-bold tracking-[0.15em] uppercase">
            Servicios de Seguridad y Transformación Digital
          </span>
          <h2 className="text-white text-3xl md:text-5xl font-bold leading-tight">
            Protección, análisis y gestión avanzada de seguridad digital
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => {
            const Icon = iconMap[s.icon] || ShieldAlert;
            return (
              <Reveal key={i} delay={i * 60}
                className="group relative bg-slate-800/50 border border-slate-700 rounded-xl p-7 hover:border-cyan-500/60 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-cyan-500/5 rounded-full group-hover:bg-cyan-500/15 transition-colors"></div>
                <div className="flex justify-between items-start mb-6 relative">
                  <div className="w-14 h-14 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-colors">
                    <Icon size={26} />
                  </div>
                  <a
                    href="#"
                    className="text-xs font-semibold text-cyan-400 flex items-center gap-1 hover:text-cyan-300"
                  >
                    Read More <ChevronRight size={14} />
                  </a>
                </div>
                <h3 className="text-white text-lg font-bold mb-3 group-hover:text-cyan-400 transition-colors">
                  {s.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed line-clamp-4">
                  {s.desc}
                </p>
              </Reveal>
            );
          })}
        </div>

        <div className="flex justify-center mt-12">
          <button className="px-8 py-3.5 rounded-md bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold hover:shadow-xl hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all">
            Nuestras Soluciones
          </button>
        </div>
      </div>
    </section>
  );
}

export function OnlineSecurity() {
  const [billing, setBilling] = React.useState('monthly');
  return (
    <section id="recursos" className="bg-gradient-to-b from-violet-400 to-violet-500 py-20">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <div className="flex flex-col items-center gap-4 mb-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur rounded-full p-1">
            <span className="text-white font-semibold px-3">Bill</span>
            <button
              onClick={() => setBilling('monthly')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                billing === 'monthly' ? 'bg-white text-violet-600' : 'text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling('annually')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                billing === 'annually' ? 'bg-white text-violet-600' : 'text-white'
              }`}
            >
              Annually
            </button>
          </div>
          <span className="text-white text-xs font-bold tracking-[0.3em] uppercase">
            Seguridad Online
          </span>
          <div className="w-24 h-0.5 bg-white/40"></div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {onlineSolutions.map((s, i) => (
            <div key={i} className="bg-violet-300/40 rounded-xl overflow-hidden border border-white/20 hover:shadow-xl hover:-translate-y-1 transition-all group">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <div className="w-12 h-0.5 bg-white/60 mb-3"></div>
                <h3 className="text-white text-xl font-bold mb-2 group-hover:text-cyan-200 transition-colors">{s.title}</h3>
                <p className="text-white/80 text-sm leading-relaxed line-clamp-3">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <button className="px-8 py-3.5 rounded-md bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-900 font-semibold hover:shadow-xl hover:shadow-cyan-400/40 hover:-translate-y-0.5 transition-all">
            Preguntas online
          </button>
        </div>
      </div>
    </section>
  );
}

export function CyberAttacks() {
  return (
    <section id="noticias" className="bg-slate-900 py-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{
        background: 'radial-gradient(ellipse at top, rgba(34,211,238,0.3) 0%, transparent 60%)'
      }}></div>
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <span className="inline-block px-5 py-2 rounded-full bg-cyan-500 text-white text-xs font-bold tracking-[0.15em] uppercase">
            Tipos de Ciberataques
          </span>
          <h2 className="text-white text-3xl md:text-5xl font-bold leading-tight">
            Un ciberataque es un conjunto de acciones ofensivas contra sistemas de información
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cyberAttacks.map((a, i) => {
            const Icon = iconMap[a.icon] || Bug;
            return (
              <div key={i} className="relative bg-slate-800/60 border border-slate-700 rounded-xl p-6 hover:border-cyan-500/60 transition-all group">
                <Quote className="absolute top-4 right-4 text-cyan-500/60" size={32} />
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                    <Icon size={26} />
                  </div>
                  <div>
                    <h3 className="text-white text-xl font-bold">{a.title}</h3>
                    <div className="text-cyan-400 text-xs font-semibold mt-1">
                      Estadísticas {a.percent}%
                    </div>
                  </div>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-700 overflow-hidden mb-4">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-cyan-500 transition-all duration-1000"
                    style={{ width: `${a.percent}%` }}
                  />
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{a.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12 space-y-4">
          <span className="inline-block text-cyan-400 text-sm font-bold tracking-[0.2em] uppercase">
            Ataques Conocidos
          </span>
          <div>
            <button className="px-8 py-3.5 rounded-md bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold hover:shadow-xl hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all">
              Que mas desearia saber
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Guide() {
  return (
    <section id="politicas" className="bg-gradient-to-b from-slate-900 to-slate-800 py-20">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="inline-block px-5 py-2 rounded-full bg-cyan-500 text-white text-xs font-bold tracking-[0.15em] uppercase">
            Guía práctica ante incidentes
          </span>
          <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight">
            CIBERMEDIDA ofrece información detallada sobre cada uno de estos pasos, junto con recomendaciones adicionales para prevenir y mitigar los ciberataques
          </h2>
          <ul className="space-y-4 pt-4">
            {guideSteps.map((s, i) => (
              <li key={i} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-cyan-500 text-slate-900 font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <span className="text-slate-300 leading-relaxed">{s}</span>
              </li>
            ))}
          </ul>
          <div className="pt-4">
            <button className="px-8 py-3.5 rounded-md bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold hover:shadow-xl hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all">
              Consultar guía completa
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className={`rounded-lg overflow-hidden border-2 border-cyan-500/30 ${i === 1 ? 'mt-10' : ''}`}>
              <img
                src={`https://images.unsplash.com/photo-${['1563986768609-322da13575f3','1550751827-4bd374c3f58b','1526374965328-7f61d4dc18c5'][i]}?w=400&q=80`}
                alt=""
                className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Monitoring() {
  return (
    <section id="ia" className="relative py-20 overflow-hidden" style={{
      backgroundImage: 'linear-gradient(to bottom, #0f172a, #020617)',
    }}>
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=60)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        mixBlendMode: 'luminosity',
      }}></div>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 to-slate-900/90"></div>

      <div className="relative max-w-[1400px] mx-auto px-4 lg:px-8 text-center space-y-6">
        <span className="inline-block px-5 py-2 rounded-full bg-cyan-500 text-white text-xs font-bold tracking-[0.15em] uppercase">
          Monitorización global
        </span>
        <h2 className="text-white text-3xl md:text-5xl font-bold leading-tight max-w-4xl mx-auto">
          Actividad cibernética global en tiempo real
        </h2>

        <div className="relative mx-auto max-w-5xl aspect-[16/8] mt-8">
          <div className="absolute inset-0 rounded-2xl border border-cyan-500/30 bg-slate-950/60 overflow-hidden">
            <Globe className="absolute inset-0 m-auto text-cyan-400/20" size={400} strokeWidth={0.5} />
            {Array.from({ length: 18 }).map((_, i) => (
              <span
                key={i}
                className="absolute w-2 h-2 rounded-full bg-cyan-400 animate-ping"
                style={{
                  top: `${10 + (i * 37) % 80}%`,
                  left: `${5 + (i * 53) % 90}%`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: `${2 + (i % 3)}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function CTA() {
  return (
    <section id="preguntanos" className="bg-cyan-400 py-20">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 grid md:grid-cols-2 items-center gap-10">
        <div className="relative">
          <div className="rounded-2xl overflow-hidden aspect-square max-w-md mx-auto">
            <img
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="space-y-6">
          <h2 className="text-slate-900 text-3xl md:text-5xl font-bold leading-tight">
            Quieres preguntar algo sobre la Ciberseguridad
          </h2>
          <button className="px-8 py-3.5 rounded-md bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold hover:shadow-xl hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all">
            Empiece a preguntar
          </button>
        </div>
      </div>
    </section>
  );
}
