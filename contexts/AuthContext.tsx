
import React, { createContext, useState, useContext, useEffect, ReactNode, useCallback } from 'react';
import type { User } from '../types';
import { login as apiLogin, register as apiRegister, getUserById, updateUser as apiUpdateUser } from '../services/api';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, rememberMe: boolean) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUserProfile: (userData: Partial<Omit<User, 'id' | 'password'>>) => Promise<boolean>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const initializeAuth = useCallback(async () => {
    const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId');
    if (userId) {
      const userData = await getUserById(parseInt(userId, 10));
      if (userData) {
        setUser(userData);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const login = async (email: string, password: string, rememberMe: boolean): Promise<boolean> => {
    setLoading(true);
    const loggedInUser = await apiLogin(email, password);
    if (loggedInUser) {
      setUser(loggedInUser);
      if (rememberMe) {
        localStorage.setItem('userId', loggedInUser.id.toString());
      } else {
        sessionStorage.setItem('userId', loggedInUser.id.toString());
      }
      setLoading(false);
      return true;
    }
    setLoading(false);
    return false;
  };

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    setLoading(true);
    const newUser = await apiRegister(username, email, password);
    if (newUser) {
      setUser(newUser);
      // Default to session storage on registration
      sessionStorage.setItem('userId', newUser.id.toString());
      setLoading(false);
      return true;
    }
    setLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('userId');
    localStorage.removeItem('userId');
  };
  
  const updateUserProfile = async (userData: Partial<Omit<User, 'id' | 'password'>>): Promise<boolean> => {
    if (!user) return false;
    const updatedUser = await apiUpdateUser(user.id, userData);
    if (updatedUser) {
        setUser(updatedUser);
        return true;
    }
    return false;
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUserProfile, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
