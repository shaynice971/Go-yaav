export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          prenom: string | null;
          nom: string | null;
          telephone: string | null;
          adresse_facturation: string | null;
          plan: 'gratuit' | 'essentiel' | 'pro' | 'proplus';
          stripe_customer_id: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at'>;
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };
      biens: {
        Row: {
          id: string;
          user_id: string;
          adresse: string;
          ville: string;
          code_postal: string;
          type: 'appartement' | 'maison' | 'studio' | 'autre';
          type_bail: 'vide' | 'meuble';
          surface: number | null;
          loyer: number;
          charges: number;
          prix_achat: number | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['biens']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['biens']['Insert']>;
      };
      locataires: {
        Row: {
          id: string;
          bien_id: string;
          user_id: string;
          prenom: string;
          nom: string;
          email: string;
          telephone: string | null;
          date_entree: string;
          date_sortie: string | null;
          depot_garantie: number;
          actif: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['locataires']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['locataires']['Insert']>;
      };
      quittances: {
        Row: {
          id: string;
          bien_id: string;
          locataire_id: string;
          user_id: string;
          mois: string; // format: YYYY-MM
          loyer: number;
          charges: number;
          date_paiement: string | null;
          statut: 'generee' | 'envoyee' | 'payee';
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['quittances']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['quittances']['Insert']>;
      };
      relances: {
        Row: {
          id: string;
          bien_id: string;
          locataire_id: string;
          user_id: string;
          mois: string;
          montant: number;
          type: 'j3' | 'j7' | 'j15' | 'manuelle';
          statut: 'envoyee' | 'lue' | 'resolue';
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['relances']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['relances']['Insert']>;
      };
    };
  };
}
