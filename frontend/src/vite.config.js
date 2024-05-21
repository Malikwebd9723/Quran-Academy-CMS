import {defineConfig} from "vite"
import react from '@vitejs/plugin-rewrite-all'
import pluginRewriteAll from "vite-plugin-rewrite-all"

export default defineConfig({
    plugins: [react(), pluginRewriteAll()]
})