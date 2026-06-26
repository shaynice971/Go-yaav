'use client';
import AppLayout from '../components/AppLayout';
import { useState } from 'react';
import { AlertCircle, Mail, CheckCircle2, Clock, Send } from 'lucide-react';

const impayés = [
  {
    id: 1,
    locataire: 'Sophie Leroy',
    bien: '3 rue du Moulin, 33000 Bordeaux',
    mois: 'Juin 2024',
    montant: 690,
    retard: 12,
    relances: [
      { type: 'J+3', date: '04/06/2024', statut: 'envoyée' },
      { type: 'J+7', date: '08/06/2024', statut: 'envoyée' },
      { type: 'J+15', date: '16/06/2024', statut: 'programmée' },
    ],
  },
];

const historique = [
  { locataire: 'Sophie Leroy', type: 'J+3', date: '04/06/2024', statut: 'lue' },
  { locataire: 'Sophie Leroy', type: 'J+7', date: '08/06/2024', statut: 'lue' },
  { locataire: 'Paul Moreau', type: 'J+3', date: '05/04/2024', statut: 'résolue' },
  { locataire: 'Thomas Bernard', type: 'J+3', date: '10/01/2024', statut: 'résolue' },
];

export default function RelancesPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#0f1a22]">Relances & Impayés</h1>
            <p className="text-sm text-[#5a7080] mt-1">Suivi automatique des loyers impayés</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white"
            style={{ background: '#2A9FD6' }}
          >
            <Send size={16} /> Relance manuelle
          </button>
        </div>

        {/* Paramètres relances auto */}
        <div className="bg-[#f0f8fd] border border-[#e0f2fb] rounded-xl p-5 mb-8">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#2A9FD6' }}>
              <Clock size={16} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-[#0f1a22] mb-1">Relances automatiques activées</p>
              <p className="text-sm text-[#5a7080]">En cas d'impayé, Mylocavio envoie automatiquement un email de relance à J+3, J+7 et J+15 après la date d'échéance.</p>
              <div className="flex items-center gap-4 mt-3">
                {['J+3 (rappel courtois)', 'J+7 (mise en demeure douce)', 'J+15 (mise en demeure formelle)'].map((r) => (
                  <div key={r} className="flex items-center gap-1.5 text-xs text-[#2A9FD6] font-medium">
                    <CheckCircle2 size={13} />
                    {r}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Impayés actifs */}
        <div className="mb-8">
          <h2 className="font-semibold text-[#0f1a22] mb-4 flex items-center gap-2">
            <AlertCircle size={16} className="text-red-400" /> Impayés en cours ({impayés.length})
          </h2>
          {impayés.map((imp) => (
            <div key={imp.id} className="bg-white border border-red-100 rounded-xl p-6 mb-4">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <p className="font-semibold text-[#0f1a22]">{imp.locataire}</p>
                  <p className="text-xs text-[#5a7080]">{imp.bien}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-red-500">{imp.montant} €</p>
                  <p className="text-xs text-[#5a7080]">{imp.mois} · {imp.retard} jours de retard</p>
                </div>
              </div>

              {/* Timeline relances */}
              <div className="flex items-center gap-0">
                {imp.relances.map((r, i) => (
                  <div key={r.type} className="flex items-center flex-1">
                    <div className="flex-1">
                      <div className={`flex flex-col items-center gap-1`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          r.statut === 'envoyée' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-[#5a7080]'
                        }`}>
                          {r.statut === 'envoyée' ? '✓' : '○'}
                        </div>
                        <p className="text-xs font-semibold text-[#0f1a22]">{r.type}</p>
                        <p className="text-xs text-[#5a7080]">{r.date || 'En attente'}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          r.statut === 'envoyée' ? 'bg-orange-50 text-orange-600' : 'bg-gray-50 text-[#5a7080]'
                        }`}>
                          {r.statut}
                        </span>
                      </div>
                    </div>
                    {i < imp.relances.length - 1 && <div className="w-8 h-px bg-gray-200 flex-shrink-0" />}
                  </div>
                ))}
              </div>

              <div className="flex gap-3 mt-5 pt-4 border-t border-gray-100">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 text-[#5a7080] hover:border-[#2A9FD6] hover:text-[#2A9FD6] transition-colors">
                  <Mail size={14} /> Envoyer relance maintenant
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-green-50 text-green-600 hover:bg-green-100 transition-colors">
                  <CheckCircle2 size={14} /> Marquer comme payé
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Historique */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="font-semibold text-[#0f1a22] mb-4">Historique des relances</h2>
          <div className="space-y-3">
            {historique.map((h, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${h.statut === 'résolue' ? 'bg-green-50' : 'bg-orange-50'}`}>
                    {h.statut === 'résolue'
                      ? <CheckCircle2 size={12} className="text-green-500" />
                      : <Mail size={12} className="text-orange-400" />
                    }
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#0f1a22]">{h.locataire} — Relance {h.type}</p>
                    <p className="text-xs text-[#5a7080]">{h.date}</p>
                  </div>
                </div>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  h.statut === 'résolue' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-500'
                }`}>
                  {h.statut}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal relance manuelle */}
      {showModal && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md">
            <h2 className="text-lg font-bold mb-1">Relance manuelle</h2>
            <p className="text-sm text-[#5a7080] mb-6">Envoyer un email de relance personnalisé à un locataire.</p>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-1.5">Locataire</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#2A9FD6] bg-white">
                  <option>Sophie Leroy — Bordeaux</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium block mb-1.5">Type de relance</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#2A9FD6] bg-white">
                  <option>Rappel courtois</option>
                  <option>Mise en demeure douce</option>
                  <option>Mise en demeure formelle</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium block mb-1.5">Message personnalisé (optionnel)</label>
                <textarea rows={3} placeholder="Message supplémentaire..." className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#2A9FD6] resize-none" />
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-lg text-sm font-medium border border-gray-200 text-[#5a7080]">Annuler</button>
                <button onClick={() => setShowModal(false)} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-white text-sm font-medium" style={{ background: '#2A9FD6' }}>
                  <Send size={14} /> Envoyer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
