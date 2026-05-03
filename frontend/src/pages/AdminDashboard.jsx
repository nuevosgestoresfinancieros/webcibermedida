import React, { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import {
  LogOut, Inbox, MailOpen, Users, Settings as SettingsIcon, Trash2,
  Check, RotateCw, Key, Eye, EyeOff, ExternalLink, AlertCircle, CheckCircle2,
  FileEdit,
} from 'lucide-react';
import { api } from '../utils/api';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import ContentManager from '../components/ContentManager';
import { CONTENT_SCHEMAS } from '../contentSchemas';

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleString('es-ES', { dateStyle: 'medium', timeStyle: 'short' });
}

function StatCard({ icon: Icon, label, value, accent = 'cyan' }) {
  const colors = {
    cyan: 'from-cyan-500/20 to-cyan-500/5 border-cyan-500/40 text-cyan-400',
    violet: 'from-violet-500/20 to-violet-500/5 border-violet-500/40 text-violet-400',
    amber: 'from-amber-500/20 to-amber-500/5 border-amber-500/40 text-amber-400',
  }[accent];
  return (
    <div className={`rounded-xl border bg-gradient-to-br p-5 ${colors}`}>
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-300">{label}</span>
        <Icon size={18} />
      </div>
      <div className="mt-2 text-3xl font-bold text-white">{value}</div>
    </div>
  );
}

export default function AdminDashboard() {
  const { user, loading, logout } = useAdminAuth();
  const [tab, setTab] = useState('messages');
  const [messages, setMessages] = useState([]);
  const [subs, setSubs] = useState([]);
  const [settings, setSettings] = useState(null);
  const [loadingTab, setLoadingTab] = useState(false);

  useEffect(() => { document.title = 'Dashboard – Cibermedida'; }, []);

  const load = async () => {
    setLoadingTab(true);
    try {
      const [m, s, st] = await Promise.all([
        api.get('/admin/messages'),
        api.get('/admin/newsletter'),
        api.get('/admin/settings'),
      ]);
      setMessages(m.data);
      setSubs(s.data);
      setSettings(st.data);
    } finally {
      setLoadingTab(false);
    }
  };

  useEffect(() => {
    if (user) load();
  }, [user]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-950 text-cyan-400">Cargando...</div>;
  if (!user) return <Navigate to="/admin/login" replace />;

  const unreadCount = messages.filter((m) => !m.read).length;

  const toggleRead = async (msg) => {
    const { data } = await api.patch(`/admin/messages/${msg.id}`, { read: !msg.read });
    setMessages((arr) => arr.map((x) => (x.id === data.id ? data : x)));
  };
  const removeMsg = async (id) => {
    if (!window.confirm('¿Eliminar este mensaje?')) return;
    await api.delete(`/admin/messages/${id}`);
    setMessages((arr) => arr.filter((x) => x.id !== id));
  };
  const removeSub = async (id) => {
    if (!window.confirm('¿Eliminar este suscriptor?')) return;
    await api.delete(`/admin/newsletter/${id}`);
    setSubs((arr) => arr.filter((x) => x.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* Topbar */}
      <header className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-cyan-400 hover:text-cyan-300 text-sm">
              ← Volver a la web
            </Link>
            <span className="text-slate-700">|</span>
            <h1 className="text-white font-bold">Panel Cibermedida</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-400">Hola, <span className="text-white font-semibold">{user.username}</span></span>
            <button
              onClick={logout}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-slate-800 border border-slate-700 text-slate-200 text-sm hover:border-red-500/60 hover:text-red-400 transition-colors"
            >
              <LogOut size={15} /> Salir
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <StatCard icon={Inbox} label="Mensajes totales" value={messages.length} accent="cyan" />
          <StatCard icon={AlertCircle} label="Sin leer" value={unreadCount} accent="amber" />
          <StatCard icon={Users} label="Suscriptores newsletter" value={subs.length} accent="violet" />
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 mb-6">
          {[
            { id: 'messages', label: 'Mensajes', icon: Inbox },
            { id: 'newsletter', label: 'Newsletter', icon: Users },
            { id: 'content', label: 'Contenido', icon: FileEdit },
            { id: 'settings', label: 'Ajustes', icon: SettingsIcon },
          ].map((t) => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors ${
                  active ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <Icon size={16} /> {t.label}
              </button>
            );
          })}
          <button
            onClick={load}
            disabled={loadingTab}
            className="ml-auto inline-flex items-center gap-2 px-3 py-2 text-xs text-slate-400 hover:text-cyan-400"
          >
            <RotateCw size={14} className={loadingTab ? 'animate-spin' : ''} /> Refrescar
          </button>
        </div>

        {tab === 'messages' && <MessagesTable items={messages} onToggleRead={toggleRead} onDelete={removeMsg} />}
        {tab === 'newsletter' && <NewsletterTable items={subs} onDelete={removeSub} />}
        {tab === 'content' && <ContentHub />}
        {tab === 'settings' && <SettingsPanel settings={settings} onSaved={load} />}
      </main>
    </div>
  );
}

function ContentHub() {
  const entities = Object.keys(CONTENT_SCHEMAS);
  const [sub, setSub] = useState(entities[0]);
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 bg-slate-900/60 border border-slate-800 rounded-lg p-2">
        {entities.map((e) => {
          const active = sub === e;
          return (
            <button
              key={e}
              onClick={() => setSub(e)}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                active ? 'bg-cyan-500 text-slate-900' : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {CONTENT_SCHEMAS[e].label}
            </button>
          );
        })}
      </div>
      <ContentManager entity={sub} />
    </div>
  );
}

function MessagesTable({ items, onToggleRead, onDelete }) {
  const [expanded, setExpanded] = useState(null);
  if (items.length === 0) return <Empty text="Todavía no hay mensajes recibidos" />;
  return (
    <div className="space-y-3">
      {items.map((m) => {
        const isOpen = expanded === m.id;
        return (
          <div key={m.id} className={`rounded-lg border ${m.read ? 'bg-slate-900 border-slate-800' : 'bg-slate-900 border-cyan-500/40'}`}>
            <button
              onClick={() => setExpanded(isOpen ? null : m.id)}
              className="w-full text-left flex items-center gap-4 p-4"
            >
              <div className={`w-2 h-2 rounded-full shrink-0 ${m.read ? 'bg-slate-600' : 'bg-cyan-400 animate-pulse'}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-white">{m.name}</span>
                  {m.company && <span className="text-slate-400 text-sm">· {m.company}</span>}
                  <span className="text-cyan-400 text-sm">{m.email}</span>
                </div>
                <p className="text-slate-400 text-sm mt-1 truncate">{m.message}</p>
              </div>
              <div className="text-xs text-slate-500 shrink-0 hidden sm:block">{formatDate(m.created_at)}</div>
            </button>
            {isOpen && (
              <div className="px-4 pb-4 border-t border-slate-800 pt-3 space-y-3">
                {m.phone && <div className="text-sm"><span className="text-slate-500">Teléfono: </span><span className="text-white">{m.phone}</span></div>}
                <pre className="text-sm text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">{m.message}</pre>
                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); onToggleRead(m); }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-800 border border-slate-700 text-xs hover:border-cyan-500/60 hover:text-cyan-400"
                  >
                    {m.read ? <><Inbox size={13}/> Marcar no leído</> : <><MailOpen size={13}/> Marcar leído</>}
                  </button>
                  <a
                    href={`mailto:${m.email}?subject=Re: Consulta Cibermedida`}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-violet-500/10 border border-violet-500/40 text-violet-300 text-xs hover:bg-violet-500/20"
                  >
                    <ExternalLink size={13}/> Responder por email
                  </a>
                  <button
                    onClick={(e) => { e.stopPropagation(); onDelete(m.id); }}
                    className="ml-auto inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-red-500/10 border border-red-500/40 text-red-300 text-xs hover:bg-red-500/20"
                  >
                    <Trash2 size={13}/> Eliminar
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function NewsletterTable({ items, onDelete }) {
  if (items.length === 0) return <Empty text="Aún no hay suscriptores" />;
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900 overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-slate-800/60 text-slate-400 text-left text-xs uppercase tracking-wider">
          <tr>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3 hidden sm:table-cell">Fecha de alta</th>
            <th className="px-4 py-3 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.map((s) => (
            <tr key={s.id} className="border-t border-slate-800 hover:bg-slate-800/40">
              <td className="px-4 py-3 text-white">{s.email}</td>
              <td className="px-4 py-3 text-slate-400 hidden sm:table-cell">{formatDate(s.created_at)}</td>
              <td className="px-4 py-3 text-right">
                <button
                  onClick={() => onDelete(s.id)}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded bg-red-500/10 border border-red-500/30 text-red-300 text-xs hover:bg-red-500/20"
                >
                  <Trash2 size={12}/> Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SettingsPanel({ settings, onSaved }) {
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [showApi, setShowApi] = useState(false);
  const [msg, setMsg] = useState(null);
  const [saving, setSaving] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setMsg(null);
    setSaving(true);
    try {
      const payload = { current_password: currentPwd };
      if (newPwd) payload.new_password = newPwd;
      if (apiKey.trim()) payload.openai_api_key = apiKey.trim();
      await api.patch('/admin/settings', payload);
      setMsg({ kind: 'ok', text: 'Cambios guardados correctamente' });
      setCurrentPwd(''); setNewPwd(''); setApiKey('');
      onSaved();
    } catch (err) {
      setMsg({ kind: 'err', text: err?.response?.data?.detail || 'Error al guardar' });
    } finally {
      setSaving(false);
    }
  };

  const clearApiKey = async () => {
    if (!window.confirm('¿Eliminar la API key configurada?')) return;
    if (!currentPwd) { setMsg({ kind: 'err', text: 'Introduce tu contraseña actual para confirmar' }); return; }
    setSaving(true);
    try {
      await api.patch('/admin/settings', { current_password: currentPwd, openai_api_key: '' });
      setMsg({ kind: 'ok', text: 'API key eliminada' });
      setCurrentPwd('');
      onSaved();
    } catch (err) {
      setMsg({ kind: 'err', text: err?.response?.data?.detail || 'Error' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      {settings && (
        <div className="rounded-lg bg-slate-900 border border-slate-800 p-5 space-y-2">
          <h3 className="text-white font-semibold">Estado actual</h3>
          <div className="text-sm text-slate-400">Usuario: <span className="text-white font-medium">{settings.username}</span></div>
          <div className="text-sm text-slate-400 flex items-center gap-2">
            API Key chatbot (ChatGPT):
            {settings.openai_api_key_set ? (
              <span className="text-cyan-400 font-mono">{settings.openai_api_key_masked}</span>
            ) : (
              <span className="text-amber-400">No configurada</span>
            )}
          </div>
          {settings.updated_at && (
            <div className="text-xs text-slate-500">Último cambio: {formatDate(settings.updated_at)}</div>
          )}
        </div>
      )}

      <form onSubmit={submit} className="rounded-lg bg-slate-900 border border-slate-800 p-5 space-y-4">
        <h3 className="text-white font-semibold flex items-center gap-2"><Key size={16}/> Actualizar credenciales</h3>

        {msg && (
          <div className={`flex items-center gap-2 text-sm px-3 py-2 rounded-md border ${
            msg.kind === 'ok'
              ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300'
              : 'bg-red-500/10 border-red-500/40 text-red-300'
          }`}>
            {msg.kind === 'ok' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            {msg.text}
          </div>
        )}

        <div>
          <label className="block text-xs text-slate-400 mb-1">Contraseña actual <span className="text-red-400">*</span></label>
          <input
            type="password"
            required
            value={currentPwd}
            onChange={(e) => setCurrentPwd(e.target.value)}
            className="w-full px-3 py-2.5 rounded-md bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-1">Nueva contraseña (opcional, mín. 6)</label>
          <input
            type="password"
            value={newPwd}
            onChange={(e) => setNewPwd(e.target.value)}
            placeholder="Dejar en blanco para no cambiar"
            className="w-full px-3 py-2.5 rounded-md bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-1">API Key ChatGPT (OpenAI)</label>
          <div className="relative">
            <input
              type={showApi ? 'text' : 'password'}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
              className="w-full pr-10 px-3 py-2.5 rounded-md bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500 font-mono text-sm"
            />
            <button
              type="button"
              onClick={() => setShowApi((v) => !v)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyan-400 p-1"
              aria-label="Mostrar u ocultar"
            >
              {showApi ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-1">Se usará para el chatbot de ciberseguridad (Fase 2).</p>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-900 font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all disabled:opacity-60"
          >
            <Check size={15}/> Guardar cambios
          </button>
          {settings?.openai_api_key_set && (
            <button
              type="button"
              onClick={clearApiKey}
              disabled={saving}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-red-500/10 border border-red-500/40 text-red-300 text-sm hover:bg-red-500/20 disabled:opacity-60"
            >
              <Trash2 size={14}/> Eliminar API key
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

function Empty({ text }) {
  return (
    <div className="text-center py-16 border border-dashed border-slate-800 rounded-lg">
      <Inbox size={40} className="mx-auto text-slate-700 mb-3" />
      <p className="text-slate-500">{text}</p>
    </div>
  );
}
