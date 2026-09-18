<script setup lang="ts">
import { computed } from 'vue'

export interface CrmlFilterDrawerProps {
  open?: boolean
  modelValue?: boolean
  title?: string
}

const props = withDefaults(defineProps<CrmlFilterDrawerProps>(), {
  open: false,
  modelValue: false,
  title: 'FILTER PARAMETERS'
})

const emit = defineEmits<{
  (e: 'update:open', val: boolean): void
  (e: 'update:modelValue', val: boolean): void
  (e: 'apply'): void
  (e: 'reset'): void
}>()

const isOpen = computed(() => props.open || props.modelValue)

const closeDrawer = () => {
  emit('update:open', false)
  emit('update:modelValue', false)
}
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen" class="crml-drawer-backdrop" @click.self="closeDrawer">
      <div class="crml-drawer-panel">
        <div class="drawer-header-bar font-heading">
          <h3>{{ title }}</h3>
          <button type="button" class="drawer-close-btn font-mono" @click="closeDrawer">✕</button>
        </div>

        <div class="drawer-body">
          <slot>
            <div class="filter-section">
              <h4 class="section-title font-mono">// CATEGORIES</h4>
              <div class="tags-group">
                <span class="tag-chip is-active font-mono">⚡ ALL TOKENS</span>
                <span class="tag-chip font-mono">📦 CONTAINERS</span>
                <span class="tag-chip font-mono">🔥 STREETWEAR</span>
              </div>
            </div>
          </slot>
        </div>

        <div class="drawer-footer-actions font-heading">
          <button type="button" class="action-btn apply-btn" @click="emit('apply')">APPLY FILTERS 🚀</button>
          <button type="button" class="action-btn reset-btn" @click="emit('reset')">RESET</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.crml-drawer-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9990;
  background-color: rgba(13, 13, 13, 0.5);
  display: flex;
  justify-content: flex-end;
}

.crml-drawer-panel {
  width: 100%;
  max-width: 380px;
  height: 100%;
  background-color: var(--crml-bg-surface, #ffffff);
  border-left: 3px solid var(--crml-border-ink, #0D0D0D);
  box-shadow: -6px 0px 0px var(--crt-obsidian, #0d0d0d);
  display: flex;
  flex-direction: column;
}

.drawer-header-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.15rem 1.25rem;
  background-color: var(--crt-electric-lime, var(--crml-action-primary));
  border-bottom: 2.5px solid var(--crml-border-ink, #0D0D0D);
}

.drawer-header-bar h3 {
  font-size: 1.1rem;
  font-weight: 900;
  margin: 0;
}

.drawer-close-btn {
  background: var(--crml-bg-surface, #ffffff);
  border: 1.5px solid var(--crml-border-ink, #0D0D0D);
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 900;
  padding: 0.2rem 0.5rem;
  cursor: pointer;
  box-shadow: 2px 2px 0px var(--crml-shadow-ink, #0D0D0D);
}

.drawer-body {
  flex: 1;
  padding: 1.25rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.filter-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.section-title {
  font-size: 0.75rem;
  font-weight: 800;
  color: var(--crml-text-muted, #757575);
  margin: 0;
}

.tags-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.tag-chip {
  padding: 0.35rem 0.65rem;
  border: 1.5px solid var(--crml-border-ink, #0D0D0D);
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 800;
  background-color: var(--crml-bg-surface, #ffffff);
  box-shadow: 2px 2px 0px var(--crml-shadow-ink, #0D0D0D);
  cursor: pointer;
}

.tag-chip.is-active {
  background-color: var(--crt-hot-pink, #ff007f);
  color: #ffffff;
}

.drawer-footer-actions {
  padding: 1rem 1.25rem;
  border-top: 2.5px solid var(--crml-border-ink, #0D0D0D);
  background-color: var(--crml-bg-elevated, #f0f0f0);
  display: flex;
  gap: 0.75rem;
}

.action-btn {
  font-family: var(--crml-font-heading);
  font-weight: 900;
  font-size: 0.85rem;
  padding: 0.6rem 1rem;
  border: 2px solid var(--crml-border-ink, #0D0D0D);
  border-radius: var(--crml-radius-md, 8px);
  cursor: pointer;
  box-shadow: 2px 2px 0px var(--crml-shadow-ink, #0D0D0D);
}

.apply-btn {
  flex: 1;
  background-color: var(--crt-electric-lime, var(--crml-action-primary));
  color: var(--crt-obsidian, #0d0d0d);
}

.reset-btn {
  background-color: var(--crml-bg-surface, #ffffff);
  color: var(--crt-obsidian, #0d0d0d);
}
</style>
