import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Shield, Lock, User, AlertCircle } from 'lucide-react';
import { useAdminAuth } from '../contexts/AdminAuthContext';

export default function AdminLogin() {
  const { user, login, loading } = useAdminAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.title = 'Admin – Cibermedida';
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-cyan-400">
        Cargando...
      </div>
    );
  }
  if (user) return <Navigate to="/admin" replace />;

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(username.trim(), password);
      navigate('/admin');
    } catch (err) {
      setError(err?.response?.data?.detail || 'Error de inicio de sesión');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30" style={{
        background: 'radial-gradient(circle at 30% 20%, rgba(34,211,238,0.25), transparent 50%), radial-gradient(circle at 70% 80%, rgba(139,92,246,0.2), transparent 50%)'
      }} />

      <div className="relative w-full max-w-md bg-slate-900/80 backdrop-blur border border-slate-800 rounded-xl p-8 shadow-2xl">
        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 rounded-full bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mb-3">
            <Shield size={26} />
          </div>
          <h1 className="text-white text-2xl font-bold">Panel de administración</h1>
          <p className="text-slate-400 text-sm mt-1">Cibermedida</p>
        </div>

        {error && (
          <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-md bg-red-500/10 border border-red-500/40 text-red-300 text-sm">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-slate-400 mb-1">Usuario</label>
            <div className="relative">
              <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-md bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500"
                autoFocus
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Contraseña</label>
            <div className="relative">
              <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-md bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-md bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-900 font-bold hover:shadow-lg hover:shadow-cyan-500/30 transition-all disabled:opacity-60"
          >
            {submitting ? 'Entrando...' : 'Iniciar sesión'}
          </button>
        </form>

        <p className="text-center text-slate-500 text-xs mt-6">
          Acceso restringido al personal de Cibermedida
        </p>
      </div>
    </div>
  );
}
