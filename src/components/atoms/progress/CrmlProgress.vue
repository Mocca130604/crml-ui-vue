<template>
  <div class="crml-progress-group">
    <div v-if="showValue || label" class="crml-progress-header">
      <span v-if="label" class="crml-progress-label">{{ label }}</span>
      <span v-if="showValue" class="crml-progress-value">
        <slot name="value" :value="value" :max="max">
          {{ formatDisplay(value) }}
        </slot>
      </span>
    </div>

    <div :class="['crml-progress-track', `crml-progress-track--${size}`]">
      <div
        :class="[
          'crml-progress-fill',
          `crml-progress-fill--${variant}`,
          {
            'crml-progress-fill--striped': striped,
            'crml-progress-fill--animated': animated
          }
        ]"
        :style="{ width: `${Math.min(100, Math.max(0, (value / max) * 100))}%` }"
      ></div>
    </div>

    <div v-if="helperText || showMinMax" class="crml-progress-footer">
      <span v-if="helperText" class="crml-progress-helper">{{ helperText }}</span>
      <div v-if="showMinMax" class="crml-progress-minmax">
        <span>{{ formatDisplay(0) }}</span>
        <span>{{ formatDisplay(max) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface CrmlProgressProps {
  /** Current value */
  value: number;
  /** Maximum value (default 100) */
  max?: number;
  /** Label text */
  label?: string;
  /** Helper text below bar */
  helperText?: string;
  /** Show value display */
  showValue?: boolean;
  /** Show min/max markers */
  showMinMax?: boolean;
  /** Color variant */
  variant?: 'blue' | 'primary' | 'lime' | 'pink' | 'cyan' | 'yellow' | 'grad-y2k' | 'grad-acid';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Show stripe pattern */
  striped?: boolean;
  /** Animate stripes */
  animated?: boolean;
  /** Value suffix text (e.g. '%', 'MB', 'pts') */
  valueSuffix?: string;
  /** Custom format function for displayed value */
  formatValue?: (value: number) => string;
}

const props = withDefaults(defineProps<CrmlProgressProps>(), {
  value: 0,
  max: 100,
  showValue: true,
  showMinMax: false,
  variant: 'lime',
  size: 'md',
  striped: false,
  animated: false,
  valueSuffix: '%',
});

const formatDisplay = (val: number) => {
  if (props.formatValue) return props.formatValue(val);
  if (props.valueSuffix === '%') return `${Math.round((val / props.max) * 100)}%`;
  return `${val}${props.valueSuffix}`;
};
</script>

<style scoped>
.crml-progress-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  width: 100%;
  font-family: var(--crml-font-heading);
}

.crml-progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  color: var(--crml-text-main);
}

.crml-progress-header { font-size: 0.8125rem; }

.crml-progress-track {
  width: 100%;
  background-color: var(--crml-bg-surface);
  border: var(--crml-border-brutal);
  border-radius: var(--crml-radius-full);
  box-shadow: 2px 2px 0px var(--crml-shadow-ink, #0D0D0D);
  overflow: hidden;
  padding: 2px;
}

.crml-progress-track--sm { height: 1rem; }
.crml-progress-track--md { height: 1.5rem; }
.crml-progress-track--lg { height: 2rem; }

.crml-progress-fill {
  height: 100%;
  border-radius: var(--crml-radius-full);
  transition: width 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  border: 1px solid var(--crml-border-ink, #0D0D0D);
}

.crml-progress-fill--lime { background-color: var(--crml-action-primary); }
.crml-progress-fill--pink { background-color: var(--crt-hot-pink); }
.crml-progress-fill--cyan { background-color: var(--crt-cyber-cyan); }
.crml-progress-fill--yellow { background-color: var(--crt-sunburst-yellow); }
.crml-progress-fill--grad-y2k { background: var(--grad-y2k-sunset); }
.crml-progress-fill--grad-acid { background: var(--grad-lime-acid); }

.crml-progress-fill--striped {
  background-image: linear-gradient(
    45deg,
    rgba(13, 13, 13, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(13, 13, 13, 0.15) 50%,
    rgba(13, 13, 13, 0.15) 75%,
    transparent 75%,
    transparent
  );
  background-size: 1rem 1rem;
}

.crml-progress-fill--animated {
  animation: progress-stripe-move 1s linear infinite;
}

@keyframes progress-stripe-move {
  0% { background-position: 0 0; }
  100% { background-position: 1rem 0; }
}

.crml-progress-footer {
  display: flex;
  justify-content: space-between;
  font-size: 0.7rem;
  color: var(--crml-text-muted);
  font-family: var(--crml-font-mono);
  font-weight: 700;
}

.crml-progress-helper {
  font-family: var(--crml-font-body);
  font-weight: 500;
}

.crml-progress-minmax {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>
