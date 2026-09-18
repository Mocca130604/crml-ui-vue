<script setup lang="ts">
import { ref, computed, watch } from 'vue'

export interface CrmlTimePickerProps {
  modelValue?: string // "09:30 AM" or "14:30"
  label?: string
  variant?: 'lime' | 'pink' | 'cyan' | 'yellow' | 'white'
  format?: '12h' | '24h' | '12' | '24'
}

const props = withDefaults(
  defineProps<CrmlTimePickerProps>(),
  {
    modelValue: '09:30 AM',
    label: 'NEUBRUTAL TIME PICKER',
    variant: 'lime',
    format: '12h'
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}>()

const timeFormat = ref<'12h' | '24h'>(
  props.format && props.format.toString().includes('24') ? '24h' : '12h'
)

function parseTimeString(str: string) {
  if (!str) return { h: 9, m: 30 }
  const isPm = /pm/i.test(str)
  const isAm = /am/i.test(str)
  const cleaned = str.replace(/[^\d:]/g, '')
  const parts = cleaned.split(':')
  let h = parseInt(parts[0] || '9', 10)
  const m = parseInt(parts[1] || '0', 10)

  if (isPm || isAm) {
    if (isPm && h < 12) h += 12
    if (isAm && h === 12) h = 0
  }
  return { h: Math.min(23, Math.max(0, h)), m: Math.min(59, Math.max(0, m)) }
}

const initialParsed = parseTimeString(props.modelValue)
const hour24 = ref(initialParsed.h)
const minute = ref(initialParsed.m)

watch(
  () => props.format,
  (newFmt) => {
    if (newFmt) {
      timeFormat.value = newFmt.toString().includes('24') ? '24h' : '12h'
    }
  }
)

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal && newVal !== formattedTime.value) {
      const parsed = parseTimeString(newVal)
      hour24.value = parsed.h
      minute.value = parsed.m
    }
  }
)

const is24h = computed(() => timeFormat.value === '24h')

const displayHour = computed(() => {
  if (is24h.value) {
    return hour24.value
  }
  const h12 = hour24.value % 12
  return h12 === 0 ? 12 : h12
})

const period = computed(() => {
  return hour24.value >= 12 ? 'PM' : 'AM'
})

const formattedTime = computed(() => {
  const hStr = displayHour.value.toString().padStart(2, '0')
  const mStr = minute.value.toString().padStart(2, '0')
  if (is24h.value) {
    return `${hStr}:${mStr}`
  }
  return `${hStr}:${mStr} ${period.value}`
})

function setTimeFormat(fmt: '12h' | '24h') {
  timeFormat.value = fmt
  emitTime()
}

function incrementHour() {
  hour24.value = (hour24.value + 1) % 24
  emitTime()
}

function decrementHour() {
  hour24.value = (hour24.value - 1 + 24) % 24
  emitTime()
}

function incrementMinute() {
  minute.value = (minute.value + 5) % 60
  emitTime()
}

function decrementMinute() {
  minute.value = minute.value < 5 ? 55 : minute.value - 5
  emitTime()
}

function togglePeriod() {
  if (is24h.value) return
  hour24.value = (hour24.value + 12) % 24
  emitTime()
}

function selectPreset(h24: number, m: number) {
  hour24.value = h24
  minute.value = m
  emitTime()
}

function emitTime() {
  const val = formattedTime.value
  emit('update:modelValue', val)
  emit('change', val)
}
</script>

<template>
  <div class="crml-time-picker font-mono" :class="[`variant-${variant}`]">
    <!-- Header -->
    <div class="time-picker-header">
      <span class="picker-title font-heading">{{ label }}</span>
      <div class="header-right-group">
        <!-- 12H / 24H Format Switcher -->
        <div class="format-switcher font-mono">
          <button
            type="button"
            class="format-toggle-btn"
            :class="{ active: timeFormat === '12h' }"
            @click="setTimeFormat('12h')"
          >
            12H
          </button>
          <button
            type="button"
            class="format-toggle-btn"
            :class="{ active: timeFormat === '24h' }"
            @click="setTimeFormat('24h')"
          >
            24H
          </button>
        </div>
        <span class="time-readout-pill">{{ formattedTime }}</span>
      </div>
    </div>

    <!-- Main Spinners Row -->
    <div class="spinners-row">
      <!-- Hour Spinner -->
      <div class="spinner-col">
        <button type="button" class="spin-btn" @click="incrementHour">▲</button>
        <div class="digit-box font-heading">{{ displayHour.toString().padStart(2, '0') }}</div>
        <button type="button" class="spin-btn" @click="decrementHour">▼</button>
        <span class="col-label font-mono">HOUR</span>
      </div>

      <span class="time-colon font-heading">:</span>

      <!-- Minute Spinner -->
      <div class="spinner-col">
        <button type="button" class="spin-btn" @click="incrementMinute">▲</button>
        <div class="digit-box font-heading">{{ minute.toString().padStart(2, '0') }}</div>
        <button type="button" class="spin-btn" @click="decrementMinute">▼</button>
        <span class="col-label font-mono">MIN</span>
      </div>

      <!-- Period Toggle (AM/PM or 24H mode) -->
      <div class="spinner-col">
        <button
          type="button"
          class="period-toggle-btn font-heading"
          :class="{ 'is-24h': is24h }"
          :disabled="is24h"
          @click="togglePeriod"
        >
          {{ is24h ? '24H' : period }}
        </button>
        <span class="col-label font-mono">{{ is24h ? 'FORMAT' : 'MODE' }}</span>
      </div>
    </div>

    <!-- Quick Presets Bar -->
    <div class="presets-bar">
      <button type="button" class="preset-btn" @click="selectPreset(9, 0)">
        {{ is24h ? '09:00' : '09:00 AM' }}
      </button>
      <button type="button" class="preset-btn" @click="selectPreset(12, 0)">
        {{ is24h ? '12:00' : '12:00 PM' }}
      </button>
      <button type="button" class="preset-btn" @click="selectPreset(15, 30)">
        {{ is24h ? '15:30' : '03:30 PM' }}
      </button>
      <button type="button" class="preset-btn" @click="selectPreset(20, 0)">
        {{ is24h ? '20:00' : '08:00 PM' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.crml-time-picker {
  background: var(--crml-bg-surface, #ffffff);
  border: 3px solid var(--crml-border-ink, #0D0D0D);
  border-radius: var(--crml-radius-lg, 12px);
  padding: 12px;
  box-shadow: 4px 4px 0px var(--crml-shadow-ink, #0D0D0D);
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 320px;
  box-sizing: border-box;
  user-select: none;
}

.time-picker-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px dashed var(--crml-border-subtle, #e0e0e0);
  padding-bottom: 6px;
}

.picker-title {
  font-weight: 900;
  font-size: 11px;
  color: var(--crml-text-main, #0d0d0d);
}

.header-right-group {
  display: flex;
  align-items: center;
  gap: 6px;
}

.format-switcher {
  display: flex;
  background: var(--crml-bg-elevated, #f4f4f5);
  border: 1.5px solid var(--crml-border-ink, #0D0D0D);
  border-radius: 4px;
  padding: 1px;
  gap: 1px;
}

.format-toggle-btn {
  background: transparent;
  border: none;
  border-radius: 3px;
  font-size: 8.5px;
  font-weight: 900;
  padding: 1px 5px;
  cursor: pointer;
  color: var(--crml-text-muted, #757575);
  transition: all 0.1s ease;
}

.format-toggle-btn.active {
  background: var(--crt-obsidian, #0d0d0d);
  color: var(--crml-action-primary, #1B6FFF);
}

.variant-pink .format-toggle-btn.active {
  color: var(--crt-hot-pink, #ff007f);
}

.variant-cyan .format-toggle-btn.active {
  color: var(--crt-cyber-cyan, #00f0ff);
}

.variant-yellow .format-toggle-btn.active {
  color: var(--crt-sunburst-yellow, #ffd600);
}

.time-readout-pill {
  background: var(--crml-action-primary, #1B6FFF);
  color: #ffffff;
  border: 1.5px solid var(--crml-border-ink, #0D0D0D);
  padding: 1px 6px;
  border-radius: 4px;
  font-weight: 900;
  font-size: 11px;
  box-shadow: 1.5px 1.5px 0px var(--crml-shadow-ink, #0D0D0D);
}

.variant-pink .time-readout-pill {
  background: var(--crt-hot-pink, #ff007f);
  color: #ffffff;
}

.variant-cyan .time-readout-pill {
  background: var(--crt-cyber-cyan, #00f0ff);
  color: var(--crt-obsidian, #0d0d0d);
}

.variant-yellow .time-readout-pill {
  background: var(--crt-sunburst-yellow, #ffd600);
  color: var(--crt-obsidian, #0d0d0d);
}

.spinners-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: var(--crml-bg-elevated, #f4f4f5);
  border: 2px solid var(--crml-border-ink, #0D0D0D);
  border-radius: 8px;
  padding: 10px;
}

.spinner-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.time-colon {
  font-size: 24px;
  font-weight: 900;
  color: var(--crt-obsidian, #0d0d0d);
  margin-top: -16px;
}

.spin-btn {
  background: var(--crml-bg-surface);
  border: 1.5px solid var(--crml-border-ink, #0D0D0D);
  border-radius: 4px;
  font-size: 9px;
  font-weight: 900;
  width: 32px;
  height: 20px;
  cursor: pointer;
  box-shadow: 1.5px 1.5px 0px var(--crml-shadow-ink, #0D0D0D);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.05s ease, background-color 0.1s ease;
}

.spin-btn:hover {
  background: var(--crt-cyber-cyan, #00f0ff);
  transform: translate(-0.5px, -0.5px);
}

.digit-box {
  width: 44px;
  height: 38px;
  background: var(--crt-obsidian, #0d0d0d);
  color: var(--crml-action-primary, #1B6FFF);
  border: 2px solid var(--crml-border-ink, #0D0D0D);
  border-radius: 6px;
  font-size: 20px;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 2px 2px 0px var(--crml-action-primary, #1B6FFF);
}

.variant-pink .digit-box {
  color: var(--crt-hot-pink, #ff007f);
  box-shadow: 2px 2px 0px var(--crt-hot-pink, #ff007f);
}

.variant-cyan .digit-box {
  color: var(--crt-cyber-cyan, #00f0ff);
  box-shadow: 2px 2px 0px var(--crt-cyber-cyan, #00f0ff);
}

.variant-yellow .digit-box {
  color: var(--crt-sunburst-yellow, #ffd600);
  box-shadow: 2px 2px 0px var(--crt-sunburst-yellow, #ffd600);
}

.period-toggle-btn {
  width: 44px;
  height: 38px;
  background: var(--crt-hot-pink, #ff007f);
  color: #ffffff;
  border: 2px solid var(--crml-border-ink, #0D0D0D);
  border-radius: 6px;
  font-size: 14px;
  font-weight: 900;
  cursor: pointer;
  box-shadow: 2px 2px 0px var(--crml-shadow-ink, #0D0D0D);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.05s ease;
}

.period-toggle-btn:hover:not(:disabled) {
  transform: translate(-1px, -1px);
  box-shadow: 3px 3px 0px var(--crml-shadow-ink, #0D0D0D);
}

.period-toggle-btn.is-24h {
  background: var(--crml-bg-elevated, #e0e0e0);
  color: var(--crt-obsidian, #0d0d0d);
  cursor: default;
  opacity: 0.8;
  font-size: 12px;
}

.col-label {
  font-size: 8.5px;
  font-weight: 900;
  color: var(--crml-text-muted, #757575);
}

.presets-bar {
  display: flex;
  gap: 4px;
}

.preset-btn {
  flex: 1;
  background: var(--crml-bg-surface);
  border: 1.5px solid var(--crml-border-ink, #0D0D0D);
  border-radius: 4px;
  padding: 4px 0;
  font-size: 9px;
  font-weight: 900;
  cursor: pointer;
  box-shadow: 1.5px 1.5px 0px var(--crml-shadow-ink, #0D0D0D);
  transition: transform 0.05s ease, background-color 0.1s ease;
}

.preset-btn:hover {
  background: var(--crt-sunburst-yellow, #ffd600);
  transform: translate(-0.5px, -0.5px);
}
</style>
