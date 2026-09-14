<template>
  <div class="crml-tooltip-wrapper" @mouseenter="show = true" @mouseleave="show = false">
    <slot />
    <Transition name="tooltip-pop">
      <div v-if="show" :class="['crml-tooltip', `crml-tooltip--${position}`, `crml-tooltip--${variant}`]">
        {{ content }}
        <span class="crml-tooltip__arrow"></span>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

export interface CrmlTooltipProps {
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  variant?: 'obsidian' | 'lime' | 'pink' | 'cyan' | 'yellow';
}

withDefaults(defineProps<CrmlTooltipProps>(), {
  position: 'top',
  variant: 'obsidian',
});

const show = ref(false);
</script>

<style scoped>
.crml-tooltip-wrapper {
  position: relative;
  display: inline-block;
}

.crml-tooltip {
  position: absolute;
  z-index: 9999;
  padding: 0.35rem 0.75rem;
  font-family: var(--crml-font-heading);
  font-weight: 700;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
  border: 2px solid var(--crt-obsidian);
  box-shadow: 2px 2px 0px var(--crt-obsidian);
  border-radius: var(--crml-radius-sm);
  pointer-events: none;
}

/* Positions */
.crml-tooltip--top {
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 0.5rem;
}

.crml-tooltip--bottom {
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 0.5rem;
}

.crml-tooltip--left {
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-right: 0.5rem;
}

.crml-tooltip--right {
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 0.5rem;
}

/* Variants */
.crml-tooltip--obsidian { background-color: var(--crt-obsidian); color: var(--crt-electric-lime); border-color: var(--crt-electric-lime); }
.crml-tooltip--lime { background-color: var(--crt-electric-lime); color: var(--crt-obsidian); }
.crml-tooltip--pink { background-color: var(--crt-hot-pink); color: var(--crt-pure-white); }
.crml-tooltip--cyan { background-color: var(--crt-cyber-cyan); color: var(--crt-obsidian); }
.crml-tooltip--yellow { background-color: var(--crt-sunburst-yellow); color: var(--crt-obsidian); }

/* Transitions */
.tooltip-pop-enter-active,
.tooltip-pop-leave-active {
  transition: opacity 0.15s ease, transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.tooltip-pop-enter-from,
.tooltip-pop-leave-to {
  opacity: 0;
  transform: scale(0.85);
}
</style>
