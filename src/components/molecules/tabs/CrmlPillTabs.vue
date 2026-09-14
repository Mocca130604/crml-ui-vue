<template>
  <div :class="[
    'crml-pill-tabs',
    `crml-pill-tabs--${variant}`,
    `crml-pill-tabs--${size}`,
    { 'crml-pill-tabs--full-width': fullWidth }
  ]">
    <button
      v-for="tab in items"
      :key="tab.id"
      :class="['crml-pill-tab-item', { 'crml-pill-tab-item--active': modelValue === tab.id, 'crml-pill-tab-item--disabled': tab.disabled }]"
      :disabled="tab.disabled"
      @click="selectTab(tab.id)"
    >
      <slot :name="`tab-${tab.id}`" :tab="tab" :active="modelValue === tab.id">
        <span v-if="tab.icon" class="tab-icon">{{ tab.icon }}</span>
        <span class="tab-label">{{ tab.label }}</span>
        <span v-if="tab.badge !== undefined" class="tab-badge">{{ tab.badge }}</span>
      </slot>
    </button>
  </div>
</template>

<script setup lang="ts">
export interface TabItem {
  id: string;
  label: string;
  icon?: string;
  badge?: string | number;
  disabled?: boolean;
}

export interface CrmlPillTabsProps {
  items: TabItem[];
  modelValue: string;
  /** Color variant */
  variant?: 'lime' | 'pink' | 'cyan' | 'yellow' | 'obsidian';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Full width mode */
  fullWidth?: boolean;
}

withDefaults(defineProps<CrmlPillTabsProps>(), {
  variant: 'lime',
  size: 'md',
  fullWidth: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', id: string): void;
  (e: 'change', id: string): void;
}>();

const selectTab = (id: string) => {
  emit('update:modelValue', id);
  emit('change', id);
};
</script>

<style scoped>
.crml-pill-tabs {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem;
  background-color: var(--crml-bg-surface);
  border: var(--crml-border-brutal);
  border-radius: var(--crml-radius-full);
  box-shadow: var(--crml-shadow-brutal);
  user-select: none;
}

.crml-pill-tabs--full-width {
  display: flex;
  width: 100%;
}

.crml-pill-tabs--full-width .crml-pill-tab-item {
  flex: 1;
  justify-content: center;
}

.crml-pill-tab-item {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  border-radius: var(--crml-radius-full);
  border: 2px solid transparent;
  background: transparent;
  font-family: var(--crml-font-heading);
  font-weight: 700;
  color: var(--crml-text-main);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  outline: none;
}

/* Sizes */
.crml-pill-tabs--sm .crml-pill-tab-item { padding: 0.3rem 0.75rem; font-size: 0.75rem; }
.crml-pill-tabs--md .crml-pill-tab-item { padding: 0.45rem 1.1rem; font-size: 0.875rem; }
.crml-pill-tabs--lg .crml-pill-tab-item { padding: 0.6rem 1.35rem; font-size: 1rem; }

.crml-pill-tab-item--disabled { opacity: 0.4; cursor: not-allowed; }

.crml-pill-tab-item:hover:not(.crml-pill-tab-item--active):not(.crml-pill-tab-item--disabled) {
  background-color: var(--crml-bg-elevated);
}

.crml-pill-tab-item--active {
  border-color: var(--crt-obsidian);
  box-shadow: 2px 2px 0px var(--crt-obsidian);
  transform: translateY(-1px);
}

.crml-pill-tabs--lime .crml-pill-tab-item--active { background-color: var(--crt-electric-lime); color: var(--crt-obsidian); }
.crml-pill-tabs--pink .crml-pill-tab-item--active { background-color: var(--crt-hot-pink); color: var(--crt-pure-white); }
.crml-pill-tabs--cyan .crml-pill-tab-item--active { background-color: var(--crt-cyber-cyan); color: var(--crt-obsidian); }
.crml-pill-tabs--yellow .crml-pill-tab-item--active { background-color: var(--crt-sunburst-yellow); color: var(--crt-obsidian); }
.crml-pill-tabs--obsidian .crml-pill-tab-item--active { background-color: var(--crt-obsidian); color: var(--crt-electric-lime); border-color: var(--crt-electric-lime); box-shadow: 2px 2px 0px var(--crt-electric-lime); }

.tab-badge {
  font-size: 0.75rem;
  padding: 0.1rem 0.4rem;
  background-color: var(--crt-obsidian);
  color: var(--crt-pure-white);
  border-radius: var(--crml-radius-full);
}

.crml-pill-tab-item--active .tab-badge {
  background-color: var(--crt-pure-white);
  color: var(--crt-obsidian);
}
</style>
