import Link from 'next/link';
import Logo from '../components/Logo';

export default function ConnexionPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/"><Logo /></Link>
          <p className="text-sm text-[#5a7080] mt-2">Bienvenue sur votre espace bailleur</p>
        </div>
        <div className="border border-gray-100 rounded-2xl p-8">
          <h1 className="text-xl font-bold mb-6">Connexion</h1>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-[#0f1a22] block mb-1.5">Email</label>
              <input
                type="email"
                placeholder="jean.martin@email.com"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#2A9FD6] transition-colors"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-[#0f1a22]">Mot de passe</label>
                <a href="#" className="text-xs text-[#2A9FD6] hover:underline">Mot de passe oublié ?</a>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#2A9FD6] transition-colors"
              />
            </div>
            <Link
              href="/dashboard"
              className="block w-full text-center py-2.5 rounded-lg text-white font-medium text-sm mt-2"
              style={{ background: '#2A9FD6' }}
            >
              Se connecter
            </Link>
          </div>
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
