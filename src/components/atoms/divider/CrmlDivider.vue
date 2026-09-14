<template>
  <div :class="['crml-divider', `crml-divider--${variant}`, `crml-divider--align-${align}`]">
    <div class="crml-divider__line"></div>
    <div v-if="$slots.default || text" class="crml-divider__content">
      <slot>
        <span class="divider-text">{{ text }}</span>
      </slot>
    </div>
    <div class="crml-divider__line"></div>
  </div>
</template>

<script setup lang="ts">
export interface CrmlDividerProps {
  text?: string;
  align?: 'left' | 'center' | 'right';
  variant?: 'solid' | 'dashed' | 'gradient';
}

withDefaults(defineProps<CrmlDividerProps>(), {
  align: 'center',
  variant: 'solid',
});
</script>

<style scoped>
.crml-divider {
  display: flex;
  align-items: center;
  width: 100%;
  margin: 1.5rem 0;
}

.crml-divider__line {
  flex-grow: 1;
  height: 3px;
  background-color: var(--crt-obsidian);
}

.crml-divider--dashed .crml-divider__line {
  background: none;
  border-top: 3px dashed var(--crt-obsidian);
}

.crml-divider--gradient .crml-divider__line {
  height: 4px;
  background: var(--grad-lime-acid);
  border-radius: var(--crml-radius-full);
}

.crml-divider__content {
  padding: 0 1rem;
  font-family: var(--crml-font-heading);
  font-weight: 800;
  font-size: 0.8125rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--crml-text-main);
  white-space: nowrap;
}

.crml-divider--align-left .crml-divider__line:first-child { flex-grow: 0; width: 2rem; }
.crml-divider--align-right .crml-divider__line:last-child { flex-grow: 0; width: 2rem; }
</style>
