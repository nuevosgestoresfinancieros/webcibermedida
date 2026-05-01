import React, { useState, useMemo } from 'react';
import { ExternalLink, Github, Search, Folder } from 'lucide-react';
import { projects, projectCategories } from '../mock';

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

export default function ProyectosPage() {
  const [category, setCategory] = useState('Todos');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchCat = category === 'Todos' || p.category === category;
      const q = query.trim().toLowerCase();
      const matchQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchQuery;
    });
  }, [category, query]);

  return (
    <>
      <PageHeader
        tag="Proyectos"
        title="Apps y proyectos publicados por Cibermedida"
        subtitle="Catálogo de aplicaciones y soluciones desplegadas por nuestro equipo en entornos reales."
      />

      <section className="bg-slate-900 py-16">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          {/* Filters */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-10">
            <div className="flex flex-wrap gap-2">
              {projectCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                    category === cat
                      ? 'bg-cyan-500 text-slate-900 border-cyan-500'
                      : 'bg-slate-800/60 text-slate-300 border-slate-700 hover:border-cyan-500/60 hover:text-cyan-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full lg:w-80">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar proyecto o tecnología..."
                className="w-full pl-10 pr-4 py-2.5 rounded-md bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <Folder size={48} className="mx-auto text-slate-600 mb-4" />
              <p className="text-slate-400">No se encontraron proyectos con esos criterios.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p) => (
                <article
                  key={p.id}
                  className="group flex flex-col bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden hover:border-cyan-500/60 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-cyan-500 text-slate-900 text-xs font-bold">
                      {p.category}
                    </span>
                  </div>

                  <div className="p-6 flex flex-col flex-1 gap-4">
                    <h3 className="text-white text-xl font-bold group-hover:text-cyan-400 transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 flex-1">
                      {p.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-slate-700">
                      <a
                        href={p.appUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-gradient-to-r from-violet-500 to-purple-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                      >
                        <ExternalLink size={15} /> Ver app
                      </a>
                      {p.repoUrl && (
                        <a
                          href={p.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-slate-900 border border-slate-700 text-slate-200 text-sm font-semibold hover:border-cyan-500/60 hover:text-cyan-300 transition-all"
                          aria-label="Repositorio"
                        >
                          <Github size={15} /> Repo
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          <p className="text-center text-slate-500 text-sm mt-10">
            Mostrando {filtered.length} de {projects.length} proyectos
          </p>
        </div>
      </section>
    </>
  );
}
