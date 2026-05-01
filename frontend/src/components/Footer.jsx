import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Linkedin, Youtube, MessageCircle, Mail, Phone, MapPin, X } from 'lucide-react';
import { navLinks } from '../mock';

export default function Footer() {
  const [cookieVisible, setCookieVisible] = useState(true);

  return (
    <>
      <footer id="contacto" className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
            <div className="space-y-4">
              <Link to="/" className="inline-block">
                <img
                  src="/logo-cibermedida.png"
                  alt="Cibermedida"
                  className="h-20 w-auto object-contain"
                />
              </Link>
              <p className="text-sm text-slate-400 leading-relaxed">
                Entidad especializada en formación técnica y transformación digital para empresas, centros formativos y administraciones públicas.
              </p>
              <div className="flex items-center gap-2 pt-2">
                {[Facebook, Linkedin, Youtube, MessageCircle].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-9 h-9 rounded-full bg-slate-800 hover:bg-cyan-500 text-white flex items-center justify-center transition-colors"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Servicios</h4>
              <ul className="space-y-2 text-sm">
                {['Ciberseguridad', 'Inteligencia Artificial', 'Marketing Digital', 'Protección de datos', 'Auditorías', 'Formación TIC'].map((s) => (
                  <li key={s}>
                    <a href="#" className="hover:text-cyan-400 transition-colors">{s}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Enlaces</h4>
              <ul className="space-y-2 text-sm">
                {navLinks.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="hover:text-cyan-400 transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Contacto</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="text-cyan-400 mt-0.5 shrink-0" />
                  <span>España, Madrid</span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail size={16} className="text-cyan-400 mt-0.5 shrink-0" />
                  <a href="mailto:info@cibermedida.es" className="hover:text-cyan-400">info@cibermedida.es</a>
                </li>
                <li className="flex items-start gap-3">
                  <Phone size={16} className="text-cyan-400 mt-0.5 shrink-0" />
                  <a href="tel:+34000000000" className="hover:text-cyan-400">+34 000 000 000</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <p>© 2026 Cibermedida. Todos los derechos reservados.</p>
            <div className="flex gap-5">
              <a href="#" className="hover:text-cyan-400">Aviso legal</a>
              <a href="#" className="hover:text-cyan-400">Privacidad</a>
              <a href="#" className="hover:text-cyan-400">Cookies</a>
            </div>
          </div>
        </div>
      </footer>

      {cookieVisible && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-cyan-400 border-t-2 border-cyan-500 shadow-2xl">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-4 flex flex-col lg:flex-row items-start lg:items-center gap-4">
            <p className="text-slate-900 text-xs lg:text-sm flex-1">
              Esta web utiliza cookies propias y de terceros para su correcto funcionamiento y para fines analíticos. Contiene enlaces a sitios web de terceros con políticas de privacidad ajenas que podrás aceptar o no cuando accedas a ellos. Al hacer clic en el botón Aceptar, acepta el uso de estas tecnologías y el procesamiento de tus datos para estos propósitos.
            </p>
            <div className="flex items-center gap-2 shrink-0">
              <button className="px-4 py-2 border-2 border-slate-900 text-slate-900 text-xs font-bold uppercase tracking-wider hover:bg-slate-900 hover:text-white transition-colors">
                Más información
              </button>
              <button
                onClick={() => setCookieVisible(false)}
                className="px-4 py-2 border-2 border-slate-900 text-slate-900 text-xs font-bold uppercase tracking-wider hover:bg-slate-900 hover:text-white transition-colors"
              >
                Rechazar
              </button>
              <button
                onClick={() => setCookieVisible(false)}
                className="px-4 py-2 bg-teal-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-teal-700 transition-colors"
              >
                Aceptar
              </button>
              <button onClick={() => setCookieVisible(false)} className="p-2 text-slate-900 hover:text-white" aria-label="close">
                <X size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
