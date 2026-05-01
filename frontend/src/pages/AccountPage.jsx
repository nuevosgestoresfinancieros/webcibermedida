import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import {
  LogOut, User, Lock, Key, BookOpen, ArrowLeft, Check, AlertCircle, CheckCircle2,
  Eye, EyeOff, ExternalLink, Mail, Phone, Building2,
} from 'lucide-react';
import { useUserAuth } from '../contexts/UserAuthContext';
import Breadcrumbs from '../components/Breadcrumbs';

const mockCourses = [
  { id: 1, title: 'Fundamentos de Ciberseguridad', progress: 78, total: 24, done: 18, category: 'Ciberseguridad' },
  { id: 2, title: 'Introducción a la IA aplicada', progress: 35, total: 18, done: 6, category: 'IA' },
  { id: 3, title: 'RGPD y Protección de Datos', progress: 100, total: 12, done: 12, category: 'Cumplimiento' },
];

export default function AccountPage() {
  const { user, loading, logout } = useUserAuth();
  const [tab, setTab] = useState('profile');

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-950 text-cyan-400">Cargando...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* Topbar */}
      <header className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm">
              <ArrowLeft size={14} /> Volver a la web
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <div className="text-sm text-white font-semibold">{user.name}</div>
              <div className="text-xs text-slate-500">{user.email}</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center text-white font-bold">
              {user.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <button onClick={logout}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-slate-800 border border-slate-700 text-slate-200 text-sm hover:border-red-500/60 hover:text-red-400 transition-colors">
              <LogOut size={15} /> Salir
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-6 py-8">
        <Breadcrumbs className="!text-slate-400 mb-4 !justify-start" />
        <div className="grid lg:grid-cols-[220px_1fr] gap-6">
          {/* Sidebar */}
          <aside className="bg-slate-900 border border-slate-800 rounded-xl p-3 h-fit">
            {[
              { id: 'profile', label: 'Perfil', icon: User },
              { id: 'security', label: 'Seguridad', icon: Lock },
              { id: 'api', label: 'API Key', icon: Key },
              { id: 'courses', label: 'Mis cursos', icon: BookOpen },
            ].map((t) => {
              const Icon = t.icon;
              const active = tab === t.id;
              return (
                <button key={t.id} onClick={() => setTab(t.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${
                    active ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent'
                  }`}>
                  <Icon size={15} /> {t.label}
                </button>
              );
            })}
          </aside>

          {/* Content */}
          <div>
            {tab === 'profile' && <ProfileTab />}
            {tab === 'security' && <SecurityTab />}
            {tab === 'api' && <ApiKeyTab />}
            {tab === 'courses' && <CoursesTab />}
          </div>
        </div>
      </main>
    </div>
  );
}

function Alert({ kind, children }) {
  if (!children) return null;
  return (
    <div className={`flex items-center gap-2 text-sm px-3 py-2 rounded-md border mb-4 ${
      kind === 'ok' ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300' : 'bg-red-500/10 border-red-500/40 text-red-300'
    }`}>
      {kind === 'ok' ? <CheckCircle2 size={16}/> : <AlertCircle size={16}/>} {children}
    </div>
  );
}

function ProfileTab() {
  const { user, updateProfile } = useUserAuth();
  const [form, setForm] = useState({ name: user.name || '', phone: user.phone || '', company: user.company || '' });
  const [msg, setMsg] = useState(null);
  const [saving, setSaving] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setMsg(null); setSaving(true);
    try {
      await updateProfile(form);
      setMsg({ kind: 'ok', text: 'Perfil actualizado' });
    } catch (err) {
      setMsg({ kind: 'err', text: err?.response?.data?.detail || 'Error al guardar' });
    } finally { setSaving(false); }
  };

  return (
    <section className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <h2 className="text-white text-xl font-bold mb-1">Perfil</h2>
      <p className="text-slate-400 text-sm mb-5">Actualiza tus datos personales</p>
      {msg && <Alert kind={msg.kind}>{msg.text}</Alert>}
      <form onSubmit={submit} className="space-y-4 max-w-xl">
        <Field icon={User} label="Nombre"><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full pl-9 pr-3 py-2.5 rounded-md bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500" /></Field>
        <Field icon={Mail} label="Email"><input disabled value={user.email} className="w-full pl-9 pr-3 py-2.5 rounded-md bg-slate-950 border border-slate-800 text-slate-500 cursor-not-allowed" /><p className="text-xs text-slate-500 mt-1 ml-1">El email no se puede cambiar</p></Field>
        <Field icon={Phone} label="Teléfono"><input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full pl-9 pr-3 py-2.5 rounded-md bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500" /></Field>
        <Field icon={Building2} label="Empresa"><input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="w-full pl-9 pr-3 py-2.5 rounded-md bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500" /></Field>
        <button type="submit" disabled={saving} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-900 font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all disabled:opacity-60">
          <Check size={15}/> Guardar cambios
        </button>
      </form>
    </section>
  );
}

function Field({ icon: Icon, label, children }) {
  return (
    <div>
      <label className="block text-xs text-slate-400 mb-1">{label}</label>
      <div className="relative">
        <Icon size={15} className="absolute left-3 top-[14px] text-slate-500" />
        {children}
      </div>
    </div>
  );
}

function SecurityTab() {
  const { changePassword } = useUserAuth();
  const [form, setForm] = useState({ current_password: '', new_password: '', confirm: '' });
  const [msg, setMsg] = useState(null);
  const [saving, setSaving] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setMsg(null);
    if (form.new_password !== form.confirm) { setMsg({ kind: 'err', text: 'Las contraseñas no coinciden' }); return; }
    if (form.new_password.length < 6) { setMsg({ kind: 'err', text: 'Mínimo 6 caracteres' }); return; }
    setSaving(true);
    try {
      await changePassword(form.current_password, form.new_password);
      setMsg({ kind: 'ok', text: 'Contraseña actualizada' });
      setForm({ current_password: '', new_password: '', confirm: '' });
    } catch (err) {
      setMsg({ kind: 'err', text: err?.response?.data?.detail || 'Error' });
    } finally { setSaving(false); }
  };

  return (
    <section className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <h2 className="text-white text-xl font-bold mb-1">Seguridad</h2>
      <p className="text-slate-400 text-sm mb-5">Cambia tu contraseña</p>
      {msg && <Alert kind={msg.kind}>{msg.text}</Alert>}
      <form onSubmit={submit} className="space-y-4 max-w-md">
        <Field icon={Lock} label="Contraseña actual"><input type="password" required value={form.current_password} onChange={(e) => setForm({ ...form, current_password: e.target.value })} className="w-full pl-9 pr-3 py-2.5 rounded-md bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500" /></Field>
        <Field icon={Lock} label="Nueva contraseña"><input type="password" required value={form.new_password} onChange={(e) => setForm({ ...form, new_password: e.target.value })} className="w-full pl-9 pr-3 py-2.5 rounded-md bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500" /></Field>
        <Field icon={Lock} label="Repetir nueva contraseña"><input type="password" required value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} className="w-full pl-9 pr-3 py-2.5 rounded-md bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500" /></Field>
        <button type="submit" disabled={saving} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all disabled:opacity-60">
          <Check size={15}/> Actualizar contraseña
        </button>
      </form>
    </section>
  );
}

function ApiKeyTab() {
  const { user, updateProfile } = useUserAuth();
  const [apiKey, setApiKey] = useState('');
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState(null);
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setMsg(null); setSaving(true);
    try {
      await updateProfile({ openai_api_key: apiKey.trim() });
      setMsg({ kind: 'ok', text: 'API key guardada. El chatbot usará tu cuenta de OpenAI.' });
      setApiKey('');
    } catch (err) {
      setMsg({ kind: 'err', text: err?.response?.data?.detail || 'Error' });
    } finally { setSaving(false); }
  };

  const remove = async () => {
    if (!window.confirm('¿Eliminar tu API key? El chatbot usará la cuenta compartida.')) return;
    setSaving(true);
    try {
      await updateProfile({ openai_api_key: '' });
      setMsg({ kind: 'ok', text: 'API key eliminada' });
    } catch (err) {
      setMsg({ kind: 'err', text: 'Error al eliminar' });
    } finally { setSaving(false); }
  };

  return (
    <section className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <h2 className="text-white text-xl font-bold mb-1">API Key ChatGPT</h2>
      <p className="text-slate-400 text-sm mb-5">
        Opcional: configura tu propia API key de OpenAI para que el chatbot use tu cuenta.
        Si no la configuras, se utiliza la clave compartida de la plataforma.
      </p>
      {msg && <Alert kind={msg.kind}>{msg.text}</Alert>}

      <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 mb-4 text-sm">
        <div className="flex items-center gap-2 mb-1">
          <Key size={14} className="text-cyan-400" />
          <span className="text-slate-300 font-medium">Estado:</span>
          {user.openai_api_key_set ? (
            <span className="text-cyan-400 font-mono">{user.openai_api_key_masked}</span>
          ) : (
            <span className="text-amber-400">No configurada</span>
          )}
        </div>
        <a href="https://platform.openai.com/api-keys" target="_blank" rel="noreferrer"
          className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300">
          ¿Cómo obtener una API key? <ExternalLink size={11}/>
        </a>
      </div>

      <div className="max-w-xl space-y-3">
        <div>
          <label className="block text-xs text-slate-400 mb-1">Nueva API key</label>
          <div className="relative">
            <Key size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input type={show ? 'text' : 'password'} value={apiKey} onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..." className="w-full pl-9 pr-10 py-2.5 rounded-md bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500 font-mono text-sm" />
            <button type="button" onClick={() => setShow((v) => !v)} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyan-400 p-1">
              {show ? <EyeOff size={15}/> : <Eye size={15}/>}
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={save} disabled={saving || !apiKey.trim()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-900 font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all disabled:opacity-60">
            <Check size={15}/> Guardar API key
          </button>
          {user.openai_api_key_set && (
            <button onClick={remove} disabled={saving}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-red-500/10 border border-red-500/40 text-red-300 text-sm hover:bg-red-500/20">
              Eliminar
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

function CoursesTab() {
  return (
    <section className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <h2 className="text-white text-xl font-bold mb-1">Mis cursos</h2>
      <p className="text-slate-400 text-sm mb-5">Progreso de tus cursos en el Aula Virtual de Cibermedida</p>
      <div className="space-y-3">
        {mockCourses.map((c) => (
          <div key={c.id} className="bg-slate-950 border border-slate-800 rounded-lg p-4 hover:border-cyan-500/40 transition-colors">
            <div className="flex items-center justify-between gap-4 mb-2">
              <div>
                <h3 className="text-white font-semibold">{c.title}</h3>
                <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 rounded">{c.category}</span>
              </div>
              <span className={`text-sm font-bold ${c.progress === 100 ? 'text-emerald-400' : 'text-cyan-400'}`}>
                {c.progress}%
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cyan-400 to-cyan-500 transition-all" style={{ width: `${c.progress}%` }} />
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
              <span>{c.done}/{c.total} módulos completados</span>
              <a href="https://aula.cibermedida.es" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300">
                Ir al aula <ExternalLink size={11}/>
              </a>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-500 mt-4">Datos de ejemplo. Pronto conectaremos con tu aula virtual real.</p>
    </section>
  );
}
