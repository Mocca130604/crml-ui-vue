<template>
  <label :class="[
    'crml-checkbox',
    `crml-checkbox--${variant}`,
    `crml-checkbox--${size}`,
    {
      'crml-checkbox--disabled': disabled,
      'crml-checkbox--indeterminate': indeterminate
    }
  ]">
    <input
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      :name="name"
      class="crml-checkbox__input"
      @change="handleChange"
    />
    <span class="crml-checkbox__box">
      <slot name="checkIcon">
        <span v-if="indeterminate" class="checkmark">{{ indeterminateIcon }}</span>
        <span v-else-if="modelValue" class="checkmark">{{ checkedIcon }}</span>
      </slot>
    </span>
    <span v-if="label || $slots.default" class="crml-checkbox__label">
      <slot>{{ label }}</slot>
    </span>
    <span v-if="description" class="crml-checkbox__description">{{ description }}</span>
  </label>
</template>

<script setup lang="ts">
export interface CrmlCheckboxProps {
  modelValue?: boolean;
  /** Display label text */
  label?: string;
  /** Description text below the label */
  description?: string;
  /** Color variant */
  variant?: 'lime' | 'pink' | 'cyan' | 'yellow';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Disabled state */
  disabled?: boolean;
  /** Indeterminate/mixed state */
  indeterminate?: boolean;
  /** HTML name attribute */
  name?: string;
  /** Custom checked icon character */
  checkedIcon?: string;
  /** Custom indeterminate icon character */
  indeterminateIcon?: string;
}

withDefaults(defineProps<CrmlCheckboxProps>(), {
  modelValue: false,
  variant: 'lime',
  size: 'md',
  disabled: false,
  indeterminate: false,
  checkedIcon: '✓',
  indeterminateIcon: '—',
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
.crml-checkbox {
  display: inline-flex;
  align-items: flex-start;
  gap: 0.75rem;
  cursor: pointer;
  user-select: none;
  font-family: var(--crml-font-heading);
  font-weight: 700;
  color: var(--crml-text-main);
  padding: 0.25rem 0.5rem;
  border-radius: var(--crml-radius-sm);
  transition: background-color 0.15s ease;
}

.crml-checkbox:hover:not(.crml-checkbox--disabled) {
  background-color: var(--crml-bg-elevated);
}

.crml-checkbox--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.crml-checkbox__input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.crml-checkbox__box {
  background-color: var(--crml-bg-surface);
  border: var(--crml-border-brutal);
  border-radius: var(--crml-radius-sm);
  box-shadow: 2px 2px 0px var(--crml-shadow-ink, #0D0D0D);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.15s ease;
}

/* Sizes */
.crml-checkbox--sm { font-size: 0.8125rem; }
.crml-checkbox--sm .crml-checkbox__box { width: 1.15rem; height: 1.15rem; }
.crml-checkbox--sm .checkmark { font-size: 0.8rem; }

.crml-checkbox--md { font-size: 0.9375rem; }
.crml-checkbox--md .crml-checkbox__box { width: 1.5rem; height: 1.5rem; }
.crml-checkbox--md .checkmark { font-size: 1.05rem; }

.crml-checkbox--lg { font-size: 1.0625rem; }
.crml-checkbox--lg .crml-checkbox__box { width: 1.85rem; height: 1.85rem; }
.crml-checkbox--lg .checkmark { font-size: 1.25rem; }

.crml-checkbox:hover:not(.crml-checkbox--disabled) .crml-checkbox__box {
  transform: translate(-1px, -1px);
  box-shadow: 3px 3px 0px var(--crml-shadow-ink, #0D0D0D);
}

.checkmark {
  font-weight: 900;
  line-height: 1;
}

.crml-checkbox--lime .crml-checkbox__input:checked + .crml-checkbox__box,
.crml-checkbox--lime.crml-checkbox--indeterminate .crml-checkbox__box {
  background-color: var(--crt-electric-lime); color: var(--crt-obsidian);
}

.crml-checkbox--pink .crml-checkbox__input:checked + .crml-checkbox__box,
.crml-checkbox--pink.crml-checkbox--indeterminate .crml-checkbox__box {
  background-color: var(--crt-hot-pink); color: var(--crt-pure-white);
}

.crml-checkbox--cyan .crml-checkbox__input:checked + .crml-checkbox__box,
.crml-checkbox--cyan.crml-checkbox--indeterminate .crml-checkbox__box {
  background-color: var(--crt-cyber-cyan); color: var(--crt-obsidian);
}

.crml-checkbox--yellow .crml-checkbox__input:checked + .crml-checkbox__box,
.crml-checkbox--yellow.crml-checkbox--indeterminate .crml-checkbox__box {
  background-color: var(--crt-sunburst-yellow); color: var(--crt-obsidian);
}

.crml-checkbox__label {
  display: flex;
  align-items: center;
  padding-top: 0.1rem;
}

.crml-checkbox__description {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--crml-text-muted);
  font-family: var(--crml-font-body);
  margin-top: -0.25rem;
}
</style>
