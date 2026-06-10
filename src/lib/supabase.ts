import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "../types/database";

function readEnv(key: string): string | undefined {
  const meta = import.meta.env as Record<string, string | undefined>;
  return meta[key]?.trim() || undefined;
}

export function getSupabaseConfig(): { url: string; anonKey: string } | null {
  const url =
    readEnv("VITE_SUPABASE_URL") ?? readEnv("NEXT_PUBLIC_SUPABASE_URL");
  const anonKey =
    readEnv("VITE_SUPABASE_ANON_KEY") ??
    readEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY") ??
    readEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");

  if (!url || !anonKey) return null;
  return { url, anonKey };
}

let client: SupabaseClient<Database> | null = null;

export function getSupabase(): SupabaseClient<Database> | null {
  const config = getSupabaseConfig();
  if (!config) return null;

  if (!client) {
    client = createClient<Database>(config.url, config.anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  }
  return client;
}

export function isSupabaseConfigured(): boolean {
  return getSupabaseConfig() !== null;
}
