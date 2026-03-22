import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
  /** Avoid loading Tailwind PostCSS in Vitest (plugin string form breaks Vite). */
  css: {
    postcss: {
      plugins: [],
    },
  },
  test: {
    environment: "node",
  },
});
