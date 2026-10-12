import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://izqycswerjfnjbxirqga.supabase.co";

// Sunucu tarafında (Vercel) çalışan gizli service_role anahtarı. 
// Eğer bulunamazsa hata fırlatarak anon anahtarına düşmesini engeller.
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceKey) {
  throw new Error('Supabase Service Role Key is missing. Check your environment variables.');
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false
  }
});