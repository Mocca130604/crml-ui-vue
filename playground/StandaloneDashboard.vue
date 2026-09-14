<template>
  <div class="dashboard-root font-mono">
    <!-- Top Cyber Banner -->
    <div class="top-announcement-bar font-mono">
      <span>⚡ CRML-UI v5.5 UNIFIED ECOSYSTEM</span>
      <span class="announcement-divider">•</span>
      <span>70 PRIMITIVES ACROSS VUE 3, REACT, SVELTE & HTML5</span>
      <span class="announcement-divider">•</span>
      <span style="color: #CCFF00; font-weight: 900;">0% AMBIENT BLUR • 100% DOCUMENTED</span>
    </div>

    <!-- Navigation Header -->
    <header class="main-nav-header">
      <div class="brand-block">
        <div class="brand-logo-chip font-heading">
          <span class="logo-accent">CRML</span>-UI
        </div>
        <div class="brand-title-col">
          <h1 class="brand-title font-heading">MULTI-FRAMEWORK DOCUMENTATION HUB</h1>
          <span class="brand-sub font-mono">// VUE 3 • REACT 18/19 • SVELTE 5 • VANILLA HTML5</span>
        </div>
      </div>

      <div class="header-action-links">
        <a href="#install" class="tactile-btn variant-lime">⚡ QUICK INSTALL</a>
        <a href="#catalog" class="tactile-btn variant-cyan">📚 70 COMPONENT DOCS</a>
        <a href="#parity" class="tactile-btn variant-yellow">📊 PARITY MATRIX</a>
        <a href="https://github.com/Mocca130604/crml-ui-vue" target="_blank" class="tactile-btn variant-obsidian">★ GITHUB ↗</a>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-left-col">
        <div class="hero-badges-cluster">
          <span class="sticker-chip variant-pink tilt-right">★ OFFICIAL HUB</span>
          <span class="badge-chip variant-cyan">MULTI-REPO ARCHITECTURE</span>
          <span class="badge-chip variant-yellow">PARALLEL SYNC</span>
        </div>

        <h2 class="hero-heading font-heading">
          ONE SYSTEM.<br>
          <span class="hero-highlight">FOUR FRAMEWORKS.</span><br>
          ZERO BLUR.
        </h2>

        <p class="hero-description font-mono">
          Production-grade, highly tactile Neubrutalism, Y2K Cyber Mecha, and Streetwear component library.
          Choose your target framework below to <strong>install via npm and view its registry page</strong>, or <strong>download the standalone HTML5 starter template</strong>.
        </p>

        <!-- Quick Stats Cards Row -->
        <div class="hero-stats-row font-mono">
          <div class="stat-box">
            <span class="stat-num font-heading">70</span>
            <span class="stat-label">PRIMITIVES</span>
          </div>
          <div class="stat-box">
            <span class="stat-num font-heading">4</span>
            <span class="stat-label">FRAMEWORKS</span>
          </div>
          <div class="stat-box">
            <span class="stat-num font-heading">100%</span>
            <span class="stat-label">DOCS COVERAGE</span>
          </div>
          <div class="stat-box">
            <span class="stat-num font-heading">0%</span>
            <span class="stat-label">AMBIENT BLUR</span>
          </div>
        </div>
      </div>

      <!-- Hero Right: Interactive Framework Distribution Box -->
      <div class="hero-right-col" id="install">
        <div class="distribution-header-card">
          <div class="dist-header font-heading">
            <span>📦 FRAMEWORK INSTALLER & DOWNLOAD CENTER</span>
            <span class="live-dot">● SELECT TARGET</span>
          </div>

          <!-- Framework Selection Tabs -->
          <div class="fw-toggle-pills">
            <button
              v-for="fw in frameworks"
              :key="fw.id"
              class="fw-toggle-btn font-mono"
              :class="{ active: activeFw === fw.id }"
              @click="activeFw = fw.id"
            >
              <span class="btn-icon">{{ fw.icon }}</span>
              <span class="btn-label font-heading">{{ fw.name }}</span>
              <span class="btn-sub">{{ fw.badge }}</span>
            </button>
          </div>

          <!-- Selected Framework Action Panel -->
          <div class="selected-fw-panel">
            <div class="panel-top-row">
              <div>
                <span class="panel-type-tag font-mono">// {{ activeFwMeta.type }}</span>
                <h3 class="panel-title font-heading">{{ activeFwMeta.fullName }}</h3>
              </div>
              <span class="package-version-pill font-mono">{{ activeFwMeta.version }}</span>
            </div>

            <p class="panel-desc">{{ activeFwMeta.desc }}</p>

            <!-- NPM Frameworks: Vue, React, Svelte -->
            <template v-if="activeFwMeta.isNpm">
              <div class="npm-install-terminal font-mono">
                <div class="terminal-bar">
                  <span>TERMINAL INSTALL COMMAND</span>
                  <span class="terminal-dots">● ● ●</span>
                </div>
                <div class="terminal-content">
                  <span class="prompt-symbol">$</span>
                  <code class="command-text">{{ activeFwMeta.installCmd }}</code>
                  <button
                    class="tactile-btn variant-lime size-sm"
                    @click="copyText(activeFwMeta.installCmd, 'npmCmd')"
                  >
                    {{ copiedId === 'npmCmd' ? '✓ COPIED!' : '📋 COPY' }}
                  </button>
                </div>
              </div>

              <div class="action-buttons-row">
                <!-- Directed to NPM Registry Page -->
                <a
                  :href="activeFwMeta.npmUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="tactile-btn variant-pink flex-1 npm-direct-link"
                >
                  🚀 BUKA HALAMAN NPM ({{ activeFwMeta.packageName }}) ↗
                </a>
                <button
                  class="tactile-btn variant-cyan flex-1"
                  @click="copyText(activeFwMeta.quickSnippet, 'snippet')"
                >
                  {{ copiedId === 'snippet' ? '✓ SNIPPET COPIED' : '📋 SALIN STARTER CODE' }}
                </button>
              </div>
            </template>

            <!-- HTML5: Download Starter Template & CSS -->
            <template v-else>
              <div class="html-download-box">
                <div class="download-info-row font-mono">
                  <span>📦 STANDALONE ZERO-DEPENDENCY KIT</span>
                  <span>HTML5 + CSS + VANILLA JS</span>
                </div>

                <div class="cdn-snippet-row font-mono">
                  <code class="cdn-text">&lt;link rel="stylesheet" href="./css/crml-neubrutal.css"&gt;</code>
                  <button class="tactile-btn variant-lime size-sm" @click="copyText('<link rel=\'stylesheet\' href=\'./css/crml-neubrutal.css\'>', 'cdn')">
                    {{ copiedId === 'cdn' ? '✓ COPIED' : '📋 COPY' }}
                  </button>
                </div>

                <div class="action-buttons-row">
                  <button
                    class="tactile-btn variant-lime flex-1 download-btn"
                    @click="triggerHtmlDownload"
                  >
                    💾 DOWNLOAD STARTER TEMPLATE (.HTML) ⬇
                  </button>
                  <button
                    class="tactile-btn variant-yellow flex-1 download-btn"
                    @click="triggerCssDownload"
                  >
                    🎨 DOWNLOAD CSS TOKENS (.CSS) ⬇
                  </button>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </section>

    <!-- ================================================================= -->
    <!-- SECTION: COMPLETE 70-COMPONENT DOCUMENTATION EXPLORER -->
    <!-- ================================================================= -->
    <section class="section-container" id="catalog">
      <div class="section-title-bar">
        <span class="sticker-chip variant-lime tilt-none">MASTER CATALOG</span>
        <h2 class="section-main-title font-heading">
          ALL 70 CRML - UI COMPONENTS & DETAILED DOCUMENTATION
        </h2>
        <span class="section-sub-tag font-mono">// 100% COVERAGE WITH PROPS, SLOTS, EVENTS & MULTI-FRAMEWORK EXAMPLES</span>
      </div>

      <!-- Catalog Main Workspace -->
      <div class="catalog-workspace-card">
        <!-- Search and Category Filter Toolbar -->
        <div class="catalog-toolbar">
          <div class="search-input-wrap">
            <span class="search-icon">🔍</span>
            <input
              type="text"
              v-model="searchQuery"
              class="tactile-input font-mono search-input"
              placeholder="Cari component (e.g. WavyDivider, Button, DatePicker, Telemetry, Modal)..."
            />
            <button v-if="searchQuery" class="clear-search-btn font-mono" @click="searchQuery = ''">✕</button>
          </div>

          <div class="category-tabs-row">
            <button
              class="cat-tab-btn font-mono"
              :class="{ active: selectedCategory === 'ALL' }"
              @click="selectedCategory = 'ALL'"
            >
              ALL ({{ totalComponentCount }})
            </button>
            <button
              v-for="cat in CATALOG_DATA"
              :key="cat.name"
              class="cat-tab-btn font-mono"
              :class="{ active: selectedCategory === cat.name }"
              @click="selectedCategory = cat.name"
            >
              {{ cat.name }} ({{ cat.items.length }})
            </button>
          </div>
        </div>

        <!-- Master-Detail Layout -->
        <div class="catalog-split-layout">
          <!-- Left: Component Navigation Column -->
          <aside class="catalog-nav-aside">
            <div class="nav-aside-header font-mono">
              <span>COMPONENTS ({{ filteredComponents.length }})</span>
              <span class="nav-hint">KLIK UNTUK LIHAT DOKUMENTASI</span>
            </div>

            <div class="component-list-scroll">
              <div
                v-for="comp in filteredComponents"
                :key="comp.id"
                class="comp-list-item font-mono"
                :class="{ active: activeComp.id === comp.id }"
                @click="selectedCompId = comp.id"
              >
                <span class="item-icon">{{ comp.icon || '📦' }}</span>
                <div class="item-text-col">
                  <span class="item-name font-heading">{{ comp.name }}</span>
                  <span class="item-cat">{{ comp.category }} • {{ comp.type }}</span>
                </div>
                <span v-if="comp.badge" class="item-badge-pill">{{ comp.badge.replace('✦', '') }}</span>
              </div>
            </div>
          </aside>

          <!-- Right: Comprehensive Component Documentation View -->
          <main class="catalog-detail-main">
            <!-- Component Header Card -->
            <div class="doc-header-card">
              <div class="doc-title-row">
                <div class="title-left">
                  <div class="doc-tag-badges">
                    <span class="sticker-chip variant-pink tilt-none">{{ activeComp.category.toUpperCase() }}</span>
                    <span class="badge-chip variant-cyan">{{ activeComp.type.toUpperCase() }}</span>
                    <span class="badge-chip variant-obsidian">0% AMBIENT BLUR</span>
                    <span class="badge-chip variant-lime">SPRING REBOUND</span>
                  </div>
                  <h2 class="active-comp-heading font-heading">
                    <span class="comp-icon-lg">{{ activeComp.icon }}</span> {{ activeComp.name }}
                  </h2>
                </div>

                <div class="code-target-toggle">
                  <span class="target-lbl font-mono">CODE TARGET:</span>
                  <div class="target-pills">
                    <button
                      v-for="fw in (['vue', 'react', 'svelte', 'html'] as const)"
                      :key="fw"
                      class="target-pill-btn font-mono"
                      :class="{ active: activeFw === fw }"
                      @click="activeFw = fw"
                    >
                      {{ fw.toUpperCase() }}
                    </button>
                  </div>
                </div>
              </div>

              <!-- Component Description & Use Case -->
              <div class="doc-desc-block font-mono">
                <h4 class="doc-subhead font-heading">💡 FUNGSI & DESKRIPSI KOMPONEN</h4>
                <p class="doc-desc-text">{{ activeComp.desc }}</p>
              </div>

              <!-- Design Notes -->
              <div v-if="activeComp.designNotes" class="doc-design-notes font-mono">
                <h4 class="doc-subhead font-heading">🎨 CATATAN DESAIN & TACTILE PHYSICS</h4>
                <p class="design-notes-text">{{ activeComp.designNotes }}</p>
              </div>
            </div>

            <!-- Interactive Demo & Preview Card (NEVER CUT OFF) -->
            <div class="doc-section-card preview-card-outer">
              <div class="card-bar font-mono">
                <span>🎮 LIVE PREVIEW & VISUAL BLUEPRINT // {{ activeComp.name }}</span>
                <span class="live-dot">● INTERACTIVE</span>
              </div>

              <div class="preview-canvas-wrap">
                <!-- Sandbox Controller Bar -->
                <div class="canvas-controls-bar font-mono">
                  <div class="ctrl-item">
                    <label>COLOR VARIANT:</label>
                    <div class="mini-pills">
                      <button
                        v-for="v in (['lime', 'pink', 'cyan', 'yellow'] as const)"
                        :key="v"
                        class="mini-pill-btn"
                        :class="{ active: demoVariant === v }"
                        @click="demoVariant = v"
                      >
                        {{ v.toUpperCase() }}
                      </button>
                    </div>
                  </div>

                  <div class="ctrl-item">
                    <label>SIZE:</label>
                    <div class="mini-pills">
                      <button
                        v-for="s in (['sm', 'md', 'lg'] as const)"
                        :key="s"
                        class="mini-pill-btn"
                        :class="{ active: demoSize === s }"
                        @click="demoSize = s"
                      >
                        {{ s.toUpperCase() }}
                      </button>
                    </div>
                  </div>

                  <div class="ctrl-item">
                    <label>INTERACTIVE RESET:</label>
                    <button class="tactile-btn variant-outline size-sm font-mono" @click="resetDemo">
                      🔄 RESET DEMO
                    </button>
                  </div>
                </div>

                <!-- Preview Stage Area -->
                <div class="preview-stage">
                  <div class="demo-element-container">
                    <!-- 1. Wavy Divider / Divider Preview -->
                    <template v-if="activeComp.id.includes('Wavy') || activeComp.id.includes('Divider')">
                      <div class="demo-wavy-container">
                        <div class="divider-meta-tag font-mono">
                          <span>STYLE: {{ wavyStyle.toUpperCase() }}</span>
                          <div class="mini-pills" style="margin-left: 0.5rem;">
                            <button class="mini-pill-btn" :class="{ active: wavyStyle === 'wave' }" @click="wavyStyle = 'wave'">WAVE</button>
                            <button class="mini-pill-btn" :class="{ active: wavyStyle === 'zigzag' }" @click="wavyStyle = 'zigzag'">ZIGZAG</button>
                          </div>
                        </div>

                        <!-- Wave SVG -->
                        <div v-if="wavyStyle === 'wave'" class="wavy-svg-wrapper">
                          <svg class="wavy-svg" viewBox="0 0 1200 28" preserveAspectRatio="none">
                            <path
                              d="M0,14 C150,28 350,0 500,14 C650,28 850,0 1000,14 C1100,24 1150,6 1200,14"
                              fill="none"
                              :stroke="getVariantColor(demoVariant)"
                              stroke-width="5"
                              stroke-linecap="round"
                            />
                          </svg>
                        </div>

                        <!-- Zigzag SVG -->
                        <div v-else class="wavy-svg-wrapper">
                          <svg class="wavy-svg" viewBox="0 0 1200 24" preserveAspectRatio="none">
                            <path
                              d="M0,12 L30,0 L60,24 L90,0 L120,24 L150,0 L180,24 L210,0 L240,24 L270,0 L300,24 L330,0 L360,24 L390,0 L420,24 L450,0 L480,24 L510,0 L540,24 L570,0 L600,24 L630,0 L660,24 L690,0 L720,24 L750,0 L780,24 L810,0 L840,24 L870,0 L900,24 L930,0 L960,24 L990,0 L1020,24 L1050,0 L1080,24 L1110,0 L1140,24 L1170,0 L1200,12"
                              fill="none"
                              :stroke="getVariantColor(demoVariant)"
                              stroke-width="4"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </div>

                        <div class="divider-center-badge font-mono" :style="{ backgroundColor: getVariantColor(demoVariant) }">
                          ★ CRML WAVY DIVIDER • ZERO BLUR ★
                        </div>
                      </div>
                    </template>

                    <!-- 2. Button Types -->
                    <template v-else-if="activeComp.id.includes('Button')">
                      <button
                        :class="['tactile-btn', `variant-${demoVariant}`, `size-${demoSize}`]"
                        @click="demoClicks++"
                      >
                        ⚡ {{ activeComp.name }} (CLICKS: {{ demoClicks }})
                      </button>
                    </template>

                    <!-- 3. Badge Types -->
                    <template v-else-if="activeComp.id.includes('Badge')">
                      <span :class="['badge-chip', `variant-${demoVariant}`, 'demo-badge-large']">
                        ★ {{ activeComp.name }} // SYSTEM ACTIVE 100%
                      </span>
                    </template>

                    <!-- 4. Marquee Banner -->
                    <template v-else-if="activeComp.id.includes('Marquee')">
                      <div class="demo-marquee-box font-mono" :class="`accent-${demoVariant}`">
                        <div class="marquee-inner">
                          ⚡ CRML TACTILE MARQUEE // 0% AMBIENT BLUR // 100% REBOUND PHYSICS // ECOSYSTEM v5.5 ⚡
                        </div>
                      </div>
                    </template>

                    <!-- 5. Avatar Types -->
                    <template v-else-if="activeComp.id.includes('Avatar')">
                      <div class="demo-avatar-box font-heading" :class="`variant-${demoVariant}`">
                        <span class="avatar-letter">K</span>
                        <span class="avatar-online-dot">●</span>
                      </div>
                    </template>

                    <!-- 6. Kbd Keycap -->
                    <template v-else-if="activeComp.id.includes('Kbd')">
                      <div class="demo-kbd-row font-mono">
                        <kbd class="tactile-kbd">⌘</kbd>
                        <kbd class="tactile-kbd">SHIFT</kbd>
                        <kbd class="tactile-kbd" :class="`variant-${demoVariant}`">K</kbd>
                      </div>
                    </template>

                    <!-- 7. Speech Bubble -->
                    <template v-else-if="activeComp.id.includes('Speech')">
                      <div class="demo-speech-bubble font-mono" :class="`variant-${demoVariant}`">
                        <span>"Zero ambient blur, strict ink borders, and physical spring rebound physics!"</span>
                        <div class="bubble-pointer" />
                      </div>
                    </template>

                    <!-- 8. Progress -->
                    <template v-else-if="activeComp.id.includes('Progress')">
                      <div class="demo-progress-wrap font-mono">
                        <div class="progress-bar-head">
                          <span>SYSTEM TELEMETRY</span>
                          <span>{{ demoProgress }}%</span>
                        </div>
                        <div class="progress-track">
                          <div class="progress-fill" :class="`variant-${demoVariant}`" :style="{ width: demoProgress + '%' }" />
                        </div>
                        <div class="progress-ctrls">
                          <button class="mini-pill-btn" @click="demoProgress = Math.max(0, demoProgress - 15)">- 15%</button>
                          <button class="mini-pill-btn" @click="demoProgress = Math.min(100, demoProgress + 15)">+ 15%</button>
                        </div>
                      </div>
                    </template>

                    <!-- 9. Input / Textarea / Form Types -->
                    <template v-else-if="activeComp.id.includes('Input') || activeComp.id.includes('Textarea') || activeComp.id.includes('Date') || activeComp.id.includes('Time') || activeComp.id.includes('Color')">
                      <div class="demo-form-group font-mono">
                        <label class="form-group-lbl">{{ activeComp.name.toUpperCase() }}</label>
                        <input
                          type="text"
                          class="tactile-input font-mono"
                          :class="`variant-${demoVariant}`"
                          :value="demoInputVal || '@crml_pilot'"
                          @input="demoInputVal = ($event.target as HTMLInputElement).value"
                        />
                        <span class="form-hint">Solid 2.5px ink border with 3D offset ink shadow.</span>
                      </div>
                    </template>

                    <!-- 10. Switch / Checkbox / Toggle -->
                    <template v-else-if="activeComp.id.includes('Switch') || activeComp.id.includes('Check') || activeComp.id.includes('Toggle')">
                      <div class="demo-toggle-row font-mono" @click="demoToggle = !demoToggle">
                        <div class="switch-track" :class="[{ active: demoToggle }, `variant-${demoVariant}`]">
                          <div class="switch-thumb" />
                        </div>
                        <span class="toggle-state-text">STATE: {{ demoToggle ? 'ACTIVE / ON' : 'DISABLED / OFF' }}</span>
                      </div>
                    </template>

                    <!-- 11. Dual Slider -->
                    <template v-else-if="activeComp.id.includes('Slider')">
                      <div class="demo-slider-box font-mono">
                        <div class="slider-head">
                          <span>RANGE FILTER:</span>
                          <span :class="['badge-chip', `variant-${demoVariant}`]">${{ sliderMin }} — ${{ sliderMax }}</span>
                        </div>
                        <div class="slider-track-wrap">
                          <input type="range" min="0" max="1000" v-model.number="sliderMin" class="native-range" />
                          <input type="range" min="0" max="1000" v-model.number="sliderMax" class="native-range" />
                        </div>
                      </div>
                    </template>

                    <!-- 12. Generic Card / Container / Organisms -->
                    <template v-else>
                      <div class="demo-generic-card font-mono" :class="`accent-${demoVariant}`">
                        <div class="generic-card-top font-heading">
                          <span>📦 {{ activeComp.name }}</span>
                          <span class="card-status-dot">● READY</span>
                        </div>
                        <p class="generic-card-body">{{ activeComp.desc }}</p>
                        <div class="generic-card-footer">
                          <span class="footer-tag font-mono">// ZERO AMBIENT BLUR</span>
                          <button :class="['tactile-btn', `variant-${demoVariant}`, 'size-sm']">ACTION</button>
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
              </div>
            </div>

            <!-- Multi-Framework Code Snippet Box -->
            <div class="doc-section-card">
              <div class="card-bar font-mono">
                <span>📋 {{ activeFw.toUpperCase() }} IMPLEMENTATION CODE SNIPPET</span>
                <button
                  class="mini-copy-btn font-mono"
                  @click="copyText(activeComponentCode, 'compCode')"
                >
                  {{ copiedId === 'compCode' ? '✓ SNIPPET COPIED!' : '📋 COPY ' + activeFw.toUpperCase() + ' CODE' }}
                </button>
              </div>

              <div class="code-snippet-pre font-mono">
                <pre><code>{{ activeComponentCode }}</code></pre>
              </div>
            </div>

            <!-- Props Specification Table -->
            <div class="doc-section-card">
              <div class="card-bar font-heading">
                <span>⚙️ PROPS & PARAMETERS SPECIFICATION ({{ (activeComp.apiData || []).length }})</span>
                <span class="card-bar-tag font-mono">// VUE PROPS / REACT PROPS / SVELTE PROPS</span>
              </div>

              <div class="table-wrap">
                <table v-if="activeComp.apiData && activeComp.apiData.length > 0" class="doc-spec-table font-mono">
                  <thead>
                    <tr>
                      <th style="width: 22%;">PROP NAME</th>
                      <th style="width: 33%;">TYPE</th>
                      <th style="width: 15%;">DEFAULT</th>
                      <th>DESCRIPTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="prop in activeComp.apiData" :key="prop.prop">
                      <td class="prop-name font-heading"><code class="prop-tag">{{ prop.prop }}</code></td>
                      <td><code class="type-tag">{{ prop.type }}</code></td>
                      <td><code class="default-tag">{{ prop.default }}</code></td>
                      <td class="desc-cell">{{ prop.desc }}</td>
                    </tr>
                  </tbody>
                </table>
                <div v-else class="empty-spec-message font-mono">
                  Komponen ini menggunakan slot default tanpa required props khusus.
                </div>
              </div>
            </div>

            <!-- Slots Specification Table (If Available) -->
            <div v-if="activeComp.slotsData && activeComp.slotsData.length > 0" class="doc-section-card">
              <div class="card-bar font-heading">
                <span>🔌 SLOTS & TEMPLATE CUSTOMIZATION ({{ activeComp.slotsData.length }})</span>
                <span class="card-bar-tag font-mono">// NAMED & SCOPED SLOTS</span>
              </div>

              <div class="table-wrap">
                <table class="doc-spec-table font-mono">
                  <thead>
                    <tr>
                      <th style="width: 25%;">SLOT NAME</th>
                      <th style="width: 30%;">BINDINGS / SCOPE</th>
                      <th>DESCRIPTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="slot in activeComp.slotsData" :key="slot.slot">
                      <td class="prop-name font-heading"><code class="prop-tag slot-accent">#{{ slot.slot }}</code></td>
                      <td><code class="type-tag">{{ slot.bindings }}</code></td>
                      <td class="desc-cell">{{ slot.desc }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Events Specification Table (If Available) -->
            <div v-if="activeComp.eventsData && activeComp.eventsData.length > 0" class="doc-section-card">
              <div class="card-bar font-heading">
                <span>⚡ EMITTED EVENTS & EVENT LISTENERS ({{ activeComp.eventsData.length }})</span>
                <span class="card-bar-tag font-mono">// V-MODEL & CUSTOM EMITS</span>
              </div>

              <div class="table-wrap">
                <table class="doc-spec-table font-mono">
                  <thead>
                    <tr>
                      <th style="width: 25%;">EVENT NAME</th>
                      <th style="width: 30%;">PAYLOAD / ARGUMENTS</th>
                      <th>TRIGGER DESCRIPTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="ev in activeComp.eventsData" :key="ev.event">
                      <td class="prop-name font-heading"><code class="prop-tag event-accent">@{{ ev.event }}</code></td>
                      <td><code class="type-tag">{{ ev.payload }}</code></td>
                      <td class="desc-cell">{{ ev.desc }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>

    <!-- Parity Matrix Table Section -->
    <section class="section-container" id="parity">
      <div class="section-title-bar">
        <span class="sticker-chip variant-cyan tilt-none">PARITY MATRIX</span>
        <h2 class="section-main-title font-heading">
          COMPLETE 70-COMPONENT CROSS-FRAMEWORK AUDIT
        </h2>
        <span class="section-sub-tag font-mono">// 100% PARITY BETWEEN VUE, REACT, SVELTE & HTML</span>
      </div>

      <div class="matrix-card">
        <div class="matrix-filter-bar">
          <input
            type="text"
            v-model="matrixSearch"
            class="tactile-input font-mono matrix-search-input"
            placeholder="Filter matrix table..."
          />

          <div class="matrix-cat-pills">
            <button
              v-for="cat in ['ALL', 'FORM & INPUT SUITE', 'BUTTONS & BADGES', 'CONTAINERS & CARDS', 'NAV & FEEDBACK', 'DATA & TELEMETRY GADGETS']"
              :key="cat"
              class="cat-pill font-mono"
              :class="{ active: matrixCat === cat }"
              @click="matrixCat = cat"
            >
              {{ cat }}
            </button>
          </div>
        </div>

        <div class="table-scroll-wrap">
          <table class="parity-table font-mono">
            <thead>
              <tr>
                <th style="width: 260px;">COMPONENT NAME</th>
                <th style="width: 180px;">CATEGORY</th>
                <th style="width: 120px;">VUE 3</th>
                <th style="width: 120px;">REACT</th>
                <th style="width: 120px;">SVELTE</th>
                <th style="width: 120px;">HTML5</th>
                <th>DOCS STATUS</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in flatCatalogList"
                :key="item.id"
                class="clickable-row"
                @click="selectedCompId = item.id; scrollToSection('catalog')"
              >
                <td class="comp-cell font-heading">
                  <span class="comp-icon">{{ item.icon }}</span> {{ item.name }}
                </td>
                <td><span class="cat-tag">{{ item.category }}</span></td>
                <td><span class="check-tag vue-check">✅ VUE 3</span></td>
                <td><span class="check-tag react-check">✅ TSX</span></td>
                <td><span class="check-tag svelte-check">✅ SVELTE</span></td>
                <td><span class="check-tag html-check">✅ HTML5</span></td>
                <td><span class="status-pill">100% DOKUMENTASI ↗</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="main-footer font-mono">
      <div class="footer-top">
        <span class="footer-logo font-heading">CRML - UI</span>
        <span>TACTILE NEUBRUTALISM • ZERO AMBIENT BLUR • 70 PRIMITIVES</span>
      </div>
      <div class="footer-bottom">
        <span>© 2026 CRML-UI Ecosystem Team. Distributed under MIT License.</span>
        <span>Independent Dashboard & Documentation Website at C:\Code\crml-ui-dashboard</span>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { CATALOG_DATA, type CatalogItem } from './catalog'

// -------------------------------------------------------------
// Framework Definitions & Metadata
// -------------------------------------------------------------
type FrameworkKey = 'vue' | 'react' | 'svelte' | 'html'
const activeFw = ref<FrameworkKey>('vue')

const frameworks = [
  { id: 'vue' as FrameworkKey, name: 'Vue 3', icon: '🟢', badge: 'MASTER PACKAGE' },
  { id: 'react' as FrameworkKey, name: 'React', icon: '⚛️', badge: 'v18 / 19' },
  { id: 'svelte' as FrameworkKey, name: 'Svelte', icon: '🧡', badge: 'v5.0+' },
  { id: 'html' as FrameworkKey, name: 'HTML5', icon: '🌐', badge: 'STANDALONE' }
]

const frameworkMeta: Record<FrameworkKey, {
  fullName: string
  packageName: string
  type: string
  version: string
  desc: string
  isNpm: boolean
  installCmd: string
  npmUrl: string
  quickSnippet: string
}> = {
  vue: {
    fullName: 'Vue 3 (crml-ui)',
    packageName: 'crml-ui',
    type: 'NPM PACKAGE // VITE LIBRARY',
    version: 'v0.1.0 • ESM & UMD',
    desc: 'The master implementation with 70 tactile primitives, Composition API <script setup lang="ts">, strict TypeScript types, and deep slot customizability.',
    isNpm: true,
    installCmd: 'npm install crml-ui',
    npmUrl: 'https://www.npmjs.com/package/crml-ui',
    quickSnippet: [
      "// Quick Vue 3 setup in main.ts:",
      "import { createApp } from 'vue';",
      "import App from './App.vue';",
      "import 'crml-ui/dist/style.css';",
      "import { CrmlUI } from 'crml-ui';",
      "",
      "const app = createApp(App);",
      "app.use(CrmlUI);",
      "app.mount('#app');"
    ].join('\n')
  },
  react: {
    fullName: 'React (crml-ui-react)',
    packageName: 'crml-ui-react',
    type: 'NPM PACKAGE // REACT 18/19',
    version: 'v0.1.0 • TSX BUNDLE',
    desc: 'Fully typed React TSX components with identical tactile spring rebound physics, 0% ambient blur, and props parity for Next.js, Remix, and Vite.',
    isNpm: true,
    installCmd: 'npm install crml-ui-react',
    npmUrl: 'https://www.npmjs.com/package/crml-ui-react',
    quickSnippet: [
      "// Quick React usage:",
      "import React from 'react';",
      "import 'crml-ui-react/dist/style.css';",
      "import { CrmlBouncyButton, CrmlBadge } from 'crml-ui-react';",
      "",
      "export function App() {",
      "  return (",
      "    <div>",
      "      <CrmlBouncyButton variant=\"lime\">TACTILE CTA</CrmlBouncyButton>",
      "      <CrmlBadge variant=\"pink\">STATUS</CrmlBadge>",
      "    </div>",
      "  );",
      "}"
    ].join('\n')
  },
  svelte: {
    fullName: 'Svelte (crml-ui-svelte)',
    packageName: 'crml-ui-svelte',
    type: 'NPM PACKAGE // SVELTE 4/5',
    version: 'v0.1.0 • SVELTE KIT',
    desc: 'High-performance reactive components for Svelte 4 and Svelte 5 with native slots, event forwarding, and identical Neubrutal styling.',
    isNpm: true,
    installCmd: 'npm install crml-ui-svelte',
    npmUrl: 'https://www.npmjs.com/package/crml-ui-svelte',
    quickSnippet: [
      "<!-- Quick Svelte usage: -->",
      "<script>",
      "  import { CrmlBouncyButton, CrmlBadge } from 'crml-ui-svelte';",
      "  import 'crml-ui-svelte/dist/style.css';",
      "<\/script>",
      "",
      "<CrmlBouncyButton variant=\"lime\">TACTILE SVELTE</CrmlBouncyButton>",
      "<CrmlBadge variant=\"pink\">STATUS<\/CrmlBadge>"
    ].join('\n')
  },
  html: {
    fullName: 'Vanilla HTML5 & CSS (crml-ui-html)',
    packageName: 'crml-ui-html',
    type: 'STANDALONE TEMPLATE // ZERO DEPENDENCY',
    version: 'v0.1.0 • PURE HTML5',
    desc: 'Pure HTML5 + CSS tactile elements. Zero bundlers, zero framework runtime. Download the starter HTML and CSS tokens to build instantly.',
    isNpm: false,
    installCmd: 'Download starter kit below',
    npmUrl: 'https://www.npmjs.com/search?q=crml-ui',
    quickSnippet: [
      "<!-- Quick Vanilla HTML5 usage: -->",
      "<link rel=\"stylesheet\" href=\"./css/crml-neubrutal.css\">",
      "",
      "<button class=\"crml-btn crml-btn--lime\">",
      "  TACTILE CTA",
      "</button>"
    ].join('\n')
  }
}

const activeFwMeta = computed(() => frameworkMeta[activeFw.value])

// -------------------------------------------------------------
// Component Catalog State & Computed
// -------------------------------------------------------------
const searchQuery = ref('')
const selectedCategory = ref('ALL')
const selectedCompId = ref('CrmlWavyDivider')

const demoVariant = ref<'lime' | 'pink' | 'cyan' | 'yellow'>('lime')
const demoSize = ref<'sm' | 'md' | 'lg'>('md')
const demoClicks = ref(0)
const demoToggle = ref(true)
const demoInputVal = ref('')
const demoProgress = ref(68)
const wavyStyle = ref<'wave' | 'zigzag'>('wave')
const sliderMin = ref(250)
const sliderMax = ref(750)

const copiedId = ref('')

const totalComponentCount = computed(() => {
  return CATALOG_DATA.reduce((acc, cat) => acc + cat.items.length, 0)
})

const filteredComponents = computed(() => {
  let list: CatalogItem[] = []
  if (selectedCategory.value === 'ALL') {
    list = CATALOG_DATA.flatMap(c => c.items)
  } else {
    const found = CATALOG_DATA.find(c => c.name === selectedCategory.value)
    list = found ? found.items : []
  }

  if (!searchQuery.value.trim()) return list
  const q = searchQuery.value.toLowerCase()
  return list.filter(item => {
    return item.name.toLowerCase().includes(q) ||
      item.desc.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      (item.apiData && item.apiData.some(p => p.prop.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)))
  })
})

const activeComp = computed<CatalogItem>(() => {
  for (const cat of CATALOG_DATA) {
    const item = cat.items.find(i => i.id === selectedCompId.value)
    if (item) return item
  }
  return CATALOG_DATA[0].items[0]
})

function getVariantColor(v: 'lime' | 'pink' | 'cyan' | 'yellow'): string {
  switch (v) {
    case 'lime': return '#CCFF00'
    case 'pink': return '#FF007F'
    case 'cyan': return '#00F0FF'
    case 'yellow': return '#FFD600'
    default: return '#CCFF00'
  }
}

function resetDemo() {
  demoClicks.value = 0
  demoToggle.value = true
  demoInputVal.value = ''
  demoProgress.value = 68
  wavyStyle.value = 'wave'
  sliderMin.value = 250
  sliderMax.value = 750
}

// Parity Matrix Computed
const matrixSearch = ref('')
const matrixCat = ref('ALL')

const flatCatalogList = computed(() => {
  let list = CATALOG_DATA.flatMap(c => c.items)
  if (matrixCat.value !== 'ALL') {
    const catObj = CATALOG_DATA.find(c => c.name === matrixCat.value)
    list = catObj ? catObj.items : []
  }
  if (!matrixSearch.value.trim()) return list
  const q = matrixSearch.value.toLowerCase()
  return list.filter(i => i.name.toLowerCase().includes(q) || i.category.toLowerCase().includes(q))
})

// -------------------------------------------------------------
// Dynamic Multi-Framework Code Generator
// -------------------------------------------------------------
function toKebabCase(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

const activeComponentCode = computed(() => {
  const comp = activeComp.value
  const name = comp.name
  const kebab = toKebabCase(name)
  const variant = demoVariant.value

  if (activeFw.value === 'vue') {
    if (name.includes('Wavy')) {
      return [
        '<!-- CrmlWavyDivider.vue (Vue 3 Composition API) -->',
        '<template>',
        `  <CrmlWavyDivider styleType="${wavyStyle.value}" color="${getVariantColor(variant)}" strokeWidth="4" />`,
        '</template>',
        '',
        '<script setup lang="ts">',
        "import { CrmlWavyDivider } from 'crml-ui';",
        '<\/script>'
      ].join('\n')
    }

    const propsSnippet = (comp.apiData || [])
      .slice(0, 3)
      .map(p => {
        if (p.prop === 'variant') return `variant="${variant}"`
        if (p.prop.includes('model')) return 'v-model="modelValue"'
        if (p.type === 'boolean') return p.prop
        return `:${p.prop}="${p.default.replace(/'/g, '')}"`
      })
      .join(' ')

    return [
      `<!-- ${name}.vue (Vue 3 Composition API) -->`,
      '<template>',
      `  <${name} ${propsSnippet}>`,
      `    ${comp.type.toUpperCase()}`,
      `  </${name}>`,
      '</template>',
      '',
      '<script setup lang="ts">',
      `import { ${name} } from 'crml-ui';`,
      'import { ref } from "vue";',
      '',
      'const modelValue = ref("");',
      '<\/script>'
    ].join('\n')
  }

  if (activeFw.value === 'react') {
    return [
      `// ${name}.tsx (React 18 / 19)`,
      "import React, { useState } from 'react';",
      `import { ${name} } from 'crml-ui-react';`,
      "import 'crml-ui-react/dist/style.css';",
      "",
      `export function Demo${name}() {`,
      '  const [val, setVal] = useState("");',
      '',
      '  return (',
      `    <${name}`,
      `      variant="${variant}"`,
      '      size="md"',
      '    >',
      `      ${comp.type.toUpperCase()}`,
      `    </${name}>`,
      '  );',
      '}'
    ].join('\n')
  }

  if (activeFw.value === 'svelte') {
    return [
      `<!-- ${name}.svelte (Svelte 5 / 4) -->`,
      '<script>',
      `  import { ${name} } from 'crml-ui-svelte';`,
      "  import 'crml-ui-svelte/dist/style.css';",
      '  let val = "";',
      '<\/script>',
      '',
      `<${name} variant="${variant}" size="md">`,
      `  ${comp.type.toUpperCase()}`,
      `</${name}>`
    ].join('\n')
  }

  // HTML5
  return [
    `<!-- ${name} (Vanilla HTML5 & CSS) -->`,
    '<!-- 1. Include Tokens -->',
    '<link rel="stylesheet" href="./css/crml-neubrutal.css">',
    '',
    '<!-- 2. Semantic Tactile Component -->',
    `<div class="${kebab} ${kebab}--${variant}">`,
    `  <span class="${kebab}__label">${comp.type.toUpperCase()}</span>`,
    '</div>'
  ].join('\n')
})

// -------------------------------------------------------------
// Interactive Utility Actions
// -------------------------------------------------------------
function copyText(text: string, id: string) {
  navigator.clipboard.writeText(text)
  copiedId.value = id
  setTimeout(() => {
    if (copiedId.value === id) copiedId.value = ''
  }, 2000)
}

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

function triggerHtmlDownload() {
  const htmlDoc = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CRML-UI HTML5 Starter Template</title>
  <link rel="stylesheet" href="./css/crml-tokens.css">
  <style>
    body { font-family: monospace; background: #FAFAFA; padding: 2rem; color: #0D0D0D; }
    .crml-btn { padding: 0.75rem 1.5rem; border: 3px solid #0D0D0D; background: #CCFF00; font-weight: 900; box-shadow: 4px 4px 0px #0D0D0D; cursor: pointer; transition: all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1); }
    .crml-btn:active { transform: translate(3px, 3px); box-shadow: 1px 1px 0px #0D0D0D; }
  </style>
</head>
<body>
  <h1>⚡ CRML - UI STARTER TEMPLATE</h1>
  <p>Production Neubrutalism & Y2K Cyber Mecha with 0% Ambient Blur.</p>
  <button class="crml-btn">TACTILE BUTTON</button>
</body>
</html>`

  const blob = new Blob([htmlDoc], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'crml-ui-starter.html'
  a.click()
  URL.revokeObjectURL(url)
}

function triggerCssDownload() {
  const cssContent = `:root {
  --crt-electric-lime: #CCFF00;
  --crt-hot-pink: #FF007F;
  --crt-cyber-cyan: #00F0FF;
  --crt-sunburst-yellow: #FFD600;
  --crt-obsidian: #0D0D0D;
  --crt-pure-white: #FFFFFF;
  --crml-border-brutal: 3px solid #0D0D0D;
  --crml-shadow-brutal: 4px 4px 0px #0D0D0D;
}`

  const blob = new Blob([cssContent], { type: 'text/css' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'crml-tokens.css'
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<style>
/* =====================================================================
   GLOBAL TACTILE NEUBRUTALISM & CYBER MECHA STYLING
   ===================================================================== */
:root {
  --crml-bg-base: #FAFAFA;
  --crml-bg-surface: #FFFFFF;
  --crml-bg-elevated: #F0F0F0;
  --crml-text-main: #0D0D0D;
  --crml-text-muted: #555555;
  --crt-electric-lime: #CCFF00;
  --crt-hot-pink: #FF007F;
  --crt-cyber-cyan: #00F0FF;
  --crt-sunburst-yellow: #FFD600;
  --crt-obsidian: #0D0D0D;
  --crt-pure-white: #FFFFFF;
  --crml-border-brutal: 3px solid #0D0D0D;
  --crml-border-subtle: 2px solid #0D0D0D;
  --crml-shadow-brutal: 4px 4px 0px #0D0D0D;
  --crml-shadow-brutal-sm: 2px 2px 0px #0D0D0D;
  --crml-shadow-brutal-lg: 6px 6px 0px #0D0D0D;
  --crml-font-heading: 'Cabinet Grotesk', 'Space Grotesk', sans-serif;
  --crml-font-mono: 'Space Mono', monospace;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--crml-bg-base);
  color: var(--crml-text-main);
  overflow-x: hidden;
}

.font-heading {
  font-family: var(--crml-font-heading);
  font-weight: 900;
  letter-spacing: -0.01em;
}

.font-mono {
  font-family: var(--crml-font-mono);
}

.dashboard-root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Top Cyber Banner */
.top-announcement-bar {
  background-color: var(--crt-obsidian);
  color: var(--crt-pure-white);
  padding: 0.45rem 1.5rem;
  font-size: 0.8rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  border-bottom: 2px solid var(--crt-electric-lime);
  flex-wrap: wrap;
}

.announcement-divider {
  color: var(--crt-hot-pink);
}

/* Navigation Header */
.main-nav-header {
  padding: 1.25rem 2rem;
  background-color: var(--crt-pure-white);
  border-bottom: var(--crml-border-brutal);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  flex-wrap: wrap;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.brand-block {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.brand-logo-chip {
  background-color: var(--crt-electric-lime);
  border: var(--crml-border-brutal);
  padding: 0.4rem 0.85rem;
  font-size: 1.35rem;
  box-shadow: var(--crml-shadow-brutal-sm);
  border-radius: 6px;
}

.logo-accent {
  color: var(--crt-hot-pink);
}

.brand-title {
  font-size: 1.25rem;
  line-height: 1.1;
}

.brand-sub {
  font-size: 0.75rem;
  color: var(--crml-text-muted);
}

.header-action-links {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

/* Tactile Buttons */
.tactile-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  padding: 0.65rem 1.25rem;
  border: var(--crml-border-brutal);
  border-radius: 6px;
  box-shadow: var(--crml-shadow-brutal);
  font-family: var(--crml-font-heading);
  font-size: 0.85rem;
  font-weight: 800;
  cursor: pointer;
  text-decoration: none;
  color: var(--crt-obsidian);
  transition: all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.tactile-btn:hover {
  transform: translate(-1px, -1px);
  box-shadow: 5px 5px 0px var(--crt-obsidian);
}

.tactile-btn:active {
  transform: translate(3px, 3px);
  box-shadow: 1px 1px 0px var(--crt-obsidian);
}

.variant-lime { background-color: var(--crt-electric-lime); color: var(--crt-obsidian); }
.variant-pink { background-color: var(--crt-hot-pink); color: var(--crt-pure-white); }
.variant-cyan { background-color: var(--crt-cyber-cyan); color: var(--crt-obsidian); }
.variant-yellow { background-color: var(--crt-sunburst-yellow); color: var(--crt-obsidian); }
.variant-obsidian { background-color: var(--crt-obsidian); color: var(--crt-pure-white); }
.variant-outline { background-color: var(--crt-pure-white); color: var(--crt-obsidian); }

.size-sm { padding: 0.4rem 0.85rem; font-size: 0.78rem; }
.size-md { padding: 0.65rem 1.25rem; font-size: 0.85rem; }
.size-lg { padding: 0.9rem 1.65rem; font-size: 1rem; }

/* Chips & Badges */
.sticker-chip {
  display: inline-block;
  padding: 0.25rem 0.65rem;
  border: var(--crml-border-brutal);
  font-family: var(--crml-font-heading);
  font-size: 0.75rem;
  font-weight: 900;
  box-shadow: var(--crml-shadow-brutal-sm);
  border-radius: 4px;
}
.sticker-chip.tilt-right { transform: rotate(2.5deg); }

.badge-chip {
  display: inline-block;
  padding: 0.25rem 0.6rem;
  border: 2px solid var(--crt-obsidian);
  font-family: var(--crml-font-mono);
  font-size: 0.725rem;
  font-weight: 700;
  border-radius: 4px;
  box-shadow: 2px 2px 0px var(--crt-obsidian);
}

/* Hero Section */
.hero-section {
  max-width: 1400px;
  margin: 2rem auto;
  padding: 0 1.5rem;
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 2rem;
  align-items: stretch;
}
@media (max-width: 1024px) {
  .hero-section { grid-template-columns: 1fr; }
}

.hero-badges-cluster {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1.25rem;
}

.hero-heading {
  font-size: 3.5rem;
  line-height: 1.05;
  margin-bottom: 1.25rem;
  letter-spacing: -0.02em;
}
@media (max-width: 640px) {
  .hero-heading { font-size: 2.5rem; }
}

.hero-highlight {
  background-color: var(--crt-electric-lime);
  padding: 0 0.4rem;
  border: var(--crml-border-brutal);
  box-shadow: var(--crml-shadow-brutal-sm);
  display: inline-block;
}

.hero-description {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--crml-text-muted);
  margin-bottom: 1.75rem;
}

.hero-stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}
@media (max-width: 640px) {
  .hero-stats-row { grid-template-columns: repeat(2, 1fr); }
}

.stat-box {
  background: var(--crt-pure-white);
  border: var(--crml-border-brutal);
  padding: 1rem;
  border-radius: 8px;
  box-shadow: var(--crml-shadow-brutal);
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.stat-num {
  font-size: 1.85rem;
  color: var(--crt-hot-pink);
}

.stat-label {
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--crml-text-muted);
}

/* Distribution Box */
.distribution-header-card {
  background: var(--crt-pure-white);
  border: var(--crml-border-brutal);
  border-radius: 12px;
  box-shadow: var(--crml-shadow-brutal-lg);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  height: 100%;
}

.dist-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px dashed var(--crt-obsidian);
  padding-bottom: 0.75rem;
  font-size: 0.95rem;
}

.live-dot {
  color: #00C853;
  font-size: 0.75rem;
  animation: pulse 1.5s infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.fw-toggle-pills {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
}
@media (max-width: 640px) {
  .fw-toggle-pills { grid-template-columns: repeat(2, 1fr); }
}

.fw-toggle-btn {
  background: var(--crml-bg-elevated);
  border: 2px solid var(--crt-obsidian);
  border-radius: 6px;
  padding: 0.65rem 0.35rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  cursor: pointer;
  transition: all 0.15s ease;
}

.fw-toggle-btn.active {
  background: var(--crt-electric-lime);
  box-shadow: var(--crml-shadow-brutal-sm);
  transform: translate(-1px, -1px);
}

.btn-icon { font-size: 1.25rem; }
.btn-label { font-size: 0.85rem; }
.btn-sub { font-size: 0.65rem; opacity: 0.8; }

.selected-fw-panel {
  background: var(--crml-bg-base);
  border: 2px solid var(--crt-obsidian);
  border-radius: 8px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.panel-top-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
}

.panel-type-tag {
  font-size: 0.7rem;
  color: var(--crt-hot-pink);
  font-weight: 700;
}

.panel-title {
  font-size: 1.35rem;
}

.package-version-pill {
  background: var(--crt-obsidian);
  color: var(--crt-pure-white);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.72rem;
}

.panel-desc {
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--crml-text-muted);
}

.npm-install-terminal {
  background: var(--crt-obsidian);
  border: 2px solid var(--crt-obsidian);
  border-radius: 6px;
  overflow: hidden;
  box-shadow: var(--crml-shadow-brutal-sm);
}

.terminal-bar {
  background: #1F1F1F;
  color: #888;
  padding: 0.35rem 0.75rem;
  font-size: 0.68rem;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #333;
}

.terminal-dots { color: #555; }

.terminal-content {
  padding: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--crt-pure-white);
}

.prompt-symbol { color: var(--crt-electric-lime); font-weight: 900; }
.command-text { flex: 1; font-size: 0.85rem; color: #FFF; }

.action-buttons-row {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.flex-1 { flex: 1; }

.npm-direct-link {
  text-align: center;
}

.html-download-box {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.download-info-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: var(--crml-text-muted);
}

.cdn-snippet-row {
  background: var(--crt-obsidian);
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.cdn-text {
  color: var(--crt-electric-lime);
  font-size: 0.75rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* =====================================================================
   DOCUMENTATION EXPLORER STYLING
   ===================================================================== */
.section-container {
  max-width: 1400px;
  margin: 3rem auto;
  padding: 0 1.5rem;
  width: 100%;
}

.section-title-bar {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.section-main-title {
  font-size: 2.2rem;
  letter-spacing: -0.02em;
}

.section-sub-tag {
  font-size: 0.8rem;
  color: var(--crml-text-muted);
}

.catalog-workspace-card {
  background: var(--crt-pure-white);
  border: var(--crml-border-brutal);
  border-radius: 12px;
  box-shadow: var(--crml-shadow-brutal-lg);
  overflow: hidden;
}

/* Toolbar */
.catalog-toolbar {
  padding: 1.25rem;
  background: var(--crml-bg-elevated);
  border-bottom: var(--crml-border-brutal);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.search-input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 1rem;
  font-size: 1rem;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 0.75rem 2.5rem 0.75rem 2.75rem;
  font-size: 0.9rem;
  background: #FFF;
}

.clear-search-btn {
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  color: var(--crml-text-muted);
}

.category-tabs-row {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.25rem;
}

.cat-tab-btn {
  padding: 0.45rem 0.9rem;
  border: 2px solid var(--crt-obsidian);
  border-radius: 6px;
  background: var(--crt-pure-white);
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s ease;
}

.cat-tab-btn.active {
  background: var(--crt-electric-lime);
  box-shadow: 2px 2px 0px var(--crt-obsidian);
  transform: translate(-1px, -1px);
}

/* Master-Detail Split: NO CUT-OFFS */
.catalog-split-layout {
  display: grid;
  grid-template-columns: 360px 1fr;
  min-height: 850px;
}
@media (max-width: 1024px) {
  .catalog-split-layout { grid-template-columns: 1fr; }
}

/* Navigation Aside */
.catalog-nav-aside {
  border-right: var(--crml-border-brutal);
  background: var(--crml-bg-base);
  display: flex;
  flex-direction: column;
  height: 950px;
}

.nav-aside-header {
  padding: 0.75rem 1rem;
  background: var(--crt-obsidian);
  color: var(--crt-pure-white);
  font-size: 0.72rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
}

.nav-hint { color: var(--crt-electric-lime); }

.component-list-scroll {
  overflow-y: auto;
  flex: 1;
}

.comp-list-item {
  padding: 0.85rem 1rem;
  border-bottom: 1px solid #E0E0E0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: background 0.1s ease;
}

.comp-list-item:hover {
  background: #FFF;
}

.comp-list-item.active {
  background: var(--crt-cyber-cyan);
  border-left: 6px solid var(--crt-obsidian);
  box-shadow: inset 0 0 0 1px var(--crt-obsidian);
}

.item-icon { font-size: 1.25rem; flex-shrink: 0; }
.item-text-col { flex: 1; min-width: 0; }
.item-name { font-size: 0.95rem; color: var(--crt-obsidian); }
.item-cat { font-size: 0.7rem; color: var(--crml-text-muted); }
.item-badge-pill {
  background: var(--crt-obsidian);
  color: var(--crt-electric-lime);
  font-size: 0.625rem;
  padding: 0.15rem 0.35rem;
  border-radius: 4px;
  font-weight: 700;
}

/* Detail Main Panel: EXPANDABLE, NO CRUSHING */
.catalog-detail-main {
  padding: 2rem;
  background: var(--crt-pure-white);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: 950px;
  overflow-y: auto;
}

.doc-header-card {
  background: var(--crml-bg-base);
  border: var(--crml-border-brutal);
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex-shrink: 0;
}

.doc-title-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  flex-wrap: wrap;
}

.doc-tag-badges {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
}

.active-comp-heading {
  font-size: 2.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.comp-icon-lg { font-size: 2.2rem; }

.code-target-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.target-lbl { font-size: 0.75rem; font-weight: 700; }

.target-pills {
  display: flex;
  border: 2px solid var(--crt-obsidian);
  border-radius: 6px;
  overflow: hidden;
}

.target-pill-btn {
  padding: 0.35rem 0.75rem;
  background: #FFF;
  border: none;
  border-right: 1px solid var(--crt-obsidian);
  font-size: 0.75rem;
  font-weight: 800;
  cursor: pointer;
}
.target-pill-btn:last-child { border-right: none; }
.target-pill-btn.active {
  background: var(--crt-electric-lime);
}

.doc-subhead {
  font-size: 0.9rem;
  margin-bottom: 0.35rem;
  color: var(--crt-obsidian);
}

.doc-desc-text {
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--crml-text-muted);
}

.doc-design-notes {
  background: #FFF9C4;
  border: 2px dashed #F57F17;
  padding: 0.85rem;
  border-radius: 6px;
}

.design-notes-text {
  font-size: 0.85rem;
  line-height: 1.5;
  color: #333;
}

/* Sections inside detail: flex-shrink 0 ensures NO compression/cut-offs */
.doc-section-card {
  border: var(--crml-border-brutal);
  border-radius: 8px;
  background: var(--crt-pure-white);
  box-shadow: var(--crml-shadow-brutal-sm);
  flex-shrink: 0;
  width: 100%;
  box-sizing: border-box;
}

.card-bar {
  background: var(--crt-obsidian);
  color: var(--crt-pure-white);
  padding: 0.75rem 1.25rem;
  font-size: 0.85rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.card-bar-tag { color: var(--crt-cyber-cyan); font-size: 0.72rem; }

.mini-copy-btn {
  background: var(--crt-electric-lime);
  color: var(--crt-obsidian);
  border: 2px solid var(--crt-obsidian);
  border-radius: 4px;
  padding: 0.3rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 2px 2px 0px var(--crt-obsidian);
}
.mini-copy-btn:active { transform: translate(1px, 1px); box-shadow: 1px 1px 0px var(--crt-obsidian); }

/* Preview Sandbox Area: TACTILE, FLEXIBLE, NEVER CUT OFF */
.preview-card-outer {
  min-height: fit-content;
}

.preview-canvas-wrap {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.canvas-controls-bar {
  padding: 0.85rem 1.25rem;
  background: #F3E8FF; /* Lilac Neubrutal Accent */
  border-bottom: 2px solid var(--crt-obsidian);
  display: flex;
  gap: 1.5rem;
  align-items: center;
  flex-wrap: wrap;
}

.ctrl-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
}

.mini-pills {
  display: flex;
  border: 1.5px solid var(--crt-obsidian);
  border-radius: 4px;
  overflow: hidden;
}

.mini-pill-btn {
  padding: 0.25rem 0.55rem;
  background: #FFF;
  border: none;
  border-right: 1px solid #CCC;
  font-size: 0.7rem;
  font-weight: 800;
  cursor: pointer;
}
.mini-pill-btn:last-child { border-right: none; }
.mini-pill-btn.active { background: var(--crt-electric-lime); }

.preview-stage {
  padding: 3rem 2rem;
  background: #FAFAFA;
  background-image: radial-gradient(#0D0D0D 1.5px, transparent 1.5px);
  background-size: 20px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 250px;
  width: 100%;
  box-sizing: border-box;
  overflow: visible;
}

.demo-element-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 650px;
}

/* ================= WAVY DIVIDER SPECIFIC PREVIEW ================= */
.demo-wavy-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  background: #FFFFFF;
  border: var(--crml-border-brutal);
  border-radius: 8px;
  box-shadow: var(--crml-shadow-brutal);
  padding: 2rem 1.5rem;
}

.divider-meta-tag {
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  font-weight: 800;
}

.wavy-svg-wrapper {
  width: 100%;
  padding: 0.75rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wavy-svg {
  width: 100%;
  height: 32px;
  display: block;
}

.divider-center-badge {
  padding: 0.4rem 1rem;
  border: 2.5px solid #0D0D0D;
  border-radius: 6px;
  box-shadow: var(--crml-shadow-brutal-sm);
  font-size: 0.8rem;
  font-weight: 900;
  color: #0D0D0D;
}

/* Marquee Preview */
.demo-marquee-box {
  width: 100%;
  background: #0D0D0D;
  color: #CCFF00;
  border: var(--crml-border-brutal);
  border-radius: 6px;
  box-shadow: var(--crml-shadow-brutal);
  padding: 0.85rem;
  overflow: hidden;
  white-space: nowrap;
}
.demo-marquee-box.accent-pink { color: #FF007F; }
.demo-marquee-box.accent-cyan { color: #00F0FF; }
.demo-marquee-box.accent-yellow { color: #FFD600; }
.marquee-inner {
  display: inline-block;
  animation: marqueeAnim 12s linear infinite;
  font-weight: 800;
}
@keyframes marqueeAnim {
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}

/* Avatar Preview */
.demo-avatar-box {
  width: 72px;
  height: 72px;
  border: var(--crml-border-brutal);
  border-radius: 50%;
  box-shadow: var(--crml-shadow-brutal);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.demo-avatar-box.variant-lime { background: var(--crt-electric-lime); }
.demo-avatar-box.variant-pink { background: var(--crt-hot-pink); color: #FFF; }
.demo-avatar-box.variant-cyan { background: var(--crt-cyber-cyan); }
.demo-avatar-box.variant-yellow { background: var(--crt-sunburst-yellow); }
.avatar-letter { font-size: 2rem; }
.avatar-online-dot { position: absolute; bottom: 0px; right: 0px; color: #00C853; font-size: 1.25rem; }

/* Kbd Preview */
.demo-kbd-row { display: flex; gap: 0.5rem; align-items: center; }
.tactile-kbd {
  padding: 0.5rem 0.85rem;
  background: #FFF;
  border: var(--crml-border-brutal);
  border-radius: 6px;
  box-shadow: 3px 3px 0px #0D0D0D;
  font-weight: 800;
  font-size: 1rem;
}
.tactile-kbd.variant-lime { background: var(--crt-electric-lime); }
.tactile-kbd.variant-pink { background: var(--crt-hot-pink); color: #FFF; }
.tactile-kbd.variant-cyan { background: var(--crt-cyber-cyan); }
.tactile-kbd.variant-yellow { background: var(--crt-sunburst-yellow); }

/* Speech Bubble Preview */
.demo-speech-bubble {
  background: #FFF;
  border: var(--crml-border-brutal);
  border-radius: 12px;
  box-shadow: var(--crml-shadow-brutal);
  padding: 1.25rem;
  font-weight: 700;
  font-size: 0.9rem;
  position: relative;
  max-width: 450px;
}
.demo-speech-bubble.variant-lime { background: #F1F8E9; border-color: #0D0D0D; }
.demo-speech-bubble.variant-pink { background: #FCE4EC; border-color: #0D0D0D; }
.demo-speech-bubble.variant-cyan { background: #E0F7FA; border-color: #0D0D0D; }
.demo-speech-bubble.variant-yellow { background: #FFFDE7; border-color: #0D0D0D; }

/* Progress Preview */
.demo-progress-wrap { width: 100%; max-width: 450px; display: flex; flex-direction: column; gap: 0.5rem; }
.progress-bar-head { display: flex; justify-content: space-between; font-weight: 800; font-size: 0.8rem; }
.progress-track { width: 100%; height: 24px; background: #FFF; border: var(--crml-border-brutal); border-radius: 6px; box-shadow: var(--crml-shadow-brutal-sm); overflow: hidden; }
.progress-fill { height: 100%; transition: width 0.3s ease; }
.progress-fill.variant-lime { background: var(--crt-electric-lime); }
.progress-fill.variant-pink { background: var(--crt-hot-pink); }
.progress-fill.variant-cyan { background: var(--crt-cyber-cyan); }
.progress-fill.variant-yellow { background: var(--crt-sunburst-yellow); }
.progress-ctrls { display: flex; gap: 0.5rem; justify-content: flex-end; }

/* Form Group Demo */
.demo-form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  max-width: 400px;
}
.form-group-lbl { font-size: 0.8rem; font-weight: 900; }
.form-hint { font-size: 0.725rem; color: var(--crml-text-muted); }

/* Switch Demo */
.demo-toggle-row {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  cursor: pointer;
  background: #FFF;
  border: var(--crml-border-brutal);
  padding: 0.85rem 1.5rem;
  border-radius: 8px;
  box-shadow: var(--crml-shadow-brutal);
}
.switch-track {
  width: 54px;
  height: 28px;
  background: #CCC;
  border: var(--crml-border-brutal);
  border-radius: 20px;
  position: relative;
  transition: all 0.2s ease;
}
.switch-track.active.variant-lime { background: var(--crt-electric-lime); }
.switch-track.active.variant-pink { background: var(--crt-hot-pink); }
.switch-track.active.variant-cyan { background: var(--crt-cyber-cyan); }
.switch-track.active.variant-yellow { background: var(--crt-sunburst-yellow); }
.switch-thumb {
  width: 20px;
  height: 20px;
  background: #FFF;
  border: 2px solid #0D0D0D;
  border-radius: 50%;
  position: absolute;
  top: 1px;
  left: 2px;
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.switch-track.active .switch-thumb {
  transform: translateX(24px);
  background: #0D0D0D;
}
.toggle-state-text { font-size: 0.85rem; font-weight: 800; }

/* Dual Slider Demo */
.demo-slider-box {
  width: 100%;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  background: #FFF;
  border: var(--crml-border-brutal);
  padding: 1.25rem;
  border-radius: 8px;
  box-shadow: var(--crml-shadow-brutal);
}
.slider-head { display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; font-weight: 800; }
.slider-track-wrap { display: flex; flex-direction: column; gap: 0.5rem; }
.native-range { width: 100%; accent-color: #0D0D0D; cursor: pointer; }

/* Generic Card Demo */
.demo-generic-card {
  background: #FFF;
  border: var(--crml-border-brutal);
  border-radius: 8px;
  box-shadow: var(--crml-shadow-brutal);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  box-sizing: border-box;
}
.demo-generic-card.accent-lime { border-top: 8px solid var(--crt-electric-lime); }
.demo-generic-card.accent-pink { border-top: 8px solid var(--crt-hot-pink); }
.demo-generic-card.accent-cyan { border-top: 8px solid var(--crt-cyber-cyan); }
.demo-generic-card.accent-yellow { border-top: 8px solid var(--crt-sunburst-yellow); }

.generic-card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.95rem;
}
.card-status-dot { color: #00C853; font-size: 0.75rem; }
.generic-card-body { font-size: 0.85rem; color: var(--crml-text-muted); line-height: 1.5; }
.generic-card-footer { display: flex; justify-content: space-between; align-items: center; }
.footer-tag { font-size: 0.72rem; color: #888; }
.demo-badge-large { font-size: 0.9rem; padding: 0.4rem 0.85rem; }

/* Code Snippet Box */
.code-snippet-pre {
  background: #0D0D0D;
  color: #FFF;
  padding: 1.25rem;
  font-size: 0.85rem;
  line-height: 1.5;
  overflow-x: auto;
}

/* Specification Tables */
.table-wrap {
  overflow-x: auto;
}

.doc-spec-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}

.doc-spec-table th {
  background: var(--crml-bg-elevated);
  border-bottom: 2px solid var(--crt-obsidian);
  padding: 0.85rem 1.25rem;
  text-align: left;
  font-weight: 800;
  font-size: 0.75rem;
}

.doc-spec-table td {
  padding: 0.85rem 1.25rem;
  border-bottom: 1px solid #E0E0E0;
  vertical-align: top;
}

.prop-tag {
  background: var(--crt-electric-lime);
  border: 1px solid var(--crt-obsidian);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 800;
  color: var(--crt-obsidian);
}

.prop-tag.slot-accent { background: var(--crt-cyber-cyan); }
.prop-tag.event-accent { background: var(--crt-hot-pink); color: #FFF; }

.type-tag {
  background: var(--crml-bg-elevated);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.78rem;
  color: #D32F2F;
}

.default-tag {
  background: #E8F5E9;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.78rem;
  color: #2E7D32;
}

.desc-cell {
  line-height: 1.5;
  color: #333;
}

.empty-spec-message {
  padding: 1.75rem;
  text-align: center;
  color: var(--crml-text-muted);
  font-size: 0.85rem;
}

/* =====================================================================
   PARITY MATRIX TABLE
   ===================================================================== */
.matrix-card {
  background: var(--crt-pure-white);
  border: var(--crml-border-brutal);
  border-radius: 12px;
  box-shadow: var(--crml-shadow-brutal-lg);
  overflow: hidden;
}

.matrix-filter-bar {
  padding: 1.25rem;
  background: var(--crml-bg-elevated);
  border-bottom: var(--crml-border-brutal);
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
}

.matrix-search-input {
  flex: 1;
  min-width: 250px;
}

.matrix-cat-pills {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.cat-pill {
  padding: 0.4rem 0.75rem;
  border: 2px solid var(--crt-obsidian);
  border-radius: 4px;
  background: #FFF;
  font-size: 0.725rem;
  font-weight: 700;
  cursor: pointer;
}
.cat-pill.active {
  background: var(--crt-cyber-cyan);
  box-shadow: 2px 2px 0px var(--crt-obsidian);
}

.table-scroll-wrap {
  overflow-x: auto;
  max-height: 500px;
}

.parity-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.825rem;
}

.parity-table th {
  background: var(--crt-obsidian);
  color: var(--crt-pure-white);
  padding: 0.75rem 1rem;
  text-align: left;
  font-size: 0.75rem;
  position: sticky;
  top: 0;
  z-index: 10;
}

.parity-table td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #E0E0E0;
}

.clickable-row {
  cursor: pointer;
  transition: background 0.1s ease;
}

.clickable-row:hover {
  background: #FFFDE7;
}

.comp-cell { font-size: 0.9rem; }
.cat-tag { background: #EEE; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.7rem; }
.check-tag { font-size: 0.75rem; font-weight: 700; padding: 0.2rem 0.5rem; border-radius: 4px; }
.vue-check { background: #E8F5E9; color: #1B5E20; }
.react-check { background: #E1F5FE; color: #0277BD; }
.svelte-check { background: #FBE9E7; color: #D84315; }
.html-check { background: #FFF3E0; color: #E65100; }
.status-pill { background: var(--crt-electric-lime); border: 1px solid #0D0D0D; padding: 0.2rem 0.5rem; border-radius: 4px; font-weight: 800; font-size: 0.72rem; }

/* Footer */
.main-footer {
  margin-top: 4rem;
  background: var(--crt-obsidian);
  color: var(--crt-pure-white);
  padding: 2.5rem 2rem;
  border-top: 4px solid var(--crt-electric-lime);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.footer-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #333;
  padding-bottom: 1.25rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-logo {
  font-size: 1.75rem;
  color: var(--crt-electric-lime);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #888;
  flex-wrap: wrap;
  gap: 0.5rem;
}

/* Tactile inputs */
.tactile-input {
  border: var(--crml-border-brutal);
  border-radius: 6px;
  padding: 0.65rem 0.85rem;
  font-size: 0.85rem;
  outline: none;
  box-shadow: var(--crml-shadow-brutal-sm);
  transition: all 0.15s ease;
}

.tactile-input:focus {
  border-color: var(--crt-hot-pink);
  box-shadow: 3px 3px 0px var(--crt-hot-pink);
}

.tactile-input.variant-lime:focus { border-color: var(--crt-electric-lime); box-shadow: 3px 3px 0px var(--crt-electric-lime); }
.tactile-input.variant-pink:focus { border-color: var(--crt-hot-pink); box-shadow: 3px 3px 0px var(--crt-hot-pink); }
.tactile-input.variant-cyan:focus { border-color: var(--crt-cyber-cyan); box-shadow: 3px 3px 0px var(--crt-cyber-cyan); }
.tactile-input.variant-yellow:focus { border-color: var(--crt-sunburst-yellow); box-shadow: 3px 3px 0px var(--crt-sunburst-yellow); }
</style>
