import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: './',  // מוודא ש-Vite יודע את המיקום של קובץ ה-HTML
  build: {
    outDir: 'dist',  // תיקיית ה-output לבנייה
  },
});
