<template>
  <div :class="[
    'crml-textarea-group',
    `crml-textarea-group--${size}`,
    {
      'crml-textarea-group--error': !!error,
      'crml-textarea-group--disabled': disabled
    }
  ]">
    <div class="label-row">
      <label v-if="label" :for="id" class="crml-textarea-label">
        {{ label }}
        <span v-if="required" class="required-star">{{ requiredIndicator }}</span>
      </label>
      <span v-if="showCount && maxLength" class="char-count">{{ modelValue.length }} / {{ maxLength }}</span>
    </div>

    <div :class="['crml-textarea-wrapper', `crml-textarea-wrapper--${variant}`]">
      <textarea
        :id="id"
        :value="modelValue"
        :placeholder="placeholder"
        :rows="rows"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxLength"
        :name="name"
        :class="['crml-textarea', `crml-textarea--resize-${resize}`]"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
      ></textarea>
    </div>

    <span v-if="error" class="crml-textarea-error">{{ error }}</span>
    <span v-else-if="helperText" class="crml-textarea-helper">{{ helperText }}</span>
  </div>
</template>

<script setup lang="ts">
export interface CrmlTextareaProps {
  modelValue?: string;
  id?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  /** Required indicator character */
  requiredIndicator?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Focus color variant */
  variant?: 'blue' | 'primary' | 'lime' | 'pink' | 'cyan' | 'yellow';
  /** Resize behavior */
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  /** Show character count */
  showCount?: boolean;
}

withDefaults(defineProps<CrmlTextareaProps>(), {
  modelValue: '',
  rows: 4,
  disabled: false,
  readonly: false,
  required: false,
  requiredIndicator: '*',
  size: 'md',
  variant: 'lime',
  resize: 'vertical',
  showCount: true,
});

const emit = defineEmits<{
  (e: 'update:modelValue', val: string): void;
  (e: 'blur', event: FocusEvent): void;
  (e: 'focus', event: FocusEvent): void;
}>();

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement;
  emit('update:modelValue', target.value);
};

const handleBlur = (event: FocusEvent) => {
  emit('blur', event);
};

const handleFocus = (event: FocusEvent) => {
  emit('focus', event);
};
</script>

<style scoped>
.crml-textarea-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  width: 100%;
  font-family: var(--crml-font-body);
}

.label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.crml-textarea-label {
  font-weight: 800;
  font-family: var(--crml-font-heading);
  color: var(--crml-text-main);
}

.crml-textarea-group--sm .crml-textarea-label { font-size: 0.75rem; }
.crml-textarea-group--md .crml-textarea-label { font-size: 0.875rem; }
.crml-textarea-group--lg .crml-textarea-label { font-size: 1rem; }

.required-star { color: var(--crt-pink-500); }

.char-count {
  font-size: 0.75rem;
  font-family: var(--crml-font-mono);
  color: var(--crml-text-muted);
}

.crml-textarea {
  width: 100%;
  padding: 0.75rem 0.875rem;
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
.crml-textarea-group--sm .crml-textarea { font-size: 0.8125rem; padding: 0.5rem 0.65rem; }
.crml-textarea-group--md .crml-textarea { font-size: 0.9375rem; }
.crml-textarea-group--lg .crml-textarea { font-size: 1.0625rem; padding: 1rem 1.125rem; }

/* Resize control */
.crml-textarea--resize-none { resize: none; }
.crml-textarea--resize-vertical { resize: vertical; }
.crml-textarea--resize-horizontal { resize: horizontal; }
.crml-textarea--resize-both { resize: both; }

.crml-textarea::placeholder { color: var(--crml-text-muted); }

/* Focus color variants */
.crml-textarea-wrapper--lime .crml-textarea:focus { border-color: var(--crt-electric-lime); box-shadow: 3px 3px 0px var(--crml-shadow-ink, #0D0D0D); }
.crml-textarea-wrapper--blue .crml-textarea:focus, .crml-textarea-wrapper--primary .crml-textarea:focus { border-color: var(--crt-ryo-blue-500, #1B6FFF); box-shadow: 3px 3px 0px var(--crml-shadow-ink, #0D0D0D); }
.crml-textarea-wrapper--pink .crml-textarea:focus { border-color: var(--crt-hot-pink); box-shadow: 3px 3px 0px var(--crml-shadow-ink, #0D0D0D); }
.crml-textarea-wrapper--cyan .crml-textarea:focus { border-color: var(--crt-cyber-cyan); box-shadow: 3px 3px 0px var(--crml-shadow-ink, #0D0D0D); }
.crml-textarea-wrapper--yellow .crml-textarea:focus { border-color: var(--crt-sunburst-yellow); box-shadow: 3px 3px 0px var(--crml-shadow-ink, #0D0D0D); }

.crml-textarea-group--error .crml-textarea {
  border-color: var(--crt-hot-pink);
  box-shadow: 3px 3px 0px var(--crml-shadow-ink, #0D0D0D);
}

.crml-textarea-error {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--crt-pink-500);
}

.crml-textarea-helper {
  font-size: 0.75rem;
  color: var(--crml-text-muted);
}
</style>
