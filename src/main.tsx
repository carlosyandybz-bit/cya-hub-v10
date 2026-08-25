import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './surfaces/app/App';
import { readRuntimeConfig } from './infrastructure/config/env';
import { initializeObservability } from './infrastructure/observability/sentry';
import { createSupabaseClient } from './integrations/supabase/client';

const config = readRuntimeConfig(import.meta.env);
initializeObservability(config);
const supabase = createSupabaseClient(config);

const root = document.getElementById('root');

if (!root) {
  throw new Error('Missing #root mount point.');
}

createRoot(root).render(
  <StrictMode>
    <App config={config} supabaseConfigured={Boolean(supabase)} />
  </StrictMode>,
);
