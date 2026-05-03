import React, { useEffect, useState } from 'react';
import {
  Plus, Edit3, Trash2, Save, X, Check, AlertCircle, Loader2, Eye, EyeOff,
  Search, ArrowUp, ArrowDown,
} from 'lucide-react';
import { api } from '../utils/api';
import { CONTENT_SCHEMAS } from '../contentSchemas';

function parseValue(field, raw) {
  if (field.type === 'number') return raw === '' || raw == null ? null : Number(raw);
  if (field.type === 'tags') return typeof raw === 'string'
    ? raw.split(',').map((s) => s.trim()).filter(Boolean)
    : (raw || []);
  if (field.type === 'checkbox') return !!raw;
  return raw ?? '';
}

function initialFormFromSchema(schema, item = null) {
  const obj = {};
  schema.fields.forEach((f) => {
    const val = item ? item[f.key] : (f.default ?? (f.type === 'tags' ? [] : f.type === 'checkbox' ? true : ''));
    obj[f.key] = f.type === 'tags' && Array.isArray(val) ? val.join(', ') : val;
  });
  return obj;
}

export default function ContentManager({ entity }) {
  const schema = CONTENT_SCHEMAS[entity];
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null); // null | {} | item
  const [search, setSearch] = useState('');
  const [msg, setMsg] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/admin/content/${entity}`);
      setItems(data);
    } catch (e) {
      setMsg({ kind: 'err', text: 'Error al cargar contenido' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [entity]);

  if (!schema) return null;

  const filtered = items.filter((it) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return schema.columns.some((c) => String(it[c] ?? '').toLowerCase().includes(q));
  });

  const removeItem = async (id) => {
    if (!window.confirm(`¿Eliminar este ${schema.singular.toLowerCase()}?`)) return;
    await api.delete(`/admin/content/${entity}/${id}`);
    setItems((arr) => arr.filter((x) => x.id !== id));
    setMsg({ kind: 'ok', text: 'Eliminado correctamente' });
  };

  const togglePublish = async (item) => {
    const { data } = await api.patch(`/admin/content/${entity}/${item.id}`, { published: !item.published });
    setItems((arr) => arr.map((x) => (x.id === item.id ? data : x)));
  };

  return (
    <section className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-5 gap-3 flex-wrap">
        <div>
          <h2 className="text-white text-xl font-bold">{schema.label}</h2>
          <p className="text-slate-400 text-sm">Gestiona los {schema.label.toLowerCase()} que se muestran en la web.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar..."
              className="pl-9 pr-3 py-2 text-sm rounded-md bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500"
            />
          </div>
          <button
            onClick={() => setEditing({})}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-900 text-sm font-semibold hover:shadow-lg hover:shadow-cyan-500/30"
          >
            <Plus size={15} /> Nuevo
          </button>
        </div>
      </div>

      {msg && (
        <div className={`mb-4 text-sm px-3 py-2 rounded-md border flex items-center gap-2 ${
          msg.kind === 'ok' ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300' : 'bg-red-500/10 border-red-500/40 text-red-300'
        }`}>
          {msg.kind === 'ok' ? <Check size={15}/> : <AlertCircle size={15}/>}
          <span className="flex-1">{msg.text}</span>
          <button onClick={() => setMsg(null)} className="text-slate-400"><X size={14}/></button>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-12 text-slate-400"><Loader2 className="animate-spin" size={22}/></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-10 border border-dashed border-slate-800 rounded-lg">
          <p className="text-slate-500 text-sm">No hay {schema.label.toLowerCase()} aún. Pulsa "Nuevo" para crear el primero.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-slate-800">
          <table className="w-full text-sm">
            <thead className="bg-slate-800/60 text-slate-400 text-left text-xs uppercase tracking-wider">
              <tr>
                {schema.columns.map((c) => <th key={c} className="px-4 py-3">{c}</th>)}
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((it) => (
                <tr key={it.id} className="border-t border-slate-800 hover:bg-slate-800/40">
                  {schema.columns.map((c) => (
                    <td key={c} className="px-4 py-3 text-slate-200 max-w-xs truncate">
                      {c === 'published' ? (
                        <button onClick={() => togglePublish(it)} className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs ${it.published !== false ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/40' : 'bg-slate-700 text-slate-300'}`}>
                          {it.published !== false ? <><Eye size={11}/> Sí</> : <><EyeOff size={11}/> No</>}
                        </button>
                      ) : (
                        String(it[c] ?? '—')
                      )}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button onClick={() => setEditing(it)} className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-800 border border-slate-700 text-slate-200 text-xs hover:border-cyan-500">
                        <Edit3 size={12}/> Editar
                      </button>
                      <button onClick={() => removeItem(it.id)} className="inline-flex items-center gap-1 px-2 py-1 rounded bg-red-500/10 border border-red-500/40 text-red-300 text-xs hover:bg-red-500/20">
                        <Trash2 size={12}/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing !== null && (
        <EditorModal
          entity={entity}
          schema={schema}
          item={editing.id ? editing : null}
          onClose={() => setEditing(null)}
          onSaved={(saved, isNew) => {
            setItems((arr) => isNew ? [saved, ...arr] : arr.map((x) => x.id === saved.id ? saved : x));
            setEditing(null);
            setMsg({ kind: 'ok', text: isNew ? 'Creado correctamente' : 'Guardado correctamente' });
          }}
        />
      )}
    </section>
  );
}

function EditorModal({ entity, schema, item, onClose, onSaved }) {
  const [form, setForm] = useState(() => initialFormFromSchema(schema, item));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const isNew = !item;

  const update = (key) => (e) => {
    const val = e?.target?.type === 'checkbox' ? e.target.checked : e?.target?.value ?? e;
    setForm((f) => ({ ...f, [key]: val }));
  };

  const submit = async (ev) => {
    ev.preventDefault();
    setError('');
    setSaving(true);
    try {
      const payload = {};
      schema.fields.forEach((f) => {
        payload[f.key] = parseValue(f, form[f.key]);
      });
      const res = isNew
        ? await api.post(`/admin/content/${entity}`, payload)
        : await api.patch(`/admin/content/${entity}/${item.id}`, payload);
      onSaved(res.data, isNew);
    } catch (err) {
      setError(err?.response?.data?.detail || 'Error al guardar');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-700 rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-slate-900 border-b border-slate-800 p-5 flex items-center justify-between z-10">
          <h3 className="text-white font-bold text-lg">{isNew ? `Nuevo ${schema.singular}` : `Editar ${schema.singular}`}</h3>
          <button onClick={onClose} aria-label="Cerrar" className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center"><X size={16}/></button>
        </div>
        <form onSubmit={submit} className="p-5 space-y-4">
          {error && (
            <div className="text-sm px-3 py-2 rounded-md bg-red-500/10 border border-red-500/40 text-red-300 flex items-center gap-2">
              <AlertCircle size={15}/> {error}
            </div>
          )}
          {schema.fields.map((f) => (
            <FieldInput key={f.key} field={f} value={form[f.key]} onChange={update(f.key)} />
          ))}
          <div className="flex items-center gap-2 pt-3 border-t border-slate-800">
            <button type="submit" disabled={saving} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-900 font-semibold hover:shadow-lg hover:shadow-cyan-500/30 disabled:opacity-60">
              {saving ? <Loader2 size={15} className="animate-spin"/> : <Save size={15}/>} Guardar
            </button>
            <button type="button" onClick={onClose} className="px-4 py-2.5 rounded-md bg-slate-800 border border-slate-700 text-slate-300 text-sm hover:border-slate-600">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FieldInput({ field, value, onChange }) {
  const baseCls = 'w-full px-3 py-2.5 rounded-md bg-slate-950 border border-slate-700 text-white outline-none focus:border-cyan-500';
  if (field.type === 'checkbox') {
    return (
      <label className="flex items-center gap-2 text-slate-300 text-sm">
        <input type="checkbox" checked={!!value} onChange={onChange} className="accent-cyan-400 w-4 h-4" />
        {field.label}
      </label>
    );
  }
  if (field.type === 'textarea') {
    return (
      <div>
        <label className="block text-xs text-slate-400 mb-1">{field.label}{field.required && <span className="text-red-400"> *</span>}</label>
        <textarea rows={field.rows || 4} value={value ?? ''} onChange={onChange} required={field.required}
          placeholder={field.placeholder} className={`${baseCls} resize-y font-mono text-sm`} />
      </div>
    );
  }
  if (field.type === 'number') {
    return (
      <div>
        <label className="block text-xs text-slate-400 mb-1">{field.label}</label>
        <input type="number" value={value ?? ''} onChange={onChange} min={field.min} max={field.max} className={baseCls} />
      </div>
    );
  }
  return (
    <div>
      <label className="block text-xs text-slate-400 mb-1">{field.label}{field.required && <span className="text-red-400"> *</span>}</label>
      <input type={field.type === 'url' ? 'url' : 'text'} value={value ?? ''} onChange={onChange}
        required={field.required} placeholder={field.placeholder} className={baseCls} />
    </div>
  );
}
