<script setup lang="ts">
export interface CrmlKbdProps {
  variant?: 'blue' | 'primary' | 'default' | 'lime' | 'pink' | 'cyan' | 'yellow'
  size?: 'sm' | 'md' | 'lg'
}

withDefaults(defineProps<CrmlKbdProps>(), {
  variant: 'default',
  size: 'md'
})
</script>

<template>
  <kbd :class="['crml-kbd', `crml-kbd--${variant}`, `crml-kbd--${size}`]">
    <slot></slot>
  </kbd>
</template>

<style scoped>
.crml-kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--crml-font-mono);
  font-weight: 800;
  border: 1.5px solid var(--crml-border-ink, #0D0D0D);
  border-radius: var(--crml-radius-sm, 4px);
  box-shadow: 2px 2px 0px var(--crml-shadow-ink, #0D0D0D);
  line-height: 1;
  user-select: none;
  transition: all 0.1s ease;
}

.crml-kbd:active {
  transform: translate(1px, 1px);
  box-shadow: 1px 1px 0px var(--crml-shadow-ink, #0D0D0D);
}

/* Sizes */
.crml-kbd--sm {
  font-size: 0.65rem;
  padding: 0.15rem 0.35rem;
  min-width: 1.25rem;
}

.crml-kbd--md {
  font-size: 0.775rem;
  padding: 0.25rem 0.5rem;
  min-width: 1.65rem;
}

.crml-kbd--lg {
  font-size: 0.9rem;
  padding: 0.35rem 0.65rem;
  min-width: 2rem;
}

/* Variants */
.crml-kbd--default {
  background-color: var(--crml-bg-surface, #ffffff);
  color: var(--crml-text-main, #0d0d0d);
}

.crml-kbd--lime { background-color: var(--crt-electric-lime); color: var(--crt-obsidian) !important; }

.crml-kbd--blue, .crml-kbd--primary { background-color: var(--crt-ryo-blue-500, #1B6FFF); color: #FFFFFF !important; }

.crml-kbd--pink {
  background-color: var(--crt-hot-pink, #ff007f);
  color: var(--crt-pure-white, #ffffff) !important;
}

.crml-kbd--cyan {
  background-color: var(--crt-cyber-cyan, #00f0ff);
  color: var(--crt-obsidian, #0d0d0d) !important;
}

.crml-kbd--yellow {
  background-color: var(--crt-sunburst-yellow, #ffd600);
  color: var(--crt-obsidian, #0d0d0d) !important;
}

/* Dark Mode Support */
:root[data-theme="dark"] .crml-kbd--default,
[data-theme="dark"] .crml-kbd--default,
.dark-mode .crml-kbd--default {
  background-color: #1A2234;
  color: #E2E8F0;
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 2px 2px 0px #000000;
}

:root[data-theme="dark"] .crml-kbd--cyan,
[data-theme="dark"] .crml-kbd--cyan,
.dark-mode .crml-kbd--cyan {
  background-color: rgba(6, 182, 212, 0.2);
  color: #38BDF8 !important;
  border-color: rgba(6, 182, 212, 0.4);
}

:root[data-theme="dark"] .crml-kbd--yellow,
[data-theme="dark"] .crml-kbd--yellow,
.dark-mode .crml-kbd--yellow {
  background-color: rgba(245, 158, 11, 0.2);
  color: #FBBF24 !important;
  border-color: rgba(245, 158, 11, 0.4);
}

:root[data-theme="dark"] .crml-kbd--pink,
[data-theme="dark"] .crml-kbd--pink,
.dark-mode .crml-kbd--pink {
  background-color: rgba(244, 63, 94, 0.2);
  color: #FB7185 !important;
  border-color: rgba(244, 63, 94, 0.4);
}
</style>
