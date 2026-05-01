import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Search, Facebook, Linkedin, Youtube, MessageCircle, Menu, X, Mail, Phone, Sun, Moon, User, LogIn } from 'lucide-react';
import { navLinks } from '../mock';
import useTheme from '../hooks/useTheme';
import { useUserAuth } from '../contexts/UserAuthContext';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const { user } = useUserAuth();

  return (
    <header className="sticky top-0 z-50 shadow-md">
      {/* Top utility bar */}
      <div className="hidden md:block bg-slate-900 text-slate-300 text-xs">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex items-center justify-between h-9">
          <div className="flex items-center gap-6">
            <a href="mailto:info@cibermedida.es" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
              <Mail size={13} /> info@cibermedida.es
            </a>
            <span className="flex items-center gap-2">
              <Phone size={13} /> +34 000 000 000
            </span>
          </div>
          <div className="flex items-center gap-3">
            {[Facebook, Linkedin, Youtube, MessageCircle].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="text-slate-400 hover:text-cyan-400 transition-colors"
                aria-label="social"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="bg-cyan-400">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex items-center justify-between gap-6 py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              src="/logo-cibermedida.png"
              alt="Cibermedida"
              className="h-12 lg:h-14 w-auto object-contain"
            />
          </Link>

          {/* Nav */}
          <nav className="hidden xl:flex items-center gap-7">
            {navLinks.map((l) => (
              <NavLink
                key={l.label}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `relative group uppercase text-[11px] font-semibold tracking-[0.14em] transition-colors ${
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
            <Link
              to={user ? '/cuenta' : '/login'}
              aria-label={user ? 'Mi cuenta' : 'Iniciar sesión'}
              title={user ? `Mi cuenta (${user.name})` : 'Iniciar sesión'}
              className="hidden sm:inline-flex items-center gap-2 px-3 h-10 rounded-full bg-slate-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-slate-800 transition-colors"
            >
              {user ? <User size={14} /> : <LogIn size={14} />}
              <span>{user ? user.name.split(' ')[0] : 'Entrar'}</span>
            </Link>

            <button
              onClick={toggle}
              aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              className="w-10 h-10 rounded-full bg-slate-900/10 border border-slate-900/20 text-slate-900 flex items-center justify-center hover:bg-slate-900 hover:text-cyan-300 transition-all shrink-0"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 text-white flex items-center justify-center hover:shadow-lg hover:shadow-purple-400/40 transition-all shrink-0"
              aria-label="Buscar"
            >
              <Search size={16} />
            </button>

            <button
              className="xl:hidden p-2 text-slate-900 shrink-0"
              onClick={() => setOpen(!open)}
              aria-label="menu"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Search popover */}
      {searchOpen && (
        <div className="absolute right-6 lg:right-10 top-full mt-2 w-80 bg-white shadow-xl rounded-md p-3 border border-slate-200 z-50">
          <input
            type="text"
            autoFocus
            placeholder="Buscar..."
            className="w-full px-3 py-2 border border-slate-300 rounded outline-none focus:border-cyan-500"
          />
        </div>
      )}

      {/* Mobile nav */}
      {open && (
        <div className="xl:hidden bg-cyan-400 border-t border-cyan-500">
          <nav className="flex flex-col px-6 py-3">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-3 text-slate-900 text-sm font-semibold uppercase tracking-[0.14em] border-b border-cyan-500/40 last:border-b-0"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
