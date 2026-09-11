"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { authClient } from '@/lib/auth-client';

const AuthContext = createContext(undefined);

const DEFAULT_DEMO_USER = {
  id: 'user_demo_2',
  name: 'Sabbir Hossain',
  email: 'sabbir@example.com',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  location: 'Dhanmondi, Dhaka',
  rating: 5.0,
  hasShop: true,
  shopId: 'shop_seed_2'
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userShop, setUserShop] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [savedItemIds, setSavedItemIds] = useState([]);

  const fetchUserShop = async (userId) => {
    if (!userId) return null;
    try {
      const res = await api.get('/shops/me', { params: { ownerId: userId } });
      if (res.data && res.data.shop) {
        setUserShop(res.data.shop);
        return res.data.shop;
      } else {
        setUserShop(null);
        return null;
      }
    } catch (e) {
      console.warn('Could not fetch user shop:', e.message);
      return null;
    }
  };

  useEffect(() => {
    const storedToken = typeof window !== 'undefined' ? localStorage.getItem('khoj_token') : null;
    const storedWishlist = typeof window !== 'undefined' ? localStorage.getItem('khoj_wishlist') : null;
    
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
            fetchUserShop(res.data.user.id);
          } else {
            setUser(DEFAULT_DEMO_USER);
            fetchUserShop(DEFAULT_DEMO_USER.id);
          }
        })
        .catch(() => {
          setUser(DEFAULT_DEMO_USER);
          fetchUserShop(DEFAULT_DEMO_USER.id);
        })
        .finally(() => setIsLoading(false));
    } else {
      // Default to demo user for smooth immediate preview if no token
      setUser(DEFAULT_DEMO_USER);
      fetchUserShop(DEFAULT_DEMO_USER.id);
      setIsLoading(false);
    }
  }, []);

  const login = async (email, password = 'password123') => {
    try {
      // Attempt Better Auth client sign in
      try {
        await authClient.signIn.email({
          email,
          password,
        });
      } catch (betterAuthErr) {
        console.warn('Better Auth client note:', betterAuthErr.message);
      }

      // Sync with Express backend
      const res = await api.post('/auth/login', { email, password });
      const { token: newToken, user: authUser } = res.data;
      localStorage.setItem('khoj_token', newToken);
      setToken(newToken);
      setUser(authUser);
      await fetchUserShop(authUser.id);
      return authUser;
    } catch (err) {
      const demoAuthUser = {
        id: 'user_demo_2',
        name: email.split('@')[0] || 'Marketplace User',
        email,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        location: 'Dhaka, Bangladesh',
        rating: 5.0,
        hasShop: false,
        shopId: null
      };
      setUser(demoAuthUser);
      setToken('demo_token_123');
      localStorage.setItem('khoj_token', 'demo_token_123');
      await fetchUserShop(demoAuthUser.id);
      return demoAuthUser;
    }
  };

  const register = async (name, email, password = 'password123', location = 'Dhaka, Bangladesh') => {
    try {
      // Attempt Better Auth client registration
      try {
        await authClient.signUp.email({
          name,
          email,
          password,
        });
      } catch (betterAuthErr) {
        console.warn('Better Auth client note:', betterAuthErr.message);
      }

      // Sync with Express backend
      const res = await api.post('/auth/register', { name, email, password, location });
      const { token: newToken, user: authUser } = res.data;
      localStorage.setItem('khoj_token', newToken);
      setToken(newToken);
      setUser(authUser);
      setUserShop(null);
      return authUser;
    } catch (err) {
      const newAuthUser = {
        id: 'user_' + Date.now(),
        name,
        email,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        location,
        rating: 5.0,
        hasShop: false,
        shopId: null
      };
      setUser(newAuthUser);
      setToken('demo_token_' + Date.now());
      localStorage.setItem('khoj_token', 'demo_token_' + Date.now());
      setUserShop(null);
      return newAuthUser;
    }
  };

  const loginWithGoogle = async (fallbackData = null) => {
    try {
      // Trigger Better Auth Google Social Sign-in
      if (!fallbackData) {
        try {
          const authResult = await authClient.signIn.social({
            provider: 'google',
            callbackURL: typeof window !== 'undefined' ? `${window.location.origin}/dashboard` : '/dashboard'
          });
          if (authResult?.data?.user) {
            fallbackData = {
              name: authResult.data.user.name,
              email: authResult.data.user.email,
              avatar: authResult.data.user.image
            };
          }
        } catch (socialErr) {
          console.warn('Better Auth social provider note:', socialErr.message);
        }
      }

      // If simulated or fallback Google sign-in details provided
      const googleUserPayload = fallbackData || {
        name: 'Google User',
        email: `google.user.${Date.now().toString().slice(-4)}@gmail.com`,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
      };

      const res = await api.post('/auth/google-login', googleUserPayload);
      const { token: newToken, user: authUser } = res.data;
      localStorage.setItem('khoj_token', newToken);
      setToken(newToken);
      setUser(authUser);
      await fetchUserShop(authUser.id);
      return authUser;
    } catch (err) {
      const demoGoogleUser = {
        id: 'user_google_' + Date.now(),
        name: fallbackData?.name || 'Google Verified User',
        email: fallbackData?.email || 'google.user@gmail.com',
        avatar: fallbackData?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        location: 'Dhaka, Bangladesh',
        rating: 5.0,
        hasShop: false,
        shopId: null
      };
      setUser(demoGoogleUser);
      setToken('demo_google_token_' + Date.now());
      localStorage.setItem('khoj_token', 'demo_google_token_' + Date.now());
      setUserShop(null);
      return demoGoogleUser;
    }
  };

  const createShop = async (shopData) => {
    if (!user) throw new Error('You must be signed in to open a shop.');
    const payload = {
      ...shopData,
      ownerId: user.id,
      ownerName: user.name,
      ownerEmail: user.email
    };
    const res = await api.post('/shops', payload);
    const newShop = res.data.shop;
    setUserShop(newShop);
    setUser(prev => ({ ...prev, hasShop: true, shopId: newShop._id || newShop.id }));
    return newShop;
  };

  const logout = () => {
    try {
      authClient.signOut();
    } catch (e) {
      // Ignore
    }
    localStorage.removeItem('khoj_token');
    setToken(null);
    setUser(null);
    setUserShop(null);
  };

  const toggleWishlist = (productId) => {
    setSavedItemIds(prev => {
      const exists = prev.includes(productId);
      const updated = exists ? prev.filter(id => id !== productId) : [...prev, productId];
      localStorage.setItem('khoj_wishlist', JSON.stringify(updated));
      return updated;
    });
  };

  const isSaved = (productId) => savedItemIds.includes(productId);

  return (
    <AuthContext.Provider value={{
      user,
      userShop,
      token,
      isLoading,
      login,
      register,
      loginWithGoogle,
      createShop,
      fetchUserShop,
      setUserShop,
      logout,
      savedItemIds,
      toggleWishlist,
      isSaved
    }}>
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
