import AppLayout from '../components/AppLayout';
import Link from 'next/link';
import { Plus, MapPin, User, TrendingUp } from 'lucide-react';

const biens = [
  {
    id: '1',
    adresse: '12 rue des Lilas',
    ville: '75011 Paris',
    locataire: 'Marie Dupont',
    type: 'Appartement meublé',
    loyer: 850,
    charges: 60,
    statut: 'payé',
    rentabilite: '4.8%',
    surface: '38 m²',
  },
  {
    id: '2',
    adresse: '8 avenue Victor Hugo',
    ville: '69003 Lyon',
    locataire: 'Thomas Bernard',
    type: 'Appartement vide',
    loyer: 720,
    charges: 50,
    statut: 'payé',
    rentabilite: '5.2%',
    surface: '52 m²',
  },
  {
    id: '3',
    adresse: '3 rue du Moulin',
    ville: '33000 Bordeaux',
    locataire: 'Sophie Leroy',
    type: 'Studio meublé',
    loyer: 650,
    charges: 40,
    statut: 'impayé',
    rentabilite: '6.1%',
    surface: '24 m²',
  },
  {
    id: '4',
    adresse: '21 boulevard Pasteur',
    ville: '13006 Marseille',
    locataire: 'Paul Moreau',
    type: 'Appartement vide',
    loyer: 980,
    charges: 80,
    statut: 'payé',
    rentabilite: '4.4%',
    surface: '68 m²',
  },
];

export default function BiensPage() {
  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#0f1a22]">Mes biens</h1>
            <p className="text-sm text-[#5a7080] mt-1">{biens.length} biens gérés</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white" style={{ background: '#2A9FD6' }}>
            <Plus size={16} /> Ajouter un bien
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {biens.map((b) => (
            <Link key={b.id} href={`/biens/${b.id}`}>
              <div className="bg-white rounded-xl border border-gray-100 p-6 hover:border-[#2A9FD6] transition-colors cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-semibold text-[#0f1a22]">{b.adresse}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <MapPin size={12} className="text-[#5a7080]" />
                      <p className="text-xs text-[#5a7080]">{b.ville}</p>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      b.statut === 'payé' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'
                    }`}
                  >
                    {b.statut === 'payé' ? 'Loyer payé' : 'Impayé'}
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-4 text-xs text-[#5a7080]">
                  <span className="px-2 py-0.5 bg-[#f0f8fd] rounded text-[#2A9FD6] font-medium">{b.type}</span>
                  <span>{b.surface}</span>
                </div>

                <div className="flex items-center gap-1 text-xs text-[#5a7080] mb-4">
                  <User size={12} />
                  <span>{b.locataire}</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-[#5a7080]">Loyer + charges</p>
                    <p className="text-lg font-bold text-[#0f1a22]">{b.loyer + b.charges} €/mois</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[#5a7080]">Rentabilité</p>
                    <div className="flex items-center gap-1">
                      <TrendingUp size={14} className="text-green-500" />
                      <p className="text-sm font-semibold text-green-600">{b.rentabilite}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
