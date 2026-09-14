<script setup lang="ts">
import { ref } from 'vue'

export interface CrmlCodeBlockProps {
  code: string
  title?: string
  language?: string
  showCopy?: boolean
}

const props = withDefaults(defineProps<CrmlCodeBlockProps>(), {
  title: 'terminal_v1.0.sh',
  language: 'bash',
  showCopy: true
})

const copied = ref(false)

const copyCode = () => {
  navigator.clipboard.writeText(props.code)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}
</script>

<template>
  <div class="crml-code-block-wrapper">
    <div class="code-header-bar font-mono">
      <div class="title-group">
        <span class="window-dot red"></span>
        <span class="window-dot yellow"></span>
        <span class="window-dot green"></span>
        <span class="code-title">{{ title }}</span>
      </div>
      <button v-if="showCopy" type="button" class="copy-btn font-mono" @click="copyCode">
        {{ copied ? '✓ COPIED!' : '📋 COPY' }}
      </button>
    </div>
    <div class="code-content-area">
      <pre class="code-pre font-mono"><code>{{ code }}</code></pre>
    </div>
  </div>
</template>

<style scoped>
.crml-code-block-wrapper {
  width: 100%;
  border: 2.5px solid var(--crml-border-ink, #0D0D0D);
  border-radius: var(--crml-radius-md, 8px);
  box-shadow: 4px 4px 0px var(--crml-shadow-ink, #0D0D0D);
  background-color: var(--crt-obsidian, #0d0d0d);
  color: var(--crt-electric-lime, #ccff00);
  overflow: hidden;
}

.code-header-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--crt-obsidian, #0d0d0d);
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
  padding: 0.4rem 0.85rem;
  font-size: 0.75rem;
}

.title-group {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.window-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
}

.window-dot.red { background-color: var(--crt-hot-pink, #ff007f); }
.window-dot.yellow { background-color: var(--crt-sunburst-yellow, #ffd600); }
.window-dot.green { background-color: var(--crt-electric-lime, #ccff00); }

.code-title {
  color: var(--crt-cloud, #fcf9f8);
  font-weight: 700;
  margin-left: 0.35rem;
}

.copy-btn {
  background: rgba(255, 255, 255, 0.1);
  color: var(--crt-electric-lime, #ccff00);
  border: 1px solid var(--crt-electric-lime, #ccff00);
  border-radius: 4px;
  padding: 0.15rem 0.5rem;
  font-size: 0.7rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.15s ease;
}

.copy-btn:hover {
  background: var(--crt-electric-lime, #ccff00);
  color: var(--crt-obsidian, #0d0d0d);
}

.code-content-area {
  padding: 0.85rem 1rem;
  overflow-x: auto;
}

.code-pre {
  margin: 0;
  font-size: 0.8rem;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-all;
}
</style>
