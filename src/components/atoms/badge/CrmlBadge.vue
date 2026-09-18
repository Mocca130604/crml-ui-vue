<template>
  <span
    :class="[
      'crml-badge',
      `crml-badge--${variant}`,
      `crml-badge--${size}`,
      {
        'crml-badge--outlined': outlined,
        'crml-badge--dot': dot,
        'crml-badge--clickable': clickable
      }
    ]"
    @click="clickable ? $emit('click', $event) : undefined"
  >
    <span v-if="dot" class="crml-badge__dot-indicator"></span>
    <slot name="icon">
      <span v-if="icon" class="crml-badge__icon">{{ icon }}</span>
    </slot>
    <span v-if="!dot" class="crml-badge__content">
      <slot>{{ label }}</slot>
    </span>
    <button
      v-if="removable && !dot"
      type="button"
      class="crml-badge__remove"
      aria-label="Remove"
      @click.stop="$emit('remove')"
    >✕</button>
  </span>
</template>

<script setup lang="ts">
export interface CrmlBadgeProps {
  /** Display text content */
  label?: string;
  /** Color variant */
  variant?: 'lime' | 'pink' | 'cyan' | 'yellow' | 'neutral' | 'obsidian' | 'primary' | 'success' | 'warning' | 'danger';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Icon string (emoji/text), or use #icon slot */
  icon?: string;
  /** Show as outlined style instead of filled */
  outlined?: boolean;
  /** Show as small dot indicator only (hides label) */
  dot?: boolean;
  /** Show remove button */
  removable?: boolean;
  /** Make badge clickable */
  clickable?: boolean;
}

withDefaults(defineProps<CrmlBadgeProps>(), {
  variant: 'neutral',
  size: 'md',
  outlined: false,
  dot: false,
  removable: false,
  clickable: false,
});

defineEmits<{
  (e: 'remove'): void;
  (e: 'click', event: MouseEvent): void;
}>();
</script>

<style scoped>
.crml-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-family: var(--crml-font-heading);
  font-weight: 700;
  border-radius: var(--crml-radius-full);
  line-height: 1;
  white-space: nowrap;
  border: 2px solid var(--crml-border-ink, #0D0D0D);
  box-shadow: 2px 2px 0px var(--crml-shadow-ink, #0D0D0D);
  transition: all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
  user-select: none;
}

.crml-badge--clickable { cursor: pointer; }
.crml-badge--clickable:hover {
  transform: translate(-1px, -1px);
  box-shadow: 3px 3px 0px var(--crml-shadow-ink, #0D0D0D);
}

/* Sizes */
.crml-badge--sm { padding: 0.15rem 0.45rem; font-size: 0.7rem; }
.crml-badge--md { padding: 0.25rem 0.65rem; font-size: 0.8rem; }
.crml-badge--lg { padding: 0.35rem 0.85rem; font-size: 0.9rem; }

/* Filled Variants */
.crml-badge--neutral { background-color: var(--crml-bg-elevated); color: var(--crml-text-main); }
.crml-badge--primary { background-color: var(--crml-action-primary); color: var(--crml-text-on-primary, #FFFFFF); }
.crml-badge--lime { background-color: var(--crt-electric-lime); color: var(--crt-obsidian); }
.crml-badge--pink { background-color: var(--crt-hot-pink); color: var(--crt-pure-white); }
.crml-badge--cyan { background-color: var(--crt-cyber-cyan); color: var(--crt-obsidian); }
.crml-badge--yellow { background-color: var(--crt-sunburst-yellow); color: var(--crt-obsidian); }
.crml-badge--obsidian { background-color: var(--crt-obsidian); color: var(--crml-action-primary); }

/* Legacy backward-compatible variants */
.crml-badge--success { background-color: var(--crt-electric-lime); color: var(--crt-obsidian); }
.crml-badge--warning { background-color: var(--crt-sunburst-yellow); color: var(--crt-obsidian); }
.crml-badge--danger { background-color: var(--crt-hot-pink); color: var(--crt-pure-white); }

/* Outlined Variants */
.crml-badge--outlined { background-color: transparent; }
.crml-badge--outlined.crml-badge--primary { color: var(--crml-action-primary); border-color: var(--crml-action-primary); box-shadow: 2px 2px 0px var(--crml-shadow-ink, #0D0D0D); }
.crml-badge--outlined.crml-badge--lime { color: var(--crt-electric-lime); border-color: var(--crt-electric-lime); box-shadow: 2px 2px 0px var(--crml-shadow-ink, #0D0D0D); }
.crml-badge--outlined.crml-badge--pink { color: var(--crt-hot-pink); border-color: var(--crt-hot-pink); box-shadow: 2px 2px 0px var(--crml-shadow-ink, #0D0D0D); }
.crml-badge--outlined.crml-badge--cyan { color: var(--crt-cyber-cyan); border-color: var(--crt-cyber-cyan); box-shadow: 2px 2px 0px var(--crml-shadow-ink, #0D0D0D); }
.crml-badge--outlined.crml-badge--yellow { color: var(--crt-sunburst-yellow); border-color: var(--crt-sunburst-yellow); box-shadow: 2px 2px 0px var(--crml-shadow-ink, #0D0D0D); }

/* Dark Mode Harmonious Badges (prevent glaring neon flash) */
:root[data-theme="dark"] .crml-badge--yellow,
:root[data-theme="dark"] .crml-badge--warning,
[data-theme="dark"] .crml-badge--yellow,
[data-theme="dark"] .crml-badge--warning,
.dark-mode .crml-badge--yellow,
.dark-mode .crml-badge--warning {
  background-color: rgba(245, 158, 11, 0.16);
  color: #FBBF24;
  border-color: rgba(245, 158, 11, 0.35);
}

:root[data-theme="dark"] .crml-badge--lime,
:root[data-theme="dark"] .crml-badge--success,
[data-theme="dark"] .crml-badge--lime,
[data-theme="dark"] .crml-badge--success,
.dark-mode .crml-badge--lime,
.dark-mode .crml-badge--success {
  background-color: rgba(16, 185, 129, 0.16);
  color: #34D399;
  border-color: rgba(16, 185, 129, 0.35);
}

:root[data-theme="dark"] .crml-badge--cyan,
[data-theme="dark"] .crml-badge--cyan,
.dark-mode .crml-badge--cyan {
  background-color: rgba(6, 182, 212, 0.16);
  color: #38BDF8;
  border-color: rgba(6, 182, 212, 0.35);
}

:root[data-theme="dark"] .crml-badge--pink,
:root[data-theme="dark"] .crml-badge--danger,
[data-theme="dark"] .crml-badge--pink,
[data-theme="dark"] .crml-badge--danger,
.dark-mode .crml-badge--pink,
.dark-mode .crml-badge--danger {
  background-color: rgba(244, 63, 94, 0.16);
  color: #FB7185;
  border-color: rgba(244, 63, 94, 0.35);
}

:root[data-theme="dark"] .crml-badge--primary,
[data-theme="dark"] .crml-badge--primary,
.dark-mode .crml-badge--primary {
  background-color: rgba(27, 111, 255, 0.22);
  color: #60A5FA;
  border-color: rgba(27, 111, 255, 0.45);
}

:root[data-theme="dark"] .crml-badge--neutral,
[data-theme="dark"] .crml-badge--neutral,
.dark-mode .crml-badge--neutral {
  background-color: rgba(255, 255, 255, 0.08);
  color: #E2E8F0;
  border-color: rgba(255, 255, 255, 0.18);
}

/* Dot mode */
.crml-badge--dot { padding: 0.2rem 0.4rem; }
.crml-badge__dot-indicator {
  width: 0.5rem; height: 0.5rem;
  border-radius: 50%;
  background-color: currentColor;
}

.crml-badge__icon { font-size: 0.85em; line-height: 1; }

.crml-badge__remove {
  background: none; border: none; cursor: pointer; color: inherit;
  font-family: var(--crml-font-heading); font-weight: 900;
  font-size: 0.7em; line-height: 1; padding: 0; margin-left: 0.1rem;
  opacity: 0.7;
}
.crml-badge__remove:hover { opacity: 1; }
</style>
