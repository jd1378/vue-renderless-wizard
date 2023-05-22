import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import typescript from 'rollup-plugin-typescript2';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
import { existsSync, readdirSync, lstatSync, rmdirSync, unlinkSync } from 'fs';
// import vueJsx from '@vitejs/plugin-vue-jsx';
import VueMacros from 'unplugin-vue-macros/vite';

emptyDir(resolve(__dirname, 'dist'));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueMacros({
      plugins: {
        vue: vue(),
        //vueJsx: vueJsx()
      },
    }),
    dts({
      insertTypesEntry: true,
    }),
    typescript({
      check: false,
      include: ['src/components/**/*.vue'],
      tsconfigOverride: {
        compilerOptions: {
          outDir: 'dist',
          // sourceMap: true,
          declaration: true,
          declarationMap: true,
        },
      },
      exclude: ['vite.config.ts'],
    }),
  ],
  build: {
    cssCodeSplit: true,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: 'src/entry.ts',
      name: 'VueRenderlessWizard',
      formats: ['es', 'cjs', 'umd'],
      fileName: (format) => `VueRenderlessWizard.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that should not be bundled
      // into your library
      input: {
        main: resolve(__dirname, 'src/entry.ts'),
      },
      external: ['vue'],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'main.css') return 'VueRenderlessWizard.css';
          return assetInfo.name as string;
        },
        exports: 'named',
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    coverage: {
      provider: 'istanbul',
      reportsDirectory: './coverage/',
    },
  },
});

function emptyDir(dir: string): void {
  if (!existsSync(dir)) {
    return;
  }

  for (const file of readdirSync(dir)) {
    const abs = resolve(dir, file);

    // baseline is Node 12 so can't use rmSync
    if (lstatSync(abs).isDirectory()) {
      emptyDir(abs);
      rmdirSync(abs);
    } else {
      unlinkSync(abs);
    }
  }
}
