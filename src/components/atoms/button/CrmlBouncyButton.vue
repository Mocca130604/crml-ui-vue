<template>
  <button
    :class="[
      'crml-bouncy-button',
      `crml-bouncy-button--${variant}`,
      `crml-bouncy-button--${shape}`,
      `crml-bouncy-button--${size}`,
      { 'crml-bouncy-button--disabled': disabled || loading }
    ]"
    :disabled="disabled || loading"
    :type="type"
    @click="handleClick"
  >
    <span v-if="loading" class="crml-bouncy-button__spinner"></span>
    
    <!-- Left Icon (Slot or Prop) -->
    <span
      v-if="!loading && ($slots.iconLeft || iconLeft || (icon && iconPosition === 'left'))"
      class="crml-bouncy-button__icon"
    >
      <slot name="iconLeft">
        <slot name="icon">
          <span>{{ iconLeft || icon }}</span>
        </slot>
      </slot>
    </span>

    <span class="crml-bouncy-button__label">
      <slot />
    </span>

    <!-- Right Icon (Slot or Prop) -->
    <span
      v-if="!loading && ($slots.iconRight || iconRight || (icon && iconPosition === 'right'))"
      class="crml-bouncy-button__icon"
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
export interface CrmlBouncyButtonProps {
  variant?: 'primary' | 'lime' | 'pink' | 'cyan' | 'yellow' | 'white' | 'obsidian' | 'grad-y2k' | 'grad-acid';
  shape?: 'brutal' | 'rounded';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  icon?: string;
  iconLeft?: string;
  iconRight?: string;
  iconPosition?: 'left' | 'right';
}

withDefaults(defineProps<CrmlBouncyButtonProps>(), {
  variant: 'lime',
  shape: 'brutal',
  size: 'md',
  disabled: false,
  loading: false,
  type: 'button',
  icon: undefined,
  iconLeft: undefined,
  iconRight: undefined,
  iconPosition: 'left',
});

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const handleClick = (e: MouseEvent) => {
  emit('click', e);
};
</script>

<style scoped>
.crml-bouncy-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: var(--crml-font-heading);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  border: var(--crml-border-brutal);
  cursor: pointer;
  user-select: none;
  position: relative;
  transition: transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.15s ease, background 0.2s ease;
  box-shadow: var(--crml-shadow-brutal);
  color: var(--crt-obsidian);
  outline: none;
}

/* Shapes */
.crml-bouncy-button--brutal { border-radius: var(--crml-radius-md); }
.crml-bouncy-button--rounded { border-radius: var(--crml-radius-full); }

/* Sizes */
.crml-bouncy-button--sm { padding: 0.35rem 0.85rem; font-size: 0.8125rem; }
.crml-bouncy-button--md { padding: 0.6rem 1.35rem; font-size: 0.9375rem; }
.crml-bouncy-button--lg { padding: 0.85rem 1.85rem; font-size: 1.0625rem; }

/* Variants */
.crml-bouncy-button--primary { background-color: var(--crml-action-primary); color: var(--crml-text-on-primary, #FFFFFF); }
.crml-bouncy-button--lime { background-color: var(--crt-electric-lime); color: var(--crt-obsidian); }
.crml-bouncy-button--pink { background-color: var(--crt-hot-pink); color: var(--crt-pure-white); }
.crml-bouncy-button--cyan { background-color: var(--crt-cyber-cyan); color: var(--crt-obsidian); }
.crml-bouncy-button--yellow { background-color: var(--crt-sunburst-yellow); color: var(--crt-obsidian); }
.crml-bouncy-button--white { background-color: var(--crt-pure-white); color: var(--crt-obsidian); }
.crml-bouncy-button--obsidian { background-color: var(--crt-obsidian); color: var(--crml-action-primary); border-color: var(--crml-action-primary); box-shadow: 4px 4px 0px var(--crml-shadow-ink, #0D0D0D); }
.crml-bouncy-button--grad-y2k { background: var(--grad-y2k-sunset); color: var(--crt-pure-white); }
.crml-bouncy-button--grad-acid { background: var(--grad-lime-acid); color: var(--crt-obsidian); }

/* Micro-interaction Hover & Active */
.crml-bouncy-button:hover:not(:disabled) { transform: translate(-2px, -2px); box-shadow: 6px 6px 0px var(--crml-shadow-ink, #0D0D0D); }
.crml-bouncy-button--obsidian:hover:not(:disabled) { box-shadow: 6px 6px 0px var(--crml-shadow-ink, #0D0D0D); }
.crml-bouncy-button:active:not(:disabled) { transform: translate(2px, 2px); box-shadow: 2px 2px 0px var(--crml-shadow-ink, #0D0D0D); }
.crml-bouncy-button--obsidian:active:not(:disabled) { box-shadow: 2px 2px 0px var(--crml-shadow-ink, #0D0D0D); }

.crml-bouncy-button--disabled { opacity: 0.6; cursor: not-allowed; transform: none !important; box-shadow: 2px 2px 0px var(--crml-shadow-ink, #0D0D0D) !important; }

.crml-bouncy-button__spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 0.75s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }
</style>
