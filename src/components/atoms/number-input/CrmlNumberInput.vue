<script setup lang="ts">
import { ref, watch } from 'vue'

export interface CrmlNumberInputProps {
  modelValue?: number
  min?: number
  max?: number
  step?: number
  label?: string
  unit?: string
  disabled?: boolean
  variant?: 'blue' | 'primary' | 'lime' | 'pink' | 'cyan' | 'yellow' | 'white'
}

const props = withDefaults(defineProps<CrmlNumberInputProps>(), {
  modelValue: 1,
  min: 0,
  max: 999,
  step: 1,
  unit: '',
  variant: 'lime',
  disabled: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', val: number): void
  (e: 'change', val: number): void
}>()

const val = ref(props.modelValue)

watch(() => props.modelValue, (newVal) => {
  if (newVal !== undefined) {
    val.value = clamp(newVal)
  }
})

function clamp(v: number): number {
  return Math.min(props.max, Math.max(props.min, v))
}

function updateVal(newVal: number) {
  if (props.disabled) return
  const clamped = clamp(newVal)
  val.value = clamped
  emit('update:modelValue', clamped)
  emit('change', clamped)
}

function increment() {
  updateVal(val.value + props.step)
}

function decrement() {
  updateVal(val.value - props.step)
}

function onInput(e: Event) {
  const inputVal = Number((e.target as HTMLInputElement).value)
  if (!isNaN(inputVal)) {
    updateVal(inputVal)
  }
}
</script>

<template>
  <div class="crml-number-input-wrapper font-mono" :class="{ disabled }">
    <div v-if="label || unit" class="number-input-label-row">
      <span v-if="label" class="input-label">{{ label }}</span>
      <span v-if="unit" class="input-unit-chip">{{ unit }}</span>
    </div>

    <div class="number-input-box" :class="[`variant-${variant}`]">
      <button
        type="button"
        class="step-btn dec-btn font-heading"
        :disabled="disabled || val <= min"
        @click="decrement"
      >
        −
      </button>

      <input
        type="number"
        class="number-field font-mono"
        :value="val"
        :min="min"
        :max="max"
        :step="step"
        :disabled="disabled"
        @input="onInput"
      />

      <button
        type="button"
        class="step-btn inc-btn font-heading"
        :disabled="disabled || val >= max"
        @click="increment"
      >
        +
      </button>
    </div>
  </div>
</template>

<style scoped>
.crml-number-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  box-sizing: border-box;
}

.crml-number-input-wrapper.disabled {
  opacity: 0.6;
  pointer-events: none;
}

.number-input-label-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 900;
}

.input-label {
  color: var(--crml-text-main, #0d0d0d);
  letter-spacing: 0.5px;
}

.input-unit-chip {
  background: var(--crt-obsidian, #0d0d0d);
  color: var(--crml-action-primary, #1B6FFF);
  border: 1px solid var(--crml-border-ink, #0D0D0D);
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 900;
}

.number-input-box {
  display: flex;
  align-items: center;
  background: var(--crml-bg-surface, #ffffff);
  border: 3px solid var(--crml-border-ink, #0D0D0D);
  border-radius: var(--crml-radius-md, 8px);
  box-shadow: 4px 4px 0px var(--crml-shadow-ink, #0D0D0D);
  overflow: hidden;
  box-sizing: border-box;
  height: 42px;
  transition: all 0.15s ease;
}

.number-input-box:focus-within {
  box-shadow: 5px 5px 0px var(--crml-shadow-ink, #0D0D0D);
}

.step-btn {
  width: 40px;
  height: 100%;
  border: none;
  background: var(--crml-action-primary, #1B6FFF);
  color: var(--crt-obsidian, #0d0d0d);
  font-size: 18px;
  font-weight: 900;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.1s ease;
  user-select: none;
}

.dec-btn {
  border-right: 2.5px solid var(--crml-border-ink, #0D0D0D);
}

.inc-btn {
  border-left: 2.5px solid var(--crml-border-ink, #0D0D0D);
}


.variant-lime .step-btn {
  background: var(--crt-electric-lime, #CCFF00);
  color: var(--crt-obsidian, #0D0D0D);
}
.variant-blue .step-btn,
.variant-primary .step-btn {
  background: var(--crt-ryo-blue-500, #1B6FFF);
  color: #FFFFFF;
}

.variant-pink .step-btn {
  background: var(--crt-hot-pink, #ff007f);
  color: #ffffff;
}

.variant-cyan .step-btn {
  background: var(--crt-cyber-cyan, #00f0ff);
  color: var(--crt-obsidian, #0d0d0d);
}

.variant-yellow .step-btn {
  background: var(--crt-sunburst-yellow, #ffd600);
  color: var(--crt-obsidian, #0d0d0d);
}

.variant-white .step-btn {
  background: var(--crml-bg-elevated, #f4f4f5);
  color: var(--crt-obsidian, #0d0d0d);
}

.step-btn:hover:not(:disabled) {
  filter: brightness(1.08);
}

.step-btn:active:not(:disabled) {
  filter: brightness(0.92);
}

.step-btn:disabled {
  background: var(--crml-bg-elevated, #e0e0e0);
  color: #a0a0a0;
  cursor: not-allowed;
}

.number-field {
  flex: 1;
  height: 100%;
  border: none;
  background: transparent;
  text-align: center;
  font-size: 15px;
  font-weight: 900;
  color: var(--crml-text-main, #0d0d0d);
  outline: none;
  -moz-appearance: textfield;
}

.number-field::-webkit-outer-spin-button,
.number-field::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
