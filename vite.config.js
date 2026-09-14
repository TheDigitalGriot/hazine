import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves this project beneath a repository prefix. The base is
// supplied by the environment so the same build path works for root development
// (`/`) and for a repository-scoped deploy (`/hazine/`) without code changes.
const repositoryName = process.env.GITHUB_REPOSITORY?.split('/').filter(Boolean).at(-1)
const rawBase = process.env.VITE_BASE ?? (repositoryName ? `/${repositoryName}/` : '/')
const base = rawBase.endsWith('/') ? rawBase : `${rawBase}/`

export default defineConfig({
  base,
  plugins: [react()],
  build: {
    target: 'es2022',
    sourcemap: true,
    chunkSizeWarningLimit: 550,
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: 'three-core', test: /node_modules[\\/]three[\\/]/, maxSize: 450000, priority: 40 },
            { name: 'r3f-stack', test: /node_modules[\\/](@react-three|three-stdlib)[\\/]/, priority: 30 },
            { name: 'postprocessing', test: /node_modules[\\/](postprocessing|@react-three[\\/]postprocessing)[\\/]/, priority: 25 },
            { name: 'theatre', test: /node_modules[\\/]@theatre[\\/]/, priority: 20 },
          ],
        },
      },
    },
  },
})
