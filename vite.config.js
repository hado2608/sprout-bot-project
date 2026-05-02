import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    server: {
      port: 5173,
      open: true,
      proxy: {
        "/api/gemini": {
          target: "https://generativelanguage.googleapis.com",
          changeOrigin: true,
          rewrite: () =>
            `/v1beta/models/gemini-2.5-flash:generateContent?key=${env.VITE_GEMINI_API_KEY}`,
        },
        "/api/trefle": {
          target: "https://trefle.io",
          changeOrigin: true,
          rewrite: (path) =>
            path.replace("/api/trefle", "/api/v1/plants/search") +
            `&token=${env.VITE_TREFLE_TOKEN}`,
        },
      },
    },
  };
});
