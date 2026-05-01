import React, { useState, useMemo } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { faqs, faqCategories } from '../mock';

export default function FAQPage() {
  const [cat, setCat] = useState('Todas');
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(null);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return faqs.filter((f) => (cat === 'Todas' || f.category === cat) &&
      (!query || f.question.toLowerCase().includes(query) || f.answer.toLowerCase().includes(query)));
  }, [cat, q]);

  return (
    <>
      <PageHeader tag="FAQ" title="Preguntas frecuentes" subtitle="Resuelve tus dudas sobre nuestros servicios, formación y metodología." />
      <section className="bg-slate-900 py-16">
        <div className="max-w-[900px] mx-auto px-4 lg:px-8">
          {/* Filters */}
          <div className="flex flex-col md:flex-row md:items-center gap-3 mb-8">
            <div className="flex-1 flex flex-wrap gap-2">
              {faqCategories.map((c) => (
                <button key={c} onClick={() => setCat(c)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                    cat === c
                      ? 'bg-cyan-500 text-slate-900 border-cyan-500'
                      : 'bg-slate-800/60 text-slate-300 border-slate-700 hover:border-cyan-500/60'
                  }`}>{c}</button>
              ))}
            </div>
            <div className="relative md:w-64">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar..." aria-label="Buscar FAQ"
                className="w-full pl-9 pr-3 py-2.5 rounded-md bg-slate-800 border border-slate-700 text-white text-sm outline-none focus:border-cyan-500 placeholder:text-slate-500" />
            </div>
          </div>

          <div className="space-y-3">
            {filtered.length === 0 && (
              <p className="text-center text-slate-500 py-12">No se encontraron preguntas con esos criterios.</p>
            )}
            {filtered.map((f) => {
              const isOpen = open === f.id;
              return (
                <div key={f.id} className={`rounded-xl border bg-slate-800/50 overflow-hidden transition-colors ${isOpen ? 'border-cyan-500/60' : 'border-slate-700'}`}>
                  <button onClick={() => setOpen(isOpen ? null : f.id)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left"
                    aria-expanded={isOpen}>
                    <span className="text-white font-semibold">{f.question}</span>
                    <ChevronDown size={18} className={`text-cyan-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden">
                      <p className="text-slate-300 leading-relaxed px-5 pb-5">{f.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12 p-6 rounded-xl bg-gradient-to-r from-cyan-500/15 to-violet-500/15 border border-cyan-500/30">
            <p className="text-white text-lg font-semibold">¿Tu pregunta no está aquí?</p>
            <p className="text-slate-300 text-sm mt-1">Usa el chat de la esquina inferior izquierda o contacta con nosotros.</p>
          </div>
        </div>
      </section>
    </>
  );
}
