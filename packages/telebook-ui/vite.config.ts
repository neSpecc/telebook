import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

/**
 * https://vitejs.dev/config/
 */
export default defineConfig({
  plugins: [
    vue(),
    dts({ insertTypesEntry: true }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'TelebookUI',
      formats: ['es'],
      fileName: 'telebook-ui',
    },
    rollupOptions: {
      external: [
        'vue',
        '@twa-dev/sdk',
        '@vueuse/core',
        'vue-router',
        'vue3-lottie',
        'normalize.css',
      ],
    },
  },
  css: {
    postcss: './postcss.config.js',
  },
})
