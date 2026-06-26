'use client';
import AppLayout from '../components/AppLayout';
import { useState } from 'react';
import { User, Mail, CreditCard, Bell, CheckCircle } from 'lucide-react';

const tabs = [
  { id: 'profil', label: 'Profil', icon: User },
  { id: 'abonnement', label: 'Abonnement', icon: CreditCard },
  { id: 'notifications', label: 'Notifications', icon: Bell },
];

const plans = [
  { name: 'Gratuit', price: '0', biens: '1 bien', current: false },
  { name: 'Essentiel', price: '9', biens: '2 biens', current: true },
  { name: 'Pro', price: '19', biens: '5 biens', current: false },
  { name: 'Pro+', price: '29', biens: 'Illimité', current: false },
];

export default function ParametresPage() {
  const [activeTab, setActiveTab] = useState('profil');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#0f1a22]">Paramètres</h1>
          <p className="text-sm text-[#5a7080] mt-1">Gérez votre compte et vos préférences</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-gray-100 mb-8">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
                activeTab === id
                  ? 'border-[#2A9FD6] text-[#2A9FD6]'
                  : 'border-transparent text-[#5a7080] hover:text-[#0f1a22]'
              }`}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </div>

        {activeTab === 'profil' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h2 className="font-semibold mb-5">Informations personnelles</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium block mb-1.5">Prénom</label>
                    <input type="text" defaultValue="Jean" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#2A9FD6]" />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1.5">Nom</label>
                    <input type="text" defaultValue="Martin" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#2A9FD6]" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1.5">Email</label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5a7080]" />
                    <input type="email" defaultValue="jean.martin@email.com" className="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-sm outline-none focus:border-[#2A9FD6]" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1.5">Téléphone</label>
                  <input type="tel" defaultValue="06 12 34 56 78" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#2A9FD6]" />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1.5">Adresse de facturation</label>
                  <input type="text" defaultValue="15 rue de la République, 75001 Paris" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#2A9FD6]" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h2 className="font-semibold mb-5">Changer le mot de passe</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium block mb-1.5">Mot de passe actuel</label>
                  <input type="password" placeholder="••••••••" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#2A9FD6]" />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1.5">Nouveau mot de passe</label>
                  <input type="password" placeholder="••••••••" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#2A9FD6]" />
                </div>
              </div>
            </div>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-white text-sm font-medium transition-colors"
              style={{ background: '#2A9FD6' }}
            >
              {saved ? <><CheckCircle size={15} /> Enregistré !</> : 'Enregistrer les modifications'}
            </button>
          </div>
        )}

        {activeTab === 'abonnement' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h2 className="font-semibold mb-1">Votre abonnement</h2>
              <p className="text-sm text-[#5a7080] mb-6">Plan actuel : <span className="font-semibold text-[#2A9FD6]">Essentiel — 9€/mois</span></p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {plans.map((plan) => (
                  <div key={plan.name} className={`rounded-xl border p-4 ${plan.current ? 'border-[#2A9FD6] bg-[#f0f8fd]' : 'border-gray-100'}`}>
                    {plan.current && <p className="text-xs font-semibold text-[#2A9FD6] mb-2">ACTUEL</p>}
                    <p className="text-sm font-semibold text-[#0f1a22]">{plan.name}</p>
                    <p className="text-2xl font-bold mt-1">{plan.price}<span className="text-xs font-normal text-[#5a7080]">€/mois</span></p>
                    <p className="text-xs text-[#5a7080] mt-1">{plan.biens}</p>
                    {!plan.current && (
                      <button className="mt-3 w-full py-1.5 rounded-lg text-xs font-medium border border-gray-200 text-[#5a7080] hover:border-[#2A9FD6] hover:text-[#2A9FD6] transition-colors">
                        Passer à ce plan
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h2 className="font-semibold mb-4">Moyen de paiement</h2>
              <div className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg">
                <CreditCard size={18} className="text-[#5a7080]" />
                <div>
                  <p className="text-sm font-medium">Visa •••• 4242</p>
                  <p className="text-xs text-[#5a7080]">Expire 12/2026</p>
                </div>
                <button className="ml-auto text-xs text-[#2A9FD6] hover:underline">Modifier</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-5">
            <h2 className="font-semibold">Préférences email</h2>
            {[
              { label: 'Rappel envoi quittances', desc: 'Reçevez un rappel le 1er de chaque mois', defaut: true },
              { label: 'Alerte impayé', desc: 'Notification immédiate en cas de loyer impayé', defaut: true },
              { label: 'Confirmation envoi quittance', desc: 'Email de confirmation après chaque quittance envoyée', defaut: false },
              { label: 'Rapport mensuel', desc: 'Résumé mensuel de votre gestion locative', defaut: true },
              { label: 'Actualités Mylocavio', desc: "Nouveautés et conseils gestion locative", defaut: false },
            ].map((notif) => (
              <div key={notif.label} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-[#0f1a22]">{notif.label}</p>
                  <p className="text-xs text-[#5a7080]">{notif.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer ml-4">
                  <input type="checkbox" defaultChecked={notif.defaut} className="sr-only peer" />
                  <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#2A9FD6]" />
                </label>
              </div>
            ))}
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-white text-sm font-medium"
              style={{ background: '#2A9FD6' }}
            >
              {saved ? <><CheckCircle size={15} /> Enregistré !</> : 'Enregistrer'}
            </button>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
