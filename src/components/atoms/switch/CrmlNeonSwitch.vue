<template>
  <label :class="[
    'crml-neon-switch',
    `crml-neon-switch--${size}`,
    { 'crml-neon-switch--disabled': disabled }
  ]">
    <span v-if="labelPosition === 'left' && (label || $slots.label)" class="crml-neon-switch__label crml-neon-switch__label--left">
      <slot name="label">{{ label }}</slot>
    </span>

    <input
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      :name="name"
      class="crml-neon-switch__input"
      @change="handleChange"
    />
    <span :class="['crml-neon-switch__track', `crml-neon-switch__track--${variant}`]">
      <span class="crml-neon-switch__thumb">
        <slot name="thumbIcon">
          <span v-if="modelValue && onIcon" class="crml-neon-switch__icon">{{ onIcon }}</span>
          <span v-else-if="!modelValue && offIcon" class="crml-neon-switch__icon">{{ offIcon }}</span>
          <span v-else-if="icon" class="crml-neon-switch__icon">{{ icon }}</span>
        </slot>
      </span>
      <span v-if="onText || offText" class="crml-neon-switch__track-text">
        {{ modelValue ? onText : offText }}
      </span>
    </span>

    <span v-if="labelPosition === 'right' && (label || $slots.label)" class="crml-neon-switch__label crml-neon-switch__label--right">
      <slot name="label">{{ label }}</slot>
    </span>

    <span v-if="description" class="crml-neon-switch__description">{{ description }}</span>
  </label>
</template>

<script setup lang="ts">
export interface CrmlNeonSwitchProps {
  modelValue?: boolean;
  /** Label text */
  label?: string;
  /** Description text */
  description?: string;
  /** Label position relative to switch */
  labelPosition?: 'left' | 'right';
  /** Color variant */
  variant?: 'blue' | 'primary' | 'lime' | 'pink' | 'cyan' | 'yellow';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Disabled state */
  disabled?: boolean;
  /** Static icon (shown in both states) */
  icon?: string;
  /** Icon shown when ON */
  onIcon?: string;
  /** Icon shown when OFF */
  offIcon?: string;
  /** Text shown on track when ON */
  onText?: string;
  /** Text shown on track when OFF */
  offText?: string;
  /** HTML name attribute */
  name?: string;
}

withDefaults(defineProps<CrmlNeonSwitchProps>(), {
  modelValue: false,
  variant: 'lime',
  size: 'md',
  disabled: false,
  labelPosition: 'right',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'change', value: boolean): void;
}>();

const handleChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit('update:modelValue', target.checked);
  emit('change', target.checked);
};
</script>

<style scoped>
.crml-neon-switch {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  user-select: none;
  font-family: var(--crml-font-heading);
  font-weight: 600;
  color: var(--crml-text-main);
  flex-wrap: wrap;
}

.crml-neon-switch--disabled { opacity: 0.5; cursor: not-allowed; }

.crml-neon-switch__input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.crml-neon-switch__track {
  position: relative;
  background-color: var(--crml-bg-surface);
  border: var(--crml-border-brutal);
  border-radius: var(--crml-radius-full);
  box-shadow: 2px 2px 0px var(--crml-shadow-ink, #0D0D0D);
  transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  display: flex;
  align-items: center;
}

/* Sizes */
.crml-neon-switch--sm .crml-neon-switch__track { width: 2.75rem; height: 1.5rem; }
.crml-neon-switch--sm .crml-neon-switch__thumb { width: 1rem; height: 1rem; top: 0.12rem; left: 0.12rem; }
.crml-neon-switch--sm .crml-neon-switch__label { font-size: 0.8125rem; }

.crml-neon-switch--md .crml-neon-switch__track { width: 3.5rem; height: 2rem; }
.crml-neon-switch--md .crml-neon-switch__thumb { width: 1.4rem; height: 1.4rem; top: 0.15rem; left: 0.15rem; }
.crml-neon-switch--md .crml-neon-switch__label { font-size: 0.9375rem; }

.crml-neon-switch--lg .crml-neon-switch__track { width: 4.25rem; height: 2.5rem; }
.crml-neon-switch--lg .crml-neon-switch__thumb { width: 1.8rem; height: 1.8rem; top: 0.18rem; left: 0.18rem; }
.crml-neon-switch--lg .crml-neon-switch__label { font-size: 1.0625rem; }

.crml-neon-switch__thumb {
  position: absolute;
  background-color: var(--crt-obsidian);
  border-radius: 50%;
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.crml-neon-switch__icon { font-size: 0.75rem; line-height: 1; }

.crml-neon-switch__track-text {
  font-size: 0.6rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-left: auto;
  margin-right: 0.35rem;
  color: var(--crml-text-muted);
}

/* Checked: move thumb */
.crml-neon-switch--sm .crml-neon-switch__input:checked + .crml-neon-switch__track .crml-neon-switch__thumb { transform: translateX(1.15rem); }
.crml-neon-switch--md .crml-neon-switch__input:checked + .crml-neon-switch__track .crml-neon-switch__thumb { transform: translateX(1.5rem); }
.crml-neon-switch--lg .crml-neon-switch__input:checked + .crml-neon-switch__track .crml-neon-switch__thumb { transform: translateX(1.65rem); }

.crml-neon-switch__input:checked + .crml-neon-switch__track .crml-neon-switch__thumb {
  background-color: var(--crt-pure-white);
}

/* Color variants */
.crml-neon-switch__input:checked + .crml-neon-switch__track--lime {
  background-color: var(--crml-action-primary);
  box-shadow: 2px 2px 0px var(--crt-obsidian), 0 0 16px var(--crt-lime-glow);
}
.crml-neon-switch__input:checked + .crml-neon-switch__track--pink {
  background-color: var(--crt-hot-pink);
  box-shadow: 2px 2px 0px var(--crt-obsidian), 0 0 16px var(--crt-pink-glow);
}
.crml-neon-switch__input:checked + .crml-neon-switch__track--cyan {
  background-color: var(--crt-cyber-cyan);
  box-shadow: 2px 2px 0px var(--crt-obsidian), 0 0 16px rgba(0, 240, 255, 0.6);
}
.crml-neon-switch__input:checked + .crml-neon-switch__track--yellow {
  background-color: var(--crt-sunburst-yellow);
  box-shadow: 2px 2px 0px var(--crt-obsidian), 0 0 16px rgba(255, 214, 0, 0.6);
}

.crml-neon-switch__description {
  width: 100%;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--crml-text-muted);
  font-family: var(--crml-font-body);
  padding-left: 0.25rem;
}
</style>
