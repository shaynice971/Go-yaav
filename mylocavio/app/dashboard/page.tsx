import AppLayout from '../components/AppLayout';
import Link from 'next/link';
import { TrendingUp, FileText, AlertCircle, Building2, ArrowRight, CheckCircle2 } from 'lucide-react';

const kpis = [
  { label: 'Loyers encaissés', value: '3 200 €', sub: 'Juin 2024', icon: TrendingUp, color: '#2A9FD6', bg: '#e0f2fb' },
  { label: 'Quittances envoyées', value: '4 / 4', sub: 'Ce mois', icon: FileText, color: '#22c55e', bg: '#dcfce7' },
  { label: 'Impayés', value: '1', sub: 'En attente', icon: AlertCircle, color: '#ef4444', bg: '#fee2e2' },
  { label: 'Biens gérés', value: '4', sub: 'Plan Essentiel', icon: Building2, color: '#f59e0b', bg: '#fef3c7' },
];

const biens = [
  { id: '1', adresse: '12 rue des Lilas, 75011 Paris', locataire: 'Marie Dupont', loyer: 850, charges: 60, statut: 'payé' },
  { id: '2', adresse: '8 avenue Victor Hugo, 69003 Lyon', locataire: 'Thomas Bernard', loyer: 720, charges: 50, statut: 'payé' },
  { id: '3', adresse: '3 rue du Moulin, 33000 Bordeaux', locataire: 'Sophie Leroy', loyer: 650, charges: 40, statut: 'impayé' },
  { id: '4', adresse: '21 bd Pasteur, 13006 Marseille', locataire: 'Paul Moreau', loyer: 980, charges: 80, statut: 'payé' },
];

const recentActions = [
  { action: 'Quittance envoyée', detail: 'Marie Dupont — Juin 2024', date: 'Hier', type: 'success' },
  { action: 'Quittance envoyée', detail: 'Thomas Bernard — Juin 2024', date: 'Hier', type: 'success' },
  { action: 'Relance envoyée', detail: 'Sophie Leroy — Loyer impayé J+3', date: 'Il y a 2 j', type: 'warning' },
  { action: 'Bail signé', detail: 'Paul Moreau — Marseille', date: 'Il y a 5 j', type: 'success' },
];

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#0f1a22]">Bonjour, Jean 👋</h1>
          <p className="text-sm text-[#5a7080] mt-1">Voici un aperçu de votre gestion locative — Juin 2024</p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-medium text-[#5a7080]">{kpi.label}</p>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: kpi.bg }}>
                  <kpi.icon size={16} style={{ color: kpi.color }} />
                </div>
              </div>
              <p className="text-2xl font-bold text-[#0f1a22]">{kpi.value}</p>
              <p className="text-xs text-[#5a7080] mt-1">{kpi.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Biens */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold text-[#0f1a22]">Mes biens</h2>
              <Link href="/biens" className="text-xs text-[#2A9FD6] hover:underline flex items-center gap-1">
                Voir tout <ArrowRight size={12} />
              </Link>
            </div>
            <div className="space-y-3">
              {biens.map((b) => (
                <Link
                  key={b.id}
                  href={`/biens/${b.id}`}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-[#f0f8fd] transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#0f1a22] truncate">{b.adresse}</p>
                    <p className="text-xs text-[#5a7080] mt-0.5">{b.locataire}</p>
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    <p className="text-sm font-semibold text-[#0f1a22]">{b.loyer + b.charges} €</p>
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        b.statut === 'payé' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'
                      }`}
                    >
                      {b.statut === 'payé' ? 'Payé' : 'Impayé'}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Activité récente */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h2 className="font-semibold text-[#0f1a22] mb-5">Activité récente</h2>
            <div className="space-y-4">
              {recentActions.map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${a.type === 'success' ? 'bg-green-50' : 'bg-orange-50'}`}>
                    {a.type === 'success'
                      ? <CheckCircle2 size={12} className="text-green-500" />
                      : <AlertCircle size={12} className="text-orange-400" />
                    }
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#0f1a22]">{a.action}</p>
                    <p className="text-xs text-[#5a7080]">{a.detail}</p>
                    <p className="text-xs text-[#5a7080] mt-0.5">{a.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action rapides */}
        <div className="mt-6 bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="font-semibold text-[#0f1a22] mb-4">Actions rapides</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/quittances" className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white" style={{ background: '#2A9FD6' }}>
              <FileText size={15} /> Générer une quittance
            </Link>
            <Link href="/relances" className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border border-gray-200 text-[#5a7080] hover:border-[#2A9FD6] hover:text-[#2A9FD6] transition-colors">
              <AlertCircle size={15} /> Voir les impayés
            </Link>
            <Link href="/biens" className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border border-gray-200 text-[#5a7080] hover:border-[#2A9FD6] hover:text-[#2A9FD6] transition-colors">
              <Building2 size={15} /> Ajouter un bien
            </Link>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
