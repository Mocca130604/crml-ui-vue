import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const svelteVitePath = path.resolve(__dirname, '../../crml-ui-svelte/vite.config.ts')
const config = `import { defineConfig } from 'vite'
import { svelte, vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import path from 'path'

export default defineConfig({
  plugins: [
    svelte({
      preprocess: vitePreprocess()
    })
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'CrmlUISvelte',
      fileName: (format) => \`crml-ui-svelte.\${format === 'es' ? 'js' : 'umd.cjs'}\`
    },
    rollupOptions: {
      external: ['svelte'],
      output: {
        globals: {
          svelte: 'Svelte'
        }
      }
    }
  }
})
`

fs.writeFileSync(svelteVitePath, config, 'utf8')
console.log('Successfully updated crml-ui-svelte/vite.config.ts with vitePreprocess()!')
