<template>
  <div :class="['crml-pixel-icon-wrapper', `crml-pixel-icon-wrapper--${size}`, { 'crml-pixel-icon-wrapper--glitch': glitch }]">
    <div class="crml-pixel-icon__box">
      <slot>
        <span class="default-pixel-emoji">{{ icon }}</span>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface CrmlPixelIconWrapperProps {
  icon?: string;
  size?: 'sm' | 'md' | 'lg';
  glitch?: boolean;
}

withDefaults(defineProps<CrmlPixelIconWrapperProps>(), {
  icon: '👾',
  size: 'md',
  glitch: false,
});
</script>

<style scoped>
.crml-pixel-icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.crml-pixel-icon__box {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--crt-obsidian);
  color: var(--crml-action-primary);
  border: 2px solid var(--crml-action-primary);
  border-radius: var(--crml-radius-sm);
  box-shadow: 3px 3px 0px var(--crt-hot-pink);
}

.crml-pixel-icon-wrapper--sm .crml-pixel-icon__box { width: 2.25rem; height: 2.25rem; font-size: 1.1rem; }
.crml-pixel-icon-wrapper--md .crml-pixel-icon__box { width: 3rem; height: 3rem; font-size: 1.5rem; }
.crml-pixel-icon-wrapper--lg .crml-pixel-icon__box { width: 4rem; height: 4rem; font-size: 2rem; }

.crml-pixel-icon-wrapper:hover {
  transform: translateY(-4px) scale(1.1);
}

.crml-pixel-icon-wrapper--glitch .crml-pixel-icon__box {
  animation: glitchShake 2s infinite;
}

@keyframes glitchShake {
  0%, 90%, 100% { transform: translate(0, 0); }
  92% { transform: translate(-2px, 2px); }
  94% { transform: translate(2px, -1px); }
  96% { transform: translate(-1px, -2px); }
}
</style>
