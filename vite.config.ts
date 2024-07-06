/// <reference types="vitest" />
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  test: {
    environment: 'node',
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'TonTestUtils',
      formats: ['es'],
      fileName: 'ton-test-utils',
    },
  },
  plugins: [dts({ rollupTypes: true })],
});
