import Link from 'next/link';
import { Building2, FileText, BellRing, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import Logo from './components/Logo';

const features = [
  {
    icon: FileText,
    title: 'Quittances en 1 clic',
    desc: 'Générez et envoyez vos quittances de loyer au format PDF légal directement depuis la plateforme.',
  },
  {
    icon: BellRing,
    title: 'Relances automatiques',
    desc: 'Loyer impayé ? Mylocavio envoie automatiquement des relances à J+3, J+7 et J+15.',
  },
  {
    icon: Building2,
    title: 'Gestion des baux',
    desc: 'Baux vides et meublés conformes loi ALUR, avenants, états des lieux — tout en un.',
  },
  {
    icon: TrendingUp,
    title: 'Rentabilité en temps réel',
    desc: 'Suivez la rentabilité nette de chaque bien, les charges et les revenus locatifs.',
  },
];

const plans = [
  {
    name: 'Gratuit',
    price: '0',
    biens: '1 bien',
    features: ['1 bien', 'Quittances PDF', 'Gestion locataire'],
    cta: 'Commencer',
    highlight: false,
  },
  {
    name: 'Essentiel',
    price: '9',
    biens: '2 biens',
    features: ['2 biens', 'Quittances PDF', 'Relances auto', 'Gestion baux'],
    cta: 'Essayer 14 jours gratuit',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '19',
    biens: '5 biens',
    features: ['5 biens', 'Quittances PDF', 'Relances auto', 'Gestion baux', 'Rentabilité avancée', 'Support prioritaire'],
    cta: 'Essayer 14 jours gratuit',
    highlight: true,
  },
  {
    name: 'Pro+',
    price: '29',
    biens: 'Biens illimités',
    features: ['Biens illimités', 'Tout Pro inclus', 'Export comptable', 'API accès'],
    cta: 'Essayer 14 jours gratuit',
    highlight: false,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-[#0f1a22]">
      {/* Header */}
      <header className="border-b border-gray-100 sticky top-0 bg-white z-40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo />
          <nav className="hidden md:flex items-center gap-6 text-sm text-[#5a7080]">
            <a href="#features" className="hover:text-[#0f1a22] transition-colors">Fonctionnalités</a>
            <a href="#pricing" className="hover:text-[#0f1a22] transition-colors">Tarifs</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/connexion" className="text-sm font-medium text-[#5a7080] hover:text-[#0f1a22] transition-colors">
              Connexion
            </Link>
            <Link
              href="/inscription"
              className="text-sm font-medium px-4 py-2 rounded-lg text-white transition-colors"
              style={{ background: '#2A9FD6' }}
            >
              Essayer gratuitement
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">
        <div
          className="inline-block text-xs font-semibold px-3 py-1.5 rounded-full mb-6 tracking-wide"
          style={{ background: '#e0f2fb', color: '#2A9FD6' }}
        >
          GESTION LOCATIVE SIMPLIFIÉE
        </div>
        <h1 className="text-5xl font-bold leading-tight mb-6 max-w-3xl mx-auto">
          Gérez vos locations{' '}
          <span style={{ color: '#2A9FD6' }}>sans agence</span>,<br />
          en quelques minutes
        </h1>
        <p className="text-lg text-[#5a7080] max-w-xl mx-auto mb-10">
          Mylocavio est la plateforme tout-en-un pour les propriétaires qui gèrent 1 à 5 biens.
          Quittances, relances, baux et rentabilité — tout sans quitter votre tableau de bord.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link
            href="/inscription"
            className="flex items-center gap-2 px-6 py-3 rounded-lg text-white font-medium text-sm"
            style={{ background: '#2A9FD6' }}
          >
            Commencer gratuitement <ArrowRight size={16} />
          </Link>
          <a
            href="#features"
            className="px-6 py-3 rounded-lg font-medium text-sm border border-gray-200 text-[#5a7080] hover:border-[#2A9FD6] hover:text-[#2A9FD6] transition-colors"
          >
            Voir les fonctionnalités
          </a>
        </div>
        <p className="text-xs text-[#5a7080] mt-4">Gratuit jusqu'à 1 bien · Aucune carte bancaire requise</p>

        {/* Dashboard preview */}
        <div className="mt-16 rounded-2xl border border-gray-100 overflow-hidden text-left" style={{ background: '#f0f8fd' }}>
          <div className="bg-white border-b border-gray-100 px-6 py-3 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-300" />
            <div className="w-3 h-3 rounded-full bg-yellow-300" />
            <div className="w-3 h-3 rounded-full bg-green-300" />
            <span className="ml-3 text-xs text-[#5a7080]">mylocavio.fr/dashboard</span>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Loyers encaissés', value: '3 200 €', sub: 'Ce mois' },
              { label: 'Quittances envoyées', value: '4', sub: 'Sur 4 biens' },
              { label: 'Impayés', value: '0', sub: 'Aucun retard' },
            ].map((kpi) => (
              <div key={kpi.label} className="bg-white rounded-xl px-4 py-4 border border-gray-100">
                <p className="text-xs text-[#5a7080] mb-1">{kpi.label}</p>
                <p className="text-2xl font-bold text-[#0f1a22]">{kpi.value}</p>
                <p className="text-xs text-[#5a7080] mt-0.5">{kpi.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Tout ce dont vous avez besoin</h2>
          <p className="text-[#5a7080]">Une plateforme complète pour gérer votre patrimoine locatif en toute autonomie.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f) => (
            <div key={f.title} className="rounded-xl border border-gray-100 p-6 hover:border-[#e0f2fb] transition-colors">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: '#e0f2fb' }}>
                <f.icon size={20} style={{ color: '#2A9FD6' }} />
              </div>
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-[#5a7080] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Tarifs transparents</h2>
          <p className="text-[#5a7080]">Sans engagement. Changez ou annulez à tout moment.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl border p-6 flex flex-col ${plan.highlight ? 'border-[#2A9FD6]' : 'border-gray-100'}`}
            >
              {plan.highlight && (
                <div className="text-xs font-semibold mb-3" style={{ color: '#2A9FD6' }}>POPULAIRE</div>
              )}
              <div className="mb-4">
                <p className="text-sm font-medium text-[#5a7080]">{plan.name}</p>
                <p className="text-4xl font-bold mt-1">
                  {plan.price}<span className="text-base font-normal text-[#5a7080]">€/mois</span>
                </p>
                <p className="text-xs text-[#5a7080] mt-1">{plan.biens}</p>
              </div>
              <ul className="space-y-2 flex-1 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-[#5a7080]">
                    <CheckCircle size={14} style={{ color: '#2A9FD6' }} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/inscription"
                className={`text-center py-2.5 rounded-lg text-sm font-medium transition-colors block ${
                  plan.highlight ? 'text-white' : 'border border-gray-200 text-[#0f1a22] hover:border-[#2A9FD6] hover:text-[#2A9FD6]'
                }`}
                style={plan.highlight ? { background: '#2A9FD6' } : {}}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#f0f8fd' }} className="py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à simplifier votre gestion locative ?</h2>
          <p className="text-[#5a7080] mb-8">Rejoignez les propriétaires qui gèrent déjà leurs biens avec Mylocavio.</p>
          <Link
            href="/inscription"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg text-white font-medium text-sm"
            style={{ background: '#2A9FD6' }}
          >
            Créer mon compte gratuit <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <Logo size="sm" />
          <p className="text-xs text-[#5a7080]">© 2024 Mylocavio · Gestion locative pour propriétaires français</p>
          <div className="flex gap-4 text-xs text-[#5a7080]">
            <a href="#" className="hover:text-[#0f1a22]">CGU</a>
            <a href="#" className="hover:text-[#0f1a22]">Politique de confidentialité</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
