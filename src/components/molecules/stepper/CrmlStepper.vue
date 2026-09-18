<template>
  <div
    :class="[
      'crml-stepper-wrapper font-mono',
      `crml-stepper--${variant}`,
      `crml-stepper--${size}`,
      `crml-stepper--${orientation}`
    ]"
  >
    <div class="stepper-row">
      <template v-for="(step, idx) in steps" :key="step.id || idx">
        <div
          :class="[
            'step-node-item',
            `step-node--${size}`,
            {
              'is-active': idx + 1 === activeStep,
              'is-completed': idx + 1 < activeStep,
              'is-clickable': clickable && !step.disabled,
              'is-disabled': step.disabled
            }
          ]"
          @click="handleStepClick(idx + 1, step)"
        >
          <slot
            name="step"
            :step="step"
            :index="idx"
            :is-active="idx + 1 === activeStep"
            :is-completed="idx + 1 < activeStep"
          >
            <div class="step-icon-box">
              <slot name="icon" :step="step" :index="idx" :is-completed="idx + 1 < activeStep">
                <span v-if="idx + 1 < activeStep && completedIcon" class="step-completed-icon">
                  {{ completedIcon }}
                </span>
                <span v-else-if="step.icon" class="step-icon">{{ step.icon }}</span>
                <span v-else class="step-number">{{ idx + 1 }}</span>
              </slot>
            </div>

            <div class="step-content">
              <slot name="label" :step="step" :index="idx">
                <span class="step-label font-heading">{{ step.label }}</span>
              </slot>
              <slot name="description" :step="step" :index="idx">
                <span v-if="step.description" class="step-desc">{{ step.description }}</span>
              </slot>
            </div>
          </slot>
        </div>

        <slot v-if="idx < steps.length - 1" name="connector" :index="idx" :is-completed="idx + 1 < activeStep">
          <div
            :class="[
              'step-connector',
              `connector--${connectorStyle}`,
              { 'is-completed': idx + 1 < activeStep }
            ]"
          ></div>
        </slot>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface StepItem {
  id?: string
  label: string
  icon?: string
  description?: string
  disabled?: boolean
}

export interface CrmlStepperProps {
  steps?: StepItem[]
  currentStep?: number
  modelValue?: number
  variant?: 'lime' | 'pink' | 'cyan' | 'yellow' | 'obsidian'
  completedVariant?: 'lime' | 'pink' | 'cyan' | 'yellow' | 'obsidian'
  size?: 'sm' | 'md' | 'lg'
  orientation?: 'horizontal' | 'vertical'
  connectorStyle?: 'solid' | 'dashed' | 'dotted'
  completedIcon?: string
  clickable?: boolean
}

const props = withDefaults(defineProps<CrmlStepperProps>(), {
  currentStep: undefined,
  modelValue: undefined,
  variant: 'pink',
  completedVariant: 'lime',
  size: 'md',
  orientation: 'horizontal',
  connectorStyle: 'solid',
  completedIcon: '✓',
  clickable: true,
  steps: () => [
    { id: 'cart', label: 'CART', icon: '🛒', description: 'Review order' },
    { id: 'billing', label: 'BILLING', icon: '💳', description: 'Enter address' },
    { id: 'dispatch', label: 'DISPATCH', icon: '📦', description: 'Confirm shipment' }
  ]
})

const emit = defineEmits<{
  (e: 'update:modelValue', stepIndex: number): void
  (e: 'update:currentStep', stepIndex: number): void
  (e: 'step-click', stepIndex: number, step: StepItem): void
  (e: 'change', stepIndex: number): void
}>()

const activeStep = computed(() => {
  if (props.modelValue !== undefined) return props.modelValue
  if (props.currentStep !== undefined) return props.currentStep
  return 2
})

const handleStepClick = (stepIdx: number, step: StepItem) => {
  if (!props.clickable || step.disabled) return
  emit('update:modelValue', stepIdx)
  emit('update:currentStep', stepIdx)
  emit('step-click', stepIdx, step)
  emit('change', stepIdx)
}
</script>

<style scoped>
.crml-stepper-wrapper {
  width: 100%;
}

.stepper-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  width: 100%;
}

.crml-stepper--vertical .stepper-row {
  flex-direction: column;
  align-items: stretch;
}

.step-node-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--crml-bg-surface, #ffffff);
  border: 2.5px solid var(--crml-border-ink, #0D0D0D);
  border-radius: var(--crml-radius-md, 8px);
  box-shadow: 3px 3px 0px var(--crml-shadow-ink, #0D0D0D);
  user-select: none;
  transition: all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
  font-weight: 800;
  color: var(--crml-text-main, #0d0d0d);
}

.step-node--sm {
  padding: 0.35rem 0.6rem;
  font-size: 0.75rem;
}

.step-node--md {
  padding: 0.5rem 0.85rem;
  font-size: 0.85rem;
}

.step-node--lg {
  padding: 0.65rem 1.1rem;
  font-size: 1rem;
}

.step-node-item.is-clickable {
  cursor: pointer;
}

.step-node-item.is-clickable:hover {
  transform: translate(-1px, -1px);
  box-shadow: 4px 4px 0px var(--crml-shadow-ink, #0D0D0D);
}

.step-node-item.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.step-icon-box {
  display: flex;
  align-items: center;
  justify-content: center;
}

.step-content {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.step-label {
  line-height: 1.1;
}

.step-desc {
  font-size: 0.7em;
  font-weight: 500;
  opacity: 0.75;
}

/* Completed and active variants */
.crml-stepper-wrapper .step-node-item.is-completed {
  background-color: var(--crt-electric-lime, var(--crml-action-primary));
  color: var(--crt-obsidian, #0d0d0d);
}

.crml-stepper--pink .step-node-item.is-active {
  background-color: var(--crt-hot-pink, #ff007f);
  color: #ffffff;
  box-shadow: 4px 4px 0px var(--crml-shadow-ink, #0D0D0D);
  transform: translate(-1px, -1px);
}

.crml-stepper--lime .step-node-item.is-active {
  background-color: var(--crt-electric-lime, var(--crml-action-primary));
  color: var(--crt-obsidian, #0d0d0d);
  box-shadow: 4px 4px 0px var(--crml-shadow-ink, #0D0D0D);
  transform: translate(-1px, -1px);
}

.crml-stepper--cyan .step-node-item.is-active {
  background-color: var(--crt-cyber-cyan, #00f0ff);
  color: var(--crt-obsidian, #0d0d0d);
  box-shadow: 4px 4px 0px var(--crml-shadow-ink, #0D0D0D);
  transform: translate(-1px, -1px);
}

.crml-stepper--yellow .step-node-item.is-active {
  background-color: var(--crt-sunburst-yellow, #ffd600);
  color: var(--crt-obsidian, #0d0d0d);
  box-shadow: 4px 4px 0px var(--crml-shadow-ink, #0D0D0D);
  transform: translate(-1px, -1px);
}

.crml-stepper--obsidian .step-node-item.is-active {
  background-color: var(--crt-obsidian, #0d0d0d);
  color: var(--crt-electric-lime, var(--crml-action-primary));
  box-shadow: 4px 4px 0px var(--crml-shadow-ink, #0D0D0D);
  transform: translate(-1px, -1px);
}

.step-connector {
  flex: 1;
  height: 3px;
  background-color: var(--crt-obsidian, #0d0d0d);
}

.crml-stepper--vertical .step-connector {
  width: 3px;
  height: 1.5rem;
  margin-left: 1.5rem;
  flex: none;
}

.connector--dashed {
  background-color: transparent;
  border-top: 3px dashed var(--crt-obsidian, #0d0d0d);
  height: 0;
}

.connector--dotted {
  background-color: transparent;
  border-top: 3px dotted var(--crt-obsidian, #0d0d0d);
  height: 0;
}
</style>
