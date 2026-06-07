import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// On GitHub Pages this app is served from https://<user>.github.io/devtoolbox/,
// so the build needs a base path. Locally (dev/preview) it stays at '/'.
// Override with VITE_BASE_PATH if the repo is ever renamed.
const base =
  process.env.VITE_BASE_PATH ?? (process.env.NODE_ENV === 'production' ? '/devtoolbox/' : '/');

export default defineConfig({
  base,
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
});
