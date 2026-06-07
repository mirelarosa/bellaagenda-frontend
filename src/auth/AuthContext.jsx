import { useEffect, useState, useCallback } from 'react';
import { AuthContext } from './context';
import { subscribeAuth, logoutFirebase } from '../config/firebase';
import { syncUser, fetchMe } from '../api/auth';

const ROLE_HOME = {
  client: '/cliente/servicos',
  professional: '/profissional/agenda',
  admin: '/admin/dashboard'
};

export function AuthProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshProfile = useCallback(async () => {
    try {
      const me = await fetchMe();
      setProfile(me);
      return me;
    } catch {
      setProfile(null);
      return null;
    }
  }, []);

  useEffect(() => {
    const unsub = subscribeAuth(async (firebaseUser) => {
      if (!firebaseUser) {
        setProfile(null);
        setLoading(false);
        return;
      }
      await refreshProfile();
      setLoading(false);
    });
    if (import.meta.env.MODE === 'test') {
      setLoading(false);
    }
    return unsub;
  }, [refreshProfile]);

  const login = async (email, password) => {
    const { loginWithEmail } = await import('../config/firebase');
    await loginWithEmail(email, password);
    try {
      const me = await fetchMe();
      setProfile(me);
      return me;
    } catch (err) {
      if (err.status === 404 || err.code === 'NOT_SYNCED') {
        const synced = await syncUser({
          role: 'client',
          name: email.split('@')[0]
        });
        setProfile(synced);
        return synced;
      }
      throw err;
    }
  };

  const register = async (email, password, role, name) => {
    const { registerWithEmail } = await import('../config/firebase');
    await registerWithEmail(email, password);
    const synced = await syncUser({ role, name });
    setProfile(synced);
    return synced;
  };

  const logout = async () => {
    await logoutFirebase();
    setProfile(null);
  };

  const homeForRole = (role) => ROLE_HOME[role] || '/';

  return (
    <AuthContext.Provider
      value={{ profile, loading, login, register, logout, refreshProfile, homeForRole }}
    >
      {children}
    </AuthContext.Provider>
  );
}
