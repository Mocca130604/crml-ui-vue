<template>
  <div :class="['crml-radio-group', `crml-radio-group--${variant}`, `crml-radio-group--${size}`, { 'is-disabled': disabled }]">
    <slot name="label" :label="label">
      <label v-if="label" class="crml-radio-group__label font-heading">{{ label }}</label>
    </slot>

    <div :class="['crml-radio-options', `crml-radio-options--${layout}`]">
      <label
        v-for="opt in options"
        :key="opt.value"
        :class="[
          'crml-radio-tile',
          `crml-radio-tile--${variant}`,
          `crml-radio-tile--${size}`,
          {
            'crml-radio-tile--selected': modelValue === opt.value,
            'is-disabled': disabled || opt.disabled
          }
        ]"
      >
        <input
          type="radio"
          :name="name"
          :value="opt.value"
          :checked="modelValue === opt.value"
          :disabled="disabled || opt.disabled"
          class="crml-radio-input"
          @change="selectOption(opt.value, opt)"
        />
        <slot name="option" :option="opt" :is-selected="modelValue === opt.value">
          <slot name="icon" :option="opt" :is-selected="modelValue === opt.value">
            <span v-if="opt.icon" class="tile-icon">{{ opt.icon }}</span>
          </slot>
          <div class="tile-content">
            <slot name="content" :option="opt" :is-selected="modelValue === opt.value">
              <div class="tile-title-row">
                <span class="tile-label">{{ opt.label }}</span>
                <span v-if="opt.badge" class="tile-badge">{{ opt.badge }}</span>
              </div>
              <span v-if="opt.description" class="tile-desc">{{ opt.description }}</span>
            </slot>
          </div>
        </slot>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  icon?: string;
  badge?: string;
  disabled?: boolean;
}

export interface CrmlRadioGroupProps {
  options: RadioOption[];
  modelValue?: string;
  label?: string;
  name?: string;
  variant?: 'lime' | 'pink' | 'cyan' | 'yellow' | 'obsidian';
  size?: 'sm' | 'md' | 'lg';
  layout?: 'grid' | 'stack' | 'row';
  disabled?: boolean;
}

withDefaults(defineProps<CrmlRadioGroupProps>(), {
  name: 'crml-radio',
  variant: 'lime',
  size: 'md',
  layout: 'grid',
  disabled: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'change', value: string, option: RadioOption): void;
}>();

const selectOption = (val: string, option: RadioOption) => {
  emit('update:modelValue', val);
  emit('change', val, option);
};
</script>

<style scoped>
.crml-radio-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  font-family: var(--crml-font-body);
}

.crml-radio-group__label {
  font-size: 0.875rem;
  font-weight: 800;
  font-family: var(--crml-font-heading);
  color: var(--crml-text-main, #0d0d0d);
  text-transform: uppercase;
}

.crml-radio-options--grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.75rem;
}

.crml-radio-options--stack {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.crml-radio-options--row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.crml-radio-tile {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  background-color: var(--crml-bg-surface, #ffffff);
  border: 2.5px solid var(--crt-obsidian, #0d0d0d);
  border-radius: var(--crml-radius-md, 8px);
  box-shadow: 2.5px 2.5px 0px var(--crt-obsidian, #0d0d0d);
  cursor: pointer;
  user-select: none;
  transition: all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
}

/* Sizes */
.crml-radio-tile--sm {
  padding: 0.5rem 0.75rem;
  font-size: 0.8rem;
}

.crml-radio-tile--md {
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
}

.crml-radio-tile--lg {
  padding: 1rem 1.25rem;
  font-size: 1rem;
}

.crml-radio-tile:hover:not(.is-disabled) {
  transform: translate(-1px, -1px);
  box-shadow: 3.5px 3.5px 0px var(--crt-obsidian, #0d0d0d);
}

.crml-radio-tile:active:not(.is-disabled) {
  transform: translate(1px, 1px);
  box-shadow: 1px 1px 0px var(--crt-obsidian, #0d0d0d);
}

.crml-radio-input {
  appearance: none;
  width: 1.15rem;
  height: 1.15rem;
  border: 2px solid var(--crt-obsidian, #0d0d0d);
  border-radius: 50%;
  background-color: var(--crml-bg-surface);
  outline: none;
  cursor: pointer;
  flex-shrink: 0;
  display: grid;
  place-content: center;
}

.crml-radio-input::before {
  content: "";
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 50%;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  background-color: var(--crt-obsidian, #0d0d0d);
}

.crml-radio-input:checked::before {
  transform: scale(1);
}

.tile-icon {
  font-size: 1.25em;
  flex-shrink: 0;
}

.tile-content {
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1;
}

.tile-title-row {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.tile-label {
  font-weight: 800;
  color: var(--crml-text-main, #0d0d0d);
}

.tile-badge {
  font-size: 0.65rem;
  font-family: var(--crml-font-mono, monospace);
  font-weight: 800;
  background-color: var(--crt-obsidian, #0d0d0d);
  color: var(--crt-electric-lime, #ccff00);
  padding: 0.05rem 0.3rem;
  border-radius: 3px;
  margin-left: auto;
}

.tile-desc {
  font-size: 0.75em;
  color: var(--crml-text-muted, #757575);
  font-weight: 500;
  margin-top: 0.15rem;
}

/* Selected Variants */
.crml-radio-tile--lime.crml-radio-tile--selected {
  background-color: var(--crt-electric-lime, #ccff00);
}

.crml-radio-tile--pink.crml-radio-tile--selected {
  background-color: var(--crt-hot-pink, #ff007f);
  color: #ffffff;
}
.crml-radio-tile--pink.crml-radio-tile--selected .tile-label,
.crml-radio-tile--pink.crml-radio-tile--selected .tile-desc {
  color: #ffffff;
}

.crml-radio-tile--cyan.crml-radio-tile--selected {
  background-color: var(--crt-cyber-cyan, #00f0ff);
}

.crml-radio-tile--yellow.crml-radio-tile--selected {
  background-color: var(--crt-sunburst-yellow, #ffd600);
}

.crml-radio-tile--obsidian.crml-radio-tile--selected {
  background-color: var(--crt-obsidian, #0d0d0d);
  color: var(--crt-electric-lime, #ccff00);
}
.crml-radio-tile--obsidian.crml-radio-tile--selected .tile-label,
.crml-radio-tile--obsidian.crml-radio-tile--selected .tile-desc {
  color: var(--crt-electric-lime, #ccff00);
}

.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
</style>
