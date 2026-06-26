import AppLayout from '../../components/AppLayout';
import Link from 'next/link';
import { ArrowLeft, User, Calendar, FileText, TrendingUp, Euro, Home, Mail } from 'lucide-react';

const bien = {
  id: '1',
  adresse: '12 rue des Lilas',
  ville: '75011 Paris',
  type: 'Appartement meublé',
  surface: '38 m²',
  etage: '3ème étage',
  locataire: {
    nom: 'Marie Dupont',
    email: 'marie.dupont@email.com',
    telephone: '06 12 34 56 78',
    entree: '1er septembre 2022',
  },
  bail: {
    type: 'Meublé',
    debut: '01/09/2022',
    fin: '31/08/2023 (reconduit)',
    duree: '1 an renouvelable',
    depot: '1 700 €',
  },
  loyer: 850,
  charges: 60,
  rentabilite: {
    brute: '4.8%',
    nette: '3.9%',
    prixAchat: 215000,
    revenuAnnuel: 10920,
    charges_annuelles: 1800,
  },
};

const quittances = [
  { mois: 'Juin 2024', montant: '910 €', statut: 'Envoyée', date: '01/06/2024' },
  { mois: 'Mai 2024', montant: '910 €', statut: 'Envoyée', date: '01/05/2024' },
  { mois: 'Avril 2024', montant: '910 €', statut: 'Envoyée', date: '01/04/2024' },
  { mois: 'Mars 2024', montant: '910 €', statut: 'Envoyée', date: '01/03/2024' },
];

export default function BiensDetailPage({ params }: { params: { id: string } }) {
  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <Link href="/biens" className="flex items-center gap-1.5 text-sm text-[#5a7080] hover:text-[#0f1a22] transition-colors mb-4">
            <ArrowLeft size={16} /> Retour à mes biens
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Home size={18} style={{ color: '#2A9FD6' }} />
                <h1 className="text-2xl font-bold text-[#0f1a22]">{bien.adresse}</h1>
              </div>
              <p className="text-sm text-[#5a7080]">{bien.ville} · {bien.type} · {bien.surface}</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white" style={{ background: '#2A9FD6' }}>
              <FileText size={15} /> Générer quittance
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-6">
            {/* Locataire */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h2 className="font-semibold text-[#0f1a22] mb-4 flex items-center gap-2">
                <User size={16} style={{ color: '#2A9FD6' }} /> Locataire
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-[#5a7080] mb-0.5">Nom</p>
                  <p className="text-sm font-medium">{bien.locataire.nom}</p>
                </div>
                <div>
                  <p className="text-xs text-[#5a7080] mb-0.5">Email</p>
                  <div className="flex items-center gap-1">
                    <Mail size={12} className="text-[#5a7080]" />
                    <p className="text-sm font-medium">{bien.locataire.email}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-[#5a7080] mb-0.5">Téléphone</p>
                  <p className="text-sm font-medium">{bien.locataire.telephone}</p>
                </div>
                <div>
                  <p className="text-xs text-[#5a7080] mb-0.5">Entrée dans les lieux</p>
                  <p className="text-sm font-medium">{bien.locataire.entree}</p>
                </div>
              </div>
            </div>

            {/* Bail */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h2 className="font-semibold text-[#0f1a22] mb-4 flex items-center gap-2">
                <Calendar size={16} style={{ color: '#2A9FD6' }} /> Bail en cours
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-[#5a7080] mb-0.5">Type de bail</p>
                  <p className="text-sm font-medium">Meublé (loi ALUR)</p>
                </div>
                <div>
                  <p className="text-xs text-[#5a7080] mb-0.5">Durée</p>
                  <p className="text-sm font-medium">{bien.bail.duree}</p>
                </div>
                <div>
                  <p className="text-xs text-[#5a7080] mb-0.5">Début</p>
                  <p className="text-sm font-medium">{bien.bail.debut}</p>
                </div>
                <div>
                  <p className="text-xs text-[#5a7080] mb-0.5">Dépôt de garantie</p>
                  <p className="text-sm font-medium">{bien.bail.depot}</p>
                </div>
              </div>
              <div className="mt-4 flex gap-3">
                <Link href="/documents" className="text-sm text-[#2A9FD6] hover:underline">Voir le bail →</Link>
                <Link href="/documents" className="text-sm text-[#2A9FD6] hover:underline">État des lieux →</Link>
              </div>
            </div>

            {/* Historique quittances */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-[#0f1a22] flex items-center gap-2">
                  <FileText size={16} style={{ color: '#2A9FD6' }} /> Historique des quittances
                </h2>
                <Link href="/quittances" className="text-xs text-[#2A9FD6] hover:underline">Voir tout</Link>
              </div>
              <div className="space-y-2">
                {quittances.map((q) => (
                  <div key={q.mois} className="flex items-center justify-between p-3 rounded-lg hover:bg-[#f0f8fd] transition-colors">
                    <div>
                      <p className="text-sm font-medium">{q.mois}</p>
                      <p className="text-xs text-[#5a7080]">Émise le {q.date}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="text-sm font-semibold">{q.montant}</p>
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-50 text-green-600">{q.statut}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar droite */}
          <div className="space-y-5">
            {/* Loyer */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h2 className="font-semibold text-[#0f1a22] mb-4 flex items-center gap-2">
                <Euro size={16} style={{ color: '#2A9FD6' }} /> Loyer mensuel
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#5a7080]">Loyer nu</span>
                  <span className="font-medium">{bien.loyer} €</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#5a7080]">Charges</span>
                  <span className="font-medium">{bien.charges} €</span>
                </div>
                <div className="flex justify-between text-sm border-t border-gray-100 pt-2 mt-2">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-[#0f1a22]">{bien.loyer + bien.charges} €</span>
                </div>
              </div>
            </div>

            {/* Rentabilité */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h2 className="font-semibold text-[#0f1a22] mb-4 flex items-center gap-2">
                <TrendingUp size={16} style={{ color: '#2A9FD6' }} /> Rentabilité
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-[#5a7080] mb-1">Rentabilité brute</p>
                  <p className="text-2xl font-bold text-green-600">{bien.rentabilite.brute}</p>
                </div>
                <div>
                  <p className="text-xs text-[#5a7080] mb-1">Rentabilité nette</p>
                  <p className="text-xl font-bold text-[#0f1a22]">{bien.rentabilite.nette}</p>
                </div>
                <div className="pt-3 border-t border-gray-100 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#5a7080]">Prix d'achat</span>
                    <span className="font-medium">{bien.rentabilite.prixAchat.toLocaleString('fr-FR')} €</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[#5a7080]">Revenu annuel</span>
                    <span className="font-medium">{bien.rentabilite.revenuAnnuel.toLocaleString('fr-FR')} €</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
