import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'cert/key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'cert/certificate.pem'))
    }
  },
  resolve: {
    alias: {
        '@components': '/src/components',
        '@assets': '/src/assets',
        '@pages': '/src/pages',
        '@views': '/src/views',
        '@layouts': '/src/layouts',
        '@':  '/src/main.js'
    },
},
  
  build: {
    outDir: 'dist',
    rollupOptions: {
      output:{inlineDynamicImports:true}
    }
  }
})
