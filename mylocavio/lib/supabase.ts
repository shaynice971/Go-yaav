// Supabase client — replace with real keys in .env.local
// NEXT_PUBLIC_SUPABASE_URL=your_url
// NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

// Usage: import { createClient } from '@supabase/supabase-js'
// export const supabase = createClient(supabaseUrl, supabaseAnonKey)
