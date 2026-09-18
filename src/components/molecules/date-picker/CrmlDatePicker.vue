<script setup lang="ts">
import { ref, computed } from 'vue'

export interface CrmlDatePickerProps {
  modelValue?: string | [string, string]
  mode?: 'single' | 'range'
  label?: string
  start?: string
  end?: string
  variant?: 'lime' | 'pink' | 'cyan' | 'yellow'
}

const props = withDefaults(defineProps<CrmlDatePickerProps>(), {
  modelValue: '2026-09-12',
  mode: 'single',
  label: 'TACTILE DATE PICKER',
  start: '2026-09-05',
  end: '2026-09-18',
  variant: 'lime'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | [string, string]): void
  (e: 'update:start', value: string): void
  (e: 'update:end', value: string): void
  (e: 'change', value: string | [string, string]): void
}>()

const viewMode = ref<'calendar' | 'month' | 'year'>('calendar')

const monthNames = [
  'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
  'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
]
const monthShorts = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
const daysHeader = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA']

// Parse single date
const initialDateStr = typeof props.modelValue === 'string' ? props.modelValue : '2026-09-12'
const initial = new Date(initialDateStr)
const currentYear = ref(isNaN(initial.getFullYear()) ? 2026 : initial.getFullYear())
const currentMonthIdx = ref(isNaN(initial.getMonth()) ? 8 : initial.getMonth())
const selectedDay = ref(isNaN(initial.getDate()) ? 12 : initial.getDate())

const decadeStartYear = computed(() => currentYear.value - 5)
const decadeEndYear = computed(() => currentYear.value + 6)
const directYearInput = ref('')

// Range selection states
const rangeStartStr = ref(Array.isArray(props.modelValue) ? props.modelValue[0] : props.start)
const rangeEndStr = ref(Array.isArray(props.modelValue) ? props.modelValue[1] : props.end)
const isSelectingRangeEnd = ref(false)

const monthTitle = computed(() => {
  if (viewMode.value === 'year') {
    return `${decadeStartYear.value} — ${decadeEndYear.value}`
  }
  return `${monthNames[currentMonthIdx.value]} ${currentYear.value}`
})

const daysInMonth = computed(() => {
  return new Date(currentYear.value, currentMonthIdx.value + 1, 0).getDate()
})

const firstDayOffset = computed(() => {
  return new Date(currentYear.value, currentMonthIdx.value, 1).getDay()
})

const selectedDateFormatted = computed(() => {
  const m = (currentMonthIdx.value + 1).toString().padStart(2, '0')
  const d = selectedDay.value.toString().padStart(2, '0')
  return `${currentYear.value}-${m}-${d}`
})

const rangeFormattedText = computed(() => {
  if (props.mode === 'range') {
    return `${rangeStartStr.value} — ${rangeEndStr.value}`
  }
  return selectedDateFormatted.value
})

function prevMonth() {
  if (currentMonthIdx.value === 0) {
    currentMonthIdx.value = 11
    currentYear.value--
  } else {
    currentMonthIdx.value--
  }
  clampDay()
}

function nextMonth() {
  if (currentMonthIdx.value === 11) {
    currentMonthIdx.value = 0
    currentYear.value++
  } else {
    currentMonthIdx.value++
  }
  clampDay()
}

function prevYearDecade() {
  currentYear.value -= 12
}

function nextYearDecade() {
  currentYear.value += 12
}

function jumpDecade(yearBase: number) {
  currentYear.value = yearBase
}

function applyDirectYear() {
  const yr = Number(directYearInput.value)
  if (!isNaN(yr) && yr >= 1900 && yr <= 2100) {
    currentYear.value = yr
    directYearInput.value = ''
    viewMode.value = 'month'
  }
}

function clampDay() {
  if (selectedDay.value > daysInMonth.value) {
    selectedDay.value = daysInMonth.value
  }
}

function selectMonth(idx: number) {
  currentMonthIdx.value = idx
  viewMode.value = 'calendar'
}

function selectYear(yr: number) {
  currentYear.value = yr
  viewMode.value = 'month'
}

function formatDateStr(y: number, mIdx: number, d: number): string {
  const mStr = (mIdx + 1).toString().padStart(2, '0')
  const dStr = d.toString().padStart(2, '0')
  return `${y}-${mStr}-${dStr}`
}

function selectDay(day: number) {
  const formatted = formatDateStr(currentYear.value, currentMonthIdx.value, day)

  if (props.mode === 'range') {
    if (!isSelectingRangeEnd.value || !rangeStartStr.value) {
      rangeStartStr.value = formatted
      rangeEndStr.value = formatted
      isSelectingRangeEnd.value = true
    } else {
      if (formatted < rangeStartStr.value) {
        rangeEndStr.value = rangeStartStr.value
        rangeStartStr.value = formatted
      } else {
        rangeEndStr.value = formatted
      }
      isSelectingRangeEnd.value = false
    }
    const rangeResult: [string, string] = [rangeStartStr.value, rangeEndStr.value]
    emit('update:start', rangeStartStr.value)
    emit('update:end', rangeEndStr.value)
    emit('update:modelValue', rangeResult)
    emit('change', rangeResult)
  } else {
    selectedDay.value = day
    emit('update:modelValue', formatted)
    emit('change', formatted)
  }
}

function isDaySelected(day: number): boolean {
  if (props.mode === 'range') {
    const formatted = formatDateStr(currentYear.value, currentMonthIdx.value, day)
    return formatted === rangeStartStr.value || formatted === rangeEndStr.value
  }
  return day === selectedDay.value
}

function isDayInRange(day: number): boolean {
  if (props.mode !== 'range' || !rangeStartStr.value || !rangeEndStr.value) return false
  const formatted = formatDateStr(currentYear.value, currentMonthIdx.value, day)
  return formatted > rangeStartStr.value && formatted < rangeEndStr.value
}
</script>

<template>
  <div class="crml-date-picker font-mono" :class="[`variant-${variant}`, { 'mode-range': mode === 'range' }]">
    <!-- Header -->
    <div class="date-picker-header">
      <span class="picker-title font-heading">{{ label }}</span>
      <span class="selected-pill font-mono">{{ rangeFormattedText }}</span>
    </div>

    <!-- Month & Year Navigation Bar -->
    <div class="month-nav-bar">
      <button
        class="nav-btn"
        :title="viewMode === 'year' ? 'Shift 12 Years Back' : 'Previous Month'"
        @click="viewMode === 'year' ? prevYearDecade() : prevMonth()"
      >
        {{ viewMode === 'year' ? '◀ 12Y' : '◀' }}
      </button>
      
      <button
        type="button"
        class="month-title-btn font-heading"
        @click="viewMode = viewMode === 'calendar' ? 'month' : (viewMode === 'month' ? 'year' : 'calendar')"
      >
        <span>{{ monthTitle }}</span>
        <span class="title-arrow">{{ viewMode === 'calendar' ? '▾' : '▴' }}</span>
      </button>

      <button
        class="nav-btn"
        :title="viewMode === 'year' ? 'Shift 12 Years Forward' : 'Next Month'"
        @click="viewMode === 'year' ? nextYearDecade() : nextMonth()"
      >
        {{ viewMode === 'year' ? '12Y ▶' : '▶' }}
      </button>
    </div>

    <!-- 1. Calendar View (Days) -->
    <div v-if="viewMode === 'calendar'" class="calendar-grid">
      <!-- Days of week header -->
      <div v-for="d in daysHeader" :key="d" class="day-head font-heading">
        {{ d }}
      </div>

      <!-- Empty padding cells -->
      <div
        v-for="blank in firstDayOffset"
        :key="`blank-${blank}`"
        class="day-cell-empty"
      ></div>

      <!-- Calendar days -->
      <button
        v-for="day in daysInMonth"
        :key="day"
        class="day-cell font-mono"
        :class="{
          active: isDaySelected(day),
          'in-range': isDayInRange(day)
        }"
        @click="selectDay(day)"
      >
        {{ day }}
      </button>
    </div>

    <!-- 2. Month Selector View (Grid) -->
    <div v-else-if="viewMode === 'month'" class="month-grid">
      <button
        v-for="(mName, idx) in monthShorts"
        :key="mName"
        class="grid-selector-btn font-heading"
        :class="{ active: idx === currentMonthIdx }"
        @click="selectMonth(idx)"
      >
        {{ mName }}
      </button>
    </div>

    <!-- 3. Quick Year Selector View (12-year window + Decade Presets + Direct Year Input) -->
    <div v-else-if="viewMode === 'year'" class="year-view-container">
      <div class="year-grid">
        <button
          v-for="yr in 12"
          :key="yr"
          class="grid-selector-btn font-mono"
          :class="{ active: (decadeStartYear + yr - 1) === currentYear }"
          @click="selectYear(decadeStartYear + yr - 1)"
        >
          {{ decadeStartYear + yr - 1 }}
        </button>
      </div>

      <!-- Fast Decade Jump Pills (for Birthdays e.g. 1980s, 1990s, 2000s) -->
      <div class="decade-presets-row">
        <button
          v-for="dYr in [1970, 1980, 1990, 2000, 2010, 2020]"
          :key="dYr"
          class="decade-pill-btn font-mono"
          :class="{ active: currentYear >= dYr && currentYear < dYr + 10 }"
          @click="jumpDecade(dYr + 5)"
        >
          {{ dYr }}s
        </button>
      </div>

      <!-- Direct Year Input Box -->
      <div class="direct-year-box font-mono">
        <input
          type="number"
          v-model="directYearInput"
          placeholder="TYPE YEAR (e.g. 1999)"
          class="direct-year-input font-mono"
          @keyup.enter="applyDirectYear"
        />
        <button type="button" class="direct-year-btn font-heading" @click="applyDirectYear">
          GO ↵
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.crml-date-picker {
  background: var(--crml-bg-surface, #ffffff);
  border: 3px solid var(--crml-border-ink, #0D0D0D);
  border-radius: var(--crml-radius-lg, 12px);
  padding: 12px;
  box-shadow: 4px 4px 0px var(--crml-shadow-ink, #0D0D0D);
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 320px;
  box-sizing: border-box;
  user-select: none;
}

.date-picker-header {
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

.selected-pill {
  background: var(--crt-cyber-cyan, #00f0ff);
  color: var(--crt-obsidian, #0d0d0d);
  border: 1.5px solid var(--crml-border-ink, #0D0D0D);
  padding: 1px 6px;
  border-radius: 4px;
  font-weight: 900;
  font-size: 10px;
  box-shadow: 1.5px 1.5px 0px var(--crml-shadow-ink, #0D0D0D);
}

.month-nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--crml-bg-elevated, #f4f4f5);
  border: 2px solid var(--crml-border-ink, #0D0D0D);
  border-radius: 6px;
  padding: 4px 6px;
}

.month-title-btn {
  background: transparent;
  border: none;
  font-size: 11px;
  font-weight: 900;
  color: var(--crml-text-main, #0d0d0d);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 2px 6px;
  border-radius: 4px;
  transition: background-color 0.1s ease;
}

.month-title-btn:hover {
  background: var(--crt-sunburst-yellow, #ffd600);
}

.title-arrow {
  font-size: 9px;
}

.nav-btn {
  background: var(--crml-bg-surface, #ffffff);
  border: 1.5px solid var(--crml-border-ink, #0D0D0D);
  border-radius: 4px;
  font-size: 10px;
  font-weight: 900;
  padding: 2px 8px;
  cursor: pointer;
  box-shadow: 1.5px 1.5px 0px var(--crml-shadow-ink, #0D0D0D);
  transition: transform 0.05s ease, background-color 0.1s ease;
}

.nav-btn:hover {
  background: var(--crt-sunburst-yellow, #ffd600);
  transform: translate(-0.5px, -0.5px);
}

.nav-btn:active {
  transform: translate(1px, 1px);
  box-shadow: 0.5px 0.5px 0px var(--crml-shadow-ink, #0D0D0D);
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  text-align: center;
}

.month-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
  padding: 6px 0;
}

.year-view-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.year-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
}

.grid-selector-btn {
  height: 36px;
  background: var(--crml-bg-surface, #ffffff);
  border: 2px solid var(--crml-border-ink, #0D0D0D);
  border-radius: 6px;
  font-size: 11px;
  font-weight: 900;
  cursor: pointer;
  box-shadow: 2px 2px 0px var(--crml-shadow-ink, #0D0D0D);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.1s ease;
}

.grid-selector-btn:hover {
  background: var(--crt-sunburst-yellow, #ffd600);
  transform: translate(-1px, -1px);
}

.grid-selector-btn.active {
  background: var(--crml-action-primary, #1B6FFF);
  box-shadow: 3px 3px 0px var(--crml-shadow-ink, #0D0D0D);
}

.decade-presets-row {
  display: flex;
  gap: 4px;
  overflow-x: auto;
  padding-bottom: 2px;
}

.decade-pill-btn {
  background: var(--crml-bg-surface, #ffffff);
  border: 1.5px solid var(--crml-border-ink, #0D0D0D);
  border-radius: 4px;
  font-size: 9px;
  font-weight: 900;
  padding: 3px 6px;
  cursor: pointer;
  white-space: nowrap;
  box-shadow: 1px 1px 0px var(--crml-shadow-ink, #0D0D0D);
}

.decade-pill-btn:hover {
  background: var(--crt-cyber-cyan, #00f0ff);
}

.decade-pill-btn.active {
  background: var(--crt-hot-pink, #ff007f);
  color: #ffffff;
}

.direct-year-box {
  display: flex;
  gap: 4px;
}

.direct-year-input {
  flex: 1;
  border: 2px solid var(--crml-border-ink, #0D0D0D);
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 10px;
  font-weight: 900;
  outline: none;
  background: var(--crml-bg-surface, #ffffff);
}

.direct-year-btn {
  background: var(--crml-action-primary, #1B6FFF);
  border: 2px solid var(--crml-border-ink, #0D0D0D);
  border-radius: 4px;
  padding: 0 10px;
  font-size: 10px;
  font-weight: 900;
  cursor: pointer;
  box-shadow: 1.5px 1.5px 0px var(--crml-shadow-ink, #0D0D0D);
}

.day-head {
  font-size: 9px;
  font-weight: 900;
  color: var(--crt-hot-pink, #ff007f);
  padding: 2px 0;
}

.day-cell-empty {
  height: 28px;
}

.day-cell {
  height: 28px;
  background: var(--crml-bg-surface, #ffffff);
  border: 1.5px solid var(--crml-border-ink, #0D0D0D);
  border-radius: 4px;
  font-size: 10px;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 1.5px 1.5px 0px var(--crml-shadow-ink, #0D0D0D);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.05s ease, background-color 0.1s ease;
}

.day-cell:hover {
  background: var(--crt-sunburst-yellow, #ffd600);
  transform: translate(-0.5px, -0.5px);
}

.day-cell.in-range {
  background: var(--crt-peach, #ffd1dc);
  border-radius: 0;
}

.day-cell.active {
  background: var(--crml-action-primary, #1B6FFF);
  color: #FFFFFF;
  font-weight: 900;
  box-shadow: 2.5px 2.5px 0px var(--crml-shadow-ink, #0D0D0D);
  transform: translate(-1px, -1px);
}

/* Color Variants Override */
.crml-date-picker.variant-pink .selected-pill,
.crml-date-picker.variant-pink .day-cell.active,
.crml-date-picker.variant-pink .grid-selector-btn.active,
.crml-date-picker.variant-pink .direct-year-btn {
  background: var(--crt-hot-pink, #ff007f);
  color: #ffffff;
}

.crml-date-picker.variant-cyan .selected-pill,
.crml-date-picker.variant-cyan .day-cell.active,
.crml-date-picker.variant-cyan .grid-selector-btn.active,
.crml-date-picker.variant-cyan .direct-year-btn {
  background: var(--crt-cyber-cyan, #00f0ff);
  color: var(--crt-obsidian, #0d0d0d);
}

.crml-date-picker.variant-yellow .selected-pill,
.crml-date-picker.variant-yellow .day-cell.active,
.crml-date-picker.variant-yellow .grid-selector-btn.active,
.crml-date-picker.variant-yellow .direct-year-btn {
  background: var(--crt-sunburst-yellow, #ffd600);
  color: var(--crt-obsidian, #0d0d0d);
}
</style>
