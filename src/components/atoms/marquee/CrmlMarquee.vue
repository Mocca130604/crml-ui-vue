<template>
  <div
    :class="[
      'crml-marquee',
      `crml-marquee--${variant}`,
      { 'crml-marquee--pause-hover': pauseOnHover }
    ]"
  >
    <div
      class="crml-marquee__track"
      :style="{ animationDuration: `${speed}s`, animationDirection: direction === 'right' ? 'reverse' : 'normal' }"
    >
      <div v-for="i in repeat" :key="i" class="crml-marquee__content">
        <slot>
          <span class="default-marquee-text">{{ text }}</span>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface CrmlMarqueeProps {
  text?: string;
  speed?: number;
  pauseOnHover?: boolean;
  direction?: 'left' | 'right';
  repeat?: number;
  variant?: 'blue' | 'primary' | 'lime' | 'pink' | 'cyan' | 'yellow' | 'obsidian' | 'grad-y2k' | 'grad-acid';
}

withDefaults(defineProps<CrmlMarqueeProps>(), {
  text: '⚡ CRML DESIGN SYSTEM • NEW RELEASES • HIGH VOLTAGE Y2K AESTHETICS • ⚡',
  speed: 15,
  pauseOnHover: true,
  direction: 'left',
  repeat: 4,
  variant: 'lime',
});
</script>

<style scoped>
.crml-marquee {
  width: 100%;
  overflow: hidden;
  border-top: var(--crml-border-brutal);
  border-bottom: var(--crml-border-brutal);
  padding: 0.65rem 0;
  user-select: none;
  font-family: var(--crml-font-heading);
  font-weight: 800;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.crml-marquee__track {
  display: flex;
  width: max-content;
  animation: marquee-slide linear infinite;
}

.crml-marquee--pause-hover:hover .crml-marquee__track { animation-play-state: paused; }

.crml-marquee__content {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding-right: 2rem;
  white-space: nowrap;
}

.crml-marquee--primary, .crml-marquee--blue { background-color: var(--crt-ryo-blue-500, #1B6FFF); color: #FFFFFF; }
.crml-marquee--lime { background-color: var(--crt-electric-lime); color: var(--crt-obsidian); }
.crml-marquee--pink { background-color: var(--crt-hot-pink); color: var(--crt-pure-white); }
.crml-marquee--cyan { background-color: var(--crt-cyber-cyan); color: var(--crt-obsidian); }
.crml-marquee--yellow { background-color: var(--crt-sunburst-yellow); color: var(--crt-obsidian); }
.crml-marquee--obsidian { background-color: var(--crt-obsidian); color: var(--crml-action-primary); }
.crml-marquee--grad-y2k { background: var(--grad-y2k-sunset); color: var(--crt-pure-white); }
.crml-marquee--grad-acid { background: var(--grad-lime-acid); color: var(--crt-obsidian); }

@keyframes marquee-slide {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
</style>
