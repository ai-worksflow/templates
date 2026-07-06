import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vue()],
  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.message.includes("node_modules/@vueuse/core") && warning.message.includes("#__PURE__")) {
          return;
        }
        warn(warning);
      },
      output: {
        manualChunks: {
          vue: ["vue"],
          elementPlus: ["element-plus", "@element-plus/icons-vue"],
        },
      },
    },
  },
});
