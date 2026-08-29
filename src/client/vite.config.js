import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Relative, not "/" - this app is served from a path-prefixing proxy whose
  // prefix isn't known at build time, so every emitted asset reference (JS,
  // CSS, and images pulled in via component imports) must resolve relative
  // to the page's own URL rather than the site root.
  base: './',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
