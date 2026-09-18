<template>
  <button
    :class="[
      'crml-button',
      `crml-button--${variant}`,
      `crml-button--${size}`,
      {
        'crml-button--loading': loading,
        'crml-button--disabled': disabled || loading,
        'crml-button--brutal': brutal
      }
    ]"
    :disabled="disabled || loading"
    :type="type"
    @click="handleClick"
  >
    <span v-if="loading" class="crml-button__spinner" aria-hidden="true"></span>
    
    <!-- Left Icon (Slot or Prop) -->
    <span
      v-if="!loading && ($slots.iconLeft || iconLeft || (icon && iconPosition === 'left'))"
      class="crml-button__icon-left"
    >
      <slot name="iconLeft">
        <slot name="icon">
          <span>{{ iconLeft || icon }}</span>
        </slot>
      </slot>
    </span>

    <span class="crml-button__content">
      <slot />
    </span>

    <!-- Right Icon (Slot or Prop) -->
    <span
      v-if="!loading && ($slots.iconRight || iconRight || (icon && iconPosition === 'right'))"
      class="crml-button__icon-right"
    >
      <slot name="iconRight">
        <slot name="icon">
          <span>{{ iconRight || icon }}</span>
        </slot>
      </slot>
    </span>
  </button>
</template>

<script setup lang="ts">
export interface CrmlButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'lime' | 'pink' | 'cyan' | 'yellow' | 'obsidian';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  icon?: string;
  iconLeft?: string;
  iconRight?: string;
  iconPosition?: 'left' | 'right';
  brutal?: boolean;
}

withDefaults(defineProps<CrmlButtonProps>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  type: 'button',
  icon: undefined,
  iconLeft: undefined,
  iconRight: undefined,
  iconPosition: 'left',
  brutal: true,
});

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const handleClick = (e: MouseEvent) => {
  emit('click', e);
};
</script>

<style scoped>
.crml-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--crml-space-2);
  font-family: var(--crml-font-body);
  font-weight: 700;
  border-radius: var(--crml-radius-md);
  border: 2.5px solid var(--crml-border-ink, #0D0D0D);
  box-shadow: 3px 3px 0px var(--crml-shadow-ink, #0D0D0D);
  cursor: pointer;
  transition: all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
  user-select: none;
  outline: none;
  white-space: nowrap;
}

.crml-button:hover:not(:disabled) {
  transform: translate(-1px, -1px);
  box-shadow: 4px 4px 0px var(--crml-shadow-ink, #0D0D0D);
}

.crml-button:active:not(:disabled) {
  transform: translate(2px, 2px);
  box-shadow: 1px 1px 0px var(--crml-shadow-ink, #0D0D0D);
}

.crml-button:focus-visible {
  box-shadow: 0 0 0 2px var(--crml-bg-base), 0 0 0 4px var(--crml-border-focus);
}

/* Sizes */
.crml-button--sm { padding: 0.375rem 0.75rem; font-size: 0.875rem; height: 2.25rem; }
.crml-button--md { padding: 0.5rem 1rem; font-size: 0.9375rem; height: 2.625rem; }
.crml-button--lg { padding: 0.75rem 1.25rem; font-size: 1rem; height: 3rem; }

/* Variants */
.crml-button--primary,
.crml-button--lime { background-color: var(--crml-action-primary); color: var(--crt-obsidian); }
.crml-button--primary:hover:not(:disabled),
.crml-button--lime:hover:not(:disabled) { background-color: #bbf000; }

.crml-button--secondary,
.crml-button--pink { background-color: var(--crt-hot-pink); color: #FFFFFF; }
.crml-button--secondary:hover:not(:disabled),
.crml-button--pink:hover:not(:disabled) { background-color: #e60072; }

.crml-button--cyan { background-color: var(--crt-cyber-cyan); color: var(--crt-obsidian); }
.crml-button--cyan:hover:not(:disabled) { background-color: #00d8e6; }

.crml-button--yellow { background-color: var(--crt-sunburst-yellow); color: var(--crt-obsidian); }
.crml-button--yellow:hover:not(:disabled) { background-color: #e6c100; }

.crml-button--obsidian { background-color: var(--crt-obsidian); color: var(--crml-action-primary); }
.crml-button--obsidian:hover:not(:disabled) { background-color: #1a1a1a; }

.crml-button--outline { background-color: var(--crml-bg-surface); color: var(--crml-text-main); border: 2.5px solid var(--crml-border-ink, var(--crt-obsidian)); }
.crml-button--ghost { background-color: transparent; color: var(--crml-text-main); border: 2.5px solid transparent; box-shadow: none; }
.crml-button--ghost:hover:not(:disabled) { background-color: var(--crml-bg-elevated); transform: none; box-shadow: none; }
.crml-button--danger { background-color: var(--crt-hot-pink); color: #FFFFFF; }

.crml-button--disabled { opacity: 0.55; cursor: not-allowed; transform: none !important; box-shadow: 2px 2px 0px var(--crml-shadow-ink, #0D0D0D) !important; }

.crml-button__spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 0.75s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }
</style>
