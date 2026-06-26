'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '../components/Logo';
import { CheckCircle, ArrowRight } from 'lucide-react';

const steps = ['Compte', 'Mon bien', 'Mon locataire'];

export default function InscriptionPage() {
  const [step, setStep] = useState(0);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <Link href="/"><Logo /></Link>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    i < step ? 'bg-[#2A9FD6] text-white' : i === step ? 'bg-[#2A9FD6] text-white' : 'bg-gray-100 text-[#5a7080]'
                  }`}
                >
                  {i < step ? <CheckCircle size={14} /> : i + 1}
                </div>
                <span className={`text-sm font-medium ${i === step ? 'text-[#0f1a22]' : 'text-[#5a7080]'}`}>{s}</span>
              </div>
              {i < steps.length - 1 && <div className="w-8 h-px bg-gray-200 mx-1" />}
            </div>
          ))}
        </div>

        <div className="border border-gray-100 rounded-2xl p-8">
          {step === 0 && (
            <>
              <h1 className="text-xl font-bold mb-2">Créer votre compte</h1>
              <p className="text-sm text-[#5a7080] mb-6">Gratuit, sans carte bancaire.</p>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium block mb-1.5">Prénom</label>
                    <input type="text" placeholder="Jean" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#2A9FD6] transition-colors" />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1.5">Nom</label>
                    <input type="text" placeholder="Martin" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#2A9FD6] transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1.5">Email</label>
                  <input type="email" placeholder="jean.martin@email.com" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#2A9FD6] transition-colors" />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1.5">Mot de passe</label>
                  <input type="password" placeholder="Au moins 8 caractères" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#2A9FD6] transition-colors" />
                </div>
                <button onClick={() => setStep(1)} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-white font-medium text-sm mt-2" style={{ background: '#2A9FD6' }}>
                  Continuer <ArrowRight size={16} />
                </button>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <h1 className="text-xl font-bold mb-2">Ajoutez votre premier bien</h1>
              <p className="text-sm text-[#5a7080] mb-6">Vous pourrez en ajouter d'autres plus tard.</p>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium block mb-1.5">Adresse du bien</label>
                  <input type="text" placeholder="12 rue des Lilas, 75011 Paris" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#2A9FD6] transition-colors" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium block mb-1.5">Type de bien</label>
                    <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#2A9FD6] transition-colors bg-white">
                      <option>Appartement</option>
                      <option>Maison</option>
                      <option>Studio</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1.5">Type de bail</label>
                    <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#2A9FD6] transition-colors bg-white">
                      <option>Vide</option>
                      <option>Meublé</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium block mb-1.5">Loyer (€)</label>
                    <input type="number" placeholder="800" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#2A9FD6] transition-colors" />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1.5">Charges (€)</label>
                    <input type="number" placeholder="60" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#2A9FD6] transition-colors" />
                  </div>
                </div>
                <div className="flex gap-3 mt-2">
                  <button onClick={() => setStep(0)} className="flex-1 py-2.5 rounded-lg text-sm font-medium border border-gray-200 text-[#5a7080] hover:border-gray-300 transition-colors">
                    Retour
                  </button>
                  <button onClick={() => setStep(2)} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-white font-medium text-sm" style={{ background: '#2A9FD6' }}>
                    Continuer <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h1 className="text-xl font-bold mb-2">Ajoutez votre locataire</h1>
              <p className="text-sm text-[#5a7080] mb-6">Informations nécessaires pour les quittances.</p>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium block mb-1.5">Prénom</label>
                    <input type="text" placeholder="Marie" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#2A9FD6] transition-colors" />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1.5">Nom</label>
                    <input type="text" placeholder="Dupont" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#2A9FD6] transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1.5">Email du locataire</label>
                  <input type="email" placeholder="marie.dupont@email.com" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#2A9FD6] transition-colors" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium block mb-1.5">Date d'entrée</label>
                    <input type="date" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#2A9FD6] transition-colors" />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1.5">Dépôt de garantie (€)</label>
                    <input type="number" placeholder="1600" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#2A9FD6] transition-colors" />
                  </div>
                </div>
                <div className="flex gap-3 mt-2">
                  <button onClick={() => setStep(1)} className="flex-1 py-2.5 rounded-lg text-sm font-medium border border-gray-200 text-[#5a7080] hover:border-gray-300 transition-colors">
                    Retour
                  </button>
                  <button onClick={() => router.push('/dashboard')} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-white font-medium text-sm" style={{ background: '#2A9FD6' }}>
                    Accéder au dashboard <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        <p className="text-center text-sm text-[#5a7080] mt-6">
          Déjà un compte ?{' '}
          <Link href="/connexion" className="font-medium text-[#2A9FD6] hover:underline">Se connecter</Link>
        </p>
      </div>
    </div>
  );
}
