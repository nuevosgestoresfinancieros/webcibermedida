import React from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import Hero from './Hero';
import {
  WhyCibermedida, About, Services, OnlineSecurity,
  CyberAttacks, Guide, Monitoring, CTA,
} from './Sections';

/* Small helper for consistent page headers */
function PageHeader({ tag, title, subtitle }) {
  return (
    <section className="bg-cyan-400 py-16">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 text-center space-y-4">
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

/* Page: Cibermedida (home) */
export function CibermedidaPage() {
  return (
    <>
      <Hero />
      <WhyCibermedida />
      <About />
    </>
  );
}

export function SolucionesPage() {
  return (
    <>
      <PageHeader
        tag="Soluciones"
        title="Protección, análisis y gestión avanzada de seguridad digital"
        subtitle="Servicios especializados para blindar tu infraestructura tecnológica frente a las amenazas actuales."
      />
      <Services />
    </>
  );
}

export function RecursosPage() {
  return (
    <>
      <PageHeader
        tag="Recursos"
        title="Seguridad Online y herramientas de protección"
        subtitle="Catálogo de soluciones anti-malware y recursos prácticos para proteger tu organización."
      />
      <OnlineSecurity />
    </>
  );
}

export function IAPage() {
  return (
    <>
      <PageHeader
        tag="Inteligencia Artificial"
        title="Monitorización global e IA aplicada a la ciberseguridad"
        subtitle="Detección, análisis y respuesta automatizada con algoritmos de IA en tiempo real."
      />
      <Monitoring />
    </>
  );
}

export function PreguntanosPage() {
  return (
    <>
      <PageHeader
        tag="Preguntanos"
        title="Resolvemos tus dudas sobre ciberseguridad"
        subtitle="Consulta nuestro chatbot especializado o envíanos tu pregunta directamente."
      />
      <CTA />
    </>
  );
}

export function NoticiasPage() {
  return (
    <>
      <PageHeader
        tag="Noticias"
        title="Tipos de ciberataques y estadísticas actuales"
        subtitle="Mantente informado sobre las amenazas más frecuentes y su impacto en las organizaciones."
      />
      <CyberAttacks />
    </>
  );
}

export function PoliticasPage() {
  return (
    <>
      <PageHeader
        tag="Políticas"
        title="Guía práctica ante incidentes de seguridad"
        subtitle="Protocolos y procedimientos para prevenir, contener y gestionar ciberincidentes."
      />
      <Guide />
    </>
  );
}

export function ContactoPage() {
  return (
    <>
      <PageHeader
        tag="Contacto"
        title="Hablemos sobre tu proyecto de ciberseguridad"
        subtitle="Estamos disponibles para resolver tus consultas y diseñar la formación que tu organización necesita."
      />
      <section className="bg-slate-900 py-20">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-10">
          {/* Info */}
          <div className="space-y-6">
            <h2 className="text-white text-3xl font-bold">Información de contacto</h2>
            <p className="text-slate-300 leading-relaxed">
              Si quieres saber más sobre nuestros programas formativos o servicios, contacta con nosotros a través de cualquiera de estos canales.
            </p>
            <ul className="space-y-5">
              {[
                { Icon: MapPin, title: 'Dirección', text: 'Madrid, España' },
                { Icon: Mail, title: 'Email', text: 'info@cibermedida.es' },
                { Icon: Phone, title: 'Teléfono', text: '+34 000 000 000' },
                { Icon: Clock, title: 'Horario', text: 'Lun – Vie, 9:00 – 18:00' },
              ].map(({ Icon, title, text }) => (
                <li key={title} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shrink-0">
                    <Icon size={22} />
                  </div>
                  <div>
                    <div className="text-white font-semibold">{title}</div>
                    <div className="text-slate-400">{text}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Gracias por contactarnos. Te responderemos en breve.');
            }}
            className="bg-slate-800/60 border border-slate-700 rounded-xl p-8 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-300 mb-1">Nombre</label>
                <input required className="w-full px-4 py-3 rounded-md bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-500" />
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-1">Empresa</label>
                <input className="w-full px-4 py-3 rounded-md bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">Email</label>
              <input required type="email" className="w-full px-4 py-3 rounded-md bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-500" />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">Mensaje</label>
              <textarea required rows={5} className="w-full px-4 py-3 rounded-md bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-500 resize-none" />
            </div>
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-md bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold hover:shadow-xl hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all"
            >
              <Send size={18} /> Enviar mensaje
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
