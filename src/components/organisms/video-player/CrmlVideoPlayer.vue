<script setup lang="ts">
import { ref } from 'vue'

export interface CrmlVideoPlayerProps {
  title?: string
  recText?: string
  timestamp?: string
}

withDefaults(defineProps<CrmlVideoPlayerProps>(), {
  title: 'SYNTH_CASSETTE_TAPE_01.MP4',
  recText: 'REC ●',
  timestamp: '00:14:28'
})

const isPlaying = ref(true)

const togglePlay = () => {
  isPlaying.value = !isPlaying.value
}
</script>

<template>
  <div class="crml-video-player-box">
    <div class="video-top-bar font-mono">
      <span class="rec-dot font-mono font-bold">{{ recText }}</span>
      <span class="video-title">{{ title }}</span>
      <span class="time-stamp">{{ timestamp }}</span>
    </div>

    <div class="video-screen-crt">
      <div class="crt-scanline-overlay"></div>
      <div class="screen-content">
        <span class="center-art-icon">📼</span>
        <h4 class="crt-screen-title font-heading">LOFI SYNTHWAVE BROADCAST</h4>
      </div>
    </div>

    <div class="video-controls-bar font-mono">
      <button type="button" class="ctrl-btn" @click="togglePlay">
        {{ isPlaying ? '⏸ PAUSE' : '▶ PLAY' }}
      </button>
      <div class="peak-meters-row">
        <div class="meter-bar" style="height: 60%;"></div>
        <div class="meter-bar" style="height: 90%;"></div>
        <div class="meter-bar" style="height: 40%;"></div>
        <div class="meter-bar" style="height: 75%;"></div>
      </div>
      <span class="crt-badge">CRT 60Hz</span>
    </div>
  </div>
</template>

<style scoped>
.crml-video-player-box {
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 3px solid var(--crml-border-ink, #0D0D0D);
  border-radius: var(--crml-radius-lg, 12px);
  background-color: var(--crt-obsidian, #0d0d0d);
  box-shadow: 4px 4px 0px var(--crml-shadow-ink, #0D0D0D);
  overflow: hidden;
}

.video-top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.4rem 0.85rem;
  background-color: #1a1a1a;
  border-bottom: 2px solid rgba(255, 255, 255, 0.15);
  color: #ffffff;
  font-size: 0.725rem;
}

.rec-dot {
  color: var(--crt-hot-pink, #ff007f);
  animation: blink 1s infinite;
}

@keyframes blink {
  50% { opacity: 0.3; }
}

.video-screen-crt {
  position: relative;
  height: 140px;
  background: linear-gradient(135deg, #0f0c20 0%, #2b1055 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.crt-scanline-overlay {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0.2) 1px,
    transparent 1px,
    transparent 2px
  );
  pointer-events: none;
}

.screen-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  z-index: 2;
  color: var(--crml-action-primary, #1B6FFF);
}

.center-art-icon {
  font-size: 2.5rem;
}

.crt-screen-title {
  font-size: 0.95rem;
  font-weight: 900;
  letter-spacing: 0.05em;
  margin: 0;
  text-shadow: 0 0 8px var(--crml-action-primary, #1B6FFF);
}

.video-controls-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0.85rem;
  background-color: #111111;
  color: #ffffff;
  font-size: 0.75rem;
}

.ctrl-btn {
  background-color: var(--crml-action-primary, #1B6FFF);
  color: var(--crt-obsidian, #0d0d0d);
  border: 1.5px solid #000;
  border-radius: 4px;
  font-weight: 900;
  padding: 0.2rem 0.6rem;
  cursor: pointer;
  box-shadow: 2px 2px 0px #000;
}

.peak-meters-row {
  display: flex;
  align-items: flex-end;
  gap: 3px;
  height: 18px;
}

.meter-bar {
  width: 4px;
  background-color: var(--crt-hot-pink, #ff007f);
  border-radius: 1px;
}

.crt-badge {
  font-size: 0.65rem;
  font-weight: 800;
  opacity: 0.7;
}
</style>
