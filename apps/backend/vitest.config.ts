import path from 'path';

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['../../vitest.setup.ts'],
    include: ['src/**/*.{test,spec}.{js,ts}'],
    exclude: [
      'node_modules/',
      'dist/',
      'src/data/drizzle/**',
      '**/*.d.ts',
      '**/*.config.ts',
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
