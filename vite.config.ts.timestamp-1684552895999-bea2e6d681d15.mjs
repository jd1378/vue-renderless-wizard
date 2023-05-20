// vite.config.ts
import { defineConfig } from "file:///F:/Projects/Private/npm%20packages/vue/vue-renderless-wizard/node_modules/vite/dist/node/index.js";
import vue from "file:///F:/Projects/Private/npm%20packages/vue/vue-renderless-wizard/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import typescript from "file:///F:/Projects/Private/npm%20packages/vue/vue-renderless-wizard/node_modules/rollup-plugin-typescript2/dist/rollup-plugin-typescript2.cjs.js";
import dts from "file:///F:/Projects/Private/npm%20packages/vue/vue-renderless-wizard/node_modules/vite-plugin-dts/dist/index.mjs";
import path from "path";
import vueJsx from "file:///F:/Projects/Private/npm%20packages/vue/vue-renderless-wizard/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
var __vite_injected_original_dirname = "F:\\Projects\\Private\\npm packages\\vue\\vue-renderless-wizard";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    dts({
      insertTypesEntry: true
    }),
    typescript({
      check: false,
      include: ["src/components/**/*.vue"],
      tsconfigOverride: {
        compilerOptions: {
          outDir: "dist",
          sourceMap: true,
          declaration: true,
          declarationMap: true
        }
      },
      exclude: ["vite.config.ts"]
    })
  ],
  build: {
    cssCodeSplit: true,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: "src/entry.js",
      name: "vue-renderless-wizard",
      formats: ["es", "cjs", "umd"],
      fileName: (format) => `vue-renderless-wizard.${format}.js`
    },
    rollupOptions: {
      // make sure to externalize deps that should not be bundled
      // into your library
      input: {
        main: path.resolve(__vite_injected_original_dirname, "src/entry.js")
      },
      external: ["vue"],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "main.css")
            return "vue-renderless-wizard.css";
          return assetInfo.name;
        },
        exports: "named",
        globals: {
          vue: "Vue"
        }
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "src")
    }
  },
  test: {
    globals: true,
    environment: "happy-dom",
    coverage: {
      provider: "istanbul",
      reportsDirectory: "./coverage/"
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOlxcXFxQcm9qZWN0c1xcXFxQcml2YXRlXFxcXG5wbSBwYWNrYWdlc1xcXFx2dWVcXFxcdnVlLXJlbmRlcmxlc3Mtd2l6YXJkXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJGOlxcXFxQcm9qZWN0c1xcXFxQcml2YXRlXFxcXG5wbSBwYWNrYWdlc1xcXFx2dWVcXFxcdnVlLXJlbmRlcmxlc3Mtd2l6YXJkXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9GOi9Qcm9qZWN0cy9Qcml2YXRlL25wbSUyMHBhY2thZ2VzL3Z1ZS92dWUtcmVuZGVybGVzcy13aXphcmQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJztcbmltcG9ydCB0eXBlc2NyaXB0IGZyb20gJ3JvbGx1cC1wbHVnaW4tdHlwZXNjcmlwdDInO1xuaW1wb3J0IGR0cyBmcm9tICd2aXRlLXBsdWdpbi1kdHMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgdnVlSnN4IGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZS1qc3gnO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHZ1ZSgpLFxuICAgIHZ1ZUpzeCgpLFxuICAgIGR0cyh7XG4gICAgICBpbnNlcnRUeXBlc0VudHJ5OiB0cnVlLFxuICAgIH0pLFxuICAgIHR5cGVzY3JpcHQoe1xuICAgICAgY2hlY2s6IGZhbHNlLFxuICAgICAgaW5jbHVkZTogWydzcmMvY29tcG9uZW50cy8qKi8qLnZ1ZSddLFxuICAgICAgdHNjb25maWdPdmVycmlkZToge1xuICAgICAgICBjb21waWxlck9wdGlvbnM6IHtcbiAgICAgICAgICBvdXREaXI6ICdkaXN0JyxcbiAgICAgICAgICBzb3VyY2VNYXA6IHRydWUsXG4gICAgICAgICAgZGVjbGFyYXRpb246IHRydWUsXG4gICAgICAgICAgZGVjbGFyYXRpb25NYXA6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgZXhjbHVkZTogWyd2aXRlLmNvbmZpZy50cyddLFxuICAgIH0pLFxuICBdLFxuICBidWlsZDoge1xuICAgIGNzc0NvZGVTcGxpdDogdHJ1ZSxcbiAgICBsaWI6IHtcbiAgICAgIC8vIENvdWxkIGFsc28gYmUgYSBkaWN0aW9uYXJ5IG9yIGFycmF5IG9mIG11bHRpcGxlIGVudHJ5IHBvaW50c1xuICAgICAgZW50cnk6ICdzcmMvZW50cnkuanMnLFxuICAgICAgbmFtZTogJ3Z1ZS1yZW5kZXJsZXNzLXdpemFyZCcsXG4gICAgICBmb3JtYXRzOiBbJ2VzJywgJ2NqcycsICd1bWQnXSxcbiAgICAgIGZpbGVOYW1lOiAoZm9ybWF0KSA9PiBgdnVlLXJlbmRlcmxlc3Mtd2l6YXJkLiR7Zm9ybWF0fS5qc2AsXG4gICAgfSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAvLyBtYWtlIHN1cmUgdG8gZXh0ZXJuYWxpemUgZGVwcyB0aGF0IHNob3VsZCBub3QgYmUgYnVuZGxlZFxuICAgICAgLy8gaW50byB5b3VyIGxpYnJhcnlcbiAgICAgIGlucHV0OiB7XG4gICAgICAgIG1haW46IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvZW50cnkuanMnKSxcbiAgICAgIH0sXG4gICAgICBleHRlcm5hbDogWyd2dWUnXSxcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBhc3NldEZpbGVOYW1lczogKGFzc2V0SW5mbykgPT4ge1xuICAgICAgICAgIGlmIChhc3NldEluZm8ubmFtZSA9PT0gJ21haW4uY3NzJykgcmV0dXJuICd2dWUtcmVuZGVybGVzcy13aXphcmQuY3NzJztcbiAgICAgICAgICByZXR1cm4gYXNzZXRJbmZvLm5hbWU7XG4gICAgICAgIH0sXG4gICAgICAgIGV4cG9ydHM6ICduYW1lZCcsXG4gICAgICAgIGdsb2JhbHM6IHtcbiAgICAgICAgICB2dWU6ICdWdWUnLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpLFxuICAgIH0sXG4gIH0sXG4gIHRlc3Q6IHtcbiAgICBnbG9iYWxzOiB0cnVlLFxuICAgIGVudmlyb25tZW50OiAnaGFwcHktZG9tJyxcbiAgICBjb3ZlcmFnZToge1xuICAgICAgcHJvdmlkZXI6ICdpc3RhbmJ1bCcsXG4gICAgICByZXBvcnRzRGlyZWN0b3J5OiAnLi9jb3ZlcmFnZS8nLFxuICAgIH0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBOFcsU0FBUyxvQkFBb0I7QUFDM1ksT0FBTyxTQUFTO0FBQ2hCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sU0FBUztBQUNoQixPQUFPLFVBQVU7QUFDakIsT0FBTyxZQUFZO0FBTG5CLElBQU0sbUNBQW1DO0FBUXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxJQUNKLE9BQU87QUFBQSxJQUNQLElBQUk7QUFBQSxNQUNGLGtCQUFrQjtBQUFBLElBQ3BCLENBQUM7QUFBQSxJQUNELFdBQVc7QUFBQSxNQUNULE9BQU87QUFBQSxNQUNQLFNBQVMsQ0FBQyx5QkFBeUI7QUFBQSxNQUNuQyxrQkFBa0I7QUFBQSxRQUNoQixpQkFBaUI7QUFBQSxVQUNmLFFBQVE7QUFBQSxVQUNSLFdBQVc7QUFBQSxVQUNYLGFBQWE7QUFBQSxVQUNiLGdCQUFnQjtBQUFBLFFBQ2xCO0FBQUEsTUFDRjtBQUFBLE1BQ0EsU0FBUyxDQUFDLGdCQUFnQjtBQUFBLElBQzVCLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxjQUFjO0FBQUEsSUFDZCxLQUFLO0FBQUE7QUFBQSxNQUVILE9BQU87QUFBQSxNQUNQLE1BQU07QUFBQSxNQUNOLFNBQVMsQ0FBQyxNQUFNLE9BQU8sS0FBSztBQUFBLE1BQzVCLFVBQVUsQ0FBQyxXQUFXLHlCQUF5QjtBQUFBLElBQ2pEO0FBQUEsSUFDQSxlQUFlO0FBQUE7QUFBQTtBQUFBLE1BR2IsT0FBTztBQUFBLFFBQ0wsTUFBTSxLQUFLLFFBQVEsa0NBQVcsY0FBYztBQUFBLE1BQzlDO0FBQUEsTUFDQSxVQUFVLENBQUMsS0FBSztBQUFBLE1BQ2hCLFFBQVE7QUFBQSxRQUNOLGdCQUFnQixDQUFDLGNBQWM7QUFDN0IsY0FBSSxVQUFVLFNBQVM7QUFBWSxtQkFBTztBQUMxQyxpQkFBTyxVQUFVO0FBQUEsUUFDbkI7QUFBQSxRQUNBLFNBQVM7QUFBQSxRQUNULFNBQVM7QUFBQSxVQUNQLEtBQUs7QUFBQSxRQUNQO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxLQUFLO0FBQUEsSUFDcEM7QUFBQSxFQUNGO0FBQUEsRUFDQSxNQUFNO0FBQUEsSUFDSixTQUFTO0FBQUEsSUFDVCxhQUFhO0FBQUEsSUFDYixVQUFVO0FBQUEsTUFDUixVQUFVO0FBQUEsTUFDVixrQkFBa0I7QUFBQSxJQUNwQjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
