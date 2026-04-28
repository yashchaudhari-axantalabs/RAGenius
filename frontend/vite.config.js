import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'
import dotenv from 'dotenv'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const rootPath = path.resolve(__dirname, '../')
  
  // Manually load the custom env files
  const userEnv = dotenv.parse(fs.readFileSync(path.join(rootPath, 'user.env')))
  const devEnv = dotenv.parse(fs.readFileSync(path.join(rootPath, 'developer.env')))
  
  // Merge them into process.env so Vite can see them
  const env = { ...userEnv, ...devEnv }

  return {
    plugins: [react()],
    define: {
      'import.meta.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL),
      'import.meta.env.VITE_GITHUB_URL': JSON.stringify(env.VITE_GITHUB_URL),
      'import.meta.env.VITE_LINKEDIN_URL': JSON.stringify(env.VITE_LINKEDIN_URL),
    },
    server: {
      port: 5173,
      strictPort: true,
    },
  }
})
