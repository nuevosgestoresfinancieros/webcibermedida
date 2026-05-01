import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Search } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import { blogPosts, blogCategories } from '../mock';

export default function BlogPage() {
  const [cat, setCat] = useState('Todos');
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return blogPosts.filter((p) => (cat === 'Todos' || p.category === cat) &&
      (!query || p.title.toLowerCase().includes(query) || p.excerpt.toLowerCase().includes(query)));
  }, [cat, q]);

  return (
    <>
      <PageHeader tag="Blog" title="Artículos y novedades" subtitle="Mantente al día sobre ciberseguridad, IA y transformación digital." />
      <section className="bg-slate-900 py-16">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center gap-3 mb-8">
            <div className="flex-1 flex flex-wrap gap-2">
              {blogCategories.map((c) => (
                <button key={c} onClick={() => setCat(c)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                    cat === c ? 'bg-cyan-500 text-slate-900 border-cyan-500' : 'bg-slate-800/60 text-slate-300 border-slate-700 hover:border-cyan-500/60'
                  }`}>{c}</button>
              ))}
            </div>
            <div className="relative md:w-64">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar artículo..." aria-label="Buscar"
                className="w-full pl-9 pr-3 py-2.5 rounded-md bg-slate-800 border border-slate-700 text-white text-sm outline-none focus:border-cyan-500 placeholder:text-slate-500" />
            </div>
          </div>

          {filtered.length === 0 ? (
            <p className="text-center text-slate-500 py-16">No se encontraron artículos.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p, i) => (
                <Reveal key={p.id} delay={i * 60}
                  className="group bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden hover:border-cyan-500/60 hover:-translate-y-1 transition-all">
                  <Link to={`/blog/${p.slug}`} className="block">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-5 space-y-3">
                      <span className="inline-block px-2.5 py-1 text-[10px] font-bold rounded bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 uppercase tracking-wider">{p.category}</span>
                      <h3 className="text-white font-bold text-lg leading-tight group-hover:text-cyan-400 transition-colors line-clamp-2">{p.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">{p.excerpt}</p>
                      <div className="flex items-center justify-between pt-3 border-t border-slate-700 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><Calendar size={11}/> {p.date}</span>
                        <span className="flex items-center gap-1"><Clock size={11}/> {p.readTime}</span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-cyan-400 text-sm font-semibold group-hover:gap-2 transition-all">
                        Leer más <ArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
