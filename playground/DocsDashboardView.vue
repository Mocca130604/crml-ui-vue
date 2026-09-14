<template>
  <div class="docs-dashboard font-mono">
    <!-- Top Bar Navigation -->
    <header class="docs-header">
      <div class="header-branding">
        <div class="badge-cluster">
          <CrmlStickerBadge variant="pink" tilt="none" star>ECOSYSTEM v5.5</CrmlStickerBadge>
          <CrmlBadge variant="cyan" class="font-mono">70 PRIMITIVES</CrmlBadge>
          <CrmlBadge variant="lime" class="font-mono">100% PARITY</CrmlBadge>
          <CrmlBadge variant="obsidian" class="font-mono">0% BLUR</CrmlBadge>
        </div>
        <h1 class="docs-main-title font-heading">
          CRML - UI <span class="title-highlight">MULTI-FRAMEWORK DOCUMENTATION HUB</span>
        </h1>
        <p class="docs-sub-desc">
          Definitive Tactile Neubrutalism & Cyber Mecha Design System with synchronized parity across Vue 3, React 18/19, Svelte 5, and Vanilla HTML5.
        </p>
      </div>

      <div class="header-nav-actions">
        <CrmlBouncyButton variant="lime" size="sm" @click="$emit('switch-view', 'playground')">
          ⚡ BACK TO PLAYGROUND
        </CrmlBouncyButton>
        <CrmlBouncyButton variant="cyan" size="sm" @click="$emit('switch-view', 'storybook')">
          📖 STORYBOOK EXPLORER
        </CrmlBouncyButton>
      </div>
    </header>

    <!-- Framework Selector Command Banner (Sticky) -->
    <section class="framework-selector-section">
      <div class="framework-bar-card">
        <div class="selector-label-col">
          <span class="selector-prompt">// SELECT ACTIVE TARGET FRAMEWORK:</span>
          <h2 class="active-fw-heading font-heading">
            CURRENT VIEW: <span class="active-fw-badge">{{ currentFramework.toUpperCase() }}</span>
          </h2>
        </div>

        <div class="framework-pills-row">
          <button
            v-for="fw in frameworks"
            :key="fw.id"
            class="fw-pill-btn font-mono"
            :class="{ active: currentFramework === fw.id }"
            @click="currentFramework = fw.id"
          >
            <span class="fw-icon">{{ fw.icon }}</span>
            <span class="fw-name font-heading">{{ fw.name }}</span>
            <span class="fw-status-dot">● {{ fw.version }}</span>
          </button>
        </div>

        <!-- Quick Install Snippet Box -->
        <div class="install-bar font-mono">
          <span class="install-label">INSTALL COMMAND:</span>
          <code class="install-code">{{ currentInstallCommand }}</code>
          <CrmlBouncyButton
            variant="lime"
            size="sm"
            @click="copyToClipboard(currentInstallCommand, 'install')"
          >
            {{ copiedTarget === 'install' ? '✓ COPIED!' : '📋 COPY COMMAND' }}
          </CrmlBouncyButton>
        </div>
      </div>
    </section>

    <!-- Main Content Container -->
    <main class="docs-main-container">
      <!-- Section 1: Framework Specific Overview Card -->
      <section class="fw-overview-section">
        <div class="overview-grid">
          <!-- Overview Card -->
          <div class="doc-card overview-card">
            <div class="card-header font-heading">
              <span>// 01. {{ activeFwMeta.name }} INTEGRATION SPECS</span>
              <CrmlBadge :variant="activeFwMeta.badgeVariant">{{ activeFwMeta.repoDir }}</CrmlBadge>
            </div>
            <div class="card-body">
              <h3 class="font-heading overview-title">{{ activeFwMeta.tagline }}</h3>
              <p class="overview-p">{{ activeFwMeta.description }}</p>

              <div class="spec-metrics-grid">
                <div class="spec-metric-box">
                  <span class="metric-label">PARITY COVERAGE</span>
                  <span class="metric-value font-heading">70 / 70</span>
                  <span class="metric-sub font-mono">100% Component Parity</span>
                </div>
                <div class="spec-metric-box">
                  <span class="metric-label">PHYSICS PROFILE</span>
                  <span class="metric-value font-heading">3px REBOUND</span>
                  <span class="metric-sub font-mono">Spring Elastic Curve</span>
                </div>
                <div class="spec-metric-box">
                  <span class="metric-label">SHADOW BLUR</span>
                  <span class="metric-value font-heading">0% AMBIENT</span>
                  <span class="metric-sub font-mono">Hard Ink Offset Only</span>
                </div>
                <div class="spec-metric-box">
                  <span class="metric-label">LOCAL PATH</span>
                  <span class="metric-value font-heading font-mono" style="font-size: 0.95rem;">{{ activeFwMeta.localPath }}</span>
                  <span class="metric-sub font-mono">Parallel Workspace</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Setup Code Card -->
          <div class="doc-card setup-card">
            <div class="card-header font-heading">
              <span>// 02. QUICKSTART & ROOT CONFIG</span>
              <button
                class="mini-copy-btn font-mono"
                @click="copyToClipboard(activeFwMeta.quickSetupCode, 'setup')"
              >
                {{ copiedTarget === 'setup' ? '✓ COPIED' : '📋 COPY' }}
              </button>
            </div>
            <div class="card-body">
              <CrmlCodeBlock :code="activeFwMeta.quickSetupCode" :title="activeFwMeta.setupFile" />
            </div>
          </div>
        </div>
      </section>

      <!-- Section 2: Interactive Component Sandbox & Cross-Framework Code Generator -->
      <section class="component-demo-section">
        <div class="section-title-bar">
          <CrmlStickerBadge variant="lime" tilt="none" star>LIVE SANDBOX</CrmlStickerBadge>
          <h2 class="font-heading section-title">
            INTERACTIVE DEMO & DYNAMIC CODE GENERATOR
          </h2>
          <span class="section-tag font-mono">// SWITCHES AUTOMATICALLY TO {{ currentFramework.toUpperCase() }} SYNTAX</span>
        </div>

        <div class="sandbox-workspace-card doc-card">
          <!-- Sandbox Controls Bar -->
          <div class="sandbox-controls-row">
            <div class="ctrl-group">
              <label class="ctrl-label">SELECT PRIMITIVE:</label>
              <CrmlSegmentedControl
                v-model="selectedDemoComp"
                :options="demoCompOptions"
                variant="lime"
              />
            </div>

            <div class="ctrl-group">
              <label class="ctrl-label">COLOR VARIANT:</label>
              <CrmlSegmentedControl
                v-model="demoVariant"
                :options="demoVariantOptions"
                variant="pink"
              />
            </div>

            <div class="ctrl-group">
              <label class="ctrl-label">SIZE:</label>
              <CrmlSegmentedControl
                v-model="demoSize"
                :options="demoSizeOptions"
                variant="cyan"
              />
            </div>

            <div class="ctrl-group">
              <label class="ctrl-label">STATE:</label>
              <CrmlNeonSwitch v-model="demoDisabled" label="DISABLED" />
            </div>
          </div>

          <!-- Split Preview & Code -->
          <div class="sandbox-split-grid">
            <!-- Left: Live Render Canvas -->
            <div class="live-render-box">
              <div class="box-top-bar font-mono">
                <span>CANVAS // {{ selectedDemoComp }}</span>
                <span class="status-live">● LIVE INTERACTIVE</span>
              </div>

              <div class="canvas-center">
                <!-- CrmlBouncyButton -->
                <template v-if="selectedDemoComp === 'CrmlBouncyButton'">
                  <CrmlBouncyButton
                    :variant="demoVariant"
                    :size="demoSize"
                    :disabled="demoDisabled"
                    @click="clickCount++"
                  >
                    ⚡ TACTILE BOUNCE ({{ clickCount }})
                  </CrmlBouncyButton>
                </template>

                <!-- CrmlButton -->
                <template v-else-if="selectedDemoComp === 'CrmlButton'">
                  <CrmlButton
                    :variant="demoVariant === 'lime' ? 'primary' : (demoVariant === 'pink' ? 'danger' : 'secondary')"
                    :size="demoSize"
                    :disabled="demoDisabled"
                  >
                    NEUBRUTAL BUTTON
                  </CrmlButton>
                </template>

                <!-- CrmlBadge -->
                <template v-else-if="selectedDemoComp === 'CrmlBadge'">
                  <CrmlBadge :variant="demoVariant === 'lime' ? 'success' : (demoVariant === 'pink' ? 'danger' : 'primary')" :size="demoSize === 'lg' ? 'md' : demoSize">
                    SYSTEM STATUS // ACTIVE
                  </CrmlBadge>
                </template>

                <!-- CrmlStickerBadge -->
                <template v-else-if="selectedDemoComp === 'CrmlStickerBadge'">
                  <CrmlStickerBadge :variant="demoVariant" star tilt="right">
                    HOT CYBER DROP ✦
                  </CrmlStickerBadge>
                </template>

                <!-- CrmlInput -->
                <template v-else-if="selectedDemoComp === 'CrmlInput'">
                  <div style="width: 100%; max-width: 320px;">
                    <CrmlInput
                      v-model="demoInputVal"
                      label="PILOT CALLSIGN"
                      :variant="demoVariant"
                      :disabled="demoDisabled"
                      placeholder="@cyber_pilot"
                    />
                  </div>
                </template>

                <!-- CrmlNeonSwitch -->
                <template v-else-if="selectedDemoComp === 'CrmlNeonSwitch'">
                  <CrmlNeonSwitch
                    v-model="demoSwitchVal"
                    label="NEON OVERDRIVE HYPERMODE"
                    :variant="demoVariant"
                    :disabled="demoDisabled"
                  />
                </template>

                <!-- CrmlDualRangeSlider -->
                <template v-else-if="selectedDemoComp === 'CrmlDualRangeSlider'">
                  <div style="width: 100%; max-width: 380px;">
                    <CrmlDualRangeSlider
                      v-model:min="demoSliderMin"
                      v-model:max="demoSliderMax"
                      :min-limit="0"
                      :max-limit="1000"
                      :variant="demoVariant"
                      prefix="$"
                      label="PRICE FILTER ($0 - $1,000)"
                    />
                  </div>
                </template>

                <!-- CrmlCard -->
                <template v-else-if="selectedDemoComp === 'CrmlCard'">
                  <div style="width: 100%; max-width: 360px;">
                    <CrmlCard title="TACTILE MISSION CRATE" badge="LOCKED" :variant="demoVariant">
                      <p style="margin: 0; font-size: 0.85rem;">
                        Synthesizing 70 tactile primitives across Vue 3, React, Svelte, and HTML5 with 0% ambient blur.
                      </p>
                    </CrmlCard>
                  </div>
                </template>
              </div>
            </div>

            <!-- Right: Dynamic Framework Code Snippet -->
            <div class="code-generator-box">
              <div class="box-top-bar font-mono">
                <span>{{ currentFramework.toUpperCase() }} SNIPPET // {{ selectedDemoComp }}</span>
                <button
                  class="mini-copy-btn font-mono"
                  @click="copyToClipboard(generatedFrameworkCode, 'compCode')"
                >
                  {{ copiedTarget === 'compCode' ? '✓ COPIED' : '📋 COPY SNIPPET' }}
                </button>
              </div>
              <CrmlCodeBlock
                :code="generatedFrameworkCode"
                :title="`${selectedDemoComp}.${activeFwMeta.ext}`"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Section 3: Design Tokens Architecture Reference -->
      <section class="tokens-ref-section">
        <div class="section-title-bar">
          <CrmlStickerBadge variant="cyan" tilt="none" star>DESIGN TOKENS</CrmlStickerBadge>
          <h2 class="font-heading section-title">
            UNIVERSAL CSS TOKEN SPECIFICATION
          </h2>
          <span class="section-tag font-mono">// IDENTICAL CSS VARIABLES IN ALL 4 FRAMEWORKS</span>
        </div>

        <div class="tokens-palette-grid">
          <div
            v-for="tok in tokenPalette"
            :key="tok.name"
            class="token-card font-mono"
            @click="copyToClipboard(tok.hex, tok.name)"
          >
            <div class="color-swatch-box" :style="{ backgroundColor: tok.hex }">
              <span class="token-name-badge">{{ tok.name }}</span>
            </div>
            <div class="token-details-row">
              <span class="token-var font-mono">{{ tok.cssVar }}</span>
              <span class="token-hex font-mono">{{ tok.hex }}</span>
            </div>
            <p class="token-desc">{{ tok.desc }}</p>
          </div>
        </div>
      </section>

      <!-- Section 4: Cross-Framework Synchronization Engine & Architecture -->
      <section class="sync-engine-section">
        <div class="section-title-bar">
          <CrmlStickerBadge variant="pink" tilt="none" star>SYNC PROTOCOL</CrmlStickerBadge>
          <h2 class="font-heading section-title">
            CROSS-FRAMEWORK SYNCHRONIZATION WORKFLOW
          </h2>
          <span class="section-tag font-mono">// AUTOMATED ZERO-LAG PARITY ENGINE</span>
        </div>

        <div class="sync-grid doc-card">
          <div class="sync-explanation-col">
            <h3 class="font-heading sync-heading">HOW THE MULTI-REPO SYNC OPERATES</h3>
            <p class="sync-p">
              All four implementations reside as parallel repositories in <code class="inline-code font-mono">C:\Code</code>.
              When a component is modified or created in the master Vue repository (<code class="inline-code font-mono">crml-ui</code>),
              the automated synchronization engine synchronizes design tokens, verifies props and class parity, and auto-scaffolds the matching
              code into React, Svelte, and HTML.
            </p>

            <div class="sync-commands-box">
              <h4 class="font-heading command-box-title">TERMINAL ORCHESTRATION COMMANDS:</h4>
              <div class="command-item" v-for="cmd in syncCommands" :key="cmd.command">
                <div class="command-row font-mono">
                  <code class="cmd-text">{{ cmd.command }}</code>
                  <button class="mini-copy-btn font-mono" @click="copyToClipboard(cmd.command, cmd.command)">
                    📋 COPY
                  </button>
                </div>
                <p class="cmd-desc font-mono">{{ cmd.desc }}</p>
              </div>
            </div>
          </div>

          <div class="sync-architecture-col">
            <div class="architecture-diagram font-mono">
              <div class="diagram-node master-node">
                <span class="node-badge">MASTER SPEC</span>
                <span class="node-title font-heading">crml-ui (Vue 3)</span>
                <span class="node-sub">70 Primitives • Master Tokens</span>
              </div>

              <div class="diagram-arrows">
                <span>⬇️ npm run sync:all (Automatic Token & Component Sync) ⬇️</span>
              </div>

              <div class="diagram-targets-row">
                <div class="diagram-node target-node react-node">
                  <span class="node-badge">REACT 18/19</span>
                  <span class="node-title font-heading">crml-ui-react</span>
                  <span class="node-sub">70 TSX Components</span>
                </div>
                <div class="diagram-node target-node svelte-node">
                  <span class="node-badge">SVELTE 5</span>
                  <span class="node-title font-heading">crml-ui-svelte</span>
                  <span class="node-sub">70 Svelte Components</span>
                </div>
                <div class="diagram-node target-node html-node">
                  <span class="node-badge">PURE HTML5</span>
                  <span class="node-title font-heading">crml-ui-html</span>
                  <span class="node-sub">70 Snippets & CSS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 5: Full 70-Component Parity Matrix Table -->
      <section class="parity-matrix-section">
        <div class="section-title-bar">
          <CrmlStickerBadge variant="yellow" tilt="none" star>PARITY AUDIT</CrmlStickerBadge>
          <h2 class="font-heading section-title">
            FULL 70-COMPONENT CROSS-FRAMEWORK MATRIX
          </h2>
          <span class="section-tag font-mono">// 100% PARITY CONFIRMED ACROSS ALL 4 FRAMEWORKS</span>
        </div>

        <div class="doc-card matrix-card">
          <!-- Matrix Search & Category Filter Toolbar -->
          <div class="matrix-toolbar">
            <div class="search-box">
              <CrmlInput
                v-model="matrixSearch"
                placeholder="Filter 70 components (e.g. Button, Slider, Dialog, Table)..."
              />
            </div>
            <div class="category-filter-pills">
              <button
                v-for="cat in ['ALL', 'ATOMS', 'MOLECULES', 'ORGANISMS']"
                :key="cat"
                class="cat-filter-btn font-mono"
                :class="{ active: activeCategoryFilter === cat }"
                @click="activeCategoryFilter = cat"
              >
                {{ cat }}
              </button>
            </div>
          </div>

          <!-- Parity Matrix Table -->
          <CrmlTable
            :columns="matrixColumns"
            :data="filteredMatrixData"
            accent-color="lime"
          />
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  CrmlButton,
  CrmlBouncyButton,
  CrmlBadge,
  CrmlStickerBadge,
  CrmlInput,
  CrmlNeonSwitch,
  CrmlDualRangeSlider,
  CrmlCard,
  CrmlSegmentedControl,
  CrmlCodeBlock,
  CrmlTable,
  type CrmlTableColumn
} from '../src/index'

defineEmits<{
  (e: 'switch-view', view: 'playground' | 'storybook' | 'docs'): void
}>()

// -------------------------------------------------------------
// Frameworks Definition
// -------------------------------------------------------------
type FrameworkId = 'vue' | 'react' | 'svelte' | 'html'
const currentFramework = ref<FrameworkId>('vue')

const frameworks = [
  { id: 'vue' as FrameworkId, name: 'Vue 3', icon: '🟢', version: 'v3.4+' },
  { id: 'react' as FrameworkId, name: 'React', icon: '⚛️', version: 'v18 / 19' },
  { id: 'svelte' as FrameworkId, name: 'Svelte', icon: '🧡', version: 'v5.0+' },
  { id: 'html' as FrameworkId, name: 'HTML5', icon: '🌐', version: 'Vanilla' }
]

const currentInstallCommand = computed(() => {
  switch (currentFramework.value) {
    case 'vue':
      return 'npm install crml-ui'
    case 'react':
      return 'npm install crml-ui-react'
    case 'svelte':
      return 'npm install crml-ui-svelte'
    case 'html':
      return '<link rel="stylesheet" href="./css/crml-neubrutal.css">'
  }
})

// Framework Metadata & Quickstart Specs
const frameworkMetaMap: Record<FrameworkId, {
  name: string
  tagline: string
  description: string
  repoDir: string
  localPath: string
  badgeVariant: 'lime' | 'pink' | 'cyan' | 'yellow'
  ext: string
  setupFile: string
  quickSetupCode: string
}> = {
  vue: {
    name: 'Vue 3 (Master Implementation)',
    tagline: 'Composition API <script setup lang="ts"> & Vite Library Mode',
    description: 'The master implementation providing 70 tactile primitives, full TypeScript typing, scoped and named slots, interactive v-models, and Vite library bundling.',
    repoDir: 'C:\\Code\\crml-ui',
    localPath: 'c:\\Code\\crml-ui',
    badgeVariant: 'lime',
    ext: 'vue',
    setupFile: 'main.ts',
    quickSetupCode: `import { createApp } from 'vue'
import App from './App.vue'

// Import CRML-UI Design Tokens & Plugin
import 'crml-ui/dist/style.css'
import { CrmlUI } from 'crml-ui'

const app = createApp(App)
app.use(CrmlUI)
app.mount('#app')`
  },
  react: {
    name: 'React 18 / 19 Ecosystem',
    tagline: 'Fully Typed TSX Components with Tactile Rebound Physics',
    description: 'React library port with identical prop interfaces, spring physics, and CSS token consumption. Fully compatible with Next.js App Router, Vite, and Remix.',
    repoDir: 'C:\\Code\\crml-ui-react',
    localPath: 'c:\\Code\\crml-ui-react',
    badgeVariant: 'cyan',
    ext: 'tsx',
    setupFile: 'App.tsx',
    quickSetupCode: `import React from 'react'
import 'crml-ui-react/dist/style.css'
import { CrmlBouncyButton, CrmlBadge, CrmlDualRangeSlider } from 'crml-ui-react'

export function App() {
  const [range, setRange] = React.useState<[number, number]>([150, 800])
  return (
    <div>
      <CrmlBouncyButton variant="lime">TACTILE CTA</CrmlBouncyButton>
      <CrmlDualRangeSlider value={range} onChange={setRange} />
    </div>
  )
}`
  },
  svelte: {
    name: 'Svelte 5 Ecosystem',
    tagline: 'Reactive Svelte Components with Zero Ambient Blur',
    description: 'Svelte 4 and 5 compatible components with native reactive props, event forwarding, and slots. Perfect for SvelteKit and standalone Vite applications.',
    repoDir: 'C:\\Code\\crml-ui-svelte',
    localPath: 'c:\\Code\\crml-ui-svelte',
    badgeVariant: 'yellow',
    ext: 'svelte',
    setupFile: 'App.svelte',
    quickSetupCode: `<script lang="ts">
  import 'crml-ui-svelte/dist/style.css';
  import { CrmlButton, CrmlBadge, CrmlNeonSwitch } from 'crml-ui-svelte';

  let active = true;
<\/script>

<CrmlBadge variant="pink">SVELTE READY</CrmlBadge>
<CrmlButton variant="lime" on:click={() => alert('Clicked!')}>
  TACTILE SVELTE BUTTON
</CrmlButton>`
  },
  html: {
    name: 'Vanilla HTML5 & Modern CSS',
    tagline: 'Zero-Dependency Neubrutalism for Any Tech Stack',
    description: 'Pure HTML5 markup and standalone CSS classes (.crml-btn, .crml-badge, .crml-card) with vanilla JavaScript tactile spring physics for PHP, WordPress, Django, or static sites.',
    repoDir: 'C:\\Code\\crml-ui-html',
    localPath: 'c:\\Code\\crml-ui-html',
    badgeVariant: 'pink',
    ext: 'html',
    setupFile: 'index.html',
    quickSetupCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <link rel="stylesheet" href="./css/crml-neubrutal.css">
</head>
<body>
  <button class="crml-bouncy-btn variant-lime">VANILLA BUTTON</button>
  <span class="crml-badge variant-pink">HOT STATUS</span>
  <script src="./js/crml-tactile.js"><\/script>
</body>
</html>`
  }
}

const activeFwMeta = computed(() => frameworkMetaMap[currentFramework.value])

// -------------------------------------------------------------
// Interactive Component Sandbox State
// -------------------------------------------------------------
const selectedDemoComp = ref('CrmlBouncyButton')
const demoVariant = ref<'lime' | 'pink' | 'cyan' | 'yellow'>('lime')
const demoSize = ref<'sm' | 'md' | 'lg'>('md')
const demoDisabled = ref(false)
const clickCount = ref(0)
const demoInputVal = ref('CYBER_GHOST_01')
const demoSwitchVal = ref(true)
const demoSliderMin = ref(150)
const demoSliderMax = ref(800)

const demoCompOptions = [
  { id: 'CrmlBouncyButton', label: 'Bouncy Button' },
  { id: 'CrmlButton', label: 'Button' },
  { id: 'CrmlBadge', label: 'Badge' },
  { id: 'CrmlStickerBadge', label: 'Sticker' },
  { id: 'CrmlInput', label: 'Input' },
  { id: 'CrmlNeonSwitch', label: 'Neon Switch' },
  { id: 'CrmlDualRangeSlider', label: 'Dual Slider' },
  { id: 'CrmlCard', label: 'Card' }
]

const demoVariantOptions = [
  { id: 'lime', label: 'Lime' },
  { id: 'pink', label: 'Pink' },
  { id: 'cyan', label: 'Cyan' },
  { id: 'yellow', label: 'Yellow' }
]

const demoSizeOptions = [
  { id: 'sm', label: 'SM' },
  { id: 'md', label: 'MD' },
  { id: 'lg', label: 'LG' }
]

// Dynamic Framework Code Generator
const generatedFrameworkCode = computed(() => {
  const comp = selectedDemoComp.value
  const v = demoVariant.value
  const s = demoSize.value
  const dis = demoDisabled.value ? ' disabled' : ''

  switch (currentFramework.value) {
    case 'vue':
      if (comp === 'CrmlBouncyButton') {
        return `<script setup lang="ts">\nimport { CrmlBouncyButton } from 'crml-ui'\n<\/script>\n\n<template>\n  <CrmlBouncyButton\n    variant="${v}"\n    size="${s}"${dis}\n    @click="handleClick"\n  >\n    ⚡ TACTILE BOUNCE\n  </CrmlBouncyButton>\n</template>`
      }
      if (comp === 'CrmlDualRangeSlider') {
        return `<script setup lang="ts">\nimport { ref } from 'vue'\nimport { CrmlDualRangeSlider } from 'crml-ui'\n\nconst rangeMin = ref(${demoSliderMin.value})\nconst rangeMax = ref(${demoSliderMax.value})\n<\/script>\n\n<template>\n  <CrmlDualRangeSlider\n    v-model:min="rangeMin"\n    v-model:max="rangeMax"\n    :min-limit="0"\n    :max-limit="1000"\n    variant="${v}"\n    prefix="$"\n    label="PRICE FILTER"\n  />\n</template>`
      }
      return `<script setup lang="ts">\nimport { ${comp} } from 'crml-ui'\n<\/script>\n\n<template>\n  <${comp} variant="${v}" size="${s}"${dis}>\n    Content Here\n  </${comp}>\n</template>`

    case 'react':
      if (comp === 'CrmlBouncyButton') {
        return `import React from 'react'\nimport { CrmlBouncyButton } from 'crml-ui-react'\n\nexport function MyButton() {\n  return (\n    <CrmlBouncyButton\n      variant="${v}"\n      size="${s}"${dis}\n      onClick={() => console.log('Clicked!')}\n    >\n      ⚡ TACTILE BOUNCE\n    </CrmlBouncyButton>\n  )\n}`
      }
      if (comp === 'CrmlDualRangeSlider') {
        return `import React, { useState } from 'react'\nimport { CrmlDualRangeSlider } from 'crml-ui-react'\n\nexport function PriceFilter() {\n  const [range, setRange] = useState<[number, number]>([${demoSliderMin.value}, ${demoSliderMax.value}])\n  return (\n    <CrmlDualRangeSlider\n      minLimit={0}\n      maxLimit={1000}\n      value={range}\n      onChange={setRange}\n      variant="${v}"\n      prefix="$"\n      label="PRICE FILTER"\n    />\n  )\n}`
      }
      return `import React from 'react'\nimport { ${comp} } from 'crml-ui-react'\n\nexport function Demo() {\n  return (\n    <${comp} variant="${v}" size="${s}"${dis}>\n      Content Here\n    </${comp}>\n  )\n}`

    case 'svelte':
      if (comp === 'CrmlBouncyButton') {
        return `<script lang="ts">\n  import { CrmlBouncyButton } from 'crml-ui-svelte';\n<\/script>\n\n<CrmlBouncyButton\n  variant="${v}"\n  size="${s}"${dis}\n  on:click={() => console.log('Clicked!')}\n>\n  ⚡ TACTILE BOUNCE\n</CrmlBouncyButton>`
      }
      if (comp === 'CrmlDualRangeSlider') {
        return `<script lang="ts">\n  import { CrmlDualRangeSlider } from 'crml-ui-svelte';\n  let range = [${demoSliderMin.value}, ${demoSliderMax.value}];\n<\/script>\n\n<CrmlDualRangeSlider\n  bind:value={range}\n  minLimit={0}\n  maxLimit={1000}\n  variant="${v}"\n  prefix="$"\n  label="PRICE FILTER"\n/>`
      }
      return `<script lang="ts">\n  import { ${comp} } from 'crml-ui-svelte';\n<\/script>\n\n<${comp} variant="${v}" size="${s}"${dis}>\n  Content Here\n</${comp}>`

    case 'html':
      if (comp === 'CrmlBouncyButton') {
        return `<!-- Vanilla Tactile Neubrutal Button -->\n<button class="crml-bouncy-btn variant-${v} size-${s}"${dis ? ' disabled' : ''}>\n  ⚡ TACTILE BOUNCE\n</button>`
      }
      if (comp === 'CrmlDualRangeSlider') {
        return `<!-- Vanilla Dual Range Slider Markup -->\n<div class="crml-dual-range-wrapper variant-${v}">\n  <div class="range-info-row">\n    <span class="range-label">PRICE FILTER</span>\n    <span class="range-value-pill">$150 — $800</span>\n  </div>\n  <div class="range-track-container">\n    <input type="range" class="range-input range-min" min="0" max="1000" value="150">\n    <input type="range" class="range-input range-max" min="0" max="1000" value="800">\n  </div>\n</div>`
      }
      return `<!-- ${comp} HTML5 Template -->\n<div class="crml-${comp.replace('Crml', '').toLowerCase()} variant-${v} size-${s}"${dis ? ' disabled' : ''}>\n  <span>Content Here</span>\n</div>`
  }
})

// -------------------------------------------------------------
// Design Tokens Palette Data
// -------------------------------------------------------------
const tokenPalette = [
  { name: 'ELECTRIC LIME', cssVar: '--crt-electric-lime', hex: '#CCFF00', desc: 'Primary brand CTA, high-voltage active indicators & highlight accents.' },
  { name: 'HOT PINK', cssVar: '--crt-hot-pink', hex: '#FF007F', desc: 'Danger alerts, high-energy sticker badges & secondary callouts.' },
  { name: 'CYBER CYAN', cssVar: '--crt-cyber-cyan', hex: '#00F0FF', desc: 'Secondary actions, futuristic HUD telemetry & focus glow rings.' },
  { name: 'SUNBURST YELLOW', cssVar: '--crt-sunburst-yellow', hex: '#FFD600', desc: 'Warning banners, energetic ratings & stamp badge accents.' },
  { name: 'OBSIDIAN BLACK', cssVar: '--crt-obsidian', hex: '#0D0D0D', desc: 'Deep solid ink borders (2.5px - 3px) and 0% ambient blur offset drop-shadows.' },
  { name: 'PURE WHITE', cssVar: '--crml-surface-card', hex: '#FFFFFF', desc: 'Clean base card background providing contrast against hard ink strokes.' }
]

// -------------------------------------------------------------
// Sync Engine Commands Data
// -------------------------------------------------------------
const syncCommands = [
  {
    command: 'npm run sync:all',
    desc: 'Runs full ecosystem synchronization: copies CSS design tokens, checks component parity matrix, and automatically generates missing component code into React, Svelte, and HTML.'
  },
  {
    command: 'npm run sync:tokens',
    desc: 'Synchronizes master CSS token files (primitive.css, semantic.css, index.css) across all 3 sibling repositories in C:\\Code.'
  },
  {
    command: 'npm run sync:check',
    desc: 'Performs instant parity audit and prints real-time ASCII table showing which components are present across Vue, React, Svelte, and HTML.'
  }
]

// -------------------------------------------------------------
// Full 70-Component Parity Matrix Data & Search Filter
// -------------------------------------------------------------
const matrixSearch = ref('')
const activeCategoryFilter = ref('ALL')

const rawMatrixData = [
  // Atoms (20)
  { name: 'CrmlButton', category: 'ATOMS', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlBouncyButton', category: 'ATOMS', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlBadge', category: 'ATOMS', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlStickerBadge', category: 'ATOMS', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlStampBadge', category: 'ATOMS', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlInput', category: 'ATOMS', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlTextarea', category: 'ATOMS', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlCheckbox', category: 'ATOMS', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlNeonSwitch', category: 'ATOMS', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlNumberInput', category: 'ATOMS', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlBlobAvatar', category: 'ATOMS', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlMarquee', category: 'ATOMS', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlProgress', category: 'ATOMS', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlKbd', category: 'ATOMS', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlSpeechBubble', category: 'ATOMS', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlWavyDivider', category: 'ATOMS', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlDivider', category: 'ATOMS', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlPixelIconWrapper', category: 'ATOMS', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlSkeleton', category: 'ATOMS', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlTooltip', category: 'ATOMS', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },

  // Molecules (21)
  { name: 'CrmlDualRangeSlider', category: 'MOLECULES', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlPillTabs', category: 'MOLECULES', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlDropdown', category: 'MOLECULES', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlSegmentedControl', category: 'MOLECULES', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlCodeBlock', category: 'MOLECULES', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlAlert', category: 'MOLECULES', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlBreadcrumb', category: 'MOLECULES', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlPagination', category: 'MOLECULES', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlSearchTagFilter', category: 'MOLECULES', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlRadioGroup', category: 'MOLECULES', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlStepper', category: 'MOLECULES', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlOtpInput', category: 'MOLECULES', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlDatePicker', category: 'MOLECULES', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlTimePicker', category: 'MOLECULES', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlColorPicker', category: 'MOLECULES', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlEmojiRatingSlider', category: 'MOLECULES', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlStatusMatrix', category: 'MOLECULES', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlFaceIdToggle', category: 'MOLECULES', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlVaporwaveVisualizer', category: 'MOLECULES', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlDoodleContainer', category: 'MOLECULES', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlFloatingEmojiBar', category: 'MOLECULES', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },

  // Organisms (29)
  { name: 'CrmlCard', category: 'ORGANISMS', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlNeubrutalCard', category: 'ORGANISMS', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlRetroDialog', category: 'ORGANISMS', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlToast', category: 'ORGANISMS', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlTable', category: 'ORGANISMS', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlPricingCard', category: 'ORGANISMS', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlStickyNote', category: 'ORGANISMS', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlGlassCard', category: 'ORGANISMS', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlFileUpload', category: 'ORGANISMS', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlFormGroup', category: 'ORGANISMS', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlFunkyAccordion', category: 'ORGANISMS', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlHypebeastDropBanner', category: 'ORGANISMS', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlPriceTagWidget', category: 'ORGANISMS', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlTimeline', category: 'ORGANISMS', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlCommandPalette', category: 'ORGANISMS', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlFilterDrawer', category: 'ORGANISMS', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlAiPromptInput', category: 'ORGANISMS', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlVideoPlayer', category: 'ORGANISMS', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlKanbanCard', category: 'ORGANISMS', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlSwipeCard', category: 'ORGANISMS', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlRadarTelemetry', category: 'ORGANISMS', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlSoundboard', category: 'ORGANISMS', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlNotificationDrawer', category: 'ORGANISMS', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlReviewQuoteCard', category: 'ORGANISMS', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlSpeedometerDial', category: 'ORGANISMS', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlRichTextEditor', category: 'ORGANISMS', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlNavbar', category: 'ORGANISMS', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlSidebar', category: 'ORGANISMS', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' },
  { name: 'CrmlDrawer', category: 'ORGANISMS', vue: '✅ v3.4', react: '✅ TSX', svelte: '✅ Svelte 5', html: '✅ HTML5', status: '100% PARITY' }
]

const matrixColumns: CrmlTableColumn[] = [
  { key: 'name', label: 'COMPONENT NAME', width: '220px' },
  { key: 'category', label: 'CATEGORY', width: '130px' },
  { key: 'vue', label: 'VUE 3', width: '110px' },
  { key: 'react', label: 'REACT', width: '110px' },
  { key: 'svelte', label: 'SVELTE', width: '110px' },
  { key: 'html', label: 'HTML5', width: '110px' },
  { key: 'status', label: 'PARITY STATUS', width: '140px' }
]

const filteredMatrixData = computed(() => {
  return rawMatrixData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(matrixSearch.value.toLowerCase()) ||
                          item.category.toLowerCase().includes(matrixSearch.value.toLowerCase())
    const matchesCategory = activeCategoryFilter.value === 'ALL' || item.category === activeCategoryFilter.value
    return matchesSearch && matchesCategory
  })
})

// -------------------------------------------------------------
// Clipboard Copy Helper
// -------------------------------------------------------------
const copiedTarget = ref<string | null>(null)

function copyToClipboard(text: string, id: string) {
  navigator.clipboard.writeText(text).then(() => {
    copiedTarget.value = id
    setTimeout(() => {
      if (copiedTarget.value === id) copiedTarget.value = null
    }, 2000)
  })
}
</script>

<style scoped>
.docs-dashboard {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem 2.5rem;
  background-color: var(--crml-bg-base, #FAFAFA);
  color: var(--crml-text-main, #0D0D0D);
  min-height: 100vh;
  box-sizing: border-box;
}

/* Header */
.docs-header {
  border-bottom: 3.5px solid var(--crt-obsidian, #0D0D0D);
  padding-bottom: 1.75rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  flex-wrap: wrap;
}

.badge-cluster {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
}

.docs-main-title {
  font-size: 2.5rem;
  font-weight: 900;
  margin: 0 0 0.5rem 0;
  letter-spacing: -1px;
  line-height: 1.1;
}

.title-highlight {
  background-color: var(--crt-electric-lime, #CCFF00);
  padding: 0 0.5rem;
  border: 3px solid var(--crt-obsidian, #0D0D0D);
  box-shadow: 4px 4px 0px var(--crt-obsidian, #0D0D0D);
}

.docs-sub-desc {
  margin: 0;
  font-size: 1rem;
  color: #404040;
  max-width: 780px;
  font-weight: 500;
  line-height: 1.4;
}

.header-nav-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

/* Framework Selector Bar */
.framework-selector-section {
  position: sticky;
  top: 1rem;
  z-index: 100;
}

.framework-bar-card {
  background: #FFFFFF;
  border: 3px solid var(--crt-obsidian, #0D0D0D);
  border-radius: var(--crml-radius-lg, 12px);
  box-shadow: 6px 6px 0px var(--crt-obsidian, #0D0D0D);
  padding: 1.25rem 1.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.selector-prompt {
  font-size: 0.75rem;
  font-weight: 800;
  color: #71717A;
}

.active-fw-heading {
  margin: 0.25rem 0 0 0;
  font-size: 1.25rem;
  font-weight: 900;
}

.active-fw-badge {
  background-color: var(--crt-electric-lime, #CCFF00);
  border: 2px solid var(--crt-obsidian, #0D0D0D);
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  box-shadow: 2px 2px 0px var(--crt-obsidian, #0D0D0D);
}

.framework-pills-row {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.fw-pill-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.25rem;
  font-size: 0.9rem;
  font-weight: 800;
  background: #F4F4F5;
  color: var(--crt-obsidian, #0D0D0D);
  border: 2.5px solid var(--crt-obsidian, #0D0D0D);
  border-radius: var(--crml-radius-md, 8px);
  box-shadow: 3px 3px 0px var(--crt-obsidian, #0D0D0D);
  cursor: pointer;
  transition: all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.fw-pill-btn:hover {
  transform: translate(-1px, -1px);
  box-shadow: 4px 4px 0px var(--crt-obsidian, #0D0D0D);
}

.fw-pill-btn:active {
  transform: translate(2px, 2px);
  box-shadow: 1px 1px 0px var(--crt-obsidian, #0D0D0D);
}

.fw-pill-btn.active {
  background-color: var(--crt-electric-lime, #CCFF00);
  box-shadow: 4px 4px 0px var(--crt-obsidian, #0D0D0D);
  transform: translate(-2px, -2px);
}

.fw-status-dot {
  font-size: 0.75rem;
  font-weight: 700;
  color: #52525B;
}

.install-bar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: #18181B;
  color: #CCFF00;
  padding: 0.5rem 1rem;
  border: 2.5px solid var(--crt-obsidian, #0D0D0D);
  border-radius: 8px;
  box-shadow: 3px 3px 0px var(--crt-obsidian, #0D0D0D);
}

.install-label {
  font-size: 0.75rem;
  color: #A1A1AA;
  font-weight: 800;
}

.install-code {
  font-size: 0.85rem;
  font-weight: 800;
}

/* Main Container & Sections */
.docs-main-container {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.section-title-bar {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
}

.section-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 900;
  letter-spacing: -0.5px;
}

.section-tag {
  font-size: 0.8rem;
  font-weight: 700;
  color: #71717A;
}

/* Cards Base */
.doc-card {
  background: #FFFFFF;
  border: 3px solid var(--crt-obsidian, #0D0D0D);
  border-radius: var(--crml-radius-lg, 12px);
  box-shadow: 5px 5px 0px var(--crt-obsidian, #0D0D0D);
  box-sizing: border-box;
}

.card-header {
  border-bottom: 2.5px solid var(--crt-obsidian, #0D0D0D);
  padding: 0.75rem 1.25rem;
  font-size: 0.95rem;
  font-weight: 800;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #FAFAFA;
  border-radius: 9px 9px 0 0;
}

.card-body {
  padding: 1.25rem;
}

/* Overview Section */
.overview-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

@media (max-width: 900px) {
  .overview-grid {
    grid-template-columns: 1fr;
  }
}

.overview-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  font-weight: 900;
}

.overview-p {
  margin: 0 0 1.25rem 0;
  font-size: 0.875rem;
  color: #52525B;
  line-height: 1.5;
}

.spec-metrics-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.spec-metric-box {
  background: #F4F4F5;
  border: 2px solid var(--crt-obsidian, #0D0D0D);
  border-radius: 6px;
  padding: 0.65rem 0.85rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.metric-label {
  font-size: 0.7rem;
  font-weight: 800;
  color: #71717A;
}

.metric-value {
  font-size: 1.15rem;
  font-weight: 900;
  color: #0D0D0D;
}

.metric-sub {
  font-size: 0.6875rem;
  color: #52525B;
  font-weight: 600;
}

.mini-copy-btn {
  background: var(--crt-electric-lime, #CCFF00);
  border: 1.5px solid var(--crt-obsidian, #0D0D0D);
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 2px 2px 0px var(--crt-obsidian, #0D0D0D);
}

.mini-copy-btn:hover {
  transform: translate(-1px, -1px);
  box-shadow: 3px 3px 0px var(--crt-obsidian, #0D0D0D);
}

/* Sandbox Workspace */
.sandbox-controls-row {
  border-bottom: 2.5px solid var(--crt-obsidian, #0D0D0D);
  padding: 1rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  background-color: #FAFAFA;
  border-radius: 9px 9px 0 0;
}

.ctrl-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.ctrl-label {
  font-size: 0.75rem;
  font-weight: 800;
  color: #52525B;
}

.sandbox-split-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  min-height: 380px;
}

@media (max-width: 960px) {
  .sandbox-split-grid {
    grid-template-columns: 1fr;
  }
}

.live-render-box {
  border-right: 2.5px solid var(--crt-obsidian, #0D0D0D);
  display: flex;
  flex-direction: column;
}

.box-top-bar {
  background: #F4F4F5;
  border-bottom: 2px solid var(--crt-obsidian, #0D0D0D);
  padding: 0.6rem 1rem;
  font-size: 0.75rem;
  font-weight: 800;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status-live {
  color: #16A34A;
  font-weight: 900;
}

.canvas-center {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: radial-gradient(#E4E4E7 1px, transparent 1px);
  background-size: 16px 16px;
}

.code-generator-box {
  display: flex;
  flex-direction: column;
}

/* Tokens Palette */
.tokens-palette-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.25rem;
}

.token-card {
  background: #FFFFFF;
  border: 2.5px solid var(--crt-obsidian, #0D0D0D);
  border-radius: 8px;
  box-shadow: 4px 4px 0px var(--crt-obsidian, #0D0D0D);
  padding: 0.85rem;
  cursor: pointer;
  transition: all 0.15s ease;
}

.token-card:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px var(--crt-obsidian, #0D0D0D);
}

.color-swatch-box {
  height: 60px;
  border: 2px solid var(--crt-obsidian, #0D0D0D);
  border-radius: 6px;
  display: flex;
  align-items: flex-end;
  padding: 0.5rem;
  margin-bottom: 0.75rem;
}

.token-name-badge {
  background: #0D0D0D;
  color: #FFFFFF;
  font-size: 0.7rem;
  font-weight: 900;
  padding: 0.15rem 0.4rem;
  border-radius: 3px;
}

.token-details-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  font-weight: 800;
  margin-bottom: 0.35rem;
}

.token-var { color: #0D0D0D; }
.token-hex { color: #FF007F; }

.token-desc {
  margin: 0;
  font-size: 0.75rem;
  color: #71717A;
  line-height: 1.4;
}

/* Sync Engine Architecture */
.sync-grid {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  padding: 1.5rem;
  gap: 2rem;
}

@media (max-width: 900px) {
  .sync-grid {
    grid-template-columns: 1fr;
  }
}

.sync-heading {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  font-weight: 900;
}

.sync-p {
  font-size: 0.875rem;
  color: #52525B;
  line-height: 1.5;
  margin: 0 0 1.5rem 0;
}

.inline-code {
  background: #E4E4E7;
  border: 1px solid #0D0D0D;
  padding: 0.1rem 0.35rem;
  border-radius: 3px;
  font-weight: 800;
}

.sync-commands-box {
  background: #FAFAFA;
  border: 2px solid var(--crt-obsidian, #0D0D0D);
  border-radius: 8px;
  padding: 1rem;
}

.command-box-title {
  margin: 0 0 0.75rem 0;
  font-size: 0.85rem;
  font-weight: 800;
}

.command-item {
  margin-bottom: 0.85rem;
}

.command-item:last-child {
  margin-bottom: 0;
}

.command-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #18181B;
  color: #CCFF00;
  padding: 0.35rem 0.65rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 800;
}

.cmd-desc {
  margin: 0.25rem 0 0 0;
  font-size: 0.75rem;
  color: #71717A;
}

.architecture-diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  height: 100%;
  justify-content: center;
  background: #F4F4F5;
  border: 2px solid var(--crt-obsidian, #0D0D0D);
  border-radius: 8px;
  padding: 1.5rem;
}

.diagram-node {
  background: #FFFFFF;
  border: 2.5px solid var(--crt-obsidian, #0D0D0D);
  border-radius: 8px;
  box-shadow: 4px 4px 0px var(--crt-obsidian, #0D0D0D);
  padding: 0.75rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.master-node {
  background: #CCFF00;
  width: 220px;
}

.node-badge {
  font-size: 0.65rem;
  font-weight: 900;
  background: #0D0D0D;
  color: #FFFFFF;
  padding: 0.1rem 0.4rem;
  border-radius: 3px;
  margin-bottom: 0.25rem;
}

.node-title {
  font-size: 1.05rem;
  font-weight: 900;
}

.node-sub {
  font-size: 0.7rem;
  color: #52525B;
}

.diagram-arrows {
  font-size: 0.75rem;
  font-weight: 800;
  color: #FF007F;
  text-align: center;
}

.diagram-targets-row {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
}

.target-node {
  flex: 1;
  min-width: 130px;
}

.react-node { background: #E0F2FE; }
.svelte-node { background: #FFEDD5; }
.html-node { background: #FCE7F3; }

/* Parity Matrix Toolbar */
.matrix-toolbar {
  padding: 1rem 1.25rem;
  border-bottom: 2.5px solid var(--crt-obsidian, #0D0D0D);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  background-color: #FAFAFA;
  border-radius: 9px 9px 0 0;
}

.search-box {
  width: 320px;
}

.category-filter-pills {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.cat-filter-btn {
  padding: 0.35rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 800;
  background: #FFFFFF;
  border: 2px solid var(--crt-obsidian, #0D0D0D);
  border-radius: 6px;
  box-shadow: 2px 2px 0px var(--crt-obsidian, #0D0D0D);
  cursor: pointer;
  transition: all 0.15s ease;
}

.cat-filter-btn:hover {
  transform: translate(-1px, -1px);
  box-shadow: 3px 3px 0px var(--crt-obsidian, #0D0D0D);
}

.cat-filter-btn.active {
  background: var(--crt-electric-lime, #CCFF00);
  box-shadow: 3px 3px 0px var(--crt-obsidian, #0D0D0D);
}
</style>
