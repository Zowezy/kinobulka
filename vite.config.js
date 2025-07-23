import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import { ghPages } from 'vite-plugin-gh-pages'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    ghPages()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  define: {
  'process.env': {}
  },
  server:{
    proxy:{
      '/api':{
        target:'https://p.ddbb.lol/api',
        changeOrigin:true,
        rewrite:path => path.replace(/^\/api/, '')
      }
    }
  },
  base: process.env.NODE_ENV === 'production' ? '/kinobulka/' : '/'
})
