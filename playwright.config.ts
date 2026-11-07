import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests/e2e',
  timeout: 60_000,
  workers: 1,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:4173/Telecom.estudos/',
    trace: 'off',
    // Como no celular de quem usa: português do Brasil, fuso de Boa Vista (UTC−4).
    locale: 'pt-BR',
    timezoneId: 'America/Boa_Vista',
  },
  webServer: {
    command: 'npx vite preview --port 4173 --strictPort',
    url: 'http://localhost:4173/Telecom.estudos/',
    reuseExistingServer: true,
    timeout: 60_000,
  },
});
