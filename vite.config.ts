import path from "path";

import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import svg from "@neodx/svg/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    svg({
      inputRoot: "src/shared/assets/icons",
      output: "public/sprites",
      fileName: "{name}.{hash:8}.svg",
      metadata: "src/shared/ui/Icon/sprite.gen.ts",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@shared": path.resolve(__dirname, "./src/shared"),
      "@app": path.resolve(__dirname, "./src/app"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@widgets": path.resolve(__dirname, "./src/widgets"),
      "@pages": path.resolve(__dirname, "./src/pages"),
    },
  },
  test: {
    environment: "happy-dom",
    globals: true,
  },
});
