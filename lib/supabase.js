// 📁 lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://izqycswerjfnjbxirqga.supabase.co"; 
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6cXljc3dlcmpmbmpieGlycWdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQzMDc2OTEsImV4cCI6MjA5OTg4MzY5MX0.W0JNnLZq5JFm_pGTq8XbM7AOIZa5fu0Kk1fiDBtwvt0"; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);