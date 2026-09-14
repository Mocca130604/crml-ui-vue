<template>
  <form class="crml-form-group" @submit.prevent="handleSubmit">
    <!-- Header titlebar -->
    <div v-if="title" class="crml-form-header">
      <h3 class="form-title">{{ title }}</h3>
      <p v-if="subtitle" class="form-subtitle">{{ subtitle }}</p>
    </div>

    <!-- Error Summary Alert -->
    <div v-if="errorMessage" class="crml-form-error-alert">
      <span class="alert-icon">⚠️</span>
      <span>{{ errorMessage }}</span>
    </div>

    <!-- Form Body Slot -->
    <div class="crml-form-body">
      <slot />
    </div>

    <!-- Form Footer Actions -->
    <div class="crml-form-actions">
      <slot name="actions">
        <CrmlBouncyButton variant="lime" type="submit" :loading="loading">
          {{ submitText }}
        </CrmlBouncyButton>
        <CrmlBouncyButton v-if="showReset" variant="white" type="button" @click="handleReset">
          {{ resetText }}
        </CrmlBouncyButton>
      </slot>
    </div>
  </form>
</template>

<script setup lang="ts">
import CrmlBouncyButton from '../../atoms/button/CrmlBouncyButton.vue';

export interface CrmlFormGroupProps {
  title?: string;
  subtitle?: string;
  errorMessage?: string;
  submitText?: string;
  resetText?: string;
  showReset?: boolean;
  loading?: boolean;
}

withDefaults(defineProps<CrmlFormGroupProps>(), {
  submitText: 'SUBMIT FORM',
  resetText: 'RESET',
  showReset: true,
  loading: false,
});

const emit = defineEmits<{
  (e: 'submit', event: Event): void;
  (e: 'reset'): void;
}>();

const handleSubmit = (e: Event) => {
  emit('submit', e);
};

const handleReset = () => {
  emit('reset');
};
</script>

<style scoped>
.crml-form-group {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  background-color: var(--crml-bg-surface);
  border: var(--crml-border-brutal);
  border-radius: var(--crml-radius-xl);
  box-shadow: var(--crml-shadow-brutal-lg);
  padding: 1.75rem;
  width: 100%;
  color: var(--crml-text-main);
  font-family: var(--crml-font-body);
}

.crml-form-header {
  border-bottom: var(--crml-border-brutal);
  padding-bottom: 0.85rem;
}

.form-title {
  font-family: var(--crml-font-heading);
  font-size: 1.25rem;
  font-weight: 900;
  text-transform: uppercase;
}

.form-subtitle {
  font-size: 0.85rem;
  color: var(--crml-text-muted);
  margin-top: 0.25rem;
}

.crml-form-error-alert {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1rem;
  background-color: var(--crt-pink-100);
  border: 2px solid var(--crt-hot-pink);
  border-radius: var(--crml-radius-md);
  color: var(--crt-pink-900);
  font-family: var(--crml-font-heading);
  font-weight: 700;
  font-size: 0.85rem;
}

.crml-form-body {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.crml-form-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-top: 0.5rem;
  border-top: 2px dashed var(--crml-border-subtle);
}
</style>
