import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const ROOT_VUE = path.resolve(__dirname, '..')
const storybookFile = path.resolve(ROOT_VUE, 'playground/StorybookView.vue')
const lines = fs.readFileSync(storybookFile, 'utf8').split('\n')

const catalogCode = lines.slice(1077, 5579).join('\n').replace(/^const catalog.*?=\s*/, '')
const catalog = eval(catalogCode)

// Add CrmlDivider to catalog if not present
const buttonsBadges = catalog.find(c => c.name === 'BUTTONS & BADGES')
if (buttonsBadges && !buttonsBadges.items.find(i => i.id === 'CrmlDivider')) {
  buttonsBadges.items.push({
    id: 'CrmlDivider',
    name: 'CrmlDivider',
    category: 'Layout & Divider',
    type: 'Divider',
    desc: 'Solid ink Neubrutalist section divider with optional badge label, icon chip, and solid 2.5px border stroke.',
    icon: '➖',
    badge: 'DIVIDER // SOLID',
    designNotes: 'Provides visual separation between layout sections with strict 0% blur ink borders and customizable label slots.',
    apiData: [
      { prop: 'label', type: 'string', default: 'undefined', desc: 'Center text or section title inside the divider' },
      { prop: 'variant', type: "'lime' | 'pink' | 'cyan' | 'yellow' | 'obsidian'", default: "'obsidian'", desc: 'Color variant of divider border and optional badge' },
      { prop: 'dashed', type: 'boolean', default: 'false', desc: 'Renders dashed ink border instead of solid line' },
      { prop: 'thickness', type: 'string', default: "'2.5px'", desc: 'Border stroke thickness' }
    ],
    slotsData: [
      { slot: 'default', bindings: '{}', desc: 'Custom center badge or content override' }
    ],
    eventsData: []
  })
}

let totalCount = 0
for (const cat of catalog) {
  console.log(`Category: ${cat.name} (${cat.items.length} components)`)
  totalCount += cat.items.length
}
console.log(`Total components: ${totalCount}`)

const outJson = path.resolve(__dirname, 'catalog.json')
fs.writeFileSync(outJson, JSON.stringify(catalog, null, 2), 'utf8')
console.log(`Saved catalog to ${outJson}`)
