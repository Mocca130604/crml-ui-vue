<template>
  <div
    class="crml-search-tag-filter"
    :data-variant="variant"
    :data-size="size"
    :class="{ 'is-disabled': disabled }"
  >
    <!-- Search Input Bar -->
    <div class="search-input-box">
      <slot name="prefix">
        <span class="search-icon">🔍</span>
      </slot>

      <input
        type="text"
        :value="searchValue"
        :placeholder="placeholder"
        :disabled="disabled"
        class="search-input"
        @input="handleInput"
      />

      <button
        v-if="clearable && searchValue && !disabled"
        type="button"
        class="clear-btn"
        title="Clear search query"
        @click="clearInput"
      >
        ✕
      </button>

      <slot name="shortcut">
        <div v-if="showShortcut && shortcutText" class="shortcut-chip">
          <span>{{ shortcutText }}</span>
        </div>
      </slot>
    </div>

    <!-- Filter Tag Pills Row Underneath -->
    <div v-if="normalizedTags && normalizedTags.length > 0" class="filter-tags-row">
      <slot name="label">
        <span v-if="showFilterLabel && filterLabelText" class="filter-label">
          {{ filterLabelText }}
        </span>
      </slot>

      <button
        v-for="tag in normalizedTags"
        :key="tag.id"
        type="button"
        :disabled="disabled || tag.disabled"
        :data-tag-color="tag.color"
        :class="[
          'filter-tag-pill',
          {
            'is-active': isTagActive(tag.id),
            'is-disabled': tag.disabled
          }
        ]"
        @click="selectTag(tag)"
      >
        <slot name="tag" :tag="tag" :is-active="isTagActive(tag.id)">
          <slot name="tagPrefix" :tag="tag" :is-active="isTagActive(tag.id)">
            <span v-if="tag.icon" class="tag-icon">{{ tag.icon }}</span>
          </slot>
          <span class="tag-text">{{ tag.label }}</span>
          <span v-if="showCounts && tag.count !== undefined" class="tag-count">
            <slot name="tagCount" :count="tag.count" :tag="tag">
              {{ formatTagCount(tag.count, tag) }}
            </slot>
          </span>
          <span v-if="tag.badge !== undefined" class="tag-badge-inline">
            {{ tag.badge }}
          </span>
          <slot name="tagSuffix" :tag="tag" :is-active="isTagActive(tag.id)" />
          <button
            v-if="tagRemovable || tag.removable"
            type="button"
            class="tag-remove-btn"
            title="Remove tag"
            @click.stop="removeTag(tag)"
          >
            ×
          </button>
        </slot>
      </button>

      <!-- Clear/Reset active tags action -->
      <slot name="clearTags" :has-active="hasActiveTags" :clear="clearAllTags">
        <button
          v-if="showClearTags && hasActiveTags"
          type="button"
          class="filter-tag-pill clear-tags-btn"
          @click="clearAllTags"
        >
          {{ clearTagsText }}
        </button>
      </slot>

      <slot name="filterExtra" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface FilterTag {
  id: string
  label: string
  count?: number
  color?: 'lime' | 'pink' | 'cyan' | 'yellow' | 'obsidian' | 'white'
  icon?: string
  disabled?: boolean
  badge?: string | number
  removable?: boolean
}

export type TagInputType = string | FilterTag

const props = withDefaults(
  defineProps<{
    modelValue?: string
    search?: string
    activeTag?: string
    selectedTags?: string[]
    tags?: TagInputType[]
    availableTags?: TagInputType[]
    variant?: 'lime' | 'pink' | 'cyan' | 'yellow'
    size?: 'sm' | 'md' | 'lg'
    multiSelect?: boolean
    placeholder?: string
    filterLabelText?: string
    showFilterLabel?: boolean
    showShortcut?: boolean
    shortcutText?: string
    showCounts?: boolean
    clearable?: boolean
    disabled?: boolean
    tagRemovable?: boolean
    showClearTags?: boolean
    clearTagsText?: string
    formatCount?: (count: number, tag: FilterTag) => string
  }>(),
  {
    modelValue: undefined,
    search: undefined,
    activeTag: 'all',
    selectedTags: () => [],
    tags: undefined,
    availableTags: undefined,
    variant: 'lime',
    size: 'md',
    multiSelect: false,
    placeholder: 'Search primitives, tokens, scripts...',
    filterLabelText: 'FILTER:',
    showFilterLabel: true,
    showShortcut: true,
    shortcutText: '⌘K',
    showCounts: true,
    clearable: true,
    disabled: false,
    tagRemovable: false,
    showClearTags: false,
    clearTagsText: 'Reset Filters',
    formatCount: undefined
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', val: string): void
  (e: 'update:search', val: string): void
  (e: 'update:activeTag', tagId: string): void
  (e: 'update:selectedTags', tagIds: string[]): void
  (e: 'tag-click', tag: FilterTag): void
  (e: 'search', val: string): void
  (e: 'clear'): void
  (e: 'clear-tags'): void
  (e: 'remove-tag', tag: FilterTag): void
}>()

const searchValue = computed(() => {
  if (props.search !== undefined) return props.search
  if (props.modelValue !== undefined) return props.modelValue
  return ''
})

const handleInput = (e: Event) => {
  const val = (e.target as HTMLInputElement).value
  emit('update:modelValue', val)
  emit('update:search', val)
  emit('search', val)
}

const clearInput = () => {
  emit('update:modelValue', '')
  emit('update:search', '')
  emit('clear')
}

const normalizedTags = computed<FilterTag[]>(() => {
  const raw = props.tags ?? props.availableTags
  if (!raw || raw.length === 0) {
    return [
      { id: 'all', label: 'All Tokens' },
      { id: 'forms', label: 'Forms', count: 18 },
      { id: 'atoms', label: 'Atoms', count: 16 },
      { id: 'molecules', label: 'Molecules', count: 20 },
      { id: 'organisms', label: 'Organisms', count: 20 }
    ]
  }
  return raw.map((item) => {
    if (typeof item === 'string') {
      return { id: item, label: item }
    }
    return item
  })
})

const isTagActive = (tagId: string) => {
  if (props.multiSelect || (props.selectedTags && props.selectedTags.length > 0)) {
    return props.selectedTags?.includes(tagId) ?? false
  }
  return props.activeTag === tagId
}

const hasActiveTags = computed(() => {
  if (props.multiSelect || (props.selectedTags && props.selectedTags.length > 0)) {
    return (props.selectedTags?.length ?? 0) > 0
  }
  return props.activeTag !== undefined && props.activeTag !== '' && props.activeTag !== 'all'
})

const selectTag = (tag: FilterTag) => {
  if (props.disabled || tag.disabled) return
  const tagId = tag.id
  if (props.multiSelect || (props.selectedTags && props.selectedTags.length > 0)) {
    const current = [...(props.selectedTags || [])]
    const idx = current.indexOf(tagId)
    if (idx > -1) {
      current.splice(idx, 1)
    } else {
      current.push(tagId)
    }
    emit('update:selectedTags', current)
  } else {
    emit('update:activeTag', tagId)
  }
  emit('tag-click', tag)
}

const removeTag = (tag: FilterTag) => {
  if (props.disabled) return
  if (props.multiSelect || (props.selectedTags && props.selectedTags.length > 0)) {
    const current = (props.selectedTags || []).filter((id) => id !== tag.id)
    emit('update:selectedTags', current)
  } else if (props.activeTag === tag.id) {
    emit('update:activeTag', 'all')
  }
  emit('remove-tag', tag)
}

const clearAllTags = () => {
  if (props.disabled) return
  emit('update:selectedTags', [])
  emit('update:activeTag', 'all')
  emit('clear-tags')
}

const formatTagCount = (count: number, tag: FilterTag) => {
  if (props.formatCount) return props.formatCount(count, tag)
  return `(${count})`
}
</script>

<style scoped>
.crml-search-tag-filter {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  font-family: var(--crml-font-body, 'Inter', sans-serif);
}

.crml-search-tag-filter.is-disabled {
  opacity: 0.6;
  pointer-events: none;
}

/* ================= Size Variants ================= */
.crml-search-tag-filter[data-size="sm"] .search-input-box {
  padding: 0.35rem 0.65rem;
  border-width: 2px;
  border-radius: 6px;
  box-shadow: 2px 2px 0px var(--crml-shadow-ink, #0d0d0d);
}

.crml-search-tag-filter[data-size="sm"] .search-input {
  font-size: 0.775rem;
}

.crml-search-tag-filter[data-size="sm"] .filter-tag-pill {
  padding: 0.2rem 0.55rem;
  font-size: 0.7rem;
  box-shadow: 1.5px 1.5px 0px var(--crml-shadow-ink, #0d0d0d);
}

.crml-search-tag-filter[data-size="md"] .search-input-box {
  padding: 0.5rem 0.85rem;
  border-width: 2.5px;
  border-radius: 8px;
  box-shadow: 3px 3px 0px var(--crml-shadow-ink, #0d0d0d);
}

.crml-search-tag-filter[data-size="md"] .search-input {
  font-size: 0.875rem;
}

.crml-search-tag-filter[data-size="md"] .filter-tag-pill {
  padding: 0.3rem 0.75rem;
  font-size: 0.775rem;
  box-shadow: 2px 2px 0px var(--crml-shadow-ink, #0d0d0d);
}

.crml-search-tag-filter[data-size="lg"] .search-input-box {
  padding: 0.75rem 1.1rem;
  border-width: 3px;
  border-radius: 12px;
  box-shadow: 4px 4px 0px var(--crml-shadow-ink, #0d0d0d);
}

.crml-search-tag-filter[data-size="lg"] .search-input {
  font-size: 1.05rem;
}

.crml-search-tag-filter[data-size="lg"] .filter-tag-pill {
  padding: 0.45rem 0.95rem;
  font-size: 0.875rem;
  box-shadow: 3px 3px 0px var(--crml-shadow-ink, #0d0d0d);
}

/* ================= Component Layout ================= */
.search-input-box {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  background-color: var(--crml-bg-surface, #ffffff);
  border-style: solid;
  border-color: var(--crml-border-ink, #0d0d0d);
  transition: all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
  width: 100%;
  box-sizing: border-box;
}

/* Theme Focus Strokes */
.crml-search-tag-filter[data-variant="lime"] .search-input-box:focus-within {
  border-color: var(--crml-action-primary);
  box-shadow: 4px 4px 0px var(--crml-shadow-ink, #0d0d0d);
}
.crml-search-tag-filter[data-variant="pink"] .search-input-box:focus-within {
  border-color: #ff007f;
  box-shadow: 4px 4px 0px var(--crml-shadow-ink, #0d0d0d);
}
.crml-search-tag-filter[data-variant="cyan"] .search-input-box:focus-within {
  border-color: #00f0ff;
  box-shadow: 4px 4px 0px var(--crml-shadow-ink, #0d0d0d);
}
.crml-search-tag-filter[data-variant="yellow"] .search-input-box:focus-within {
  border-color: #ffd600;
  box-shadow: 4px 4px 0px var(--crml-shadow-ink, #0d0d0d);
}

.search-icon {
  font-size: 1rem;
  opacity: 0.85;
}

.search-input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  font-family: var(--crml-font-body, 'Inter', sans-serif);
  font-weight: 700;
  color: var(--crml-text-main, #0d0d0d);
  min-width: 0;
}

.search-input::placeholder {
  color: var(--crml-text-muted, #757575);
  font-weight: 600;
}

.clear-btn {
  background: none;
  border: 1.5px solid var(--crml-border-ink, #0d0d0d);
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 900;
  padding: 0.1rem 0.35rem;
  color: var(--crml-text-main, #0d0d0d);
  transition: all 0.1s ease;
}

.clear-btn:hover {
  background-color: #ff007f;
  color: #ffffff;
}

.shortcut-chip {
  background-color: var(--crml-bg-elevated, #e0e0e0);
  border: 1.5px solid var(--crml-border-ink, #0d0d0d);
  border-radius: 4px;
  padding: 0.15rem 0.45rem;
  font-family: var(--crml-font-mono, monospace);
  font-size: 0.725rem;
  font-weight: 800;
  color: var(--crml-text-main, #0d0d0d);
  box-shadow: 1.5px 1.5px 0px var(--crml-shadow-ink, #0d0d0d);
  white-space: nowrap;
}

.filter-tags-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.filter-label {
  font-family: var(--crml-font-mono, monospace);
  font-size: 0.725rem;
  font-weight: 800;
  color: var(--crml-text-muted, #a1a1aa);
}

.filter-tag-pill {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-family: var(--crml-font-mono, monospace);
  font-weight: 800;
  border: 2px solid var(--crml-border-ink, #0d0d0d);
  border-radius: 6px;
  background-color: var(--crml-bg-surface, #ffffff);
  color: var(--crml-text-main, #0d0d0d);
  cursor: pointer;
  transition: all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.filter-tag-pill .tag-text {
  color: inherit;
}

.filter-tag-pill .tag-count {
  color: inherit;
  opacity: 0.85;
}

.filter-tag-pill:hover {
  transform: translate(-1px, -1px);
  background-color: var(--crml-bg-elevated);
  box-shadow: 3px 3px 0px var(--crml-shadow-ink, #0d0d0d);
}

/* Active Tag Theme Styles */
.crml-search-tag-filter[data-variant="lime"] .filter-tag-pill.is-active {
  background-color: var(--crml-action-primary, #1B6FFF);
  color: var(--crml-text-on-primary, #FFFFFF) !important;
  box-shadow: 3px 3px 0px var(--crml-shadow-ink, #0d0d0d);
}

.crml-search-tag-filter[data-variant="pink"] .filter-tag-pill.is-active {
  background-color: var(--crt-hot-pink, #ff007f);
  color: #ffffff !important;
  box-shadow: 3px 3px 0px var(--crml-shadow-ink, #0d0d0d);
}

.crml-search-tag-filter[data-variant="cyan"] .filter-tag-pill.is-active {
  background-color: var(--crt-cyber-cyan, #00f0ff);
  color: var(--crt-obsidian, #0d0d0d) !important;
  box-shadow: 3px 3px 0px var(--crml-shadow-ink, #0d0d0d);
}

.crml-search-tag-filter[data-variant="yellow"] .filter-tag-pill.is-active {
  background-color: var(--crt-sunburst-yellow, #ffd600);
  color: var(--crt-obsidian, #0d0d0d) !important;
  box-shadow: 3px 3px 0px var(--crml-shadow-ink, #0d0d0d);
}

/* Individual Tag Color Override */
.filter-tag-pill.is-active[data-tag-color="lime"] {
  background-color: var(--crml-action-primary) !important;
  color: var(--crml-text-on-primary, #FFFFFF) !important;
}
.filter-tag-pill.is-active[data-tag-color="pink"] {
  background-color: #ff007f !important;
  color: #ffffff !important;
}
.filter-tag-pill.is-active[data-tag-color="cyan"] {
  background-color: #00f0ff !important;
  color: #0d0d0d !important;
}
.filter-tag-pill.is-active[data-tag-color="yellow"] {
  background-color: #ffd600 !important;
  color: #0d0d0d !important;
}

.tag-count {
  font-family: var(--crml-font-mono, monospace);
  font-size: 0.7rem;
  opacity: 0.85;
}

.tag-icon {
  display: inline-flex;
  align-items: center;
  font-size: 0.85em;
}

.tag-badge-inline {
  background-color: var(--crt-obsidian, #0d0d0d);
  color: var(--crml-action-primary, #1B6FFF);
  font-size: 0.65rem;
  padding: 0.05rem 0.3rem;
  border-radius: 3px;
  font-weight: 800;
}

.tag-remove-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 900;
  font-size: 0.9rem;
  line-height: 1;
  padding: 0 0.2rem;
  color: inherit;
  opacity: 0.7;
  transition: opacity 0.1s;
}

.tag-remove-btn:hover {
  opacity: 1;
  color: #ff007f;
}

.clear-tags-btn {
  background-color: var(--crml-bg-card-alt) !important;
  border-style: dashed !important;
  color: var(--crml-text-muted, #757575) !important;
}

.clear-tags-btn:hover {
  background-color: #ff007f !important;
  color: #ffffff !important;
  border-style: solid !important;
}

.filter-tag-pill.is-disabled {
  opacity: 0.45;
  cursor: not-allowed;
  pointer-events: none;
}
</style>
