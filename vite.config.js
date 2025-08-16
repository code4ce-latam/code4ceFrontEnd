import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        // components: path.resolve(__dirname, './src/components'),
        // ui: path.resolve(__dirname, './src/components/ui'),
        //lib: path.resolve(__dirname, 'src/components/lib'),
        // hooks: path.resolve(__dirname, './src/components/hooks'),
        // utils: path.resolve(__dirname, './src/components/lib/utils'),
      },
    },
    server: {
      host: '0.0.0.0', // Permite el acceso desde cualquier IP
      port: 5175,
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
          secure: false,
        },
      },
      preview: {
        port: 5185,
      },
    },
  };
});
