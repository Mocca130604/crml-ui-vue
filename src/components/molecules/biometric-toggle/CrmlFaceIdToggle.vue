<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    label?: string
    sublabel?: string
  }>(),
  {
    modelValue: false,
    label: 'BIOMETRIC PASSKEY',
    sublabel: 'Hardware Security Module Face ID'
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', value: boolean): void
}>()

const isScanning = ref(false)

function toggleSwitch() {
  if (isScanning.value) return
  isScanning.value = true
  
  setTimeout(() => {
    isScanning.value = false
    const newValue = !props.modelValue
    emit('update:modelValue', newValue)
    emit('change', newValue)
  }, 400)
}
</script>

<template>
  <div
    class="crml-faceid-toggle"
    :class="{ 'is-active': modelValue, 'is-scanning': isScanning }"
    @click="toggleSwitch"
  >
    <!-- Wireframe Face ID Icon Box -->
    <div class="faceid-icon-box">
      <svg class="faceid-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <!-- Top Left Corner -->
        <path d="M4 8V6a2 2 0 0 1 2-2h2" stroke-width="2.5" stroke-linecap="round" />
        <!-- Top Right Corner -->
        <path d="M16 4h2a2 2 0 0 1 2 2v2" stroke-width="2.5" stroke-linecap="round" />
        <!-- Bottom Left Corner -->
        <path d="M4 16v2a2 2 0 0 0 2 2h2" stroke-width="2.5" stroke-linecap="round" />
        <!-- Bottom Right Corner -->
        <path d="M16 20h2a2 2 0 0 0 2-2v-2" stroke-width="2.5" stroke-linecap="round" />

        <!-- Eyes -->
        <circle cx="9" cy="9" r="1" fill="currentColor" />
        <circle cx="15" cy="9" r="1" fill="currentColor" />

        <!-- Nose & Smile -->
        <path d="M12 11v3" stroke-width="2" stroke-linecap="round" />
        <path d="M9 16c1 1.5 5 1.5 6 0" stroke-width="2" stroke-linecap="round" />
      </svg>
      
      <!-- Scan Beam effect when scanning -->
      <div v-if="isScanning" class="scan-beam"></div>
    </div>

    <!-- Label & Status -->
    <div class="toggle-meta">
      <div class="toggle-title-row">
        <span class="toggle-title">{{ label }}</span>
        <span class="status-pill" :class="modelValue ? 'active' : 'inactive'">
          {{ modelValue ? 'ARMED' : 'DISABLED' }}
        </span>
      </div>
      <span class="toggle-subtitle">{{ sublabel }}</span>
    </div>

    <!-- Mechanical Slide Switch -->
    <div class="mecha-switch-track">
      <div class="mecha-switch-thumb">
        <span class="thumb-knurling"></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.crml-faceid-toggle {
  background: #fff;
  border: 3px solid #000;
  border-radius: 12px;
  padding: 12px 16px;
  box-shadow: 4px 4px 0 #000;
  display: flex;
  align-items: center;
  gap: 14px;
  cursor: pointer;
  user-select: none;
  width: 100%;
  max-width: 360px;
  transition: transform 0.1s ease, box-shadow 0.1s ease, background-color 0.2s ease;
}

.crml-faceid-toggle:hover {
  transform: translate(-1px, -1px);
  box-shadow: 5px 5px 0 #000;
}

.crml-faceid-toggle.is-active {
  background: #f0fdf4;
  border-color: #000;
}

.faceid-icon-box {
  position: relative;
  width: 44px;
  height: 44px;
  background: #111;
  color: #00f0ff;
  border: 2.5px solid #000;
  border-radius: 8px;
  box-shadow: 2px 2px 0 #000;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.crml-faceid-toggle.is-active .faceid-icon-box {
  color: #00ff66;
  background: #000;
}

.faceid-svg {
  width: 28px;
  height: 28px;
}

.scan-beam {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: #ff0055;
  box-shadow: 0 0 8px #ff0055;
  animation: scan-move 0.4s linear infinite alternate;
}

@keyframes scan-move {
  from { top: 0%; }
  to { top: 90%; }
}

.toggle-meta {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.toggle-title-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.toggle-title {
  font-family: monospace;
  font-weight: 900;
  font-size: 13px;
  color: #000;
}

.status-pill {
  font-family: monospace;
  font-weight: 900;
  font-size: 9px;
  padding: 1px 5px;
  border-radius: 3px;
  border: 1.5px solid #000;
}

.status-pill.active {
  background: #2ed573;
  color: #fff;
}

.status-pill.inactive {
  background: #e0e0e0;
  color: #666;
}

.toggle-subtitle {
  font-size: 10px;
  font-weight: 700;
  color: #666;
}

.mecha-switch-track {
  width: 48px;
  height: 26px;
  background: #e0e0e0;
  border: 2.5px solid #000;
  border-radius: 14px;
  position: relative;
  transition: background-color 0.2s ease;
}

.crml-faceid-toggle.is-active .mecha-switch-track {
  background: #00f0ff;
}

.mecha-switch-thumb {
  position: absolute;
  top: 1px;
  left: 1px;
  width: 19px;
  height: 19px;
  background: #ffe600;
  border: 2px solid #000;
  border-radius: 50%;
  box-shadow: 1px 1px 0 #000;
  transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  align-items: center;
  justify-content: center;
}

.crml-faceid-toggle.is-active .mecha-switch-thumb {
  transform: translateX(22px);
  background: #ff0055;
}

.thumb-knurling {
  width: 6px;
  height: 2px;
  background: #000;
  border-radius: 1px;
}
</style>
