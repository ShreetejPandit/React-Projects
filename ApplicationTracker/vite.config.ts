import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      // Add any preprocessor options if needed
    },
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
});
