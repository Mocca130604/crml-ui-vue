<template>
  <div :class="['crml-segmented-control', `crml-segmented-control--${size}`, { 'is-disabled': disabled }]">
    <div class="segmented-track">
      <button
        v-for="opt in normalizedOptions"
        :key="opt.id"
        type="button"
        :disabled="disabled || opt.disabled"
        :class="[
          'segment-btn',
          `variant-${opt.variant || variant}`,
          `segment-btn--${size}`,
          {
            'is-selected': opt.id === modelValue,
            'is-disabled': disabled || opt.disabled
          }
        ]"
        @click="selectSegment(opt.id, opt)"
      >
        <slot name="option" :option="opt" :is-selected="opt.id === modelValue">
          <slot name="icon" :option="opt" :is-selected="opt.id === modelValue">
            <span v-if="opt.icon" class="segment-icon">{{ opt.icon }}</span>
          </slot>
          <slot name="label" :option="opt" :is-selected="opt.id === modelValue">
            <span class="segment-label">{{ opt.label }}</span>
          </slot>
          <slot name="badge" :option="opt" :is-selected="opt.id === modelValue">
            <span v-if="opt.badge !== undefined" class="segment-badge">{{ opt.badge }}</span>
          </slot>
        </slot>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface SegmentOption {
  id: string
  label: string
  icon?: string
  badge?: string | number
  disabled?: boolean
  variant?: 'lime' | 'pink' | 'cyan' | 'yellow' | 'obsidian'
}

export type SegmentOptionInput = string | SegmentOption

const props = withDefaults(
  defineProps<{
    modelValue?: string
    options?: SegmentOptionInput[]
    variant?: 'lime' | 'pink' | 'cyan' | 'yellow' | 'obsidian'
    size?: 'sm' | 'md' | 'lg'
    disabled?: boolean
  }>(),
  {
    modelValue: 'monthly',
    variant: 'lime',
    size: 'md',
    disabled: false,
    options: () => [
      { id: 'weekly', label: 'WEEKLY' },
      { id: 'monthly', label: 'MONTHLY' },
      { id: 'yearly', label: 'YEARLY' }
    ]
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', id: string): void
  (e: 'change', id: string, option: SegmentOption): void
}>()

const normalizedOptions = computed<SegmentOption[]>(() => {
  return props.options.map(opt => {
    if (typeof opt === 'string') {
      return { id: opt.toLowerCase(), label: opt }
    }
    return opt
  })
})

const selectSegment = (id: string, opt: SegmentOption) => {
  if (props.disabled || opt.disabled) return
  emit('update:modelValue', id)
  emit('change', id, opt)
}
</script>

<style scoped>
.crml-segmented-control {
  width: 100%;
  font-family: var(--crml-font-heading);
}

.segmented-track {
  display: flex;
  background-color: var(--crml-bg-elevated, #e8e8e8);
  border: var(--crml-border-brutal);
  border-radius: var(--crml-radius-md);
  padding: 0.25rem;
  gap: 0.25rem;
  box-shadow: 3px 3px 0px var(--crt-obsidian);
}

.segment-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  font-family: var(--crml-font-heading);
  font-weight: 800;
  text-transform: uppercase;
  border: 2px solid transparent;
  border-radius: var(--crml-radius-sm);
  background: none;
  color: var(--crml-text-main);
  cursor: pointer;
  transition: all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
  text-align: center;
  white-space: nowrap;
}

/* Sizes */
.segment-btn--sm {
  padding: 0.35rem 0.5rem;
  font-size: 0.7rem;
}

.segment-btn--md {
  padding: 0.5rem 0.75rem;
  font-size: 0.8rem;
}

.segment-btn--lg {
  padding: 0.7rem 1rem;
  font-size: 0.95rem;
}

.segment-btn:hover:not(.is-disabled) {
  background-color: rgba(0, 0, 0, 0.05);
}

.segment-btn.is-selected {
  border-color: var(--crt-obsidian);
  box-shadow: 2px 2px 0px var(--crt-obsidian);
}

.segment-btn.is-selected.variant-lime {
  background-color: var(--crt-electric-lime);
  color: var(--crt-obsidian);
}

.segment-btn.is-selected.variant-pink {
  background-color: var(--crt-hot-pink);
  color: var(--crt-pure-white);
}

.segment-btn.is-selected.variant-cyan {
  background-color: var(--crt-cyber-cyan);
  color: var(--crt-obsidian);
}

.segment-btn.is-selected.variant-yellow {
  background-color: var(--crt-sunburst-yellow);
  color: var(--crt-obsidian);
}

.segment-btn.is-selected.variant-obsidian {
  background-color: var(--crt-obsidian);
  color: var(--crt-electric-lime);
}

.segment-badge {
  font-size: 0.65em;
  font-family: var(--crml-font-mono, monospace);
  font-weight: 900;
  background-color: var(--crt-obsidian, #0d0d0d);
  color: var(--crt-electric-lime, #ccff00);
  padding: 0.05rem 0.3rem;
  border-radius: 3px;
}

.segment-btn.is-selected.variant-obsidian .segment-badge {
  background-color: var(--crt-electric-lime, #ccff00);
  color: var(--crt-obsidian, #0d0d0d);
}

.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
</style>
