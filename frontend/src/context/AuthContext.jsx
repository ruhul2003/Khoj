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
    let isMounted = true;

    const initAuth = async () => {
      const storedWishlist = typeof window !== 'undefined' ? localStorage.getItem('khoj_wishlist') : null;
      if (storedWishlist) {
        try {
          setSavedItemIds(JSON.parse(storedWishlist));
        } catch (e) {
          console.error("Failed to parse wishlist", e);
        }
      }

      // Check stored token and stored user for instant UI rendering
      const storedToken = typeof window !== 'undefined' ? localStorage.getItem('khoj_token') : null;
      const storedUser = typeof window !== 'undefined' ? localStorage.getItem('khoj_user') : null;
      
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          if (parsed && isMounted) {
            setUser(parsed);
          }
        } catch (e) {}
      }

      // 1. Check Better Auth active session (e.g. from Google OAuth callback)
      try {
        const sessionRes = await authClient.getSession();
        if (sessionRes?.data?.user) {
          const sUser = sessionRes.data.user;
          // Sync with Express backend to ensure JWT and DB synchronization
          try {
            const syncRes = await api.post('/auth/google-login', {
              name: sUser.name,
              email: sUser.email,
              avatar: sUser.image
            });
            if (syncRes.data && syncRes.data.user) {
              const mergedUser = {
                ...syncRes.data.user,
                avatar: sUser.image || syncRes.data.user.avatar,
                name: sUser.name || syncRes.data.user.name
              };
              if (isMounted) {
                setUser(mergedUser);
                setToken(syncRes.data.token);
                localStorage.setItem('khoj_token', syncRes.data.token);
                localStorage.setItem('khoj_user', JSON.stringify(mergedUser));
                fetchUserShop(mergedUser.id);
                setIsLoading(false);
              }
              return;
            }
          } catch (syncErr) {
            console.warn('Backend Google sync note:', syncErr.message);
            const realUser = {
              id: sUser.id || 'user_google_' + Date.now(),
              name: sUser.name || 'Google User',
              email: sUser.email,
              avatar: sUser.image || '',
              location: 'Dhaka, Bangladesh',
              rating: 5.0,
              hasShop: false,
              shopId: null
            };
            if (isMounted) {
              setUser(realUser);
              localStorage.setItem('khoj_user', JSON.stringify(realUser));
              setIsLoading(false);
            }
            return;
          }
        }
      } catch (sessionErr) {
        console.warn('Better Auth session check note:', sessionErr.message);
      }

      // 2. Validate stored JWT token with backend if no Better Auth session was returned
      if (storedToken) {
        setToken(storedToken);
        try {
          const res = await api.get('/auth/me');
          if (res.data && res.data.user && isMounted) {
            setUser(res.data.user);
            localStorage.setItem('khoj_user', JSON.stringify(res.data.user));
            fetchUserShop(res.data.user.id);
          }
        } catch (err) {
          console.warn('Stored token expired or invalid:', err.message);
          if (!storedUser && isMounted) {
            setUser(DEFAULT_DEMO_USER);
            fetchUserShop(DEFAULT_DEMO_USER.id);
          }
        } finally {
          if (isMounted) setIsLoading(false);
        }
      } else {
        // If neither token nor session exists, fallback to demo user for exploration
        if (!storedUser && isMounted) {
          setUser(DEFAULT_DEMO_USER);
          fetchUserShop(DEFAULT_DEMO_USER.id);
        }
        if (isMounted) setIsLoading(false);
      }
    };

    initAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (email, password = 'password123') => {
    try {
      try {
        await authClient.signIn.email({
          email,
          password,
        });
      } catch (betterAuthErr) {
        console.warn('Better Auth client sign in:', betterAuthErr.message);
      }

      const res = await api.post('/auth/login', { email, password });
      const { token: newToken, user: authUser } = res.data;
      localStorage.setItem('khoj_token', newToken);
      localStorage.setItem('khoj_user', JSON.stringify(authUser));
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
      localStorage.setItem('khoj_user', JSON.stringify(demoAuthUser));
      await fetchUserShop(demoAuthUser.id);
      return demoAuthUser;
    }
  };

  const register = async (name, email, password = 'password123', location = 'Dhaka, Bangladesh') => {
    try {
      try {
        await authClient.signUp.email({
          name,
          email,
          password,
        });
      } catch (betterAuthErr) {
        console.warn('Better Auth client register note:', betterAuthErr.message);
      }

      const res = await api.post('/auth/register', { name, email, password, location });
      const { token: newToken, user: authUser } = res.data;
      localStorage.setItem('khoj_token', newToken);
      localStorage.setItem('khoj_user', JSON.stringify(authUser));
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
      localStorage.setItem('khoj_user', JSON.stringify(newAuthUser));
      setUserShop(null);
      return newAuthUser;
    }
  };

  const loginWithGoogle = async (fallbackData = null) => {
    try {
      if (!fallbackData) {
        const callback = typeof window !== 'undefined' ? `${window.location.origin}/dashboard` : '/dashboard';
        const res = await authClient.signIn.social({
          provider: 'google',
          callbackURL: callback
        });
        if (res?.data?.url) {
          window.location.href = res.data.url;
        }
        return res;
      }

      const res = await api.post('/auth/google-login', fallbackData);
      const { token: newToken, user: authUser } = res.data;
      localStorage.setItem('khoj_token', newToken);
      localStorage.setItem('khoj_user', JSON.stringify(authUser));
      setToken(newToken);
      setUser(authUser);
      await fetchUserShop(authUser.id);
      return authUser;
    } catch (err) {
      console.error('Google sign in error:', err);
      // Demo fallback if completely offline or local test
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
      localStorage.setItem('khoj_user', JSON.stringify(demoGoogleUser));
      setUserShop(null);
      return demoGoogleUser;
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const res = await api.put('/auth/profile', profileData);
      if (res.data && res.data.user) {
        setUser(res.data.user);
        localStorage.setItem('khoj_user', JSON.stringify(res.data.user));
        return res.data.user;
      }
    } catch (err) {
      console.warn('Update profile backend note:', err.message);
      setUser(prev => {
        const updated = { ...prev, ...profileData };
        localStorage.setItem('khoj_user', JSON.stringify(updated));
        return updated;
      });
      return { ...user, ...profileData };
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
    setUser(prev => {
      const updated = { ...prev, hasShop: true, shopId: newShop._id || newShop.id };
      localStorage.setItem('khoj_user', JSON.stringify(updated));
      return updated;
    });
    return newShop;
  };

  const logout = async () => {
    try {
      await authClient.signOut();
    } catch (e) {}
    localStorage.removeItem('khoj_token');
    localStorage.removeItem('khoj_user');
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
      updateProfile,
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
