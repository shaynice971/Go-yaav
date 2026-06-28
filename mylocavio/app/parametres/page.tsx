'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AppLayout from '../components/AppLayout';
import { User, CreditCard, Bell, CheckCircle, LogOut } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Database } from '../../lib/database.types';

type Profile = Database['public']['Tables']['profiles']['Row'];

const tabs = ['Profil', 'Abonnement', 'Notifications'];

const plans = [
  { id: 'gratuit', label: 'Gratuit', price: '0 €', features: ['1 bien', '3 quittances/mois', 'Relances manuelles'] },
  { id: 'essentiel', label: 'Essentiel', price: '9 €/mois', features: ['3 biens', 'Quittances illimitées', 'Relances automatiques'], popular: true },
  { id: 'pro', label: 'Pro', price: '19 €/mois', features: ['10 biens', 'Tout Essentiel', 'Documents ALUR', 'Export comptable'] },
  { id: 'proplus', label: 'Pro+', price: '39 €/mois', features: ['Biens illimités', 'Tout Pro', 'Support prioritaire'] },
];

export default function ParametresPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [telephone, setTelephone] = useState('');

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/connexion'); return; }
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      if (data) {
        setProfile(data);
        setPrenom(data.prenom ?? '');
        setNom(data.nom ?? '');
        setTelephone(data.telephone ?? '');
      }
      setLoading(false);
    };
    load();
  }, [router]);

  const handleSaveProfil = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    if (!profile) return;
    await supabase.from('profiles').update({ prenom, nom, telephone }).eq('id', profile.id);
    setProfile(prev => prev ? { ...prev, prenom, nom, telephone } : prev);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    setSaving(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/connexion');
  };

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#0f1a22]">Paramètres</h1>
          <p className="text-sm text-[#5a7080] mt-1">Gérez votre compte et vos préférences.</p>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-[#5a7080] hover:text-red-500 border border-gray-200 rounded-lg px-3 py-1.5">
          <LogOut size={14} /> Déconnexion
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-gray-100">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              activeTab === i ? 'border-[#2A9FD6] text-[#2A9FD6]' : 'border-transparent text-[#5a7080] hover:text-[#0f1a22]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-16 text-sm text-[#5a7080]">Chargement...</div>
      ) : (
        <>
          {activeTab === 0 && (
            <div className="max-w-lg">
              <div className="border border-gray-100 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                    <User size={20} className="text-[#2A9FD6]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#0f1a22]">{prenom} {nom}</p>
                    <p className="text-xs text-[#5a7080]">{profile?.email}</p>
                  </div>
                </div>
                <form onSubmit={handleSaveProfil} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium block mb-1.5">Prénom</label>
                      <input type="text" value={prenom} onChange={e => setPrenom(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#2A9FD6]" />
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-1.5">Nom</label>
                      <input type="text" value={nom} onChange={e => setNom(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#2A9FD6]" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1.5">Email</label>
                    <input type="email" value={profile?.email ?? ''} disabled className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-gray-50 text-[#5a7080]" />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1.5">Téléphone</label>
                    <input type="tel" value={telephone} onChange={e => setTelephone(e.target.value)} placeholder="+33 6 00 00 00 00" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#2A9FD6]" />
                  </div>
                  <button type="submit" disabled={saving} className="w-full py-2.5 rounded-lg text-white text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-60" style={{ background: '#2A9FD6' }}>
                    {saved ? <><CheckCircle size={14} /> Enregistré !</> : saving ? 'Enregistrement...' : 'Enregistrer les modifications'}
                  </button>
                </form>
              </div>
            </div>
          )}

          {activeTab === 1 && (
            <div>
              <p className="text-sm text-[#5a7080] mb-6">
                Plan actuel : <span className="font-semibold text-[#0f1a22] capitalize">{profile?.plan ?? 'gratuit'}</span>
              </p>
              <div className="grid grid-cols-4 gap-4">
                {plans.map(plan => (
                  <div key={plan.id} className={`border rounded-xl p-5 ${profile?.plan === plan.id ? 'border-[#2A9FD6] bg-blue-50' : 'border-gray-100'} ${plan.popular ? 'relative' : ''}`}>
                    {plan.popular && (
                      <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#2A9FD6] text-white text-xs px-2 py-0.5 rounded-full">Populaire</span>
                    )}
                    <p className="font-bold text-[#0f1a22] mb-1">{plan.label}</p>
                    <p className="text-xl font-bold text-[#2A9FD6] mb-4">{plan.price}</p>
                    <ul className="space-y-1.5 mb-4">
                      {plan.features.map(f => (
                        <li key={f} className="text-xs text-[#5a7080] flex items-center gap-1.5">
                          <CheckCircle size={10} className="text-[#2A9FD6] flex-shrink-0" /> {f}
                        </li>
                      ))}
                    </ul>
                    <button
                      disabled={profile?.plan === plan.id}
                      className="w-full py-2 rounded-lg text-sm font-medium disabled:opacity-50 transition-colors"
                      style={profile?.plan === plan.id ? { background: '#2A9FD6', color: 'white' } : { background: '#f3f4f6', color: '#0f1a22' }}
                    >
                      {profile?.plan === plan.id ? 'Plan actuel' : 'Choisir'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 2 && (
            <div className="max-w-lg">
              <div className="border border-gray-100 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Bell size={16} className="text-[#2A9FD6]" />
                  <h2 className="font-semibold text-[#0f1a22]">Notifications email</h2>
                </div>
                <div className="space-y-4">
                  {[
                    { label: 'Quittances générées', desc: 'Recevoir un email quand des quittances sont générées' },
                    { label: 'Relances automatiques', desc: 'Être notifié des relances J+3, J+7, J+15' },
                    { label: 'Paiements reçus', desc: "Confirmation quand un loyer est marqué comme payé" },
                  ].map(n => (
                    <div key={n.label} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                      <div>
                        <p className="text-sm font-medium text-[#0f1a22]">{n.label}</p>
                        <p className="text-xs text-[#5a7080]">{n.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#2A9FD6]"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </AppLayout>
  );
}
