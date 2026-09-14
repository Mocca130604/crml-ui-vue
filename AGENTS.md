# AGENTS.md - Repository Instructions & AI Context Guide

> **This document is the authoritative specification for AI Coding Assistants, LLMs, and Autonomous Agents working on or reading the `crml-ui` repository.**

---

## 🚀 1. Repository Purpose & Architecture

**`crml-ui`** is a production-grade, highly tactile Neubrutalism, Y2K Cyber Mecha, and Streetwear Design System Library built for **Vue 3 (Composition API `<script setup lang="ts">`)** and **Vite Library Mode**.

### File Tree Layout
```text
crml-ui/
├── AGENTS.md                  # Comprehensive AI Agent & System Guidelines (THIS FILE)
├── README.md                  # Public npm Package & Usage Documentation
├── DESIGN_SYSTEM_SPEC.md      # Machine-Readable Component & Token Spec for MCP Tools
├── playground/                # Interactive Showcase App for Local Testing
│   ├── App.vue                # Main Playground (55 Primitives Showcase in 2-Col Grid)
│   └── main.ts
├── src/
│   ├── tokens/                # CSS Design Tokens Architecture
│   │   ├── primitive.css      # Base Palette (#CCFF00, #FF007F, #00F0FF, #FFD600, #0D0D0D)
│   │   ├── semantic.css       # Mapped UI Variables (--crml-bg-base, --crml-shadow-brutal)
│   │   └── index.css
│   ├── components/            # Atomic Design Component Structure
│   │   ├── atoms/             # Button, Badge, Input, Switch, Avatar, Kbd, Progress, etc.
│   │   ├── molecules/         # Tabs, Dropdown, SearchFilter, DatePicker, ColorPicker, etc.
│   │   ├── organisms/         # Card, Dialog, Table, Stepper, Navbar, Sidebar, RichEditor, etc.
│   │   └── index.ts
│   └── index.ts               # Package Entry Point (Vue Plugin Installer & Export Registry)
├── package.json
└── vite.config.ts
```

---

## 🎨 2. Strict Design Guidelines & Constraints

When creating, modifying, or refactoring components in this repository, **you MUST strictly adhere to the following rules**:

### Rule 1: Zero Ambient Blur Policy
- ❌ **NEVER** use soft ambient drop-shadows like `box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);`.
- ❌ **NEVER** use `backdrop-filter: blur(...)` or `filter: blur(...)` for elevation.
- ✅ **ALWAYS** use solid ink drop-shadows:
  - Small Pills / Badges: `box-shadow: 2px 2px 0px #0D0D0D;`
  - Cards & Containers: `box-shadow: 4px 4px 0px #0D0D0D;`
  - Large Modals & Banners: `box-shadow: 6px 6px 0px #0D0D0D;`

### Rule 2: Ink Border Stroke Discipline
- ✅ Every component container, button, input, and chip MUST have a solid ink border:
  - Border style: `2.5px solid #0D0D0D` or `3px solid #0D0D0D`.
  - Corner radius: `4px` to `8px` for pills/buttons; `12px` to `16px` for cards.

### Rule 3: Mechanical Physics & Spring Rebound
- Interactive elements (Buttons, Tabs, Cards, Checks) simulate physical arcade buttons:
  - **Resting State**: `transform: translate(0px, 0px); box-shadow: 4px 4px 0px #0D0D0D;`
  - **Hover State**: `transform: translate(-1px, -1px); box-shadow: 5px 5px 0px #0D0D0D;`
  - **Active / Pressed State**: `transform: translate(3px, 3px); box-shadow: 1px 1px 0px #0D0D0D;`
  - Transition curve: `transition: all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);`

### Rule 4: Semantic Color Token Usage
- **Electric Lime (`#CCFF00`)**: Primary CTA, active states, highlighted stats.
- **Hot Pink (`#FF007F`)**: Danger, alerts, badge highlights, callouts.
- **Cyber Cyan (`#00F0FF`)**: Secondary actions, focus rings, status indicators.
- **Sunburst Yellow (`#FFD600`)**: Warnings, notifications, star ratings.
- **Obsidian Black (`#0D0D0D`)**: Text, solid ink borders, 3D offset shadows.
- **Pure White (`#FFFFFF`)**: Base container surfaces and background cards.

### Rule 5: 100% Component Customizability & Storybook Integration Discipline
- ✅ **EVERY** component generated or modified MUST be fully customizable through Vue props (such as `variant`, `size`, `disabled`, `title`, `label`, `placeholder`, `compact`, `mode`, `format`, `min`, `max`, `step`, `unit`, etc.) and default/named slots.
- ❌ **NEVER** hardcode static labels, text strings, colors, or sizes inside component implementations when they can be parameterized via props.
- ✅ **EVERY** new or updated component MUST be registered in `playground/StorybookView.vue` with:
  1. A dedicated, fully bound interactive template block in the **Live Canvas Preview**.
  2. Full property controls in the **Props & Variant Controls** panel.
  3. Live multi-variant rendering in the **Variant Gallery** (`lime`, `pink`, `cyan`, `yellow`).
  4. Complete `apiData` documentation specs.

---

## 🛠️ 3. Verification & Build Commands

Before declaring any task completed, run:
```bash
npm run build
```
This executes:
1. `vue-tsc --declaration --emitDeclarationOnly`: Strict TypeScript type-checking and `.d.ts` generation.
2. `vite build`: Production ESM and UMD library bundling into `dist/`.

---

## 📦 4. Component Inventory (55 Primitives)

All components are exported through `src/index.ts`:
- **Atoms**: `CrmlButton`, `CrmlBouncyButton`, `CrmlBadge`, `CrmlStickerBadge`, `CrmlInput`, `CrmlTextarea`, `CrmlCheckbox`, `CrmlNeonSwitch`, `CrmlBlobAvatar`, `CrmlMarquee`, `CrmlProgress`, `CrmlKbd`, `CrmlStampBadge`, `CrmlPixelIconWrapper`, `CrmlSpeechBubble`, `CrmlWavyDivider`.
- **Molecules**: `CrmlFloatingEmojiBar`, `CrmlPillTabs`, `CrmlDropdown`, `CrmlEmojiRatingSlider`, `CrmlVaporwaveVisualizer`, `CrmlDoodleContainer`, `CrmlRadioGroup`, `CrmlPagination`, `CrmlBreadcrumb`, `CrmlAlert`, `CrmlSearchTagFilter`, `CrmlSegmentedControl`, `CrmlCodeBlock`, `CrmlFaceIdToggle`, `CrmlOtpInput`, `CrmlStepper`, `CrmlDualRangeSlider`, `CrmlStatusMatrix`, `CrmlColorPicker`, `CrmlDatePicker`.
- **Organisms**: `CrmlCard`, `CrmlNeubrutalCard`, `CrmlRetroDialog`, `CrmlFunkyAccordion`, `CrmlToast`, `CrmlHypebeastDropBanner`, `CrmlGlassCard`, `CrmlStickyNote`, `CrmlFileUpload`, `CrmlFormGroup`, `CrmlTable`, `CrmlPriceTagWidget`, `CrmlTimeline`, `CrmlPricingCard`, `CrmlCommandPalette`, `CrmlFilterDrawer`, `CrmlAiPromptInput`, `CrmlVideoPlayer`, `CrmlKanbanCard`, `CrmlSwipeCard`, `CrmlRadarTelemetry`, `CrmlSoundboard`, `CrmlNotificationDrawer`, `CrmlReviewQuoteCard`, `CrmlSpeedometerDial`, `CrmlRichTextEditor`, `CrmlNavbar`, `CrmlSidebar`.

---

## 🌐 5. Cross-Framework Synchronization Protocol (React / HTML / Svelte)

All frameworks in the `crml-ui` ecosystem reside in parallel directories under `C:\Code`:
- **`crml-ui`** (Vue 3 master repository)
- **`crml-ui-react`** (React 18/19 library)
- **`crml-ui-html`** (Pure HTML5 & Vanilla Tactile library)
- **`crml-ui-svelte`** (Svelte 5 library)

### Synchronization Commands:
When creating, updating, or refactoring components in `crml-ui`, **you MUST keep the sibling frameworks synchronized**:
```bash
npm run sync:all      # Syncs tokens, checks parity, and auto-scaffolds missing components
npm run sync:tokens   # Syncs CSS design tokens to React, HTML, and Svelte
npm run sync:check    # Prints real-time parity matrix (scripts/component-matrix.json)
```

### Strict Parity Rules:
1. **Design Token Singularity**: All repos consume identical CSS variables (`--crt-electric-lime`, `--crt-obsidian`, etc.).
2. **Prop & Styling Parity**:
   - Class names: `.crml-*` (identical across Vue, React, Svelte, HTML).
   - Borders: `2.5px solid #0D0D0D` or `3px solid #0D0D0D`.
   - Shadows: `4px 4px 0px #0D0D0D` (0% ambient blur).
   - Active physics: `transform: translate(3px, 3px); box-shadow: 1px 1px 0px #0D0D0D;`.
3. **Automated Parity Maintenance**:
   - Every new component added to `crml-ui/src/components/` must be registered in `scripts/sync-frameworks.mjs` and ported to React, Svelte, and HTML.

---

---

## 📦 Synchronized Semantic Versioning & NPM Release Protocol

Whenever modifications, bug fixes, component additions, or documentation updates (such as README revisions) are committed:

### 🏷️ Versioning Classification Scheme:
1. **MAJOR UPDATE (`+1.0.0` or `X.0.0`)**:
   - Triggered whenever a **NEW COMPONENT** is added to the library (e.g. introducing a new primitive in atoms, molecules, or organisms).
2. **MINOR UPDATE (`0.+1.0` or `x.X.0`)**:
   - Triggered whenever a **BUG FIX** is implemented (resolving component logic bugs, styling errors, or cross-browser behavioral glitches).
3. **PATCH UPDATE (`0.0.+1` or `x.x.X`)**:
   - Triggered for **LIGHTER CHANGES** (documentation updates, README revisions, SEO tweaks, internal refactoring, typings, and configuration maintenance).

### 📋 NPM Package Files Whitelist:
- `package.json` MUST explicitly declare `"README.md"` inside `"files"`:
  ```json
  "files": [
    "dist",
    "README.md"
  ]
  ```
  This guarantees that `README.md` is always bundled into the published npm tarball and renders immediately on the npmjs.com overview page.

### 🚨 MANDATORY AUTOMATED COMMIT, VERSION BUMP, NPM PUBLISH & GIT PUSH PROTOCOL:
Whenever an update, bug fix, component addition, or styling task is completed and there are no further pending additions from the user, the agent MUST automatically perform the full release sequence:
1. **Bump Version in `package.json`** according to the classification scheme above (e.g. bump to next semver).
2. **Build Verification**: Run `npm run build` to verify type-checking and generate clean bundles in `dist/`.
3. **Publish to NPM**:
   ```bash
   npm publish --access public
   ```
4. **Git Commit & Push**:
   ```bash
   git add -A
   git commit -m "chore(release): bump to vX.Y.Z - <description>"
   git push origin main
   ```
This guarantees that all sibling repositories, external users, and the live dashboard are always in sync with the latest released packages without requiring manual intervention.