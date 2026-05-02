import { createContext, useContext, useState, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { mockUser, adminUser } from '../data/mockData';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage('auth-user', null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!user);
  const [isAdmin, setIsAdmin] = useLocalStorage('auth-admin', false);
  const [admin, setAdmin] = useLocalStorage('auth-admin-user', null);

  const login = useCallback((email, password) => {
    if (email && password) {
      setUser({ ...mockUser, email });
      setIsAuthenticated(true);
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  }, [setUser]);

  const signup = useCallback((name, email, password) => {
    if (name && email && password) {
      setUser({ ...mockUser, name, email });
      setIsAuthenticated(true);
      return { success: true };
    }
    return { success: false, error: 'Please fill all fields' };
  }, [setUser]);

  const adminLogin = useCallback((email, password) => {
    if (email === adminUser.email && password === adminUser.password) {
      setAdmin({ name: adminUser.name, email: adminUser.email });
      setIsAdmin(true);
      return { success: true };
    }
    return { success: false, error: 'Invalid admin credentials' };
  }, [setAdmin]);

  const logout = useCallback(() => {
    if (isAdmin) {
      setAdmin(null);
      setIsAdmin(false);
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
  }, [isAdmin, setUser, setAdmin]);

  const adminLogout = useCallback(() => {
    setAdmin(null);
    setIsAdmin(false);
  }, [setAdmin]);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isAdmin,
      admin,
      login,
      signup,
      adminLogin,
      logout,
      adminLogout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
