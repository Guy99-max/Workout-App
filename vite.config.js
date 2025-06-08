// src/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // מאפשר גישה מכל כתובת
    port: 0,           // Vite יבחר פורט פנוי אוטומטית
    strictPort: false, // אם הפורט לא פנוי, Vite יבחר פורט חלופי
  },
});
