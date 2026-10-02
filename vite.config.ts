import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path"; //Add by ibovs

// https://vite.dev/config/
export default defineConfig({
   server: {
        host: "0.0.0.0",
        port: 5173
    },
  plugins: [
    react(),
    tailwindcss(),
  ],
  // Add by ibovs
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});