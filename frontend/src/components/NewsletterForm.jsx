import React, { useState } from 'react';
import { Mail, Send, Check } from 'lucide-react';
import { api } from '../utils/api';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');
    setError('');
    try {
      await api.post('/newsletter', { email: email.trim() });
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 4000);
    } catch (err) {
      setStatus('error');
      setError(err?.response?.data?.detail?.[0]?.msg || 'Email no válido');
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            className="w-full pl-9 pr-3 py-2.5 rounded-md bg-slate-900 border border-slate-700 text-white text-sm outline-none focus:border-cyan-500 placeholder:text-slate-500"
            aria-label="Email para newsletter"
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="shrink-0 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-gradient-to-r from-violet-500 to-purple-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all disabled:opacity-60"
          aria-label="Suscribir"
        >
          {status === 'success' ? <Check size={15} /> : <Send size={15} />}
        </button>
      </div>
      {status === 'success' && (
        <p className="text-cyan-400 text-xs">¡Gracias! Suscripción confirmada.</p>
      )}
      {status === 'error' && (
        <p className="text-red-400 text-xs">{error}</p>
      )}
    </form>
  );
}
