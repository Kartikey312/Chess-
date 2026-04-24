import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@repo/store', replacement: path.resolve(__dirname, './src/_repo/store') },
      { find: '@repo/ui', replacement: path.resolve(__dirname, './src/_repo/ui') },
      { find: '@', replacement: path.resolve(__dirname, './src') },
    ],
  },
});
