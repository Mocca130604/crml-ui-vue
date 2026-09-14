<template>
  <Transition name="toast-slide">
    <div v-if="visible" :class="['crml-toast', `crml-toast--${variant}`, `crml-toast--${size}`]">
      <div class="crml-toast__icon">
        <slot name="icon">{{ icon || defaultIcon }}</slot>
      </div>

      <div class="crml-toast__content">
        <h4 v-if="title" class="crml-toast__title">{{ title }}</h4>
        <div class="crml-toast__message">
          <slot>{{ message }}</slot>
        </div>
      </div>

      <div v-if="$slots.action" class="crml-toast__action">
        <slot name="action" />
      </div>

      <button
        v-if="closable"
        type="button"
        class="crml-toast__close"
        :aria-label="closeLabel"
        @click="closeToast"
      >{{ closeIcon }}</button>

      <div
        v-if="showProgress && duration > 0"
        class="crml-toast__progress"
        :class="[`crml-toast__progress--${variant}`]"
        :style="{ animationDuration: `${duration}ms` }"
      ></div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

export interface CrmlToastProps {
  /** Toast title */
  title?: string;
  /** Toast message text (or use default slot) */
  message?: string;
  /** Color variant */
  variant?: 'lime' | 'pink' | 'cyan' | 'yellow' | 'obsidian';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Custom icon (or use #icon slot) */
  icon?: string;
  /** Auto-dismiss duration in ms (0 = no auto-dismiss) */
  duration?: number;
  /** Show close button */
  closable?: boolean;
  /** Close button icon */
  closeIcon?: string;
  /** Close button aria-label */
  closeLabel?: string;
  /** Show progress bar for auto-dismiss timer */
  showProgress?: boolean;
}

const props = withDefaults(defineProps<CrmlToastProps>(), {
  variant: 'lime',
  size: 'md',
  duration: 4000,
  closable: true,
  closeIcon: '✕',
  closeLabel: 'Close',
  showProgress: true,
});

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const visible = ref(true);

const defaultIcon = computed(() => {
  switch (props.variant) {
    case 'lime': return '⚡';
    case 'pink': return '🔥';
    case 'cyan': return '🚀';
    case 'yellow': return '⚠️';
    case 'obsidian': return '📟';
    default: return '✨';
  }
});

const closeToast = () => {
  visible.value = false;
  emit('close');
};

onMounted(() => {
  if (props.duration > 0) {
    setTimeout(() => {
      closeToast();
    }, props.duration);
  }
});
</script>

<style scoped>
.crml-toast {
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
  border: var(--crml-border-brutal);
  border-radius: var(--crml-radius-md);
  box-shadow: var(--crml-shadow-brutal);
  font-family: var(--crml-font-body);
  max-width: 400px;
  width: 100%;
  position: relative;
  z-index: 9999;
  overflow: hidden;
}

/* Sizes */
.crml-toast--sm { padding: 0.6rem 0.85rem; }
.crml-toast--md { padding: 0.85rem 1.15rem; }
.crml-toast--lg { padding: 1.1rem 1.5rem; }

.crml-toast--lime { background-color: var(--crt-electric-lime); color: var(--crt-obsidian); }
.crml-toast--pink { background-color: var(--crt-hot-pink); color: var(--crt-pure-white); }
.crml-toast--cyan { background-color: var(--crt-cyber-cyan); color: var(--crt-obsidian); }
.crml-toast--yellow { background-color: var(--crt-sunburst-yellow); color: var(--crt-obsidian); }
.crml-toast--obsidian { background-color: var(--crt-obsidian); color: var(--crt-electric-lime); border-color: var(--crt-electric-lime); box-shadow: 4px 4px 0px var(--crt-electric-lime); }

.crml-toast__icon { font-size: 1.35rem; line-height: 1; }
.crml-toast--sm .crml-toast__icon { font-size: 1rem; }

.crml-toast__content { flex-grow: 1; }

.crml-toast__title {
  font-family: var(--crml-font-heading);
  font-weight: 800;
  text-transform: uppercase;
  margin-bottom: 0.15rem;
}

.crml-toast--sm .crml-toast__title { font-size: 0.8rem; }
.crml-toast--md .crml-toast__title { font-size: 0.9375rem; }
.crml-toast--lg .crml-toast__title { font-size: 1.0625rem; }

.crml-toast__message { font-size: 0.85rem; line-height: 1.4; }
.crml-toast--sm .crml-toast__message { font-size: 0.75rem; }
.crml-toast--lg .crml-toast__message { font-size: 0.95rem; }

.crml-toast__action {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.crml-toast__close {
  background: none;
  border: none;
  font-family: var(--crml-font-heading);
  font-weight: 900;
  font-size: 1rem;
  cursor: pointer;
  color: inherit;
  opacity: 0.85;
  padding: 0;
  flex-shrink: 0;
}
.crml-toast__close:hover { opacity: 1; transform: scale(1.1); }

/* Auto-dismiss progress bar */
.crml-toast__progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  width: 100%;
  animation: toast-progress-shrink linear forwards;
}

.crml-toast__progress--lime { background-color: var(--crt-obsidian); }
.crml-toast__progress--pink { background-color: var(--crt-pure-white); }
.crml-toast__progress--cyan { background-color: var(--crt-obsidian); }
.crml-toast__progress--yellow { background-color: var(--crt-obsidian); }
.crml-toast__progress--obsidian { background-color: var(--crt-electric-lime); }

@keyframes toast-progress-shrink {
  from { width: 100%; }
  to { width: 0%; }
}

.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.toast-slide-enter-from {
  opacity: 0;
  transform: translateX(40px) scale(0.9);
}

.toast-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.9);
}
</style>
