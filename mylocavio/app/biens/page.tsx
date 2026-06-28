'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AppLayout from '../components/AppLayout';
import Link from 'next/link';
import { Plus, MapPin, User, Home } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Database } from '../../lib/database.types';

type Bien = Database['public']['Tables']['biens']['Row'];
type Locataire = Database['public']['Tables']['locataires']['Row'];

export default function BiensPage() {
  const router = useRouter();
  const [biens, setBiens] = useState<Bien[]>([]);
  const [locataires, setLocataires] = useState<Locataire[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [adresse, setAdresse] = useState('');
  const [ville, setVille] = useState('');
  const [codePostal, setCodePostal] = useState('');
  const [typeBien, setTypeBien] = useState('appartement');
  const [typeBail, setTypeBail] = useState('vide');
  const [loyer, setLoyer] = useState('');
  const [charges, setCharges] = useState('');
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/connexion'); return; }

      const [biensRes, locsRes] = await Promise.all([
        supabase.from('biens').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
        supabase.from('locataires').select('*').eq('user_id', user.id).eq('actif', true),
      ]);
      setBiens(biensRes.data ?? []);
      setLocataires(locsRes.data ?? []);
      setLoading(false);
    };
    load();
  }, [router]);

  const handleAddBien = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data, error } = await supabase.from('biens').insert({
      user_id: user.id,
      adresse,
      ville,
      code_postal: codePostal,
      type: typeBien as 'appartement' | 'maison' | 'studio' | 'autre',
      type_bail: typeBail as 'vide' | 'meuble',
      loyer: parseFloat(loyer),
      charges: parseFloat(charges || '0'),
    }).select().single();
    if (error) { setFormError(error.message); setSaving(false); return; }
    setBiens(prev => [data, ...prev]);
    setShowForm(false);
    setAdresse(''); setVille(''); setCodePostal(''); setLoyer(''); setCharges('');
    setSaving(false);
  };

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#0f1a22]">Mes biens</h1>
          <p className="text-sm text-[#5a7080] mt-1">{biens.length} bien{biens.length !== 1 ? 's' : ''} enregistré{biens.length !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium"
          style={{ background: '#2A9FD6' }}
        >
          <Plus size={16} /> Ajouter un bien
        </button>
      </div>

      {showForm && (
        <div className="border border-gray-100 rounded-xl p-6 mb-6">
          <h2 className="font-semibold text-[#0f1a22] mb-4">Nouveau bien</h2>
          {formError && <p className="text-xs text-red-500 mb-3 p-2 bg-red-50 rounded">{formError}</p>}
          <form onSubmit={handleAddBien} className="space-y-4">
            <div>
              <label className="text-sm font-medium block mb-1.5">Adresse</label>
              <input type="text" value={adresse} onChange={e => setAdresse(e.target.value)} required placeholder="12 rue des Lilas" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#2A9FD6]" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium block mb-1.5">Code postal</label>
                <input type="text" value={codePostal} onChange={e => setCodePostal(e.target.value)} required placeholder="75011" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#2A9FD6]" />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1.5">Ville</label>
                <input type="text" value={ville} onChange={e => setVille(e.target.value)} required placeholder="Paris" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#2A9FD6]" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium block mb-1.5">Type de bien</label>
                <select value={typeBien} onChange={e => setTypeBien(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#2A9FD6] bg-white">
                  <option value="appartement">Appartement</option>
                  <option value="maison">Maison</option>
                  <option value="studio">Studio</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium block mb-1.5">Type de bail</label>
                <select value={typeBail} onChange={e => setTypeBail(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#2A9FD6] bg-white">
                  <option value="vide">Vide</option>
                  <option value="meuble">Meublé</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium block mb-1.5">Loyer (€)</label>
                <input type="number" value={loyer} onChange={e => setLoyer(e.target.value)} required min="0" placeholder="800" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#2A9FD6]" />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1.5">Charges (€)</label>
                <input type="number" value={charges} onChange={e => setCharges(e.target.value)} min="0" placeholder="60" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#2A9FD6]" />
              </div>
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-2.5 rounded-lg text-sm font-medium border border-gray-200 text-[#5a7080]">Annuler</button>
              <button type="submit" disabled={saving} className="flex-1 py-2.5 rounded-lg text-white text-sm font-medium disabled:opacity-60" style={{ background: '#2A9FD6' }}>
                {saving ? 'Enregistrement...' : 'Ajouter'}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-center py-16 text-sm text-[#5a7080]">Chargement...</div>
      ) : biens.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-gray-200 rounded-xl">
          <Home size={32} className="text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-[#5a7080] mb-4">Aucun bien enregistré.</p>
          <button onClick={() => setShowForm(true)} className="text-sm font-medium text-[#2A9FD6] hover:underline">+ Ajouter votre premier bien</button>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {biens.map(b => {
            const loc = locataires.find(l => l.bien_id === b.id);
            return (
              <Link key={b.id} href={`/biens/${b.id}`} className="border border-gray-100 rounded-xl p-5 hover:border-[#2A9FD6] transition-colors block">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    <Home size={18} className="text-[#2A9FD6]" />
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${loc ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                    {loc ? 'Loué' : 'Vacant'}
                  </span>
                </div>
                <p className="font-semibold text-[#0f1a22] text-sm mb-1">{b.adresse}</p>
                <p className="text-xs text-[#5a7080] flex items-center gap-1 mb-3">
                  <MapPin size={10} /> {b.code_postal} {b.ville}
                </p>
                {loc && (
                  <p className="text-xs text-[#5a7080] flex items-center gap-1 mb-3">
                    <User size={10} /> {loc.prenom} {loc.nom}
                  </p>
                )}
                <div className="pt-3 border-t border-gray-50 flex items-center justify-between">
                  <span className="text-xs text-[#5a7080]">{b.type} · bail {b.type_bail}</span>
                  <span className="font-bold text-[#0f1a22] text-sm">{(b.loyer + b.charges).toLocaleString('fr-FR')} €</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </AppLayout>
  );
}
