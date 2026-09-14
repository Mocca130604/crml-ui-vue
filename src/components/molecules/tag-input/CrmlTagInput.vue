<template>
  <div class="crml-tag-input-group">
    <label v-if="label" class="crml-tag-input__label">{{ label }}</label>
    
    <div class="crml-tag-input-box" @click="focusInput">
      <span
        v-for="(tag, index) in tags"
        :key="index"
        class="crml-tag-chip"
      >
        <span class="tag-text">#{{ tag }}</span>
        <button type="button" class="tag-remove" @click.stop="removeTag(index)">✕</button>
      </span>

      <input
        ref="inputRef"
        v-model="inputValue"
        type="text"
        :placeholder="tags.length === 0 ? placeholder : ''"
        class="crml-tag-input-field"
        @keydown.enter.prevent="addTag"
        @keydown.backspace="handleBackspace"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

export interface CrmlTagInputProps {
  modelValue?: string[];
  label?: string;
  placeholder?: string;
}

const props = withDefaults(defineProps<CrmlTagInputProps>(), {
  modelValue: () => ['Y2K', 'Streetwear', 'Neon'],
  placeholder: 'Ketik tag & tekan Enter...',
});

const emit = defineEmits<{
  (e: 'update:modelValue', tags: string[]): void;
}>();

const tags = ref<string[]>([...props.modelValue]);
const inputValue = ref('');
const inputRef = ref<HTMLInputElement | null>(null);

const focusInput = () => {
  inputRef.value?.focus();
};

const addTag = () => {
  const val = inputValue.value.trim();
  if (val && !tags.value.includes(val)) {
    tags.value.push(val);
    emit('update:modelValue', [...tags.value]);
    inputValue.value = '';
  }
};

const removeTag = (index: number) => {
  tags.value.splice(index, 1);
  emit('update:modelValue', [...tags.value]);
};

const handleBackspace = () => {
  if (inputValue.value === '' && tags.value.length > 0) {
    removeTag(tags.value.length - 1);
  }
};
</script>

<style scoped>
.crml-tag-input-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  width: 100%;
  font-family: var(--crml-font-body);
}

.crml-tag-input__label {
  font-size: 0.875rem;
  font-weight: 700;
  font-family: var(--crml-font-heading);
  color: var(--crml-text-main);
}

.crml-tag-input-box {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background-color: var(--crml-bg-surface);
  border: var(--crml-border-brutal);
  border-radius: var(--crml-radius-md);
  box-shadow: var(--crml-shadow-brutal-sm);
  min-height: 2.75rem;
  cursor: text;
}

.crml-tag-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.6rem;
  background-color: var(--crt-electric-lime);
  color: var(--crt-obsidian);
  border: 2px solid var(--crml-border-ink, #0D0D0D);
  border-radius: var(--crml-radius-sm);
  font-family: var(--crml-font-heading);
  font-weight: 800;
  font-size: 0.8125rem;
  box-shadow: 1px 1px 0px var(--crml-shadow-ink, #0D0D0D);
}

.tag-remove {
  background: none;
  border: none;
  font-size: 0.75rem;
  font-weight: 900;
  cursor: pointer;
  color: var(--crt-obsidian);
  padding: 0;
  line-height: 1;
}

.tag-remove:hover {
  color: var(--crt-hot-pink);
}

.crml-tag-input-field {
  flex-grow: 1;
  border: none;
  outline: none;
  background: transparent;
  font-family: var(--crml-font-body);
  font-size: 0.9rem;
  color: var(--crml-text-main);
  min-width: 120px;
}
</style>
