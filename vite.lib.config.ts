import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true
    })
  ],

  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "MyLibrary",
      fileName: "my-library"
    },

    rollupOptions: {
      external: [
        "react",
        "react-dom"
      ],

      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM"
        }
      }
    }
  }
});