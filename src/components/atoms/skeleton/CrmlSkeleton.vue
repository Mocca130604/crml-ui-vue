<template>
  <div
    :class="['crml-skeleton', `crml-skeleton--${type}`]"
    :style="{ width, height }"
  ></div>
</template>

<script setup lang="ts">
export interface CrmlSkeletonProps {
  type?: 'text' | 'avatar' | 'card' | 'button';
  width?: string;
  height?: string;
}

withDefaults(defineProps<CrmlSkeletonProps>(), {
  type: 'text',
});
</script>

<style scoped>
.crml-skeleton {
  background: linear-gradient(
    90deg,
    var(--crml-bg-elevated) 25%,
    var(--crt-lime-100) 50%,
    var(--crml-bg-elevated) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite linear;
  border: 2px solid var(--crt-obsidian);
  border-radius: var(--crml-radius-md);
  box-shadow: 2px 2px 0px var(--crt-obsidian);
}

.crml-skeleton--text {
  height: 1rem;
  width: 100%;
  border-radius: var(--crml-radius-sm);
}

.crml-skeleton--avatar {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
}

.crml-skeleton--card {
  width: 100%;
  height: 120px;
  border-radius: var(--crml-radius-lg);
}

.crml-skeleton--button {
  width: 100px;
  height: 2.5rem;
  border-radius: var(--crml-radius-md);
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>
