import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const ROOT_VUE = path.resolve(__dirname, '..')
const BASE_CODE = path.resolve(ROOT_VUE, '..')
const DASHBOARD_DIR = path.resolve(BASE_CODE, 'crml-ui-dashboard')

const viteConfig = `import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  optimizeDeps: {
    exclude: ['crml-ui', 'crml-ui-react', 'crml-ui-svelte']
  },
  server: {
    host: '0.0.0.0',
    port: 7171,
    strictPort: true,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  preview: {
    host: '0.0.0.0',
    port: 7171,
    strictPort: true
  }
})
`

fs.writeFileSync(path.resolve(DASHBOARD_DIR, 'vite.config.ts'), viteConfig, 'utf8')

const pkgPath = path.resolve(DASHBOARD_DIR, 'package.json')
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
pkg.scripts.dev = 'vite --host 0.0.0.0 --port 7171'
pkg.scripts.preview = 'vite preview --host 0.0.0.0 --port 7171'
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2), 'utf8')

console.log('✅ Configured crml-ui-dashboard for unique port 7171 (host 0.0.0.0 for Cloudflare Tunneling)!')
