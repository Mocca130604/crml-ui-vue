<template>
  <Teleport to="body">
    <div v-if="isOpen" class="crml-retro-dialog-backdrop" @click.self="handleBackdropClick">
      <div
        :class="[
          'crml-retro-dialog',
          `crml-retro-dialog--header-${headerTheme}`,
          `crml-retro-dialog--${size}`
        ]"
        role="dialog"
        aria-modal="true"
      >
        <div class="crml-retro-dialog__titlebar">
          <div class="titlebar-left">
            <slot name="windowIcon">
              <span class="window-icon">{{ windowIcon }}</span>
            </slot>
            <slot name="title">
              <span class="window-title">{{ title }}</span>
            </slot>
          </div>

          <div class="titlebar-controls">
            <button v-if="showMinimize" class="win-btn win-btn--minimize" @click="$emit('minimize')">{{ minimizeIcon }}</button>
            <button v-if="showMaximize" class="win-btn win-btn--maximize" @click="$emit('maximize')">{{ maximizeIcon }}</button>
            <button v-if="showClose" class="win-btn win-btn--close" aria-label="Close" @click="closeDialog">{{ closeIcon }}</button>
          </div>
        </div>

        <div class="crml-retro-dialog__body">
          <slot />
        </div>

        <div v-if="$slots.footer" class="crml-retro-dialog__footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue';

export interface CrmlRetroDialogProps {
  open?: boolean;
  modelValue?: boolean;
  /** Dialog title */
  title?: string;
  /** Header color theme */
  headerTheme?: 'pink' | 'lime' | 'cyan' | 'yellow' | 'obsidian';
  /** Close when clicking backdrop */
  closeOnBackdrop?: boolean;
  /** Dialog size */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen';
  /** Window icon character */
  windowIcon?: string;
  /** Show minimize button */
  showMinimize?: boolean;
  /** Show maximize button */
  showMaximize?: boolean;
  /** Show close button */
  showClose?: boolean;
  /** Close button icon */
  closeIcon?: string;
  /** Minimize button icon */
  minimizeIcon?: string;
  /** Maximize button icon */
  maximizeIcon?: string;
}

const props = withDefaults(defineProps<CrmlRetroDialogProps>(), {
  open: false,
  modelValue: false,
  title: 'CRML_SYSTEM_ALERT.EXE',
  headerTheme: 'pink',
  closeOnBackdrop: true,
  size: 'md',
  windowIcon: '📟',
  showMinimize: true,
  showMaximize: true,
  showClose: true,
  closeIcon: '✕',
  minimizeIcon: '_',
  maximizeIcon: '□',
});

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void;
  (e: 'update:modelValue', value: boolean): void;
  (e: 'close'): void;
  (e: 'minimize'): void;
  (e: 'maximize'): void;
}>();

const isOpen = computed(() => props.open || props.modelValue);

const closeDialog = () => {
  emit('update:open', false);
  emit('update:modelValue', false);
  emit('close');
};

const handleBackdropClick = () => {
  if (props.closeOnBackdrop) {
    closeDialog();
  }
};
</script>

<style scoped>
.crml-retro-dialog-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(13, 13, 13, 0.8);
  z-index: 9990;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  animation: backdropFadeIn 0.2s ease forwards;
}

.crml-retro-dialog {
  width: 100%;
  background-color: var(--crml-bg-surface);
  border: var(--crml-border-brutal);
  border-radius: var(--crml-radius-md);
  box-shadow: 8px 8px 0px var(--crml-shadow-ink, #0D0D0D);
  overflow: hidden;
  animation: dialogPopIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  color: var(--crml-text-main);
  font-family: var(--crml-font-body);
}

/* Sizes */
.crml-retro-dialog--sm { max-width: 380px; }
.crml-retro-dialog--md { max-width: 540px; }
.crml-retro-dialog--lg { max-width: 720px; }
.crml-retro-dialog--xl { max-width: 960px; }
.crml-retro-dialog--fullscreen { max-width: 100%; height: 100%; border-radius: 0; }

.crml-retro-dialog__titlebar {
  padding: 0.5rem 0.85rem;
  border-bottom: var(--crml-border-brutal);
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
}

.crml-retro-dialog--header-pink .crml-retro-dialog__titlebar { background-color: var(--crt-hot-pink); color: var(--crt-pure-white); }
.crml-retro-dialog--header-lime .crml-retro-dialog__titlebar { background-color: var(--crml-action-primary); color: var(--crml-text-on-primary, #FFFFFF); }
.crml-retro-dialog--header-cyan .crml-retro-dialog__titlebar { background-color: var(--crt-cyber-cyan); color: var(--crt-obsidian); }
.crml-retro-dialog--header-yellow .crml-retro-dialog__titlebar { background-color: var(--crt-sunburst-yellow); color: var(--crt-obsidian); }
.crml-retro-dialog--header-obsidian .crml-retro-dialog__titlebar { background-color: var(--crt-obsidian); color: var(--crml-action-primary); }

.titlebar-left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--crml-font-mono);
  font-weight: 700;
  font-size: 0.875rem;
  letter-spacing: 0.05em;
}

.titlebar-controls {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.win-btn {
  width: 1.6rem;
  height: 1.6rem;
  background-color: var(--crt-pure-white);
  color: var(--crt-obsidian);
  border: 2px solid var(--crml-border-ink, #0D0D0D);
  border-radius: var(--crml-radius-sm);
  font-family: var(--crml-font-mono);
  font-weight: 800;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 1px 1px 0px var(--crml-shadow-ink, #0D0D0D);
  outline: none;
  transition: transform 0.1s ease;
}

.win-btn:hover { transform: translate(-1px, -1px); }

.win-btn--close { background-color: var(--crt-sunburst-yellow); }
.win-btn--close:hover { background-color: var(--crt-hot-pink); color: white; }

.crml-retro-dialog__body {
  padding: 1.5rem;
  font-size: 0.9375rem;
  line-height: 1.6;
}

.crml-retro-dialog__footer {
  padding: 1rem 1.5rem;
  border-top: var(--crml-border-brutal);
  background-color: var(--crml-bg-elevated);
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

@keyframes backdropFadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes dialogPopIn {
  from { opacity: 0; transform: scale(0.85) translateY(20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
</style>
