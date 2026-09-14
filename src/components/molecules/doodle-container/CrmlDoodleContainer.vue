<template>
  <div class="crml-doodle-container">
    <svg class="doodle-border-svg" viewBox="0 0 400 200" preserveAspectRatio="none">
      <path
        d="M 12 12 Q 200 4 388 12 Q 396 100 388 188 Q 200 196 12 188 Q 4 100 12 12"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-dasharray="8 4 2 4"
      />
    </svg>
    <div class="crml-doodle-body">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.crml-doodle-container {
  position: relative;
  padding: 1.25rem;
  background-color: var(--crml-bg-surface);
  border-radius: var(--crml-radius-lg);
  color: var(--crml-text-main);
  font-family: var(--crml-font-body);
}

.doodle-border-svg {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  pointer-events: none;
  color: var(--crt-obsidian);
}

.crml-doodle-body {
  position: relative;
  z-index: 1;
}
</style>
