'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AppLayout from '../components/AppLayout';
import { supabase } from '../../lib/supabase';
import { Home, FileText, AlertCircle, TrendingUp, Plus, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { Database } from '../../lib/database.types';

type Bien = Database['public']['Tables']['biens']['Row'];
type Locataire = Database['public']['Tables']['locataires']['Row'];
type Quittance = Database['public']['Tables']['quittances']['Row'];

export default function DashboardPage() {
  const router = useRouter();
  const [biens, setBiens] = useState<Bien[]>([]);
  const [locataires, setLocataires] = useState<Locataire[]>([]);
  const [quittances, setQuittances] = useState<Quittance[]>([]);
  const [loading, setLoading] = useState(true);
  const [prenom, setPrenom] = useState('');

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/connexion'); return; }

      const [profileRes, biensRes, locatairesRes, quittancesRes] = await Promise.all([
        supabase.from('profiles').select('prenom').eq('id', user.id).single(),
        supabase.from('biens').select('*').eq('user_id', user.id),
        supabase.from('locataires').select('*').eq('user_id', user.id).eq('actif', true),
        supabase.from('quittances').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(10),
      ]);

      setPrenom(profileRes.data?.prenom ?? '');
      setBiens(biensRes.data ?? []);
      setLocataires(locatairesRes.data ?? []);
      setQuittances(quittancesRes.data ?? []);
      setLoading(false);
    };
    load();
  }, [router]);

  const totalLoyer = biens.reduce((s, b) => s + b.loyer + b.charges, 0);
  const moisCourant = new Date().toISOString().slice(0, 7);
  const quittancesCeMois = quittances.filter(q => q.mois === moisCourant);
  const impayees = quittances.filter(q => q.statut !== 'payee' && q.mois < moisCourant);

  const kpis = [
    { label: 'Loyers / mois', value: `${totalLoyer.toLocaleString('fr-FR')} €`, icon: TrendingUp, color: '#2A9FD6' },
    { label: 'Quittances ce mois', value: quittancesCeMois.length.toString(), icon: FileText, color: '#10b981' },
    { label: 'Impayés', value: impayees.length.toString(), icon: AlertCircle, color: impayees.length > 0 ? '#ef4444' : '#10b981' },
    { label: 'Biens', value: biens.length.toString(), icon: Home, color: '#8b5cf6' },
  ];

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-[#5a7080] text-sm">Chargement...</div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0f1a22]">
          Bonjour{prenom ? `, ${prenom}` : ''} 👋
        </h1>
        <p className="text-sm text-[#5a7080] mt-1">Voici un résumé de votre activité.</p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {kpis.map(k => (
          <div key={k.label} className="border border-gray-100 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-[#5a7080] font-medium">{k.label}</span>
              <k.icon size={16} style={{ color: k.color }} />
            </div>
            <p className="text-2xl font-bold" style={{ color: k.color }}>{k.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 border border-gray-100 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-[#0f1a22]">Mes biens</h2>
            <Link href="/biens" className="text-xs text-[#2A9FD6] hover:underline flex items-center gap-1">
              Voir tout <ArrowRight size={12} />
            </Link>
          </div>
          {biens.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm text-[#5a7080] mb-4">Aucun bien enregistré.</p>
              <Link href="/biens" className="text-sm font-medium text-[#2A9FD6] hover:underline flex items-center gap-1 justify-center">
                <Plus size={14} /> Ajouter un bien
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {biens.slice(0, 4).map(b => {
                const loc = locataires.find(l => l.bien_id === b.id);
                return (
                  <Link key={b.id} href={`/biens/${b.id}`} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                        <Home size={14} className="text-[#2A9FD6]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#0f1a22]">{b.adresse}</p>
                        <p className="text-xs text-[#5a7080]">{b.ville} · {loc ? `${loc.prenom} ${loc.nom}` : 'Vacant'}</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-[#0f1a22]">{(b.loyer + b.charges).toLocaleString('fr-FR')} €</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        <div className="border border-gray-100 rounded-xl p-6">
          <h2 className="font-semibold text-[#0f1a22] mb-4">Actions rapides</h2>
          <div className="space-y-2">
            {[
              { label: 'Générer quittances', href: '/quittances', icon: FileText },
              { label: 'Envoyer relance', href: '/relances', icon: AlertCircle },
              { label: 'Ajouter un bien', href: '/biens', icon: Home },
            ].map(a => (
              <Link key={a.label} href={a.href} className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-[#2A9FD6] hover:bg-blue-50 transition-all text-sm font-medium text-[#0f1a22]">
                <a.icon size={14} className="text-[#2A9FD6]" /> {a.label}
              </Link>
            ))}
          </div>

          {impayees.length > 0 && (
            <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-100">
              <p className="text-xs font-semibold text-red-600 mb-1">{impayees.length} impayé{impayees.length > 1 ? 's' : ''}</p>
              <Link href="/relances" className="text-xs text-red-500 hover:underline">Voir les relances →</Link>
            </div>
          )}
        </div>
      </div>

      {quittances.length > 0 && (
        <div className="border border-gray-100 rounded-xl p-6 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-[#0f1a22]">Quittances récentes</h2>
            <Link href="/quittances" className="text-xs text-[#2A9FD6] hover:underline flex items-center gap-1">
              Voir tout <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-2">
            {quittances.slice(0, 5).map(q => (
              <div key={q.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-[#0f1a22]">Quittance {q.mois}</p>
                  <p className="text-xs text-[#5a7080]">{(q.loyer + q.charges).toLocaleString('fr-FR')} €</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  q.statut === 'payee' ? 'bg-green-50 text-green-600' :
                  q.statut === 'envoyee' ? 'bg-blue-50 text-blue-600' :
                  'bg-gray-100 text-gray-500'
                }`}>
                  {q.statut === 'payee' ? 'Payée' : q.statut === 'envoyee' ? 'Envoyée' : 'Générée'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </AppLayout>
  );
}
