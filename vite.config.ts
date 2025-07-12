import path from 'node:path'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
      routesDirectory: './src/app/routes'
    }),
    react()
  ],
  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[name]__[local]__[hash:base64:5]'
    }
  },
  resolve: {
    alias: {
      '@/app': path.resolve(__dirname, 'src/app'),
      '@/pages': path.resolve(__dirname, 'src/pages'),
      '@/shared': path.resolve(__dirname, 'src/shared'),
      '@/assets': path.resolve(__dirname, 'src/assets'),
      '@': path.resolve(__dirname, 'src')
    }
  }
})
