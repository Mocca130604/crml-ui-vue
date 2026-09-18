<template>
  <div :class="[
    'crml-card',
    `crml-card--${variant}`,
    `crml-card--${size}`,
    {
      'crml-card--bordered': bordered,
      'crml-card--hoverable': hoverable,
      'crml-card--no-padding': noPadding,
      'crml-card--clickable': clickable
    }
  ]"
  @click="clickable ? $emit('click', $event) : undefined">
    <div v-if="$slots.media" class="crml-card__media">
      <slot name="media" />
    </div>

    <div v-if="$slots.header || title" class="crml-card__header">
      <slot name="header">
        <div class="crml-card__header-content">
          <div>
            <h3 v-if="title" class="crml-card__title">{{ title }}</h3>
            <p v-if="subtitle" class="crml-card__subtitle">{{ subtitle }}</p>
          </div>
          <div v-if="$slots.headerExtra" class="crml-card__header-extra">
            <slot name="headerExtra" />
          </div>
        </div>
      </slot>
    </div>

    <div v-if="!noPadding" class="crml-card__body">
      <slot />
    </div>
    <slot v-else />

    <div v-if="$slots.footer" class="crml-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
export interface CrmlCardProps {
  /** Card title */
  title?: string;
  /** Card subtitle */
  subtitle?: string;
  /** Visual or color variant */
  variant?: 'default' | 'elevated' | 'outlined' | 'brutal' | 'lime' | 'pink' | 'cyan' | 'yellow' | 'obsidian';
  /** Size (controls padding) */
  size?: 'sm' | 'md' | 'lg';
  /** Show border */
  bordered?: boolean;
  /** Hover animation */
  hoverable?: boolean;
  /** Remove body padding */
  noPadding?: boolean;
  /** Make card clickable */
  clickable?: boolean;
}

withDefaults(defineProps<CrmlCardProps>(), {
  variant: 'brutal',
  size: 'md',
  bordered: true,
  hoverable: false,
  noPadding: false,
  clickable: false,
});

defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();
</script>

<style scoped>
.crml-card {
  background-color: var(--crml-bg-surface);
  border-radius: var(--crml-radius-lg);
  overflow: hidden;
  transition: all 0.2s ease;
  font-family: var(--crml-font-body);
}

/* Variants */
.crml-card--default {
  box-shadow: var(--crml-shadow-sm);
}

.crml-card--elevated {
  box-shadow: var(--crml-shadow-md);
}

.crml-card--outlined {
  box-shadow: none;
}

.crml-card--brutal {
  border: var(--crml-border-brutal);
  box-shadow: var(--crml-shadow-brutal);
}

.crml-card--lime {
  border: var(--crml-border-brutal);
  box-shadow: var(--crml-shadow-brutal);
  background-color: var(--crml-action-primary);
  color: var(--crt-obsidian);
}
.crml-card--lime .crml-card__title,
.crml-card--lime .crml-card__body,
.crml-card--lime .crml-card__body p,
.crml-card--lime .crml-card__body span {
  color: var(--crt-obsidian) !important;
}
.crml-card--lime .crml-card__subtitle {
  color: rgba(13, 13, 13, 0.75) !important;
}

.crml-card--pink {
  border: var(--crml-border-brutal);
  box-shadow: var(--crml-shadow-brutal);
  background-color: var(--crt-hot-pink);
  color: #fff;
}
.crml-card--pink .crml-card__title,
.crml-card--pink .crml-card__body,
.crml-card--pink .crml-card__body p,
.crml-card--pink .crml-card__body span {
  color: #fff !important;
}
.crml-card--pink .crml-card__subtitle {
  color: rgba(255, 255, 255, 0.85) !important;
}

.crml-card--cyan {
  border: var(--crml-border-brutal);
  box-shadow: var(--crml-shadow-brutal);
  background-color: var(--crt-cyber-cyan);
  color: var(--crt-obsidian);
}
.crml-card--cyan .crml-card__title,
.crml-card--cyan .crml-card__body,
.crml-card--cyan .crml-card__body p,
.crml-card--cyan .crml-card__body span {
  color: var(--crt-obsidian) !important;
}
.crml-card--cyan .crml-card__subtitle {
  color: rgba(13, 13, 13, 0.75) !important;
}

.crml-card--yellow {
  border: var(--crml-border-brutal);
  box-shadow: var(--crml-shadow-brutal);
  background-color: var(--crt-sunburst-yellow);
  color: var(--crt-obsidian);
}
.crml-card--yellow .crml-card__title,
.crml-card--yellow .crml-card__body,
.crml-card--yellow .crml-card__body p,
.crml-card--yellow .crml-card__body span {
  color: var(--crt-obsidian) !important;
}
.crml-card--yellow .crml-card__subtitle {
  color: rgba(13, 13, 13, 0.75) !important;
}

.crml-card--obsidian {
  border: var(--crml-border-brutal);
  box-shadow: var(--crml-shadow-brutal);
  background-color: var(--crt-obsidian);
  color: #fff;
}
.crml-card--obsidian .crml-card__title,
.crml-card--obsidian .crml-card__body,
.crml-card--obsidian .crml-card__body p,
.crml-card--obsidian .crml-card__body span {
  color: #fff !important;
}
.crml-card--obsidian .crml-card__subtitle {
  color: #A1A1AA !important;
}

.crml-card--bordered {
  border: var(--crml-border-brutal);
}

.crml-card--hoverable:hover {
  transform: translate(-2px, -2px);
  box-shadow: var(--crml-shadow-brutal-lg);
}

.crml-card--clickable { cursor: pointer; }

/* Media slot */
.crml-card__media {
  width: 100%;
  overflow: hidden;
}

.crml-card__media :deep(img) {
  width: 100%;
  display: block;
}

.crml-card__header {
  border-bottom: var(--crml-border-brutal);
}

/* Size: padding */
.crml-card--sm .crml-card__header { padding: 0.65rem 0.85rem; }
.crml-card--md .crml-card__header { padding: 1rem 1.25rem; }
.crml-card--lg .crml-card__header { padding: 1.25rem 1.5rem; }

.crml-card__header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.75rem;
}

.crml-card__title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--crml-text-main);
  font-family: var(--crml-font-heading);
  margin: 0;
}

.crml-card__subtitle {
  font-size: 0.875rem;
  color: var(--crml-text-muted);
  margin-top: 0.25rem;
}

.crml-card__body {
  color: var(--crml-text-main);
}

.crml-card--sm .crml-card__body { padding: 0.85rem; }
.crml-card--md .crml-card__body { padding: 1.25rem; }
.crml-card--lg .crml-card__body { padding: 1.5rem; }

.crml-card__footer {
  border-top: var(--crml-border-brutal);
  background-color: var(--crml-bg-elevated);
}

.crml-card--sm .crml-card__footer { padding: 0.65rem 0.85rem; }
.crml-card--md .crml-card__footer { padding: 1rem 1.25rem; }
.crml-card--lg .crml-card__footer { padding: 1.25rem 1.5rem; }
</style>
