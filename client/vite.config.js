import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Allows for the client to make requests to the server
      '/api': 'http://localhost:3000',
    }
  }
})
