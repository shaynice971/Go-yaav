'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '../components/Logo';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const steps = ['Compte', 'Mon bien', 'Mon locataire'];

export default function InscriptionPage() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  // Étape 1
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState('');

  // Étape 2
  const [adresse, setAdresse] = useState('');
  const [ville, setVille] = useState('');
  const [codePostal, setCodePostal] = useState('');
  const [typeBien, setTypeBien] = useState('appartement');
  const [typeBail, setTypeBail] = useState('vide');
  const [loyer, setLoyer] = useState('');
  const [charges, setCharges] = useState('');
  const [bienId, setBienId] = useState('');

  // Étape 3
  const [locPrenom, setLocPrenom] = useState('');
  const [locNom, setLocNom] = useState('');
  const [locEmail, setLocEmail] = useState('');
  const [dateEntree, setDateEntree] = useState('');
  const [depot, setDepot] = useState('');

  const handleStep1 = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    if (data.user) {
      // Mettre à jour le profil avec prénom/nom
      await supabase.from('profiles').update({ prenom, nom }).eq('id', data.user.id);
      setUserId(data.user.id);
      setStep(1);
    }
    setLoading(false);
  };

  const handleStep2 = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { data, error } = await supabase.from('biens').insert({
      user_id: userId,
      adresse,
      ville,
      code_postal: codePostal,
      type: typeBien as 'appartement' | 'maison' | 'studio' | 'autre',
      type_bail: typeBail as 'vide' | 'meuble',
      loyer: parseFloat(loyer),
      charges: parseFloat(charges || '0'),
    }).select().single();
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    setBienId(data.id);
    setStep(2);
    setLoading(false);
  };

  const handleStep3 = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await supabase.from('locataires').insert({
      bien_id: bienId,
      user_id: userId,
      prenom: locPrenom,
      nom: locNom,
      email: locEmail,
      date_entree: dateEntree,
      depot_garantie: parseFloat(depot || '0'),
      actif: true,
    });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    router.push('/dashboard');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8"><Link href="/"><Logo /></Link></div>

        {/* Stepper */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                  style={i <= step ? { background: '#2A9FD6', color: 'white' } : { background: '#f3f4f6', color: '#5a7080' }}
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
          {error && <p className="text-xs text-red-500 mb-4 p-3 bg-red-50 rounded-lg">{error}</p>}

          {step === 0 && (
            <form onSubmit={handleStep1}>
              <h1 className="text-xl font-bold mb-2">Créer votre compte</h1>
              <p className="text-sm text-[#5a7080] mb-6">Gratuit, sans carte bancaire.</p>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium block mb-1.5">Prénom</label>
                    <input type="text" value={prenom} onChange={e => setPrenom(e.target.value)} required placeholder="Jean" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#2A9FD6]" />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1.5">Nom</label>
                    <input type="text" value={nom} onChange={e => setNom(e.target.value)} required placeholder="Martin" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#2A9FD6]" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1.5">Email</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="jean.martin@email.com" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#2A9FD6]" />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1.5">Mot de passe</label>
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={8} placeholder="Au moins 8 caractères" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#2A9FD6]" />
                </div>
                <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-white font-medium text-sm disabled:opacity-60" style={{ background: '#2A9FD6' }}>
                  {loading ? 'Création...' : <> Continuer <ArrowRight size={16} /></>}
                </button>
              </div>
            </form>
          )}

          {step === 1 && (
            <form onSubmit={handleStep2}>
              <h1 className="text-xl font-bold mb-2">Ajoutez votre premier bien</h1>
              <p className="text-sm text-[#5a7080] mb-6">Vous pourrez en ajouter d'autres plus tard.</p>
              <div className="space-y-4">
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
                  <button type="button" onClick={() => setStep(0)} className="flex-1 py-2.5 rounded-lg text-sm font-medium border border-gray-200 text-[#5a7080]">Retour</button>
                  <button type="submit" disabled={loading} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-white font-medium text-sm disabled:opacity-60" style={{ background: '#2A9FD6' }}>
                    {loading ? 'Enregistrement...' : <> Continuer <ArrowRight size={16} /></>}
                  </button>
                </div>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleStep3}>
              <h1 className="text-xl font-bold mb-2">Ajoutez votre locataire</h1>
              <p className="text-sm text-[#5a7080] mb-6">Informations nécessaires pour les quittances.</p>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium block mb-1.5">Prénom</label>
                    <input type="text" value={locPrenom} onChange={e => setLocPrenom(e.target.value)} required placeholder="Marie" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#2A9FD6]" />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1.5">Nom</label>
                    <input type="text" value={locNom} onChange={e => setLocNom(e.target.value)} required placeholder="Dupont" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#2A9FD6]" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1.5">Email du locataire</label>
                  <input type="email" value={locEmail} onChange={e => setLocEmail(e.target.value)} required placeholder="marie.dupont@email.com" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#2A9FD6]" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium block mb-1.5">Date d'entrée</label>
                    <input type="date" value={dateEntree} onChange={e => setDateEntree(e.target.value)} required className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#2A9FD6]" />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1.5">Dépôt de garantie (€)</label>
                    <input type="number" value={depot} onChange={e => setDepot(e.target.value)} min="0" placeholder="1600" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#2A9FD6]" />
                  </div>
                </div>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(1)} className="flex-1 py-2.5 rounded-lg text-sm font-medium border border-gray-200 text-[#5a7080]">Retour</button>
                  <button type="submit" disabled={loading} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-white font-medium text-sm disabled:opacity-60" style={{ background: '#2A9FD6' }}>
                    {loading ? 'Finalisation...' : <> Accéder au dashboard <ArrowRight size={16} /></>}
                  </button>
                </div>
              </div>
            </form>
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
