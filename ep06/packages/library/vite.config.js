// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        environment: "jsdom",
    },
    build: {
        lib: {
            entry: resolve(__dirname, "src/main.ts"),
            name: "MiniQuery",
            fileName: "mini-query",
        },
    },
});
