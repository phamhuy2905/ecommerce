import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });

const { VITE_API_PORT, VITE_API_HOST } = process.env;

export default defineConfig({
    plugins: [react()],
    server: {
        host: "0.0.0.0",
        proxy: {
            "/api": {
                target: `http://${VITE_API_HOST}:${VITE_API_PORT}`,
                changeOrigin: true,
            },
        },
    },
});
