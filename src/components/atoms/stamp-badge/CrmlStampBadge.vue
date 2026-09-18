<template>
  <div :class="['crml-stamp-badge', `crml-stamp-badge--${variant}`, `crml-stamp-badge--${tilt}`]">
    <span class="crml-stamp-badge__text">{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
export interface CrmlStampBadgeProps {
  text?: string;
  variant?: 'danger' | 'success' | 'warning' | 'info';
  tilt?: 'left' | 'right' | 'none';
}

withDefaults(defineProps<CrmlStampBadgeProps>(), {
  text: 'SOLD OUT',
  variant: 'danger',
  tilt: 'left',
});
</script>

<style scoped>
.crml-stamp-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.35rem 0.85rem;
  border: 3px double currentColor;
  border-radius: 4px;
  font-family: var(--crml-font-heading);
  font-weight: 900;
  font-size: 0.9375rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  user-select: none;
  position: relative;
  opacity: 0.9;
  mask-image: radial-gradient(circle, #000 70%, transparent 100%);
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.crml-stamp-badge:hover {
  transform: scale(1.1) rotate(0deg) !important;
  opacity: 1;
}

.crml-stamp-badge--tilt-left { transform: rotate(-8deg); }
.crml-stamp-badge--tilt-right { transform: rotate(10deg); }
.crml-stamp-badge--tilt-none { transform: rotate(0deg); }

.crml-stamp-badge--danger {
  color: var(--crt-hot-pink);
  border-color: var(--crt-hot-pink);
  background-color: rgba(255, 0, 127, 0.08);
}

.crml-stamp-badge--success {
  color: var(--crml-action-primary);
  border-color: var(--crml-action-primary);
  background-color: rgba(204, 255, 0, 0.08);
}

.crml-stamp-badge--warning {
  color: var(--crt-sunburst-yellow);
  border-color: var(--crt-sunburst-yellow);
  background-color: rgba(255, 214, 0, 0.08);
}

.crml-stamp-badge--info {
  color: var(--crt-cyber-cyan);
  border-color: var(--crt-cyber-cyan);
  background-color: rgba(0, 240, 255, 0.08);
}
</style>
