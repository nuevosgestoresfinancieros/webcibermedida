import React, { useState } from 'react';
import { Search, Facebook, Linkedin, Youtube, MessageCircle, Menu, X } from 'lucide-react';
import { navLinks } from '../mock';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-cyan-400 shadow-sm">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 flex items-center justify-between h-[88px]">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 shrink-0">
          <div className="flex flex-col items-center leading-tight">
            <div className="flex items-center gap-2">
              <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                <div className="w-7 h-7 rounded-full border-2 border-cyan-300"></div>
                <div className="absolute inset-0 m-auto w-1.5 h-1.5 rounded-full bg-cyan-300"></div>
              </div>
              <span className="font-black text-slate-900 text-xl tracking-wide">CIBERMEDIDA</span>
            </div>
            <span className="text-[10px] font-semibold text-slate-800 mt-0.5 tracking-wider">Servicios De Ciberseguridad</span>
          </div>
        </a>

        {/* Nav */}
        <nav className="hidden xl:flex items-center gap-6">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-[14px] font-medium text-slate-900 hover:text-white transition-colors relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="w-[120px] h-10 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 text-white flex items-center justify-center hover:shadow-lg hover:shadow-purple-400/40 transition-all"
            aria-label="Search"
          >
            <Search size={18} />
          </button>

          <div className="hidden md:flex items-center gap-2">
            {[Facebook, Linkedin, Youtube, MessageCircle].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 text-white flex items-center justify-center hover:scale-110 transition-transform"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>

          <button
            className="xl:hidden p-2 text-slate-900"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="absolute top-[88px] right-4 w-80 bg-white shadow-xl rounded-md p-3 border border-slate-200">
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full px-3 py-2 border border-slate-300 rounded outline-none focus:border-cyan-500"
          />
        </div>
      )}

      {open && (
        <div className="xl:hidden bg-cyan-400 border-t border-cyan-500">
          <nav className="flex flex-col px-4 py-3 gap-2">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-2 text-slate-900 font-medium border-b border-cyan-500/40"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
