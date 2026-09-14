<script setup lang="ts">
import { ref, computed } from 'vue'

export interface CommandItem {
  id: string
  label: string
  category?: string
  icon?: string
  shortcut?: string
}

const props = withDefaults(
  defineProps<{
    open?: boolean
    placeholder?: string
    commands?: CommandItem[]
  }>(),
  {
    open: false,
    placeholder: 'Type a command or search documentation...',
    commands: () => [
      { id: '1', label: 'Go to Atoms Suite', category: 'Navigation', icon: '⚛️', shortcut: '↵ SUB' },
      { id: '2', label: 'Toggle Dark / Light Mode', category: 'Theme', icon: '🌙', shortcut: '⌘T' },
      { id: '3', label: 'Export Figma Tokens JSON', category: 'Export', icon: '📦', shortcut: '⌘E' },
      { id: '4', label: 'Open Release Timeline', category: 'Navigation', icon: '🔥', shortcut: '⌘L' }
    ]
  }
)

const emit = defineEmits<{
  (e: 'update:open', val: boolean): void
  (e: 'select', command: CommandItem): void
}>()

const query = ref('')

const filteredCommands = computed(() => {
  if (!query.value) return props.commands
  const q = query.value.toLowerCase()
  return props.commands.filter(c => c.label.toLowerCase().includes(q) || (c.category && c.category.toLowerCase().includes(q)))
})

const selectCmd = (cmd: CommandItem) => {
  emit('select', cmd)
  emit('update:open', false)
}
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="crml-cmd-backdrop" @click.self="emit('update:open', false)">
      <div class="crml-cmd-palette-box">
        <div class="cmd-input-bar">
          <span class="cmd-icon">⌘</span>
          <input
            v-model="query"
            type="text"
            :placeholder="placeholder"
            class="cmd-input font-body"
            autofocus
          />
          <button type="button" class="cmd-close-btn font-mono" @click="emit('update:open', false)">
            ESC
          </button>
        </div>

        <div class="cmd-list-container">
          <div
            v-for="cmd in filteredCommands"
            :key="cmd.id"
            class="cmd-item-row"
            @click="selectCmd(cmd)"
          >
            <span class="cmd-item-icon">{{ cmd.icon || '⚡' }}</span>
            <div class="cmd-item-info">
              <span class="cmd-item-label font-heading">{{ cmd.label }}</span>
              <span v-if="cmd.category" class="cmd-item-category font-mono">{{ cmd.category }}</span>
            </div>
            <span v-if="cmd.shortcut" class="cmd-shortcut-badge font-mono">{{ cmd.shortcut }}</span>
          </div>

          <div v-if="!filteredCommands.length" class="cmd-empty font-mono">
            NO MATCHING COMMANDS FOUND
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.crml-cmd-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background-color: rgba(13, 13, 13, 0.65);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 10vh;
}

.crml-cmd-palette-box {
  width: 100%;
  max-width: 580px;
  background-color: var(--crml-bg-surface, #ffffff);
  border: 3px solid var(--crt-obsidian, #0d0d0d);
  border-radius: var(--crml-radius-xl, 16px);
  box-shadow: 6px 6px 0px var(--crt-obsidian, #0d0d0d);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.cmd-input-bar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1.15rem;
  border-bottom: 2.5px solid var(--crt-obsidian, #0d0d0d);
  background-color: var(--crt-electric-lime, #ccff00);
}

.cmd-icon {
  font-family: var(--crml-font-mono);
  font-weight: 900;
  font-size: 1.2rem;
}

.cmd-input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  font-size: 1rem;
  font-weight: 700;
  color: var(--crt-obsidian, #0d0d0d);
}

.cmd-close-btn {
  background-color: var(--crml-bg-surface, #ffffff);
  border: 1.5px solid var(--crt-obsidian, #0d0d0d);
  border-radius: 4px;
  padding: 0.2rem 0.5rem;
  font-size: 0.7rem;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 2px 2px 0px var(--crt-obsidian, #0d0d0d);
}

.cmd-list-container {
  display: flex;
  flex-direction: column;
  max-height: 320px;
  overflow-y: auto;
  padding: 0.5rem;
}

.cmd-item-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.65rem 0.85rem;
  border-radius: var(--crml-radius-md, 8px);
  border: 1.5px solid transparent;
  cursor: pointer;
  transition: all 0.15s ease;
}

.cmd-item-row:hover {
  background-color: var(--crt-lime-100, rgba(204, 255, 0, 0.15));
  border-color: var(--crt-obsidian, #0d0d0d);
  box-shadow: 2px 2px 0px var(--crt-obsidian, #0d0d0d);
}

.cmd-item-icon {
  font-size: 1.15rem;
}

.cmd-item-info {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.cmd-item-label {
  font-size: 0.875rem;
  font-weight: 800;
  color: var(--crml-text-main, #0d0d0d);
}

.cmd-item-category {
  font-size: 0.7rem;
  color: var(--crml-text-muted, #757575);
}

.cmd-shortcut-badge {
  background-color: var(--crml-bg-elevated, #e0e0e0);
  border: 1px solid var(--crt-obsidian, #0d0d0d);
  border-radius: 4px;
  padding: 0.15rem 0.4rem;
  font-size: 0.7rem;
  font-weight: 800;
}

.cmd-empty {
  padding: 2rem;
  text-align: center;
  font-size: 0.8rem;
  font-weight: 800;
  color: var(--crml-text-muted, #757575);
}
</style>
