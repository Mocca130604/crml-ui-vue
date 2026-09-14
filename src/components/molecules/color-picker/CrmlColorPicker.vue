<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    label?: string
    swatches?: string[]
  }>(),
  {
    modelValue: '#CCFF00',
    label: 'NEUBRUTAL PALETTE PICKER',
    swatches: () => [
      '#CCFF00', // Electric Lime
      '#FF007F', // Hot Pink
      '#00F0FF', // Cyber Cyan
      '#FFD600', // Sunburst Yellow
      '#2ED573', // Mint Green
      '#FF4757', // Arcade Red
      '#A060FF', // Neon Purple
      '#0D0D0D'  // Obsidian Black
    ]
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const currentColor = ref(props.modelValue)

function selectSwatch(color: string) {
  currentColor.value = color
  emit('update:modelValue', color)
}

function handleInput(e: Event) {
  const val = (e.target as HTMLInputElement).value
  currentColor.value = val
  emit('update:modelValue', val)
}
</script>

<template>
  <div class="crml-color-picker font-mono">
    <!-- Header Label -->
    <div class="picker-header">
      <span class="picker-title font-heading">{{ label }}</span>
      <span class="color-hex-tag" :style="{ backgroundColor: currentColor }">
        {{ currentColor.toUpperCase() }}
      </span>
    </div>

    <!-- Main Swatches Grid & Input Row -->
    <div class="picker-body">
      <div class="swatch-grid">
        <button
          v-for="swatch in swatches"
          :key="swatch"
          class="swatch-btn"
          :class="{ selected: currentColor.toUpperCase() === swatch.toUpperCase() }"
          :style="{ backgroundColor: swatch }"
          @click="selectSwatch(swatch)"
        ></button>
      </div>

      <div class="custom-input-row">
        <!-- Native Color Input Box -->
        <div class="color-preview-box" :style="{ backgroundColor: currentColor }">
          <input
            type="color"
            :value="currentColor"
            class="native-color-input"
            @input="handleInput"
          />
        </div>

        <!-- HEX Input Field -->
        <input
          type="text"
          :value="currentColor"
          class="hex-input-field font-mono"
          placeholder="#HEX"
          @input="handleInput"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.crml-color-picker {
  background: var(--crml-bg-surface, #ffffff);
  border: 3px solid var(--crt-obsidian, #0d0d0d);
  border-radius: var(--crml-radius-lg, 12px);
  padding: 12px;
  box-shadow: 4px 4px 0px var(--crt-obsidian, #0d0d0d);
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 320px;
  box-sizing: border-box;
}

.picker-header {
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

.color-hex-tag {
  border: 1.5px solid var(--crt-obsidian, #0d0d0d);
  padding: 1px 6px;
  border-radius: 4px;
  font-weight: 900;
  font-size: 10px;
  color: #000;
  box-shadow: 1.5px 1.5px 0px var(--crt-obsidian, #0d0d0d);
}

.picker-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.swatch-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.swatch-btn {
  height: 32px;
  border: 2.5px solid var(--crt-obsidian, #0d0d0d);
  border-radius: 6px;
  cursor: pointer;
  box-shadow: 2px 2px 0px var(--crt-obsidian, #0d0d0d);
  transition: transform 0.05s ease;
}

.swatch-btn:hover {
  transform: translate(-1px, -1px);
  box-shadow: 3px 3px 0px var(--crt-obsidian, #0d0d0d);
}

.swatch-btn.selected {
  outline: 2px solid var(--crt-obsidian, #0d0d0d);
  outline-offset: 2px;
  transform: scale(1.05);
}

.custom-input-row {
  display: flex;
  gap: 8px;
  align-items: center;
}

.color-preview-box {
  position: relative;
  width: 36px;
  height: 36px;
  border: 2.5px solid var(--crt-obsidian, #0d0d0d);
  border-radius: 6px;
  box-shadow: 2px 2px 0px var(--crt-obsidian, #0d0d0d);
  overflow: hidden;
}

.native-color-input {
  position: absolute;
  inset: -10px;
  width: 200%;
  height: 200%;
  opacity: 0;
  cursor: pointer;
}

.hex-input-field {
  flex: 1;
  height: 36px;
  background: var(--crml-bg-elevated, #f4f4f5);
  border: 2.5px solid var(--crt-obsidian, #0d0d0d);
  border-radius: 6px;
  padding: 0 10px;
  font-weight: 900;
  font-size: 12px;
  color: var(--crml-text-main, #0d0d0d);
  outline: none;
  box-shadow: 2px 2px 0px var(--crt-obsidian, #0d0d0d);
}

.hex-input-field:focus {
  background: #ffffff;
  border-color: var(--crt-cyber-cyan, #00f0ff);
}
</style>
