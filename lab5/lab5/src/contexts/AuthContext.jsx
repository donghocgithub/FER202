import React, { createContext, useContext, useState, useEffect } from 'react';
import movieApi from '../api/movieAPI';

export const AuthStateContext = createContext();
export const AuthDispatchContext = createContext();

export const useAuthState = () => useContext(AuthStateContext);
export const useAuthDispatch = () => useContext(AuthDispatchContext);

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem('auth');
      if (raw) {
        const parsed = JSON.parse(raw);
        return { isAuthenticated: true, user: parsed, loading: false, error: null };
      }
    } catch (e) {
      // ignore
    }
    return { isAuthenticated: false, user: null, loading: false, error: null };
  });

  useEffect(() => {
    // keep localStorage in sync
    if (state.isAuthenticated && state.user) {
      localStorage.setItem('auth', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('auth');
    }
  }, [state.isAuthenticated, state.user]);

  const login = async (username, password) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const res = await movieApi.get(`/accounts?username=${encodeURIComponent(username)}`);
      const user = res.data && res.data[0];
      if (!user) {
        setState({ isAuthenticated: false, user: null, loading: false, error: 'User not found' });
        return false;
      }
      if (user.password !== password) {
        setState({ isAuthenticated: false, user: null, loading: false, error: 'Invalid password' });
        return false;
      }
      // success
      setState({ isAuthenticated: true, user, loading: false, error: null });
      return true;
    } catch (err) {
      setState({ isAuthenticated: false, user: null, loading: false, error: err.message || 'Login error' });
      return false;
    }
  };

  const logout = () => {
    setState({ isAuthenticated: false, user: null, loading: false, error: null });
  };

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={{ login, logout }}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};
