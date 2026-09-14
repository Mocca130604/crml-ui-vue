<template>
  <div :class="['crml-otp-group font-mono', `crml-otp-group--${variant}`, `crml-otp-group--${size}`, { 'is-disabled': disabled, 'has-error': !!error }]">
    <label v-if="label || $slots.label" class="otp-label font-heading">
      <slot name="label">{{ label }}</slot>
    </label>

    <div class="otp-boxes-row">
      <template v-for="(_, idx) in length" :key="idx">
        <span v-if="separator && separatorIndex === idx && idx > 0" class="otp-separator">
          <slot name="separator">{{ separator }}</slot>
        </span>

        <input
          :ref="(el) => (inputRefs[idx] = el as HTMLInputElement)"
          :type="mask ? 'password' : 'text'"
          :inputmode="inputmode"
          maxlength="1"
          :placeholder="placeholder"
          :disabled="disabled"
          :value="digits[idx]"
          :class="['otp-box', `otp-box--${variant}`, `otp-box--${size}`, { 'is-filled': digits[idx] }]"
          @input="(e) => handleInput(idx, e)"
          @keydown="(e) => handleKeyDown(idx, e)"
          @paste="handlePaste"
        />
      </template>
    </div>

    <div v-if="error || helperText || $slots.helper || $slots.error" class="otp-footer font-mono">
      <span v-if="error || $slots.error" class="otp-error-text">
        <slot name="error">{{ error }}</slot>
      </span>
      <span v-else-if="helperText || $slots.helper" class="otp-helper-text">
        <slot name="helper">{{ helperText }}</slot>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

export interface CrmlOtpInputProps {
  length?: number
  modelValue?: string
  disabled?: boolean
  variant?: 'lime' | 'pink' | 'cyan' | 'yellow' | 'obsidian'
  size?: 'sm' | 'md' | 'lg'
  label?: string
  placeholder?: string
  mask?: boolean
  inputmode?: 'numeric' | 'text' | 'decimal'
  separator?: string
  separatorIndex?: number
  error?: string
  helperText?: string
}

const props = withDefaults(defineProps<CrmlOtpInputProps>(), {
  length: 6,
  modelValue: '',
  disabled: false,
  variant: 'lime',
  size: 'md',
  placeholder: '•',
  mask: false,
  inputmode: 'numeric',
  separator: undefined,
  separatorIndex: 3,
  error: undefined,
  helperText: undefined
})

const emit = defineEmits<{
  (e: 'update:modelValue', val: string): void
  (e: 'complete', val: string): void
  (e: 'input', val: string): void
}>()

const digits = ref<string[]>(Array(props.length).fill(''))
const inputRefs = ref<HTMLInputElement[]>([])

watch(
  () => props.modelValue,
  (newVal) => {
    const valArr = (newVal || '').split('').slice(0, props.length)
    digits.value = Array(props.length)
      .fill('')
      .map((_, i) => valArr[i] || '')
  },
  { immediate: true }
)

const handleInput = (index: number, e: Event) => {
  const target = e.target as HTMLInputElement
  const val = target.value.slice(-1)
  digits.value[index] = val
  target.value = val

  const code = digits.value.join('')
  emit('update:modelValue', code)
  emit('input', code)

  if (val && index < props.length - 1) {
    inputRefs.value[index + 1]?.focus()
  }

  if (code.length === props.length && !digits.value.includes('')) {
    emit('complete', code)
  }
}

const handleKeyDown = (index: number, e: KeyboardEvent) => {
  if (e.key === 'Backspace' && !digits.value[index] && index > 0) {
    inputRefs.value[index - 1]?.focus()
  }
}

const handlePaste = (e: ClipboardEvent) => {
  e.preventDefault()
  const pasted = e.clipboardData?.getData('text') || ''
  const clean = pasted.trim().slice(0, props.length)
  if (!clean) return

  const chars = clean.split('')
  chars.forEach((char, i) => {
    if (i < props.length) {
      digits.value[i] = char
    }
  })

  const code = digits.value.join('')
  emit('update:modelValue', code)
  emit('input', code)

  const focusIdx = Math.min(chars.length, props.length - 1)
  inputRefs.value[focusIdx]?.focus()

  if (code.length === props.length && !digits.value.includes('')) {
    emit('complete', code)
  }
}
</script>

<style scoped>
.crml-otp-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

.otp-label {
  font-size: 0.85rem;
  font-weight: 800;
  color: var(--crml-text-main, #0d0d0d);
  text-transform: uppercase;
}

.otp-boxes-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
}

.otp-separator {
  font-size: 1.5rem;
  font-weight: 900;
  color: var(--crml-text-main, #0d0d0d);
  user-select: none;
}

.otp-box {
  text-align: center;
  font-family: var(--crml-font-heading);
  font-weight: 900;
  background-color: var(--crml-bg-input, var(--crml-bg-surface, #ffffff));
  border: 2.5px solid var(--crml-border-ink, #0d0d0d);
  border-radius: var(--crml-radius-md, 8px);
  box-shadow: 3px 3px 0px var(--crml-shadow-ink, #0d0d0d);
  color: var(--crml-text-main, #0d0d0d);
  outline: none;
  transition: all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Sizes */
.otp-box--sm {
  width: 2.25rem;
  height: 2.75rem;
  font-size: 1.1rem;
}

.otp-box--md {
  width: 2.75rem;
  height: 3.25rem;
  font-size: 1.35rem;
}

.otp-box--lg {
  width: 3.25rem;
  height: 3.75rem;
  font-size: 1.6rem;
}

.otp-box:focus {
  border-color: var(--crml-border-focus, var(--crt-cyber-cyan));
  box-shadow: 4px 4px 0px var(--crml-shadow-ink, #0d0d0d);
  transform: translate(-1px, -1px);
}

/* Variants */
.crml-otp-group--lime .otp-box.is-filled { background-color: var(--crt-electric-lime, #ccff00); color: var(--crt-obsidian, #0d0d0d) !important; }
.crml-otp-group--pink .otp-box.is-filled { background-color: var(--crt-hot-pink, #ff007f); color: #fff !important; }
.crml-otp-group--cyan .otp-box.is-filled { background-color: var(--crt-cyber-cyan, #00f0ff); color: var(--crt-obsidian, #0d0d0d) !important; }
.crml-otp-group--yellow .otp-box.is-filled { background-color: var(--crt-sunburst-yellow, #ffd600); color: var(--crt-obsidian, #0d0d0d) !important; }
.crml-otp-group--obsidian .otp-box.is-filled { background-color: var(--crt-obsidian, #0d0d0d); color: var(--crt-electric-lime, #ccff00) !important; }

.has-error .otp-box {
  border-color: var(--crt-hot-pink, #ff007f);
  box-shadow: 3px 3px 0px var(--crt-hot-pink, #ff007f);
}

.otp-footer {
  font-size: 0.75rem;
  text-align: center;
}

.otp-error-text {
  color: var(--crt-hot-pink, #ff007f);
  font-weight: 800;
}

.otp-helper-text {
  color: var(--crml-text-muted, #757575);
  font-weight: 600;
}

.is-disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>
