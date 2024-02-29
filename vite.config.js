import { resolve } from 'path'
import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [preact()],
	build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'required-to-build': resolve(__dirname, 'required-to-build.html')
      }
    }
  }
})
