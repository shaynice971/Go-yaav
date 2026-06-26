'use client';
import AppLayout from '../components/AppLayout';
import { useState } from 'react';
import { FileText, Download, Plus, Eye, FolderOpen } from 'lucide-react';

const categories = ['Tous', 'Baux', 'États des lieux', 'Avenants', 'Autres'];

const documents = [
  { id: 1, nom: 'Bail meublé — Marie Dupont', type: 'Bail', bien: '12 rue des Lilas, Paris', date: '01/09/2022', categorie: 'Baux' },
  { id: 2, nom: 'État des lieux entrée — Marie Dupont', type: 'EDL entrée', bien: '12 rue des Lilas, Paris', date: '01/09/2022', categorie: 'États des lieux' },
  { id: 3, nom: 'Bail vide — Thomas Bernard', type: 'Bail', bien: '8 av. Victor Hugo, Lyon', date: '15/03/2023', categorie: 'Baux' },
  { id: 4, nom: 'Avenant révision loyer — Thomas Bernard', type: 'Avenant', bien: '8 av. Victor Hugo, Lyon', date: '15/03/2024', categorie: 'Avenants' },
  { id: 5, nom: 'Bail meublé — Sophie Leroy', type: 'Bail', bien: '3 rue du Moulin, Bordeaux', date: '01/06/2023', categorie: 'Baux' },
  { id: 6, nom: 'État des lieux entrée — Sophie Leroy', type: 'EDL entrée', bien: '3 rue du Moulin, Bordeaux', date: '01/06/2023', categorie: 'États des lieux' },
  { id: 7, nom: 'Bail vide — Paul Moreau', type: 'Bail', bien: '21 bd Pasteur, Marseille', date: '01/01/2024', categorie: 'Baux' },
];

const templates = [
  { nom: 'Bail vide (loi ALUR)', desc: 'Conforme loi ALUR 2024 — résidence principale', icon: '📄' },
  { nom: 'Bail meublé (loi ALUR)', desc: 'Pour location meublée durée 1 an renouvelable', icon: '🛋️' },
  { nom: 'Avenant au bail', desc: "Modification d'une clause ou révision du loyer", icon: '✏️' },
  { nom: 'État des lieux', desc: 'Entrée ou sortie — conforme décret du 30/03/2016', icon: '🔑' },
];

export default function DocumentsPage() {
  const [activeCategory, setActiveCategory] = useState('Tous');

  const filtered = activeCategory === 'Tous' ? documents : documents.filter(d => d.categorie === activeCategory);

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#0f1a22]">Documents</h1>
            <p className="text-sm text-[#5a7080] mt-1">Baux, états des lieux et avenants conformes loi ALUR</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white" style={{ background: '#2A9FD6' }}>
            <Plus size={16} /> Nouveau document
          </button>
        </div>

        {/* Templates */}
        <div className="mb-8">
          <h2 className="font-semibold text-[#0f1a22] mb-4">Modèles disponibles</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {templates.map((t) => (
              <div key={t.nom} className="bg-white border border-gray-100 rounded-xl p-4 hover:border-[#2A9FD6] cursor-pointer transition-colors">
                <div className="text-2xl mb-3">{t.icon}</div>
                <p className="text-sm font-medium text-[#0f1a22] mb-1">{t.nom}</p>
                <p className="text-xs text-[#5a7080] leading-relaxed">{t.desc}</p>
                <button className="mt-3 text-xs text-[#2A9FD6] font-medium hover:underline">
                  Utiliser ce modèle →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Documents list */}
        <div className="bg-white rounded-xl border border-gray-100">
          <div className="px-5 pt-5 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-2 flex-wrap">
              <FolderOpen size={16} style={{ color: '#2A9FD6' }} />
              <span className="font-semibold text-[#0f1a22] mr-2">Mes documents</span>
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    activeCategory === c ? 'text-white' : 'text-[#5a7080] bg-gray-50 hover:bg-gray-100'
                  }`}
                  style={activeCategory === c ? { background: '#2A9FD6' } : {}}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="divide-y divide-gray-50">
            {filtered.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between px-5 py-4 hover:bg-[#f0f8fd] transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: '#e0f2fb' }}>
                    <FileText size={16} style={{ color: '#2A9FD6' }} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#0f1a22]">{doc.nom}</p>
                    <p className="text-xs text-[#5a7080]">{doc.bien} · {doc.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[#f0f8fd] text-[#2A9FD6]">{doc.categorie}</span>
                  <button className="p-1.5 rounded-lg hover:bg-[#e0f2fb] transition-colors" title="Aperçu">
                    <Eye size={14} style={{ color: '#2A9FD6' }} />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-[#e0f2fb] transition-colors" title="Télécharger">
                    <Download size={14} style={{ color: '#2A9FD6' }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
