#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const ROOT_VUE = path.resolve(__dirname, '..')
const BASE_CODE_DIR = path.resolve(ROOT_VUE, '..')

export const TARGETS = {
  react: {
    name: 'crml-ui-react',
    path: path.resolve(BASE_CODE_DIR, 'crml-ui-react'),
    tokensPath: path.resolve(BASE_CODE_DIR, 'crml-ui-react', 'src', 'tokens'),
    componentsPath: path.resolve(BASE_CODE_DIR, 'crml-ui-react', 'src', 'components'),
    ext: '.tsx'
  },
  html: {
    name: 'crml-ui-html',
    path: path.resolve(BASE_CODE_DIR, 'crml-ui-html'),
    tokensPath: path.resolve(BASE_CODE_DIR, 'crml-ui-html', 'css', 'tokens'),
    componentsPath: path.resolve(BASE_CODE_DIR, 'crml-ui-html', 'components'),
    ext: '.html'
  },
  svelte: {
    name: 'crml-ui-svelte',
    path: path.resolve(BASE_CODE_DIR, 'crml-ui-svelte'),
    tokensPath: path.resolve(BASE_CODE_DIR, 'crml-ui-svelte', 'src', 'tokens'),
    componentsPath: path.resolve(BASE_CODE_DIR, 'crml-ui-svelte', 'src', 'components'),
    ext: '.svelte'
  }
}

// 1. SYNC TOKENS
export function syncTokens() {
  console.log('\n[CRML SYNC] 📦 Synchronizing Design Tokens across frameworks...')
  const sourceTokensDir = path.resolve(ROOT_VUE, 'src', 'tokens')
  if (!fs.existsSync(sourceTokensDir)) {
    console.error(`❌ Source tokens directory not found at ${sourceTokensDir}`)
    return
  }

  const tokenFiles = fs.readdirSync(sourceTokensDir).filter(f => f.endsWith('.css'))

  for (const [key, target] of Object.entries(TARGETS)) {
    if (!fs.existsSync(target.path)) {
      console.warn(`⚠️ Target project ${target.name} does not exist at ${target.path}. Skipping tokens.`)
      continue
    }

    fs.mkdirSync(target.tokensPath, { recursive: true })
    for (const file of tokenFiles) {
      const srcFile = path.resolve(sourceTokensDir, file)
      const destFile = path.resolve(target.tokensPath, file)
      fs.copyFileSync(srcFile, destFile)
    }
    console.log(`  ✅ Synced ${tokenFiles.length} token files -> ${target.name} (${path.relative(BASE_CODE_DIR, target.tokensPath)})`)
  }
}

// 2. DISCOVER VUE COMPONENTS
export function getVueComponents() {
  const compDir = path.resolve(ROOT_VUE, 'src', 'components')
  const categories = ['atoms', 'molecules', 'organisms']
  const components = []

  for (const cat of categories) {
    const dir = path.resolve(compDir, cat)
    if (!fs.existsSync(dir)) continue

    function scanDir(currentPath, subPrefix = '') {
      const entries = fs.readdirSync(currentPath, { withFileTypes: true })
      for (const entry of entries) {
        if (entry.isDirectory()) {
          scanDir(path.resolve(currentPath, entry.name), `${subPrefix}${entry.name}/`)
        } else if (entry.isFile() && entry.name.endsWith('.vue')) {
          const name = entry.name.replace('.vue', '')
          components.push({
            id: name,
            category: cat,
            subDir: subPrefix,
            vueFile: path.relative(compDir, path.resolve(currentPath, entry.name))
          })
        }
      }
    }
    scanDir(dir)
  }

  return components
}

// 3. CHECK COMPONENT PARITY MATRIX
export function checkParity() {
  const vueComps = getVueComponents()
  console.log(`\n[CRML SYNC] 📊 Scanning Parity for ${vueComps.length} Master Components...\n`)

  const matrix = []

  for (const comp of vueComps) {
    const row = {
      id: comp.id,
      category: comp.category,
      vue: true,
      react: false,
      svelte: false,
      html: false
    }

    // Check React
    if (fs.existsSync(TARGETS.react.componentsPath)) {
      const reactCandidates = [
        path.resolve(TARGETS.react.componentsPath, comp.category, `${comp.id}.tsx`),
        path.resolve(TARGETS.react.componentsPath, comp.category, comp.subDir, `${comp.id}.tsx`),
        path.resolve(TARGETS.react.componentsPath, `${comp.id}.tsx`)
      ]
      row.react = reactCandidates.some(p => fs.existsSync(p))
    }

    // Check Svelte
    if (fs.existsSync(TARGETS.svelte.componentsPath)) {
      const svelteCandidates = [
        path.resolve(TARGETS.svelte.componentsPath, comp.category, `${comp.id}.svelte`),
        path.resolve(TARGETS.svelte.componentsPath, comp.category, comp.subDir, `${comp.id}.svelte`),
        path.resolve(TARGETS.svelte.componentsPath, `${comp.id}.svelte`)
      ]
      row.svelte = svelteCandidates.some(p => fs.existsSync(p))
    }

    // Check HTML
    if (fs.existsSync(TARGETS.html.componentsPath)) {
      const htmlCandidates = [
        path.resolve(TARGETS.html.componentsPath, `${comp.id}.html`),
        path.resolve(TARGETS.html.componentsPath, comp.category, `${comp.id}.html`)
      ]
      row.html = htmlCandidates.some(p => fs.existsSync(p))
    }

    matrix.push(row)
  }

  // Save matrix to JSON
  const matrixFile = path.resolve(__dirname, 'component-matrix.json')
  fs.writeFileSync(matrixFile, JSON.stringify(matrix, null, 2), 'utf-8')

  // Print Summary Table
  console.log('┌──────────────────────────────────────┬──────────┬──────────┬──────────┬──────────┐')
  console.log('│ COMPONENT NAME                       │ VUE 3    │ REACT    │ SVELTE   │ HTML5    │')
  console.log('├──────────────────────────────────────┼──────────┼──────────┼──────────┼──────────┤')

  let reactCount = 0
  let svelteCount = 0
  let htmlCount = 0

  for (const r of matrix.slice(0, 20)) {
    if (r.react) reactCount++
    if (r.svelte) svelteCount++
    if (r.html) htmlCount++
    const id = r.id.padEnd(36, ' ')
    const v = (r.vue ? '  ✅   ' : '  ❌   ')
    const rc = (r.react ? '  ✅   ' : '  ❌   ')
    const sv = (r.svelte ? '  ✅   ' : '  ❌   ')
    const ht = (r.html ? '  ✅   ' : '  ❌   ')
    console.log(`│ ${id} │ ${v} │ ${rc} │ ${sv} │ ${ht} │`)
  }

  const remaining = matrix.slice(20)
  for (const r of remaining) {
    if (r.react) reactCount++
    if (r.svelte) svelteCount++
    if (r.html) htmlCount++
  }

  if (remaining.length > 0) {
    console.log(`│ ... and ${remaining.length} more components                        │          │          │          │          │`)
  }

  console.log('├──────────────────────────────────────┼──────────┼──────────┼──────────┼──────────┤')
  console.log(`│ TOTAL PARITY SUMMARY                 │ ${String(vueComps.length).padStart(2, ' ')} / ${vueComps.length} │ ${String(reactCount).padStart(2, ' ')} / ${vueComps.length} │ ${String(svelteCount).padStart(2, ' ')} / ${vueComps.length} │ ${String(htmlCount).padStart(2, ' ')} / ${vueComps.length} │`)
  console.log('└──────────────────────────────────────┴──────────┴──────────┴──────────┴──────────┘')
  console.log(`Matrix saved to ${path.relative(ROOT_VUE, matrixFile)}\n`)

  return matrix
}

// 4. AUTO-SCAFFOLD MISSING COMPONENTS FOR 100% PARITY
export function scaffoldMissingComponents() {
  const vueComps = getVueComponents()
  console.log(`\n[CRML SYNC] 🛠️ Auto-scaffolding missing components across React, Svelte, and HTML...`)

  let newReact = 0
  let newSvelte = 0
  let newHtml = 0

  for (const comp of vueComps) {
    // 4.1 React Scaffolding
    const reactFile = path.resolve(TARGETS.react.componentsPath, comp.category, `${comp.id}.tsx`)
    if (!fs.existsSync(reactFile)) {
      ensureDir(path.dirname(reactFile))
      const reactCode = `import React from 'react'
import '../../crml-react.css'

export interface ${comp.id}Props extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'lime' | 'pink' | 'cyan' | 'yellow' | 'primary' | 'danger' | 'secondary' | 'warning' | 'outline' | 'obsidian'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  label?: string
  children?: React.ReactNode
  className?: string
}

export const ${comp.id}: React.FC<${comp.id}Props> = ({
  variant = 'lime',
  size = 'md',
  disabled = false,
  label,
  children,
  className = '',
  ...props
}) => {
  return (
    <div
      className={\`crml-${comp.id.replace('Crml', '').toLowerCase()} variant-\${variant} size-\${size} \${className}\`}
      style={{ opacity: disabled ? 0.5 : 1, pointerEvents: disabled ? 'none' : 'auto' }}
      {...props}
    >
      {label && <span className="crml-label">{label}</span>}
      {children}
    </div>
  )
}
`
      fs.writeFileSync(reactFile, reactCode, 'utf-8')
      newReact++
    }

    // 4.2 Svelte Scaffolding
    const svelteFile = path.resolve(TARGETS.svelte.componentsPath, comp.category, `${comp.id}.svelte`)
    if (!fs.existsSync(svelteFile)) {
      ensureDir(path.dirname(svelteFile))
      const svelteCode = `<script lang="ts">
  export let variant: 'lime' | 'pink' | 'cyan' | 'yellow' | 'primary' | 'secondary' | 'outline' = 'lime';
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let disabled: boolean = false;
  export let label: string = '';
</script>

<div
  class="crml-${comp.id.replace('Crml', '').toLowerCase()} variant-{variant} size-{size}"
  class:disabled
  on:click
>
  {#if label}
    <span class="crml-label">{label}</span>
  {/if}
  <slot />
</div>

<style>
  @import '../../tokens/index.css';
  div {
    display: inline-flex;
    align-items: center;
    box-sizing: border-box;
  }
  .disabled {
    opacity: 0.5;
    pointer-events: none;
  }
</style>
`
      fs.writeFileSync(svelteFile, svelteCode, 'utf-8')
      newSvelte++
    }

    // 4.3 HTML Snippet Scaffolding
    const htmlFile = path.resolve(TARGETS.html.componentsPath, comp.category, `${comp.id}.html`)
    if (!fs.existsSync(htmlFile)) {
      ensureDir(path.dirname(htmlFile))
      const htmlSnippet = `<!-- ${comp.id} (Neubrutalism Component Template) -->
<div class="crml-${comp.id.replace('Crml', '').toLowerCase()} variant-lime size-md" data-crml="${comp.id}">
  <span class="crml-label">${comp.id.replace('Crml', '')}</span>
</div>
`
      fs.writeFileSync(htmlFile, htmlSnippet, 'utf-8')
      newHtml++
    }
  }

  // Update React src/index.ts barrel exports
  const reactExports = vueComps.map(c => `export * from './components/${c.category}/${c.id}'`).join('\n')
  fs.writeFileSync(path.resolve(TARGETS.react.path, 'src', 'index.ts'), `${reactExports}\n`, 'utf-8')

  // Update Svelte src/index.ts barrel exports
  const svelteExports = vueComps.map(c => `export { default as ${c.id} } from './components/${c.category}/${c.id}.svelte'`).join('\n')
  fs.writeFileSync(path.resolve(TARGETS.svelte.path, 'src', 'index.ts'), `${svelteExports}\n`, 'utf-8')

  console.log(`  🎉 Auto-scaffolded:`)
  console.log(`     - React:  +${newReact} components`)
  console.log(`     - Svelte: +${newSvelte} components`)
  console.log(`     - HTML:   +${newHtml} snippets`)
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

// 5. MAIN CLI HANDLER
const arg = process.argv[2] || '--all'

if (arg === '--tokens') {
  syncTokens()
} else if (arg === '--check') {
  checkParity()
} else if (arg === '--scaffold') {
  scaffoldMissingComponents()
  checkParity()
} else {
  syncTokens()
  scaffoldMissingComponents()
  checkParity()
}
