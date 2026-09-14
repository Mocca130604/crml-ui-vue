<template>
  <div class="playground-root" :data-theme="isDark ? 'dark' : 'light'">
    <!-- Top Sticky CrmlNavbar Component -->
    <div class="top-nav-sticky">
      <CrmlNavbar
        brand-text="CRML - UI"
        brand-badge="v5.5"
        :items="navItems"
        @search-click="cmdOpen = true"
        @action-click="dialogOpen = true"
        @nav-click="handleNavClick"
      />
    </div>

    <!-- Ticker Marquee Banner (Atom #04) -->
    <CrmlMarquee text="⚡ CRML - UI MASTER SUITE /// ALL INPUT VARIATIONS INDIVIDUALIZED /// ZERO AMBIENT BLUR /// 100% RETRO-TACTILE PHYSICS ⚡" variant="lime" :speed="16" />

    <!-- Toast Notification -->
    <div class="toast-floating" v-if="showToast">
      <CrmlToast
        title="CRML V5.5 INPUT & FORM SUITE"
        message="Setiap variasi input telah dipisah menjadi card mandiri & dilengkapi Number Input baru!"
        variant="lime"
        @close="showToast = false"
      />
    </div>

    <div v-if="currentView === 'playground'" class="playground-layout">
      <!-- Left Column: Sticky CrmlSidebar Component -->
      <aside class="sidebar-sticky-col">
        <CrmlSidebar
          title="MECHA SUITE"
          user-handle="@CRML_PILOT"
          :items="sidebarItems"
          v-model:collapsed="sidebarCollapsed"
          @select="handleSidebarSelect"
        />
      </aside>

      <!-- Right Column: Main Showcase Container -->
      <div class="playground-main-col">
        <!-- Hero Zine Showcase Banner -->
        <header class="playground-header">
          <div class="hero-content">
            <div class="hero-badge-row">
              <span class="hero-dot">●</span>
              <span class="hero-subtext">MASTER DESIGN SYSTEM // COMPLETE FORM & INPUT SUITE</span>
            </div>

            <h1 class="hero-title">
              CRML - UI <span class="hero-tag-box">UNIFIED v5.5</span> <span class="hero-version">56 PRIMITIVES</span>
            </h1>

            <p class="hero-desc">
              The definitive tactile design system synthesizing playful neubrutalism, Y2K cyber aesthetics, retro streetwear physics, AI gadgets, MPC soundboards, radar telemetry HUDs, date/time pickers, rich text editors, navbars, and sidebars. Zero ambient blur, strict mechanical offset physics.
            </p>

            <div class="hero-metrics-row font-mono">
              <div class="metric-chip highlight">Sec 01: Form & Input Suite (18 Input Cards ✦)</div>
              <div class="metric-chip">Sec 02: Buttons & Badges</div>
              <div class="metric-chip">Sec 03: Containers & Cards</div>
              <div class="metric-chip">Sec 04: Nav & Feedback</div>
              <div class="metric-chip yellow-chip">Sec 05: Data & Cyber Telemetry</div>
            </div>

            <div class="hero-cta-row">
              <CrmlBouncyButton variant="cyan" size="lg" @click="currentView = 'docs'">
                🌐 MULTI-FRAMEWORK DOCS & INSTALLER
              </CrmlBouncyButton>
              <CrmlBouncyButton variant="lime" size="lg" @click="currentView = 'storybook'">
                📖 STORYBOOK EXPLORER
              </CrmlBouncyButton>
              <CrmlBouncyButton variant="white" size="lg" class="font-mono" @click="dialogOpen = true">
                📁 FIGMA & TOKENS STUDIO
              </CrmlBouncyButton>
            </div>
          </div>
        </header>

        <!-- Main Body -->
        <main class="playground-body">

          <!-- ================= SECTION 01: FORM CONTROLS & INPUT SUITE ================= -->
          <section id="inputs" class="volume-section">
            <div class="volume-header">
              <CrmlStickerBadge variant="lime" tilt="none" star>SECTION 01</CrmlStickerBadge>
              <h2>FORM CONTROLS & INPUT FIELDS SUITE</h2>
              <span class="vol-tag font-mono">18 INDIVIDUAL INPUT CARDS</span>
            </div>

            <div class="showcase-grid-2col">
              <!-- 01_tactile_text_input -->
              <div class="component-card">
                <div class="card-header-bar">
                  <span class="card-filename font-mono">// 01_tactile_text_input.tsx</span>
                  <CrmlBadge variant="primary" class="font-mono">TEXT INPUT</CrmlBadge>
                </div>
                <p class="card-desc">Chunky single-line text input with overlapping label tag & neon focus stroke.</p>
                <div class="card-demo full-w">
                  <CrmlInput v-model="inputText" label="USERNAME HANDLE" placeholder="@crml_user" />
                </div>
                <span class="card-caption font-mono">Overlapping label tag & solid neon focus stroke.</span>
              </div>

              <!-- 02_tactile_textarea -->
              <div class="component-card">
                <div class="card-header-bar">
                  <span class="card-filename font-mono">// 02_tactile_textarea.tsx</span>
                  <CrmlBadge variant="primary" class="font-mono">TEXTAREA</CrmlBadge>
                </div>
                <p class="card-desc">Multi-line textarea field with live character counter & hard ink border.</p>
                <div class="card-demo full-w">
                  <CrmlTextarea v-model="textareaVal" label="CRATE DESCRIPTION" placeholder="Type here..." :max-length="120" />
                </div>
                <span class="card-caption font-mono">Live character counter pill & resizable container.</span>
              </div>

              <!-- 03_neubrutal_number_input -->
              <div class="component-card">
                <div class="card-header-bar">
                  <span class="card-filename font-mono">// 03_neubrutal_number_input.tsx</span>
                  <CrmlBadge variant="success" class="font-mono">NUMBER INPUT ✦</CrmlBadge>
                </div>
                <p class="card-desc">Neubrutalist number spinner with custom or hideable unit badge tag.</p>
                <div class="card-demo full-w" style="display: flex; flex-direction: column; gap: 0.85rem;">
                  <CrmlNumberInput v-model="numberVal" label="WITH UNIT BADGE" unit="PCS" :min="1" :max="99" />
                  <CrmlNumberInput v-model="numberVal" label="WITHOUT BADGE (HIDDEN)" unit="" :min="1" :max="99" />
                </div>
                <span class="card-caption font-mono">Set unit="PCS" for custom badge, or unit="" / omit to hide badge tag.</span>
              </div>

              <!-- 04_neubrutal_rich_text_editor -->
              <div class="component-card span-2">
                <div class="card-header-bar">
                  <span class="card-filename font-mono">// 04_neubrutal_rich_text_editor.tsx</span>
                  <CrmlBadge variant="warning" class="font-mono">RICH TEXT EDITOR ✦</CrmlBadge>
                </div>
                <p class="card-desc">Interactive rich text editor with toolbar formatting actions, word counter, and HTML mode toggle.</p>
                <div class="card-demo full-w">
                  <CrmlRichTextEditor v-model="richTextVal" title="DOCUMENT_DRAFT_V1.TXT" />
                </div>
                <span class="card-caption font-mono">Visual WYSIWYG & raw HTML code editor with live word/char counters.</span>
              </div>

              <!-- 05_retro_date_picker -->
              <div class="component-card">
                <div class="card-header-bar">
                  <span class="card-filename font-mono">// 05_retro_date_picker.tsx</span>
                  <CrmlBadge variant="primary" class="font-mono">DATE PICKER ✦</CrmlBadge>
                </div>
                <p class="card-desc">Tactile calendar date picker with working month navigation [◀ / ▶] & day pills.</p>
                <div class="card-demo full-w">
                  <CrmlDatePicker v-model="pickerDate" />
                </div>
                <span class="card-caption font-mono">Working month [◀ / ▶] arrows & ISO date string output.</span>
              </div>

              <!-- 06_neubrutal_time_picker -->
              <div class="component-card">
                <div class="card-header-bar">
                  <span class="card-filename font-mono">// 06_neubrutal_time_picker.tsx</span>
                  <CrmlBadge variant="success" class="font-mono">TIME PICKER ✦</CrmlBadge>
                </div>
                <p class="card-desc">Neubrutalist time picker with 12H/24H format switcher, hour/min spinners, & quick presets.</p>
                <div class="card-demo full-w" style="display: flex; flex-direction: column; gap: 0.85rem;">
                  <CrmlTimePicker v-model="pickerTime" label="12H / 24H TIME PICKER" />
                </div>
                <span class="card-caption font-mono">Toggle 12H / 24H in header or pass format="12h" / format="24h" prop.</span>
              </div>

              <!-- 07_color_palette_picker -->
              <div class="component-card">
                <div class="card-header-bar">
                  <span class="card-filename font-mono">// 07_color_palette_picker.tsx</span>
                  <CrmlBadge variant="success" class="font-mono">COLOR PICKER ✦</CrmlBadge>
                </div>
                <p class="card-desc">Neubrutalist color swatch selector & custom HEX input field.</p>
                <div class="card-demo full-w">
                  <CrmlColorPicker v-model="pickerColor" />
                </div>
                <span class="card-caption font-mono">Preset primitive color swatches & live preview box.</span>
              </div>

              <!-- 08_mechanical_otp_pin_input -->
              <div class="component-card">
                <div class="card-header-bar">
                  <span class="card-filename font-mono">// 08_mechanical_otp_pin_input.tsx</span>
                  <CrmlBadge variant="primary" class="font-mono">OTP / PIN INPUT</CrmlBadge>
                </div>
                <p class="card-desc">6-digit arcade PIN/OTP verification boxes with active focus border.</p>
                <div class="card-demo full-w">
                  <CrmlOtpInput v-model="otpVal" :length="6" />
                </div>
                <span class="card-caption font-mono">Auto-advance keypress focus for 6-digit authentication.</span>
              </div>

              <!-- 09_neon_toggle_switch -->
              <div class="component-card">
                <div class="card-header-bar">
                  <span class="card-filename font-mono">// 09_neon_toggle_switch.tsx</span>
                  <CrmlBadge variant="primary" class="font-mono">NEON TOGGLE</CrmlBadge>
                </div>
                <p class="card-desc">Cyber mecha switch with neon glow indicator & 2-way slider.</p>
                <div class="card-demo row-wrap">
                  <CrmlNeonSwitch v-model="switchVal" variant="cyan" label="CYBER CYAN GLOW" icon="⚡" />
                </div>
                <span class="card-caption font-mono">Neon halo glow box-shadow on active state.</span>
              </div>

              <!-- 10_biometric_face_id_toggle -->
              <div class="component-card">
                <div class="card-header-bar">
                  <span class="card-filename font-mono">// 10_biometric_face_id_toggle.tsx</span>
                  <CrmlBadge variant="primary" class="font-mono">FACE ID TOGGLE</CrmlBadge>
                </div>
                <p class="card-desc">Cyber passkey switch with wireframe Face ID icon & beam scanner.</p>
                <div class="card-demo full-w">
                  <CrmlFaceIdToggle v-model="faceIdVal" />
                </div>
                <span class="card-caption font-mono">Scanning beam animation & mechanical slide thumb.</span>
              </div>

              <!-- 11_mechanical_checkbox -->
              <div class="component-card">
                <div class="card-header-bar">
                  <span class="card-filename font-mono">// 11_mechanical_checkbox.tsx</span>
                  <CrmlBadge variant="success" class="font-mono">CHECKBOX</CrmlBadge>
                </div>
                <p class="card-desc">Thick square mechanical checkbox with pop-out check mark.</p>
                <div class="card-demo full-w">
                  <CrmlCheckbox v-model="cbVal1" variant="lime" label="Enforce zero ambient blur policy" />
                </div>
                <span class="card-caption font-mono">Pop-out spring checkmark mechanism.</span>
              </div>

              <!-- 12_mechanical_radio_group -->
              <div class="component-card">
                <div class="card-header-bar">
                  <span class="card-filename font-mono">// 12_mechanical_radio_group.tsx</span>
                  <CrmlBadge variant="success" class="font-mono">RADIO GROUP</CrmlBadge>
                </div>
                <p class="card-desc">Spring-loaded radio option selector group.</p>
                <div class="card-demo full-w">
                  <CrmlRadioGroup v-model="radioVal" :options="radioOptions" label="COLOR MODE" layout="row" />
                </div>
                <span class="card-caption font-mono">Spring pop radio selection mechanism.</span>
              </div>

              <!-- 13_neubrutal_search_bar -->
              <div class="component-card">
                <div class="card-header-bar">
                  <span class="card-filename font-mono">// 13_neubrutal_search_bar.tsx</span>
                  <CrmlBadge variant="primary" class="font-mono">SEARCH BAR</CrmlBadge>
                </div>
                <p class="card-desc">Keyboard-first search bar with [CMD+K], filter tags & clear button.</p>
                <div class="card-demo full-w">
                  <CrmlSearchTagFilter v-model="searchVal" v-model:active-tag="activeTagFilter" />
                </div>
                <span class="card-caption font-mono">Keyboard filter bar engineered for quick lookup.</span>
              </div>

              <!-- 14_retro_select_picker -->
              <div class="component-card">
                <div class="card-header-bar">
                  <span class="card-filename font-mono">// 14_retro_select_picker.tsx</span>
                  <CrmlBadge variant="warning" class="font-mono">SELECT DROPDOWN</CrmlBadge>
                </div>
                <p class="card-desc">Custom layered 4px dropdown with chevron angle & selected state.</p>
                <div class="card-demo full-w">
                  <CrmlDropdown v-model="selectedCategory" :options="dropdownOptions" label="CATEGORY TIER" />
                </div>
                <span class="card-caption font-mono">Solid 4px elevation dropdown popup menu.</span>
              </div>

              <!-- 15_tactile_dual_range_slider -->
              <div class="component-card">
                <div class="card-header-bar">
                  <span class="card-filename font-mono">// 15_tactile_dual_range_slider.tsx</span>
                  <CrmlBadge variant="primary" class="font-mono">DUAL RANGE SLIDER ✦</CrmlBadge>
                </div>
                <p class="card-desc">Dual handle range filter slider with min/max bounds, compact (K/M/B) notation & live value pills.</p>
                <div class="card-demo full-w" style="display: flex; flex-direction: column; gap: 1rem;">
                  <CrmlDualRangeSlider v-model:min="rangeMin" v-model:max="rangeMax" :min-limit="0" :max-limit="1000" prefix="$" label="STANDARD PRICE RANGE ($0 - $1,000)" />
                  <CrmlDualRangeSlider v-model:min="rangeMinCompact" v-model:max="rangeMaxCompact" :min-limit="0" :max-limit="10000000" :step="100000" prefix="Rp " compact show-limits label="COMPACT NOMINAL RANGE (0 - 10M)" variant="cyan" />
                </div>
                <span class="card-caption font-mono">Supports compact formatting (150K, 8.5M, 2B), min/max limits & custom prefix/suffix.</span>
              </div>

              <!-- 16_emoji_rating_slider -->
              <div class="component-card">
                <div class="card-header-bar">
                  <span class="card-filename font-mono">// 16_emoji_rating_slider.tsx</span>
                  <CrmlBadge variant="success" class="font-mono">EMOJI RATING</CrmlBadge>
                </div>
                <p class="card-desc">Expressive rating slider with real-time mood changing emoji thumb.</p>
                <div class="card-demo full-w">
                  <CrmlEmojiRatingSlider v-model="ratingVal" />
                </div>
                <span class="card-caption font-mono">Dynamic emoji face expressions responding to range input.</span>
              </div>

              <!-- 17_tactile_ai_prompt_input -->
              <div class="component-card">
                <div class="card-header-bar">
                  <span class="card-filename font-mono">// 17_tactile_ai_prompt_input.tsx</span>
                  <CrmlBadge variant="primary" class="font-mono">AI PROMPT INPUT</CrmlBadge>
                </div>
                <p class="card-desc">AI prompt studio bar with model selector, token meter & neon button.</p>
                <div class="card-demo full-w">
                  <CrmlAiPromptInput placeholder="Generate a neubrutalist UI layout..." />
                </div>
                <span class="card-caption font-mono">Model pills selector & token counter gauge.</span>
              </div>

              <!-- 18_zine_file_dropzone -->
              <div class="component-card span-2">
                <div class="card-header-bar">
                  <span class="card-filename font-mono">// 18_zine_file_dropzone.tsx</span>
                  <CrmlBadge variant="warning" class="font-mono">FILE DROPZONE</CrmlBadge>
                </div>
                <p class="card-desc">Drag & drop zone with floppy disk icon & format badges.</p>
                <div class="card-demo full-w">
                  <CrmlFileUpload
                    title="DRAG & DROP ASSETS HERE"
                    description="SUPPORTED: .FIG, .JSON, .PNG (MAX 50MB)"
                    progress-file-name="zine_master_v3.fig"
                    :progress-percent="82"
                  />
                </div>
                <span class="card-caption font-mono">Floppy icon 💾 with pink progress bar fill.</span>
              </div>
            </div>
          </section>

          <!-- Divider -->
          <CrmlWavyDivider style-type="wave" color="#FF007F" />

          <!-- ================= SECTION 02: BUTTONS & BADGES ================= -->
          <section id="buttons" class="volume-section">
            <div class="volume-header">
              <CrmlStickerBadge variant="pink" tilt="none" star>SECTION 02</CrmlStickerBadge>
              <h2>BUTTONS, BADGES & DECORATIVE PRIMITIVES</h2>
              <span class="vol-tag font-mono">19—27</span>
            </div>

            <div class="showcase-grid-2col">
              <!-- 19_bouncy_arcade_button -->
              <div class="component-card">
                <div class="card-header-bar">
                  <span class="card-filename font-mono">// 19_bouncy_arcade_button.tsx</span>
                  <CrmlBadge variant="primary">BUTTON</CrmlBadge>
                </div>
                <p class="card-desc">Mechanical arcade buttons with instant 4px spring compression.</p>
                <div class="card-demo row-wrap">
                  <CrmlBouncyButton variant="lime" size="sm">Click CRML</CrmlBouncyButton>
                  <CrmlBouncyButton variant="pink" size="sm">Spring Danger</CrmlBouncyButton>
                  <CrmlBouncyButton variant="cyan" size="sm">Squish Pill</CrmlBouncyButton>
                </div>
                <span class="card-caption font-mono">STATE: REST (0, 4px shadow) → ACTIVE (+4px, 0 shadow)</span>
              </div>

              <!-- 20_sticker_badge_tag -->
              <div class="component-card">
                <div class="card-header-bar">
                  <span class="card-filename font-mono">// 20_sticker_badge_tag.tsx</span>
                  <CrmlBadge variant="primary" class="font-mono">STICKER BADGE</CrmlBadge>
                </div>
                <p class="card-desc">Tilted vinyl tags (-4° to +6°) with peel-off hover effect.</p>
                <div class="card-demo row-wrap">
                  <CrmlStickerBadge variant="pink" tilt="left" star>🔥 HOT DROP</CrmlStickerBadge>
                  <CrmlStickerBadge variant="lime" tilt="right">⚡ 100% ORGANIC</CrmlStickerBadge>
                  <CrmlStickerBadge variant="cyan" tilt="left">🧪 PROTOTYPE</CrmlStickerBadge>
                </div>
                <span class="card-caption font-mono">Hover stickers to trigger peel-off realignment.</span>
              </div>

              <!-- 21_marquee_text_banner -->
              <div class="component-card">
                <div class="card-header-bar">
                  <span class="card-filename font-mono">// 21_marquee_text_banner.tsx</span>
                  <CrmlBadge variant="primary" class="font-mono">MARQUEE</CrmlBadge>
                </div>
                <p class="card-desc">High-contrast continuous running text ticker.</p>
                <div class="card-demo full-w">
                  <CrmlMarquee text="★ CRML SYSTEM ANNOUNCEMENT: VERSION 5.5 LIVE ★ ALL 56 PRIMITIVES INTEGRATED ★" variant="yellow" :speed="14" />
                </div>
                <span class="card-caption font-mono">SPEED: 14s LOOP • ACTIVE TICKER</span>
              </div>

              <!-- 22_squircle_blob_avatar -->
              <div class="component-card">
                <div class="card-header-bar">
                  <span class="card-filename font-mono">// 22_squircle_blob_avatar.tsx</span>
                  <CrmlBadge variant="primary" class="font-mono">AVATAR</CrmlBadge>
                </div>
                <p class="card-desc">Squircle & organic blob avatar frame with offset status badge.</p>
                <div class="card-demo row-wrap">
                  <CrmlBlobAvatar text="K" variant="lime" size="md" />
                  <CrmlBlobAvatar text="99" variant="pink" size="md" />
                  <CrmlBlobAvatar text="🤖" variant="yellow" size="md" />
                </div>
                <span class="card-caption font-mono">Solid 2.5px ink stroke with offset status markers.</span>
              </div>

              <!-- 23_comic_speech_bubble -->
              <div class="component-card">
                <div class="card-header-bar">
                  <span class="card-filename font-mono">// 23_comic_speech_bubble.tsx</span>
                  <CrmlBadge variant="primary" class="font-mono">SPEECH BUBBLE</CrmlBadge>
                </div>
                <p class="card-desc">Retro comic speech bubble with sharp angled tail for alerts.</p>
                <div class="card-demo">
                  <CrmlSpeechBubble text="SECRET DROP UNLOCKED IN TOKYO! ⚡" variant="pink" tail="bottom-left" />
                </div>
                <span class="card-caption font-mono">Comic speech bubble with angular pointer tail.</span>
              </div>

              <!-- 24_wavy_divider_line -->
              <div class="component-card">
                <div class="card-header-bar">
                  <span class="card-filename font-mono">// 24_wavy_divider_line.tsx</span>
                  <CrmlBadge variant="primary" class="font-mono">DIVIDER</CrmlBadge>
                </div>
                <p class="card-desc">Dynamic wavy & sawtooth organic line dividers with ink texture.</p>
                <div class="card-demo full-w" style="flex-direction: column;">
                  <CrmlWavyDivider style-type="wave" color="#CCFF00" />
                  <CrmlWavyDivider style-type="zigzag" color="#FF007F" />
                </div>
                <span class="card-caption font-mono">SVG sine wave & zig-zag path dividers.</span>
              </div>

              <!-- 25_stencil_stamp_badge -->
              <div class="component-card">
                <div class="card-header-bar">
                  <span class="card-filename font-mono">// 25_stencil_stamp_badge.tsx</span>
                  <CrmlBadge variant="primary" class="font-mono">STAMP BADGE</CrmlBadge>
                </div>
                <p class="card-desc">Angled stencil stamps (SOLD OUT, APPROVED) with weathered ink.</p>
                <div class="card-demo row-wrap">
                  <CrmlStampBadge text="SOLD OUT" variant="danger" tilt="left" />
                  <CrmlStampBadge text="APPROVED" variant="success" tilt="right" />
                </div>
                <span class="card-caption font-mono">Authentic worn ink texture digital stamps.</span>
              </div>

              <!-- 26_pixel_art_icon_wrapper -->
              <div class="component-card">
                <div class="card-header-bar">
                  <span class="card-filename font-mono">// 26_pixel_art_icon_wrapper.tsx</span>
                  <CrmlBadge variant="primary" class="font-mono">PIXEL ICON</CrmlBadge>
                </div>
                <p class="card-desc">Stepped frame container simulating 16-bit retro CRT scanlines.</p>
                <div class="card-demo row-wrap">
                  <CrmlPixelIconWrapper icon="🧪" size="md" glitch />
                  <CrmlPixelIconWrapper icon="💾" size="md" />
                  <CrmlPixelIconWrapper icon="⚔️" size="md" />
                </div>
                <span class="card-caption font-mono">PIXEL GRID: 8PX STEPPED • SCANLINE READY</span>
              </div>

              <!-- 27_doodle_border_box -->
              <div class="component-card span-2">
                <div class="card-header-bar">
                  <span class="card-filename font-mono">// 27_doodle_border_box.tsx</span>
                  <CrmlBadge variant="success" class="font-mono">DOODLE BOX</CrmlBadge>
                </div>
                <p class="card-desc">Hand-drawn sketch border box with tactile pencil accents.</p>
                <div class="card-demo full-w">
                  <CrmlDoodleContainer>
                    <h4 style="font-weight: 800; font-family: var(--crml-font-heading); font-size: 0.9rem;">Hand-Crafted Ink Rim ✏️</h4>
                    <p style="font-size: 0.75rem; opacity: 0.85; margin-top: 0.2rem;">
                      Breaks robotic uniformity with tactile charm.
                    </p>
                  </CrmlDoodleContainer>
                </div>
                <span class="card-caption font-mono">Hand-drawn SVG sketch border line.</span>
              </div>
            </div>
          </section>

          <!-- Divider -->
          <CrmlWavyDivider style-type="zigzag" color="#CCFF00" />

          <!-- ================= SECTION 03: CONTAINERS & CARDS ================= -->
          <section id="containers" class="volume-section">
            <div class="volume-header">
              <CrmlStickerBadge variant="yellow" tilt="none" star>SECTION 03</CrmlStickerBadge>
              <h2>CONTAINERS, CARDS & MODAL WINDOWS</h2>
              <span class="vol-tag font-mono">28—37</span>
            </div>

            <div class="showcase-grid-2col">
              <!-- 28_neubrutalism_card -->
              <div class="component-card">
                <div class="card-header-bar">
                  <span class="card-filename font-mono">// 28_neubrutalism_card.tsx</span>
                  <CrmlBadge variant="warning" class="font-mono">NEUBRUTAL CARD</CrmlBadge>
                </div>
                <p class="card-desc">Solid 4px hard shadow, 3px ink border, and corner status badge.</p>
                <div class="card-demo full-w">
                  <CrmlNeubrutalCard title="99.98% Tactile Feel" header-color="pink" style="width: 100%;">
                    <template #badge><CrmlBadge variant="success">HOT STAT</CrmlBadge></template>
                    <p style="font-size: 0.8rem; opacity: 0.85;">High-contrast ink geometry and mechanical tactile shadow.</p>
                  </CrmlNeubrutalCard>
                </div>
                <span class="card-caption font-mono">PHYSICS ENGINE: 0.00ms BLUR FILTER</span>
              </div>

              <!-- 29_y2k_glassmorphism_card -->
              <div class="component-card">
                <div class="card-header-bar">
                  <span class="card-filename font-mono">// 29_y2k_glassmorphism_card.tsx</span>
                  <CrmlBadge variant="warning" class="font-mono">GLASS CARD</CrmlBadge>
                </div>
                <p class="card-desc">Dot-textured frosted glass panel with 3px line & neo pastel colors.</p>
                <div class="card-demo full-w">
                  <CrmlGlassCard title="✦ CHROMATIC MATRIX ✦" subtitle="Heavy blur & rainbow border">
                    <p style="font-size: 0.8rem; opacity: 0.85;">High-contrast glass elevation framed by rainbow gradient.</p>
                  </CrmlGlassCard>
                </div>
                <span class="card-caption font-mono">Frosted glass surface backed by heavy backdrop-blur.</span>
              </div>

              <!-- 30_sticky_memo_widget -->
              <div class="component-card">
                <div class="card-header-bar">
                  <span class="card-filename font-mono">// 30_sticky_memo_widget.tsx</span>
                  <CrmlBadge variant="warning" class="font-mono">MEMO NOTE</CrmlBadge>
                </div>
                <p class="card-desc">Tilted memo note with tactile thumbtack pin & sprint checklist.</p>
                <div class="card-demo full-w">
                  <CrmlStickyNote title="// SPRINT_04 NOTES" color="yellow" tilt="left" />
                </div>
                <span class="card-caption font-mono">Tilted paper memo note with push pin accent.</span>
              </div>

              <!-- 31_funky_accordion -->
              <div class="component-card">
                <div class="card-header-bar">
                  <span class="card-filename font-mono">// 31_funky_accordion.tsx</span>
                  <CrmlBadge variant="warning" class="font-mono">ACCORDION</CrmlBadge>
                </div>
                <p class="card-desc">Thick border accordion with alternating playful backgrounds.</p>
                <div class="card-demo full-w">
                  <CrmlFunkyAccordion :items="faqItems" />
                </div>
                <span class="card-caption font-mono">Includes emoji icons & smooth height expand transition.</span>
              </div>

              <!-- 32_retro_modal_dialog -->
              <div class="component-card">
                <div class="card-header-bar">
                  <span class="card-filename font-mono">// 32_retro_modal_dialog.tsx</span>
                  <CrmlBadge variant="warning" class="font-mono">RETRO DIALOG</CrmlBadge>
                </div>
                <p class="card-desc">90s OS popup dialog window with titlebar & solid action buttons.</p>
                <div class="card-demo">
                  <CrmlBouncyButton variant="pink" size="sm" @click="dialogOpen = true">⚠️ system_alert.exe (Open Dialog)</CrmlBouncyButton>
                </div>
                <span class="card-caption font-mono">Retro window titlebar with controls & backdrop overlay.</span>
              </div>

              <!-- 33_tiered_pricing_matrix -->
              <div class="component-card">
                <div class="card-header-bar">
                  <span class="card-filename font-mono">// 33_tiered_pricing_matrix.tsx</span>
                  <CrmlBadge variant="warning" class="font-mono">PRICING CARD</CrmlBadge>
                </div>
                <p class="card-desc">Neubrutal pricing card (PRO MECHA TIER) with POPULAR badge.</p>
                <div class="card-demo full-w">
                  <CrmlPricingCard
                    title="PRO MECHA TIER"
                    price="$49"
                    period="/month"
                    popular
                    :features="[
                      { text: 'Unlimited Components', included: true },
                      { text: 'Zero Blur Physics', included: true },
                      { text: 'Full TS Declarations', included: true },
                      { text: '24/7 Cyber Support', included: true }
                    ]"
                    button-text="UPGRADE TO PRO 🚀"
                  />
                </div>
                <span class="card-caption font-mono">High-visibility POPULAR badge & thick checkmark list.</span>
              </div>

              <!-- 34_hypebeast_drop_banner -->
              <div class="component-card span-2">
                <div class="card-header-bar">
                  <span class="card-filename font-mono">// 34_hypebeast_drop_banner.tsx</span>
                  <CrmlBadge variant="warning" class="font-mono">DROP BANNER</CrmlBadge>
                </div>
                <p class="card-desc">Release countdown banner with big digital display & price tag.</p>
                <div class="card-demo full-w">
                  <CrmlHypebeastDropBanner title="CYBER-MECHA OVERSIZED TEE" :target-hours="50" />
                </div>
                <span class="card-caption font-mono">Real-time countdown timer with digital boxes for drop releases.</span>
              </div>

              <!-- 35_kanban_draggable_card -->
              <div class="component-card">
                <div class="card-header-bar">
                  <span class="card-filename font-mono">// 35_kanban_draggable_card.tsx</span>
                  <CrmlBadge variant="warning" class="font-mono">KANBAN CARD</CrmlBadge>
                </div>
                <p class="card-desc">Neubrutal ticket card with drag handles, P0 priority badge & avatar stack.</p>
                <div class="card-demo full-w">
                  <CrmlKanbanCard
                    title="CRML-809: Fix zero-blur shadow offset calculation in Safari engine"
                    tag="P0 CRITICAL"
                    assignee="K"
                    date="SEP 12"
                  />
                </div>
                <span class="card-caption font-mono">Drag handles & tactile priority tag pill.</span>
              </div>

              <!-- 36_tinder_swipe_card_deck -->
              <div class="component-card">
                <div class="card-header-bar">
                  <span class="card-filename font-mono">// 36_tinder_swipe_card_deck.tsx</span>
                  <CrmlBadge variant="primary" class="font-mono">SWIPE DECK</CrmlBadge>
                </div>
                <p class="card-desc">Interactive angled card deck with floating pass [✕] & like [♥] buttons.</p>
                <div class="card-demo full-w">
                  <CrmlSwipeCard />
                </div>
                <span class="card-caption font-mono">Tilted card stack with spring pass/like triggers.</span>
              </div>

              <!-- 37_editorial_review_quote_card -->
              <div class="component-card span-2">
                <div class="card-header-bar">
                  <span class="card-filename font-mono">// 37_editorial_review_quote_card.tsx</span>
                  <CrmlBadge variant="warning" class="font-mono">REVIEW QUOTE CARD</CrmlBadge>
                </div>
                <p class="card-desc">Editorial testimonial card with giant quote mark & 5-star rating.</p>
                <div class="card-demo full-w">
                  <CrmlReviewQuoteCard />
                </div>
                <span class="card-caption font-mono">Giant watermark quote mark & VERIFIED buyer chip.</span>
              </div>
            </div>
          </section>

          <!-- Divider -->
          <CrmlWavyDivider style-type="wave" color="#00F0FF" />

          <!-- ================= SECTION 04: NAVIGATION, INDICATORS & FEEDBACK ================= -->
          <section id="nav" class="volume-section">
            <div class="volume-header">
              <CrmlStickerBadge variant="cyan" tilt="none" star>SECTION 04</CrmlStickerBadge>
              <h2>NAVIGATION, INDICATORS & FEEDBACK</h2>
              <span class="vol-tag font-mono">38—47</span>
            </div>

            <div class="showcase-grid-2col">
              <!-- 38_dynamic_pill_tab_bar -->
              <div class="component-card">
                <div class="card-header-bar">
                  <span class="card-filename font-mono">// 38_dynamic_pill_tab_bar.tsx</span>
                  <CrmlBadge variant="success" class="font-mono">PILL TABS</CrmlBadge>
                </div>
                <p class="card-desc">Chunky tab selector with sliding pill highlight & sharp contrast.</p>
                <div class="card-demo">
                  <CrmlPillTabs v-model="activeTab" :items="tabItems" variant="lime" />
                </div>
                <span class="card-caption font-mono">ACTIVE STATE: HARD SOLID LIME FILL + 2PX SHADOW OFFSET</span>
              </div>

              <!-- 39_chunky_segmented_control -->
              <div class="component-card">
                <div class="card-header-bar">
                  <span class="card-filename font-mono">// 39_chunky_segmented_control.tsx</span>
                  <CrmlBadge variant="success" class="font-mono">SEGMENTED</CrmlBadge>
                </div>
                <p class="card-desc">Multi-view option switcher (GRID / LIST / MATRIX) with smooth indicator.</p>
                <div class="card-demo full-w">
                  <CrmlSegmentedControl v-model="segmentedVal1" :options="segmentOptions1" variant="lime" />
                </div>
                <span class="card-caption font-mono">Smooth active highlight indicator.</span>
              </div>

              <!-- 40_speed_dial_pagination -->
              <div class="component-card">
                <div class="card-header-bar">
                  <span class="card-filename font-mono">// 40_speed_dial_pagination.tsx</span>
                  <CrmlBadge variant="primary" class="font-mono">PAGINATION</CrmlBadge>
                </div>
                <p class="card-desc">Punch-hole ticket styled numeric pagination & speed dial pills.</p>
                <div class="card-demo full-w">
                  <CrmlPagination :total-pages="5" v-model:current-page="currentPage" />
                </div>
                <span class="card-caption font-mono">Numeric punch-hole ticket page selector.</span>
              </div>

              <!-- 41_punchcard_breadcrumbs -->
              <div class="component-card">
                <div class="card-header-bar">
                  <span class="card-filename font-mono">// 41_punchcard_breadcrumbs.tsx</span>
                  <CrmlBadge variant="primary" class="font-mono">BREADCRUMB</CrmlBadge>
                </div>
                <p class="card-desc">Punch-card angled arrow navigation breadcrumbs for hierarchy.</p>
                <div class="card-demo full-w">
                  <CrmlBreadcrumb :items="breadcrumbItems" separator="⚡" />
                </div>
                <span class="card-caption font-mono">Angled punch-card breadcrumbs hierarchy trail.</span>
              </div>

              <!-- 42_striped_progress_meter -->
              <div class="component-card">
                <div class="card-header-bar">
                  <span class="card-filename font-mono">// 42_striped_progress_meter.tsx</span>
                  <CrmlBadge variant="primary" class="font-mono">PROGRESS METER</CrmlBadge>
                </div>
                <p class="card-desc">Industrial hazard striped yellow-black progress meter.</p>
                <div class="card-demo full-w" style="flex-direction: column; gap: 0.4rem;">
                  <CrmlProgress :value="78" label="OVERHEAT PROTECTION" variant="lime" striped />
                  <CrmlProgress :value="94" label="INTEGRATION BUFFER" variant="pink" striped />
                </div>
                <span class="card-caption font-mono">Hazard stripes extracted from mecha machinery.</span>
              </div>

              <!-- 43_tactile_toast_alerts -->
              <div class="component-card">
                <div class="card-header-bar">
                  <span class="card-filename font-mono">// 43_tactile_toast_alerts.tsx</span>
                  <CrmlBadge variant="success" class="font-mono">ALERT CARDS</CrmlBadge>
                </div>
                <p class="card-desc">Alert notification cards (Success, Caution, Danger) with thick icons.</p>
                <div class="card-demo full-w" style="flex-direction: column; gap: 0.4rem;">
                  <CrmlAlert variant="lime" title="TOKENS SYNCHRONIZED" message="56 components loaded" dismissible />
                  <CrmlAlert variant="pink" title="BLUR BLOCKED" message="0% blur rule enforced" dismissible />
                </div>
                <span class="card-caption font-mono">Thick border alerts with dismiss buttons.</span>
              </div>

              <!-- 44_command_palette_modal -->
              <div class="component-card">
                <div class="card-header-bar">
                  <span class="card-filename font-mono">// 44_command_palette_modal.tsx</span>
                  <CrmlBadge variant="primary" class="font-mono">SPOTLIGHT CMD+K</CrmlBadge>
                </div>
                <p class="card-desc">Quick navigation spotlight palette with keyboard shortcuts.</p>
                <div class="card-demo">
                  <CrmlBouncyButton variant="lime" size="sm" @click="cmdOpen = true">🔍 Open Command Palette (Cmd+K)</CrmlBouncyButton>
                </div>
                <span class="card-caption font-mono">Spotlight search modal with keyboard navigation.</span>
              </div>

              <!-- 45_slide_filter_drawer_sheet -->
              <div class="component-card">
                <div class="card-header-bar">
                  <span class="card-filename font-mono">// 45_slide_filter_drawer_sheet.tsx</span>
                  <CrmlBadge variant="warning" class="font-mono">FILTER DRAWER</CrmlBadge>
                </div>
                <p class="card-desc">E-commerce side filter sheet drawer with faceted tags & Apply button.</p>
                <div class="card-demo">
                  <CrmlBouncyButton variant="pink" size="sm" @click="drawerOpen = true">🎛️ Toggle Filter Drawer</CrmlBouncyButton>
                </div>
                <span class="card-caption font-mono">Slide-in filter drawer sheet with backdrop overlay.</span>
              </div>

              <!-- 46_floating_reaction_bar -->
              <div class="component-card">
                <div class="card-header-bar">
                  <span class="card-filename font-mono">// 46_floating_reaction_bar.tsx</span>
                  <CrmlBadge variant="success" class="font-mono">REACTION BAR</CrmlBadge>
                </div>
                <p class="card-desc">Floating reaction bar with mechanical spring live count pills.</p>
                <div class="card-demo">
                  <CrmlFloatingEmojiBar />
                </div>
                <span class="card-caption font-mono">Click buttons to increment live reaction counters.</span>
              </div>

              <!-- 47_cyber_status_badge_matrix -->
              <div class="component-card">
                <div class="card-header-bar">
                  <span class="card-filename font-mono">// 47_cyber_status_badge_matrix.tsx</span>
                  <CrmlBadge variant="success" class="font-mono">STATUS MATRIX</CrmlBadge>
                </div>
                <p class="card-desc">Matrix of 6 micro status badges (LIVE_MODE, OVERLOAD, etc.).</p>
                <div class="card-demo full-w">
                  <CrmlStatusMatrix />
                </div>
                <span class="card-caption font-mono">Micro status indicators with pulsing dot light.</span>
              </div>
            </div>
          </section>

          <!-- Divider -->
          <CrmlWavyDivider style-type="zigzag" color="#FF007F" />

          <!-- ================= SECTION 05: DATA TABLES & TELEMETRY GADGETS ================= -->
          <section id="gadgets" class="volume-section">
            <div class="volume-header">
              <CrmlStickerBadge variant="pink" tilt="none" star>SECTION 05</CrmlStickerBadge>
              <h2>DATA TABLES, MEDIA & CYBER TELEMETRY GADGETS</h2>
              <span class="vol-tag font-mono">48—56</span>
            </div>

            <div class="showcase-grid-2col">
              <!-- 48_tactile_data_table -->
              <div class="component-card span-2">
                <div class="card-header-bar">
                  <span class="card-filename font-mono">// 48_tactile_data_table.tsx</span>
                  <CrmlBadge variant="warning" class="font-mono">DATA TABLE</CrmlBadge>
                </div>
                <p class="card-desc">Dense data table with sort indicators, alternating rows & status chips.</p>
                <div class="card-demo full-w">
                  <CrmlTable :columns="tableColumns" :data="tableData" accent-color="yellow">
                    <template #cell-status="{ value }">
                      <CrmlBadge :variant="value === 'ACTIVE' ? 'success' : 'warning'">{{ value }}</CrmlBadge>
                    </template>
                    <template #cell-actions>
                      <CrmlBouncyButton variant="lime" size="sm">EDIT</CrmlBouncyButton>
                    </template>
                  </CrmlTable>
                </div>
                <span class="card-caption font-mono">Dense row grid with status badges & custom cell slots.</span>
              </div>

              <!-- 49_tactile_kpi_stat_card -->
              <div class="component-card">
                <div class="card-header-bar">
                  <span class="card-filename font-mono">// 49_tactile_kpi_stat_card.tsx</span>
                  <CrmlBadge variant="warning" class="font-mono">KPI STAT CARD</CrmlBadge>
                </div>
                <p class="card-desc">Analytics KPI stat card with big numbers & percentage chip.</p>
                <div class="card-demo full-w">
                  <CrmlPriceTagWidget
                    title="MONTHLY DROP REVENUE"
                    price="128.4K"
                    badge-text="▲ +24.8%"
                    :stock-current="42"
                    :stock-total="100"
                    button-text="CHECK TELEMETRY ⚡"
                  />
                </div>
                <span class="card-caption font-mono">Big typography stats & stock meter.</span>
              </div>

              <!-- 50_interactive_code_snippet_box -->
              <div class="component-card">
                <div class="card-header-bar">
                  <span class="card-filename font-mono">// 50_interactive_code_snippet_box.tsx</span>
                  <CrmlBadge variant="success" class="font-mono">CODE BOX</CrmlBadge>
                </div>
                <p class="card-desc">Terminal container for code with TSX/React highlighting & instant copy.</p>
                <div class="card-demo full-w">
                  <CrmlCodeBlock :code="codeSnippet" title="install_crml_ui.sh" />
                </div>
                <span class="card-caption font-mono">Includes live 1-click clipboard copy feedback.</span>
              </div>

              <!-- 51_lofi_retro_video_player -->
              <div class="component-card">
                <div class="card-header-bar">
                  <span class="card-filename font-mono">// 51_lofi_retro_video_player.tsx</span>
                  <CrmlBadge variant="danger" class="font-mono">MEDIA PLAYER</CrmlBadge>
                </div>
                <p class="card-desc">Retro video player frame with CRT overlay, live REC dot & peak meter.</p>
                <div class="card-demo full-w">
                  <CrmlVideoPlayer title="RETRO_CYBER_DEMO.MP4" />
                </div>
                <span class="card-caption font-mono">CRT scanlines overlay & physical playback controls.</span>
              </div>

              <!-- 52_vaporwave_audio_bar -->
              <div class="component-card">
                <div class="card-header-bar">
                  <span class="card-filename font-mono">// 52_vaporwave_audio_bar.tsx</span>
                  <CrmlBadge variant="success" class="font-mono">AUDIO VISUALIZER</CrmlBadge>
                </div>
                <p class="card-desc">Retro cassette audio visualizer with neon segment bars.</p>
                <div class="card-demo">
                  <CrmlVaporwaveVisualizer :bars="14" />
                </div>
                <span class="card-caption font-mono">SYNTHWAVE_CASSETTE_A.WAV • LIVE EQ</span>
              </div>

              <!-- 53_circular_speedometer_dial -->
              <div class="component-card">
                <div class="card-header-bar">
                  <span class="card-filename font-mono">// 53_circular_speedometer_dial.tsx</span>
                  <CrmlBadge variant="danger" class="font-mono">SPEEDOMETER</CrmlBadge>
                </div>
                <p class="card-desc">Circular speedometer gauge dial with % capacity readout & mode selector.</p>
                <div class="card-demo full-w">
                  <CrmlSpeedometerDial />
                </div>
                <span class="card-caption font-mono">Physical needle arm rotation & mode selector pills.</span>
              </div>

              <!-- 54_tactile_radar_telemetry -->
              <div class="component-card">
                <div class="card-header-bar">
                  <span class="card-filename font-mono">// 54_tactile_radar_telemetry.tsx</span>
                  <CrmlBadge variant="primary" class="font-mono">RADAR HUD</CrmlBadge>
                </div>
                <p class="card-desc">Circular radar HUD with vector sweep animation & live coordinates.</p>
                <div class="card-demo full-w">
                  <CrmlRadarTelemetry />
                </div>
                <span class="card-caption font-mono">Rotating vector sweep line & clickable target blips.</span>
              </div>

              <!-- 55_mechanical_soundboard_matrix -->
              <div class="component-card">
                <div class="card-header-bar">
                  <span class="card-filename font-mono">// 55_mechanical_soundboard_matrix.tsx</span>
                  <CrmlBadge variant="success" class="font-mono">MPC SOUNDBOARD</CrmlBadge>
                </div>
                <p class="card-desc">16-pad MPC drum soundboard grid with retro-pop palette & BPM display.</p>
                <div class="card-demo full-w">
                  <CrmlSoundboard />
                </div>
                <span class="card-caption font-mono">16 physical pads with illuminated status lights.</span>
              </div>

              <!-- 56_tactile_notification_drawer -->
              <div class="component-card span-2">
                <div class="card-header-bar">
                  <span class="card-filename font-mono">// 56_tactile_notification_drawer.tsx</span>
                  <CrmlBadge variant="warning" class="font-mono">NOTIF DRAWER</CrmlBadge>
                </div>
                <p class="card-desc">Popover notification drawer with counter badge & MARK ALL READ.</p>
                <div class="card-demo">
                  <CrmlNotificationDrawer />
                </div>
                <span class="card-caption font-mono">Bell trigger button & popover alert list.</span>
              </div>
            </div>
          </section>

          <!-- SPECIFICATION MATRIX -->
          <section id="tokens" class="demo-section">
            <div class="section-header">
              <h2>🎨 DESIGN TOKEN SPECIFICATION MATRIX</h2>
              <p>Primitive color spectrum mapping, semantic roles, spring mechanics, and hard shadow geometry.</p>
            </div>

            <div class="token-spec-box">
              <h3>PART A: PRIMITIVE COLOR SPECTRUM</h3>
              <div class="palette-grid">
                <div class="swatch-card" style="background: var(--crt-electric-lime); color: var(--crt-obsidian);">
                  <span class="swatch-name font-mono">electric-lime</span>
                  <code>#CCFF00</code>
                </div>
                <div class="swatch-card" style="background: var(--crt-hot-pink); color: var(--crt-pure-white);">
                  <span class="swatch-name font-mono">hot-pink</span>
                  <code>#FF007F</code>
                </div>
                <div class="swatch-card" style="background: var(--crt-cyber-cyan); color: var(--crt-obsidian);">
                  <span class="swatch-name font-mono">cyber-cyan</span>
                  <code>#00F0FF</code>
                </div>
                <div class="swatch-card" style="background: var(--crt-sunburst-yellow); color: var(--crt-obsidian);">
                  <span class="swatch-name font-mono">sunburst</span>
                  <code>#FFD600</code>
                </div>
              </div>

              <h3 style="margin-top: 1.5rem;">PART B: MECHANICAL PHYSICS SPECIFICATIONS</h3>
              <div class="spec-metrics-grid">
                <div class="spec-metric">
                  <span class="num">400</span>
                  <span class="lbl font-mono">SPRING STIFFNESS (Arcade-level rebound)</span>
                </div>
                <div class="spec-metric">
                  <span class="num">15</span>
                  <span class="lbl font-mono">SPRING DAMPING (Zero ringing overshoot)</span>
                </div>
                <div class="spec-metric">
                  <span class="num">4.00px</span>
                  <span class="lbl font-mono">TRANSLATION OFFSET (Hard shadow collapse)</span>
                </div>
              </div>
            </div>
          </section>

          <!-- Download Banner -->
          <div class="production-banner">
            <div>
              <span class="hero-version font-mono">PACKAGE DISPATCH READY</span>
              <h3 style="margin-top: 0.35rem;">TAKE CRML - UI TO PRODUCTION</h3>
              <p>Includes 56 Vue 3 SFC components, TypeScript declarations, and Vite ESM/UMD package bundles.</p>
            </div>
            <div class="row-wrap">
              <CrmlBouncyButton variant="lime" size="lg">DOWNLOAD FULL KIT (.ZIP)</CrmlBouncyButton>
              <CrmlBouncyButton variant="white" size="lg">COPY JSON</CrmlBouncyButton>
            </div>
          </div>
        </main>

        <!-- Footer -->
        <footer class="playground-footer">
          <div class="footer-col">
            <h4 class="footer-title font-mono">CRML - UI MASTER SUITE</h4>
            <p class="footer-desc font-mono">
              © 2026 CRML - UI DESIGN SYSTEM // 56 BESPOKE PRODUCTION PRIMITIVES UNIFIED // ZERO BLUR RIGID TACTILITY
            </p>
          </div>
          <div class="footer-col">
            <h4 class="footer-title font-mono">SUITES NAVIGATION</h4>
            <a href="#inputs">Sec 01: Inputs & Form Suite (01-18)</a>
            <a href="#buttons">Sec 02: Buttons & Badges (19-27)</a>
            <a href="#containers">Sec 03: Containers & Cards (28-37)</a>
            <a href="#nav">Sec 04: Nav & Feedback (38-47)</a>
            <a href="#gadgets">Sec 05: Data & Cyber Gadgets (48-56)</a>
            <a href="#tokens">Sec 06: Design Tokens Specs</a>
          </div>
        </footer>
      </div>
    </div>

    <div v-else-if="currentView === 'storybook'" class="playground-layout">
      <StorybookView @switch-view="currentView = $event" />
    </div>

    <div v-else-if="currentView === 'docs'" class="playground-layout">
      <DocsDashboardView @switch-view="currentView = $event" />
    </div>

    <!-- Modals & Drawers -->
    <CrmlRetroDialog v-model:open="dialogOpen" title="system_alert.exe" header-theme="pink">
      <div style="text-align: center; padding: 1rem 0;">
        <span style="font-size: 3rem;">⚠️</span>
        <h3 style="font-size: 1.25rem; font-weight: 800; font-family: var(--crml-font-heading); margin-top: 0.5rem;">
          Confirm Tactile Action?
        </h3>
        <p style="font-size: 0.9rem; opacity: 0.85; margin-top: 0.5rem;">
          56 components ready to compile into production.
        </p>
      </div>
      <template #footer>
        <CrmlBouncyButton variant="lime" size="sm" @click="dialogOpen = false">CONFIRM ACTION</CrmlBouncyButton>
      </template>
    </CrmlRetroDialog>

    <!-- Command Palette Modal -->
    <CrmlCommandPalette v-model:open="cmdOpen" />

    <!-- Filter Drawer Sheet -->
    <CrmlFilterDrawer v-model:open="drawerOpen" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import {
  CrmlButton,
  CrmlBouncyButton,
  CrmlBadge,
  CrmlStickerBadge,
  CrmlInput,
  CrmlNeonSwitch,
  CrmlBlobAvatar,
  CrmlMarquee,
  CrmlProgress,
  CrmlSpeechBubble,
  CrmlWavyDivider,
  CrmlStampBadge,
  CrmlPixelIconWrapper,
  CrmlTextarea,
  CrmlCheckbox,
  CrmlFloatingEmojiBar,
  CrmlPillTabs,
  CrmlDropdown,
  CrmlEmojiRatingSlider,
  CrmlVaporwaveVisualizer,
  CrmlDoodleContainer,
  CrmlRadioGroup,
  CrmlPagination,
  CrmlBreadcrumb,
  CrmlAlert,
  CrmlNeubrutalCard,
  CrmlRetroDialog,
  CrmlFunkyAccordion,
  CrmlToast,
  CrmlHypebeastDropBanner,
  CrmlGlassCard,
  CrmlStickyNote,
  CrmlFileUpload,
  CrmlTable,
  CrmlSearchTagFilter,
  CrmlSegmentedControl,
  CrmlPriceTagWidget,
  CrmlCodeBlock,
  CrmlOtpInput,
  CrmlStepper,
  CrmlPricingCard,
  CrmlDualRangeSlider,
  CrmlCommandPalette,
  CrmlFilterDrawer,
  CrmlStatusMatrix,
  CrmlAiPromptInput,
  CrmlVideoPlayer,
  CrmlKanbanCard,
  CrmlSwipeCard,
  CrmlRadarTelemetry,
  CrmlSoundboard,
  CrmlNotificationDrawer,
  CrmlReviewQuoteCard,
  CrmlFaceIdToggle,
  CrmlSpeedometerDial,
  CrmlRichTextEditor,
  CrmlColorPicker,
  CrmlDatePicker,
  CrmlTimePicker,
  CrmlNumberInput,
  CrmlNavbar,
  CrmlSidebar,
  type TabItem,
  type DropdownOption,
  type RadioOption,
  type AccordionItem,
  type BreadcrumbItem,
  type CrmlTableColumn,
  type SegmentOption,
  type NavItem,
  type SidebarItem,
} from '../src/index';

import StorybookView from './StorybookView.vue';
import DocsDashboardView from './DocsDashboardView.vue';

const currentView = ref<'playground' | 'storybook' | 'docs'>('playground');
const isDark = ref(false);
const switchVal = ref(true);
const inputText = ref('tactile_wizard');
const textareaVal = ref('Synthesizing 56 primitives with zero blur.');
const numberVal = ref(4);
const richTextVal = ref('<b>CRML - UI</b> Rich Text Editor initialized with <i>zero ambient blur</i> and <u>tactile controls</u>!');
const pickerColor = ref('#CCFF00');
const pickerDate = ref('2026-09-12');
const pickerTime = ref('09:30 AM');
const activeTab = ref('feed');
const dialogOpen = ref(false);
const cmdOpen = ref(false);
const drawerOpen = ref(false);
const showToast = ref(true);

const searchVal = ref('');
const activeTagFilter = ref('all');
const selectedCategory = ref('y2k');
const ratingVal = ref(4);
const faceIdVal = ref(true);
const otpVal = ref('589214');
const sidebarCollapsed = ref(false);

const cbVal1 = ref(true);
const radioVal = ref('lime');
const currentPage = ref(2);

const segmentedVal1 = ref('grid');
const rangeMin = ref(150);
const rangeMax = ref(800);
const rangeMinCompact = ref(1500000);
const rangeMaxCompact = ref(8500000);

const codeSnippet = ref(`import { CrmlUI } from 'crml-ui';\n\nconst app = createApp(App); app.use(CrmlUI);`);

const stepperSteps = ref([
  { id: 'cart', label: '01 CART', icon: '🛒' },
  { id: 'billing', label: '02 BILLING', icon: '💳' },
  { id: 'dispatch', label: '03 DISPATCH', icon: '📦' }
]);

const navItems = ref<NavItem[]>([
  { id: 'inputs', label: '01 INPUTS', href: '#inputs', active: true, badge: '18 CARDS' },
  { id: 'buttons', label: '02 BUTTONS & BADGES', href: '#buttons' },
  { id: 'containers', label: '03 CARDS & LAYOUT', href: '#containers' },
  { id: 'nav', label: '04 NAV & FEEDBACK', href: '#nav' },
  { id: 'gadgets', label: '05 DATA & GADGETS', href: '#gadgets' },
  { id: 'docs', label: '🌐 MULTI-FRAMEWORK DOCS', badge: 'VUE • REACT • SVELTE • HTML' },
  { id: 'storybook', label: '📖 STORYBOOK EXPLORER', badge: 'INSPECTOR ✦' }
]);

const sidebarItems = ref<SidebarItem[]>([
  { id: 'inputs', label: 'Form & Input Suite', icon: '📝', section: 'CATEGORIES', active: true, badge: '18 CARDS' },
  { id: 'buttons', label: 'Buttons & Badges', icon: '🎮', section: 'CATEGORIES' },
  { id: 'containers', label: 'Containers & Cards', icon: '📦', section: 'CATEGORIES' },
  { id: 'nav', label: 'Nav & Feedback', icon: '⚡', section: 'CATEGORIES' },
  { id: 'gadgets', label: 'Data & Telemetry', icon: '🤖', section: 'CATEGORIES' },
  { id: 'docs', label: 'Multi-Framework Hub', icon: '🌐', section: 'SYSTEM', badge: 'NEW 4-IN-1' },
  { id: 'storybook', label: 'Storybook Explorer', icon: '📖', section: 'SYSTEM', badge: 'INSPECTOR' },
  { id: 'tokens', label: 'Design Tokens', icon: '🎨', section: 'SYSTEM' }
]);

const setActiveSection = (id: string) => {
  sidebarItems.value.forEach((item) => {
    item.active = item.id === id;
  });
  navItems.value.forEach((item) => {
    item.active = item.id === id;
  });
};

const handleNavClick = (item: NavItem) => {
  if (item.id === 'docs') {
    currentView.value = 'docs';
    setActiveSection(item.id);
    return;
  }
  if (item.id === 'storybook') {
    currentView.value = 'storybook';
    setActiveSection(item.id);
    return;
  }
  if (currentView.value !== 'playground') {
    currentView.value = 'playground';
  }
  setActiveSection(item.id);
  if (item.href) {
    setTimeout(() => {
      const el = document.querySelector(item.href!);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  }
};

const handleSidebarSelect = (item: SidebarItem) => {
  if (item.id === 'docs') {
    currentView.value = 'docs';
    setActiveSection(item.id);
    return;
  }
  if (item.id === 'storybook') {
    currentView.value = 'storybook';
    setActiveSection(item.id);
    return;
  }
  if (currentView.value !== 'playground') {
    currentView.value = 'playground';
  }
  setActiveSection(item.id);
  setTimeout(() => {
    const el = document.getElementById(item.id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, 50);
};

let observer: IntersectionObserver | null = null;

onMounted(() => {
  const sectionIds = ['inputs', 'buttons', 'containers', 'nav', 'gadgets', 'tokens'];
  const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    },
    {
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0.1
    }
  );

  sections.forEach((sec) => observer?.observe(sec));
});

onUnmounted(() => {
  observer?.disconnect();
});

const tabItems: TabItem[] = [
  { id: 'feed', label: 'Overview', icon: '🔥' },
  { id: 'tokens', label: 'Tokens', icon: '⚡' },
  { id: 'sandbox', label: 'Sandbox', icon: '🧪' }
];

const dropdownOptions: DropdownOption[] = [
  { value: 'y2k', label: 'Tier 01: Core Basics', icon: '⚡' },
  { value: 'neubrutalism', label: 'Tier 02: Archive Capsule', icon: '📦' },
  { value: 'hyper', label: 'Tier 03: Hyper-Rare Mecha', icon: '💖' }
];

const radioOptions: RadioOption[] = [
  { value: 'lime', label: 'Electric Lime (#CCFF00)' },
  { value: 'cyan', label: 'Cyber Cyan (#00F0FF)' },
  { value: 'pink', label: 'Hot Pink (#FF007F)' }
];

const segmentOptions1: SegmentOption[] = [
  { id: 'grid', label: '[ GRID VIEW ]' },
  { id: 'list', label: '[ LIST VIEW ]' },
  { id: 'matrix', label: '[ MATRIX ]' }
];

const breadcrumbItems: BreadcrumbItem[] = [
  { label: 'HOME', icon: '🏠' },
  { label: 'COMPONENTS', icon: '📦' },
  { label: 'PLAYGROUND', icon: '⚡' }
];

const tableColumns: CrmlTableColumn[] = [
  { key: 'id', label: 'ID', sortable: true },
  { key: 'name', label: 'COMPONENT', sortable: true },
  { key: 'category', label: 'CATEGORY' },
  { key: 'status', label: 'STATUS', align: 'center' },
  { key: 'actions', label: 'ACTIONS', align: 'center' }
];

const tableData = [
  { id: '#01', name: 'CrmlBouncyButton', category: 'Vol 1', status: 'ACTIVE' },
  { id: '#18', name: 'CrmlVaporwaveVisualizer', category: 'Vol 2', status: 'ACTIVE' },
  { id: '#34', name: 'CrmlPricingCard', category: 'Vol 4', status: 'ACTIVE' },
  { id: '#54', name: 'CrmlNavbar', category: 'Vol 5', status: 'ACTIVE' }
];

const faqItems: AccordionItem[] = [
  {
    id: '1',
    emoji: '⚛️',
    title: 'Why zero ambient blur?',
    content: 'Neubrutalist design relies on sharp hard ink drop-shadows to ensure high legibility and mechanical presence.'
  },
  {
    id: '2',
    emoji: '🎨',
    title: 'Are these compatible with Vue 3 Composition API?',
    content: 'Yes! Built natively with Vue 3 <script setup lang="ts"> and fully typed.'
  }
];
</script>

<style>
.playground-root {
  min-height: 100vh;
  background-color: var(--crml-bg-base);
  color: var(--crml-text-main);
  transition: background-color 0.25s ease;
  font-family: var(--crml-font-body);
}

.top-nav-sticky {
  position: sticky;
  top: 0;
  z-index: 9980;
  padding: 8px 16px;
  background: var(--crml-bg-base);
}

.toast-floating {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 9999;
}

.playground-layout {
  max-width: 1340px;
  margin: 0 auto;
  padding: 1.5rem 1.5rem 4rem 1.5rem;
  display: flex;
  gap: 1.75rem;
  align-items: flex-start;
}

.sidebar-sticky-col {
  position: sticky;
  top: 108px;
  z-index: 100;
  flex-shrink: 0;
  align-self: flex-start;
}

.playground-main-col {
  flex: 1;
  min-width: 0;
}

.playground-header {
  margin-bottom: 2.5rem;
}

.hero-badge-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--crml-font-heading);
  font-size: 0.8125rem;
  font-weight: 800;
  color: var(--crt-hot-pink);
  margin-bottom: 0.75rem;
}

.hero-title {
  font-family: var(--crml-font-heading);
  font-size: 3rem;
  font-weight: 900;
  letter-spacing: -0.02em;
  line-height: 1.1;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.hero-tag-box {
  background-color: var(--crt-electric-lime);
  color: var(--crt-obsidian);
  padding: 0.2rem 0.65rem;
  border: var(--crml-border-brutal);
  border-radius: var(--crml-radius-md);
  font-size: 2.2rem;
}

.hero-version {
  font-size: 0.9rem;
  padding: 0.25rem 0.6rem;
  background-color: var(--crt-hot-pink);
  color: var(--crt-pure-white);
  border-radius: var(--crml-radius-sm);
  border: 2px solid var(--crt-obsidian);
}

.hero-desc {
  font-size: 1.05rem;
  color: var(--crml-text-muted);
  max-width: 820px;
  margin-top: 1rem;
  line-height: 1.6;
}

.hero-metrics-row {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-top: 1.5rem;
}

.metric-chip {
  padding: 0.4rem 0.85rem;
  background-color: var(--crml-bg-surface);
  border: 2px solid var(--crt-obsidian);
  border-radius: var(--crml-radius-sm);
  font-family: var(--crml-font-mono);
  font-size: 0.8125rem;
  box-shadow: 2px 2px 0px var(--crt-obsidian);
}

.metric-chip.highlight {
  background-color: var(--crt-electric-lime);
  font-weight: 800;
}

.metric-chip.yellow-chip {
  background-color: var(--crt-sunburst-yellow);
  font-weight: 800;
}

.hero-cta-row {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 2rem;
}

.playground-body {
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
}

.volume-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.volume-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: var(--crml-border-brutal);
}

.volume-header h2 {
  font-family: var(--crml-font-heading);
  font-size: 1.4rem;
  font-weight: 900;
  letter-spacing: -0.01em;
}

.vol-tag {
  font-family: var(--crml-font-mono);
  font-size: 0.8125rem;
  font-weight: 800;
  color: var(--crml-text-muted);
  margin-left: auto;
}

/* STRICT EQUAL 2-COLUMN GRID MATCHING REFERENCE IMAGE SPEC */
.showcase-grid-2col {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem;
  width: 100%;
}
@media (max-width: 900px) {
  .showcase-grid-2col {
    grid-template-columns: minmax(0, 1fr);
  }
}

.component-card {
  background-color: var(--crml-bg-surface);
  border: var(--crml-border-brutal);
  border-radius: var(--crml-radius-lg);
  box-shadow: var(--crml-shadow-brutal);
  padding: 1.35rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  position: relative;
  min-width: 0;
  overflow: hidden;
  box-sizing: border-box;
}

.card-header-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px dashed var(--crml-border-subtle);
  padding-bottom: 0.5rem;
  min-width: 0;
}

.card-filename {
  font-family: var(--crml-font-mono);
  font-weight: 800;
  font-size: 0.85rem;
  color: var(--crml-text-main);
}

.card-desc {
  font-size: 0.8rem;
  color: var(--crml-text-muted);
  line-height: 1.4;
}

.card-demo {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-height: 3.5rem;
  min-width: 0;
  width: 100%;
  box-sizing: border-box;
}

.row-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  align-items: center;
}

.full-w {
  width: 100%;
}

.card-caption {
  font-size: 0.725rem;
  font-family: var(--crml-font-mono);
  color: var(--crml-text-muted);
  border-top: 1px dashed var(--crml-border-subtle);
  padding-top: 0.5rem;
  margin-top: 0.25rem;
}

.span-2 { grid-column: span 2; }
@media (max-width: 900px) {
  .span-2 { grid-column: span 1; }
}

.token-spec-box {
  background-color: var(--crml-bg-surface);
  border: var(--crml-border-brutal);
  border-radius: var(--crml-radius-xl);
  box-shadow: var(--crml-shadow-brutal-lg);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.token-spec-box h3 {
  font-family: var(--crml-font-heading);
  font-size: 1.15rem;
  font-weight: 900;
}

.palette-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 1rem;
}

.swatch-card {
  padding: 1rem;
  border: var(--crml-border-brutal);
  border-radius: var(--crml-radius-md);
  box-shadow: var(--crml-shadow-brutal-sm);
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-family: var(--crml-font-heading);
  font-weight: 700;
}

.swatch-name { font-size: 0.85rem; }
.swatch-card code { font-size: 0.75rem; opacity: 0.9; }

.spec-metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.spec-metric {
  padding: 1.25rem;
  background-color: var(--crml-bg-elevated);
  border: 2px solid var(--crt-obsidian);
  border-radius: var(--crml-radius-md);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.spec-metric .num {
  font-family: var(--crml-font-heading);
  font-size: 1.75rem;
  font-weight: 900;
  color: var(--crt-hot-pink);
}

.spec-metric .lbl {
  font-size: 0.8rem;
  opacity: 0.85;
}

.production-banner {
  background: var(--grad-y2k-sunset);
  color: var(--crt-pure-white);
  border: var(--crml-border-brutal);
  border-radius: var(--crml-radius-xl);
  box-shadow: var(--crml-shadow-brutal-lg);
  padding: 2.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.production-banner h3 {
  font-family: var(--crml-font-heading);
  font-size: 1.85rem;
  font-weight: 900;
}

.production-banner p {
  font-size: 0.95rem;
  opacity: 0.95;
  margin-top: 0.25rem;
}

.playground-footer {
  margin-top: 4rem;
  padding-top: 3rem;
  border-top: var(--crml-border-brutal);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 2rem;
}

.footer-title {
  font-family: var(--crml-font-heading);
  font-size: 1rem;
  font-weight: 900;
  margin-bottom: 0.75rem;
}

.footer-desc {
  font-size: 0.85rem;
  opacity: 0.8;
  line-height: 1.5;
}

.footer-col {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-col a {
  color: var(--crml-text-main);
  text-decoration: none;
  font-size: 0.85rem;
}

.footer-col a:hover {
  color: var(--crt-hot-pink);
}
</style>
