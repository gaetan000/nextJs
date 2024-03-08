import { createClient } from '@supabase/supabase-js';

export function createSupabaseClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    // Initialisation du client Supabase avec les variables d'environnement
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    return supabase;
}