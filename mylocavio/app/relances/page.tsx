'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AppLayout from '../components/AppLayout';
import { AlertCircle, CheckCircle2, Clock, Send } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Database } from '../../lib/database.types';

type Relance = Database['public']['Tables']['relances']['Row'];
type Quittance = Database['public']['Tables']['quittances']['Row'];
type Locataire = Database['public']['Tables']['locataires']['Row'];
type Bien = Database['public']['Tables']['biens']['Row'];

export default function RelancesPage() {
  const router = useRouter();
  const [relances, setRelances] = useState<Relance[]>([]);
  const [impayees, setImpayees] = useState<Quittance[]>([]);
  const [locataires, setLocataires] = useState<Locataire[]>([]);
  const [biens, setBiens] = useState<Bien[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/connexion'); return; }

      const moisCourant = new Date().toISOString().slice(0, 7);

      const [relancesRes, quittancesRes, locsRes, biensRes] = await Promise.all([
        supabase.from('relances').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
        supabase.from('quittances').select('*').eq('user_id', user.id).neq('statut', 'payee').lt('mois', moisCourant),
        supabase.from('locataires').select('*').eq('user_id', user.id).eq('actif', true),
        supabase.from('biens').select('*').eq('user_id', user.id),
      ]);

      setRelances(relancesRes.data ?? []);
      setImpayees(quittancesRes.data ?? []);
      setLocataires(locsRes.data ?? []);
      setBiens(biensRes.data ?? []);
      setLoading(false);
    };
    load();
  }, [router]);

  const handleRelancer = async (quittance: Quittance) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const existingRelances = relances.filter(r => r.locataire_id === quittance.locataire_id && r.mois === quittance.mois);
    const types: ('j3' | 'j7' | 'j15' | 'manuelle')[] = ['j3', 'j7', 'j15'];
    const nextType = types.find(t => !existingRelances.some(r => r.type === t)) ?? 'manuelle';

    const { data, error } = await supabase.from('relances').insert({
      bien_id: quittance.bien_id,
      locataire_id: quittance.locataire_id,
      user_id: user.id,
      mois: quittance.mois,
      montant: quittance.loyer + quittance.charges,
      type: nextType,
      statut: 'envoyee',
    }).select().single();

    if (!error && data) setRelances(prev => [data, ...prev]);
  };

  const handleResoudre = async (id: string) => {
    await supabase.from('relances').update({ statut: 'resolue' }).eq('id', id);
    setRelances(prev => prev.map(r => r.id === id ? { ...r, statut: 'resolue' } : r));
  };

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0f1a22]">Relances impayés</h1>
        <p className="text-sm text-[#5a7080] mt-1">{impayees.length} impayé{impayees.length !== 1 ? 's' : ''} en cours</p>
      </div>

      {loading ? (
        <div className="text-center py-16 text-sm text-[#5a7080]">Chargement...</div>
      ) : (
        <>
          {/* Impayés actifs */}
          {impayees.length > 0 && (
            <div className="border border-red-100 bg-red-50 rounded-xl p-6 mb-6">
              <h2 className="font-semibold text-red-700 mb-4 flex items-center gap-2">
                <AlertCircle size={16} /> Loyers impayés
              </h2>
              <div className="space-y-3">
                {impayees.map(q => {
                  const loc = locataires.find(l => l.id === q.locataire_id);
                  const bien = biens.find(b => b.id === q.bien_id);
                  const nbRelances = relances.filter(r => r.locataire_id === q.locataire_id && r.mois === q.mois).length;
                  return (
                    <div key={q.id} className="flex items-center justify-between bg-white rounded-lg p-4">
                      <div>
                        <p className="font-medium text-[#0f1a22] text-sm">{loc ? `${loc.prenom} ${loc.nom}` : '—'}</p>
                        <p className="text-xs text-[#5a7080]">{bien?.adresse} · {q.mois} · {(q.loyer + q.charges).toLocaleString('fr-FR')} €</p>
                        {nbRelances > 0 && (
                          <p className="text-xs text-orange-500 mt-1">{nbRelances} relance{nbRelances > 1 ? 's' : ''} envoyée{nbRelances > 1 ? 's' : ''}</p>
                        )}
                      </div>
                      <button
                        onClick={() => handleRelancer(q)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-white text-xs font-medium"
                        style={{ background: '#2A9FD6' }}
                      >
                        <Send size={12} /> Relancer
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {impayees.length === 0 && (
            <div className="border border-green-100 bg-green-50 rounded-xl p-6 mb-6 flex items-center gap-3">
              <CheckCircle2 size={20} className="text-green-600" />
              <div>
                <p className="font-medium text-green-700 text-sm">Aucun impayé en cours</p>
                <p className="text-xs text-green-600">Tous les loyers sont à jour.</p>
              </div>
            </div>
          )}

          {/* Historique relances */}
          <div className="border border-gray-100 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-semibold text-[#0f1a22]">Historique des relances</h2>
            </div>
            {relances.length === 0 ? (
              <div className="text-center py-12">
                <Clock size={32} className="text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-[#5a7080]">Aucune relance envoyée.</p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-xs font-medium text-[#5a7080] text-left">Mois</th>
                    <th className="px-4 py-3 text-xs font-medium text-[#5a7080] text-left">Locataire</th>
                    <th className="px-4 py-3 text-xs font-medium text-[#5a7080] text-left">Montant</th>
                    <th className="px-4 py-3 text-xs font-medium text-[#5a7080] text-left">Type</th>
                    <th className="px-4 py-3 text-xs font-medium text-[#5a7080] text-left">Statut</th>
                    <th className="px-4 py-3 text-xs font-medium text-[#5a7080] text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {relances.map(r => {
                    const loc = locataires.find(l => l.id === r.locataire_id);
                    return (
                      <tr key={r.id} className="border-t border-gray-50 hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-[#0f1a22]">{r.mois}</td>
                        <td className="px-4 py-3 text-sm text-[#5a7080]">{loc ? `${loc.prenom} ${loc.nom}` : '—'}</td>
                        <td className="px-4 py-3 text-sm text-[#0f1a22]">{r.montant.toLocaleString('fr-FR')} €</td>
                        <td className="px-4 py-3">
                          <span className="text-xs bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full font-medium uppercase">{r.type}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            r.statut === 'resolue' ? 'bg-green-50 text-green-600' :
                            r.statut === 'lue' ? 'bg-blue-50 text-blue-600' :
                            'bg-gray-100 text-gray-500'
                          }`}>
                            {r.statut === 'resolue' ? 'Résolue' : r.statut === 'lue' ? 'Lue' : 'Envoyée'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {r.statut !== 'resolue' && (
                            <button onClick={() => handleResoudre(r.id)} className="text-xs text-green-600 hover:text-green-700 flex items-center gap-1">
                              <CheckCircle2 size={12} /> Résoudre
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </AppLayout>
  );
}
