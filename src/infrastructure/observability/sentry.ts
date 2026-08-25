import * as Sentry from '@sentry/react';
import type { RuntimeConfig } from '../config/env';

export function initializeObservability(config: RuntimeConfig): void {
  if (!config.sentryDsn) {
    return;
  }

  Sentry.init({
    dsn: config.sentryDsn,
    environment: config.appEnv,
    release: import.meta.env.VITE_COMMIT_SHA || undefined,
  });
}
