import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// GitHub Project Pages: set VITE_BASE_PATH=/repo-name/ in CI
// Custom domain or user site (username.github.io): use /
const base = process.env.VITE_BASE_PATH || '/'

export default defineConfig({
  base,
  plugins: [vue()],
})
