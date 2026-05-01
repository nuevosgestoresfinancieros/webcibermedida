import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { User, Mail, Lock, AlertCircle } from 'lucide-react';
import { useUserAuth } from '../contexts/UserAuthContext';

export default function RegisterPage() {
  const { user, register, loading } = useUserAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-950 text-cyan-400">Cargando...</div>;
  if (user) return <Navigate to="/cuenta" replace />;

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) { setError('Las contraseñas no coinciden'); return; }
    if (form.password.length < 6) { setError('La contraseña debe tener al menos 6 caracteres'); return; }
    setSubmitting(true);
    try {
      await register({ name: form.name.trim(), email: form.email.trim().toLowerCase(), password: form.password });
      navigate('/cuenta');
    } catch (err) {
      setError(err?.response?.data?.detail || 'Error al crear cuenta');
    } finally { setSubmitting(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-40" style={{
        background: 'radial-gradient(circle at 70% 30%, rgba(34,211,238,0.2), transparent 50%), radial-gradient(circle at 30% 70%, rgba(139,92,246,0.18), transparent 50%)'
      }} />
      <div className="relative w-full max-w-md bg-slate-900/80 backdrop-blur border border-slate-800 rounded-xl p-8 shadow-2xl">
        <Link to="/" className="flex flex-col items-center mb-6">
          <img src="/logo-cibermedida.png" alt="Cibermedida" className="h-14 w-auto" />
        </Link>
        <h1 className="text-white text-2xl font-bold text-center">Crear cuenta</h1>
        <p className="text-slate-400 text-sm text-center mb-6">Únete a la comunidad Cibermedida</p>

        {error && (
          <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-md bg-red-500/10 border border-red-500/40 text-red-300 text-sm">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-slate-400 mb-1">Nombre</label>
            <div className="relative">
              <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input required value={form.name} onChange={update('name')} autoFocus
                className="w-full pl-9 pr-3 py-2.5 rounded-md bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500" />
            </div>
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Email</label>
            <div className="relative">
              <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input type="email" required value={form.email} onChange={update('email')}
                className="w-full pl-9 pr-3 py-2.5 rounded-md bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Contraseña</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input type="password" required value={form.password} onChange={update('password')}
                  className="w-full pl-9 pr-3 py-2.5 rounded-md bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500" />
              </div>
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Repetir</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input type="password" required value={form.confirm} onChange={update('confirm')}
                  className="w-full pl-9 pr-3 py-2.5 rounded-md bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500" />
              </div>
            </div>
          </div>
          <button type="submit" disabled={submitting}
            className="w-full py-3 rounded-md bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold hover:shadow-lg hover:shadow-purple-500/30 transition-all disabled:opacity-60">
            {submitting ? 'Creando cuenta...' : 'Crear cuenta'}
          </button>
        </form>

        <p className="text-center text-slate-400 text-sm mt-6">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-semibold">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}
