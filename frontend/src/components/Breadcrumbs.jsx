import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ChevronRight } from 'lucide-react';
import { navLinks } from '../mock';

const labelFor = (pathname) => {
  if (pathname === '/') return 'Cibermedida';
  const match = navLinks.find((n) => n.to === pathname);
  if (match) return match.label;
  return pathname.replace(/^\//, '').replace(/-/g, ' ');
};

export default function Breadcrumbs({ className = '' }) {
  const { pathname } = useLocation();
  if (pathname === '/') return null;
  const current = labelFor(pathname);

  return (
    <nav
      aria-label="breadcrumb"
      className={`flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-800/90 ${className}`}
    >
      <Link to="/" className="flex items-center gap-1 hover:text-slate-900 font-semibold">
        <Home size={14} />
        <span>Inicio</span>
      </Link>
      <ChevronRight size={14} className="text-slate-800/60" />
      <span className="font-semibold text-slate-900 capitalize truncate max-w-[220px] sm:max-w-none">
        {current}
      </span>
    </nav>
  );
}
