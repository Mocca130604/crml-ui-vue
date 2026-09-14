<template>
  <div class="dashboard-root font-mono">
    <!-- Top Sticky CRML Navbar -->
    <div class="top-nav-sticky">
      <CrmlNavbar
        brand-text="CRML - UI"
        brand-badge="ECOSYSTEM v1.0"
        :items="navItems"
        action-text="☕ BUY ME A COFFEE"
        action-href="https://buymeacoffee.com/crml"
        @search-click="scrollToSection('catalog')"
        @nav-click="handleNavClick"
      />
    </div>

    <!-- Ticker Marquee Banner (Atom #04) -->
    <CrmlMarquee
      text="⚡ CRML - UI MASTER ECOSYSTEM /// ZERO AMBIENT BLUR /// 70 PRIMITIVES /// 100% RETRO-TACTILE MECHANICAL PHYSICS /// VUE 3 • REACT • SVELTE • HTML5 ⚡"
      variant="lime"
      :speed="14"
    />

    <!-- Floating Live Toast Notification -->
    <div class="toast-floating" v-if="showToast">
      <CrmlToast
        title="CRML-UI UNIFIED ECOSYSTEM READY"
        message="Semua 70 tactile primitives aktif dengan 100% keselarasan props dan tactile physics!"
        variant="lime"
        @close="showToast = false"
      />
    </div>

    <!-- Main Container -->
    <main class="dashboard-main-body">
      <!-- Hero Section -->
      <section class="hero-showcase-section">
        <div class="hero-left-col">
          <div class="hero-badges-row">
            <CrmlStickerBadge variant="pink" tilt="right" star>★ OFFICIAL HUB</CrmlStickerBadge>
            <CrmlBadge variant="primary" class="font-mono">70 PRIMITIVES</CrmlBadge>
            <CrmlBadge variant="success" class="font-mono">100% PARITY</CrmlBadge>
            <CrmlBadge variant="warning" class="font-mono">0% AMBIENT BLUR</CrmlBadge>
          </div>

          <h1 class="hero-title font-heading">
            ONE SYSTEM.<br>
            <span class="hero-highlight">FOUR FRAMEWORKS.</span><br>
            ZERO BLUR.
          </h1>

          <p class="hero-description font-mono">
            Production-grade, highly tactile Neubrutalism, Y2K Cyber Mecha, and Streetwear design system.
            Pilih target framework untuk <strong>instalasi via npm</strong> atau <strong>unduh standalone HTML5 template</strong> dengan zero dependencies.
          </p>

          <div class="hero-metrics-grid font-mono">
            <div class="metric-card">
              <span class="metric-num font-heading">70</span>
              <span class="metric-lbl">TOTAL PRIMITIVES</span>
            </div>
            <div class="metric-card">
              <span class="metric-num font-heading">4</span>
              <span class="metric-lbl">FRAMEWORKS</span>
            </div>
            <div class="metric-card">
              <span class="metric-num font-heading">3px</span>
              <span class="metric-lbl">INK STROKE</span>
            </div>
            <div class="metric-card">
              <span class="metric-num font-heading">0%</span>
              <span class="metric-lbl">AMBIENT BLUR</span>
            </div>
          </div>

          <div class="hero-action-buttons">
            <CrmlBouncyButton variant="lime" size="lg" @click="scrollToSection('catalog')">
              📚 JELAJAHI 70 KOMPONEN
            </CrmlBouncyButton>
            <CrmlBouncyButton variant="cyan" size="lg" @click="scrollToSection('install')">
              📦 INSTALASI & DOWNLOAD
            </CrmlBouncyButton>
            <a href="https://buymeacoffee.com/crml" target="_blank" rel="noopener noreferrer" style="text-decoration: none;">
              <CrmlBouncyButton variant="yellow" size="lg">
                ☕ BUY ME A COFFEE
              </CrmlBouncyButton>
            </a>
          </div>
        </div>

        <!-- Hero Right: Interactive Distribution Center -->
        <div class="hero-right-col" id="install">
          <div class="dist-card-box">
            <div class="dist-card-header font-heading">
              <span>📦 PACKAGE INSTALLER & DOWNLOAD CENTER</span>
              <span class="live-dot">● SELECT TARGET</span>
            </div>

            <!-- Framework Segment Buttons -->
            <div class="fw-pills-row">
              <button
                v-for="fw in frameworks"
                :key="fw.id"
                class="fw-btn font-mono"
                :class="{ active: activeFw === fw.id }"
                @click="activeFw = fw.id"
              >
                <span class="fw-icon">{{ fw.icon }}</span>
                <span class="fw-name font-heading">{{ fw.name }}</span>
                <span class="fw-badge">{{ fw.badge }}</span>
              </button>
            </div>

            <!-- Panel Target Detail -->
            <div class="dist-panel-body font-mono">
              <div class="panel-header-row">
                <div>
                  <span class="panel-tag">// {{ activeFwMeta.type }}</span>
                  <h3 class="panel-pkg-title font-heading">{{ activeFwMeta.fullName }}</h3>
                </div>
                <CrmlBadge variant="primary">{{ activeFwMeta.version }}</CrmlBadge>
              </div>

              <p class="panel-desc-p">{{ activeFwMeta.desc }}</p>

              <!-- NPM Target -->
              <template v-if="activeFwMeta.isNpm">
                <div class="terminal-command-card font-mono">
                  <div class="terminal-top-bar">
                    <span>CLI TERMINAL</span>
                    <span class="terminal-dots">● ● ●</span>
                  </div>
                  <div class="terminal-input-row">
                    <span class="term-prompt">$</span>
                    <code class="term-code">{{ activeFwMeta.installCmd }}</code>
                    <CrmlBouncyButton
                      variant="lime"
                      size="sm"
                      @click="copyText(activeFwMeta.installCmd, 'npmCmd')"
                    >
                      {{ copiedId === 'npmCmd' ? '✓ COPIED!' : '📋 SALIN' }}
                    </CrmlBouncyButton>
                  </div>
                </div>

                <div class="dist-actions-grid">
                  <a
                    :href="activeFwMeta.npmUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="tactile-btn-link variant-pink"
                  >
                    🚀 BUKA HALAMAN NPM ({{ activeFwMeta.packageName }}) ↗
                  </a>
                  <button
                    class="tactile-btn variant-cyan"
                    @click="copyText(activeFwMeta.quickSnippet, 'quickSnippet')"
                  >
                    {{ copiedId === 'quickSnippet' ? '✓ KODE DISALIN' : '📋 SALIN STARTER CODE' }}
                  </button>
                </div>
              </template>

              <!-- HTML5 Target -->
              <template v-else>
                <div class="html-download-panel font-mono">
                  <div class="html-badge-row">
                    <CrmlBadge variant="success">STANDALONE ZERO-DEPENDENCY</CrmlBadge>
                    <span>HTML5 + CSS TOKENS</span>
                  </div>

                  <div class="cdn-code-box">
                    <code>&lt;link rel="stylesheet" href="./css/crml-neubrutal.css"&gt;</code>
                    <button class="tactile-btn variant-lime size-sm" @click="copyText('<link rel=\'stylesheet\' href=\'./css/crml-neubrutal.css\'>', 'cdnSnippet')">
                      {{ copiedId === 'cdnSnippet' ? '✓ COPIED' : '📋 COPY' }}
                    </button>
                  </div>

                  <div class="dist-actions-grid">
                    <button class="tactile-btn variant-lime" @click="triggerHtmlDownload">
                      💾 DOWNLOAD STARTER TEMPLATE (.HTML) ⬇
                    </button>
                    <button class="tactile-btn variant-yellow" @click="triggerCssDownload">
                      🎨 DOWNLOAD CSS DESIGN TOKENS (.CSS) ⬇
                    </button>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </section>

      <!-- Decorative Wavy Divider -->
      <CrmlWavyDivider styleType="wave" color="#CCFF00" :strokeWidth="4" />

      <!-- ================================================================= -->
      <!-- SECTION: 70-COMPONENT DOCUMENTATION EXPLORER -->
      <!-- ================================================================= -->
      <section class="catalog-section-wrap" id="catalog">
        <div class="section-title-header">
          <div class="header-badges">
            <CrmlStickerBadge variant="lime" tilt="none" star>MASTER CATALOG</CrmlStickerBadge>
            <CrmlBadge variant="obsidian">70 PRIMITIVES</CrmlBadge>
            <CrmlBadge variant="cyan">PROPS • SLOTS • EMITS</CrmlBadge>
          </div>
          <h2 class="section-heading font-heading">
            ALL 70 CRML - UI COMPONENTS & DETAILED DOCUMENTATION
          </h2>
          <p class="section-subtext font-mono">
            // Pilih komponen di sebelah kiri untuk melihat live interactive preview, visual blueprint, 4-framework code snippets, dan spesifikasi props/slots/events.
          </p>
        </div>

        <div class="catalog-main-box">
          <!-- Toolbar -->
          <div class="catalog-toolbar-row">
            <div class="search-wrap">
              <span class="search-ico">🔍</span>
              <input
                type="text"
                v-model="searchQuery"
                class="tactile-input font-mono search-field"
                placeholder="Cari 70 komponen (e.g. WavyDivider, Button, DatePicker, Telemetry, Dialog)..."
              />
              <button v-if="searchQuery" class="clear-btn font-mono" @click="searchQuery = ''">✕</button>
            </div>

            <div class="category-pills-row">
              <button
                class="cat-chip font-mono"
                :class="{ active: selectedCategory === 'ALL' }"
                @click="selectedCategory = 'ALL'"
              >
                ALL ({{ totalComponentCount }})
              </button>
              <button
                v-for="cat in CATALOG_DATA"
                :key="cat.name"
                class="cat-chip font-mono"
                :class="{ active: selectedCategory === cat.name }"
                @click="selectedCategory = cat.name"
              >
                {{ cat.name }} ({{ cat.items.length }})
              </button>
            </div>
          </div>

          <!-- Split Explorer: Left Menu & Right Detail -->
          <div class="catalog-split-pane">
            <!-- Left Component List -->
            <aside class="catalog-left-aside">
              <div class="aside-bar font-mono">
                <span>COMPONENTS ({{ filteredComponents.length }})</span>
                <span class="aside-hint">PILIH KOMPONEN ✦</span>
              </div>

              <div class="components-scroll-list">
                <div
                  v-for="comp in filteredComponents"
                  :key="comp.id"
                  class="comp-item-row font-mono"
                  :class="{ active: activeComp.id === comp.id }"
                  @click="selectedCompId = comp.id"
                >
                  <span class="comp-icon-box">{{ comp.icon || '📦' }}</span>
                  <div class="comp-info-col">
                    <span class="comp-name font-heading">{{ comp.name }}</span>
                    <span class="comp-category-tag">{{ comp.category }} • {{ comp.type }}</span>
                  </div>
                  <span class="comp-badge-pill">{{ (comp.badge ? comp.badge.replace('✦', '').trim() : comp.type).toUpperCase() }}</span>
                </div>
              </div>
            </aside>

            <!-- Right Detail Panel -->
            <div class="catalog-right-panel">
              <!-- Component Header Info Card -->
              <div class="comp-info-card">
                <div class="info-top-row">
                  <div class="info-badges-row">
                    <CrmlStickerBadge variant="pink" tilt="none">{{ activeComp.category.toUpperCase() }}</CrmlStickerBadge>
                    <CrmlBadge variant="primary">{{ activeComp.type.toUpperCase() }}</CrmlBadge>
                    <CrmlBadge variant="warning">0% AMBIENT BLUR</CrmlBadge>
                    <CrmlBadge variant="success">SPRING REBOUND</CrmlBadge>
                  </div>

                  <!-- Code Target Switcher -->
                  <div class="code-target-box font-mono">
                    <span class="target-title">CODE TARGET:</span>
                    <div class="target-btn-group">
                      <button
                        v-for="fw in (['vue', 'react', 'svelte', 'html'] as const)"
                        :key="fw"
                        class="target-btn"
                        :class="{ active: activeFw === fw }"
                        @click="activeFw = fw"
                      >
                        {{ fw.toUpperCase() }}
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Component Title on its own line -->
                <h2 class="active-comp-title font-heading">
                  <span class="active-comp-icon">{{ activeComp.icon }}</span> {{ activeComp.name }}
                </h2>

                <!-- Description -->
                <div class="info-desc-box font-mono">
                  <h4 class="info-desc-title font-heading">💡 FUNGSI & DESKRIPSI KOMPONEN</h4>
                  <p class="info-desc-content">{{ activeComp.desc }}</p>
                </div>

                <!-- Design Notes -->
                <div v-if="activeComp.designNotes" class="info-notes-box font-mono">
                  <h4 class="info-notes-title font-heading">🎨 CATATAN DESAIN TACTILE // ZERO BLUR</h4>
                  <p class="info-notes-content">{{ activeComp.designNotes }}</p>
                </div>
              </div>

              <!-- Live Interactive Preview Canvas (NEVER CUT OFF) -->
              <div class="spec-section-card">
                <div class="spec-card-bar font-mono">
                  <span>🎮 LIVE PREVIEW & VISUAL BLUEPRINT // {{ activeComp.name }}</span>
                  <span class="live-dot">● INTERACTIVE</span>
                </div>

                <div class="canvas-controller-bar font-mono">
                  <div class="canvas-ctrl">
                    <label>COLOR VARIANT:</label>
                    <div class="variant-chips">
                      <button
                        v-for="v in (['lime', 'pink', 'cyan', 'yellow'] as const)"
                        :key="v"
                        class="variant-btn"
                        :class="{ active: demoVariant === v }"
                        @click="demoVariant = v"
                      >
                        {{ v.toUpperCase() }}
                      </button>
                    </div>
                  </div>

                  <div class="canvas-ctrl">
                    <label>SIZE:</label>
                    <div class="variant-chips">
                      <button
                        v-for="s in (['sm', 'md', 'lg'] as const)"
                        :key="s"
                        class="variant-btn"
                        :class="{ active: demoSize === s }"
                        @click="demoSize = s"
                      >
                        {{ s.toUpperCase() }}
                      </button>
                    </div>
                  </div>

                  <button class="tactile-btn variant-outline size-sm font-mono" @click="resetDemo">
                    🔄 RESET DEMO
                  </button>
                </div>

                <!-- Preview Area Stage with Generous Padding -->
                <div class="preview-stage-area">
                  <div class="stage-inner-wrapper">
                    <!-- 1. Real CrmlWavyDivider / Divider -->
                    <template v-if="activeComp.id.includes('Wavy') || activeComp.id.includes('Divider')">
                      <div class="divider-preview-box">
                        <div class="divider-ctrl-tag font-mono">
                          <span>DIVIDER STYLE: <strong>{{ wavyStyle.toUpperCase() }}</strong></span>
                          <div class="variant-chips" style="margin-left: 0.75rem;">
                            <button class="variant-btn" :class="{ active: wavyStyle === 'wave' }" @click="wavyStyle = 'wave'">WAVE</button>
                            <button class="variant-btn" :class="{ active: wavyStyle === 'zigzag' }" @click="wavyStyle = 'zigzag'">ZIGZAG</button>
                          </div>
                        </div>

                        <div class="wavy-element-wrap">
                          <CrmlWavyDivider
                            :styleType="wavyStyle"
                            :color="getVariantColor(demoVariant)"
                            :strokeWidth="5"
                          />
                        </div>

                        <div class="divider-status-badge font-mono" :style="{ backgroundColor: getVariantColor(demoVariant) }">
                          ★ {{ activeComp.name.toUpperCase() }} • 100% RETRO-TACTILE ★
                        </div>
                      </div>
                    </template>

                    <!-- 2. Real CrmlBouncyButton / CrmlButton -->
                    <template v-else-if="activeComp.id.includes('Button')">
                      <div class="button-preview-group">
                        <CrmlBouncyButton
                          :variant="demoVariant === 'cyan' ? 'lime' : demoVariant"
                          :size="demoSize"
                          @click="demoClicks++"
                        >
                          ⚡ {{ activeComp.name }} (CLICKS: {{ demoClicks }})
                        </CrmlBouncyButton>
                        <CrmlButton :variant="demoVariant === 'lime' ? 'primary' : 'danger'" :size="demoSize">
                          STANDARD INK BUTTON
                        </CrmlButton>
                      </div>
                    </template>

                    <!-- 3. Real Badges -->
                    <template v-else-if="activeComp.id.includes('Badge')">
                      <div class="badge-preview-group">
                        <CrmlStickerBadge :variant="demoVariant" star tilt="right">
                          ★ {{ activeComp.name }} ✦
                        </CrmlStickerBadge>
                        <CrmlBadge :variant="demoVariant === 'lime' ? 'success' : 'primary'">
                          SYSTEM STATUS // ACTIVE
                        </CrmlBadge>
                        <CrmlStampBadge :variant="demoVariant === 'pink' ? 'danger' : 'warning'">
                          VERIFIED PILOT
                        </CrmlStampBadge>
                      </div>
                    </template>

                    <!-- 4. Real Marquee -->
                    <template v-else-if="activeComp.id.includes('Marquee')">
                      <div style="width: 100%;">
                        <CrmlMarquee
                          text="⚡ CRML TACTILE MARQUEE BANNER /// 0% AMBIENT BLUR /// MECHANICAL SPRINGS ⚡"
                          :variant="demoVariant"
                          :speed="12"
                        />
                      </div>
                    </template>

                    <!-- 5. Real Progress -->
                    <template v-else-if="activeComp.id.includes('Progress')">
                      <div class="progress-preview-box font-mono">
                        <div class="prog-meta">
                          <span>SYSTEM TELEMETRY</span>
                          <span>{{ demoProgress }}%</span>
                        </div>
                        <CrmlProgress :value="demoProgress" :variant="demoVariant" />
                        <div class="prog-buttons">
                          <button class="variant-btn" @click="demoProgress = Math.max(0, demoProgress - 15)">- 15%</button>
                          <button class="variant-btn" @click="demoProgress = Math.min(100, demoProgress + 15)">+ 15%</button>
                        </div>
                      </div>
                    </template>

                    <!-- 6. Real Avatar / Kbd / Speech -->
                    <template v-else-if="activeComp.id.includes('Avatar')">
                      <CrmlBlobAvatar text="C" :variant="demoVariant" :size="demoSize" />
                    </template>

                    <template v-else-if="activeComp.id.includes('Kbd')">
                      <div class="kbd-preview-box">
                        <CrmlKbd>⌘</CrmlKbd>
                        <CrmlKbd>SHIFT</CrmlKbd>
                        <CrmlKbd>K</CrmlKbd>
                      </div>
                    </template>

                    <template v-else-if="activeComp.id.includes('Speech')">
                      <CrmlSpeechBubble :variant="demoVariant === 'cyan' ? 'lime' : demoVariant">
                        "Zero ambient blur, strict 3px ink borders, and mechanical spring rebound physics!"
                      </CrmlSpeechBubble>
                    </template>

                    <!-- 7. Real Inputs -->
                    <template v-else-if="activeComp.id.includes('Input') || activeComp.id.includes('Textarea') || activeComp.id.includes('Number')">
                      <div class="input-preview-box font-mono">
                        <CrmlInput
                          v-model="demoInputVal"
                          label="PILOT USERNAME"
                          placeholder="@crml_pilot"
                        />
                        <span class="input-preview-caption">Solid 2.5px ink border with neon glow focus.</span>
                      </div>
                    </template>

                    <!-- 8. Real Neon Switch / Checkbox -->
                    <template v-else-if="activeComp.id.includes('Switch') || activeComp.id.includes('Check')">
                      <div class="switch-preview-box font-mono">
                        <CrmlNeonSwitch v-model="demoToggle" :variant="demoVariant" />
                        <span class="switch-state-text">HYPERMODE: {{ demoToggle ? 'ONLINE / ACTIVE' : 'OFFLINE' }}</span>
                      </div>
                    </template>

                    <!-- 9. Real Dual Range Slider -->
                    <template v-else-if="activeComp.id.includes('Slider')">
                      <div class="slider-preview-box font-mono">
                        <div class="slider-info-row">
                          <span>PRICE RANGE:</span>
                          <CrmlBadge :variant="demoVariant === 'lime' ? 'success' : 'primary'">${{ sliderMin }} — ${{ sliderMax }}</CrmlBadge>
                        </div>
                        <input type="range" min="0" max="1000" v-model.number="sliderMin" class="native-range-slider" />
                        <input type="range" min="0" max="1000" v-model.number="sliderMax" class="native-range-slider" />
                      </div>
                    </template>

                    <!-- 10. Real Cards / Organisms -->
                    <template v-else>
                      <CrmlNeubrutalCard
                        :title="activeComp.name"
                        :subtitle="activeComp.category"
                        :badge="activeComp.type"
                        :badge-variant="demoVariant === 'lime' ? 'success' : 'primary'"
                      >
                        <p class="neubrutal-card-text font-mono">{{ activeComp.desc }}</p>
                        <template #footer>
                          <div class="card-footer-row font-mono">
                            <span>// ZERO AMBIENT BLUR</span>
                            <CrmlBouncyButton :variant="demoVariant" size="sm">ACTION</CrmlBouncyButton>
                          </div>
                        </template>
                      </CrmlNeubrutalCard>
                    </template>
                  </div>
                </div>
              </div>

              <!-- Multi-Framework Code Snippet -->
              <div class="spec-section-card">
                <div class="spec-card-bar font-mono">
                  <span>📋 {{ activeFw.toUpperCase() }} IMPLEMENTATION CODE SNIPPET</span>
                  <CrmlBouncyButton
                    variant="lime"
                    size="sm"
                    @click="copyText(activeComponentCode, 'compCode')"
                  >
                    {{ copiedId === 'compCode' ? '✓ COPIED!' : '📋 SALIN KODE ' + activeFw.toUpperCase() }}
                  </CrmlBouncyButton>
                </div>

                <div class="snippet-code-box font-mono">
                  <pre><code>{{ activeComponentCode }}</code></pre>
                </div>
              </div>

              <!-- Props Table -->
              <div class="spec-section-card">
                <div class="spec-card-bar font-heading">
                  <span>⚙️ PROPS SPECIFICATION ({{ (activeComp.apiData || []).length }})</span>
                  <span class="bar-sub font-mono">// PARAMETERS</span>
                </div>

                <div class="spec-table-scroll">
                  <table v-if="activeComp.apiData && activeComp.apiData.length > 0" class="spec-table font-mono">
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
                        <td><code class="tag-prop font-heading">{{ prop.prop }}</code></td>
                        <td><code class="tag-type">{{ prop.type }}</code></td>
                        <td><code class="tag-default">{{ prop.default }}</code></td>
                        <td class="desc-text">{{ prop.desc }}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div v-else class="empty-spec-box font-mono">
                    Komponen ini menggunakan slot default tanpa required props khusus.
                  </div>
                </div>
              </div>

              <!-- Slots Table -->
              <div v-if="activeComp.slotsData && activeComp.slotsData.length > 0" class="spec-section-card">
                <div class="spec-card-bar font-heading">
                  <span>🔌 SLOTS CUSTOMIZATION ({{ activeComp.slotsData.length }})</span>
                  <span class="bar-sub font-mono">// NAMED SLOTS</span>
                </div>

                <div class="spec-table-scroll">
                  <table class="spec-table font-mono">
                    <thead>
                      <tr>
                        <th style="width: 25%;">SLOT NAME</th>
                        <th style="width: 30%;">BINDINGS / SCOPE</th>
                        <th>DESCRIPTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="slot in activeComp.slotsData" :key="slot.slot">
                        <td><code class="tag-prop slot-tag">#{{ slot.slot }}</code></td>
                        <td><code class="tag-type">{{ slot.bindings }}</code></td>
                        <td class="desc-text">{{ slot.desc }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Events Table -->
              <div v-if="activeComp.eventsData && activeComp.eventsData.length > 0" class="spec-section-card">
                <div class="spec-card-bar font-heading">
                  <span>⚡ EMITTED EVENTS ({{ activeComp.eventsData.length }})</span>
                  <span class="bar-sub font-mono">// EVENT LISTENERS</span>
                </div>

                <div class="spec-table-scroll">
                  <table class="spec-table font-mono">
                    <thead>
                      <tr>
                        <th style="width: 25%;">EVENT NAME</th>
                        <th style="width: 30%;">PAYLOAD</th>
                        <th>TRIGGER DESCRIPTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="ev in activeComp.eventsData" :key="ev.event">
                        <td><code class="tag-prop event-tag">@{{ ev.event }}</code></td>
                        <td><code class="tag-type">{{ ev.payload }}</code></td>
                        <td class="desc-text">{{ ev.desc }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Decorative Wavy Divider -->
      <CrmlWavyDivider styleType="zigzag" color="#FF007F" :strokeWidth="4" />

      <!-- Parity Matrix Section -->
      <section class="parity-section-wrap" id="parity">
        <div class="section-title-header">
          <div class="header-badges">
            <CrmlStickerBadge variant="cyan" tilt="none">PARITY MATRIX</CrmlStickerBadge>
            <CrmlBadge variant="primary">100% AUDITED</CrmlBadge>
          </div>
          <h2 class="section-heading font-heading">
            COMPLETE 70-COMPONENT CROSS-FRAMEWORK AUDIT
          </h2>
          <p class="section-subtext font-mono">
            // 100% keselarasan props, classes, physics, dan token antara Vue 3, React, Svelte, dan HTML5.
          </p>
        </div>

        <div class="parity-card-container">
          <div class="parity-filter-bar font-mono">
            <input
              type="text"
              v-model="matrixSearch"
              class="tactile-input font-mono parity-search-box"
              placeholder="Cari audit tabel..."
            />

            <div class="parity-cat-chips">
              <button
                v-for="cat in ['ALL', 'FORM & INPUT SUITE', 'BUTTONS & BADGES', 'CONTAINERS & CARDS', 'NAV & FEEDBACK', 'DATA & TELEMETRY GADGETS']"
                :key="cat"
                class="cat-chip"
                :class="{ active: matrixCat === cat }"
                @click="matrixCat = cat"
              >
                {{ cat }}
              </button>
            </div>
          </div>

          <div class="parity-table-scroll">
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
                  class="clickable-parity-row"
                  @click="selectedCompId = item.id; scrollToSection('catalog')"
                >
                  <td class="comp-col font-heading">
                    <span class="comp-ico">{{ item.icon }}</span> {{ item.name }}
                  </td>
                  <td>
                    <CrmlBadge variant="neutral" size="sm">{{ item.category }}</CrmlBadge>
                  </td>
                  <td>
                    <CrmlBadge variant="lime" size="sm">✓ VUE 3</CrmlBadge>
                  </td>
                  <td>
                    <CrmlBadge variant="cyan" size="sm">✓ TSX</CrmlBadge>
                  </td>
                  <td>
                    <CrmlBadge variant="pink" size="sm">✓ SVELTE</CrmlBadge>
                  </td>
                  <td>
                    <CrmlBadge variant="yellow" size="sm">✓ HTML5</CrmlBadge>
                  </td>
                  <td>
                    <CrmlBadge variant="lime" size="sm" clickable>100% DOKUMENTASI ↗</CrmlBadge>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>

    <!-- Main Footer -->
    <footer class="main-footer-box font-mono">
      <div class="footer-top-row">
        <div>
          <span class="footer-brand font-heading">CRML - UI</span>
          <p class="footer-sub">Tactile Neubrutalism, Y2K Cyber Mecha, and Streetwear Design System.</p>
        </div>
        <div class="footer-badges">
          <a href="https://buymeacoffee.com/crml" target="_blank" rel="noopener noreferrer" style="text-decoration: none;">
            <CrmlBadge variant="warning">☕ BUY ME A COFFEE</CrmlBadge>
          </a>
          <CrmlBadge variant="success">PRODUCTION READY</CrmlBadge>
          <CrmlBadge variant="warning">ZERO AMBIENT BLUR</CrmlBadge>
        </div>
      </div>
      <div class="footer-bottom-row">
        <span>© 2026 CRML-UI Ecosystem Team. Distributed under MIT License.</span>
        <span>Unified Documentation Hub & Component Playground</span>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  CrmlNavbar,
  CrmlMarquee,
  CrmlToast,
  CrmlBouncyButton,
  CrmlButton,
  CrmlBadge,
  CrmlStickerBadge,
  CrmlStampBadge,
  CrmlWavyDivider,
  CrmlProgress,
  CrmlBlobAvatar,
  CrmlKbd,
  CrmlSpeechBubble,
  CrmlInput,
  CrmlNeonSwitch,
  CrmlNeubrutalCard,
  type NavItem
} from '../src'

import { CATALOG_DATA, type CatalogItem } from './catalog'

// -------------------------------------------------------------
// Framework Definitions & Metadata
// -------------------------------------------------------------
type FrameworkKey = 'vue' | 'react' | 'svelte' | 'html'
const activeFw = ref<FrameworkKey>('vue')
const showToast = ref(true)

const navItems = ref<NavItem[]>([
  { id: 'install', label: '01 INSTALLER', href: '#install' },
  { id: 'catalog', label: '02 70-COMPONENTS', href: '#catalog' },
  { id: 'parity', label: '03 PARITY AUDIT', href: '#parity' }
])

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
const demoProgress = ref(78)
const wavyStyle = ref<'wave' | 'zigzag'>('wave')
const sliderMin = ref(200)
const sliderMax = ref(800)

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
  demoProgress.value = 78
  wavyStyle.value = 'wave'
  sliderMin.value = 200
  sliderMax.value = 800
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
        `  <CrmlWavyDivider styleType="${wavyStyle.value}" color="${getVariantColor(variant)}" :strokeWidth="4" />`,
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

function handleNavClick(item: NavItem) {
  if (item.href) {
    const id = item.href.replace('#', '')
    scrollToSection(id)
  }
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
  --crml-bg-elevated: #F4F4F5;
  --crml-text-main: #0D0D0D;
  --crml-text-muted: #52525B;
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

.top-nav-sticky {
  position: sticky;
  top: 0;
  z-index: 9980;
  padding: 6px 16px;
  background: var(--crml-bg-base);
  border-bottom: 2px solid var(--crt-obsidian);
}

.toast-floating {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 9999;
}

.dashboard-main-body {
  max-width: 1440px;
  margin: 0 auto;
  padding: 2rem 1.5rem 5rem 1.5rem;
  width: 100%;
}

/* Hero Showcase */
.hero-showcase-section {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 2.5rem;
  align-items: stretch;
  margin-bottom: 2rem;
}
@media (max-width: 1024px) {
  .hero-showcase-section { grid-template-columns: 1fr; }
}

.hero-badges-row {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 1.25rem;
}

.hero-title {
  font-size: 3.75rem;
  line-height: 1.05;
  letter-spacing: -0.02em;
  margin-bottom: 1.25rem;
}
@media (max-width: 640px) {
  .hero-title { font-size: 2.5rem; }
}

.hero-highlight {
  background: var(--crt-electric-lime);
  border: var(--crml-border-brutal);
  box-shadow: var(--crml-shadow-brutal);
  padding: 0 0.5rem;
  display: inline-block;
}

.hero-description {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--crml-text-muted);
  margin-bottom: 1.75rem;
}

.hero-metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}
@media (max-width: 640px) {
  .hero-metrics-grid { grid-template-columns: repeat(2, 1fr); }
}

.metric-card {
  background: #FFF;
  border: var(--crml-border-brutal);
  border-radius: 8px;
  box-shadow: var(--crml-shadow-brutal);
  padding: 1rem 0.75rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.metric-num {
  font-size: 1.95rem;
  color: var(--crt-hot-pink);
}

.metric-lbl {
  font-size: 0.68rem;
  font-weight: 800;
  color: var(--crml-text-muted);
}

.hero-action-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

/* Distribution Card Box */
.dist-card-box {
  background: #FFF;
  border: var(--crml-border-brutal);
  border-radius: 12px;
  box-shadow: var(--crml-shadow-brutal-lg);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  height: 100%;
}

.dist-card-header {
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

.fw-pills-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
}
@media (max-width: 640px) {
  .fw-pills-row { grid-template-columns: repeat(2, 1fr); }
}

.fw-btn {
  background: var(--crml-bg-elevated);
  border: 2px solid var(--crt-obsidian);
  border-radius: 6px;
  padding: 0.65rem 0.35rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  cursor: pointer;
  transition: all 0.15s ease;
}

.fw-btn.active {
  background: var(--crt-electric-lime);
  box-shadow: var(--crml-shadow-brutal-sm);
  transform: translate(-1px, -1px);
}

.fw-icon { font-size: 1.3rem; }
.fw-name { font-size: 0.85rem; }
.fw-badge { font-size: 0.65rem; opacity: 0.8; }

.dist-panel-body {
  background: var(--crml-bg-base);
  border: 2px solid var(--crt-obsidian);
  border-radius: 8px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.panel-header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
}

.panel-tag { font-size: 0.7rem; color: var(--crt-hot-pink); font-weight: 800; }
.panel-pkg-title { font-size: 1.35rem; }
.panel-desc-p { font-size: 0.85rem; line-height: 1.5; color: var(--crml-text-muted); }

.terminal-command-card {
  background: var(--crt-obsidian);
  border: 2px solid var(--crt-obsidian);
  border-radius: 6px;
  overflow: hidden;
  box-shadow: var(--crml-shadow-brutal-sm);
}

.terminal-top-bar {
  background: #1F1F1F;
  color: #888;
  padding: 0.35rem 0.75rem;
  font-size: 0.68rem;
  display: flex;
  justify-content: space-between;
}

.terminal-dots { color: #555; }

.terminal-input-row {
  padding: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: #FFF;
}

.term-prompt { color: var(--crt-electric-lime); font-weight: 900; }
.term-code { flex: 1; font-size: 0.85rem; color: #FFF; }

.dist-actions-grid {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.tactile-btn-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.65rem 1.25rem;
  border: var(--crml-border-brutal);
  border-radius: 6px;
  box-shadow: var(--crml-shadow-brutal);
  font-family: var(--crml-font-heading);
  font-size: 0.85rem;
  font-weight: 800;
  text-decoration: none;
  cursor: pointer;
  flex: 1;
  transition: all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.tactile-btn-link:hover {
  transform: translate(-1px, -1px);
  box-shadow: 5px 5px 0px var(--crt-obsidian);
}

.tactile-btn-link:active {
  transform: translate(3px, 3px);
  box-shadow: 1px 1px 0px var(--crt-obsidian);
}

.tactile-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.65rem 1.25rem;
  border: var(--crml-border-brutal);
  border-radius: 6px;
  box-shadow: var(--crml-shadow-brutal);
  font-family: var(--crml-font-heading);
  font-size: 0.85rem;
  font-weight: 800;
  cursor: pointer;
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

.size-sm { padding: 0.35rem 0.75rem; font-size: 0.75rem; }
.size-md { padding: 0.65rem 1.25rem; font-size: 0.85rem; }
.size-lg { padding: 0.85rem 1.65rem; font-size: 1rem; }

.html-download-panel {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.html-badge-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
}

.cdn-code-box {
  background: var(--crt-obsidian);
  color: var(--crt-electric-lime);
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  gap: 0.5rem;
}

/* =====================================================================
   CATALOG 70 PRIMITIVES EXPLORER
   ===================================================================== */
.catalog-section-wrap {
  margin: 3rem 0;
  width: 100%;
}

.section-title-header {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.header-badges {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-wrap: wrap;
}

.section-heading {
  font-size: 2.35rem;
  letter-spacing: -0.02em;
}

.section-subtext {
  font-size: 0.85rem;
  color: var(--crml-text-muted);
}

.catalog-main-box {
  background: #FFF;
  border: var(--crml-border-brutal);
  border-radius: 12px;
  box-shadow: var(--crml-shadow-brutal-lg);
  overflow: hidden;
}

.catalog-toolbar-row {
  padding: 1.25rem;
  background: var(--crml-bg-elevated);
  border-bottom: var(--crml-border-brutal);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.search-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.search-ico {
  position: absolute;
  left: 1rem;
  font-size: 1rem;
  pointer-events: none;
}

.search-field {
  width: 100%;
  padding: 0.75rem 2.5rem 0.75rem 2.75rem;
  font-size: 0.9rem;
  background: #FFF;
}

.clear-btn {
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  color: #888;
}

.category-pills-row {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.25rem;
}

.cat-chip {
  padding: 0.45rem 0.9rem;
  border: 2px solid var(--crt-obsidian);
  border-radius: 6px;
  background: #FFF;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s ease;
}

.cat-chip.active {
  background: var(--crt-electric-lime);
  box-shadow: 2px 2px 0px var(--crt-obsidian);
  transform: translate(-1px, -1px);
}

/* Split Pane: Left Menu and Right Detail */
.catalog-split-pane {
  display: grid;
  grid-template-columns: 360px 1fr;
  min-height: 850px;
}
@media (max-width: 1024px) {
  .catalog-split-pane { grid-template-columns: 1fr; }
}

.catalog-left-aside {
  border-right: var(--crml-border-brutal);
  background: var(--crml-bg-base);
  display: flex;
  flex-direction: column;
  height: 960px;
}

.aside-bar {
  padding: 0.75rem 1rem;
  background: var(--crt-obsidian);
  color: #FFF;
  font-size: 0.72rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
}

.aside-hint { color: var(--crt-electric-lime); font-weight: 800; }

.components-scroll-list {
  overflow-y: auto;
  flex: 1;
}

.comp-item-row {
  padding: 0.85rem 1rem;
  border-bottom: 1px solid #E4E4E7;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: background 0.1s ease;
}

.comp-item-row:hover { background: #FFF; }
.comp-item-row.active {
  background: var(--crt-cyber-cyan);
  border-left: 6px solid var(--crt-obsidian);
}

.comp-icon-box { font-size: 1.3rem; flex-shrink: 0; }
.comp-info-col {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  min-width: 0;
  gap: 3px;
}
.comp-name {
  display: block;
  font-size: 0.95rem;
  font-weight: 800;
  color: var(--crt-obsidian);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.25;
}
.comp-category-tag {
  display: block;
  font-size: 0.7rem;
  color: var(--crml-text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
}
.comp-badge-pill {
  background: var(--crt-obsidian);
  color: var(--crt-electric-lime);
  font-size: 0.625rem;
  padding: 0.15rem 0.35rem;
  border-radius: 4px;
  font-weight: 700;
}

/* Right Detail Pane */
.catalog-right-panel {
  padding: 2rem;
  background: #FFF;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: 960px;
  overflow-y: auto;
}

.comp-info-card {
  background: var(--crml-bg-base);
  border: var(--crml-border-brutal);
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex-shrink: 0;
}

.info-top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  width: 100%;
}

.info-badges-row {
  display: flex;
  gap: 0.4rem;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 0;
}

.active-comp-title {
  font-size: 2.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.25rem 0 0 0;
}

.active-comp-icon { font-size: 2.25rem; }

.code-target-box {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.target-title { font-size: 0.75rem; font-weight: 800; }

.target-btn-group {
  display: flex;
  border: 2px solid var(--crt-obsidian);
  border-radius: 6px;
  overflow: hidden;
}

.target-btn {
  padding: 0.35rem 0.75rem;
  background: #FFF;
  border: none;
  border-right: 1px solid var(--crt-obsidian);
  font-size: 0.75rem;
  font-weight: 800;
  cursor: pointer;
}
.target-btn:last-child { border-right: none; }
.target-btn.active { background: var(--crt-electric-lime); }

.info-desc-title, .info-notes-title {
  font-size: 0.85rem;
  margin-bottom: 0.35rem;
}

.info-desc-content {
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--crml-text-muted);
}

.info-notes-box {
  background: #FFFDE7;
  border: 2px dashed #F57F17;
  padding: 0.85rem;
  border-radius: 6px;
}

.info-notes-content {
  font-size: 0.85rem;
  line-height: 1.5;
  color: #333;
}

/* Specification Section Cards (flex-shrink 0 ensures NO cut-offs) */
.spec-section-card {
  border: var(--crml-border-brutal);
  border-radius: 8px;
  background: #FFF;
  box-shadow: var(--crml-shadow-brutal-sm);
  flex-shrink: 0;
  width: 100%;
}

.spec-card-bar {
  background: var(--crt-obsidian);
  color: #FFF;
  padding: 0.75rem 1.25rem;
  font-size: 0.85rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.bar-sub { color: var(--crt-cyber-cyan); font-size: 0.72rem; }

.canvas-controller-bar {
  padding: 0.85rem 1.25rem;
  background: #F3E8FF; /* Lilac accent */
  border-bottom: 2px solid var(--crt-obsidian);
  display: flex;
  gap: 1.5rem;
  align-items: center;
  flex-wrap: wrap;
}

.canvas-ctrl {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: 800;
}

.variant-chips {
  display: flex;
  border: 1.5px solid var(--crt-obsidian);
  border-radius: 4px;
  overflow: hidden;
}

.variant-btn {
  padding: 0.25rem 0.55rem;
  background: #FFF;
  border: none;
  border-right: 1px solid #CCC;
  font-size: 0.7rem;
  font-weight: 800;
  cursor: pointer;
}
.variant-btn:last-child { border-right: none; }
.variant-btn.active { background: var(--crt-electric-lime); }

/* Preview Stage Area: NO SQUISHING, AMPLE PADDING */
.preview-stage-area {
  padding: 3rem 2rem;
  background: #FAFAFA;
  background-image: radial-gradient(#0D0D0D 1.5px, transparent 1.5px);
  background-size: 20px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 260px;
  width: 100%;
  box-sizing: border-box;
}

.stage-inner-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 650px;
}

/* Real Wavy Divider Preview */
.divider-preview-box {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  background: #FFF;
  border: var(--crml-border-brutal);
  border-radius: 8px;
  box-shadow: var(--crml-shadow-brutal);
  padding: 2rem 1.5rem;
}

.divider-ctrl-tag {
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  font-weight: 800;
}

.wavy-element-wrap {
  width: 100%;
  padding: 0.5rem 0;
}

.divider-status-badge {
  padding: 0.4rem 1rem;
  border: 2.5px solid #0D0D0D;
  border-radius: 6px;
  box-shadow: var(--crml-shadow-brutal-sm);
  font-size: 0.8rem;
  font-weight: 900;
  color: #0D0D0D;
}

/* Buttons preview */
.button-preview-group {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
}

/* Badges preview */
.badge-preview-group {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
}

/* Progress preview */
.progress-preview-box {
  width: 100%;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  background: #FFF;
  border: var(--crml-border-brutal);
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: var(--crml-shadow-brutal);
}

.prog-meta { display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 800; }
.prog-buttons { display: flex; gap: 0.5rem; justify-content: flex-end; }

/* Kbd */
.kbd-preview-box { display: flex; gap: 0.5rem; align-items: center; }

/* Inputs */
.input-preview-box {
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.input-preview-caption { font-size: 0.72rem; color: var(--crml-text-muted); }

/* Switch */
.switch-preview-box {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #FFF;
  border: var(--crml-border-brutal);
  padding: 1rem 1.75rem;
  border-radius: 8px;
  box-shadow: var(--crml-shadow-brutal);
}
.switch-state-text { font-size: 0.85rem; font-weight: 800; }

/* Slider */
.slider-preview-box {
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
.slider-info-row { display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; font-weight: 800; }
.native-range-slider { width: 100%; accent-color: #0D0D0D; cursor: pointer; }

/* Neubrutal Card */
.neubrutal-card-text { font-size: 0.85rem; color: var(--crml-text-muted); line-height: 1.5; }
.card-footer-row { display: flex; justify-content: space-between; align-items: center; width: 100%; }

/* Snippet Pre */
.snippet-code-box {
  background: #0D0D0D;
  color: #FFF;
  padding: 1.25rem;
  font-size: 0.85rem;
  line-height: 1.5;
  overflow-x: auto;
}

/* Specification Tables */
.spec-table-scroll { overflow-x: auto; }
.spec-table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
.spec-table th { background: var(--crml-bg-elevated); border-bottom: 2px solid var(--crt-obsidian); padding: 0.85rem 1.25rem; text-align: left; font-weight: 800; font-size: 0.75rem; }
.spec-table td { padding: 0.85rem 1.25rem; border-bottom: 1px solid #E4E4E7; vertical-align: top; }

.tag-prop { background: var(--crt-electric-lime); border: 1px solid var(--crt-obsidian); padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.8rem; font-weight: 800; color: #0D0D0D; }
.tag-prop.slot-tag { background: var(--crt-cyber-cyan); }
.tag-prop.event-tag { background: var(--crt-hot-pink); color: #FFF; }
.tag-type { background: var(--crml-bg-elevated); padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.78rem; color: #D32F2F; }
.tag-default { background: #E8F5E9; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.78rem; color: #2E7D32; }
.desc-text { line-height: 1.5; color: #333; }
.empty-spec-box { padding: 1.75rem; text-align: center; color: var(--crml-text-muted); font-size: 0.85rem; }

/* Parity Section */
.parity-section-wrap { margin: 4rem 0; width: 100%; }
.parity-card-container { background: #FFF; border: var(--crml-border-brutal); border-radius: 12px; box-shadow: var(--crml-shadow-brutal-lg); overflow: hidden; }
.parity-filter-bar { padding: 1.25rem; background: var(--crml-bg-elevated); border-bottom: var(--crml-border-brutal); display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; }
.parity-search-box { flex: 1; min-width: 250px; }
.parity-cat-chips { display: flex; gap: 0.4rem; flex-wrap: wrap; }
.parity-table-scroll { overflow-x: auto; max-height: 520px; }
.parity-table { width: 100%; border-collapse: collapse; font-size: 0.825rem; }
.parity-table th { background: var(--crt-obsidian); color: #FFF; padding: 0.75rem 1rem; text-align: left; font-size: 0.75rem; position: sticky; top: 0; z-index: 10; }
.parity-table td { padding: 0.75rem 1rem; border-bottom: 1px solid #E4E4E7; }
.clickable-parity-row { cursor: pointer; transition: background 0.1s ease; }
.clickable-parity-row:hover { background: #FFFDE7; }
.comp-col { font-size: 0.9rem; }
.cat-pill-tag { background: #EEE; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.7rem; }
.check-pill { font-size: 0.75rem; font-weight: 700; padding: 0.2rem 0.5rem; border-radius: 4px; }
.vue-tag { background: #E8F5E9; color: #1B5E20; }
.react-tag { background: #E1F5FE; color: #0277BD; }
.svelte-tag { background: #FBE9E7; color: #D84315; }
.html-tag { background: #FFF3E0; color: #E65100; }
.status-btn { background: var(--crt-electric-lime); border: 1px solid #0D0D0D; padding: 0.2rem 0.5rem; border-radius: 4px; font-weight: 800; font-size: 0.72rem; }

/* Footer */
.main-footer-box {
  margin-top: 4rem;
  background: var(--crt-obsidian);
  color: #FFF;
  padding: 2.5rem 2rem;
  border-top: 4px solid var(--crt-electric-lime);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.footer-top-row { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #333; padding-bottom: 1.25rem; flex-wrap: wrap; gap: 1rem; }
.footer-brand { font-size: 1.75rem; color: var(--crt-electric-lime); }
.footer-sub { font-size: 0.85rem; color: #BBB; margin-top: 0.25rem; }
.footer-badges { display: flex; gap: 0.5rem; flex-wrap: wrap; }
.footer-bottom-row { display: flex; justify-content: space-between; font-size: 0.75rem; color: #888; flex-wrap: wrap; gap: 0.5rem; }

/* Inputs */
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
</style>
