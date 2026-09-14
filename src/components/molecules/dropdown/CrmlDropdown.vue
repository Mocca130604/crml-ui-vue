<template>
  <div :class="[
    'crml-dropdown-wrapper',
    `crml-dropdown-wrapper--${size}`,
    { 'crml-dropdown-wrapper--disabled': disabled }
  ]" ref="dropdownRef">
    <label v-if="label" class="crml-dropdown-label">{{ label }}</label>

    <slot name="trigger" :open="open" :selectedItem="selectedItem" :toggle="toggleOpen">
      <button
        type="button"
        :class="['crml-dropdown-trigger', `crml-dropdown-trigger--${variant}`]"
        :disabled="disabled"
        @click="toggleOpen"
      >
        <span v-if="selectedItem?.icon" class="trigger-icon">{{ selectedItem.icon }}</span>
        <span class="trigger-label">{{ selectedItem ? selectedItem.label : placeholder }}</span>
        <span v-if="selectedItem?.description" class="trigger-desc">{{ selectedItem.description }}</span>
        <span :class="['trigger-arrow', { 'trigger-arrow--open': open }]">{{ arrowIcon }}</span>
      </button>
    </slot>

    <Transition name="dropdown-pop">
      <div v-if="open" class="crml-dropdown-menu">
        <div v-if="searchable" class="crml-dropdown-search">
          <input
            type="text"
            v-model="searchQuery"
            :placeholder="searchPlaceholder"
            class="crml-dropdown-search-input"
          />
        </div>
        <button
          v-for="option in filteredOptions"
          :key="option.value"
          :class="[
            'crml-dropdown-item',
            {
              'crml-dropdown-item--selected': modelValue === option.value,
              'crml-dropdown-item--disabled': option.disabled
            }
          ]"
          :disabled="option.disabled"
          @click="selectOption(option)"
        >
          <span v-if="option.icon" class="item-icon">{{ option.icon }}</span>
          <div class="item-text-group">
            <span class="item-text">{{ option.label }}</span>
            <span v-if="option.description" class="item-desc">{{ option.description }}</span>
          </div>
          <span v-if="modelValue === option.value" class="item-check">✓</span>
        </button>
        <div v-if="filteredOptions.length === 0" class="crml-dropdown-empty">
          {{ emptyText }}
        </div>
      </div>
    </Transition>

    <span v-if="helperText" class="crml-dropdown-helper">{{ helperText }}</span>
    <span v-if="error" class="crml-dropdown-error">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

export interface DropdownOption {
  value: string;
  label: string;
  icon?: string;
  description?: string;
  disabled?: boolean;
}

export interface CrmlDropdownProps {
  options: DropdownOption[];
  modelValue?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Label text */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Error text */
  error?: string;
  /** Color variant */
  variant?: 'lime' | 'pink' | 'cyan' | 'white';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Disabled state */
  disabled?: boolean;
  /** Enable search/filter */
  searchable?: boolean;
  /** Search input placeholder */
  searchPlaceholder?: string;
  /** Empty state text */
  emptyText?: string;
  /** Arrow/chevron icon */
  arrowIcon?: string;
}

const props = withDefaults(defineProps<CrmlDropdownProps>(), {
  placeholder: 'Select option...',
  variant: 'lime',
  size: 'md',
  disabled: false,
  searchable: false,
  searchPlaceholder: 'Search...',
  emptyText: 'No options found',
  arrowIcon: '▼',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'change', option: DropdownOption): void;
}>();

const open = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);
const searchQuery = ref('');

const selectedItem = computed(() => {
  return props.options.find((opt) => opt.value === props.modelValue);
});

const filteredOptions = computed(() => {
  if (!props.searchable || !searchQuery.value) return props.options;
  const q = searchQuery.value.toLowerCase();
  return props.options.filter(opt =>
    opt.label.toLowerCase().includes(q) ||
    (opt.description && opt.description.toLowerCase().includes(q))
  );
});

const toggleOpen = () => {
  if (props.disabled) return;
  open.value = !open.value;
  if (!open.value) searchQuery.value = '';
};

const selectOption = (option: DropdownOption) => {
  if (option.disabled) return;
  emit('update:modelValue', option.value);
  emit('change', option);
  open.value = false;
  searchQuery.value = '';
};

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    open.value = false;
    searchQuery.value = '';
  }
};

onMounted(() => { document.addEventListener('click', handleClickOutside); });
onUnmounted(() => { document.removeEventListener('click', handleClickOutside); });
</script>

<style scoped>
.crml-dropdown-wrapper {
  position: relative;
  display: inline-block;
  min-width: 200px;
  font-family: var(--crml-font-heading);
}

.crml-dropdown-wrapper--disabled { opacity: 0.5; pointer-events: none; }

.crml-dropdown-label {
  display: block;
  font-weight: 800;
  color: var(--crml-text-main);
  margin-bottom: 0.35rem;
}

.crml-dropdown-wrapper--sm .crml-dropdown-label { font-size: 0.75rem; }
.crml-dropdown-wrapper--md .crml-dropdown-label { font-size: 0.875rem; }
.crml-dropdown-wrapper--lg .crml-dropdown-label { font-size: 1rem; }

.crml-dropdown-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: var(--crml-border-brutal);
  border-radius: var(--crml-radius-md);
  box-shadow: var(--crml-shadow-brutal-sm);
  font-family: var(--crml-font-heading);
  font-weight: 700;
  cursor: pointer;
  outline: none;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.crml-dropdown-wrapper--sm .crml-dropdown-trigger { padding: 0.4rem 0.75rem; font-size: 0.8rem; }
.crml-dropdown-wrapper--md .crml-dropdown-trigger { padding: 0.65rem 1rem; font-size: 0.9375rem; }
.crml-dropdown-wrapper--lg .crml-dropdown-trigger { padding: 0.85rem 1.25rem; font-size: 1.05rem; }

.crml-dropdown-trigger:hover { transform: translate(-1px, -1px); box-shadow: var(--crml-shadow-brutal); }

.crml-dropdown-trigger--lime { background-color: var(--crt-electric-lime); color: var(--crt-obsidian); }
.crml-dropdown-trigger--pink { background-color: var(--crt-hot-pink); color: var(--crt-pure-white); }
.crml-dropdown-trigger--cyan { background-color: var(--crt-cyber-cyan); color: var(--crt-obsidian); }
.crml-dropdown-trigger--white { background-color: var(--crt-pure-white); color: var(--crt-obsidian); }

.trigger-label { flex-grow: 1; text-align: left; }
.trigger-desc { font-size: 0.7rem; color: inherit; opacity: 0.7; }
.trigger-icon { font-size: 1.1rem; }

.trigger-arrow { font-size: 0.75rem; transition: transform 0.2s ease; }
.trigger-arrow--open { transform: rotate(180deg); }

.crml-dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 0.35rem;
  background-color: var(--crml-bg-surface);
  border: var(--crml-border-brutal);
  border-radius: var(--crml-radius-md);
  box-shadow: var(--crml-shadow-brutal);
  overflow: hidden;
  z-index: 9990;
  display: flex;
  flex-direction: column;
  max-height: 280px;
  overflow-y: auto;
}

.crml-dropdown-search {
  padding: 0.5rem;
  border-bottom: 2px solid var(--crt-obsidian);
}

.crml-dropdown-search-input {
  width: 100%;
  padding: 0.4rem 0.65rem;
  border: 1.5px solid var(--crt-obsidian);
  border-radius: var(--crml-radius-sm);
  font-family: var(--crml-font-body);
  font-size: 0.8rem;
  outline: none;
}

.crml-dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1rem;
  border: none;
  background: transparent;
  font-family: var(--crml-font-heading);
  font-weight: 700;
  font-size: 0.875rem;
  color: var(--crml-text-main);
  cursor: pointer;
  text-align: left;
  transition: background-color 0.15s ease;
}

.crml-dropdown-item:hover:not(.crml-dropdown-item--disabled) {
  background-color: var(--crt-electric-lime);
  color: var(--crt-obsidian);
}

.crml-dropdown-item--selected { background-color: var(--crml-bg-elevated); }
.crml-dropdown-item--disabled { opacity: 0.4; cursor: not-allowed; }

.item-text-group { display: flex; flex-direction: column; flex-grow: 1; }
.item-desc { font-size: 0.7rem; opacity: 0.6; font-weight: 500; }
.item-check { font-weight: 900; font-size: 0.9rem; }

.crml-dropdown-empty {
  padding: 1rem;
  text-align: center;
  font-size: 0.8rem;
  color: var(--crml-text-muted);
}

.crml-dropdown-helper {
  display: block;
  font-size: 0.7rem;
  color: var(--crml-text-muted);
  margin-top: 0.25rem;
  font-family: var(--crml-font-body);
}

.crml-dropdown-error {
  display: block;
  font-size: 0.7rem;
  color: var(--crt-hot-pink);
  margin-top: 0.25rem;
  font-weight: 700;
}

.dropdown-pop-enter-active, .dropdown-pop-leave-active { transition: opacity 0.15s ease, transform 0.15s ease; }
.dropdown-pop-enter-from, .dropdown-pop-leave-to { opacity: 0; transform: translateY(-8px) scale(0.98); }
</style>
