import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { api } from '../utils/api';

const initial = { name: '', company: '', email: '', phone: '', message: '' };

export default function ContactForm() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setError('');
    try {
      await api.post('/contact', {
        name: form.name,
        company: form.company || null,
        email: form.email,
        phone: form.phone || null,
        message: form.message,
      });
      setStatus('success');
      setForm(initial);
      setTimeout(() => setStatus('idle'), 6000);
    } catch (err) {
      setStatus('error');
      const detail = err?.response?.data?.detail;
      setError(
        typeof detail === 'string'
          ? detail
          : Array.isArray(detail)
            ? detail.map((d) => d.msg).join(', ')
            : 'No se pudo enviar el mensaje. Inténtalo de nuevo.'
      );
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="bg-slate-800/60 border border-slate-700 rounded-xl p-8 space-y-5"
    >
      {status === 'success' && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-md bg-cyan-500/10 border border-cyan-500/40 text-cyan-300 text-sm">
          <CheckCircle2 size={18} /> Gracias por escribirnos. Hemos recibido tu mensaje y te responderemos en breve.
        </div>
      )}
      {status === 'error' && (
        <div className="flex items-start gap-2 px-4 py-3 rounded-md bg-red-500/10 border border-red-500/40 text-red-300 text-sm">
          <AlertCircle size={18} className="mt-0.5 shrink-0" /> {error}
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-slate-300 mb-1">Nombre <span className="text-red-400">*</span></label>
          <input
            required
            value={form.name}
            onChange={update('name')}
            className="w-full px-4 py-3 rounded-md bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-500"
          />
        </div>
        <div>
          <label className="block text-sm text-slate-300 mb-1">Empresa</label>
          <input
            value={form.company}
            onChange={update('company')}
            className="w-full px-4 py-3 rounded-md bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-500"
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-slate-300 mb-1">Email <span className="text-red-400">*</span></label>
          <input
            type="email"
            required
            value={form.email}
            onChange={update('email')}
            className="w-full px-4 py-3 rounded-md bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-500"
          />
        </div>
        <div>
          <label className="block text-sm text-slate-300 mb-1">Teléfono</label>
          <input
            type="tel"
            value={form.phone}
            onChange={update('phone')}
            className="w-full px-4 py-3 rounded-md bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-500"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm text-slate-300 mb-1">Mensaje <span className="text-red-400">*</span></label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={update('message')}
          className="w-full px-4 py-3 rounded-md bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-500 resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-md bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold hover:shadow-xl hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all disabled:opacity-60"
      >
        <Send size={18} /> {status === 'loading' ? 'Enviando...' : 'Enviar mensaje'}
      </button>
    </form>
  );
}
