<template>
  <div
    :class="['crml-status-matrix-grid font-mono', `crml-status-matrix--${size}`]"
    :style="gridStyle"
  >
    <div
      v-for="(item, idx) in items"
      :key="item.id || idx"
      :class="[
        'status-chip-tile',
        `status-${item.status}`,
        `status-tile--${size}`,
        { 'is-clickable': clickable }
      ]"
      @click="clickable ? emit('click-item', item, idx) : undefined"
    >
      <slot name="item" :item="item" :index="idx">
        <slot name="icon" :item="item" :index="idx">
          <span class="status-dot-icon">{{ item.icon || defaultStatusIcon(item.status) }}</span>
        </slot>
        <div class="status-chip-text">
          <slot name="label" :item="item" :index="idx">
            <span class="status-chip-label">{{ item.label }}</span>
          </slot>
          <slot name="value" :item="item" :index="idx">
            <span v-if="item.value !== undefined" class="status-chip-value">{{ item.value }}</span>
          </slot>
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export type StatusType = 'active' | 'warning' | 'error' | 'idle' | 'lime' | 'pink' | 'cyan' | 'yellow' | 'obsidian'

export interface StatusBadgeItem {
  id?: string
  label: string
  status: StatusType
  value?: string | number
  icon?: string
}

const props = withDefaults(
  defineProps<{
    items?: StatusBadgeItem[]
    size?: 'sm' | 'md' | 'lg'
    columns?: number | string
    clickable?: boolean
  }>(),
  {
    size: 'md',
    columns: undefined,
    clickable: false,
    items: () => [
      { id: '1', label: 'LIVE_MODE', status: 'active', value: 'ONLINE', icon: '●' },
      { id: '2', label: 'SYNC_IDLE', status: 'idle', value: '24ms', icon: '⚡' },
      { id: '3', label: 'OVERLOAD', status: 'warning', value: '78%', icon: '⚠️' },
      { id: '4', label: 'SYSTEM_OK', status: 'active', value: '99.9%', icon: '✓' },
      { id: '5', label: 'BLUR_BLOCK', status: 'error', value: '0 BLUR', icon: '✕' },
      { id: '6', label: 'BEAM_READY', status: 'active', value: 'READY', icon: '🚀' }
    ]
  }
)

const emit = defineEmits<{
  (e: 'click-item', item: StatusBadgeItem, index: number): void
}>()

const gridStyle = computed(() => {
  if (typeof props.columns === 'number') {
    return { gridTemplateColumns: `repeat(${props.columns}, minmax(0, 1fr))` }
  }
  if (typeof props.columns === 'string' && props.columns !== 'auto') {
    return { gridTemplateColumns: props.columns }
  }
  return undefined
})

const defaultStatusIcon = (status: StatusType) => {
  if (status === 'error' || status === 'pink') return '✕'
  if (status === 'warning' || status === 'yellow') return '⚠️'
  if (status === 'active' || status === 'lime') return '●'
  if (status === 'cyan') return '⚡'
  return '●'
}
</script>

<style scoped>
.crml-status-matrix-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(115px, 1fr));
  gap: 0.5rem;
  width: 100%;
}

.status-chip-tile {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background-color: var(--crml-bg-surface, #ffffff);
  border: 2px solid var(--crml-border-ink, #0D0D0D);
  border-radius: var(--crml-radius-sm, 6px);
  box-shadow: 2.5px 2.5px 0px var(--crml-shadow-ink, #0D0D0D);
  font-weight: 800;
  transition: all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.status-tile--sm {
  padding: 0.25rem 0.45rem;
  font-size: 0.65rem;
}

.status-tile--md {
  padding: 0.4rem 0.65rem;
  font-size: 0.75rem;
}

.status-tile--lg {
  padding: 0.55rem 0.9rem;
  font-size: 0.875rem;
}

.status-chip-tile.is-clickable {
  cursor: pointer;
}

.status-chip-tile.is-clickable:hover {
  transform: translate(-1px, -1px);
  box-shadow: 3.5px 3.5px 0px var(--crml-shadow-ink, #0D0D0D);
}

.status-chip-text {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.status-chip-label {
  font-weight: 900;
  letter-spacing: 0.02em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.status-chip-value {
  font-size: 0.85em;
  font-weight: 600;
  opacity: 0.85;
}

.status-dot-icon {
  font-size: 0.9em;
  flex-shrink: 0;
}

/* Status variants */
.status-active,
.status-lime {
  background-color: var(--crt-electric-lime, #ccff00);
  color: var(--crt-obsidian, #0d0d0d);
}

.status-cyan {
  background-color: var(--crt-cyber-cyan, #00f0ff);
  color: var(--crt-obsidian, #0d0d0d);
}

.status-warning,
.status-yellow {
  background-color: var(--crt-sunburst-yellow, #ffd600);
  color: var(--crt-obsidian, #0d0d0d);
}

.status-error,
.status-pink {
  background-color: var(--crt-hot-pink, #ff007f);
  color: #ffffff;
}

.status-obsidian {
  background-color: var(--crt-obsidian, #0d0d0d);
  color: var(--crt-electric-lime, #ccff00);
}

.status-idle {
  background-color: var(--crml-bg-elevated, #e0e0e0);
  color: var(--crml-text-muted, #757575);
}
</style>
