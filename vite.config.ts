import path from 'path';
import { defineConfig } from 'vite'; // Убрали 'loadEnv'
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // const env = loadEnv(mode, '.', ''); // УБРАЛИ ЭТУ СТРОКУ
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react()],
    define: {
      // --- ИСПРАВЛЕНИЕ ---
      // Читаем ключ напрямую из системных переменных,
      // которые передает CapRover
      'process.env.API_KEY': JSON.stringify(process.env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(process.env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
