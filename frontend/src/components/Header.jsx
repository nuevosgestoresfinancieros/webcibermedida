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

  // Close drawer on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  // Prevent body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close drawer with ESC
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') { setOpen(false); setSearchOpen(false); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header className="sticky top-0 z-50 shadow-md">
      {/* Top utility bar */}
      <div className="hidden md:block bg-slate-900 text-slate-300 text-xs">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex items-center justify-between h-9">
          <div className="flex items-center gap-6">
            <a href="mailto:jfloradmin@cibermedida.es" className="flex items-center gap-2 hover:text-cyan-400 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400 rounded">
              <Mail size={13} /> jfloradmin@cibermedida.es
            </a>
            <a href="tel:+34687216537" className="hidden lg:flex items-center gap-2 hover:text-cyan-400 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400 rounded">
              <Phone size={13} /> +34 687 216 537
            </a>
            <span className="hidden lg:flex items-center gap-2 text-slate-400">
              <Clock size={13} /> Lun – Vie, 9:00 – 18:00
            </span>
          </div>
          <div className="flex items-center gap-3">
            {[Facebook, Linkedin, Youtube, MessageCircle].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="text-slate-400 hover:text-cyan-400 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400 rounded"
                aria-label="Red social"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="bg-cyan-400">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-10 flex items-center justify-between gap-4 py-3 md:py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-slate-900 rounded">
            <img
              src="/logo-cibermedida.png"
              alt="Cibermedida - Inicio"
              className="h-10 md:h-12 lg:h-14 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav (only >=xl) */}
          <nav className="hidden xl:flex items-center gap-7" aria-label="Navegación principal">
            {navLinks.map((l) => (
              <NavLink
                key={l.label}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `relative group uppercase text-[11px] font-semibold tracking-[0.14em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-slate-900 rounded ${
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
                    ></span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-slate-900/10 border border-slate-900/20 text-slate-900 flex items-center justify-center hover:bg-slate-900 hover:text-cyan-300 transition-all shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-slate-900"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 text-white flex items-center justify-center hover:shadow-lg hover:shadow-purple-400/40 transition-all shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
              aria-label="Buscar"
              aria-expanded={searchOpen}
            >
              <Search size={16} />
            </button>

            <button
              className="xl:hidden w-9 h-9 md:w-10 md:h-10 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
              onClick={() => setOpen(true)}
              aria-label="Abrir menú"
              aria-expanded={open}
              aria-controls="mobile-drawer"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Search popover */}
      {searchOpen && (
        <div className="absolute right-4 md:right-6 lg:right-10 top-full mt-2 w-80 bg-white shadow-xl rounded-md p-3 border border-slate-200 z-50">
          <input
            type="text"
            autoFocus
            placeholder="Buscar..."
            aria-label="Buscar en el sitio"
            className="w-full px-3 py-2 border border-slate-300 rounded outline-none focus:border-cyan-500"
          />
        </div>
      )}

      {/* Mobile/Tablet drawer */}
      <div
        id="mobile-drawer"
        className={`xl:hidden fixed inset-0 z-[60] transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!open}
      >
        {/* Backdrop */}
        <button
          onClick={() => setOpen(false)}
          aria-label="Cerrar menú"
          className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
        />
        {/* Panel */}
        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
          className={`absolute top-0 right-0 bottom-0 w-[85%] max-w-sm bg-slate-900 shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between p-4 bg-cyan-400 border-b border-cyan-500">
            <img src="/logo-cibermedida.png" alt="Cibermedida" className="h-10 w-auto" />
            <button
              onClick={() => setOpen(false)}
              aria-label="Cerrar menú"
              className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            >
              <X size={18} />
            </button>
          </div>

          {/* Nav items */}
          <nav className="flex-1 overflow-y-auto py-4" aria-label="Menú principal móvil">
            {navLinks.map((l, i) => (
              <NavLink
                key={l.label}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] border-l-4 transition-all ${
                    isActive
                      ? 'border-cyan-400 bg-cyan-500/10 text-cyan-300'
                      : 'border-transparent text-slate-300 hover:border-cyan-500/60 hover:bg-slate-800/50 hover:text-white'
                  }`
                }
                style={{ transitionDelay: open ? `${i * 30}ms` : '0ms' }}
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* Drawer footer with contact */}
          <div className="p-4 border-t border-slate-800 bg-slate-950 space-y-2 text-sm">
            <a href="mailto:jfloradmin@cibermedida.es" className="flex items-center gap-2 text-slate-300 hover:text-cyan-400">
              <Mail size={14} className="text-cyan-400" /> jfloradmin@cibermedida.es
            </a>
            <a href="tel:+34687216537" className="flex items-center gap-2 text-slate-300 hover:text-cyan-400">
              <Phone size={14} className="text-cyan-400" /> +34 687 216 537
            </a>
            <div className="flex items-center gap-2 text-slate-400 text-xs pt-1">
              <Clock size={13} /> Lun – Vie, 9:00 – 18:00
            </div>
            <div className="flex items-center gap-3 pt-3 border-t border-slate-800">
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
