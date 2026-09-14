<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    placeholder?: string
    title?: string
  }>(),
  {
    modelValue: '<b>CRML - UI</b> Rich Text Editor engine initialized with <i>zero ambient blur</i> and <u>tactile physical controls</u>!',
    placeholder: 'Type your rich content here...',
    title: 'EDITOR_V1.0.TXT'
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const editorRef = ref<HTMLDivElement | null>(null)
const currentHtml = ref(props.modelValue || '')
const activeMode = ref<'visual' | 'code'>('visual')

const wordCount = computed(() => {
  const plain = (currentHtml.value || '').replace(/<[^>]*>/g, ' ').trim()
  return plain ? plain.split(/\s+/).length : 0
})

const charCount = computed(() => {
  return (currentHtml.value || '').replace(/<[^>]*>/g, '').length
})

onMounted(() => {
  if (editorRef.value) {
    editorRef.value.innerHTML = props.modelValue || ''
  }
})

watch(
  () => props.modelValue,
  (newVal) => {
    const val = newVal || ''
    if (currentHtml.value !== val) {
      currentHtml.value = val
    }
    if (editorRef.value && editorRef.value.innerHTML !== val) {
      editorRef.value.innerHTML = val
    }
  }
)

watch(activeMode, (newMode) => {
  if (newMode === 'visual' && editorRef.value) {
    editorRef.value.innerHTML = currentHtml.value
  }
})

function format(command: string, value: string | undefined = undefined) {
  document.execCommand(command, false, value)
  if (editorRef.value) {
    currentHtml.value = editorRef.value.innerHTML
    emit('update:modelValue', currentHtml.value)
  }
}

function handleInput() {
  if (editorRef.value) {
    currentHtml.value = editorRef.value.innerHTML
    emit('update:modelValue', currentHtml.value)
  }
}

function clearContent() {
  currentHtml.value = ''
  if (editorRef.value) editorRef.value.innerHTML = ''
  emit('update:modelValue', '')
}
</script>

<template>
  <div class="crml-rich-text-editor font-mono">
    <!-- Header Titlebar -->
    <div class="editor-header">
      <div class="header-left">
        <span class="editor-dot"></span>
        <span class="editor-title font-heading">{{ title }}</span>
      </div>

      <div class="header-right">
        <span class="count-pill">{{ wordCount }} WORDS</span>
        <span class="count-pill highlight">{{ charCount }} CHARS</span>
        <button
          class="mode-toggle-btn"
          @click="activeMode = activeMode === 'visual' ? 'code' : 'visual'"
        >
          {{ activeMode === 'visual' ? '📄 HTML' : '👁️ VISUAL' }}
        </button>
      </div>
    </div>

    <!-- Formatting Toolbar -->
    <div class="editor-toolbar" v-if="activeMode === 'visual'">
      <div class="toolbar-group">
        <button class="tool-btn" title="Bold" @click="format('bold')"><b>B</b></button>
        <button class="tool-btn" title="Italic" @click="format('italic')"><i>I</i></button>
        <button class="tool-btn" title="Underline" @click="format('underline')"><u>U</u></button>
        <button class="tool-btn" title="Strikethrough" @click="format('strikeThrough')"><s>S</s></button>
      </div>

      <div class="toolbar-divider"></div>

      <div class="toolbar-group">
        <button class="tool-btn" title="Heading 1" @click="format('formatBlock', '<h1>')">H1</button>
        <button class="tool-btn" title="Heading 2" @click="format('formatBlock', '<h2>')">H2</button>
        <button class="tool-btn" title="Paragraph" @click="format('formatBlock', '<p>')">P</button>
      </div>

      <div class="toolbar-divider"></div>

      <div class="toolbar-group">
        <button class="tool-btn" title="Bullet List" @click="format('insertUnorderedList')">• List</button>
        <button class="tool-btn" title="Numbered List" @click="format('insertOrderedList')">1. List</button>
        <button class="tool-btn" title="Quote" @click="format('formatBlock', '<blockquote>')">“ Quote</button>
      </div>

      <div class="toolbar-divider"></div>

      <div class="toolbar-group">
        <button class="tool-btn danger" title="Clear Content" @click="clearContent">🧹 Clear</button>
      </div>
    </div>

    <!-- Editable Content Area (Visual Mode) -->
    <div
      v-show="activeMode === 'visual'"
      ref="editorRef"
      class="editor-content-area"
      contenteditable="true"
      :data-placeholder="placeholder"
      @input="handleInput"
    ></div>

    <!-- Raw HTML Code Editor (Code Mode) -->
    <textarea
      v-show="activeMode === 'code'"
      v-model="currentHtml"
      class="editor-code-area font-mono"
      @input="emit('update:modelValue', currentHtml)"
    ></textarea>

    <!-- Footer Action Bar -->
    <div class="editor-footer">
      <span class="status-indicator">● TACTILE RICH EDITOR READY</span>
      <span class="mode-tag">{{ activeMode.toUpperCase() }} MODE ACTIVE</span>
    </div>
  </div>
</template>

<style scoped>
.crml-rich-text-editor {
  background: var(--crml-bg-surface, #ffffff);
  border: 3px solid var(--crml-border-ink, #0D0D0D);
  border-radius: var(--crml-radius-lg, 12px);
  box-shadow: 4px 4px 0px var(--crml-shadow-ink, #0D0D0D);
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
}

.editor-header {
  background: var(--crt-obsidian, #0d0d0d);
  color: #ffffff;
  padding: 8px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.editor-dot {
  width: 10px;
  height: 10px;
  background: var(--crt-electric-lime, #ccff00);
  border: 1px solid #000;
  border-radius: 50%;
}

.editor-title {
  font-weight: 900;
  font-size: 12px;
  letter-spacing: 0.5px;
  color: var(--crt-electric-lime, #ccff00);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 6px;
}

.count-pill {
  background: var(--crml-bg-elevated);
  color: #fff;
  border: 1.5px solid var(--crml-border-subtle);
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 9.5px;
  font-weight: 800;
}

.count-pill.highlight {
  background: var(--crt-hot-pink, #ff007f);
  border-color: var(--crml-border-ink, #0D0D0D);
  color: #fff;
}

.mode-toggle-btn {
  background: var(--crt-cyber-cyan, #00f0ff);
  color: var(--crt-obsidian, #0d0d0d);
  border: 1.5px solid var(--crml-border-ink, #000);
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 900;
  font-size: 10px;
  cursor: pointer;
  box-shadow: 1.5px 1.5px 0px var(--crml-shadow-ink, #000);
}

.editor-toolbar {
  background: var(--crml-bg-elevated, #f4f4f5);
  border-bottom: 2.5px solid var(--crml-border-ink, #0D0D0D);
  padding: 6px 10px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
}

.toolbar-group {
  display: flex;
  gap: 4px;
}

.toolbar-divider {
  width: 2px;
  height: 20px;
  background: var(--crt-obsidian, #0d0d0d);
  margin: 0 2px;
}

.tool-btn {
  background: var(--crml-bg-surface);
  border: 2px solid var(--crml-border-ink, #0D0D0D);
  border-radius: 4px;
  padding: 3px 8px;
  font-size: 11px;
  font-weight: 900;
  font-family: monospace;
  cursor: pointer;
  box-shadow: 2px 2px 0px var(--crml-shadow-ink, #0D0D0D);
  transition: transform 0.05s ease, background-color 0.1s ease;
}

.tool-btn:hover {
  background: var(--crt-electric-lime, #ccff00);
  transform: translate(-1px, -1px);
}

.tool-btn:active {
  transform: translate(1px, 1px);
  box-shadow: 0.5px 0.5px 0px var(--crml-shadow-ink, #0D0D0D);
}

.tool-btn.danger:hover {
  background: var(--crt-hot-pink, #ff007f);
  color: #fff;
}

.editor-content-area {
  min-height: 140px;
  padding: 14px;
  font-family: inherit;
  font-size: 13px;
  line-height: 1.5;
  color: var(--crml-text-main, #0d0d0d);
  outline: none;
  background: var(--crml-bg-surface);
}

.editor-content-area[data-placeholder]:empty::before {
  content: attr(data-placeholder);
  color: var(--crml-text-muted);
  pointer-events: none;
}

.editor-code-area {
  min-height: 140px;
  padding: 14px;
  font-size: 12px;
  line-height: 1.4;
  border: none;
  background: var(--crml-bg-input, #1e1e1e);
  color: #00f0ff;
  outline: none;
  resize: vertical;
}

.editor-footer {
  background: var(--crml-bg-elevated, #f4f4f5);
  border-top: 2px solid var(--crml-border-ink, #0D0D0D);
  padding: 6px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 10px;
  font-weight: 800;
}

.status-indicator {
  color: #2ed573;
}

.mode-tag {
  background: var(--crt-sunburst-yellow, #ffd600);
  color: var(--crt-obsidian, #0d0d0d);
  border: 1px solid #000;
  padding: 1px 6px;
  border-radius: 3px;
}
</style>
