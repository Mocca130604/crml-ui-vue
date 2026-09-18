<template>
  <div :class="[
    'crml-input-group',
    `crml-input-group--${size}`,
    {
      'crml-input-group--error': !!error,
      'crml-input-group--disabled': disabled,
      'crml-input-group--focused': isFocused
    }
  ]">
    <label v-if="label" :for="id" class="crml-input-group__label">
      {{ label }}
      <span v-if="required" class="crml-input-group__required">{{ requiredIndicator }}</span>
    </label>
    
    <div :class="['crml-input-wrapper', `crml-input-wrapper--${variant}`]">
      <span v-if="$slots.prefix || prefix" class="crml-input-wrapper__prefix">
        <slot name="prefix">{{ prefix }}</slot>
      </span>

      <span v-if="$slots.iconLeft" class="crml-input-wrapper__icon-left">
        <slot name="iconLeft" />
      </span>
      
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :min="min"
        :max="max"
        :step="step"
        :minlength="minlength"
        :maxlength="maxlength"
        :pattern="pattern"
        :autocomplete="autocomplete"
        :name="name"
        class="crml-input"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
        @keydown="$emit('keydown', $event)"
      />

      <button
        v-if="clearable && modelValue"
        type="button"
        class="crml-input-wrapper__clear"
        tabindex="-1"
        @click="handleClear"
      >✕</button>

      <span v-if="$slots.iconRight" class="crml-input-wrapper__icon-right">
        <slot name="iconRight" />
      </span>

      <span v-if="$slots.suffix || suffix" class="crml-input-wrapper__suffix">
        <slot name="suffix">{{ suffix }}</slot>
      </span>
    </div>

    <div class="crml-input-group__footer" v-if="error || helperText || (showCount && maxlength)">
      <span v-if="error" class="crml-input-group__error-text">{{ error }}</span>
      <span v-else-if="helperText" class="crml-input-group__helper-text">{{ helperText }}</span>
      <span v-if="showCount && maxlength" class="crml-input-group__count">
        {{ String(modelValue || '').length }} / {{ maxlength }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

export interface CrmlInputProps {
  modelValue?: string | number;
  id?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  type?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  /** Indicator character for required fields */
  requiredIndicator?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Theme color for focus ring */
  variant?: 'lime' | 'pink' | 'cyan' | 'yellow';
  /** Show clear button when has value */
  clearable?: boolean;
  /** Prefix text (or use #prefix slot) */
  prefix?: string;
  /** Suffix text (or use #suffix slot) */
  suffix?: string;
  /** Show character count */
  showCount?: boolean;
  /** HTML input attributes */
  min?: number | string;
  max?: number | string;
  step?: number | string;
  minlength?: number;
  maxlength?: number;
  pattern?: string;
  autocomplete?: string;
}

const props = withDefaults(defineProps<CrmlInputProps>(), {
  modelValue: '',
  type: 'text',
  disabled: false,
  readonly: false,
  required: false,
  requiredIndicator: '*',
  size: 'md',
  variant: 'lime',
  clearable: false,
  showCount: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'blur', event: FocusEvent): void;
  (e: 'focus', event: FocusEvent): void;
  (e: 'clear'): void;
  (e: 'keydown', event: KeyboardEvent): void;
}>();

const isFocused = ref(false);

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};

const handleBlur = (event: FocusEvent) => {
  isFocused.value = false;
  emit('blur', event);
};

const handleFocus = (event: FocusEvent) => {
  isFocused.value = true;
  emit('focus', event);
};

const handleClear = () => {
  emit('update:modelValue', '');
  emit('clear');
};
</script>

<style scoped>
.crml-input-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-family: var(--crml-font-body);
  width: 100%;
}

.crml-input-group__label {
  font-weight: 700;
  color: var(--crml-text-main);
  font-family: var(--crml-font-heading);
}

.crml-input-group--sm .crml-input-group__label { font-size: 0.75rem; }
.crml-input-group--md .crml-input-group__label { font-size: 0.875rem; }
.crml-input-group--lg .crml-input-group__label { font-size: 1rem; }

.crml-input-group__required {
  color: var(--crt-pink-500);
}

.crml-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.crml-input {
  width: 100%;
  padding: 0.5rem 0.875rem;
  font-family: var(--crml-font-body);
  color: var(--crml-text-main);
  background-color: var(--crml-bg-surface);
  border: var(--crml-border-brutal);
  border-radius: var(--crml-radius-md);
  box-shadow: var(--crml-shadow-brutal-sm);
  outline: none;
  transition: all 0.15s ease;
}

/* Sizes */
.crml-input-group--sm .crml-input { height: 2rem; font-size: 0.8125rem; padding: 0.3rem 0.65rem; }
.crml-input-group--md .crml-input { height: 2.75rem; font-size: 0.9375rem; }
.crml-input-group--lg .crml-input { height: 3.25rem; font-size: 1.0625rem; padding: 0.65rem 1rem; }

.crml-input::placeholder {
  color: var(--crml-text-muted);
}

/* Focus variants */
.crml-input-wrapper--lime .crml-input:focus { box-shadow: 3px 3px 0px var(--crml-action-primary); }
.crml-input-wrapper--pink .crml-input:focus { box-shadow: 3px 3px 0px var(--crt-hot-pink); }
.crml-input-wrapper--cyan .crml-input:focus { box-shadow: 3px 3px 0px var(--crt-cyber-cyan); }
.crml-input-wrapper--yellow .crml-input:focus { box-shadow: 3px 3px 0px var(--crt-sunburst-yellow); }

.crml-input:disabled {
  background-color: var(--crml-bg-elevated);
  opacity: 0.6;
  cursor: not-allowed;
}

.crml-input-group--error .crml-input {
  border-color: var(--crt-hot-pink);
  box-shadow: 3px 3px 0px var(--crt-hot-pink);
}

/* Prefix & Suffix */
.crml-input-wrapper__prefix,
.crml-input-wrapper__suffix {
  padding: 0 0.6rem;
  font-family: var(--crml-font-mono);
  font-weight: 700;
  font-size: 0.85rem;
  color: var(--crml-text-muted);
  white-space: nowrap;
}

/* Icons */
.crml-input-wrapper__icon-left,
.crml-input-wrapper__icon-right {
  display: flex;
  align-items: center;
  padding: 0 0.4rem;
  font-size: 1rem;
}

/* Clear button */
.crml-input-wrapper__clear {
  position: absolute;
  right: 0.6rem;
  background: none;
  border: none;
  font-family: var(--crml-font-heading);
  font-weight: 900;
  font-size: 0.75rem;
  cursor: pointer;
  color: var(--crml-text-muted);
  padding: 0.15rem;
  line-height: 1;
}
.crml-input-wrapper__clear:hover { color: var(--crt-hot-pink); }

/* Footer */
.crml-input-group__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.crml-input-group__error-text {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--crt-pink-500);
}

.crml-input-group__helper-text {
  font-size: 0.75rem;
  color: var(--crml-text-muted);
}

.crml-input-group__count {
  font-size: 0.7rem;
  font-family: var(--crml-font-mono);
  color: var(--crml-text-muted);
  margin-left: auto;
}
</style>
