'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AppLayout from '../../components/AppLayout';
import Link from 'next/link';
import { ArrowLeft, User, Calendar, FileText, Home, Mail, Trash2 } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import type { Database } from '../../../lib/database.types';

type Bien = Database['public']['Tables']['biens']['Row'];
type Locataire = Database['public']['Tables']['locataires']['Row'];
type Quittance = Database['public']['Tables']['quittances']['Row'];

export default function BienDetailPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [bien, setBien] = useState<Bien | null>(null);
  const [locataire, setLocataire] = useState<Locataire | null>(null);
  const [quittances, setQuittances] = useState<Quittance[]>([]);
  const [loading, setLoading] = useState(true);

  // Locataire form
  const [showLocForm, setShowLocForm] = useState(false);
  const [locPrenom, setLocPrenom] = useState('');
  const [locNom, setLocNom] = useState('');
  const [locEmail, setLocEmail] = useState('');
  const [dateEntree, setDateEntree] = useState('');
  const [depot, setDepot] = useState('');
  const [savingLoc, setSavingLoc] = useState(false);
  const [locError, setLocError] = useState('');

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/connexion'); return; }

      const [bienRes, locsRes, quittancesRes] = await Promise.all([
        supabase.from('biens').select('*').eq('id', id).eq('user_id', user.id).single(),
        supabase.from('locataires').select('*').eq('bien_id', id).eq('actif', true).single(),
        supabase.from('quittances').select('*').eq('bien_id', id).order('mois', { ascending: false }),
      ]);

      if (!bienRes.data) { router.push('/biens'); return; }
      setBien(bienRes.data);
      setLocataire(locsRes.data ?? null);
      setQuittances(quittancesRes.data ?? []);
      setLoading(false);
    };
    load();
  }, [id, router]);

  const handleAddLocataire = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocError('');
    setSavingLoc(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !bien) return;
    const { data, error } = await supabase.from('locataires').insert({
      bien_id: bien.id,
      user_id: user.id,
      prenom: locPrenom,
      nom: locNom,
      email: locEmail,
      date_entree: dateEntree,
      depot_garantie: parseFloat(depot || '0'),
      actif: true,
    }).select().single();
    if (error) { setLocError(error.message); setSavingLoc(false); return; }
    setLocataire(data);
    setShowLocForm(false);
    setSavingLoc(false);
  };

  const handleDeleteBien = async () => {
    if (!confirm('Supprimer ce bien ? Cette action est irréversible.')) return;
    await supabase.from('biens').delete().eq('id', id);
    router.push('/biens');
  };

  if (loading) {
    return <AppLayout><div className="flex items-center justify-center h-64 text-sm text-[#5a7080]">Chargement...</div></AppLayout>;
  }

  if (!bien) return null;

  return (
    <AppLayout>
      <div className="mb-6">
        <Link href="/biens" className="flex items-center gap-2 text-sm text-[#5a7080] hover:text-[#0f1a22] mb-4">
          <ArrowLeft size={14} /> Retour aux biens
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#0f1a22]">{bien.adresse}</h1>
            <p className="text-sm text-[#5a7080]">{bien.code_postal} {bien.ville} · {bien.type} · bail {bien.type_bail}</p>
          </div>
          <button onClick={handleDeleteBien} className="flex items-center gap-2 text-xs text-red-500 hover:text-red-600 border border-red-100 rounded-lg px-3 py-1.5">
            <Trash2 size={12} /> Supprimer
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Loyer', value: `${bien.loyer.toLocaleString('fr-FR')} €` },
          { label: 'Charges', value: `${bien.charges.toLocaleString('fr-FR')} €` },
          { label: 'Total', value: `${(bien.loyer + bien.charges).toLocaleString('fr-FR')} €` },
        ].map(item => (
          <div key={item.label} className="border border-gray-100 rounded-xl p-4 text-center">
            <p className="text-xs text-[#5a7080] mb-1">{item.label}</p>
            <p className="text-xl font-bold text-[#0f1a22]">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Locataire */}
        <div className="border border-gray-100 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-[#0f1a22]">Locataire</h2>
            {!locataire && (
              <button onClick={() => setShowLocForm(!showLocForm)} className="text-xs text-[#2A9FD6] hover:underline">+ Ajouter</button>
            )}
          </div>

          {showLocForm && !locataire && (
            <form onSubmit={handleAddLocataire} className="space-y-3 mb-4">
              {locError && <p className="text-xs text-red-500">{locError}</p>}
              <div className="grid grid-cols-2 gap-2">
                <input type="text" value={locPrenom} onChange={e => setLocPrenom(e.target.value)} required placeholder="Prénom" className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#2A9FD6]" />
                <input type="text" value={locNom} onChange={e => setLocNom(e.target.value)} required placeholder="Nom" className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#2A9FD6]" />
              </div>
              <input type="email" value={locEmail} onChange={e => setLocEmail(e.target.value)} required placeholder="Email" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#2A9FD6]" />
              <input type="date" value={dateEntree} onChange={e => setDateEntree(e.target.value)} required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#2A9FD6]" />
              <input type="number" value={depot} onChange={e => setDepot(e.target.value)} placeholder="Dépôt de garantie (€)" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#2A9FD6]" />
              <button type="submit" disabled={savingLoc} className="w-full py-2 rounded-lg text-white text-sm font-medium disabled:opacity-60" style={{ background: '#2A9FD6' }}>
                {savingLoc ? 'Enregistrement...' : 'Ajouter le locataire'}
              </button>
            </form>
          )}

          {locataire ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                  <User size={16} className="text-[#2A9FD6]" />
                </div>
                <div>
                  <p className="font-medium text-[#0f1a22]">{locataire.prenom} {locataire.nom}</p>
                  <p className="text-xs text-[#5a7080] flex items-center gap-1"><Mail size={10} /> {locataire.email}</p>
                </div>
              </div>
              <div className="text-xs text-[#5a7080] space-y-1 pt-2 border-t border-gray-50">
                <p className="flex items-center gap-2"><Calendar size={10} /> Entrée : {new Date(locataire.date_entree).toLocaleDateString('fr-FR')}</p>
                <p>Dépôt de garantie : {locataire.depot_garantie.toLocaleString('fr-FR')} €</p>
              </div>
            </div>
          ) : !showLocForm ? (
            <div className="text-center py-6">
              <User size={24} className="text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-[#5a7080]">Aucun locataire actif</p>
            </div>
          ) : null}
        </div>

        {/* Quittances */}
        <div className="border border-gray-100 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-[#0f1a22]">Quittances</h2>
            <Link href="/quittances" className="text-xs text-[#2A9FD6] hover:underline">Gérer</Link>
          </div>
          {quittances.length === 0 ? (
            <div className="text-center py-6">
              <FileText size={24} className="text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-[#5a7080]">Aucune quittance générée</p>
            </div>
          ) : (
            <div className="space-y-2">
              {quittances.slice(0, 6).map(q => (
                <div key={q.id} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                  <span className="text-sm text-[#0f1a22]">{q.mois}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#5a7080]">{(q.loyer + q.charges).toLocaleString('fr-FR')} €</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                      q.statut === 'payee' ? 'bg-green-50 text-green-600' :
                      q.statut === 'envoyee' ? 'bg-blue-50 text-blue-600' :
                      'bg-gray-100 text-gray-500'
                    }`}>
                      {q.statut === 'payee' ? 'Payée' : q.statut === 'envoyee' ? 'Envoyée' : 'Générée'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
