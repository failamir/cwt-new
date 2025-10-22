import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../lib/api';

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: 'user' | 'admin';
  isVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  verifyEmail: (token: string) => Promise<boolean>;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  ktp: string;
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // On mount, if token exists, fetch current user
    (async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (!token) return;
        const me = await api.get<any>('/me');
        if (me) {
          const mapped: User = {
            id: me.id,
            email: me.email,
            role: (me.role as 'admin' | 'user') || 'user',
            isVerified: true,
          };
          setUser(mapped);
          setIsAuthenticated(true);
        }
      } catch (_e) {
        // token invalid
        localStorage.removeItem('auth_token');
      }
    })();
  }, []);

  const adminAllowlist = ['admin@cwt.com', 'admin@ciptawiratirta.com'];

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await api.post<{ user: any; token: string }>(`/login`, { email, password });
      if (!res?.token) return false;
      localStorage.setItem('auth_token', res.token);
      const me = res.user;
      const mapped: User = {
        id: me.id,
        email: me.email,
        role: (me.role as 'admin' | 'user') || (adminAllowlist.includes(email.toLowerCase()) ? 'admin' : 'user'),
        isVerified: true,
      };
      setUser(mapped);
      setIsAuthenticated(true);
      return true;
    } catch (e) {
      return false;
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      const full_name = [userData.firstName, userData.lastName].filter(Boolean).join(' ').trim();
      const res = await api.post<{ user: any; token: string }>(`/register`, {
        email: userData.email,
        password: userData.password,
        full_name,
      });
      if (!res?.token) return false;
      localStorage.setItem('auth_token', res.token);
      const me = res.user;
      const mapped: User = {
        id: me.id,
        email: me.email,
        role: (me.role as 'admin' | 'user') || 'user',
        isVerified: true,
      };
      setUser(mapped);
      setIsAuthenticated(true);
      return true;
    } catch (e) {
      return false;
    }
  };

  const logout = () => {
    (async () => {
      try {
        await api.post<unknown>('/logout', {});
      } catch (_e) {
        // ignore
      }
      localStorage.removeItem('auth_token');
      setUser(null);
      setIsAuthenticated(false);
    })();
  };

  const verifyEmail = async (token: string): Promise<boolean> => {
    // Supabase handles email verification via its built-in flows. Placeholder to keep API shape.
    return true;
  };

  const value = {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    verifyEmail
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};