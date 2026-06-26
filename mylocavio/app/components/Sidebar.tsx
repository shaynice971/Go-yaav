'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Building2, FileText, FolderOpen,
  BellRing, Settings, LogOut
} from 'lucide-react';
import Logo from './Logo';

const nav = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/biens', label: 'Mes biens', icon: Building2 },
  { href: '/quittances', label: 'Quittances', icon: FileText },
  { href: '/documents', label: 'Documents', icon: FolderOpen },
  { href: '/relances', label: 'Relances', icon: BellRing },
  { href: '/parametres', label: 'Paramètres', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="fixed left-0 top-0 h-screen w-56 border-r border-gray-100 bg-white flex flex-col z-50">
      <div className="px-5 py-5 border-b border-gray-100">
        <Logo />
      </div>
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? 'text-[#2A9FD6] bg-[#f0f8fd]'
                  : 'text-[#5a7080] hover:text-[#0f1a22] hover:bg-gray-50'
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="px-3 py-4 border-t border-gray-100">
        <Link
          href="/connexion"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#5a7080] hover:text-red-500 hover:bg-red-50 transition-colors"
        >
          <LogOut size={18} />
          Déconnexion
        </Link>
      </div>
    </aside>
  );
}
