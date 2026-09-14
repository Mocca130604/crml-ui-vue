<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'

export interface RadarTarget {
  id: string
  label: string
  x: number // percentage -50 to 50
  y: number // percentage -50 to 50
  status?: 'friendly' | 'hostile' | 'neutral' | 'lime' | 'pink' | 'cyan' | 'yellow'
  sector?: string
  distance?: number | string
  elevation?: number | string
  icon?: string
}

const props = withDefaults(
  defineProps<{
    title?: string
    targets?: RadarTarget[]
    sweepSpeed?: number
    modelValue?: string
    selectedTarget?: RadarTarget
    variant?: 'lime' | 'pink' | 'cyan' | 'yellow'
  }>(),
  {
    title: 'TACTILE RADAR HUD v2.4',
    sweepSpeed: 3,
    modelValue: undefined,
    selectedTarget: undefined,
    variant: 'cyan',
    targets: () => [
      { id: 'T-01', label: 'TARGET_ALPHA', x: 25, y: -30, status: 'hostile', sector: 'SEC-07A', distance: '1.4km' },
      { id: 'T-02', label: 'MECH_UNIT_02', x: -35, y: 15, status: 'friendly', sector: 'SEC-04C', distance: '0.8km' },
      { id: 'T-03', label: 'UNKNOWN_SIGNAL', x: -10, y: -40, status: 'neutral', sector: 'SEC-09F', distance: '3.2km' },
      { id: 'T-04', label: 'DRONE_QUAD', x: 40, y: 20, status: 'hostile', sector: 'SEC-02B', distance: '0.4km' }
    ]
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', targetId: string): void
  (e: 'target-select', target: RadarTarget): void
}>()

const activeTarget = ref<RadarTarget | null>(null)
const scanAngle = ref(0)
let animationFrame: number | null = null

function updateSweep() {
  scanAngle.value = (scanAngle.value + props.sweepSpeed) % 360
  animationFrame = requestAnimationFrame(updateSweep)
}

watch(
  () => props.modelValue,
  (newId) => {
    if (newId) {
      const match = props.targets.find((t) => t.id === newId)
      if (match) activeTarget.value = match
    }
  },
  { immediate: true }
)

const handleSelectTarget = (target: RadarTarget) => {
  activeTarget.value = target
  emit('update:modelValue', target.id)
  emit('target-select', target)
}

onMounted(() => {
  animationFrame = requestAnimationFrame(updateSweep)
  if (!activeTarget.value && props.targets.length > 0) {
    activeTarget.value = props.targets[0]
  }
})

onUnmounted(() => {
  if (animationFrame) cancelAnimationFrame(animationFrame)
})
</script>

<template>
  <div :class="['crml-radar-hud font-mono', `crml-radar-hud--${variant}`]">
    <!-- Header status bar -->
    <div class="hud-header">
      <slot name="header" :title="title" :active-target="activeTarget">
        <div class="hud-title-group">
          <span class="hud-dot"></span>
          <span class="hud-title font-heading">{{ title }}</span>
        </div>
        <span class="hud-coords" v-if="activeTarget">
          [X: {{ activeTarget.x.toFixed(0) }} | Y: {{ activeTarget.y.toFixed(0) }}]
        </span>
      </slot>
    </div>

    <!-- Circular Radar Body -->
    <div class="radar-scope-wrapper">
      <div class="radar-scope">
        <!-- Concentric Distance Rings -->
        <div class="ring ring-1"></div>
        <div class="ring ring-2"></div>
        <div class="ring ring-3"></div>

        <!-- Crosshair lines -->
        <div class="axis axis-x"></div>
        <div class="axis axis-y"></div>

        <!-- Animated Radar Sweep Line -->
        <div
          class="radar-sweep"
          :style="{ transform: `rotate(${scanAngle}deg)` }"
        ></div>

        <!-- Targets on Radar -->
        <div
          v-for="target in targets"
          :key="target.id"
          class="radar-blip"
          :class="[
            target.status || 'neutral',
            activeTarget?.id === target.id ? 'is-selected' : ''
          ]"
          :style="{
            left: `calc(50% + ${target.x * 3.2}px)`,
            top: `calc(50% + ${target.y * 3.2}px)`
          }"
          @click="handleSelectTarget(target)"
        >
          <slot name="target-blip" :target="target" :is-selected="activeTarget?.id === target.id">
            <span class="blip-ping"></span>
            <span class="blip-label">{{ target.label }}</span>
          </slot>
        </div>
      </div>
    </div>

    <!-- Live Telemetry Card Footer -->
    <div class="hud-footer" v-if="activeTarget">
      <slot name="footer" :active-target="activeTarget">
        <div class="telemetry-item">
          <span class="telemetry-key">ID:</span>
          <span class="telemetry-val">{{ activeTarget.id }}</span>
        </div>
        <div class="telemetry-item">
          <span class="telemetry-key">STATUS:</span>
          <span
            class="telemetry-badge"
            :class="activeTarget.status"
          >
            {{ activeTarget.status?.toUpperCase() }}
          </span>
        </div>
        <div class="telemetry-item">
          <span class="telemetry-key">GRID:</span>
          <span class="telemetry-val">{{ activeTarget.sector || 'SECTOR 07-B' }}</span>
        </div>
        <div v-if="activeTarget.distance" class="telemetry-item">
          <span class="telemetry-key">DIST:</span>
          <span class="telemetry-val">{{ activeTarget.distance }}</span>
        </div>
      </slot>
    </div>
  </div>
</template>

<style scoped>
.crml-radar-hud {
  background: var(--crml-bg-surface, #ffffff);
  border: 3px solid var(--crt-obsidian, #0d0d0d);
  border-radius: var(--crml-radius-lg, 12px);
  padding: 14px;
  box-shadow: 4px 4px 0px var(--crt-obsidian, #0d0d0d);
  color: var(--crml-text-main, #0d0d0d);
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 0 auto;
  box-sizing: border-box;
}

.hud-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid var(--crt-obsidian, #0d0d0d);
  padding-bottom: 8px;
}

.hud-title-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.hud-dot {
  width: 10px;
  height: 10px;
  background: var(--crt-hot-pink, #ff007f);
  border: 2px solid var(--crt-obsidian, #0d0d0d);
  border-radius: 50%;
  animation: pulse-dot 1s infinite alternate;
}

@keyframes pulse-dot {
  from { transform: scale(0.8); opacity: 0.6; }
  to { transform: scale(1.2); opacity: 1; }
}

.hud-title {
  font-weight: 900;
  font-size: 12px;
  color: var(--crml-text-main, #0d0d0d);
  letter-spacing: 0.5px;
}

.hud-coords {
  font-size: 11px;
  color: var(--crt-obsidian, #0d0d0d);
  background: var(--crt-electric-lime, #ccff00);
  border: 1.5px solid var(--crt-obsidian, #0d0d0d);
  padding: 1px 6px;
  border-radius: 4px;
  font-weight: 900;
}

.radar-scope-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 0;
}

.radar-scope {
  position: relative;
  width: 220px;
  height: 220px;
  border: 3px solid var(--crt-obsidian, #0d0d0d);
  border-radius: 50%;
  background: radial-gradient(circle, #eef9ff 0%, #ffffff 80%);
  overflow: hidden;
  box-shadow: inset 0 0 12px rgba(0, 0, 0, 0.08), 3px 3px 0px var(--crt-obsidian, #0d0d0d);
}

.ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px dashed rgba(13, 13, 13, 0.25);
  border-radius: 50%;
}

.ring-1 { width: 65px; height: 65px; }
.ring-2 { width: 130px; height: 130px; }
.ring-3 { width: 195px; height: 195px; }

.axis {
  position: absolute;
  background: rgba(13, 13, 13, 0.2);
}

.axis-x {
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
}

.axis-y {
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
}

.radar-sweep {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: conic-gradient(from 0deg, rgba(0, 240, 255, 0.45) 0deg, transparent 60deg, transparent 360deg);
  transform-origin: center center;
  pointer-events: none;
}

.radar-blip {
  position: absolute;
  width: 14px;
  height: 14px;
  margin-left: -7px;
  margin-top: -7px;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.blip-ping {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid var(--crt-obsidian, #0d0d0d);
  box-shadow: 1.5px 1.5px 0px var(--crt-obsidian, #0d0d0d);
}

.radar-blip.hostile .blip-ping {
  background: var(--crt-hot-pink, #ff007f);
}

.radar-blip.friendly .blip-ping {
  background: var(--crt-electric-lime, #ccff00);
}

.radar-blip.neutral .blip-ping {
  background: var(--crt-sunburst-yellow, #ffd600);
}

.radar-blip.is-selected .blip-ping {
  transform: scale(1.3);
  outline: 2.5px solid var(--crt-cyber-cyan, #00f0ff);
}

.blip-label {
  position: absolute;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 8.5px;
  font-weight: 900;
  white-space: nowrap;
  background: var(--crt-obsidian, #0d0d0d);
  color: #ffffff;
  border: 1.5px solid var(--crt-obsidian, #0d0d0d);
  padding: 1px 5px;
  border-radius: 4px;
  pointer-events: none;
}

.hud-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--crml-bg-elevated, #f4f4f5);
  border: 2px solid var(--crt-obsidian, #0d0d0d);
  padding: 8px 10px;
  border-radius: 8px;
  font-size: 11px;
  box-shadow: 2px 2px 0px var(--crt-obsidian, #0d0d0d);
}

.telemetry-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.telemetry-key {
  color: #666;
  font-weight: 800;
}

.telemetry-val {
  color: var(--crt-obsidian, #0d0d0d);
  font-weight: 900;
}

.telemetry-badge {
  padding: 1px 6px;
  border-radius: 4px;
  font-weight: 900;
  border: 1.5px solid var(--crt-obsidian, #0d0d0d);
  font-size: 9.5px;
}

.telemetry-badge.hostile {
  background: var(--crt-hot-pink, #ff007f);
  color: #ffffff;
}

.telemetry-badge.friendly {
  background: var(--crt-electric-lime, #ccff00);
  color: var(--crt-obsidian, #0d0d0d);
}

.telemetry-badge.neutral {
  background: var(--crt-sunburst-yellow, #ffd600);
  color: var(--crt-obsidian, #0d0d0d);
}
</style>
