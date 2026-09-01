import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
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
