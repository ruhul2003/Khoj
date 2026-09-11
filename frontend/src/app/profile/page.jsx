"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { uploadToImgbb } from '@/lib/imgbb';
import { 
  User, 
  Mail, 
  MapPin, 
  Camera, 
  CheckCircle2, 
  ShieldCheck, 
  Store, 
  Package, 
  ExternalLink, 
  Edit3, 
  Save, 
  X, 
  Sparkles, 
  ArrowRight,
  UploadCloud,
  Check
} from 'lucide-react';

export default function ProfilePage() {
  const { user, userShop, updateProfile, isLoading } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [avatar, setAvatar] = useState('');
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setLocation(user.location || 'Dhaka, Bangladesh');
      setAvatar(user.avatar || '');
    }
  }, [user]);

  const handleAvatarFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAvatar(true);
    setStatusMessage({ type: '', text: '' });
    try {
      const imageUrl = await uploadToImgbb(file);
      setAvatar(imageUrl);
      setStatusMessage({ type: 'success', text: 'Avatar uploaded! Click Save to apply.' });
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.message || 'Failed to upload image.' });
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatusMessage({ type: '', text: '' });
    try {
      await updateProfile({
        name,
        avatar,
        location
      });
      setIsEditing(false);
      setStatusMessage({ type: 'success', text: 'Profile updated successfully!' });
      setTimeout(() => setStatusMessage({ type: '', text: '' }), 4000);
    } catch (err) {
      setStatusMessage({ type: 'error', text: 'Failed to update profile.' });
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center font-['Bai_Jamjuree']">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0c9096]"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 font-['Bai_Jamjuree']">
        <div className="glass-panel max-w-md p-8 rounded-3xl border border-zinc-800 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-zinc-800 text-zinc-400 flex items-center justify-center mx-auto">
            <User className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-extrabold text-white">Sign in to view your profile</h2>
          <p className="text-xs text-zinc-400">
            Access your personal profile, listings, shop management, and order history.
          </p>
          <div className="pt-2 flex gap-3 justify-center">
            <Link
              href="/auth/login"
              className="px-6 py-2.5 bg-gradient-to-r from-[#0c9096] to-[#0a6c71] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg"
            >
              Sign In
            </Link>
            <Link
              href="/auth/register"
              className="px-6 py-2.5 bg-zinc-900 hover:bg-zinc-850 text-white font-bold text-xs uppercase tracking-wider rounded-xl border border-zinc-700"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-['Bai_Jamjuree']">
      {/* Toast Notification */}
      {statusMessage.text && (
        <div className={`p-4 rounded-2xl text-xs font-semibold flex items-center gap-2 border animate-in fade-in duration-200 ${
          statusMessage.type === 'success' 
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
            : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
        }`}>
          {statusMessage.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <X className="w-4 h-4 shrink-0" />}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Main Profile Header Card */}
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-zinc-800 relative overflow-hidden shadow-2xl">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#0c9096]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#689db8]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-8">
          {/* Avatar Section */}
          <div className="relative group shrink-0">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-[#0c9096] shadow-2xl transition-transform group-hover:scale-105"
              />
            ) : (
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-[#0c9096] to-[#689db8] text-white flex items-center justify-center font-extrabold text-4xl shadow-2xl border-4 border-[#0c9096]/50">
                {user.name?.charAt(0) || 'U'}
              </div>
            )}

            <button
              onClick={() => setIsEditing(true)}
              title="Change Profile Photo"
              className="absolute bottom-1 right-1 p-2.5 bg-zinc-900/90 hover:bg-[#0c9096] text-white rounded-full border border-zinc-700 shadow-xl transition-all cursor-pointer group-hover:scale-110"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>

          {/* Profile Details */}
          <div className="flex-1 text-center sm:text-left space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center justify-center sm:justify-start gap-2">
                  <span>{user.name || 'Marketplace User'}</span>
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                </h1>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1 flex items-center justify-center sm:justify-start gap-2">
                  <Mail className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{user.email}</span>
                </p>
              </div>

              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                  isEditing 
                    ? 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700' 
                    : 'bg-zinc-900/90 hover:bg-[#0c9096] text-white border-zinc-700/80 hover:border-[#0c9096] shadow-md'
                }`}
              >
                {isEditing ? (
                  <>
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </>
                ) : (
                  <>
                    <Edit3 className="w-4 h-4 text-[#0c9096]" />
                    <span>Edit Profile</span>
                  </>
                )}
              </button>
            </div>

            {/* Badges & Meta */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 pt-1">
              <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Verified Marketplace Account</span>
              </span>

              <span className="px-3 py-1 rounded-full bg-zinc-800/80 border border-zinc-700 text-zinc-300 text-[11px] font-medium flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#0c9096]" />
                <span>{user.location || 'Dhaka, Bangladesh'}</span>
              </span>

              {userShop && (
                <span className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-bold flex items-center gap-1.5">
                  <Store className="w-3.5 h-3.5 text-amber-400" />
                  <span>Shop: {userShop.name}</span>
                </span>
              )}
            </div>

            {/* Quick Action Navigation */}
            <div className="pt-3 flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <Link
                href="/dashboard"
                className="px-4 py-2 bg-zinc-900 hover:bg-zinc-850 text-white rounded-xl border border-zinc-800 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors shadow-sm"
              >
                <Package className="w-3.5 h-3.5 text-[#0c9096]" />
                <span>Dashboard</span>
              </Link>
              {userShop && (
                <Link
                  href="/sell"
                  className="px-4 py-2 bg-[#0c9096] hover:bg-[#0da2a9] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-md"
                >
                  <span>+ Post New Product</span>
                </Link>
              )}
              {userShop ? (
                <Link
                  href={`/shop/${userShop.slug}`}
                  className="px-4 py-2 bg-zinc-900 hover:bg-zinc-850 text-amber-400 rounded-xl border border-zinc-800 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors shadow-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View Public Shop</span>
                </Link>
              ) : (
                <Link
                  href="/shop/create"
                  className="px-4 py-2 bg-zinc-900 hover:bg-zinc-850 text-amber-400 rounded-xl border border-zinc-800 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors shadow-sm"
                >
                  <Store className="w-3.5 h-3.5" />
                  <span>Open A Shop</span>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Inline Edit Profile Form */}
        {isEditing && (
          <form onSubmit={handleSaveProfile} className="mt-8 pt-8 border-t border-zinc-800 space-y-6 animate-in fade-in duration-200">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-[#0c9096]" />
              <span>Update Profile Information</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Enter your name"
                    className="w-full pl-11 pr-4 py-3 bg-zinc-950 text-white rounded-2xl border border-zinc-800 focus:outline-none focus:border-[#0c9096] text-xs font-medium transition-colors"
                  />
                  <User className="w-4 h-4 text-zinc-500 absolute left-4 top-3.5" />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                  Location / City
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Dhanmondi, Dhaka"
                    className="w-full pl-11 pr-4 py-3 bg-zinc-950 text-white rounded-2xl border border-zinc-800 focus:outline-none focus:border-[#0c9096] text-xs font-medium transition-colors"
                  />
                  <MapPin className="w-4 h-4 text-zinc-500 absolute left-4 top-3.5" />
                </div>
              </div>

              {/* Avatar URL or Upload */}
              <div className="md:col-span-2 space-y-2">
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                  Profile Avatar (Image URL or Direct Upload)
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="url"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                    placeholder="https://... image URL (Google avatar, photo link, etc.)"
                    className="flex-1 px-4 py-3 bg-zinc-950 text-white rounded-2xl border border-zinc-800 focus:outline-none focus:border-[#0c9096] text-xs font-medium transition-colors"
                  />
                  
                  <label className="px-5 py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 rounded-2xl border border-zinc-700/80 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors shrink-0">
                    <UploadCloud className="w-4 h-4 text-[#0c9096]" />
                    <span>{uploadingAvatar ? 'Uploading...' : 'Upload Photo'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarFileChange}
                      disabled={uploadingAvatar}
                      className="hidden"
                    />
                  </label>
                </div>
                <p className="text-[11px] text-zinc-500">
                  You can paste any direct image link or upload a picture. Google avatars are automatically loaded when signing in with Google.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-850 text-zinc-400 hover:text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving || uploadingAvatar}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0c9096] to-[#0a6c71] hover:from-[#0da2a9] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-[#0c9096]/20 transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Saving...' : 'Save Profile Changes'}</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Account Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-3xl border border-zinc-800 space-y-2">
          <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">Authentication Provider</span>
          <p className="text-lg font-extrabold text-white flex items-center gap-2">
            {user.avatar?.includes('googleusercontent') ? (
              <>
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Google Account</span>
              </>
            ) : (
              <span>Email & Password</span>
            )}
          </p>
          <span className="text-[11px] text-zinc-500 block">Verified security session</span>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-zinc-800 space-y-2">
          <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">Seller Rating</span>
          <p className="text-lg font-extrabold text-emerald-400">5.0 ★ (Verified)</p>
          <span className="text-[11px] text-zinc-500 block">Trust badge active</span>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-zinc-800 space-y-2 sm:col-span-2 lg:col-span-1">
          <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">Shop Status</span>
          <p className="text-lg font-extrabold text-amber-400">
            {userShop ? userShop.name : 'No Shop Registered'}
          </p>
          <span className="text-[11px] text-zinc-500 block">
            {userShop ? 'Official storefront active' : 'You can open a free storefront anytime'}
          </span>
        </div>
      </div>
    </div>
  );
}
