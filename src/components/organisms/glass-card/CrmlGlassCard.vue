<template>
  <div class="crml-glass-card">
    <div class="glass-sparkle glass-sparkle--top">✨</div>
    <div class="glass-sparkle glass-sparkle--bottom">✨</div>

    <div v-if="$slots.header || title" class="crml-glass-card__header">
      <h3 v-if="title" class="glass-title">{{ title }}</h3>
      <p v-if="subtitle" class="glass-subtitle">{{ subtitle }}</p>
    </div>

    <div class="crml-glass-card__body">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
export interface CrmlGlassCardProps {
  title?: string;
  subtitle?: string;
}

defineProps<CrmlGlassCardProps>();
</script>

<style scoped>
.crml-glass-card {
  position: relative;
  background: rgba(255, 255, 255, 0.45);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 2px solid transparent;
  border-image: var(--grad-cyber-pop) 1;
  border-radius: var(--crml-radius-xl);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.4);
  padding: 1.5rem;
  overflow: hidden;
  color: var(--crml-text-main);
  font-family: var(--crml-font-body);
}

[data-theme="dark"] .crml-glass-card {
  background: rgba(13, 13, 13, 0.65);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4), inset 0 0 0 1px rgba(255, 255, 255, 0.1);
}

.glass-sparkle {
  position: absolute;
  font-size: 1.25rem;
  pointer-events: none;
  opacity: 0.85;
}
.glass-sparkle--top { top: 0.75rem; right: 0.75rem; }
.glass-sparkle--bottom { bottom: 0.75rem; left: 0.75rem; }

.crml-glass-card__header {
  margin-bottom: 1rem;
}

.glass-title {
  font-family: var(--crml-font-heading);
  font-size: 1.15rem;
  font-weight: 800;
  background: var(--grad-y2k-sunset);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.glass-subtitle {
  font-size: 0.8125rem;
  opacity: 0.8;
  margin-top: 0.2rem;
}
</style>
