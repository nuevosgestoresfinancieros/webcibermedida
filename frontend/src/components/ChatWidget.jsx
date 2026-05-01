import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { api } from '../utils/api';

const INITIAL_GREETING = {
  role: 'assistant',
  text: '¡Hola! Soy el asistente virtual de Cibermedida. Puedo ayudarte con dudas sobre ciberseguridad, nuestros servicios y formación. ¿En qué puedo ayudarte?',
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_GREETING]);
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const endRef = useRef(null);

  useEffect(() => {
    if (open && endRef.current) endRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const send = async (e) => {
    e?.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    setInput('');
    setError('');
    setMessages((m) => [...m, { role: 'user', text }]);
    setLoading(true);
    try {
      const { data } = await api.post('/chat/message', { message: text, session_id: sessionId });
      setSessionId(data.session_id);
      setMessages((m) => [...m, { role: 'assistant', text: data.reply }]);
    } catch (err) {
      setError(err?.response?.data?.detail || 'Error al contactar con el asistente');
      setMessages((m) => [...m, { role: 'assistant', text: 'Lo siento, ha ocurrido un error. Inténtalo de nuevo en unos segundos.', error: true }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Trigger bubble */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Abrir chat"
          className="fixed bottom-6 left-6 z-40 group flex items-center gap-3 px-4 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-xl shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:-translate-y-0.5 transition-all"
        >
          <div className="relative">
            <MessageCircle size={20} />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900 animate-pulse" />
          </div>
          <span className="font-semibold text-sm hidden sm:block">Asistente IA</span>
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-6 left-6 right-6 sm:right-auto sm:w-[380px] z-50 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fadeIn"
          style={{ maxHeight: 'calc(100vh - 140px)', height: '560px' }}>
          {/* Header */}
          <div className="px-4 py-3 bg-gradient-to-r from-cyan-600 to-violet-600 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
                <Bot size={18} className="text-white" />
              </div>
              <div>
                <div className="text-white font-bold text-sm">Asistente Cibermedida</div>
                <div className="text-white/70 text-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  En línea · GPT-4o-mini
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Cerrar"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors">
              <X size={16}/>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-950">
            {messages.map((m, i) => (
              <MessageBubble key={i} role={m.role} text={m.text} error={m.error} />
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <Loader2 size={14} className="animate-spin text-cyan-400" />
                Pensando...
              </div>
            )}
            <div ref={endRef} />
          </div>

          {error && (
            <div className="px-4 py-2 bg-red-500/10 border-t border-red-500/40 text-red-300 text-xs">{error}</div>
          )}

          {/* Input */}
          <form onSubmit={send} className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Escribe tu pregunta..."
              disabled={loading}
              className="flex-1 px-3 py-2.5 rounded-md bg-slate-950 border border-slate-700 text-white text-sm outline-none focus:border-cyan-500 placeholder:text-slate-500 disabled:opacity-60" />
            <button type="submit" disabled={loading || !input.trim()}
              className="w-10 h-10 rounded-md bg-gradient-to-r from-cyan-500 to-violet-500 text-white flex items-center justify-center disabled:opacity-40 hover:shadow-lg transition-all">
              <Send size={15}/>
            </button>
          </form>
        </div>
      )}
    </>
  );
}

function MessageBubble({ role, text, error }) {
  const isUser = role === 'user';
  return (
    <div className={`flex items-start gap-2 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
        isUser ? 'bg-violet-500/20 text-violet-300' : error ? 'bg-red-500/20 text-red-300' : 'bg-cyan-500/20 text-cyan-300'
      }`}>
        {isUser ? <User size={14}/> : <Bot size={14}/>}
      </div>
      <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm whitespace-pre-wrap ${
        isUser
          ? 'bg-violet-500/15 border border-violet-500/30 text-violet-100 rounded-tr-sm'
          : error
            ? 'bg-red-500/10 border border-red-500/30 text-red-200 rounded-tl-sm'
            : 'bg-slate-800 border border-slate-700 text-slate-200 rounded-tl-sm'
      }`}>
        {text}
      </div>
    </div>
  );
}
