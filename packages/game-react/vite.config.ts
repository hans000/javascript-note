import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  css: {
    preprocessorOptions: {
      less: { javascriptEnabled: true }
    }
  },
  build: {
    outDir: resolve('../..', './docs/game-react'),
    target: 'esnext',
    assetsDir: './',
    // minify: false,
    // polyfillModulePreload: false,
    // rollupOptions: {
    //   output: {
    //     format: 'iife',
    //     globals: {
    //       'react': 'React',
    //       'lz-string': 'LZString',
    //       'react-dom': 'ReactDOM',
    //       'react-router': 'ReactRouter',
    //       'react-router-dom': 'ReactRouterDOM',
    //     },
    //   },
    //   external: [
    //     'react',
    //     'lz-string',
    //     'react-dom',
    //     'react-router',
    //     'react-router-dom',
    //   ],
    // },
  },
  plugins: [
    react(),
  ]
})
