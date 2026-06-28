'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '../components/Logo';
import { supabase } from '../../lib/supabase';

export default function ConnexionPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError('Email ou mot de passe incorrect.');
    } else {
      router.push('/dashboard');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/"><Logo /></Link>
          <p className="text-sm text-[#5a7080] mt-2">Bienvenue sur votre espace bailleur</p>
        </div>
        <div className="border border-gray-100 rounded-2xl p-8">
          <h1 className="text-xl font-bold mb-6">Connexion</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-medium block mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="jean.martin@email.com"
                required
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#2A9FD6] transition-colors"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium">Mot de passe</label>
                <a href="#" className="text-xs text-[#2A9FD6] hover:underline">Oublié ?</a>
              </div>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#2A9FD6] transition-colors"
              />
            </div>
            {error && <p className="text-xs text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="block w-full text-center py-2.5 rounded-lg text-white font-medium text-sm mt-2 disabled:opacity-60"
              style={{ background: '#2A9FD6' }}
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>
        </div>
        <p className="text-center text-sm text-[#5a7080] mt-6">
          Pas encore de compte ?{' '}
          <Link href="/inscription" className="font-medium text-[#2A9FD6] hover:underline">
            Créer un compte gratuit
          </Link>
        </p>
      </div>
    </div>
  );
}
