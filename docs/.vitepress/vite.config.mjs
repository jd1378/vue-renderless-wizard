import { defineConfig } from 'vite';
import VueMacros from 'unplugin-vue-macros/vite';

export default defineConfig({
  plugins: [
    VueMacros({
      plugins: {
        vue: vue(),
        //vueJsx: vueJsx()
      },
    }),
  ],
  server: {
    fs: {
      allow: ['../..']
    }
  }
})
