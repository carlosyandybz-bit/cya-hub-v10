export type AppEnv = 'staging' | 'test';

export interface RuntimeConfig {
  appEnv: AppEnv;
  productName: 'CYA Hub v10';
  supabaseUrl?: string;
  supabasePublishableKey?: string;
  sentryDsn?: string;
}

const LEGACY_MARKERS = ['cya-hub-v3', 'CYA Hub v3', 'v3-clean', 'v3-rebuild'];

export function assertNoLegacyRuntimeReference(values: Array<string | undefined>): void {
  const joined = values.filter(Boolean).join('\n');
  const marker = LEGACY_MARKERS.find((candidate) => joined.includes(candidate));

  if (marker) {
    throw new Error(`Legacy runtime reference detected: ${marker}`);
  }
}

export function readRuntimeConfig(env: ImportMetaEnv): RuntimeConfig {
  const appEnv = (env.VITE_APP_ENV || 'staging') as AppEnv;
  const productName = (env.VITE_PRODUCT_NAME || 'CYA Hub v10') as 'CYA Hub v10';

  if (productName !== 'CYA Hub v10') {
    throw new Error('Invalid product identity. Expected CYA Hub v10.');
  }

  if (!['staging', 'test'].includes(appEnv)) {
    throw new Error(`Unsupported bootstrap environment: ${appEnv}`);
  }

  assertNoLegacyRuntimeReference([
    env.VITE_SUPABASE_URL,
    env.VITE_SUPABASE_PUBLISHABLE_KEY,
    env.VITE_SENTRY_DSN,
  ]);

  return {
    appEnv,
    productName,
    supabaseUrl: env.VITE_SUPABASE_URL || undefined,
    supabasePublishableKey: env.VITE_SUPABASE_PUBLISHABLE_KEY || undefined,
    sentryDsn: env.VITE_SENTRY_DSN || undefined,
  };
}
