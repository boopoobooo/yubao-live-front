import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/userLogin': {
        target: 'http://yubao.com:8081', // 目标地址
        changeOrigin: true, // 允许跨域
      },
      '/home': {
        target: 'http://yubao.com:8081', // 目标地址
        changeOrigin: true, // 允许跨域
      },
    },
  },
});