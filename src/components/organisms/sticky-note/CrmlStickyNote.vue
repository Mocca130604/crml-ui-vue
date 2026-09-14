<template>
  <div :class="['crml-sticky-note', `crml-sticky-note--${color}`, `crml-sticky-note--${tilt}`, `crml-sticky-note--${size}`]">
    <div v-if="showPin" class="push-pin">
      <slot name="pin">{{ pinIcon }}</slot>
    </div>
    <div v-if="title || $slots.title" class="sticky-title">
      <slot name="title">{{ title }}</slot>
    </div>
    <div class="sticky-body">
      <slot>{{ content }}</slot>
    </div>
    <div v-if="author || $slots.footer" class="sticky-footer">
      <slot name="footer">
        <span v-if="author" class="sticky-author">— {{ author }}</span>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface CrmlStickyNoteProps {
  /** Title text */
  title?: string;
  /** Body content text */
  content?: string;
  /** Author name */
  author?: string;
  /** Note color */
  color?: 'yellow' | 'peach' | 'mint' | 'lavender' | 'lime' | 'pink';
  /** Tilt direction */
  tilt?: 'left' | 'right' | 'none';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Show push pin */
  showPin?: boolean;
  /** Custom pin icon */
  pinIcon?: string;
}

withDefaults(defineProps<CrmlStickyNoteProps>(), {
  color: 'yellow',
  tilt: 'left',
  size: 'md',
  showPin: true,
  pinIcon: '📍',
});
</script>

<style scoped>
.crml-sticky-note {
  position: relative;
  border: var(--crml-border-brutal);
  border-radius: var(--crml-radius-sm);
  box-shadow: 4px 4px 0px var(--crml-shadow-ink, #0D0D0D);
  font-family: var(--crml-font-body);
  color: var(--crt-obsidian);
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Sizes */
.crml-sticky-note--sm { padding: 0.85rem; min-width: 160px; }
.crml-sticky-note--md { padding: 1.25rem 1.25rem 1.5rem; min-width: 220px; }
.crml-sticky-note--lg { padding: 1.75rem 1.5rem 2rem; min-width: 300px; }

.crml-sticky-note:hover {
  transform: scale(1.05) rotate(0deg) !important;
  box-shadow: 6px 6px 0px var(--crml-shadow-ink, #0D0D0D);
}

.crml-sticky-note--tilt-left { transform: rotate(-3deg); }
.crml-sticky-note--tilt-right { transform: rotate(4deg); }
.crml-sticky-note--tilt-none { transform: rotate(0deg); }

.crml-sticky-note--yellow { background-color: var(--crt-yellow-100); }
.crml-sticky-note--peach { background-color: var(--crt-peach-100); }
.crml-sticky-note--mint { background-color: var(--crt-mint); }
.crml-sticky-note--lavender { background-color: var(--crt-lavender-100); }
.crml-sticky-note--lime { background-color: var(--crt-electric-lime); }
.crml-sticky-note--pink { background-color: var(--crt-hot-pink); color: var(--crt-pure-white); }

.push-pin {
  position: absolute;
  top: -10px;
  right: 12px;
  font-size: 1.35rem;
  filter: drop-shadow(1px 1px 0px var(--crt-obsidian));
}

.sticky-title {
  font-family: var(--crml-font-heading);
  font-weight: 800;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  border-bottom: 2px dashed var(--crt-obsidian);
  padding-bottom: 0.25rem;
}

.crml-sticky-note--sm .sticky-title { font-size: 0.8rem; }
.crml-sticky-note--md .sticky-title { font-size: 0.9375rem; }
.crml-sticky-note--lg .sticky-title { font-size: 1.0625rem; }

.sticky-body { line-height: 1.5; }

.crml-sticky-note--sm .sticky-body { font-size: 0.75rem; }
.crml-sticky-note--md .sticky-body { font-size: 0.875rem; }
.crml-sticky-note--lg .sticky-body { font-size: 1rem; }

.sticky-footer {
  margin-top: 0.75rem;
  padding-top: 0.4rem;
  border-top: 1px dashed rgba(13, 13, 13, 0.3);
}

.sticky-author {
  font-family: var(--crml-font-heading);
  font-weight: 700;
  font-size: 0.75rem;
  font-style: italic;
  opacity: 0.7;
}
</style>
