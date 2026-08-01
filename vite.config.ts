import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '');
  const licenseApiOrigin =
    env.VITE_LICENSE_API_URL?.replace(/\/+$/, '') ||
    'https://api.eranovatechnologies.com';

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      // Same-origin proxy avoids browser CORS against the HostPilot API.
      proxy: {
        '/api/license': {
          target: licenseApiOrigin,
          changeOrigin: true,
          secure: true,
        },
      },
    },
  };
});

