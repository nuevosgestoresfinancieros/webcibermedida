import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  Search, Facebook, Linkedin, Youtube, MessageCircle, Menu, X,
  Mail, Phone, Sun, Moon, Clock,
} from 'lucide-react';
import { navLinks } from '../mock';
import useTheme from '../hooks/useTheme';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const { pathname } = useLocation();

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') { setOpen(false); setSearchOpen(false); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header className="sticky top-0 z-50 shadow-lg">
      {/* ========== Top utility bar ========== */}
      <div className="hidden md:block bg-slate-900 text-slate-300 text-xs">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex items-center justify-between h-10">
          <div className="flex items-center gap-8">
            <a
              href="mailto:jfloradmin@cibermedida.es"
              className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
            >
              <Mail size={13} className="text-cyan-400" />
              <span>jfloradmin@cibermedida.es</span>
            </a>
            <a
              href="tel:+34687216537"
              className="hidden lg:flex items-center gap-2 hover:text-cyan-400 transition-colors"
            >
              <Phone size={13} className="text-cyan-400" />
              <span>+34 687 216 537</span>
            </a>
            <span className="hidden xl:flex items-center gap-2 text-slate-400">
              <Clock size={13} className="text-cyan-400" />
              <span>Lun – Vie, 9:00 – 18:00</span>
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="hidden lg:inline mr-3 text-slate-500 text-[11px] uppercase tracking-wider">Síguenos:</span>
            {[
              { Icon: Facebook, label: 'Facebook' },
              { Icon: Linkedin, label: 'LinkedIn' },
              { Icon: Youtube, label: 'YouTube' },
              { Icon: MessageCircle, label: 'WhatsApp' },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="w-7 h-7 rounded-full text-slate-400 hover:text-cyan-400 hover:bg-slate-800 flex items-center justify-center transition-colors"
              >
                <Icon size={13} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ========== Main bar ========== */}
      <div className="bg-cyan-400">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-10 h-[84px] md:h-[96px] flex items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0" aria-label="Cibermedida - Inicio">
            <img
              src="/logo-cibermedida.png"
              alt="Cibermedida"
              className="h-11 md:h-14 lg:h-16 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav (only >= 2xl / 1536px to avoid cramping) */}
          <nav className="hidden 2xl:flex items-center gap-8 flex-1 justify-center" aria-label="Navegación principal">
            {navLinks.map((l) => (
              <NavLink
                key={l.label}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `relative group uppercase text-[11px] font-semibold tracking-[0.12em] whitespace-nowrap transition-colors ${
                    isActive ? 'text-white' : 'text-slate-900 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    <span
                      className={`absolute -bottom-2 left-0 h-[2px] bg-white transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            {/* Action buttons group with subtle divider on md+ */}
            <div className="flex items-center gap-2 md:pr-3 md:border-r md:border-slate-900/15">
              <button
                onClick={toggle}
                aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
                className="w-10 h-10 rounded-full text-slate-900 hover:bg-slate-900 hover:text-cyan-300 flex items-center justify-center transition-colors"
                title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
              >
                {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
              </button>

              <button
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Buscar"
                aria-expanded={searchOpen}
                className="w-10 h-10 rounded-full text-slate-900 hover:bg-slate-900 hover:text-cyan-300 flex items-center justify-center transition-colors"
                title="Buscar"
              >
                <Search size={17} />
              </button>
            </div>

            {/* CTA Contact button (desktop only, non-cramped) */}
            <Link
              to="/contacto"
              className="hidden lg:inline-flex items-center gap-2 px-5 h-10 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 text-white text-xs font-bold uppercase tracking-wider hover:shadow-lg hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all whitespace-nowrap"
            >
              <Phone size={13} /> Contactar
            </Link>

            {/* Hamburger (always visible below 2xl) */}
            <button
              onClick={() => setOpen(true)}
              aria-label="Abrir menú"
              aria-expanded={open}
              aria-controls="mobile-drawer"
              className="2xl:hidden w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-slate-800 transition-colors"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* ========== Search popover ========== */}
      {searchOpen && (
        <div className="absolute right-4 md:right-6 lg:right-10 top-full mt-2 w-80 bg-white shadow-2xl rounded-lg p-4 border border-slate-200 z-50">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              autoFocus
              placeholder="¿Qué estás buscando?"
              aria-label="Buscar en el sitio"
              className="w-full pl-9 pr-3 py-2.5 rounded-md bg-slate-50 border border-slate-200 text-slate-900 outline-none focus:border-cyan-500"
            />
          </div>
        </div>
      )}

      {/* ========== Drawer (mobile + tablet + normal desktop) ========== */}
      <div
        id="mobile-drawer"
        className={`2xl:hidden fixed inset-0 z-[60] transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!open}
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="Cerrar menú"
          className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
        />
        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
          className={`absolute top-0 right-0 bottom-0 w-[88%] sm:w-[420px] bg-slate-900 shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between p-4 bg-cyan-400 border-b border-cyan-500">
            <img src="/logo-cibermedida.png" alt="Cibermedida" className="h-10 w-auto" />
            <button
              onClick={() => setOpen(false)}
              aria-label="Cerrar menú"
              className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center"
            >
              <X size={18} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto py-3" aria-label="Menú principal">
            {navLinks.map((l) => (
              <NavLink
                key={l.label}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `flex items-center px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] border-l-4 transition-all ${
                    isActive
                      ? 'border-cyan-400 bg-cyan-500/10 text-cyan-300'
                      : 'border-transparent text-slate-300 hover:border-cyan-500/60 hover:bg-slate-800/50 hover:text-white'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="p-5 border-t border-slate-800 bg-slate-950 space-y-3 text-sm">
            <Link
              to="/contacto"
              className="flex items-center justify-center gap-2 py-3 rounded-md bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold uppercase tracking-wider text-xs"
            >
              <Phone size={14} /> Contactar ahora
            </Link>
            <a href="mailto:jfloradmin@cibermedida.es" className="flex items-center gap-2 text-slate-300 hover:text-cyan-400">
              <Mail size={14} className="text-cyan-400" /> jfloradmin@cibermedida.es
            </a>
            <a href="tel:+34687216537" className="flex items-center gap-2 text-slate-300 hover:text-cyan-400">
              <Phone size={14} className="text-cyan-400" /> +34 687 216 537
            </a>
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <Clock size={13} /> Lun – Vie, 9:00 – 18:00
            </div>
            <div className="flex items-center gap-2 pt-3 border-t border-slate-800">
              {[Facebook, Linkedin, Youtube, MessageCircle].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-slate-800 text-slate-300 hover:bg-cyan-500 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Red social"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </header>
  );
}
