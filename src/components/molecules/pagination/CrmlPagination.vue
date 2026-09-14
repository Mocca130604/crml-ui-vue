<template>
  <div :class="['crml-pagination-wrapper', `crml-pagination-wrapper--${size}`]">
    <span v-if="showInfo" class="crml-pagination-info">
      <slot name="info" :currentPage="currentPage" :totalPages="totalPages" :totalItems="totalItems">
        {{ infoText }}
      </slot>
    </span>

    <div class="crml-pagination-controls">
      <button
        v-if="showFirstLast"
        type="button"
        :class="['page-btn', `page-btn--${variant}`]"
        :disabled="currentPage <= 1"
        @click="goToPage(1)"
      >{{ firstLabel }}</button>

      <button
        type="button"
        :class="['page-btn', `page-btn--${variant}`]"
        :disabled="currentPage <= 1"
        @click="goToPage(currentPage - 1)"
      >{{ prevLabel }}</button>

      <template v-if="!simple">
        <span v-if="visiblePages[0] > 1" class="page-ellipsis">…</span>
        <button
          v-for="page in visiblePages"
          :key="page"
          :class="['page-tile', `page-tile--${variant}`, { 'page-tile--active': page === currentPage }]"
          @click="goToPage(page)"
        >{{ page }}</button>
        <span v-if="visiblePages[visiblePages.length - 1] < totalPages" class="page-ellipsis">…</span>
      </template>

      <span v-if="simple" class="page-simple-text">
        {{ currentPage }} / {{ totalPages }}
      </span>

      <button
        type="button"
        :class="['page-btn', `page-btn--${variant}`]"
        :disabled="currentPage >= totalPages"
        @click="goToPage(currentPage + 1)"
      >{{ nextLabel }}</button>

      <button
        v-if="showFirstLast"
        type="button"
        :class="['page-btn', `page-btn--${variant}`]"
        :disabled="currentPage >= totalPages"
        @click="goToPage(totalPages)"
      >{{ lastLabel }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

export interface CrmlPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  /** Show info text */
  showInfo?: boolean;
  /** Custom info text (supports {page}, {pages}, {total} placeholders) */
  infoTemplate?: string;
  /** Show first/last page buttons */
  showFirstLast?: boolean;
  /** Simple mode - just prev/next with page indicator */
  simple?: boolean;
  /** Max visible page tiles */
  maxVisible?: number;
  /** Color variant */
  variant?: 'lime' | 'pink' | 'cyan' | 'yellow';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Custom label for prev button */
  prevLabel?: string;
  /** Custom label for next button */
  nextLabel?: string;
  /** Custom label for first button */
  firstLabel?: string;
  /** Custom label for last button */
  lastLabel?: string;
}

const props = withDefaults(defineProps<CrmlPaginationProps>(), {
  showInfo: true,
  showFirstLast: false,
  simple: false,
  maxVisible: 5,
  variant: 'lime',
  size: 'md',
  prevLabel: '◄ PREV',
  nextLabel: 'NEXT ►',
  firstLabel: '« FIRST',
  lastLabel: 'LAST »',
  infoTemplate: 'Page {page} of {pages} ({total} items)',
});

const emit = defineEmits<{
  (e: 'update:currentPage', page: number): void;
  (e: 'change', page: number): void;
}>();

const infoText = computed(() => {
  return props.infoTemplate
    .replace('{page}', String(props.currentPage))
    .replace('{pages}', String(props.totalPages))
    .replace('{total}', String(props.totalItems ?? 0));
});

const visiblePages = computed(() => {
  const pages: number[] = [];
  const half = Math.floor(props.maxVisible / 2);
  let start = Math.max(1, props.currentPage - half);
  let end = Math.min(props.totalPages, start + props.maxVisible - 1);
  
  if (end - start + 1 < props.maxVisible) {
    start = Math.max(1, end - props.maxVisible + 1);
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});

const goToPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages) {
    emit('update:currentPage', page);
    emit('change', page);
  }
};
</script>

<style scoped>
.crml-pagination-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  flex-wrap: wrap;
  font-family: var(--crml-font-heading);
}

.crml-pagination-info {
  font-weight: 700;
  color: var(--crml-text-muted);
}

.crml-pagination-wrapper--sm .crml-pagination-info { font-size: 0.7rem; }
.crml-pagination-wrapper--md .crml-pagination-info { font-size: 0.8125rem; }
.crml-pagination-wrapper--lg .crml-pagination-info { font-size: 0.9375rem; }

.crml-pagination-controls {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.page-btn, .page-tile {
  font-family: var(--crml-font-heading);
  font-weight: 800;
  border: var(--crml-border-brutal);
  border-radius: var(--crml-radius-md);
  box-shadow: 2px 2px 0px var(--crml-shadow-ink, #0D0D0D);
  background-color: var(--crml-bg-surface);
  color: var(--crml-text-main);
  cursor: pointer;
  transition: all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
  outline: none;
}

.crml-pagination-wrapper--sm .page-btn,
.crml-pagination-wrapper--sm .page-tile { font-size: 0.7rem; padding: 0.25rem 0.5rem; }
.crml-pagination-wrapper--md .page-btn,
.crml-pagination-wrapper--md .page-tile { font-size: 0.85rem; padding: 0.4rem 0.75rem; }
.crml-pagination-wrapper--lg .page-btn,
.crml-pagination-wrapper--lg .page-tile { font-size: 1rem; padding: 0.55rem 1rem; }

.page-btn:hover:not(:disabled), .page-tile:hover {
  transform: translate(-1px, -1px);
  box-shadow: 3px 3px 0px var(--crml-shadow-ink, #0D0D0D);
}

.page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: none;
}

/* Active variant colors */
.page-tile--active.page-tile--lime { background-color: var(--crt-electric-lime); color: var(--crt-obsidian); }
.page-tile--active.page-tile--pink { background-color: var(--crt-hot-pink); color: var(--crt-pure-white); }
.page-tile--active.page-tile--cyan { background-color: var(--crt-cyber-cyan); color: var(--crt-obsidian); }
.page-tile--active.page-tile--yellow { background-color: var(--crt-sunburst-yellow); color: var(--crt-obsidian); }

.page-tile--active { box-shadow: 3px 3px 0px var(--crml-shadow-ink, #0D0D0D); }

.page-ellipsis {
  font-weight: 800;
  color: var(--crml-text-muted);
  padding: 0 0.25rem;
}

.page-simple-text {
  font-weight: 800;
  font-family: var(--crml-font-mono);
  color: var(--crml-text-main);
  padding: 0 0.5rem;
}
</style>
