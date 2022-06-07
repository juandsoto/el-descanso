import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import reactRefresh from "@vitejs/plugin-react-refresh";
import shimReactPdf from "vite-plugin-shim-react-pdf";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/el-descanso/",
  plugins: [react(), reactRefresh(), shimReactPdf()],
  // define: {
  //   global: {},
  // },
});
