import React from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import Hero from './Hero';
import PageHeader from './PageHeader';
import ContactForm from './ContactForm';
import {
  WhyCibermedida, About, Services, OnlineSecurity,
  CyberAttacks, Guide, Monitoring, CTA,
} from './Sections';

/* PageHeader moved to shared component with Breadcrumbs */

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
                { Icon: Mail, title: 'Email', text: 'jfloradmin@cibermedida.es', href: 'mailto:jfloradmin@cibermedida.es' },
                { Icon: Phone, title: 'Teléfono', text: '+34 687 216 537', href: 'tel:+34687216537' },
                { Icon: Clock, title: 'Horario', text: 'Lun – Vie, 9:00 – 18:00' },
              ].map(({ Icon, title, text, href }) => (
                <li key={title} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shrink-0">
                    <Icon size={22} />
                  </div>
                  <div>
                    <div className="text-white font-semibold">{title}</div>
                    {href ? (
                      <a href={href} className="text-slate-400 hover:text-cyan-400 transition-colors">{text}</a>
                    ) : (
                      <div className="text-slate-400">{text}</div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
