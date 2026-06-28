'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AppLayout from '../components/AppLayout';
import { FileText, Plus, Search, CheckCircle, Clock } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Database } from '../../lib/database.types';

type Quittance = Database['public']['Tables']['quittances']['Row'];
type Bien = Database['public']['Tables']['biens']['Row'];
type Locataire = Database['public']['Tables']['locataires']['Row'];

export default function QuittancesPage() {
  const router = useRouter();
  const [quittances, setQuittances] = useState<Quittance[]>([]);
  const [biens, setBiens] = useState<Bien[]>([]);
  const [locataires, setLocataires] = useState<Locataire[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/connexion'); return; }

      const [quittancesRes, biensRes, locsRes] = await Promise.all([
        supabase.from('quittances').select('*').eq('user_id', user.id).order('mois', { ascending: false }),
        supabase.from('biens').select('*').eq('user_id', user.id),
        supabase.from('locataires').select('*').eq('user_id', user.id).eq('actif', true),
      ]);
      setQuittances(quittancesRes.data ?? []);
      setBiens(biensRes.data ?? []);
      setLocataires(locsRes.data ?? []);
      setLoading(false);
    };
    load();
  }, [router]);

  const handleGenererMois = async () => {
    setGenerating(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const mois = new Date().toISOString().slice(0, 7);
    const toInsert = locataires
      .filter(loc => !quittances.some(q => q.locataire_id === loc.id && q.mois === mois))
      .map(loc => {
        const bien = biens.find(b => b.id === loc.bien_id);
        if (!bien) return null;
        return {
          bien_id: bien.id,
          locataire_id: loc.id,
          user_id: user.id,
          mois,
          loyer: bien.loyer,
          charges: bien.charges,
          statut: 'generee' as const,
        };
      })
      .filter(Boolean) as Database['public']['Tables']['quittances']['Insert'][];

    if (toInsert.length === 0) {
      alert('Les quittances de ce mois ont déjà été générées.');
      setGenerating(false);
      return;
    }

    const { data, error } = await supabase.from('quittances').insert(toInsert).select();
    if (!error && data) setQuittances(prev => [...data, ...prev]);
    setGenerating(false);
  };

  const handleMarquerPayee = async (id: string) => {
    const { error } = await supabase.from('quittances').update({ statut: 'payee', date_paiement: new Date().toISOString().split('T')[0] }).eq('id', id);
    if (!error) setQuittances(prev => prev.map(q => q.id === id ? { ...q, statut: 'payee', date_paiement: new Date().toISOString().split('T')[0] } : q));
  };

  const filtered = quittances.filter(q => {
    const loc = locataires.find(l => l.id === q.locataire_id);
    const bien = biens.find(b => b.id === q.bien_id);
    const s = search.toLowerCase();
    return !s || q.mois.includes(s) || loc?.nom.toLowerCase().includes(s) || loc?.prenom.toLowerCase().includes(s) || bien?.adresse.toLowerCase().includes(s);
  });

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#0f1a22]">Quittances</h1>
          <p className="text-sm text-[#5a7080] mt-1">{quittances.length} quittance{quittances.length !== 1 ? 's' : ''} au total</p>
        </div>
        <button
          onClick={handleGenererMois}
          disabled={generating || locataires.length === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium disabled:opacity-60"
          style={{ background: '#2A9FD6' }}
        >
          <Plus size={16} /> {generating ? 'Génération...' : 'Générer ce mois'}
        </button>
      </div>

      <div className="border border-gray-100 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5a7080]" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher par mois, locataire, adresse..."
              className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#2A9FD6]"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-16 text-sm text-[#5a7080]">Chargement...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <FileText size={32} className="text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-[#5a7080]">
              {locataires.length === 0 ? 'Ajoutez un locataire pour générer des quittances.' : 'Aucune quittance trouvée.'}
            </p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-4 py-3 text-xs font-medium text-[#5a7080]">Mois</th>
                <th className="px-4 py-3 text-xs font-medium text-[#5a7080]">Locataire</th>
                <th className="px-4 py-3 text-xs font-medium text-[#5a7080]">Bien</th>
                <th className="px-4 py-3 text-xs font-medium text-[#5a7080]">Montant</th>
                <th className="px-4 py-3 text-xs font-medium text-[#5a7080]">Statut</th>
                <th className="px-4 py-3 text-xs font-medium text-[#5a7080]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(q => {
                const loc = locataires.find(l => l.id === q.locataire_id);
                const bien = biens.find(b => b.id === q.bien_id);
                return (
                  <tr key={q.id} className="border-t border-gray-50 hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-[#0f1a22]">{q.mois}</td>
                    <td className="px-4 py-3 text-sm text-[#5a7080]">{loc ? `${loc.prenom} ${loc.nom}` : '—'}</td>
                    <td className="px-4 py-3 text-sm text-[#5a7080]">{bien?.adresse ?? '—'}</td>
                    <td className="px-4 py-3 text-sm font-medium text-[#0f1a22]">{(q.loyer + q.charges).toLocaleString('fr-FR')} €</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        q.statut === 'payee' ? 'bg-green-50 text-green-600' :
                        q.statut === 'envoyee' ? 'bg-blue-50 text-blue-600' :
                        'bg-gray-100 text-gray-500'
                      }`}>
                        {q.statut === 'payee' ? 'Payée' : q.statut === 'envoyee' ? 'Envoyée' : 'Générée'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {q.statut !== 'payee' && (
                          <button onClick={() => handleMarquerPayee(q.id)} className="text-xs flex items-center gap-1 text-green-600 hover:text-green-700">
                            <CheckCircle size={12} /> Marquer payée
                          </button>
                        )}
                        {q.statut === 'payee' && (
                          <span className="text-xs text-[#5a7080] flex items-center gap-1">
                            <Clock size={12} /> {q.date_paiement ? new Date(q.date_paiement).toLocaleDateString('fr-FR') : ''}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </AppLayout>
  );
}
