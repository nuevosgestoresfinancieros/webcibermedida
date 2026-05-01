import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { api } from '../utils/api';

const TOKEN_KEY = 'cibermedida-user-token';
const getToken = () => { try { return window.localStorage.getItem(TOKEN_KEY); } catch { return null; } };
const setToken = (t) => { try { t ? window.localStorage.setItem(TOKEN_KEY, t) : window.localStorage.removeItem(TOKEN_KEY); } catch {} };

const Ctx = createContext(null);

export function UserAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const withAuthHeader = (cfg = {}) => {
    const t = getToken();
    return { ...cfg, headers: { ...(cfg.headers || {}), ...(t ? { Authorization: `Bearer ${t}` } : {}) } };
  };

  const verify = useCallback(async () => {
    const t = getToken();
    if (!t) { setUser(null); setLoading(false); return; }
    try {
      const { data } = await api.get('/auth/me', withAuthHeader());
      setUser(data);
    } catch {
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { verify(); }, [verify]);

  const register = async (payload) => {
    const { data } = await api.post('/auth/register', payload);
    setToken(data.token);
    setUser(data.user);
    return data.user;
  };

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    setToken(data.token);
    setUser(data.user);
    return data.user;
  };

  const logout = () => { setToken(null); setUser(null); };

  const updateProfile = async (payload) => {
    const { data } = await api.patch('/auth/me', payload, withAuthHeader());
    setUser(data);
    return data;
  };

  const changePassword = async (current_password, new_password) => {
    await api.post('/auth/change-password', { current_password, new_password }, withAuthHeader());
  };

  const authHeaders = () => {
    const t = getToken();
    return t ? { Authorization: `Bearer ${t}` } : {};
  };

  return (
    <Ctx.Provider value={{ user, loading, login, register, logout, updateProfile, changePassword, authHeaders }}>
      {children}
    </Ctx.Provider>
  );
}

export const useUserAuth = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useUserAuth must be used within UserAuthProvider');
  return ctx;
};

export const getUserToken = getToken;
