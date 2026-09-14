<template>
  <div :class="['crml-funky-accordion', `crml-funky-accordion--${size}`, { 'crml-funky-accordion--flush': flush }]">
    <div
      v-for="(item, index) in items"
      :key="item.id || index"
      :class="[
        'crml-accordion-item',
        `crml-accordion-item--color-${getThemeColor(index)}`,
        { 'crml-accordion-item--expanded': isExpanded(item.id || index.toString()) }
      ]"
    >
      <button
        class="crml-accordion-header"
        @click="toggleItem(item.id || index.toString())"
      >
        <div class="header-title-group">
          <slot :name="`header-icon-${item.id || index}`" :item="item">
            <slot name="header-icon" :item="item" :index="index">
              <span v-if="item.emoji" class="item-emoji">{{ item.emoji }}</span>
            </slot>
          </slot>
          <slot :name="`header-${item.id || index}`" :item="item">
            <slot name="header" :item="item" :index="index">
              <span class="item-title">{{ item.title }}</span>
            </slot>
          </slot>
          <slot :name="`badge-${item.id || index}`" :item="item">
            <slot name="badge" :item="item" :badge="item.badge">
              <span v-if="item.badge" class="item-badge">{{ item.badge }}</span>
            </slot>
          </slot>
        </div>
        <slot name="toggle-icon" :expanded="isExpanded(item.id || index.toString())" :item="item">
          <span class="crml-accordion-icon">
            {{ isExpanded(item.id || index.toString()) ? expandedIcon : collapsedIcon }}
          </span>
        </slot>
      </button>

      <div
        v-show="isExpanded(item.id || index.toString())"
        class="crml-accordion-content"
      >
        <slot :name="`item-${item.id || index}`" :item="item">
          <slot name="content" :item="item" :index="index">
            <p v-if="item.content">{{ item.content }}</p>
          </slot>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

export interface AccordionItem {
  id?: string;
  title: string;
  content?: string;
  emoji?: string;
  /** Optional badge text */
  badge?: string;
  /** Is this item disabled */
  disabled?: boolean;
}

export interface CrmlFunkyAccordionProps {
  items: AccordionItem[];
  /** Allow multiple open items */
  multiple?: boolean;
  /** Color rotation sequence */
  colorSequence?: Array<'lavender' | 'peach' | 'mint' | 'lime' | 'cyan' | 'yellow'>;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Flush mode (no borders/shadows) */
  flush?: boolean;
  /** Icon shown when expanded */
  expandedIcon?: string;
  /** Icon shown when collapsed */
  collapsedIcon?: string;
  /** Default expanded item IDs */
  defaultExpanded?: string[];
}

const props = withDefaults(defineProps<CrmlFunkyAccordionProps>(), {
  multiple: false,
  colorSequence: () => ['lavender', 'peach', 'mint', 'yellow', 'lime'],
  size: 'md',
  flush: false,
  expandedIcon: '⚡',
  collapsedIcon: '➕',
  defaultExpanded: () => [],
});

const emit = defineEmits<{
  (e: 'change', expandedIds: string[]): void;
}>();

const expandedIds = ref<string[]>([...props.defaultExpanded]);

const isExpanded = (id: string) => expandedIds.value.includes(id);

const toggleItem = (id: string) => {
  // Check if item is disabled
  const item = props.items.find((i, idx) => (i.id || idx.toString()) === id);
  if (item?.disabled) return;

  if (isExpanded(id)) {
    expandedIds.value = expandedIds.value.filter((i) => i !== id);
  } else {
    if (props.multiple) {
      expandedIds.value.push(id);
    } else {
      expandedIds.value = [id];
    }
  }
  emit('change', expandedIds.value);
};

const getThemeColor = (index: number) => {
  const seq = props.colorSequence;
  return seq[index % seq.length];
};
</script>

<style scoped>
.crml-funky-accordion {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  width: 100%;
}

.crml-funky-accordion--flush { gap: 0; }
.crml-funky-accordion--flush .crml-accordion-item {
  border-radius: 0;
  box-shadow: none;
  border-left: none;
  border-right: none;
  border-top: none;
}

.crml-accordion-item {
  border: var(--crml-border-brutal);
  border-radius: var(--crml-radius-lg);
  box-shadow: var(--crml-shadow-brutal);
  overflow: hidden;
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease;
}

.crml-accordion-item:hover {
  transform: translate(-2px, -2px);
  box-shadow: var(--crml-shadow-brutal-lg);
}

.crml-funky-accordion--flush .crml-accordion-item:hover {
  transform: none;
  box-shadow: none;
}

.crml-accordion-header {
  width: 100%;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  font-family: var(--crml-font-heading);
  font-weight: 700;
  color: var(--crt-obsidian);
  cursor: pointer;
  text-align: left;
  outline: none;
}

/* Sizes */
.crml-funky-accordion--sm .crml-accordion-header { padding: 0.75rem 1rem; font-size: 0.875rem; }
.crml-funky-accordion--md .crml-accordion-header { padding: 1.1rem 1.35rem; font-size: 1.0625rem; }
.crml-funky-accordion--lg .crml-accordion-header { padding: 1.35rem 1.5rem; font-size: 1.1875rem; }

.header-title-group {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.item-emoji { font-size: 1.25rem; }
.crml-funky-accordion--sm .item-emoji { font-size: 1rem; }

.item-badge {
  font-family: var(--crml-font-mono);
  font-weight: 800;
  font-size: 0.65rem;
  padding: 0.1rem 0.35rem;
  border: 1.5px solid var(--crt-obsidian);
  border-radius: 4px;
  background-color: var(--crt-pure-white);
}

.crml-accordion-icon {
  font-size: 1.25rem;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  flex-shrink: 0;
}

.crml-accordion-item--expanded .crml-accordion-icon {
  transform: rotate(180deg) scale(1.2);
}

.crml-accordion-content {
  border-top: var(--crml-border-brutal);
  background-color: var(--crml-bg-surface);
  color: var(--crml-text-main);
  font-family: var(--crml-font-body);
  line-height: 1.6;
}

.crml-funky-accordion--sm .crml-accordion-content { padding: 0.75rem 1rem; font-size: 0.8125rem; }
.crml-funky-accordion--md .crml-accordion-content { padding: 1.1rem 1.35rem 1.35rem; font-size: 0.9375rem; }
.crml-funky-accordion--lg .crml-accordion-content { padding: 1.35rem 1.5rem 1.65rem; font-size: 1rem; }

.crml-accordion-item--color-lavender .crml-accordion-header { background-color: var(--crt-lavender); }
.crml-accordion-item--color-peach .crml-accordion-header { background-color: var(--crt-peach); }
.crml-accordion-item--color-mint .crml-accordion-header { background-color: var(--crt-mint); }
.crml-accordion-item--color-lime .crml-accordion-header { background-color: var(--crt-electric-lime); }
.crml-accordion-item--color-cyan .crml-accordion-header { background-color: var(--crt-cyber-cyan); }
.crml-accordion-item--color-yellow .crml-accordion-header { background-color: var(--crt-sunburst-yellow); }
</style>
