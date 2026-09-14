import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const ROOT_VUE = path.resolve(__dirname, '..')
const BASE_CODE = path.resolve(ROOT_VUE, '..')
const DASHBOARD_DIR = path.resolve(BASE_CODE, 'crml-ui-dashboard')

console.log('⚡ Generating Dedicated Standalone CRML-UI Dashboard Project at C:\\Code\\crml-ui-dashboard...')

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

function writeFile(filePath, content) {
  ensureDir(path.dirname(filePath))
  fs.writeFileSync(filePath, content, 'utf-8')
  console.log(`  + Wrote: ${path.relative(BASE_CODE, filePath)}`)
}

// 1. package.json
writeFile(path.resolve(DASHBOARD_DIR, 'package.json'), JSON.stringify({
  name: 'crml-ui-dashboard',
  version: '0.1.0',
  private: true,
  type: 'module',
  description: 'Unified Documentation & Installation Hub for CRML-UI (Vue, React, Svelte & HTML5)',
  scripts: {
    dev: 'vite --port 5180',
    build: 'vue-tsc && vite build',
    preview: 'vite preview'
  },
  dependencies: {
    vue: '^3.4.0'
  },
  devDependencies: {
    '@vitejs/plugin-vue': '^5.0.0',
    typescript: '^5.3.0',
    vite: '^5.1.0',
    'vue-tsc': '^2.0.0'
  }
}, null, 2))

// 2. tsconfig.json
writeFile(path.resolve(DASHBOARD_DIR, 'tsconfig.json'), JSON.stringify({
  compilerOptions: {
    target: 'ES2020',
    useDefineForClassFields: true,
    module: 'ESNext',
    lib: ['ES2020', 'DOM', 'DOM.Iterable'],
    skipLibCheck: true,
    moduleResolution: 'bundler',
    allowImportingTsExtensions: false,
    resolveJsonModule: true,
    isolatedModules: true,
    noEmit: true,
    jsx: 'preserve',
    strict: true,
    noUnusedLocals: true,
    noUnusedParameters: true,
    noFallthroughCasesInSwitch: true
  },
  include: ['src/**/*.ts', 'src/**/*.d.ts', 'src/**/*.tsx', 'src/**/*.vue']
}, null, 2))

// 3. vite.config.ts
writeFile(path.resolve(DASHBOARD_DIR, 'vite.config.ts'), `import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    port: 5180
  }
})
`)

// 4. index.html
writeFile(path.resolve(DASHBOARD_DIR, 'index.html'), `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CRML - UI // Multi-Framework Documentation & Installation Hub</title>
    <meta name="description" content="Official documentation and package distribution hub for CRML-UI: Vue 3, React 18/19, Svelte 5, and Vanilla HTML5 Neubrutalism design system." />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700;800;900&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Cabinet+Grotesk:wght@800;900&display=swap" rel="stylesheet">
  </head>
  <body style="margin: 0; background-color: #FAFAFA; font-family: 'Space Grotesk', sans-serif;">
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
`)

// 5. Sync tokens to dashboard project
const tokensSrcDir = path.resolve(ROOT_VUE, 'src/tokens')
const tokensDestDir = path.resolve(DASHBOARD_DIR, 'src/tokens')
ensureDir(tokensDestDir)
for (const file of fs.readdirSync(tokensSrcDir).filter(f => f.endsWith('.css'))) {
  fs.copyFileSync(path.resolve(tokensSrcDir, file), path.resolve(tokensDestDir, file))
}
console.log(`  + Synced tokens to crml-ui-dashboard/src/tokens`)

// 6. src/main.ts
writeFile(path.resolve(DASHBOARD_DIR, 'src/main.ts'), `import { createApp } from 'vue'
import App from './App.vue'
import './tokens/index.css'

createApp(App).mount('#app')
`)

// 7. src/App.vue (Copy from StandaloneDashboard.vue)
const dashboardSrc = path.resolve(ROOT_VUE, 'playground/StandaloneDashboard.vue')
if (fs.existsSync(dashboardSrc)) {
  fs.copyFileSync(dashboardSrc, path.resolve(DASHBOARD_DIR, 'src/App.vue'))
  console.log(`  + Copied StandaloneDashboard.vue -> crml-ui-dashboard/src/App.vue`)
}

// 8. AGENTS.md for Dashboard project
writeFile(path.resolve(DASHBOARD_DIR, 'AGENTS.md'), `# AGENTS.md - crml-ui-dashboard (Multi-Framework Documentation Hub)

> **Authoritative specification for AI Coding Assistants working on crml-ui-dashboard.**

---

## 🚀 1. Repository Purpose
This project is the **Interactive Documentation & Installation Hub** for the entire \`crml-ui\` multi-framework ecosystem.

It allows developers to:
1. Choose between **Vue 3**, **React 18/19**, **Svelte 5**, and **Vanilla HTML5**.
2. For JS frameworks (Vue, React, Svelte):
   - Install via NPM (\`npm install crml-ui\`, \`npm install crml-ui-react\`, \`npm install crml-ui-svelte\`).
   - Open the official npm package registry link directly.
3. For HTML5:
   - Download the standalone HTML5 starter template (.html) or CSS design tokens (.css) with zero dependencies.
4. Test live components in a real-time sandbox with dynamic code generation.
5. Inspect the full 70-component parity matrix across all 4 frameworks.
`)

// 9. README.md for Dashboard project
writeFile(path.resolve(DASHBOARD_DIR, 'README.md'), `# CRML-UI Dashboard & Documentation Hub

Interactive Multi-Framework documentation hub for **CRML-UI** (Vue 3, React 18/19, Svelte 5, and Vanilla HTML5).

## Getting Started
\`\`\`bash
npm install
npm run dev
\`\`\`
Runs the dashboard locally on \`http://localhost:5180/\`.
`)

console.log('✅ Standalone Dashboard project generated successfully at C:\\Code\\crml-ui-dashboard!')
