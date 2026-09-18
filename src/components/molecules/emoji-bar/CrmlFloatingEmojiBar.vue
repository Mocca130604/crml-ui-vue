<template>
  <div class="crml-emoji-bar-container">
    <div class="crml-emoji-bar">
      <button
        v-for="(item, index) in reactionList"
        :key="index"
        class="crml-emoji-btn"
        @click="triggerReaction(index, $event)"
      >
        <span class="emoji-icon">{{ item.emoji }}</span>
        <span class="emoji-count">{{ item.count }}</span>
      </button>
    </div>

    <div class="particles-layer">
      <span
        v-for="particle in activeParticles"
        :key="particle.id"
        class="floating-particle"
        :style="{ left: `${particle.x}px`, top: `${particle.y}px` }"
      >
        {{ particle.emoji }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

export interface EmojiItem {
  emoji: string;
  count: number;
}

export interface CrmlFloatingEmojiBarProps {
  reactions?: EmojiItem[];
}

const props = withDefaults(defineProps<CrmlFloatingEmojiBarProps>(), {
  reactions: () => [
    { emoji: '🔥', count: 12 },
    { emoji: '⚡', count: 8 },
    { emoji: '🚀', count: 24 },
    { emoji: '💖', count: 19 },
    { emoji: '🎉', count: 5 },
  ],
});

const reactionList = ref<EmojiItem[]>([...props.reactions]);

interface Particle {
  id: number;
  emoji: string;
  x: number;
  y: number;
}

const activeParticles = ref<Particle[]>([]);
let particleIdCounter = 0;

const triggerReaction = (index: number, event: MouseEvent) => {
  reactionList.value[index].count++;

  const btn = event.currentTarget as HTMLElement;
  const rect = btn.getBoundingClientRect();

  const newParticle: Particle = {
    id: particleIdCounter++,
    emoji: reactionList.value[index].emoji,
    x: rect.left + rect.width / 2 - 12,
    y: rect.top - 10,
  };

  activeParticles.value.push(newParticle);

  setTimeout(() => {
    activeParticles.value = activeParticles.value.filter((p) => p.id !== newParticle.id);
  }, 1000);
};
</script>

<style scoped>
.crml-emoji-bar-container { display: inline-block; position: relative; }

.crml-emoji-bar {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.75rem;
  background-color: var(--crml-bg-surface);
  border: var(--crml-border-brutal);
  border-radius: var(--crml-radius-full);
  box-shadow: var(--crml-shadow-brutal);
  user-select: none;
}

.crml-emoji-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.65rem;
  background: var(--crml-bg-elevated);
  border: 2px solid var(--crml-border-ink, var(--crt-obsidian));
  border-radius: var(--crml-radius-full);
  cursor: pointer;
  font-family: var(--crml-font-heading);
  font-weight: 700;
  font-size: 0.875rem;
  color: var(--crml-text-main);
  transition: transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.2s ease, color 0.2s ease;
  outline: none;
}

.crml-emoji-btn:hover {
  transform: scale(1.15) translateY(-2px);
  background-color: var(--crml-action-primary);
  color: var(--crml-text-on-primary, #FFFFFF);
}
.crml-emoji-btn:active { transform: scale(0.95); }

.emoji-icon { font-size: 1.1rem; }
.emoji-count { font-size: 0.8rem; }

.particles-layer {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  pointer-events: none;
  z-index: 9999;
}

.floating-particle {
  position: absolute;
  font-size: 1.5rem;
  animation: floatUpFade 1s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}

@keyframes floatUpFade {
  0% { opacity: 1; transform: translateY(0) scale(0.6) rotate(0deg); }
  50% { opacity: 1; transform: translateY(-40px) scale(1.3) rotate(-15deg); }
  100% { opacity: 0; transform: translateY(-80px) scale(1.5) rotate(15deg); }
}
</style>
