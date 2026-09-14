#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { ICON_DEFINITIONS } from './generate-icon-defs.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const ROOT_VUE = path.resolve(__dirname, '..')
const BASE_CODE_DIR = path.resolve(ROOT_VUE, '..')

const TARGETS = {
  react: {
    name: 'crml-ui-react',
    path: path.resolve(BASE_CODE_DIR, 'crml-ui-react'),
    iconsDir: path.resolve(BASE_CODE_DIR, 'crml-ui-react', 'src', 'icons'),
    atomsDir: path.resolve(BASE_CODE_DIR, 'crml-ui-react', 'src', 'components', 'atoms'),
    indexFile: path.resolve(BASE_CODE_DIR, 'crml-ui-react', 'src', 'index.ts')
  },
  svelte: {
    name: 'crml-ui-svelte',
    path: path.resolve(BASE_CODE_DIR, 'crml-ui-svelte'),
    iconsDir: path.resolve(BASE_CODE_DIR, 'crml-ui-svelte', 'src', 'icons'),
    atomsDir: path.resolve(BASE_CODE_DIR, 'crml-ui-svelte', 'src', 'components', 'atoms'),
    indexFile: path.resolve(BASE_CODE_DIR, 'crml-ui-svelte', 'src', 'index.ts')
  },
  html: {
    name: 'crml-ui-html',
    path: path.resolve(BASE_CODE_DIR, 'crml-ui-html'),
    iconsDir: path.resolve(BASE_CODE_DIR, 'crml-ui-html', 'icons'),
    cssDir: path.resolve(BASE_CODE_DIR, 'crml-ui-html', 'css'),
    componentsDir: path.resolve(BASE_CODE_DIR, 'crml-ui-html', 'components', 'atoms')
  }
}

// 1. SYNC ICONS TO REACT
function syncReact() {
  const target = TARGETS.react
  if (!fs.existsSync(target.path)) return

  console.log(`[SYNC ICONS] ⚛️  Syncing to ${target.name}...`)
  fs.mkdirSync(target.iconsDir, { recursive: true })
  fs.mkdirSync(target.atomsDir, { recursive: true })

  // 1.1 Copy types.ts & defs.ts
  const vueTypesFile = path.resolve(ROOT_VUE, 'src', 'icons', 'types.ts')
  const vueDefsFile = path.resolve(ROOT_VUE, 'src', 'icons', 'defs.ts')
  const vueIndexFile = path.resolve(ROOT_VUE, 'src', 'icons', 'index.ts')

  fs.copyFileSync(vueTypesFile, path.resolve(target.iconsDir, 'types.ts'))
  fs.copyFileSync(vueDefsFile, path.resolve(target.iconsDir, 'defs.ts'))
  fs.copyFileSync(vueIndexFile, path.resolve(target.iconsDir, 'index.ts'))

  // 1.2 Generate React CrmlIcon.tsx
  const reactComponentCode = `import React from 'react'
import type { CrmlIconName, CrmlIconSize, CrmlIconVariant } from '../../icons/types'
import { CRML_ICONS } from '../../icons/defs'

export interface CrmlIconProps extends React.SVGAttributes<SVGElement> {
  name: CrmlIconName
  size?: CrmlIconSize
  variant?: CrmlIconVariant
  strokeWidth?: number | string
  spin?: boolean
  title?: string
  className?: string
}

export const CrmlIcon: React.FC<CrmlIconProps> = ({
  name = 'bolt',
  size = 'md',
  variant = 'current',
  strokeWidth = 2.5,
  spin = false,
  title,
  className = '',
  style = {},
  ...props
}) => {
  const iconDef = CRML_ICONS[name] || CRML_ICONS['bolt']

  let sizePixels = '24px'
  if (typeof size === 'number') {
    sizePixels = \`\${size}px\`
  } else {
    switch (size) {
      case 'xs': sizePixels = '16px'; break;
      case 'sm': sizePixels = '20px'; break;
      case 'md': sizePixels = '24px'; break;
      case 'lg': sizePixels = '32px'; break;
      case 'xl': sizePixels = '40px'; break;
      default: sizePixels = '24px';
    }
  }

  let iconColor = 'currentColor'
  switch (variant) {
    case 'lime': iconColor = 'var(--crt-electric-lime, #CCFF00)'; break;
    case 'pink': iconColor = 'var(--crt-hot-pink, #FF007F)'; break;
    case 'cyan': iconColor = 'var(--crt-cyber-cyan, #00F0FF)'; break;
    case 'yellow': iconColor = 'var(--crt-sunburst-yellow, #FFD600)'; break;
    case 'obsidian': iconColor = 'var(--crt-obsidian, #0D0D0D)'; break;
    case 'white': iconColor = 'var(--crt-pure-white, #FFFFFF)'; break;
    case 'ghost': iconColor = 'rgba(13, 13, 13, 0.4)'; break;
    default: iconColor = 'currentColor';
  }

  const combinedStyle: React.CSSProperties = {
    width: sizePixels,
    height: sizePixels,
    color: iconColor,
    display: 'inline-block',
    verticalAlign: 'middle',
    flexShrink: 0,
    userSelect: 'none',
    transition: 'transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.15s ease',
    ...(spin ? { animation: 'crml-spin 1s linear infinite' } : {}),
    ...style
  }

  return (
    <svg
      className={\`crml-icon crml-icon--\${variant} \${spin ? 'crml-icon--spin' : ''} \${className}\`}
      style={combinedStyle}
      viewBox={iconDef.viewBox || '0 0 24 24'}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="square"
      strokeLinejoin="miter"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title || name}
      {...props}
    >
      {title && <title>{title}</title>}
      {iconDef.elements.map((el, idx) => {
        if (!el.tag || el.tag === 'path') {
          return (
            <path
              key={idx}
              d={el.d}
              fill={el.fill || 'none'}
              stroke={el.stroke || 'currentColor'}
              strokeWidth={el.strokeWidth || strokeWidth}
              strokeLinecap={el.strokeLinecap || 'square'}
              strokeLinejoin={el.strokeLinejoin || 'miter'}
            />
          )
        }
        if (el.tag === 'circle') {
          return (
            <circle
              key={idx}
              cx={el.cx}
              cy={el.cy}
              r={el.r}
              fill={el.fill || 'none'}
              stroke={el.stroke || 'currentColor'}
              strokeWidth={el.strokeWidth || strokeWidth}
            />
          )
        }
        if (el.tag === 'ellipse') {
          return (
            <ellipse
              key={idx}
              cx={el.cx}
              cy={el.cy}
              rx={el.rx}
              ry={el.ry}
              fill={el.fill || 'none'}
              stroke={el.stroke || 'currentColor'}
              strokeWidth={el.strokeWidth || strokeWidth}
            />
          )
        }
        if (el.tag === 'rect') {
          return (
            <rect
              key={idx}
              x={el.x}
              y={el.y}
              width={el.width}
              height={el.height}
              rx={el.rx}
              ry={el.ry}
              fill={el.fill || 'none'}
              stroke={el.stroke || 'currentColor'}
              strokeWidth={el.strokeWidth || strokeWidth}
            />
          )
        }
        if (el.tag === 'line') {
          return (
            <line
              key={idx}
              x1={el.x1}
              y1={el.y1}
              x2={el.x2}
              y2={el.y2}
              stroke={el.stroke || 'currentColor'}
              strokeWidth={el.strokeWidth || strokeWidth}
              strokeLinecap={el.strokeLinecap || 'square'}
            />
          )
        }
        if (el.tag === 'polyline') {
          return (
            <polyline
              key={idx}
              points={el.points}
              fill={el.fill || 'none'}
              stroke={el.stroke || 'currentColor'}
              strokeWidth={el.strokeWidth || strokeWidth}
              strokeLinecap={el.strokeLinecap || 'square'}
              strokeLinejoin={el.strokeLinejoin || 'miter'}
            />
          )
        }
        if (el.tag === 'polygon') {
          return (
            <polygon
              key={idx}
              points={el.points}
              fill={el.fill || 'none'}
              stroke={el.stroke || 'currentColor'}
              strokeWidth={el.strokeWidth || strokeWidth}
              strokeLinecap={el.strokeLinecap || 'square'}
              strokeLinejoin={el.strokeLinejoin || 'miter'}
            />
          )
        }
        return null
      })}
    </svg>
  )
}

export default CrmlIcon
`
  fs.writeFileSync(path.resolve(target.atomsDir, 'CrmlIcon.tsx'), reactComponentCode, 'utf8')

  // 1.3 Ensure exported from crml-ui-react/src/index.ts
  let indexContent = fs.readFileSync(target.indexFile, 'utf8')
  if (!indexContent.includes('./components/atoms/CrmlIcon')) {
    indexContent = `export * from './components/atoms/CrmlIcon'\nexport * from './icons'\n` + indexContent
    fs.writeFileSync(target.indexFile, indexContent, 'utf8')
  }

  console.log(`  ✅ Synced React CrmlIcon component and 112 icon defs`)
}

// 2. SYNC ICONS TO SVELTE
function syncSvelte() {
  const target = TARGETS.svelte
  if (!fs.existsSync(target.path)) return

  console.log(`[SYNC ICONS] 🧡 Syncing to ${target.name}...`)
  fs.mkdirSync(target.iconsDir, { recursive: true })
  fs.mkdirSync(target.atomsDir, { recursive: true })

  // 2.1 Copy types.ts & defs.ts
  const vueTypesFile = path.resolve(ROOT_VUE, 'src', 'icons', 'types.ts')
  const vueDefsFile = path.resolve(ROOT_VUE, 'src', 'icons', 'defs.ts')
  const vueIndexFile = path.resolve(ROOT_VUE, 'src', 'icons', 'index.ts')

  fs.copyFileSync(vueTypesFile, path.resolve(target.iconsDir, 'types.ts'))
  fs.copyFileSync(vueDefsFile, path.resolve(target.iconsDir, 'defs.ts'))
  fs.copyFileSync(vueIndexFile, path.resolve(target.iconsDir, 'index.ts'))

  // 2.2 Generate Svelte CrmlIcon.svelte
  const svelteComponentCode = `<script lang="ts">
  import type { CrmlIconName, CrmlIconSize, CrmlIconVariant } from '../../icons/types'
  import { CRML_ICONS } from '../../icons/defs'

  export let name: CrmlIconName = 'bolt'
  export let size: CrmlIconSize = 'md'
  export let variant: CrmlIconVariant = 'current'
  export let strokeWidth: number | string = 2.5
  export let spin: boolean = false
  export let title: string = ''

  $: iconDef = CRML_ICONS[name] || CRML_ICONS['bolt']

  $: sizePixels = (() => {
    if (typeof size === 'number') return \`\${size}px\`
    switch (size) {
      case 'xs': return '16px'
      case 'sm': return '20px'
      case 'md': return '24px'
      case 'lg': return '32px'
      case 'xl': return '40px'
      default: return '24px'
    }
  })()

  $: iconColor = (() => {
    switch (variant) {
      case 'lime': return 'var(--crt-electric-lime, #CCFF00)'
      case 'pink': return 'var(--crt-hot-pink, #FF007F)'
      case 'cyan': return 'var(--crt-cyber-cyan, #00F0FF)'
      case 'yellow': return 'var(--crt-sunburst-yellow, #FFD600)'
      case 'obsidian': return 'var(--crt-obsidian, #0D0D0D)'
      case 'white': return 'var(--crt-pure-white, #FFFFFF)'
      case 'ghost': return 'rgba(13, 13, 13, 0.4)'
      default: return 'currentColor'
    }
  })()
</script>

<svg
  class="crml-icon crml-icon--{variant} {spin ? 'crml-icon--spin' : ''} {$$props.class || ''}"
  style="width: {sizePixels}; height: {sizePixels}; color: {iconColor}; {$$props.style || ''}"
  viewBox={iconDef.viewBox || '0 0 24 24'}
  fill="none"
  stroke="currentColor"
  stroke-width={strokeWidth}
  stroke-linecap="square"
  stroke-linejoin="miter"
  xmlns="http://www.w3.org/2000/svg"
  role="img"
  aria-label={title || name}
  on:click
>
  {#if title}
    <title>{title}</title>
  {/if}
  {#each iconDef.elements as el}
    {#if !el.tag || el.tag === 'path'}
      <path
        d={el.d}
        fill={el.fill || 'none'}
        stroke={el.stroke || 'currentColor'}
        stroke-width={el.strokeWidth || strokeWidth}
        stroke-linecap={el.strokeLinecap || 'square'}
        stroke-linejoin={el.strokeLinejoin || 'miter'}
      />
    {:else if el.tag === 'circle'}
      <circle
        cx={el.cx}
        cy={el.cy}
        r={el.r}
        fill={el.fill || 'none'}
        stroke={el.stroke || 'currentColor'}
        stroke-width={el.strokeWidth || strokeWidth}
      />
    {:else if el.tag === 'ellipse'}
      <ellipse
        cx={el.cx}
        cy={el.cy}
        rx={el.rx}
        ry={el.ry}
        fill={el.fill || 'none'}
        stroke={el.stroke || 'currentColor'}
        stroke-width={el.strokeWidth || strokeWidth}
      />
    {:else if el.tag === 'rect'}
      <rect
        x={el.x}
        y={el.y}
        width={el.width}
        height={el.height}
        rx={el.rx}
        ry={el.ry}
        fill={el.fill || 'none'}
        stroke={el.stroke || 'currentColor'}
        stroke-width={el.strokeWidth || strokeWidth}
      />
    {:else if el.tag === 'line'}
      <line
        x1={el.x1}
        y1={el.y1}
        x2={el.x2}
        y2={el.y2}
        stroke={el.stroke || 'currentColor'}
        stroke-width={el.strokeWidth || strokeWidth}
        stroke-linecap={el.strokeLinecap || 'square'}
      />
    {:else if el.tag === 'polyline'}
      <polyline
        points={el.points}
        fill={el.fill || 'none'}
        stroke={el.stroke || 'currentColor'}
        stroke-width={el.strokeWidth || strokeWidth}
        stroke-linecap={el.strokeLinecap || 'square'}
        stroke-linejoin={el.strokeLinejoin || 'miter'}
      />
    {:else if el.tag === 'polygon'}
      <polygon
        points={el.points}
        fill={el.fill || 'none'}
        stroke={el.stroke || 'currentColor'}
        stroke-width={el.strokeWidth || strokeWidth}
        stroke-linecap={el.strokeLinecap || 'square'}
        stroke-linejoin={el.strokeLinejoin || 'miter'}
      />
    {/if}
  {/each}
</svg>

<style>
  .crml-icon {
    display: inline-block;
    vertical-align: middle;
    flex-shrink: 0;
    user-select: none;
    transition: transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.15s ease;
  }

  :global(.crml-icon--spin) {
    animation: crml-spin 1s linear infinite;
  }

  @keyframes crml-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
`
  fs.writeFileSync(path.resolve(target.atomsDir, 'CrmlIcon.svelte'), svelteComponentCode, 'utf8')

  // 2.3 Ensure exported from crml-ui-svelte/src/index.ts
  let indexContent = fs.readFileSync(target.indexFile, 'utf8')
  if (!indexContent.includes('CrmlIcon')) {
    indexContent = `export { default as CrmlIcon } from './components/atoms/CrmlIcon.svelte'\nexport * from './icons'\n` + indexContent
    fs.writeFileSync(target.indexFile, indexContent, 'utf8')
  }

  console.log(`  ✅ Synced Svelte CrmlIcon component and 112 icon defs`)
}

// 3. SYNC ICONS TO HTML5 (Raw SVG files & CSS classes)
function syncHtml() {
  const target = TARGETS.html
  if (!fs.existsSync(target.path)) return

  console.log(`[SYNC ICONS] 🌐 Syncing to ${target.name}...`)
  fs.mkdirSync(target.iconsDir, { recursive: true })
  fs.mkdirSync(target.cssDir, { recursive: true })
  fs.mkdirSync(target.componentsDir, { recursive: true })

  // 3.1 Export each icon to an SVG file
  let count = 0
  for (const def of ICON_DEFINITIONS) {
    const svgElements = def.elements.map(el => {
      const tag = el.tag || 'path'
      const attrs = Object.entries(el)
        .filter(([k]) => k !== 'tag')
        .map(([k, v]) => {
          // Convert camelCase attribute to kebab-case for raw SVG
          const attrName = k.replace(/([A-Z])/g, '-$1').toLowerCase()
          return `${attrName}="${v}"`
        })
        .join(' ')
      return `  <${tag} ${attrs} />`
    }).join('\n')

    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square" stroke-linejoin="miter">\n${svgElements}\n</svg>\n`
    fs.writeFileSync(path.resolve(target.iconsDir, `${def.name}.svg`), svgContent, 'utf8')
    count++
  }

  // 3.2 Generate crml-icons.css
  const cssContent = `/* CRML-UI BESPOKE ICON SUITE (${count} ICONS) */
.crml-icon {
  display: inline-block;
  vertical-align: middle;
  width: 24px;
  height: 24px;
  stroke-width: 2.5px;
  stroke: currentColor;
  stroke-linecap: square;
  stroke-linejoin: miter;
  fill: none;
  flex-shrink: 0;
  transition: transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.15s ease;
}

.crml-icon--xs { width: 16px; height: 16px; }
.crml-icon--sm { width: 20px; height: 20px; }
.crml-icon--md { width: 24px; height: 24px; }
.crml-icon--lg { width: 32px; height: 32px; }
.crml-icon--xl { width: 40px; height: 40px; }

.crml-icon--lime { color: var(--crt-electric-lime, #CCFF00); }
.crml-icon--pink { color: var(--crt-hot-pink, #FF007F); }
.crml-icon--cyan { color: var(--crt-cyber-cyan, #00F0FF); }
.crml-icon--yellow { color: var(--crt-sunburst-yellow, #FFD600); }
.crml-icon--obsidian { color: var(--crt-obsidian, #0D0D0D); }
.crml-icon--white { color: var(--crt-pure-white, #FFFFFF); }

.crml-icon--spin {
  animation: crml-spin 1s linear infinite;
}

@keyframes crml-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
`
  fs.writeFileSync(path.resolve(target.cssDir, 'crml-icons.css'), cssContent, 'utf8')

  console.log(`  ✅ Generated ${count} raw SVGs in ${target.iconsDir} and css/crml-icons.css`)
}

// RUN ALL
console.log('\n======================================================')
console.log('⚡ CRML-UI BESPOKE ICON SUITE SYNCHRONIZER ⚡')
console.log(`Total Icons: ${ICON_DEFINITIONS.length}`)
console.log('======================================================\n')

syncReact()
syncSvelte()
syncHtml()

console.log('\n✨ All frameworks successfully synchronized with 112 bespoke icons!\n')
