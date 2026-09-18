<script setup lang="ts">
import { computed } from 'vue'

export interface Column {
  key: string
  label: string
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
  width?: string
}

const props = withDefaults(
  defineProps<{
    columns: Column[]
    data: Record<string, any>[]
    striped?: boolean
    hoverable?: boolean
    accentColor?: 'yellow' | 'pink' | 'cyan' | 'lime' | 'violet'
    /** Size/density variant */
    size?: 'sm' | 'md' | 'lg'
    /** Show outer border */
    bordered?: boolean
    /** Table caption text */
    caption?: string
    /** Custom empty state text */
    emptyText?: string
    /** Custom empty state icon */
    emptyIcon?: string
    /** Show row numbers */
    showRowNumbers?: boolean
    /** Row number header label */
    rowNumberLabel?: string
    /** Loading state */
    loading?: boolean
    /** Loading text */
    loadingText?: string
    /** Max height for scrollable table */
    maxHeight?: string
  }>(),
  {
    striped: true,
    hoverable: true,
    accentColor: 'yellow',
    size: 'md',
    bordered: true,
    emptyText: 'No data found',
    emptyIcon: '📭',
    showRowNumbers: false,
    rowNumberLabel: '#',
    loading: false,
    loadingText: 'Loading...',
  }
)

const emit = defineEmits<{
  (e: 'row-click', row: Record<string, any>, index: number): void
  (e: 'header-click', col: Column): void
}>()
</script>

<template>
  <div
    class="crml-table-wrapper"
    :class="[`accent-${accentColor}`, `size-${size}`, { 'no-border': !bordered }]"
  >
    <p v-if="caption" class="crml-table-caption">{{ caption }}</p>

    <div class="crml-table-scroll" :style="maxHeight ? { maxHeight, overflowY: 'auto' } : undefined">
      <table class="crml-table" :class="{ 'is-striped': striped, 'is-hoverable': hoverable }">
        <thead>
          <tr>
            <th v-if="showRowNumbers" class="row-num-col">{{ rowNumberLabel }}</th>
            <th 
              v-for="col in columns" 
              :key="col.key"
              :class="[col.align ? `align-${col.align}` : '', { 'is-sortable': col.sortable }]"
              :style="col.width ? { width: col.width } : undefined"
              @click="emit('header-click', col)"
            >
              <div class="th-content">
                <slot :name="`header-${col.key}`" :column="col">
                  <span>{{ col.label }}</span>
                </slot>
                <span v-if="col.sortable" class="sort-icon">⇅</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-if="loading">
            <tr>
              <td :colspan="columns.length + (showRowNumbers ? 1 : 0)" class="loading-cell">
                <slot name="loading">
                  <span class="loading-spinner">⏳</span> {{ loadingText }}
                </slot>
              </td>
            </tr>
          </template>
          <template v-else-if="data.length > 0">
            <tr 
              v-for="(row, idx) in data" 
              :key="idx"
              @click="emit('row-click', row, idx)"
            >
              <td v-if="showRowNumbers" class="row-num-col">{{ idx + 1 }}</td>
              <td 
                v-for="col in columns" 
                :key="col.key"
                :class="col.align ? `align-${col.align}` : ''"
              >
                <slot :name="`cell-${col.key}`" :row="row" :value="row[col.key]" :index="idx">
                  {{ row[col.key] }}
                </slot>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td :colspan="columns.length + (showRowNumbers ? 1 : 0)" class="empty-cell">
                <slot name="empty">
                  <span class="empty-icon">{{ emptyIcon }}</span>
                  <span>{{ emptyText }}</span>
                </slot>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <div v-if="$slots.footer" class="crml-table-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped>
.crml-table-wrapper {
  width: 100%;
  border: 3px solid var(--crml-border-ink, #0D0D0D);
  border-radius: var(--crml-radius-md);
  box-shadow: 5px 5px 0px var(--crml-shadow-ink, #0D0D0D);
  background-color: var(--crml-bg-surface);
  overflow: hidden;
}

.crml-table-wrapper.no-border { border: none; box-shadow: none; }

.crml-table-caption {
  font-family: var(--crml-font-heading);
  font-weight: 800;
  font-size: 0.8rem;
  text-transform: uppercase;
  padding: 0.65rem 1rem;
  border-bottom: 2px solid var(--crml-border-ink, #0D0D0D);
  color: var(--crml-text-muted);
  margin: 0;
}

.crml-table-scroll { overflow-x: auto; }

.crml-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-family: var(--crml-font-body);
}

/* Size variants */
.size-sm .crml-table th { padding: 0.5rem 0.65rem; font-size: 0.75rem; }
.size-sm .crml-table td { padding: 0.45rem 0.65rem; font-size: 0.8rem; }
.size-md .crml-table th { padding: 0.875rem 1rem; font-size: 0.85rem; }
.size-md .crml-table td { padding: 0.875rem 1rem; font-size: 0.875rem; }
.size-lg .crml-table th { padding: 1.1rem 1.25rem; font-size: 0.95rem; }
.size-lg .crml-table td { padding: 1rem 1.25rem; font-size: 1rem; }

.crml-table th {
  background-color: var(--crt-sunburst-yellow);
  color: var(--crt-obsidian);
  font-family: var(--crml-font-heading);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 3px solid var(--crml-border-ink, #0D0D0D);
  user-select: none;
}

.accent-pink .crml-table th { background-color: var(--crt-hot-pink); color: #ffffff; }
.accent-cyan .crml-table th { background-color: var(--crt-cyber-cyan); }
.accent-lime .crml-table th { background-color: var(--crml-action-primary); }
.accent-violet .crml-table th { background-color: var(--crml-color-violet, #9B59B6); color: #ffffff; }

.crml-table td {
  border-bottom: 2px solid var(--crml-border-ink, #0D0D0D);
  font-weight: 600;
  color: var(--crml-text-main);
}
.crml-table tr:last-child td { border-bottom: none; }

.crml-table.is-striped tbody tr:nth-child(even) { background-color: var(--crml-bg-card-alt); }

.crml-table.is-hoverable tbody tr { transition: background-color 0.15s ease; }
.crml-table.is-hoverable tbody tr:hover { background-color: rgba(255, 224, 102, 0.2); cursor: pointer; }

.align-center { text-align: center; }
.align-right { text-align: right; }

.th-content { display: flex; align-items: center; gap: 0.5rem; }
.is-sortable { cursor: pointer; }
.sort-icon { font-size: 0.75rem; opacity: 0.7; }

.row-num-col {
  width: 3rem;
  text-align: center;
  font-family: var(--crml-font-mono);
  font-weight: 800;
  font-size: 0.75rem;
  color: var(--crml-text-muted);
}

.empty-cell {
  text-align: center;
  padding: 2rem !important;
  font-family: var(--crml-font-heading);
  font-weight: 800;
  color: var(--crml-text-muted);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.empty-icon { font-size: 2rem; }

.loading-cell {
  text-align: center;
  padding: 2rem !important;
  font-family: var(--crml-font-heading);
  font-weight: 800;
  color: var(--crml-text-muted);
}

.loading-spinner { font-size: 1.25rem; }

.crml-table-footer {
  padding: 0.65rem 1rem;
  border-top: 2px solid var(--crml-border-ink, #0D0D0D);
  background-color: var(--crml-bg-elevated);
}
</style>
