import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    VitePWA({
      // Neue Version wird automatisch aktiviert. Im erzeugten dist/sw.js sind
      // skipWaiting und clientsClaim enthalten (per grep geprüft, siehe 02 und 03).
      registerType: 'autoUpdate',
      manifest: {
        name: 'Linie F – FrontendNow 2026',
        short_name: 'Linie F',
        lang: 'de',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        theme_color: '#B3122E', // = --color-accent (tokens.css)
        background_color: '#F7F3EA', // = --color-surface (tokens.css)
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        // REGEL 1 (02: App-Shell, Token-CSS, Icons UND Sessions-/Speaker-Daten)
        // Precache = Cache-First. Die Konferenzdaten liegen per dynamischem Import
        // als JS-Chunk im Build und sind damit ebenso enthalten wie alle lazy
        // geladenen Routen-Chunks (Szenario 1 und 2 in 03).
        globPatterns: ['**/*.{js,css,html,svg,png,webmanifest}'],
        // REGEL 2 (02: Mein Programm und Deep Links offline)
        // Navigationsanfragen liefern die gecachte index.html (SPA, Szenario 2).
        navigateFallback: '/index.html',
        // REGEL 3: Veraltete Precache-Einträge nach einem Update entfernen.
        cleanupOutdatedCaches: true,
        // Stale-While-Revalidate ist bewusst NICHT umgesetzt (02: keine separate
        // Datendatei, auf die sie wirken könnte).
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
