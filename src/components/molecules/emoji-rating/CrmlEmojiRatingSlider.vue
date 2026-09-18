<template>
  <div class="crml-emoji-rating">
    <div class="crml-emoji-rating__display">
      <span class="emoji-face">{{ activeEmoji.icon }}</span>
      <span class="emoji-label">{{ activeEmoji.label }}</span>
    </div>

    <input
      type="range"
      min="1"
      max="5"
      step="1"
      :value="modelValue"
      class="crml-emoji-slider"
      @input="handleInput"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

export interface CrmlEmojiRatingSliderProps {
  modelValue?: number;
}

const props = withDefaults(defineProps<CrmlEmojiRatingSliderProps>(), {
  modelValue: 4,
});

const emit = defineEmits<{
  (e: 'update:modelValue', val: number): void;
}>();

const emojiList = [
  { val: 1, icon: '😭', label: 'Biasa Saja / Sedih' },
  { val: 2, icon: '🙁', label: 'Kurang Puas' },
  { val: 3, icon: '😐', label: 'Lumayan' },
  { val: 4, icon: '😃', label: 'Keren Sekali!' },
  { val: 5, icon: '😍', label: 'Luar Biasa / Hype!' },
];

const activeEmoji = computed(() => {
  return emojiList.find((e) => e.val === Number(props.modelValue)) || emojiList[3];
});

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit('update:modelValue', Number(target.value));
};
</script>

<style scoped>
.crml-emoji-rating {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  max-width: 320px;
  font-family: var(--crml-font-heading);
}

.crml-emoji-rating__display {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.emoji-face {
  font-size: 2.75rem;
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  filter: drop-shadow(2px 2px 0px var(--crt-obsidian));
}

.crml-emoji-rating:hover .emoji-face {
  transform: scale(1.15);
}

.emoji-label {
  font-size: 0.875rem;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--crml-text-main);
}

.crml-emoji-slider {
  width: 100%;
  height: 12px;
  background: var(--crt-obsidian);
  border-radius: var(--crml-radius-full);
  outline: none;
  border: 2px solid var(--crml-border-ink, #0D0D0D);
  cursor: pointer;
}

.crml-emoji-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--crml-action-primary);
  border: 3px solid var(--crml-border-ink, #0D0D0D);
  box-shadow: 2px 2px 0px var(--crml-shadow-ink, #0D0D0D);
  cursor: pointer;
  transition: transform 0.15s ease;
}

.crml-emoji-slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
  background: var(--crt-hot-pink);
}
</style>
