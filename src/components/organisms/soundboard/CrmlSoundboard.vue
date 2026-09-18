<script setup lang="ts">
import { ref, watch, computed } from 'vue'

export interface SoundPad {
  id: number | string
  label: string
  key?: string
  color?: string
  variant?: 'lime' | 'pink' | 'cyan' | 'yellow' | 'obsidian'
  sound?: string
  icon?: string
}

const props = withDefaults(
  defineProps<{
    title?: string
    bpm?: number
    pads?: SoundPad[]
    modelValue?: boolean
    columns?: number
    variant?: 'lime' | 'pink' | 'cyan' | 'yellow'
    playLabel?: string
    pauseLabel?: string
  }>(),
  {
    title: 'CRML-808 SOUNDBOARD',
    bpm: 128,
    modelValue: false,
    columns: 4,
    variant: 'lime',
    playLabel: '▶ PLAY',
    pauseLabel: '⏸ PAUSE',
    pads: () => [
      { id: 1, label: 'KICK 01', key: 'Q', color: '#FF007F' },
      { id: 2, label: 'SNARE 01', key: 'W', color: '#FF007F' },
      { id: 3, label: 'HI-HAT', key: 'E', color: '#FF007F' },
      { id: 4, label: 'OPEN-HAT', key: 'R', color: '#FF007F' },

      { id: 5, label: 'CLAP', key: 'A', color: '#FFD600' },
      { id: 6, label: 'PERC 01', key: 'S', color: '#FFD600' },
      { id: 7, label: 'COWBELL', key: 'D', color: '#FFD600' },
      { id: 8, label: 'CRASH', key: 'F', color: '#FFD600' },

      { id: 9, label: 'BASS 808', key: 'Z', color: '#00F0FF' },
      { id: 10, label: 'SYNTH 01', key: 'X', color: '#00F0FF' },
      { id: 11, label: 'VOX SHOUT', key: 'C', color: '#00F0FF' },
      { id: 12, label: 'LASER', key: 'V', color: '#00F0FF' },

      { id: 13, label: 'CHORD A', key: '1', color: 'var(--crml-action-primary)' },
      { id: 14, label: 'CHORD B', key: '2', color: 'var(--crml-action-primary)' },
      { id: 15, label: 'FX RUN', key: '3', color: 'var(--crml-action-primary)' },
      { id: 16, label: 'AIRHORN', key: '4', color: 'var(--crml-action-primary)' }
    ]
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', playing: boolean): void
  (e: 'update:bpm', bpm: number): void
  (e: 'pad-trigger', pad: SoundPad): void
  (e: 'play-toggle', isPlaying: boolean): void
}>()

const activePad = ref<number | string | null>(null)
const isPlaying = ref(props.modelValue)
const currentBpm = ref(props.bpm)

watch(() => props.modelValue, (v) => {
  isPlaying.value = v
})

watch(() => props.bpm, (v) => {
  currentBpm.value = v
})

watch(currentBpm, (v) => {
  emit('update:bpm', v)
})

function triggerPad(pad: SoundPad) {
  activePad.value = pad.id
  emit('pad-trigger', pad)
  setTimeout(() => {
    if (activePad.value === pad.id) {
      activePad.value = null
    }
  }, 150)
}

function togglePlay() {
  isPlaying.value = !isPlaying.value
  emit('update:modelValue', isPlaying.value)
  emit('play-toggle', isPlaying.value)
}

const gridStyle = computed(() => ({
  gridTemplateColumns: `repeat(${props.columns}, minmax(0, 1fr))`
}))
</script>

<template>
  <div :class="['crml-soundboard font-mono', `crml-soundboard--${variant}`]">
    <!-- Top LCD Control Display -->
    <div class="soundboard-lcd">
      <div class="lcd-left">
        <slot name="title" :title="title">
          <span class="lcd-title font-heading">{{ title }}</span>
        </slot>
        <slot name="status" :is-playing="isPlaying">
          <div class="status-indicator">
            <span class="status-dot" :class="{ 'is-playing': isPlaying }"></span>
            <span class="status-text">{{ isPlaying ? 'PLAYING' : 'READY' }}</span>
          </div>
        </slot>
      </div>

      <div class="lcd-right">
        <slot name="controls" :bpm="currentBpm" :is-playing="isPlaying" :toggle-play="togglePlay">
          <div class="bpm-control">
            <span class="bpm-label">BPM</span>
            <input
              type="number"
              v-model.number="currentBpm"
              class="bpm-input font-mono"
              min="40"
              max="240"
            />
          </div>
          <button
            type="button"
            class="play-btn font-heading"
            :class="{ active: isPlaying }"
            @click="togglePlay"
          >
            {{ isPlaying ? pauseLabel : playLabel }}
          </button>
        </slot>
      </div>
    </div>

    <!-- MPC Matrix Grid -->
    <div class="pads-grid" :style="gridStyle">
      <button
        v-for="pad in pads"
        :key="pad.id"
        type="button"
        :class="[
          'sound-pad',
          pad.variant ? `sound-pad--${pad.variant}` : '',
          { active: activePad === pad.id }
        ]"
        :style="pad.color ? { '--pad-accent': pad.color } : undefined"
        @click="triggerPad(pad)"
      >
        <slot name="pad" :pad="pad" :is-active="activePad === pad.id">
          <span v-if="pad.key" class="pad-key">{{ pad.key }}</span>
          <span v-if="pad.icon" class="pad-icon">{{ pad.icon }}</span>
          <span class="pad-label">{{ pad.label }}</span>
        </slot>
      </button>
    </div>

    <slot name="footer" />
  </div>
</template>

<style scoped>
.crml-soundboard {
  background-color: var(--crml-bg-surface, #ffffff);
  border: 3px solid var(--crml-border-ink, #0D0D0D);
  border-radius: var(--crml-radius-lg, 14px);
  padding: 16px;
  box-shadow: 4px 4px 0px var(--crml-shadow-ink, #0D0D0D);
  width: 100%;
  box-sizing: border-box;
}

.soundboard-lcd {
  background-color: var(--crt-obsidian, #0d0d0d);
  color: var(--crt-electric-lime, var(--crml-action-primary));
  border: 2px solid var(--crml-border-ink, #0D0D0D);
  border-radius: 8px;
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 12px;
}

.lcd-left {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.lcd-title {
  font-size: 0.95rem;
  font-weight: 900;
  letter-spacing: 0.05em;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  font-weight: 700;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--crml-text-muted);
}

.status-dot.is-playing {
  background-color: var(--crt-electric-lime, var(--crml-action-primary));
  box-shadow: 0 0 8px var(--crt-electric-lime, var(--crml-action-primary));
}

.lcd-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.bpm-control {
  display: flex;
  align-items: center;
  gap: 6px;
}

.bpm-label {
  font-size: 0.75rem;
  font-weight: 800;
  color: var(--crml-text-muted);
}

.bpm-input {
  width: 54px;
  background-color: var(--crml-bg-input, #1a1a1a);
  border: 1.5px solid var(--crml-border-subtle, #444);
  color: var(--crt-electric-lime, var(--crml-action-primary));
  border-radius: 4px;
  padding: 4px 6px;
  font-weight: 900;
  font-size: 0.85rem;
  text-align: center;
}

.play-btn {
  background-color: var(--crt-electric-lime, var(--crml-action-primary));
  color: var(--crt-obsidian, #0d0d0d);
  border: 2px solid var(--crml-border-ink, #0D0D0D);
  border-radius: 6px;
  font-weight: 900;
  font-size: 0.8rem;
  padding: 6px 12px;
  cursor: pointer;
  transition: all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 2px 2px 0px #000;
}

.play-btn:hover {
  transform: translate(-1px, -1px);
  box-shadow: 3px 3px 0px #000;
}

.play-btn.active {
  background-color: var(--crt-hot-pink, #ff007f);
  color: #fff;
}

.pads-grid {
  display: grid;
  gap: 10px;
}

.sound-pad {
  aspect-ratio: 1;
  background-color: var(--crml-bg-surface, #ffffff);
  border: 2.5px solid var(--crml-border-ink, #0D0D0D);
  border-radius: 10px;
  box-shadow: 3.5px 3.5px 0px var(--crml-shadow-ink, #0D0D0D);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 8px;
  cursor: pointer;
  position: relative;
  transition: all 0.1s cubic-bezier(0.34, 1.56, 0.64, 1);
  overflow: hidden;
}

.sound-pad::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background-color: var(--pad-accent, var(--crt-electric-lime, var(--crml-action-primary)));
}

.sound-pad:hover {
  transform: translate(-1.5px, -1.5px);
  box-shadow: 5px 5px 0px var(--crml-shadow-ink, #0D0D0D);
}

.sound-pad:active,
.sound-pad.active {
  transform: translate(2px, 2px);
  box-shadow: 1px 1px 0px var(--crml-shadow-ink, #0D0D0D);
  background-color: var(--pad-accent, var(--crt-electric-lime, var(--crml-action-primary)));
  color: var(--crt-obsidian, #0d0d0d);
}

.pad-key {
  font-size: 0.7rem;
  font-weight: 900;
  background-color: var(--crt-obsidian, #0d0d0d);
  color: #fff;
  padding: 1px 5px;
  border-radius: 3px;
  line-height: 1.2;
}

.pad-label {
  font-size: 0.72rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  text-align: left;
  line-height: 1.1;
  word-break: break-word;
}
</style>
