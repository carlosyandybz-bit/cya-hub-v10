import { describe, expect, it } from 'vitest';
import { assertNoLegacyRuntimeReference, readRuntimeConfig } from '../src/infrastructure/config/env';

function env(values: Record<string, string> = {}): ImportMetaEnv {
  return values as ImportMetaEnv;
}

describe('bootstrap isolation', () => {
  it('accepts CYA Hub v10 staging identity', () => {
    const config = readRuntimeConfig(env({
      VITE_APP_ENV: 'staging',
      VITE_PRODUCT_NAME: 'CYA Hub v10',
    }));

    expect(config.productName).toBe('CYA Hub v10');
    expect(config.appEnv).toBe('staging');
  });

  it('rejects legacy runtime references', () => {
    expect(() => assertNoLegacyRuntimeReference([
      'https://example.invalid/cya-hub-v3/runtime',
    ])).toThrow(/Legacy runtime reference detected/);
  });

  it('rejects an incompatible active product identity', () => {
    expect(() => readRuntimeConfig(env({
      VITE_APP_ENV: 'staging',
      VITE_PRODUCT_NAME: 'CYA Hub v3',
    }))).toThrow(/Invalid product identity/);
  });
});
