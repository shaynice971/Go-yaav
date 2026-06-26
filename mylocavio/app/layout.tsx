import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mylocavio — Gestion locative simplifiée",
  description: "Plateforme de gestion locative pour propriétaires. Quittances, baux, relances et rentabilité en un seul endroit.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
