import path from 'path'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [react()],
	optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/xr']
  },
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'~': path.resolve(__dirname, 'node_modules')
		}
	},
	build: {
		chunkSizeWarningLimit: 1600
	}
})
