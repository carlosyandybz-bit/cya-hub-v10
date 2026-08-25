import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { RuntimeConfig } from '../../infrastructure/config/env';

export function createSupabaseClient(config: RuntimeConfig): SupabaseClient | null {
  if (!config.supabaseUrl || !config.supabasePublishableKey) {
    return null;
  }

  return createClient(config.supabaseUrl, config.supabasePublishableKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
}
