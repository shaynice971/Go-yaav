'use client';
import AppLayout from '../components/AppLayout';
import { useState } from 'react';
import { FileText, Download, Mail, Plus, Search } from 'lucide-react';

const quittances = [
  { id: 1, bien: '12 rue des Lilas, Paris 11e', locataire: 'Marie Dupont', mois: 'Juin 2024', loyer: 850, charges: 60, statut: 'envoyée', dateEnvoi: '01/06/2024' },
  { id: 2, bien: '8 av. Victor Hugo, Lyon 3e', locataire: 'Thomas Bernard', mois: 'Juin 2024', loyer: 720, charges: 50, statut: 'envoyée', dateEnvoi: '01/06/2024' },
  { id: 3, bien: '21 bd Pasteur, Marseille 6e', locataire: 'Paul Moreau', mois: 'Juin 2024', loyer: 980, charges: 80, statut: 'envoyée', dateEnvoi: '01/06/2024' },
  { id: 4, bien: '12 rue des Lilas, Paris 11e', locataire: 'Marie Dupont', mois: 'Mai 2024', loyer: 850, charges: 60, statut: 'envoyée', dateEnvoi: '01/05/2024' },
  { id: 5, bien: '8 av. Victor Hugo, Lyon 3e', locataire: 'Thomas Bernard', mois: 'Mai 2024', loyer: 720, charges: 50, statut: 'envoyée', dateEnvoi: '01/05/2024' },
  { id: 6, bien: '3 rue du Moulin, Bordeaux', locataire: 'Sophie Leroy', mois: 'Juin 2024', loyer: 650, charges: 40, statut: 'non envoyée', dateEnvoi: '' },
];

export default function QuittancesPage() {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = quittances.filter(q =>
    q.locataire.toLowerCase().includes(search.toLowerCase()) ||
    q.bien.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#0f1a22]">Quittances</h1>
            <p className="text-sm text-[#5a7080] mt-1">{quittances.length} quittances au total</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white"
            style={{ background: '#2A9FD6' }}
          >
            <Plus size={16} /> Générer une quittance
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5a7080]" />
          <input
            type="text"
            placeholder="Rechercher par locataire ou adresse..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-sm outline-none focus:border-[#2A9FD6] transition-colors"
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-12 gap-4 px-5 py-3 border-b border-gray-100 text-xs font-medium text-[#5a7080] uppercase tracking-wide">
            <div className="col-span-4">Locataire / Bien</div>
            <div className="col-span-2">Période</div>
            <div className="col-span-2">Montant</div>
            <div className="col-span-2">Statut</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>
          <div className="divide-y divide-gray-50">
            {filtered.map((q) => (
              <div key={q.id} className="grid grid-cols-12 gap-4 px-5 py-4 items-center hover:bg-[#f0f8fd] transition-colors">
                <div className="col-span-4">
                  <p className="text-sm font-medium text-[#0f1a22]">{q.locataire}</p>
                  <p className="text-xs text-[#5a7080] truncate">{q.bien}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-[#0f1a22]">{q.mois}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-semibold">{q.loyer + q.charges} €</p>
                  <p className="text-xs text-[#5a7080]">{q.loyer} + {q.charges} charges</p>
                </div>
                <div className="col-span-2">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    q.statut === 'envoyée' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-500'
                  }`}>
                    {q.statut === 'envoyée' ? '✓ Envoyée' : 'À envoyer'}
                  </span>
                </div>
                <div className="col-span-2 flex items-center justify-end gap-2">
                  <button className="p-1.5 rounded-lg hover:bg-[#e0f2fb] transition-colors" title="Télécharger PDF">
                    <Download size={14} style={{ color: '#2A9FD6' }} />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-[#e0f2fb] transition-colors" title="Envoyer par email">
                    <Mail size={14} style={{ color: '#2A9FD6' }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal génération */}
        {showModal && (
          <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 w-full max-w-md">
              <h2 className="text-lg font-bold mb-1">Générer une quittance</h2>
              <p className="text-sm text-[#5a7080] mb-6">La quittance sera générée en PDF et pourra être envoyée par email au locataire.</p>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium block mb-1.5">Bien</label>
                  <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#2A9FD6] bg-white">
                    <option>12 rue des Lilas, Paris — Marie Dupont</option>
                    <option>8 av. Victor Hugo, Lyon — Thomas Bernard</option>
                    <option>3 rue du Moulin, Bordeaux — Sophie Leroy</option>
                    <option>21 bd Pasteur, Marseille — Paul Moreau</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1.5">Période</label>
                  <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#2A9FD6] bg-white">
                    <option>Juin 2024</option>
                    <option>Juillet 2024</option>
                    <option>Août 2024</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1.5">Date de paiement</label>
                  <input type="date" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#2A9FD6]" />
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-lg text-sm font-medium border border-gray-200 text-[#5a7080]">
                    Annuler
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-white text-sm font-medium"
                    style={{ background: '#2A9FD6' }}
                  >
                    <FileText size={15} /> Générer le PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
