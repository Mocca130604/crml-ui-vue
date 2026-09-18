<template>
  <div v-if="show" :class="['crml-alert', `crml-alert--${variant}`, `crml-alert--${size}`, { 'crml-alert--bordered': bordered }]">
    <span class="crml-alert__icon">
      <slot name="icon">{{ icon || defaultIcon }}</slot>
    </span>
    <div class="crml-alert__content">
      <h4 v-if="title" class="crml-alert__title">{{ title }}</h4>
      <div class="crml-alert__message">
        <slot>{{ message }}</slot>
      </div>
    </div>
    <div v-if="$slots.action" class="crml-alert__action">
      <slot name="action" />
    </div>
    <button v-if="dismissible" type="button" class="crml-alert__close" @click="dismiss">{{ dismissIcon }}</button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

export interface CrmlAlertProps {
  /** Alert title */
  title?: string;
  /** Alert message */
  message?: string;
  /** Color variant */
  variant?: 'lime' | 'pink' | 'cyan' | 'yellow';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Custom icon */
  icon?: string;
  /** Show dismiss button */
  dismissible?: boolean;
  /** Dismiss button icon */
  dismissIcon?: string;
  /** Show border */
  bordered?: boolean;
}

const props = withDefaults(defineProps<CrmlAlertProps>(), {
  variant: 'lime',
  size: 'md',
  dismissible: true,
  dismissIcon: '✕',
  bordered: true,
});

const emit = defineEmits<{
  (e: 'dismiss'): void;
}>();

const show = ref(true);

const defaultIcon = computed(() => {
  switch (props.variant) {
    case 'lime': return '⚡';
    case 'pink': return '🔥';
    case 'cyan': return '🚀';
    case 'yellow': return '⚠️';
    default: return '✨';
  }
});

const dismiss = () => {
  show.value = false;
  emit('dismiss');
};
</script>

<style scoped>
.crml-alert {
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
  border-radius: var(--crml-radius-md);
  box-shadow: var(--crml-shadow-brutal-sm);
  font-family: var(--crml-font-body);
  width: 100%;
}

.crml-alert--bordered { border: var(--crml-border-brutal); }

/* Sizes */
.crml-alert--sm { padding: 0.5rem 0.85rem; }
.crml-alert--md { padding: 0.85rem 1.15rem; }
.crml-alert--lg { padding: 1.1rem 1.5rem; }

.crml-alert--lime { background-color: var(--crt-lime-100); color: var(--crt-obsidian); }
.crml-alert--pink { background-color: var(--crt-pink-100); color: var(--crt-pink-900); }
.crml-alert--cyan { background-color: var(--crt-cyan-100); color: var(--crt-cyan-900); }
.crml-alert--yellow { background-color: var(--crt-yellow-100); color: var(--crt-yellow-900); }

/* Dark Mode Support (clean translucent background with crisp vibrant text) */
:root[data-theme="dark"] .crml-alert--pink,
[data-theme="dark"] .crml-alert--pink,
.dark-mode .crml-alert--pink {
  background-color: rgba(244, 63, 94, 0.18);
  color: #FDA4AF;
  border-color: rgba(244, 63, 94, 0.4);
}

:root[data-theme="dark"] .crml-alert--cyan,
[data-theme="dark"] .crml-alert--cyan,
.dark-mode .crml-alert--cyan {
  background-color: rgba(6, 182, 212, 0.18);
  color: #7DD3FC;
  border-color: rgba(6, 182, 212, 0.4);
}

:root[data-theme="dark"] .crml-alert--yellow,
[data-theme="dark"] .crml-alert--yellow,
.dark-mode .crml-alert--yellow {
  background-color: rgba(245, 158, 11, 0.18);
  color: #FCD34D;
  border-color: rgba(245, 158, 11, 0.4);
}

:root[data-theme="dark"] .crml-alert--lime,
[data-theme="dark"] .crml-alert--lime,
.dark-mode .crml-alert--lime {
  background-color: rgba(16, 185, 129, 0.18);
  color: #6EE7B7;
  border-color: rgba(16, 185, 129, 0.4);
}

.crml-alert__icon { line-height: 1; }
.crml-alert--sm .crml-alert__icon { font-size: 1rem; }
.crml-alert--md .crml-alert__icon { font-size: 1.35rem; }
.crml-alert--lg .crml-alert__icon { font-size: 1.5rem; }

.crml-alert__content { flex-grow: 1; }

.crml-alert__title {
  font-family: var(--crml-font-heading);
  font-weight: 800;
  text-transform: uppercase;
  margin-bottom: 0.15rem;
}

.crml-alert--sm .crml-alert__title { font-size: 0.8rem; }
.crml-alert--md .crml-alert__title { font-size: 0.9375rem; }
.crml-alert--lg .crml-alert__title { font-size: 1.0625rem; }

.crml-alert__message { line-height: 1.4; }
.crml-alert--sm .crml-alert__message { font-size: 0.75rem; }
.crml-alert--md .crml-alert__message { font-size: 0.85rem; }
.crml-alert--lg .crml-alert__message { font-size: 0.95rem; }

.crml-alert__action {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.crml-alert__close {
  background: none;
  border: none;
  font-family: var(--crml-font-heading);
  font-weight: 900;
  font-size: 1rem;
  cursor: pointer;
  color: inherit;
  opacity: 0.8;
  flex-shrink: 0;
}
.crml-alert__close:hover { opacity: 1; }
</style>
