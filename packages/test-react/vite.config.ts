import { defineConfig, PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import cdnImport from 'vite-plugin-cdn-import'
import styleImport from 'vite-plugin-style-import'
import externalGlobals from 'rollup-plugin-external-globals'
const __DEV__ = process.env.NODE_ENV === 'development'
import { resolve } from 'path'
import path from "path-browserify"

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  define: {
    'process.env': {},
  },
  resolve: {
    alias: {
      path: "path-browserify",
    },
  },
  build: {
    // minify: false,
    outDir: resolve('../..', './docs/work-list-react'),
    target: 'esnext',
    rollupOptions: {
      // external: [
      //   'react',
      //   'react-is',
      //   'react-dom',
      //   'react-router-dom',
      //   'react-router',
      //   'history',
      //   'antd',
      //   'clsx',
      //   'sync-session',
      //   '@ant-design/icons',
      // ],
      // plugins: [
      //   {
      //     name: "my-debug-plugin",
      //     transform: function(code, id) {
      //       if (id.match(/src\/main/)) {
      //         console.log(JSON.stringify(this.parse(code), null, 2));
      //       }
      //     }
      //   }
      //   !__DEV__ && externalGlobals({
      //     'react': 'React',
      //     'react-is': 'ReactIs',
      //     'react-dom': 'ReactDOM',
      //     'react-router-dom': 'ReactRouterDOM',
      //     'react-router': 'ReactRouter',
      //     'history': 'HistoryLibrary',
      //     'antd': 'antd',
      //     'clsx': 'clsx',
      //     'sync-session': 'SyncSession',
      //     '@ant-design/icons': 'icons',
      //   }),
      // ]
    }
  },
  plugins: [
    react(),
    // !__DEV__ && cdnImport({
    //   modules: [
    //     {
    //       name: 'react-is',
    //       var: 'ReactIs',
    //       path: 'https://unpkg.com/react-is@18.2.0/umd/react-is.production.min.js',
    //     },
    //     {
    //       name: 'react',
    //       var: 'React',
    //       path: 'https://unpkg.com/react@18.0.0/umd/react.production.min.js',
    //     },
    //     {
    //       name: 'react-dom',
    //       var: 'ReactDOM',
    //       path: 'https://unpkg.com/react-dom@18.0.0/umd/react-dom.production.min.js',
    //     },
    //     {
    //       name: 'history',
    //       var: 'HistoryLibrary',
    //       path: 'https://unpkg.com/history@5.3.0/umd/history.production.min.js',
    //     },
    //     {
    //       name: 'react-router',
    //       var: 'ReactRouter',
    //       path: 'https://unpkg.com/react-router@6.3.0/umd/react-router.production.min.js',
    //     },
    //     {
    //       name: 'react-router-dom',
    //       var: 'ReactRouterDOM',
    //       path: 'https://unpkg.com/react-router-dom@6.3.0/umd/react-router-dom.production.min.js',
    //     },
    //     {
    //       name: '@ant-design/icons',
    //       var: 'icons',
    //       path: 'https://unpkg.com/@ant-design/icons@4.7.0/dist/index.umd.js',
    //     },
    //     {
    //       name: 'antd',
    //       var: 'antd',
    //       path: 'https://unpkg.com/antd@4.21.0/dist/antd.min.js',
    //       css: 'https://unpkg.com/antd@4.21.0/dist/antd.min.css',
    //     },
    //     {
    //       name: 'clsx',
    //       var: 'clsx',
    //       path: 'https://unpkg.com/clsx@1.1.1/dist/clsx.min.js',
    //     },
    //     {
    //       name: 'sync-session',
    //       var: 'SyncSession',
    //       path: 'https://unpkg.com/sync-session@1.0.2/dist/umd/sync-session.min.js',
    //     },
    //   ]
    // }),
    styleImport({
      libs: [
        {
          libraryName: 'antd',
          esModule: true,
          resolveStyle: (name) => {
            return `antd/es/${name}/style/index`
          },
        },
      ]
    })
  ].filter(Boolean) as PluginOption[]
})
