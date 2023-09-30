/** @format */

import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    assetsDir: "assets",
  },
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
  },
  test: {
    environment: "happy-dom",
    coverage: {
      provider: "v8",
      reporter: ["cobertura", "lcov", "text"],
    },
  },
});
