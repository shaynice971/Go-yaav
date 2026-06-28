-- Mylocavio — Schéma Supabase
-- À exécuter dans Supabase > SQL Editor

-- Extension UUID
create extension if not exists "uuid-ossp";

-- Table profiles (liée à auth.users)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text not null,
  prenom text,
  nom text,
  telephone text,
  adresse_facturation text,
  plan text not null default 'gratuit' check (plan in ('gratuit', 'essentiel', 'pro', 'proplus')),
  stripe_customer_id text,
  created_at timestamptz default now()
);

-- Table biens
create table public.biens (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  adresse text not null,
  ville text not null,
  code_postal text not null,
  type text not null default 'appartement' check (type in ('appartement', 'maison', 'studio', 'autre')),
  type_bail text not null default 'vide' check (type_bail in ('vide', 'meuble')),
  surface numeric,
  loyer numeric not null,
  charges numeric not null default 0,
  prix_achat numeric,
  created_at timestamptz default now()
);

-- Table locataires
create table public.locataires (
  id uuid default uuid_generate_v4() primary key,
  bien_id uuid references public.biens(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  prenom text not null,
  nom text not null,
  email text not null,
  telephone text,
  date_entree date not null,
  date_sortie date,
  depot_garantie numeric not null default 0,
  actif boolean not null default true,
  created_at timestamptz default now()
);

-- Table quittances
create table public.quittances (
  id uuid default uuid_generate_v4() primary key,
  bien_id uuid references public.biens(id) on delete cascade not null,
  locataire_id uuid references public.locataires(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  mois text not null, -- format YYYY-MM
  loyer numeric not null,
  charges numeric not null default 0,
  date_paiement date,
  statut text not null default 'generee' check (statut in ('generee', 'envoyee', 'payee')),
  created_at timestamptz default now()
);

-- Table relances
create table public.relances (
  id uuid default uuid_generate_v4() primary key,
  bien_id uuid references public.biens(id) on delete cascade not null,
  locataire_id uuid references public.locataires(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  mois text not null,
  montant numeric not null,
  type text not null check (type in ('j3', 'j7', 'j15', 'manuelle')),
  statut text not null default 'envoyee' check (statut in ('envoyee', 'lue', 'resolue')),
  created_at timestamptz default now()
);

-- RLS (Row Level Security) — chaque utilisateur voit seulement ses données
alter table public.profiles enable row level security;
alter table public.biens enable row level security;
alter table public.locataires enable row level security;
alter table public.quittances enable row level security;
alter table public.relances enable row level security;

create policy "profiles: own data" on public.profiles for all using (auth.uid() = id);
create policy "biens: own data" on public.biens for all using (auth.uid() = user_id);
create policy "locataires: own data" on public.locataires for all using (auth.uid() = user_id);
create policy "quittances: own data" on public.quittances for all using (auth.uid() = user_id);
create policy "relances: own data" on public.relances for all using (auth.uid() = user_id);

-- Trigger: créer un profil automatiquement à l'inscription
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
