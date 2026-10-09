import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    // Split vendor code so every emitted chunk stays small enough
    // to upload through the deployment tooling (per-file arg limits).
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom"],
          "vendor-motion": ["motion/react"],
          "vendor-icons": ["react-icons/fi", "react-icons/fa"],
        },
      },
    },
  },
  server: { host: "127.0.0.1" },
  preview: { host: "127.0.0.1" },
});