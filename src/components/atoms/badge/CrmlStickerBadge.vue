<template>
  <span
    :class="[
      'crml-sticker-badge',
      `crml-sticker-badge--${variant}`,
      `crml-sticker-badge--${tilt}`,
      `crml-sticker-badge--${size}`
    ]"
  >
    <span v-if="star" class="crml-sticker-badge__star">★</span>
    <slot />
  </span>
</template>

<script setup lang="ts">
export interface CrmlStickerBadgeProps {
  variant?: 'primary' | 'lime' | 'pink' | 'cyan' | 'yellow' | 'lavender' | 'peach' | 'mint' | 'obsidian' | 'grad-y2k' | 'grad-acid';
  tilt?: 'left' | 'right' | 'none';
  size?: 'sm' | 'md' | 'lg';
  star?: boolean;
}

withDefaults(defineProps<CrmlStickerBadgeProps>(), {
  variant: 'lime',
  tilt: 'left',
  size: 'md',
  star: false,
});
</script>

<style scoped>
.crml-sticker-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-family: var(--crml-font-heading);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: var(--crml-border-brutal);
  box-shadow: 2px 2px 0px var(--crml-shadow-ink, #0D0D0D);
  padding: 0.25rem 0.65rem;
  border-radius: var(--crml-radius-sm);
  white-space: nowrap;
  user-select: none;
  transition: transform 0.15s ease;
}

.crml-sticker-badge:hover {
  transform: scale(1.08) rotate(0deg) !important;
}

/* Tilt variations */
.crml-sticker-badge--left { transform: rotate(-3deg); }
.crml-sticker-badge--right { transform: rotate(4deg); }
.crml-sticker-badge--none { transform: rotate(0deg); }

/* Sizes */
.crml-sticker-badge--sm { font-size: 0.7rem; padding: 0.15rem 0.45rem; border-width: 2px; }
.crml-sticker-badge--md { font-size: 0.8125rem; padding: 0.25rem 0.65rem; }
.crml-sticker-badge--lg { font-size: 0.9375rem; padding: 0.35rem 0.85rem; }

/* Variants */
.crml-sticker-badge--primary { background-color: var(--crml-action-primary); color: var(--crml-text-on-primary, #FFFFFF); }
.crml-sticker-badge--lime { background-color: var(--crt-electric-lime); color: var(--crt-obsidian); }
.crml-sticker-badge--pink { background-color: var(--crt-hot-pink); color: var(--crt-pure-white); }
.crml-sticker-badge--cyan { background-color: var(--crt-cyber-cyan); color: var(--crt-obsidian); }
.crml-sticker-badge--yellow { background-color: var(--crt-sunburst-yellow); color: var(--crt-obsidian); }
.crml-sticker-badge--lavender { background-color: var(--crt-lavender); color: var(--crt-obsidian); }
.crml-sticker-badge--peach { background-color: var(--crt-peach); color: var(--crt-obsidian); }
.crml-sticker-badge--mint { background-color: var(--crt-mint); color: var(--crt-obsidian); }
.crml-sticker-badge--obsidian { background-color: var(--crt-obsidian); color: var(--crml-action-primary); border-color: var(--crml-action-primary); }
.crml-sticker-badge--grad-y2k { background: var(--grad-y2k-sunset); color: var(--crt-pure-white); }
.crml-sticker-badge--grad-acid { background: var(--grad-lime-acid); color: var(--crt-obsidian); }

.crml-sticker-badge__star { font-size: 0.85em; }
</style>
