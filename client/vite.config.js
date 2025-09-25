import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
 // envDir: '..',        // ruta al directorio que contiene el .env (desde vite.config)
  plugins: [react()],
  // opcional: ampliar prefijos permitidos
  // envPrefix: ['VITE_', 'APP_'],
});