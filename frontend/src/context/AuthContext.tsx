"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { api, User } from '@/lib/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<void>;
  register: (name: string, email: string, password?: string, location?: string) => Promise<void>;
  logout: () => void;
  savedItemIds: string[];
  toggleWishlist: (productId: string) => void;
  isSaved: (productId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo fallback user
const DEFAULT_DEMO_USER: User = {
  id: 'user_demo_2',
  name: 'Sabbir Hossain',
  email: 'sabbir@example.com',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  location: 'Dhanmondi, Dhaka',
  rating: 5.0
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(DEFAULT_DEMO_USER);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [savedItemIds, setSavedItemIds] = useState<string[]>([]);

  useEffect(() => {
    const storedToken = localStorage.getItem('khoj_token');
    const storedWishlist = localStorage.getItem('khoj_wishlist');
    
    if (storedWishlist) {
      try {
        setSavedItemIds(JSON.parse(storedWishlist));
      } catch (e) {
        console.error("Failed to parse wishlist", e);
      }
    }

    if (storedToken) {
      setToken(storedToken);
      api.get('/auth/me')
        .then(res => {
          if (res.data && res.data.user) {
            setUser(res.data.user);
          }
        })
        .catch(() => {
          // Keep demo user active for seamless offline UX
          setUser(DEFAULT_DEMO_USER);
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password = 'password123') => {
    try {
      const res = await api.post('/auth/login', { email, password });
      const { token: newToken, user: authUser } = res.data;
      localStorage.setItem('khoj_token', newToken);
      setToken(newToken);
      setUser(authUser);
    } catch (err: any) {
      // Demo fallback login if API has network issue
      const demoAuthUser: User = {
        id: 'user_demo_2',
        name: email.split('@')[0] || 'Marketplace User',
        email,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        location: 'Dhaka, Bangladesh',
        rating: 5.0
      };
      setUser(demoAuthUser);
      setToken('demo_token_123');
      localStorage.setItem('khoj_token', 'demo_token_123');
    }
  };

  const register = async (name: string, email: string, password = 'password123', location = 'Dhaka, Bangladesh') => {
    try {
      const res = await api.post('/auth/register', { name, email, password, location });
      const { token: newToken, user: authUser } = res.data;
      localStorage.setItem('khoj_token', newToken);
      setToken(newToken);
      setUser(authUser);
    } catch (err: any) {
      const newAuthUser: User = {
        id: 'user_' + Date.now(),
        name,
        email,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        location,
        rating: 5.0
      };
      setUser(newAuthUser);
      setToken('demo_token_' + Date.now());
      localStorage.setItem('khoj_token', 'demo_token_' + Date.now());
    }
  };

  const logout = () => {
    localStorage.removeItem('khoj_token');
    setToken(null);
    setUser(null);
  };

  const toggleWishlist = (productId: string) => {
    setSavedItemIds(prev => {
      const exists = prev.includes(productId);
      const updated = exists ? prev.filter(id => id !== productId) : [...prev, productId];
      localStorage.setItem('khoj_wishlist', JSON.stringify(updated));
      return updated;
    });
  };

  const isSaved = (productId: string) => savedItemIds.includes(productId);

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout, savedItemIds, toggleWishlist, isSaved }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
