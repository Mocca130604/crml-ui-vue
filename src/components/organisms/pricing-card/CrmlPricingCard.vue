<script setup lang="ts">
import { computed } from 'vue';

export interface PricingFeature {
  text: string
  included: boolean
  icon?: string
  badge?: string
}

export interface CrmlPricingCardProps {
  title?: string
  subtitle?: string
  description?: string
  price?: string | number
  currency?: string
  priceFormatter?: (val: string | number) => string
  period?: string
  popular?: boolean
  badgeText?: string
  features?: (string | PricingFeature)[]
  buttonText?: string
  variant?: 'lime' | 'pink' | 'cyan' | 'yellow'
  ctaVariant?: 'lime' | 'pink' | 'cyan' | 'yellow' | 'obsidian'
  ctaDisabled?: boolean
  checkIcon?: string
  crossIcon?: string
}

const props = withDefaults(defineProps<CrmlPricingCardProps>(), {
  title: 'PRO MECHA TIER',
  subtitle: undefined,
  description: undefined,
  price: '$88.00',
  currency: '',
  period: '/ MONTH',
  popular: true,
  badgeText: 'POPULAR',
  variant: 'pink',
  ctaVariant: undefined,
  ctaDisabled: false,
  checkIcon: '✓',
  crossIcon: '✕',
  buttonText: 'GET PRO MECHA 🚀',
  features: () => [
    { text: 'Full 50 Atomic Design Components', included: true },
    { text: 'TypeScript Declarations & Vite ESM', included: true },
    { text: 'Unlimited Commercial License', included: true },
    { text: 'Figma Tokens Studio Sync', included: true }
  ]
})

const emit = defineEmits<{
  (e: 'select'): void
}>()

const normalizedFeatures = computed<PricingFeature[]>(() => {
  return props.features.map(f => {
    if (typeof f === 'string') {
      return { text: f, included: true }
    }
    return f
  })
})

const displayPrice = computed(() => {
  if (props.priceFormatter) return props.priceFormatter(props.price)
  if (typeof props.price === 'number') {
    return `${props.currency}${props.price.toLocaleString()}`
  }
  return `${props.currency}${props.price}`
})
</script>

<template>
  <div :class="['crml-pricing-card', `variant-${variant}`, { 'is-popular': popular }]">
    <slot name="badge" :badge-text="badgeText" :popular="popular">
      <div v-if="popular && badgeText" class="popular-badge font-mono">
        ★ {{ badgeText }}
      </div>
    </slot>

    <div class="pricing-header">
      <slot name="header" :title="title" :subtitle="subtitle" :description="description">
        <h3 class="plan-title font-heading">
          <slot name="title">{{ title }}</slot>
        </h3>
        <p v-if="subtitle || description" class="plan-description">
          {{ subtitle || description }}
        </p>
      </slot>
      <div class="price-row font-heading">
        <slot name="price" :price="displayPrice" :raw-price="price" :period="period">
          <span class="price-val">{{ displayPrice }}</span>
          <span v-if="period" class="price-period font-mono">{{ period }}</span>
        </slot>
      </div>
    </div>

    <div class="features-list">
      <slot name="features" :features="normalizedFeatures">
        <div v-for="(feat, idx) in normalizedFeatures" :key="idx" class="feature-item">
          <slot name="feature" :feature="feat" :index="idx">
            <span :class="['check-bullet', { 'is-checked': feat.included }]">
              {{ feat.icon ? feat.icon : (feat.included ? checkIcon : crossIcon) }}
            </span>
            <span class="feature-text">{{ feat.text }}</span>
            <span v-if="feat.badge" class="feature-badge">{{ feat.badge }}</span>
          </slot>
        </div>
      </slot>
    </div>

    <slot name="footer" :select="() => emit('select')">
      <button
        type="button"
        :class="['plan-cta-btn font-heading', ctaVariant ? `plan-cta-btn--${ctaVariant}` : '']"
        :disabled="ctaDisabled"
        @click="emit('select')"
      >
        <slot name="button">{{ buttonText }}</slot>
      </button>
    </slot>
  </div>
</template>

<style scoped>
.crml-pricing-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  background-color: var(--crml-bg-surface, #ffffff);
  border: 3px solid var(--crml-border-ink, #0D0D0D);
  border-radius: var(--crml-radius-xl, 16px);
  padding: 1.5rem;
  box-shadow: 4px 4px 0px var(--crml-shadow-ink, #0D0D0D);
  position: relative;
  font-family: var(--crml-font-body);
}

.crml-pricing-card.is-popular {
  border-color: var(--crml-border-ink, #0D0D0D);
  box-shadow: 6px 6px 0px var(--crml-shadow-ink, #0D0D0D);
}

.popular-badge {
  position: absolute;
  top: -0.75rem;
  right: 1.25rem;
  background-color: var(--crt-electric-lime, var(--crml-action-primary));
  color: var(--crt-obsidian, #0d0d0d);
  border: 2px solid var(--crml-border-ink, #0D0D0D);
  border-radius: var(--crml-radius-sm, 4px);
  padding: 0.15rem 0.6rem;
  font-size: 0.7rem;
  font-weight: 900;
  box-shadow: 2px 2px 0px var(--crml-shadow-ink, #0D0D0D);
}

.pricing-header {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.plan-title {
  font-size: 1.15rem;
  font-weight: 900;
  color: var(--crml-text-main, #0d0d0d);
  margin: 0;
}

.price-row {
  display: flex;
  align-items: baseline;
  gap: 0.35rem;
}

.price-val {
  font-size: 2.25rem;
  font-weight: 900;
  color: var(--crt-hot-pink, #ff007f);
  line-height: 1;
}

.price-period {
  font-size: 0.75rem;
  color: var(--crml-text-muted, #757575);
  font-weight: 800;
}

.features-list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.825rem;
  font-weight: 700;
  color: var(--crml-text-main, #0d0d0d);
}

.check-bullet {
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 4px;
  border: 1.5px solid var(--crml-border-ink, #0D0D0D);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 900;
  background-color: var(--crml-bg-elevated, #e0e0e0);
}

.check-bullet.is-checked {
  background-color: var(--crt-electric-lime, var(--crml-action-primary));
  color: var(--crt-obsidian, #0d0d0d) !important;
}

.plan-cta-btn {
  font-size: 0.9rem;
  font-weight: 900;
  text-transform: uppercase;
  background-color: var(--crt-electric-lime, var(--crml-action-primary));
  color: var(--crt-obsidian, #0d0d0d);
  border: 2.5px solid var(--crml-border-ink, #0D0D0D);
  border-radius: var(--crml-radius-md, 8px);
  padding: 0.65rem 1rem;
  cursor: pointer;
  box-shadow: 3px 3px 0px var(--crml-shadow-ink, #0D0D0D);
  transition: all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
  margin-top: 0.5rem;
}

.plan-description {
  font-size: 0.8rem;
  color: var(--crml-text-muted, #757575);
  margin: 0;
  font-weight: 500;
}

.feature-badge {
  margin-left: auto;
  font-size: 0.65rem;
  font-family: var(--crml-font-mono, monospace);
  font-weight: 800;
  padding: 0.1rem 0.35rem;
  border-radius: 3px;
  background-color: var(--crml-bg-elevated, #0d0d0d);
  color: var(--crt-electric-lime, var(--crml-action-primary));
  border: 1px solid var(--crml-border-ink, #0d0d0d);
}

.plan-cta-btn:hover {
  transform: translate(-2px, -2px);
  box-shadow: 5px 5px 0px var(--crml-shadow-ink, #0D0D0D);
}

.plan-cta-btn:active {
  transform: translate(1px, 1px);
  box-shadow: 1px 1px 0px var(--crml-shadow-ink, #0D0D0D);
}

.plan-cta-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
  transform: none;
  box-shadow: 2px 2px 0px var(--crml-shadow-ink, #0D0D0D);
}

.plan-cta-btn--lime { background-color: var(--crt-electric-lime, var(--crml-action-primary)); color: var(--crt-obsidian, #0d0d0d) !important; }
.plan-cta-btn--pink { background-color: var(--crt-hot-pink, #ff007f); color: #fff !important; }
.plan-cta-btn--cyan { background-color: var(--crt-cyber-cyan, #00f0ff); color: var(--crt-obsidian, #0d0d0d) !important; }
.plan-cta-btn--yellow { background-color: var(--crt-sunburst-yellow, #ffd600); color: var(--crt-obsidian, #0d0d0d) !important; }
.plan-cta-btn--obsidian { background-color: var(--crt-obsidian, #0d0d0d); color: var(--crt-electric-lime, var(--crml-action-primary)) !important; }
</style>
