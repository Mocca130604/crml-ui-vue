import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const ROOT_VUE = path.resolve(__dirname, '..')
const BASE_CODE = path.resolve(ROOT_VUE, '..')

const REACT_DIR = path.resolve(BASE_CODE, 'crml-ui-react')
const HTML_DIR = path.resolve(BASE_CODE, 'crml-ui-html')
const SVELTE_DIR = path.resolve(BASE_CODE, 'crml-ui-svelte')

console.log('🚀 Starting CRML-UI Multi-Framework Ecosystem Generation...')

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

function writeFile(filePath, content) {
  ensureDir(path.dirname(filePath))
  fs.writeFileSync(filePath, content, 'utf-8')
  console.log(`  + Wrote: ${path.relative(BASE_CODE, filePath)}`)
}

// -------------------------------------------------------------
// 1. SETUP CRML-UI-REACT
// -------------------------------------------------------------
export function setupReact() {
  console.log('\n⚡ Setting up crml-ui-react...')

  // package.json
  writeFile(path.resolve(REACT_DIR, 'package.json'), JSON.stringify({
    name: 'crml-ui-react',
    version: '0.1.0',
    type: 'module',
    description: 'Tactile Neubrutalism, Y2K Cyber Mecha & Streetwear Design System for React',
    main: './dist/crml-ui-react.umd.cjs',
    module: './dist/crml-ui-react.js',
    types: './dist/index.d.ts',
    exports: {
      '.': {
        types: './dist/index.d.ts',
        import: './dist/crml-ui-react.js',
        require: './dist/crml-ui-react.umd.cjs'
      },
      './style.css': './dist/style.css'
    },
    files: ['dist'],
    scripts: {
      dev: 'vite',
      build: 'vite build',
      preview: 'vite preview'
    },
    peerDependencies: {
      react: '>=18.0.0',
      'react-dom': '>=18.0.0'
    },
    devDependencies: {
      '@types/react': '^18.3.5',
      '@types/react-dom': '^18.3.0',
      '@vitejs/plugin-react': '^4.3.1',
      react: '^18.3.1',
      'react-dom': '^18.3.1',
      typescript: '^5.5.3',
      vite: '^5.4.2',
      'vite-plugin-dts': '^4.1.1'
    }
  }, null, 2))

  // tsconfig.json
  writeFile(path.resolve(REACT_DIR, 'tsconfig.json'), JSON.stringify({
    compilerOptions: {
      target: 'ES2020',
      useDefineForClassFields: true,
      lib: ['ES2020', 'DOM', 'DOM.Iterable'],
      module: 'ESNext',
      skipLibCheck: true,
      moduleResolution: 'bundler',
      allowImportingTsExtensions: false,
      resolveJsonModule: true,
      isolatedModules: true,
      noEmit: false,
      jsx: 'react-jsx',
      strict: true,
      noUnusedLocals: true,
      noUnusedParameters: true,
      noFallthroughCasesInSwitch: true
    },
    include: ['src', 'playground']
  }, null, 2))

  // vite.config.ts
  writeFile(path.resolve(REACT_DIR, 'vite.config.ts'), `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    dts({ rollupTypes: true })
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'CrmlUIReact',
      fileName: (format) => format === 'es' ? 'crml-ui-react.js' : 'crml-ui-react.umd.cjs'
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
})
`)

  // index.html for playground
  writeFile(path.resolve(REACT_DIR, 'index.html'), `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CRML - UI [REACT] // Neubrutalism Design System</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700;800;900&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Cabinet+Grotesk:wght@800;900&display=swap" rel="stylesheet">
  </head>
  <body style="margin: 0; background-color: #FAFAFA; font-family: 'Space Grotesk', sans-serif;">
    <div id="root"></div>
    <script type="module" src="/playground/main.tsx"></script>
  </body>
</html>
`)

  // AGENTS.md for React
  writeFile(path.resolve(REACT_DIR, 'AGENTS.md'), `# AGENTS.md - crml-ui-react (React Ecosystem Specification)

> **Authoritative specification for AI Coding Assistants working on crml-ui-react.**

---

## 🚀 1. Repository Purpose
This is the **React 18/19 implementation** of the \`crml-ui\` design system, built with TypeScript, Vite Library Mode, and Zero Ambient Blur Neubrutalism.

### Strict Design Guidelines & Constraints:
1. **Zero Ambient Blur Policy**:
   - ❌ NEVER use soft drop-shadows or \`filter: blur()\`.
   - ✅ ALWAYS use solid ink offset drop-shadows:
     - Badge/Pill: \`box-shadow: 2px 2px 0px #0D0D0D;\`
     - Button/Card: \`box-shadow: 4px 4px 0px #0D0D0D;\`
     - Modal/Dialog: \`box-shadow: 6px 6px 0px #0D0D0D;\`
2. **Ink Border Stroke**:
   - Border style: \`2.5px solid #0D0D0D\` or \`3px solid #0D0D0D\`.
3. **Tactile Physics**:
   - Resting: \`transform: translate(0px, 0px); box-shadow: 4px 4px 0px #0D0D0D;\`
   - Active: \`transform: translate(3px, 3px); box-shadow: 1px 1px 0px #0D0D0D;\`
   - Transition: \`transition: all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);\`

### Cross-Framework Synchronization Protocol:
- If new components or props are added here, they MUST match the master token architecture in \`src/tokens/\` and be synced with \`crml-ui\` (Vue), \`crml-ui-html\`, and \`crml-ui-svelte\`.
`)
}

// -------------------------------------------------------------
// 2. SETUP CRML-UI-HTML
// -------------------------------------------------------------
export function setupHtml() {
  console.log('\n⚡ Setting up crml-ui-html...')

  writeFile(path.resolve(HTML_DIR, 'package.json'), JSON.stringify({
    name: 'crml-ui-html',
    version: '0.1.0',
    description: 'Universal Vanilla HTML5 & Modern Web Components for CRML-UI Neubrutalism Design System',
    scripts: {
      dev: 'vite',
      preview: 'vite preview'
    },
    devDependencies: {
      vite: '^5.4.2'
    }
  }, null, 2))

  // AGENTS.md for HTML
  writeFile(path.resolve(HTML_DIR, 'AGENTS.md'), `# AGENTS.md - crml-ui-html (Vanilla HTML5 / Web Components Spec)

> **Authoritative specification for AI Coding Assistants working on crml-ui-html.**

---

## 🚀 1. Repository Purpose
This is the **Pure HTML5 / Modern Web Components** implementation of \`crml-ui\`.
It delivers zero-dependency, copy-pasteable HTML markup and CSS classes with tactile spring physics for any backend, PHP, WordPress, Django, Rails, or static site.

### Universal Classes:
- \`.crml-btn\`, \`.crml-btn-bouncy\`, \`.crml-badge\`, \`.crml-sticker\`, \`.crml-card\`, \`.crml-input\`, \`.crml-switch\`, \`.crml-modal\`, \`.crml-tabs\`
- Colors: \`.variant-lime\` (\`#CCFF00\`), \`.variant-pink\` (\`#FF007F\`), \`.variant-cyan\` (\`#00F0FF\`), \`.variant-yellow\` (\`#FFD600\`)
- Tactile physics: \`transform: translate(3px, 3px); box-shadow: 1px 1px 0px #0D0D0D;\`
`)
}

// -------------------------------------------------------------
// 3. SETUP CRML-UI-SVELTE
// -------------------------------------------------------------
export function setupSvelte() {
  console.log('\n⚡ Setting up crml-ui-svelte...')

  writeFile(path.resolve(SVELTE_DIR, 'package.json'), JSON.stringify({
    name: 'crml-ui-svelte',
    version: '0.1.0',
    type: 'module',
    description: 'Tactile Neubrutalism & Cyber Mecha Design System for Svelte 5',
    main: './dist/crml-ui-svelte.umd.cjs',
    module: './dist/crml-ui-svelte.js',
    types: './dist/index.d.ts',
    exports: {
      '.': {
        types: './dist/index.d.ts',
        import: './dist/crml-ui-svelte.js',
        require: './dist/crml-ui-svelte.umd.cjs'
      },
      './style.css': './dist/style.css'
    },
    files: ['dist'],
    scripts: {
      dev: 'vite',
      build: 'vite build',
      preview: 'vite preview'
    },
    peerDependencies: {
      svelte: '>=4.0.0 || >=5.0.0'
    },
    devDependencies: {
      '@sveltejs/vite-plugin-svelte': '^3.1.2',
      svelte: '^4.2.19',
      typescript: '^5.5.3',
      vite: '^5.4.2'
    }
  }, null, 2))

  // svelte vite.config.ts
  writeFile(path.resolve(SVELTE_DIR, 'vite.config.ts'), `import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [svelte()]
})
`)

  // index.html for Svelte
  writeFile(path.resolve(SVELTE_DIR, 'index.html'), `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CRML - UI [SVELTE] // Neubrutalism Design System</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700;800;900&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Cabinet+Grotesk:wght@800;900&display=swap" rel="stylesheet">
  </head>
  <body style="margin: 0; background-color: #FAFAFA; font-family: 'Space Grotesk', sans-serif;">
    <div id="app"></div>
    <script type="module" src="/playground/main.ts"></script>
  </body>
</html>
`)

  // AGENTS.md for Svelte
  writeFile(path.resolve(SVELTE_DIR, 'AGENTS.md'), `# AGENTS.md - crml-ui-svelte (Svelte Ecosystem Specification)

> **Authoritative specification for AI Coding Assistants working on crml-ui-svelte.**

---

## 🚀 1. Repository Purpose
This is the **Svelte 4/5 implementation** of the \`crml-ui\` design system, built with TypeScript, Vite, and Zero Ambient Blur Neubrutalism.

### Strict Design Guidelines:
1. Zero Ambient Blur (\`box-shadow: 4px 4px 0px #0D0D0D;\`).
2. Ink Border Stroke (\`2.5px solid #0D0D0D\` or \`3px solid #0D0D0D\`).
3. Tactile Mechanical Rebound physics (\`transform: translate(3px, 3px)\`).
4. Consistent Props & Events parity with Vue and React implementations.
`)
}

setupReact()
setupHtml()
setupSvelte()
console.log('\n✨ Initial scaffold complete!')
