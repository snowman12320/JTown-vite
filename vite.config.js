import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'

/* global process */
export default defineConfig({
  // https://github.com/webfansplz/vite-plugin-vue-devtools/blob/main/README.zh-CN.md
  plugins: [VueDevTools(), vue()],
  base: process.env.NODE_ENV === 'production' ? '/jtown-vite/' : '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
