<template>
  <div :class="['crml-speech-bubble', `crml-speech-bubble--${variant}`, `crml-speech-bubble--tail-${tail}`]">
    <div class="crml-speech-bubble__content">
      <slot>{{ text }}</slot>
    </div>
    <div class="crml-speech-bubble__tail"></div>
  </div>
</template>

<script setup lang="ts">
export interface CrmlSpeechBubbleProps {
  text?: string;
  variant?: 'lime' | 'pink' | 'yellow' | 'white' | 'obsidian';
  tail?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
}

withDefaults(defineProps<CrmlSpeechBubbleProps>(), {
  text: 'WOW! THIS IS LOUD!',
  variant: 'yellow',
  tail: 'bottom-left',
});
</script>

<style scoped>
.crml-speech-bubble {
  position: relative;
  display: inline-block;
  padding: 0.6rem 1rem;
  border: var(--crml-border-brutal);
  border-radius: var(--crml-radius-md);
  box-shadow: var(--crml-shadow-brutal-sm);
  font-family: var(--crml-font-heading);
  font-weight: 800;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: var(--crt-obsidian);
  background-color: var(--crt-sunburst-yellow);
}

/* Variants */
.crml-speech-bubble--yellow { background-color: var(--crt-sunburst-yellow); color: var(--crt-obsidian); }
.crml-speech-bubble--lime { background-color: var(--crt-electric-lime); color: var(--crt-obsidian); }
.crml-speech-bubble--pink { background-color: var(--crt-hot-pink); color: var(--crt-pure-white); }
.crml-speech-bubble--white { background-color: var(--crt-pure-white); color: var(--crt-obsidian); }
.crml-speech-bubble--obsidian { background-color: var(--crt-obsidian); color: var(--crt-electric-lime); border-color: var(--crt-electric-lime); box-shadow: 2px 2px 0px var(--crt-electric-lime); }

/* Tail Pointer Styling */
.crml-speech-bubble__tail {
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
}

.crml-speech-bubble--tail-bottom-left .crml-speech-bubble__tail {
  bottom: -12px;
  left: 1rem;
  border-width: 12px 10px 0 0;
  border-color: var(--crml-border-ink, #0D0D0D) transparent transparent transparent;
}

.crml-speech-bubble--tail-bottom-right .crml-speech-bubble__tail {
  bottom: -12px;
  right: 1rem;
  border-width: 12px 0 0 10px;
  border-color: var(--crml-border-ink, #0D0D0D) transparent transparent transparent;
}
</style>
