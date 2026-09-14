<script setup lang="ts">
import { computed } from 'vue';

export interface CrmlPriceTagWidgetProps {
  /** Product/item title */
  title?: string;
  /** Price amount (number or formatted string) */
  price?: string | number;
  /** Custom price formatter */
  priceFormatter?: (val: string | number) => string;
  /** Currency symbol */
  currency?: string;
  /** Price suffix text */
  priceSuffix?: string;
  /** Badge/tag label */
  badgeText?: string;
  /** Current stock quantity */
  stockCurrent?: number;
  /** Total stock quantity */
  stockTotal?: number;
  /** Stock section label */
  stockLabel?: string;
  /** Stock remaining unit text */
  stockUnit?: string;
  /** CTA button text */
  buttonText?: string;
  /** Color variant */
  variant?: 'lime' | 'pink' | 'cyan' | 'yellow';
  /** Show stock indicator */
  showStock?: boolean;
  /** Show badge */
  showBadge?: boolean;
  /** Disabled state */
  disabled?: boolean;
}

const props = withDefaults(defineProps<CrmlPriceTagWidgetProps>(), {
  title: 'SPECIAL EDITION ZINE ISSUE #03',
  price: '128.40',
  currency: '$',
  priceSuffix: '/ COPY',
  badgeText: 'LIMITED DROP',
  stockCurrent: 42,
  stockTotal: 100,
  stockLabel: 'STOCK AVAILABILITY',
  stockUnit: 'LEFT',
  buttonText: 'GET IT NOW ⚡',
  variant: 'lime',
  showStock: true,
  showBadge: true,
  disabled: false,
})

const emit = defineEmits<{
  (e: 'buy'): void
}>()

const displayPrice = computed(() => {
  if (props.priceFormatter) return props.priceFormatter(props.price);
  if (typeof props.price === 'number') {
    return props.price.toLocaleString();
  }
  return props.price;
});
</script>

<template>
  <div :class="['crml-price-tag-widget', `crml-price-tag-widget--${variant}`, { 'crml-price-tag-widget--disabled': disabled }]">
    <div class="widget-header-row">
      <span class="widget-title">
        <slot name="title">{{ title }}</slot>
      </span>
      <span v-if="showBadge && badgeText" :class="['widget-badge', `widget-badge--${variant}`]">
        <slot name="badge">{{ badgeText }}</slot>
      </span>
    </div>

    <div class="price-display-row">
      <slot name="price" :price="displayPrice" :raw-price="price" :currency="currency">
        <span class="price-currency">{{ currency }}</span>
        <span class="price-amount">{{ displayPrice }}</span>
        <span v-if="priceSuffix" class="price-suffix">{{ priceSuffix }}</span>
      </slot>
    </div>

    <div v-if="showStock" class="stock-indicator-group">
      <div class="stock-info">
        <span>{{ stockLabel }}</span>
        <span>{{ stockCurrent }}/{{ stockTotal }} {{ stockUnit }}</span>
      </div>
      <div class="stock-track">
        <div :class="['stock-fill', `stock-fill--${variant}`]" :style="{ width: `${(stockCurrent / stockTotal) * 100}%` }"></div>
      </div>
    </div>

    <slot name="extra" />

    <button
      type="button"
      :class="['buy-now-btn', `buy-now-btn--${variant}`]"
      :disabled="disabled"
      @click="emit('buy')"
    >
      <slot name="button">{{ buttonText }}</slot>
    </button>
  </div>
</template>

<style scoped>
.crml-price-tag-widget {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  width: 100%;
  background-color: var(--crml-bg-surface);
  border: var(--crml-border-brutal);
  border-radius: var(--crml-radius-lg);
  padding: 1.25rem;
  box-shadow: var(--crml-shadow-brutal);
  font-family: var(--crml-font-body);
}

.crml-price-tag-widget--disabled { opacity: 0.6; pointer-events: none; }

.widget-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.widget-title {
  font-family: var(--crml-font-heading);
  font-weight: 800;
  font-size: 0.8rem;
  color: var(--crml-text-muted);
  text-transform: uppercase;
}

.widget-badge {
  font-family: var(--crml-font-mono);
  font-weight: 800;
  font-size: 0.7rem;
  padding: 0.15rem 0.45rem;
  border: 1.5px solid var(--crml-border-ink, #0D0D0D);
  border-radius: var(--crml-radius-sm);
}

.widget-badge--lime { background-color: var(--crt-electric-lime); color: var(--crt-obsidian); }
.widget-badge--pink { background-color: var(--crt-hot-pink); color: var(--crt-pure-white); }
.widget-badge--cyan { background-color: var(--crt-cyber-cyan); color: var(--crt-obsidian); }
.widget-badge--yellow { background-color: var(--crt-sunburst-yellow); color: var(--crt-obsidian); }

.price-display-row {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
  margin: 0.15rem 0;
}

.price-currency {
  font-family: var(--crml-font-heading);
  font-size: 1.75rem;
  font-weight: 900;
}

.crml-price-tag-widget--lime .price-currency { color: var(--crt-electric-lime); }
.crml-price-tag-widget--pink .price-currency { color: var(--crt-hot-pink); }
.crml-price-tag-widget--cyan .price-currency { color: var(--crt-cyber-cyan); }
.crml-price-tag-widget--yellow .price-currency { color: var(--crt-sunburst-yellow); }

.price-amount {
  font-family: var(--crml-font-heading);
  font-size: 2.75rem;
  font-weight: 900;
  letter-spacing: -0.03em;
  color: var(--crml-text-main);
  line-height: 1;
}

.price-suffix {
  font-family: var(--crml-font-mono);
  font-size: 0.75rem;
  color: var(--crml-text-muted);
  font-weight: 700;
}

.stock-indicator-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.stock-info {
  display: flex;
  justify-content: space-between;
  font-family: var(--crml-font-mono);
  font-weight: 800;
  font-size: 0.7rem;
  color: var(--crml-text-muted);
}

.stock-track {
  height: 10px;
  background-color: var(--crml-bg-elevated, #e0e0e0);
  border: 2px solid var(--crml-border-ink, #0D0D0D);
  border-radius: var(--crml-radius-sm);
  overflow: hidden;
}

.stock-fill {
  height: 100%;
  border-right: 1px solid var(--crml-border-ink, #0D0D0D);
}

.stock-fill--lime { background-color: var(--crt-electric-lime); }
.stock-fill--pink { background-color: var(--crt-hot-pink); }
.stock-fill--cyan { background-color: var(--crt-cyber-cyan); }
.stock-fill--yellow { background-color: var(--crt-sunburst-yellow); }

.buy-now-btn {
  font-family: var(--crml-font-heading);
  font-weight: 900;
  font-size: 0.9rem;
  text-transform: uppercase;
  border: var(--crml-border-brutal);
  border-radius: var(--crml-radius-md);
  padding: 0.65rem 1rem;
  cursor: pointer;
  box-shadow: 3px 3px 0px var(--crml-shadow-ink, #0D0D0D);
  transition: all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
  margin-top: 0.25rem;
}

.buy-now-btn--lime { background-color: var(--crt-electric-lime); color: var(--crt-obsidian); }
.buy-now-btn--pink { background-color: var(--crt-hot-pink); color: var(--crt-pure-white); }
.buy-now-btn--cyan { background-color: var(--crt-cyber-cyan); color: var(--crt-obsidian); }
.buy-now-btn--yellow { background-color: var(--crt-sunburst-yellow); color: var(--crt-obsidian); }

.buy-now-btn:hover { transform: translate(-2px, -2px); box-shadow: 5px 5px 0px var(--crml-shadow-ink, #0D0D0D); }
.buy-now-btn:active { transform: translate(1px, 1px); box-shadow: 1px 1px 0px var(--crml-shadow-ink, #0D0D0D); }
.buy-now-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
</style>
