# CRML-UI DESIGN SYSTEM SPECIFICATION (MCP & LLM AGENT SPEC)

This document provides a machine-readable, precise specification of **CRML-UI** so AI agents, MCP (Model Context Protocol) servers, and developers can recreate or translate any component to React, Svelte, HTML/CSS, or TailwindCSS with 100% fidelity.

---

## 1. DESIGN RULES & GEOMETRY MATRIX

### 1.1 Zero Ambient Blur Policy
- **NO soft box shadows**, no `blur()`, no fuzzy gradients for depth.
- Elevation is achieved strictly via **Solid Ink Offset Box Shadows**:
  - Small elements (Badges, Buttons): `box-shadow: 2px 2px 0px #0D0D0D;`
  - Standard Cards & Containers: `box-shadow: 4px 4px 0px #0D0D0D;`
  - Large Banners & Modals: `box-shadow: 6px 6px 0px #0D0D0D;`

### 1.2 Border Ink Stroke Discipline
- All components MUST have a solid ink border:
  - Standard border: `2.5px solid #0D0D0D` or `3px solid #0D0D0D`.
  - Corner Radii:
    - Small pills & badges: `4px` to `8px` (`border-radius: 4px;` / `8px;`)
    - Cards & Containers: `12px` to `16px` (`border-radius: 12px;` / `16px;`)

### 1.3 Mechanical Physics (Button Press & Spring Motion)
- **Resting State**: `transform: translate(0px, 0px); box-shadow: 4px 4px 0px #0D0D0D;`
- **Hover State**: `transform: translate(-1px, -1px); box-shadow: 5px 5px 0px #0D0D0D;`
- **Active / Pressed State**: `transform: translate(3px, 3px); box-shadow: 1px 1px 0px #0D0D0D;`
- Transition curve: `transition: all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);`

---

## 2. PRIMITIVE & SEMANTIC COLOR PALETTE

```css
:root {
  /* PRIMITIVE COLOR PALETTE */
  --crt-electric-lime: #CCFF00;
  --crt-hot-pink: #FF007F;
  --crt-cyber-cyan: #00F0FF;
  --crt-sunburst-yellow: #FFD600;
  --crt-peach: #FFD1DC;
  --crt-mint: #C4FCEF;
  --crt-obsidian: #0D0D0D;
  --crt-pure-white: #FFFFFF;
  --crt-smoke: #161B22;

  /* SEMANTIC UI MAPPING */
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

---

## 3. TYPOGRAPHY & FONT STACK

1. **Heading Font Family (`font-heading`)**:
   - Stack: `'Outfit', 'Syne', 'Space Grotesk', system-ui, sans-serif`
   - Weight: `900` (Black / Heavy), `letter-spacing: -0.02em`, `text-transform: uppercase`
2. **Monospace Font Family (`font-mono`)**:
   - Stack: `'JetBrains Mono', 'Space Mono', monospace`
   - Weight: `800` / `900`
3. **Body Font Family (`font-body`)**:
   - Stack: `'Inter', system-ui, sans-serif`
   - Weight: `700` or `800`

---

## 4. COMPONENT DOM STRUCTURE & TAILWIND REPLICATION

### Example 1: Bouncy Button (`CrmlBouncyButton`)
#### HTML / CSS Syntax
```html
<button class="crml-bouncy-btn variant-lime">
  CLICK CRML 🚀
</button>

<style>
.crml-bouncy-btn {
  font-family: 'Outfit', sans-serif;
  font-weight: 900;
  font-size: 14px;
  padding: 10px 18px;
  border: 3px solid #0D0D0D;
  border-radius: 8px;
  background-color: #CCFF00;
  color: #0D0D0D;
  box-shadow: 4px 4px 0px #0D0D0D;
  cursor: pointer;
  transition: all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.crml-bouncy-btn:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px #0D0D0D;
}
.crml-bouncy-btn:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0px #0D0D0D;
}
</style>
```

#### TailwindCSS Equivalent
```html
<button class="font-extrabold text-sm px-4 py-2.5 border-[3px] border-[#0D0D0D] rounded-lg bg-[#CCFF00] text-[#0D0D0D] shadow-[4px_4px_0px_#0D0D0D] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#0D0D0D] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_#0D0D0D] transition-all duration-150">
  CLICK CRML 🚀
</button>
```

### Example 2: Neubrutal Card Container (`CrmlNeubrutalCard`)
#### React JSX Syntax
```tsx
export const NeubrutalCard = ({ title, badgeText, children }: any) => (
  <div className="bg-white border-[3px] border-[#0D0D0D] rounded-xl p-5 shadow-[4px_4px_0px_#0D0D0D] flex flex-col gap-3">
    <div className="flex justify-between items-center border-b-2 border-dashed border-[#e0e0e0] pb-2">
      <h3 className="font-extrabold text-lg tracking-tight uppercase text-[#0D0D0D]">{title}</h3>
      {badgeText && (
        <span className="bg-[#FF007F] text-white border-2 border-[#0D0D0D] rounded px-2 py-0.5 text-xs font-mono font-black shadow-[1.5px_1.5px_0px_#0D0D0D]">
          {badgeText}
        </span>
      )}
    </div>
    <div className="text-sm text-[#333] font-bold leading-relaxed">{children}</div>
  </div>
);
```

---

## 5. COMPONENT PROPS CATALOG & TYPINGS (53 COMPONENTS)

| Component Name | Props Interface | Description | Default Values |
|---|---|---|---|
| `CrmlBouncyButton` | `variant`, `size`, `disabled` | Arcade spring button | `variant: 'lime'`, `size: 'md'` |
| `CrmlNeubrutalCard` | `title`, `headerColor`, `badgeText` | Solid shadow card container | `headerColor: 'pink'` |
| `CrmlStickerBadge` | `variant`, `tilt`, `star` | Tilted vinyl streetwear tag | `tilt: 'left'`, `variant: 'pink'` |
| `CrmlMarquee` | `text`, `variant`, `speed` | Continuous horizontal ticker | `speed: 16`, `variant: 'lime'` |
| `CrmlFloatingEmojiBar` | `emojis` | Floating reaction bar with counters | `emojis: ['🔥','⚡','💖']` |
| `CrmlNeonSwitch` | `modelValue`, `variant`, `label` | Cyber mecha toggle switch | `variant: 'cyan'` |
| `CrmlBlobAvatar` | `text`, `variant`, `size` | Squircle/blob avatar frame | `variant: 'lime'`, `size: 'md'` |
| `CrmlRetroDialog` | `open`, `title`, `headerTheme` | 90s OS window dialog modal | `headerTheme: 'pink'` |
| `CrmlPillTabs` | `modelValue`, `items`, `variant` | Chunky sliding tab selector | `variant: 'lime'` |
| `CrmlFunkyAccordion` | `items` | Collapsible FAQ accordion | `items: [...]` |
| `CrmlHypebeastDropBanner` | `title`, `targetHours`, `price` | Release countdown banner | `targetHours: 50` |
| `CrmlGlassCard` | `title`, `subtitle` | Y2K frosted glass panel | `subtitle: ''` |
| `CrmlPixelIconWrapper` | `icon`, `size`, `glitch` | 16-bit CRT scanlines icon box | `size: 'md'` |
| `CrmlStickyNote` | `title`, `color`, `tilt` | Desk memo note with push pin | `color: 'yellow'` |
| `CrmlEmojiRatingSlider` | `modelValue` | Mood changing emoji slider | `modelValue: 5` |
| `CrmlSpeechBubble` | `text`, `variant`, `tail` | Comic speech balloon with tail | `variant: 'pink'` |
| `CrmlWavyDivider` | `styleType`, `color` | Organic wave/sawtooth SVG line | `styleType: 'wave'` |
| `CrmlVaporwaveVisualizer`| `bars` | Cassette audio EQ visualizer | `bars: 14` |
| `CrmlStampBadge` | `text`, `variant`, `tilt` | Weathered ink stencil stamp | `variant: 'danger'` |
| `CrmlDoodleContainer` | `strokeColor` | Sketch border box container | `strokeColor: '#000'` |
| `CrmlInput` | `modelValue`, `label`, `placeholder` | Form input with overlapping tag | `label: ''` |
| `CrmlTextarea` | `modelValue`, `label`, `maxLength` | Form textarea with char counter | `maxLength: 280` |
| `CrmlCheckbox` | `modelValue`, `label`, `variant` | Thick square checkbox switch | `variant: 'lime'` |
| `CrmlRadioGroup` | `modelValue`, `options`, `label` | Spring mechanical radio disks | `layout: 'row'` |
| `CrmlSearchTagFilter` | `modelValue`, `activeTag` | Keyboard-first search bar [CMD+K]| `activeTag: 'all'` |
| `CrmlDropdown` | `modelValue`, `options`, `label` | 4px layered select picker | `options: [...]` |
| `CrmlFileUpload` | `title`, `description`, `progressPercent` | Streetwear drag & drop zine dropzone | `progressPercent: 82` |
| `CrmlProgress` | `value`, `label`, `striped` | Hazard striped progress meter | `striped: true` |
| `CrmlAlert` | `title`, `message`, `variant` | Alert banner card | `variant: 'lime'` |
| `CrmlToast` | `title`, `message`, `variant` | Floating toast popover | `variant: 'lime'` |
| `CrmlPriceTagWidget` | `title`, `price`, `stockCurrent` | Analytics KPI stat card | `price: '$128.4K'` |
| `CrmlSegmentedControl` | `modelValue`, `options` | Multi-view switcher tab | `options: [...]` |
| `CrmlPagination` | `currentPage`, `totalPages` | Punch-hole ticket pagination | `totalPages: 5` |
| `CrmlBreadcrumb` | `items`, `separator` | Angled arrow breadcrumb trail | `separator: '⚡'` |
| `CrmlTable` | `columns`, `data`, `accentColor` | Dense data table with status badges | `accentColor: 'yellow'` |
| `CrmlOtpInput` | `modelValue`, `length` | 6-digit arcade PIN/OTP boxes | `length: 6` |
| `CrmlStepper` | `steps`, `currentStep` | Horizontal process step nodes | `currentStep: 2` |
| `CrmlPricingCard` | `title`, `price`, `popular` | Neubrutal pricing tier card | `popular: true` |
| `CrmlDualRangeSlider` | `min`, `max`, `minLimit`, `maxLimit` | Dual handle range filter slider | `minLimit: 0, maxLimit: 1000` |
| `CrmlCommandPalette` | `open` | Spotlight quick navigation palette | `open: false` |
| `CrmlFilterDrawer` | `open` | E-commerce side filter sheet | `open: false` |
| `CrmlStatusMatrix` | `statuses` | Matrix of 6 micro status badges | `statuses: [...]` |
| `CrmlCodeBlock` | `code`, `title`, `language` | Retro OS code snippet terminal | `language: 'tsx'` |
| `CrmlAiPromptInput` | `placeholder` | AI prompt studio input bar | `placeholder: '...'` |
| `CrmlVideoPlayer` | `title` | Retro CRT overlay video frame | `title: 'VIDEO.MP4'` |
| `CrmlKanbanCard` | `title`, `tag`, `assignee` | Neubrutal ticket card with drag handles | `tag: 'P0'` |
| `CrmlSwipeCard` | `cards` | Interactive swipe deck | `cards: [...]` |
| `CrmlRadarTelemetry` | `title`, `targets` | Circular radar HUD with vector sweep | `sweepSpeed: 3` |
| `CrmlSoundboard` | `title`, `bpm` | 16-pad MPC drum soundboard | `bpm: 128` |
| `CrmlNotificationDrawer`| `notifications` | Popover notification drawer | `notifications: [...]` |
| `CrmlReviewQuoteCard` | `quote`, `authorName`, `rating` | Editorial review quote card | `rating: 5` |
| `CrmlFaceIdToggle` | `modelValue`, `label` | Cyber Face ID passkey switch | `modelValue: true` |
| `CrmlSpeedometerDial` | `value`, `title`, `unit` | Circular speedometer dial gauge | `value: 78` |
| `CrmlRichTextEditor` | `modelValue`, `title` | WYSIWYG & HTML code editor | `title: 'EDITOR.TXT'` |
| `CrmlColorPicker` | `modelValue`, `label` | Neubrutalist color palette picker | `modelValue: '#CCFF00'` |
| `CrmlDatePicker` | `modelValue`, `label` | Calendar date picker with month nav | `modelValue: '2026-09-12'` |

---
*CRML-UI Specifications Version 5.0 — Ready for MCP & LLM Code Generation.*
