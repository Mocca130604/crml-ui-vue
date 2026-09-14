<script setup lang="ts">
import { ref } from 'vue'

export interface CrmlAiPromptInputProps {
  modelValue?: string
  selectedModel?: string
  maxTokens?: number
}

const props = withDefaults(defineProps<CrmlAiPromptInputProps>(), {
  modelValue: '',
  selectedModel: 'gpt4',
  maxTokens: 2048
})

const emit = defineEmits<{
  (e: 'update:modelValue', val: string): void
  (e: 'update:selectedModel', model: string): void
  (e: 'generate', prompt: string, model: string): void
}>()

const promptText = ref(props.modelValue)
const currentModel = ref(props.selectedModel)

const models = [
  { id: 'gpt4', label: 'GPT-4o' },
  { id: 'claude', label: 'Claude 3.5' },
  { id: 'gemini', label: 'Gemini 1.5' }
]

const handleGenerate = () => {
  emit('generate', promptText.value, currentModel.value)
}
</script>

<template>
  <div class="crml-ai-prompt-studio">
    <div class="model-pills-row font-mono">
      <span class="studio-tag">AI MODEL:</span>
      <button
        v-for="m in models"
        :key="m.id"
        type="button"
        :class="['model-pill', { 'is-active': m.id === currentModel }]"
        @click="currentModel = m.id"
      >
        {{ m.label }}
      </button>

      <span class="token-meter-chip">
        {{ promptText.length }} / {{ maxTokens }} TOKENS
      </span>
    </div>

    <div class="prompt-input-wrapper">
      <textarea
        v-model="promptText"
        class="prompt-textarea font-body"
        placeholder="Ask AI studio to generate code, components, or zine vectors..."
        rows="2"
      ></textarea>
      <button type="button" class="generate-action-btn font-heading" @click="handleGenerate">
        GENERATE ⚡
      </button>
    </div>
  </div>
</template>

<style scoped>
.crml-ai-prompt-studio {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  width: 100%;
  background-color: var(--crml-bg-surface, #ffffff);
  border: 3px solid var(--crml-border-ink, #0D0D0D);
  border-radius: var(--crml-radius-xl, 16px);
  padding: 1rem;
  box-shadow: 4px 4px 0px var(--crml-shadow-ink, #0D0D0D);
  font-family: var(--crml-font-body);
}

.model-pills-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  font-size: 0.725rem;
}

.studio-tag {
  font-weight: 900;
  color: var(--crml-text-muted, #757575);
}

.model-pill {
  font-family: var(--crml-font-mono);
  font-weight: 800;
  font-size: 0.725rem;
  padding: 0.2rem 0.55rem;
  border: 1.5px solid var(--crml-border-ink, #0D0D0D);
  border-radius: 4px;
  background-color: var(--crml-bg-surface, #ffffff);
  color: var(--crml-text-main, #0d0d0d);
  cursor: pointer;
  box-shadow: 2px 2px 0px var(--crml-shadow-ink, #0D0D0D);
}

.model-pill.is-active {
  background-color: var(--crt-hot-pink, #ff007f);
  color: #ffffff;
}

.token-meter-chip {
  margin-left: auto;
  font-weight: 800;
  color: var(--crml-text-muted, #757575);
}

.prompt-input-wrapper {
  display: flex;
  gap: 0.65rem;
  align-items: flex-end;
}

.prompt-textarea {
  flex: 1;
  border: 2px solid var(--crml-border-ink, #0D0D0D);
  border-radius: var(--crml-radius-md, 8px);
  padding: 0.65rem;
  font-size: 0.85rem;
  font-weight: 600;
  outline: none;
  resize: none;
  background-color: var(--crml-bg-elevated, #f8f8f8);
}

.prompt-textarea:focus {
  background-color: var(--crml-bg-surface);
  border-color: var(--crml-border-ink, #0D0D0D);
  box-shadow: 3px 3px 0px var(--crt-hot-pink, #ff007f);
}

.generate-action-btn {
  font-size: 0.85rem;
  font-weight: 900;
  background-color: var(--crt-electric-lime, #ccff00);
  color: var(--crt-obsidian, #0d0d0d);
  border: 2.5px solid var(--crml-border-ink, #0D0D0D);
  border-radius: var(--crml-radius-md, 8px);
  padding: 0.65rem 1rem;
  cursor: pointer;
  box-shadow: 3px 3px 0px var(--crml-shadow-ink, #0D0D0D);
  transition: all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
  white-space: nowrap;
}

.generate-action-btn:hover {
  transform: translate(-1px, -1px);
  box-shadow: 4px 4px 0px var(--crml-shadow-ink, #0D0D0D);
}
</style>
