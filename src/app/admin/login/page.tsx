'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  if (isAuthenticated) {
    router.push('/admin');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (login(email, password)) {
      router.push('/admin');
    } else {
      setError('Invalid credentials. Use admin@bigthinkcapital.com / admin123');
    }
  };

  return (
    <div className="min-h-screen bg-slate-925 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center mx-auto mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <h1 className="font-display text-2xl text-white">Admin Login</h1>
          <p className="text-sm text-slate-400 mt-1">Big Think Capital CMS</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-300">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
              <input
                id="email" type="email" required placeholder="admin@bigthinkcapital.com"
                value={email} onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500/40 transition-all"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
              <input
                id="password" type="password" required placeholder="••••••••"
                value={password} onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500/40 transition-all"
              />
            </div>
            <button type="submit" className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-xl transition-colors mt-2">
              Sign In
            </button>
          </form>

          <div className="mt-6 p-3 bg-slate-800/50 rounded-lg">
            <p className="text-xs text-slate-500 text-center">
              Demo credentials: <span className="text-slate-400">admin@bigthinkcapital.com</span> / <span className="text-slate-400">admin123</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
