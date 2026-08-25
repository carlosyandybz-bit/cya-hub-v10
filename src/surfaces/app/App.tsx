import { BOOTSTRAP_GATE, LEGACY_RUNTIME_DEPENDENCIES, PRODUCT_NAME } from '../../shared/product';
import type { RuntimeConfig } from '../../infrastructure/config/env';

interface AppProps {
  config: RuntimeConfig;
  supabaseConfigured: boolean;
}

export function App({ config, supabaseConfigured }: AppProps) {
  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 760, margin: '0 auto', padding: '64px 24px' }}>
      <p>{config.appEnv.toUpperCase()} ONLY</p>
      <h1>{PRODUCT_NAME}</h1>
      <h2>{BOOTSTRAP_GATE}</h2>
      <p>Clean-room foundation. No business functionality is enabled.</p>
      <dl>
        <dt>Runtime legacy dependencies</dt>
        <dd>{LEGACY_RUNTIME_DEPENDENCIES}</dd>
        <dt>Supabase v10 configured</dt>
        <dd>{supabaseConfigured ? 'yes' : 'pending'}</dd>
        <dt>Observability</dt>
        <dd>{config.sentryDsn ? 'configured' : 'optional / pending'}</dd>
      </dl>
    </main>
  );
}
