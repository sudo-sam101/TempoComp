import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables");
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Log connection status
console.log(
  "Supabase client initialized with URL:",
  supabaseUrl ? "[URL provided]" : "[Missing URL]",
);
