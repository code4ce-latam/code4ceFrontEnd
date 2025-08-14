import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
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
});
