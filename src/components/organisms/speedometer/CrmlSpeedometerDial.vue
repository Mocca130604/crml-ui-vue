<script setup lang="ts">
import { ref, computed, watch } from 'vue'

export interface SpeedometerMode {
  label: string
  value: number
  color?: string
}

export type SpeedometerModeInput = string | SpeedometerMode

const props = withDefaults(
  defineProps<{
    modelValue?: number
    value?: number
    min?: number
    max?: number
    title?: string
    unit?: string
    sublabel?: string
    modes?: SpeedometerModeInput[]
    formatter?: (val: number) => string
    variant?: 'lime' | 'pink' | 'cyan' | 'yellow'
    activeColor?: string
    showModes?: boolean
  }>(),
  {
    modelValue: undefined,
    value: 78,
    min: 0,
    max: 100,
    title: 'TURBO ENGINE RPM',
    unit: '% CAP',
    sublabel: 'RPM x100',
    modes: () => ['ECO', 'NORMAL', 'SPORT', 'TURBO'],
    variant: 'lime',
    activeColor: undefined,
    showModes: true
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', val: number): void
  (e: 'change', val: number): void
  (e: 'mode-select', mode: SpeedometerModeInput): void
}>()

const internalValue = ref(props.modelValue ?? props.value)

watch(() => props.modelValue, (v) => {
  if (v !== undefined) internalValue.value = v
})
watch(() => props.value, (v) => {
  if (props.modelValue === undefined && v !== undefined) internalValue.value = v
})

const normalizedModes = computed<SpeedometerMode[]>(() => {
  const range = props.max - props.min
  return props.modes.map((m, idx) => {
    if (typeof m === 'string') {
      const defaultValues: Record<string, number> = {
        ECO: props.min + range * 0.35,
        NORMAL: props.min + range * 0.6,
        SPORT: props.min + range * 0.85,
        TURBO: props.min + range * 0.98
      }
      const val = defaultValues[m] ?? (props.min + (range / (props.modes.length || 1)) * (idx + 1))
      return { label: m, value: Math.round(val) }
    }
    return m
  })
})

const activeModeLabel = ref<string>('SPORT')

// Needle rotation angle (-120deg to 120deg)
const needleRotation = computed(() => {
  const range = props.max - props.min
  if (range <= 0) return -120
  const clamped = Math.max(props.min, Math.min(props.max, internalValue.value))
  const pct = (clamped - props.min) / range
  return -120 + pct * 240
})

const progressDashOffset = computed(() => {
  const range = props.max - props.min
  if (range <= 0) return 377
  const clamped = Math.max(props.min, Math.min(props.max, internalValue.value))
  const pct = (clamped - props.min) / range
  return 377 - pct * 252
})

const progressColor = computed(() => {
  if (props.activeColor) return props.activeColor
  const range = props.max - props.min
  const pct = range > 0 ? (internalValue.value - props.min) / range : 0
  if (pct > 0.85) return '#FF007F'
  if (props.variant === 'pink') return '#FF007F'
  if (props.variant === 'cyan') return '#00F0FF'
  if (props.variant === 'yellow') return '#FFD600'
  return '#CCFF00'
})

function selectMode(m: SpeedometerMode) {
  activeModeLabel.value = m.label
  internalValue.value = m.value
  emit('update:modelValue', m.value)
  emit('change', m.value)
  emit('mode-select', m)
}

function formattedValue(val: number): string {
  if (props.formatter) return props.formatter(val)
  return Math.round(val).toString()
}
</script>

<template>
  <div :class="['crml-speedometer font-mono', `crml-speedometer--${variant}`]">
    <!-- Header -->
    <div class="speedo-header">
      <slot name="title" :title="title">
        <span class="speedo-title font-heading">{{ title }}</span>
      </slot>
      <slot name="unit" :unit="unit">
        <span class="speedo-unit-pill font-mono">{{ unit }}</span>
      </slot>
    </div>

    <!-- Circular Dial Gauge -->
    <div class="dial-container">
      <svg class="dial-svg" viewBox="0 0 200 200">
        <!-- Background Outer Track Arc -->
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke="#e0e0e0"
          stroke-width="16"
          stroke-dasharray="377"
          stroke-dashoffset="125"
          transform="rotate(150 100 100)"
        />

        <!-- Active Progress Arc -->
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          :stroke="progressColor"
          stroke-width="16"
          stroke-dasharray="377"
          :stroke-dashoffset="progressDashOffset"
          transform="rotate(150 100 100)"
          stroke-linecap="round"
          class="dial-progress"
        />

        <!-- Ticks -->
        <g class="dial-ticks">
          <line v-for="i in 11" :key="i"
            x1="100" y1="24" x2="100" y2="34"
            stroke="#0d0d0d" stroke-width="3"
            :transform="`rotate(${-120 + (i - 1) * 24} 100 100)`"
          />
        </g>
      </svg>

      <!-- Center Physical Needle Pointer -->
      <div
        class="needle-arm"
        :style="{ transform: `rotate(${needleRotation}deg)` }"
      >
        <div class="needle-pointer"></div>
      </div>

      <!-- Center Cap & Digital Readout -->
      <div class="center-hub">
        <slot name="readout" :value="internalValue" :formatted="formattedValue(internalValue)">
          <span class="digital-readout font-heading">{{ formattedValue(internalValue) }}</span>
        </slot>
        <slot name="sublabel" :sublabel="sublabel">
          <span v-if="sublabel" class="hub-label font-mono">{{ sublabel }}</span>
        </slot>
      </div>
    </div>

    <!-- Mode Selector Pills Bar -->
    <div v-if="showModes && normalizedModes.length > 0" class="mode-bar">
      <slot name="modes" :modes="normalizedModes" :active-mode="activeModeLabel" :select="selectMode">
        <button
          v-for="m in normalizedModes"
          :key="m.label"
          type="button"
          class="mode-btn font-mono"
          :class="{ active: activeModeLabel === m.label }"
          @click="selectMode(m)"
        >
          <slot name="mode" :mode="m" :active="activeModeLabel === m.label">
            {{ m.label }}
          </slot>
        </button>
      </slot>
    </div>
  </div>
</template>

<style scoped>
.crml-speedometer {
  background: var(--crml-bg-surface, #ffffff);
  border: 3px solid var(--crt-obsidian, #0d0d0d);
  border-radius: var(--crml-radius-lg, 14px);
  padding: 16px;
  box-shadow: 4px 4px 0px var(--crt-obsidian, #0d0d0d);
  width: 100%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin: 0 auto;
  box-sizing: border-box;
}

.speedo-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px dashed var(--crml-border-subtle, #e0e0e0);
  padding-bottom: 8px;
}

.speedo-title {
  font-weight: 900;
  font-size: 12px;
  color: var(--crml-text-main, #0d0d0d);
  letter-spacing: -0.2px;
}

.speedo-unit-pill {
  background: var(--crt-electric-lime, #ccff00);
  color: var(--crt-obsidian, #0d0d0d);
  border: 2px solid var(--crt-obsidian, #0d0d0d);
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 900;
  font-size: 10px;
  box-shadow: 1.5px 1.5px 0px var(--crt-obsidian, #0d0d0d);
}

.dial-container {
  position: relative;
  width: 200px;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dial-svg {
  width: 100%;
  height: 100%;
}

.dial-progress {
  transition: stroke-dashoffset 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), stroke 0.2s ease;
}

.needle-arm {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 4px;
  height: 80px;
  margin-left: -2px;
  margin-top: -70px;
  transform-origin: center 70px;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  pointer-events: none;
}

.needle-pointer {
  width: 100%;
  height: 60px;
  background: var(--crt-hot-pink, #ff007f);
  border: 1.5px solid var(--crt-obsidian, #0d0d0d);
  border-radius: 2px;
}

.center-hub {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -40%);
  width: 76px;
  height: 76px;
  background: var(--crt-obsidian, #0d0d0d);
  color: var(--crt-cyber-cyan, #00f0ff);
  border: 3px solid var(--crt-obsidian, #0d0d0d);
  border-radius: 50%;
  box-shadow: 3px 3px 0px var(--crt-electric-lime, #ccff00);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.digital-readout {
  font-size: 26px;
  font-weight: 900;
  line-height: 1;
}

.hub-label {
  font-size: 8px;
  color: #ffffff;
  font-weight: 700;
  margin-top: 2px;
}

.mode-bar {
  display: flex;
  gap: 6px;
  width: 100%;
}

.mode-btn {
  flex: 1;
  background: var(--crml-bg-elevated, #f4f4f5);
  border: 2px solid var(--crt-obsidian, #0d0d0d);
  border-radius: 6px;
  padding: 6px 0;
  font-weight: 900;
  font-size: 10px;
  cursor: pointer;
  box-shadow: 2px 2px 0px var(--crt-obsidian, #0d0d0d);
  transition: transform 0.1s ease, background-color 0.1s ease;
}

.mode-btn.active {
  background: var(--crt-cyber-cyan, #00f0ff);
  color: var(--crt-obsidian, #0d0d0d);
  transform: translate(-1px, -1px);
  box-shadow: 3px 3px 0px var(--crt-obsidian, #0d0d0d);
}

.mode-btn:active {
  transform: translate(1px, 1px);
  box-shadow: 1px 1px 0px var(--crt-obsidian, #0d0d0d);
}
</style>
