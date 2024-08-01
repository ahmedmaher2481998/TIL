// vite.config.ts
import path from "path";
import { defineConfig } from "file:///home/ahmed/Dev/projects/cv-projects/blogy-app-vue-supabase/node_modules/.pnpm/vite@5.3.4_@types+node@20.14.11/node_modules/vite/dist/node/index.js";
import vue from "file:///home/ahmed/Dev/projects/cv-projects/blogy-app-vue-supabase/node_modules/.pnpm/@vitejs+plugin-vue@5.0.5_vite@5.3.4_@types+node@20.14.11__vue@3.4.32_typescript@5.4.5_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueDevTools from "file:///home/ahmed/Dev/projects/cv-projects/blogy-app-vue-supabase/node_modules/.pnpm/vite-plugin-vue-devtools@7.3.6_rollup@4.18.1_vite@5.3.4_@types+node@20.14.11__vue@3.4.32_typescript@5.4.5_/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
import tailwind from "file:///home/ahmed/Dev/projects/cv-projects/blogy-app-vue-supabase/node_modules/.pnpm/tailwindcss@3.4.6/node_modules/tailwindcss/lib/index.js";
import autoprefixer from "file:///home/ahmed/Dev/projects/cv-projects/blogy-app-vue-supabase/node_modules/.pnpm/autoprefixer@10.4.19_postcss@8.4.39/node_modules/autoprefixer/lib/autoprefixer.js";
var __vite_injected_original_dirname = "/home/ahmed/Dev/projects/cv-projects/blogy-app-vue-supabase";
var vite_config_default = defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()]
    }
  },
  plugins: [
    vue(),
    vueDevTools()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9haG1lZC9EZXYvcHJvamVjdHMvY3YtcHJvamVjdHMvYmxvZ3ktYXBwLXZ1ZS1zdXBhYmFzZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvYWhtZWQvRGV2L3Byb2plY3RzL2N2LXByb2plY3RzL2Jsb2d5LWFwcC12dWUtc3VwYWJhc2Uvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvYWhtZWQvRGV2L3Byb2plY3RzL2N2LXByb2plY3RzL2Jsb2d5LWFwcC12dWUtc3VwYWJhc2Uvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICdub2RlOnVybCdcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCB2dWVEZXZUb29scyBmcm9tICd2aXRlLXBsdWdpbi12dWUtZGV2dG9vbHMnXG5pbXBvcnQgdGFpbHdpbmQgZnJvbSAndGFpbHdpbmRjc3MnXG5pbXBvcnQgYXV0b3ByZWZpeGVyIGZyb20gJ2F1dG9wcmVmaXhlcidcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBjc3M6IHtcbiAgICBwb3N0Y3NzOiB7XG4gICAgICBwbHVnaW5zOiBbdGFpbHdpbmQoKSwgYXV0b3ByZWZpeGVyKCldXG4gICAgfVxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAgdnVlKCksXG4gICAgdnVlRGV2VG9vbHMoKVxuXG4gIF0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMnKSxcblxuICAgIH1cbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFDQSxPQUFPLFVBQVU7QUFDakIsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8saUJBQWlCO0FBQ3hCLE9BQU8sY0FBYztBQUNyQixPQUFPLGtCQUFrQjtBQU56QixJQUFNLG1DQUFtQztBQVF6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixLQUFLO0FBQUEsSUFDSCxTQUFTO0FBQUEsTUFDUCxTQUFTLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQztBQUFBLElBQ3RDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLElBQ0osWUFBWTtBQUFBLEVBRWQ7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUV0QztBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
