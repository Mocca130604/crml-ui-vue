<script setup lang="ts">
import { ref, watch, computed } from 'vue'

export interface CrmlDualRangeSliderProps {
  // Boundary limits
  minLimit?: number
  maxLimit?: number
  minBound?: number
  maxBound?: number

  // Values
  modelValue?: [number, number]
  min?: number
  max?: number
  minVal?: number
  maxVal?: number
  minValue?: number
  maxValue?: number

  step?: number
  prefix?: string
  suffix?: string
  label?: string
  variant?: 'lime' | 'pink' | 'cyan' | 'yellow'
  compact?: boolean
  thousandSeparator?: boolean
  showLimits?: boolean
  formatter?: (val: number) => string
}

const props = withDefaults(defineProps<CrmlDualRangeSliderProps>(), {
  step: 10,
  prefix: '$',
  suffix: '',
  label: 'PRICE RANGE FILTER',
  variant: 'lime',
  compact: false,
  thousandSeparator: true,
  showLimits: true
})

const emit = defineEmits<{
  (e: 'update:modelValue', val: [number, number]): void
  (e: 'update:min', val: number): void
  (e: 'update:max', val: number): void
  (e: 'update:minVal', val: number): void
  (e: 'update:maxVal', val: number): void
  (e: 'update:minValue', val: number): void
  (e: 'update:maxValue', val: number): void
  (e: 'change', val: [number, number]): void
}>()

// Boundary limits (ensure limits take absolute precedence over value props)
const effectiveMin = computed(() => {
  if (props.minLimit !== undefined) return props.minLimit
  if (props.minBound !== undefined) return props.minBound
  if ((props.modelValue || props.minVal !== undefined || props.minValue !== undefined) && props.min !== undefined) {
    return props.min
  }
  return 0
})

const effectiveMax = computed(() => {
  if (props.maxLimit !== undefined) return props.maxLimit
  if (props.maxBound !== undefined) return props.maxBound
  if ((props.modelValue || props.maxVal !== undefined || props.maxValue !== undefined) && props.max !== undefined) {
    return props.max
  }
  return 1000
})

// Current values
const propMinValue = computed(() => {
  if (props.modelValue && props.modelValue[0] !== undefined) return props.modelValue[0]
  if (props.minVal !== undefined) return props.minVal
  if (props.minValue !== undefined) return props.minValue
  if (props.minLimit !== undefined || props.minBound !== undefined) return props.min
  return undefined
})

const propMaxValue = computed(() => {
  if (props.modelValue && props.modelValue[1] !== undefined) return props.modelValue[1]
  if (props.maxVal !== undefined) return props.maxVal
  if (props.maxValue !== undefined) return props.maxValue
  if (props.maxLimit !== undefined || props.maxBound !== undefined) return props.max
  return undefined
})

const internalMin = ref(propMinValue.value ?? props.minVal ?? props.modelValue?.[0] ?? effectiveMin.value)
const internalMax = ref(propMaxValue.value ?? props.maxVal ?? props.modelValue?.[1] ?? effectiveMax.value)
const activeThumb = ref<'min' | 'max' | null>(null)
const trackContainerRef = ref<HTMLElement | null>(null)

watch(propMinValue, (val) => {
  if (val !== undefined && val !== internalMin.value) {
    internalMin.value = val
  }
})

watch(propMaxValue, (val) => {
  if (val !== undefined && val !== internalMax.value) {
    internalMax.value = val
  }
})

watch(() => props.modelValue, (v) => {
  if (v) {
    if (v[0] !== undefined && v[0] !== internalMin.value) internalMin.value = v[0]
    if (v[1] !== undefined && v[1] !== internalMax.value) internalMax.value = v[1]
  }
}, { deep: true })

function formatValue(val: number): string {
  if (props.formatter) {
    return props.formatter(val)
  }
  let formattedNumber = val.toString()
  if (props.compact) {
    const abs = Math.abs(val)
    if (abs >= 1000000000) {
      formattedNumber = (val / 1000000000).toFixed(val % 1000000000 === 0 ? 0 : 1) + 'B'
    } else if (abs >= 1000000) {
      formattedNumber = (val / 1000000).toFixed(val % 1000000 === 0 ? 0 : 1) + 'M'
    } else if (abs >= 1000) {
      formattedNumber = (val / 1000).toFixed(val % 1000 === 0 ? 0 : 1) + 'K'
    }
  } else if (props.thousandSeparator) {
    formattedNumber = val.toLocaleString()
  }
  return `${props.prefix}${formattedNumber}${props.suffix}`
}

function updateMin(val: number) {
  const step = props.step || 1
  const maxAllowed = internalMax.value - step
  val = Math.max(effectiveMin.value, Math.min(val, maxAllowed))
  internalMin.value = val
  emit('update:min', val)
  emit('update:minVal', val)
  emit('update:minValue', val)
  emit('update:modelValue', [internalMin.value, internalMax.value])
  emit('change', [internalMin.value, internalMax.value])
}

function updateMax(val: number) {
  const step = props.step || 1
  const minAllowed = internalMin.value + step
  val = Math.min(effectiveMax.value, Math.max(val, minAllowed))
  internalMax.value = val
  emit('update:max', val)
  emit('update:maxVal', val)
  emit('update:maxValue', val)
  emit('update:modelValue', [internalMin.value, internalMax.value])
  emit('change', [internalMin.value, internalMax.value])
}

function handleTrackClick(event: MouseEvent) {
  if ((event.target as HTMLElement).tagName.toLowerCase() === 'input') {
    return
  }
  if (!trackContainerRef.value) return
  const rect = trackContainerRef.value.getBoundingClientRect()
  const clickX = event.clientX - rect.left
  const ratio = Math.max(0, Math.min(1, clickX / rect.width))
  const step = props.step || 1
  const rawVal = effectiveMin.value + ratio * (effectiveMax.value - effectiveMin.value)
  const steppedVal = Math.round((rawVal - effectiveMin.value) / step) * step + effectiveMin.value

  const distToMin = Math.abs(steppedVal - internalMin.value)
  const distToMax = Math.abs(steppedVal - internalMax.value)

  if (distToMin <= distToMax) {
    updateMin(steppedVal)
    activeThumb.value = 'min'
  } else {
    updateMax(steppedVal)
    activeThumb.value = 'max'
  }
}

const minPercent = computed(() => {
  const range = effectiveMax.value - effectiveMin.value
  if (range <= 0) return 0
  return Math.max(0, Math.min(100, ((internalMin.value - effectiveMin.value) / range) * 100))
})

const maxPercent = computed(() => {
  const range = effectiveMax.value - effectiveMin.value
  if (range <= 0) return 100
  return Math.max(0, Math.min(100, ((internalMax.value - effectiveMin.value) / range) * 100))
})
</script>

<template>
  <div class="crml-dual-range-wrapper font-mono" :class="[`variant-${variant}`]">
    <div class="range-info-row font-mono">
      <slot name="label" :label="label" :min="internalMin" :max="internalMax">
        <span class="range-label font-heading">{{ label }}</span>
      </slot>
      <slot
        name="value"
        :min="internalMin"
        :max="internalMax"
        :formatted-min="formatValue(internalMin)"
        :formatted-max="formatValue(internalMax)"
      >
        <span class="range-value-pill">{{ formatValue(internalMin) }} — {{ formatValue(internalMax) }}</span>
      </slot>
    </div>

    <div
      ref="trackContainerRef"
      class="range-track-container"
      @click="handleTrackClick"
    >
      <div class="range-slider-track-box">
        <div
          class="range-track-highlight"
          :style="{
            left: `${minPercent}%`,
            width: `${Math.max(0, maxPercent - minPercent)}%`
          }"
        ></div>
      </div>
      <input
        type="range"
        :min="effectiveMin"
        :max="effectiveMax"
        :step="step"
        :value="internalMin"
        @input="updateMin(Number(($event.target as HTMLInputElement).value))"
        @pointerdown="activeThumb = 'min'"
        @focus="activeThumb = 'min'"
        class="range-input range-min"
        :style="{ zIndex: activeThumb === 'min' ? 5 : (minPercent > 70 ? 4 : 2) }"
      />
      <input
        type="range"
        :min="effectiveMin"
        :max="effectiveMax"
        :step="step"
        :value="internalMax"
        @input="updateMax(Number(($event.target as HTMLInputElement).value))"
        @pointerdown="activeThumb = 'max'"
        @focus="activeThumb = 'max'"
        class="range-input range-max"
        :style="{ zIndex: activeThumb === 'max' ? 5 : (minPercent > 70 ? 2 : 4) }"
      />
    </div>

    <div v-if="showLimits" class="range-limits-row font-mono">
      <slot name="minLimit" :min="effectiveMin" :formatted="formatValue(effectiveMin)">
        <span class="limit-chip">{{ formatValue(effectiveMin) }}</span>
      </slot>
      <slot name="maxLimit" :max="effectiveMax" :formatted="formatValue(effectiveMax)">
        <span class="limit-chip">{{ formatValue(effectiveMax) }}</span>
      </slot>
    </div>
  </div>
</template>

<style scoped>
.crml-dual-range-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  box-sizing: border-box;
}

.range-info-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.75rem;
  font-weight: 800;
}

.range-label {
  color: var(--crml-text-main, #0d0d0d);
  letter-spacing: 0.5px;
}

.range-value-pill {
  background-color: var(--crt-electric-lime, #ccff00);
  color: var(--crt-obsidian, #0d0d0d);
  border: 1.5px solid var(--crt-obsidian, #0d0d0d);
  border-radius: var(--crml-radius-sm, 4px);
  padding: 0.15rem 0.5rem;
  font-weight: 900;
  box-shadow: 2px 2px 0px var(--crt-obsidian, #0d0d0d);
}

.variant-pink .range-value-pill {
  background-color: var(--crt-hot-pink, #ff007f);
  color: #ffffff;
}

.variant-cyan .range-value-pill {
  background-color: var(--crt-cyber-cyan, #00f0ff);
  color: var(--crt-obsidian, #0d0d0d);
}

.variant-yellow .range-value-pill {
  background-color: var(--crt-sunburst-yellow, #ffd600);
  color: var(--crt-obsidian, #0d0d0d);
}

.range-track-container {
  position: relative;
  width: 100%;
  height: 24px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
}

.range-slider-track-box {
  position: relative;
  width: 100%;
  height: 10px;
  background-color: var(--crml-bg-elevated, #e0e0e0);
  border: 2.5px solid var(--crt-obsidian, #0d0d0d);
  border-radius: 999px;
  overflow: hidden;
  box-sizing: border-box;
}

.range-track-highlight {
  position: absolute;
  height: 100%;
  background-color: var(--crt-hot-pink, #ff007f);
  top: 0;
}

.variant-cyan .range-track-highlight {
  background-color: var(--crt-electric-lime, #ccff00);
}

.variant-lime .range-track-highlight {
  background-color: var(--crt-hot-pink, #ff007f);
}

.range-limits-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.6875rem;
  font-weight: 800;
  color: var(--crml-text-muted, #757575);
}

.limit-chip {
  background: var(--crml-bg-elevated, #f4f4f5);
  border: 1px solid var(--crt-obsidian, #0d0d0d);
  padding: 1px 5px;
  border-radius: 3px;
  font-size: 9px;
  font-weight: 900;
}

.range-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 24px;
  background: transparent;
  pointer-events: none;
  appearance: none;
  -webkit-appearance: none;
  margin: 0;
  border: none;
  outline: none;
  box-sizing: border-box;
}

.range-input::-webkit-slider-runnable-track {
  background: transparent;
  border: none;
}

.range-input::-moz-range-track {
  background: transparent;
  border: none;
}

.range-input::-webkit-slider-thumb {
  pointer-events: auto;
  width: 18px;
  height: 18px;
  border-radius: 4px;
  background-color: var(--crt-electric-lime, #ccff00);
  border: 2px solid var(--crt-obsidian, #0d0d0d);
  box-shadow: 2px 2px 0px var(--crt-obsidian, #0d0d0d);
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  margin-top: 3px;
}

.variant-pink .range-input::-webkit-slider-thumb {
  background-color: var(--crt-hot-pink, #ff007f);
}

.variant-cyan .range-input::-webkit-slider-thumb {
  background-color: var(--crt-cyber-cyan, #00f0ff);
}

.variant-yellow .range-input::-webkit-slider-thumb {
  background-color: var(--crt-sunburst-yellow, #ffd600);
}

.range-input::-moz-range-thumb {
  pointer-events: auto;
  width: 18px;
  height: 18px;
  border-radius: 4px;
  background-color: var(--crt-electric-lime, #ccff00);
  border: 2px solid var(--crt-obsidian, #0d0d0d);
  box-shadow: 2px 2px 0px var(--crt-obsidian, #0d0d0d);
  cursor: pointer;
  box-sizing: border-box;
}

.variant-pink .range-input::-moz-range-thumb {
  background-color: var(--crt-hot-pink, #ff007f);
}

.variant-cyan .range-input::-moz-range-thumb {
  background-color: var(--crt-cyber-cyan, #00f0ff);
}

.variant-yellow .range-input::-moz-range-thumb {
  background-color: var(--crt-sunburst-yellow, #ffd600);
}
</style>
