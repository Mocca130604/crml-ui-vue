# CRML - UI MASTER SUITE (v5.0)
> **Definitive Neubrutalism, Y2K Cyber & Streetwear Design System**  
> 53 Production Primitives • Zero Ambient Blur Policy • Strict 100% Mechanical Physics

---

## ⚡ Overview & Design Philosophy

**CRML - UI** is a production-ready, highly tactile design system library built for Vue 3, TypeScript, and modern web applications. Synthesizing playful Neubrutalism, Y2K cyber-mecha aesthetics, retro 90s OS window chrome, and streetwear graphic design, CRML-UI enforces a strict **Zero Ambient Blur** rule: no soft drop-shadows, no fuzzy blurs—only crisp, high-contrast 3px solid ink borders and mechanical 4px offset drop-shadows.

### Core Principles
1. **Zero Ambient Blur**: All elevation is achieved via solid ink offsets (`box-shadow: 4px 4px 0px #0D0D0D`).
2. **Mechanical Physics**: Arcade-level button compression (400 spring stiffness, 15 damping, 4px spring translation).
3. **High-Contrast Palette**: Electric Lime (`#CCFF00`), Hot Pink (`#FF007F`), Cyber Cyan (`#00F0FF`), Sunburst Yellow (`#FFD600`), and Obsidian Black (`#0D0D0D`).
4. **Cross-Framework Reproducibility**: Clean CSS custom properties (`--crt-*` / `--crml-*`) enable identical cloning across **Vue 3, React, Svelte, Angular, HTML/CSS, or TailwindCSS**.

---

## 🎨 Design Token Specification Matrix

### 1. Primitive & Semantic Palette
```css
:root {
  /* Primitive Spectrum */
  --crt-electric-lime: #CCFF00;
  --crt-hot-pink: #FF007F;
  --crt-cyber-cyan: #00F0FF;
  --crt-sunburst-yellow: #FFD600;
  --crt-peach: #FFD1DC;
  --crt-mint: #C4FCEF;
  --crt-obsidian: #0D0D0D;
  --crt-pure-white: #FFFFFF;
  --crt-smoke: #1A1A1A;

  /* Semantic Tokens */
  --crml-bg-base: #F8F9FA;
  --crml-bg-surface: #FFFFFF;
  --crml-bg-elevated: #F4F4F5;
  --crml-text-main: #0D0D0D;
  --crml-text-muted: #666666;
  --crml-border-brutal: 3px solid #0D0D0D;
  --crml-shadow-brutal: 4px 4px 0px #0D0D0D;
  --crml-shadow-brutal-lg: 6px 6px 0px #0D0D0D;
}
```

### 2. Typography Rules
- **Headings & Titles**: `Outfit`, `Syne`, or `Space Grotesk` (Weight: 900 / Heavy, Uppercase)
- **Monospace Labels & Codes**: `JetBrains Mono` or `Space Mono` (Weight: 800)
- **Body Text**: `Inter` or `Space Grotesk` (Weight: 700 / 800)

---

## 🤖 MCP & LLM Agent Integration Guide

This package includes a structured machine-readable specification file [`DESIGN_SYSTEM_SPEC.md`](file:///c:/Code/crml-ui/DESIGN_SYSTEM_SPEC.md) so AI agents, LLMs, and MCP (Model Context Protocol) servers can instantly generate exact replicas of any component in HTML/CSS, React, Vue, or Svelte.

### How to use with MCP:
1. Provide [`DESIGN_SYSTEM_SPEC.md`](file:///c:/Code/crml-ui/DESIGN_SYSTEM_SPEC.md) to your MCP server or AI prompt.
2. Ask the agent: *"Generate a Neubrutalist Login Form in React using CRML-UI design tokens."*
3. The agent will output exact HTML/CSS or React code matching CRML-UI borders, colors, and spring physics!

---

## 🚀 Installation & Framework Usage

### Vue 3 (Native Setup)
```bash
npm install crml-ui
```

```ts
// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import CrmlUI from 'crml-ui';
import 'crml-ui/style.css';

const app = createApp(App);
app.use(CrmlUI);
app.mount('#app');
```

```vue
<!-- Usage in Vue 3 -->
<script setup lang="ts">
import { ref } from 'vue';

const text = ref('');
const check = ref(true);
</script>

<template>
  <CrmlNeubrutalCard title="SYSTEM STATUS">
    <CrmlInput v-model="text" label="HANDLE" placeholder="@crml_user" />
    <CrmlCheckbox v-model="check" label="Enable Physics Engine" variant="lime" />
    <CrmlBouncyButton variant="lime">DEPLOY CODE 🚀</CrmlBouncyButton>
  </CrmlNeubrutalCard>
</template>
```

---

## ⚛️ Porting to React / HTML Template (Vanilla CSS)

Every CRML-UI component can be ported 1:1 to React or static HTML using standard CSS:

### React Equivalent Example (`BouncyButton.tsx`)
```tsx
import React from 'react';
import './crml-tokens.css';

interface BouncyButtonProps {
  variant?: 'lime' | 'pink' | 'cyan' | 'yellow';
  children: React.ReactNode;
  onClick?: () => void;
}

export const BouncyButton: React.FC<BouncyButtonProps> = ({
  variant = 'lime',
  children,
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      className={`crml-bouncy-btn variant-${variant}`}
    >
      {children}
    </button>
  );
};
```

### Static HTML & CSS Example
```html
<link rel="stylesheet" href="crml-ui/style.css">

<div class="crml-card">
  <div class="crml-card-header">
    <span class="crml-badge variant-lime">HOT DROP</span>
    <h3>CYBER MECHA TEE</h3>
  </div>
  <button class="crml-bouncy-btn variant-lime">BUY NOW ($49)</button>
</div>
```

---

## 📦 Component Catalog Inventory (53 Primitives)

### Volume 1: Core Playful Neubrutalism (01—10)
- `CrmlBouncyButton`: Arcade spring button with 4px press physics.
- `CrmlNeubrutalCard`: Ink-bordered container with solid 4px shadow & badge.
- `CrmlStickerBadge`: Rotated vinyl sticker tag (-4° to +6°) with peel-off hover.
- `CrmlMarquee`: Continuous running text announcement crawler ticker.
- `CrmlFloatingEmojiBar`: Floating interaction bar with spring live counters.
- `CrmlNeonSwitch`: Cyber mecha toggle switch with neon halo glow.
- `CrmlBlobAvatar`: Squircle & organic blob avatar frame with status marker.
- `CrmlRetroDialog`: 90s OS window dialog modal with titlebar & action buttons.
- `CrmlPillTabs`: Chunky tab selector with responsive sliding highlight.
- `CrmlFunkyAccordion`: Bouncy collapse FAQ accordion with alternating colors.

### Volume 2: Cyber & Streetwear Expansion (11—20)
- `CrmlHypebeastDropBanner`: Release countdown banner with digital display.
- `CrmlGlassCard`: Frosted glass panel with 3px line & neo pastel colors.
- `CrmlPixelIconWrapper`: 16-bit CRT scanlines stepped icon container.
- `CrmlStickyNote`: Tilted desk memo note with push pin & checklist.
- `CrmlEmojiRatingSlider`: Expressive rating slider with mood-changing emoji.
- `CrmlSpeechBubble`: Comic strip dialogue balloon with angled pointer tail.
- `CrmlWavyDivider`: Organic wave & sawtooth SVG ink dividers.
- `CrmlVaporwaveVisualizer`: Synthwave cassette audio EQ visualizer.
- `CrmlStampBadge`: Weathered ink stencil stamps (SOLD OUT, APPROVED).
- `CrmlDoodleContainer`: Hand-drawn sketch border box with pencil texture.

### Volume 3: Forms, Feedback & Navigation Extensions (21—30, 51—53)
- `CrmlInput` / `CrmlTextarea`: Overlapping tag labels & solid neon focus.
- `CrmlCheckbox` / `CrmlRadioGroup`: Square check switches & spring radio disks.
- `CrmlSearchTagFilter`: Command palette search bar with [CMD+K] & filter tags.
- `CrmlDropdown`: 4px layered select picker with chevron angle.
- `CrmlFileUpload`: Drag & drop zine dropzone with floppy disk icon `💾`.
- `CrmlProgress`: Industrial yellow-black diagonal hazard striped meter.
- `CrmlAlert` / `CrmlToast`: Alert cards with status icons & dismiss buttons.
- `CrmlPriceTagWidget`: KPI stat card with big numbers & percentage chip.
- `CrmlSegmentedControl`: Multi-view switcher (GRID / LIST / MATRIX).
- `CrmlPagination` / `CrmlBreadcrumb`: Concert punch-hole ticket pagination & breadcrumbs.
- `CrmlRichTextEditor` (#51): WYSIWYG & HTML code editor with word counter.
- `CrmlColorPicker` (#52): Neubrutalist swatch matrix & HEX color picker.
- `CrmlDatePicker` (#53): Calendar date picker with month nav & day pills.

### Volume 4: Advanced Systems, Commerce & Data Controls (31—40)
- `CrmlTable` (#31): Dense data table with sort indicators & zebra stripes.
- `CrmlOtpInput` (#32): 6-digit arcade PIN/OTP verification boxes.
- `CrmlStepper` (#33): Horizontal process stepper with solid connectors.
- `CrmlPricingCard` (#34): Neubrutal pricing card with POPULAR badge.
- `CrmlDualRangeSlider` (#35): Dual handle range filter slider with live value pills.
- `CrmlCommandPalette` (#36): Spotlight quick navigation palette.
- `CrmlFilterDrawer` (#37): E-commerce side filter sheet drawer.
- `CrmlStatusMatrix` (#39): Matrix of 6 micro status badges (LIVE_MODE, OVERLOAD).
- `CrmlCodeBlock` (#40): Terminal code container with instant copy feedback.

### Volume 5: AI, Media, Social & Gadgets (41—50)
- `CrmlAiPromptInput` (#41): AI prompt studio bar with token counter meter.
- `CrmlVideoPlayer` (#42): Retro video player frame with CRT overlay & REC dot.
- `CrmlKanbanCard` (#43): Ticket card with drag handles & P0 priority badge.
- `CrmlSwipeCard` (#44): Interactive swipe card deck with pass [✕] & like [♥].
- `CrmlRadarTelemetry` (#45): Circular radar HUD with vector sweep & live blips.
- `CrmlSoundboard` (#46): 16-pad MPC drum soundboard grid with BPM display.
- `CrmlNotificationDrawer` (#47): Popover notification drawer with unread counter.
- `CrmlReviewQuoteCard` (#48): Editorial review card with giant quote & 5 stars.
- `CrmlFaceIdToggle` (#49): Cyber passkey switch with Face ID wireframe & scan beam.
- `CrmlSpeedometerDial` (#50): Circular speedometer dial gauge with mode selector.

---

## 🛠️ Local Development & Playground

```bash
# Install dependencies
npm install

# Start local interactive dev server
npm run dev

# Compile production bundle and d.ts declarations
npm run build
```

---

## 📜 License
MIT License © 2026 CRML - UI Design System.
