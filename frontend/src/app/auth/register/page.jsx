"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { User, Mail, Lock, MapPin, Store, ArrowRight, Sparkles, Check } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { register, loginWithGoogle } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('Dhaka, Bangladesh');
  const [wantsShop, setWantsShop] = useState(true);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await register(name, email, password, location);
      if (wantsShop) {
        router.push('/shop/create?welcome=true');
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError('');
    try {
      await loginWithGoogle();
      if (wantsShop) {
        router.push('/shop/create?welcome=true');
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      setError('Google Sign-in failed. Please try again.');
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 py-12 font-['Bai_Jamjuree']">
      <div className="glass-panel w-full max-w-lg p-8 sm:p-10 rounded-3xl border border-zinc-800 space-y-6 shadow-2xl relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#0c9096]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#689db8]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center space-y-2 relative">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#0c9096] to-[#689db8] flex items-center justify-center text-white font-black text-2xl mx-auto shadow-xl shadow-[#0c9096]/25">
            K
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Create Your Account
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            Join Khoj to discover deals and launch your own verified shop
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs text-center font-medium">
            {error}
          </div>
        )}

        {/* Google One-Click Sign In via Better Auth */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={googleLoading || loading}
            className="w-full py-3.5 px-4 bg-zinc-900/90 hover:bg-zinc-850 text-white rounded-2xl border border-zinc-700/80 hover:border-zinc-500 text-xs sm:text-sm font-bold flex items-center justify-center gap-3 transition-all shadow-md group active:scale-[0.99] cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>{googleLoading ? 'Connecting Google Account...' : 'Continue with Google'}</span>
          </button>

          <div className="flex items-center gap-3 my-4">
            <div className="h-px bg-zinc-800 flex-1" />
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Or register with email</span>
            <div className="h-px bg-zinc-800 flex-1" />
          </div>
        </div>

        {/* Email & Password Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-2 uppercase tracking-wider">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Tanvir Rahman"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3.5 bg-zinc-950 text-white rounded-2xl border border-zinc-800 focus:outline-none focus:border-[#0c9096] text-xs font-medium transition-colors"
              />
              <User className="w-4 h-4 text-zinc-500 absolute left-4 top-4" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-2 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="tanvir@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3.5 bg-zinc-950 text-white rounded-2xl border border-zinc-800 focus:outline-none focus:border-[#0c9096] text-xs font-medium transition-colors"
              />
              <Mail className="w-4 h-4 text-zinc-500 absolute left-4 top-4" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-2 uppercase tracking-wider">
              City / Location
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Gulshan, Dhaka"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3.5 bg-zinc-950 text-white rounded-2xl border border-zinc-800 focus:outline-none focus:border-[#0c9096] text-xs font-medium transition-colors"
              />
              <MapPin className="w-4 h-4 text-zinc-500 absolute left-4 top-4" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-2 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full pl-11 pr-4 py-3.5 bg-zinc-950 text-white rounded-2xl border border-zinc-800 focus:outline-none focus:border-[#0c9096] text-xs font-medium transition-colors"
              />
              <Lock className="w-4 h-4 text-zinc-500 absolute left-4 top-4" />
            </div>
          </div>

          {/* Shop Creation Feature Opt-in */}
          <div
            onClick={() => setWantsShop(!wantsShop)}
            className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 select-none ${
              wantsShop
                ? 'bg-[#0c9096]/10 border-[#0c9096]/40 text-white'
                : 'bg-zinc-950 border-zinc-800 text-zinc-400'
            }`}
          >
            <div className={`mt-0.5 w-5 h-5 rounded-lg flex items-center justify-center border transition-colors ${
              wantsShop ? 'bg-[#0c9096] border-[#0c9096] text-white' : 'border-zinc-700 bg-zinc-900'
            }`}>
              {wantsShop && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
            <div className="flex-1 text-xs">
              <div className="font-bold flex items-center gap-1.5 text-white">
                <Store className="w-3.5 h-3.5 text-[#0c9096]" />
                <span>Create my own shop right after registering</span>
                <span className="px-1.5 py-0.5 bg-[#0c9096]/20 text-[#0c9096] text-[10px] rounded-md font-extrabold uppercase">Free</span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Get a dedicated storefront URL, verified seller badge, and direct buyer inquiries.
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-[#0c9096] to-[#0a6c71] hover:from-[#0da2a9] hover:to-[#0c9096] text-white font-bold text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-[#0c9096]/20 transition-all flex items-center justify-center gap-2 group cursor-pointer active:scale-[0.99]"
          >
            <Sparkles className="w-4 h-4 text-[#689db8]" />
            <span>{loading ? 'Creating Account...' : wantsShop ? 'Register & Set Up Shop' : 'Create Account'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="text-center text-xs text-zinc-400 pt-2 border-t border-zinc-800">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-[#0c9096] hover:text-[#689db8] font-bold">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
