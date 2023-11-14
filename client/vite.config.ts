import { defineConfig } from "vite";
import pluginTSConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [pluginTSConfigPaths()],
});
