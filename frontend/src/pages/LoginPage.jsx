import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { Shield, Mail, Lock, AlertCircle } from 'lucide-react';
import { useUserAuth } from '../contexts/UserAuthContext';

export default function LoginPage() {
  const { user, login, loading } = useUserAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-950 text-cyan-400">Cargando...</div>;
  if (user) return <Navigate to="/cuenta" replace />;

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSubmitting(true);
    try {
      await login(email.trim().toLowerCase(), password);
      navigate('/cuenta');
    } catch (err) {
      setError(err?.response?.data?.detail || 'Error al iniciar sesión');
    } finally { setSubmitting(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-40" style={{
        background: 'radial-gradient(circle at 20% 30%, rgba(34,211,238,0.2), transparent 50%), radial-gradient(circle at 80% 70%, rgba(139,92,246,0.18), transparent 50%)'
      }} />
      <div className="relative w-full max-w-md bg-slate-900/80 backdrop-blur border border-slate-800 rounded-xl p-8 shadow-2xl">
        <Link to="/" className="flex flex-col items-center mb-6">
          <img src="/logo-cibermedida.png" alt="Cibermedida" className="h-14 w-auto" />
        </Link>
        <h1 className="text-white text-2xl font-bold text-center">Iniciar sesión</h1>
        <p className="text-slate-400 text-sm text-center mb-6">Accede a tu cuenta de Cibermedida</p>

        {error && (
          <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-md bg-red-500/10 border border-red-500/40 text-red-300 text-sm">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-slate-400 mb-1">Email</label>
            <div className="relative">
              <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoFocus
                className="w-full pl-9 pr-3 py-2.5 rounded-md bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500" />
            </div>
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Contraseña</label>
            <div className="relative">
              <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-md bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500" />
            </div>
          </div>
          <button type="submit" disabled={submitting}
            className="w-full py-3 rounded-md bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-900 font-bold hover:shadow-lg hover:shadow-cyan-500/30 transition-all disabled:opacity-60">
            {submitting ? 'Entrando...' : 'Iniciar sesión'}
          </button>
        </form>

        <p className="text-center text-slate-400 text-sm mt-6">
          ¿No tienes cuenta?{' '}
          <Link to="/registro" className="text-cyan-400 hover:text-cyan-300 font-semibold">Regístrate</Link>
        </p>
      </div>
    </div>
  );
}
