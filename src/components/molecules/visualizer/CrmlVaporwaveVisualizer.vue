<template>
  <div class="crml-vaporwave-visualizer">
    <div
      v-for="bar in barHeights"
      :key="bar.id"
      class="visualizer-bar"
      :style="{ height: `${bar.height}%`, animationDelay: `${bar.delay}s` }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

export interface CrmlVaporwaveVisualizerProps {
  bars?: number;
}

const props = withDefaults(defineProps<CrmlVaporwaveVisualizerProps>(), {
  bars: 12,
});

const barHeights = ref(
  Array.from({ length: props.bars }).map((_, i) => ({
    id: i,
    height: Math.floor(Math.random() * 60) + 30,
    delay: (i * 0.15) % 1,
  }))
);
</script>

<style scoped>
.crml-vaporwave-visualizer {
  display: flex;
  align-items: flex-end;
  gap: 6px;
  height: 3rem;
  padding: 0.5rem 0.75rem;
  background-color: var(--crt-obsidian);
  border: var(--crml-border-brutal);
  border-radius: var(--crml-radius-md);
  box-shadow: 3px 3px 0px var(--crt-hot-pink);
  width: max-content;
}

.visualizer-bar {
  width: 8px;
  background: linear-gradient(180deg, var(--crt-cyber-cyan), var(--crt-hot-pink), var(--crt-electric-lime));
  border-radius: 2px;
  animation: equalizerBounce 1.2s infinite ease-in-out alternate;
}

@keyframes equalizerBounce {
  0% { height: 20%; }
  50% { height: 100%; }
  100% { height: 35%; }
}
</style>
