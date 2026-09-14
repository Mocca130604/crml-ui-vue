<script setup lang="ts">
export interface CrmlKanbanCardProps {
  /** Task title */
  title?: string;
  /** Task description */
  description?: string;
  /** Priority level */
  priority?: 'P0' | 'P1' | 'P2' | 'P3';
  /** Task tag/ID */
  tag?: string;
  /** Assignee avatars (emoji or text) */
  assignees?: string[];
  /** Status label text */
  statusLabel?: string;
  /** Status variant for color */
  statusVariant?: 'progress' | 'done' | 'review' | 'blocked' | 'todo';
  /** Show drag handle */
  showDragHandle?: boolean;
  /** Due date text */
  dueDate?: string;
  /** Custom priority label (overrides priority code) */
  priorityLabel?: string;
  /** Color variant for card accent */
  variant?: 'default' | 'lime' | 'pink' | 'cyan' | 'yellow';
}

withDefaults(defineProps<CrmlKanbanCardProps>(), {
  title: 'Task Title',
  priority: 'P1',
  tag: 'TASK-001',
  statusLabel: 'IN PROGRESS',
  statusVariant: 'progress',
  showDragHandle: true,
  variant: 'default',
  assignees: () => ['⚡']
})

const emit = defineEmits<{
  (e: 'click'): void;
  (e: 'priority-click', priority: string): void;
  (e: 'status-click', status: string): void;
}>()
</script>

<template>
  <div
    :class="['crml-kanban-card', `crml-kanban-card--${variant}`]"
    @click="emit('click')"
  >
    <div class="card-drag-bar">
      <span v-if="showDragHandle" class="drag-handle-dots">:::</span>
      <span v-if="tag" class="task-id font-mono">{{ tag }}</span>
      <span
        v-if="priority || priorityLabel"
        :class="['priority-badge font-mono', `priority-${priority}`]"
        @click.stop="emit('priority-click', priority || '')"
      >{{ priorityLabel || priority }}</span>
    </div>

    <h4 class="task-title font-heading">
      <slot name="title">{{ title }}</slot>
    </h4>

    <p v-if="description || $slots.description" class="task-description">
      <slot name="description">{{ description }}</slot>
    </p>

    <div class="card-footer-row font-mono">
      <div class="assignee-stack">
        <slot name="assignees">
          <span v-for="(avatar, i) in assignees" :key="i" class="stack-avatar">{{ avatar }}</span>
        </slot>
      </div>

      <div class="footer-right">
        <span v-if="dueDate" class="due-date-chip">{{ dueDate }}</span>
        <span
          :class="['card-action-chip', `status-${statusVariant}`]"
          @click.stop="emit('status-click', statusLabel || '')"
        >
          <slot name="status">{{ statusLabel }}</slot>
        </span>
      </div>
    </div>

    <div v-if="$slots.footer" class="card-extra-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped>
.crml-kanban-card {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  width: 100%;
  background-color: var(--crml-bg-surface, #ffffff);
  border: 2.5px solid var(--crt-obsidian, #0d0d0d);
  border-radius: var(--crml-radius-md, 8px);
  padding: 0.85rem;
  box-shadow: 3px 3px 0px var(--crt-obsidian, #0d0d0d);
  cursor: grab;
  transition: all 0.15s ease;
}

.crml-kanban-card:hover {
  transform: translate(-1px, -1px);
  box-shadow: 4px 4px 0px var(--crt-obsidian, #0d0d0d);
}

/* Card accent variants */
.crml-kanban-card--lime { border-left: 5px solid var(--crt-electric-lime); }
.crml-kanban-card--pink { border-left: 5px solid var(--crt-hot-pink); }
.crml-kanban-card--cyan { border-left: 5px solid var(--crt-cyber-cyan); }
.crml-kanban-card--yellow { border-left: 5px solid var(--crt-sunburst-yellow); }

.card-drag-bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.drag-handle-dots {
  font-family: var(--crml-font-mono);
  font-weight: 900;
  color: var(--crml-text-muted, #757575);
  letter-spacing: -1px;
}

.task-id {
  font-size: 0.7rem;
  font-weight: 800;
  color: var(--crml-text-muted, #757575);
}

.priority-badge {
  margin-left: auto;
  font-size: 0.65rem;
  font-weight: 900;
  padding: 0.1rem 0.4rem;
  border: 1.5px solid var(--crt-obsidian, #0d0d0d);
  border-radius: 4px;
  cursor: pointer;
}

.priority-P0 { background-color: var(--crt-hot-pink, #ff007f); color: #ffffff; }
.priority-P1 { background-color: var(--crt-sunburst-yellow, #ffd600); color: var(--crml-text-on-accent, #0d0d0d); }
.priority-P2 { background-color: var(--crt-electric-lime, #ccff00); color: var(--crml-text-on-accent, #0d0d0d); }
.priority-P3 { background-color: var(--crml-bg-elevated, #e0e0e0); color: var(--crml-text-main, #0d0d0d); }

.task-title {
  font-size: 0.875rem;
  font-weight: 800;
  line-height: 1.35;
  color: var(--crml-text-main, #0d0d0d);
  margin: 0;
}

.task-description {
  font-size: 0.75rem;
  color: var(--crml-text-muted);
  line-height: 1.4;
  margin: 0;
  font-family: var(--crml-font-body);
}

.card-footer-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.25rem;
  gap: 0.5rem;
}

.footer-right {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.assignee-stack {
  display: flex;
  align-items: center;
}

.stack-avatar {
  width: 1.35rem;
  height: 1.35rem;
  border-radius: 50%;
  border: 1.5px solid var(--crt-obsidian, #0d0d0d);
  background-color: var(--crt-electric-lime, #ccff00);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  margin-left: -0.35rem;
}
.stack-avatar:first-child { margin-left: 0; }

.due-date-chip {
  font-size: 0.6rem;
  font-weight: 800;
  padding: 0.1rem 0.35rem;
  border: 1px solid var(--crt-obsidian);
  border-radius: 4px;
  color: var(--crml-text-muted);
}

.card-action-chip {
  font-size: 0.65rem;
  font-weight: 800;
  border: 1px solid var(--crt-obsidian, #0d0d0d);
  padding: 0.1rem 0.35rem;
  border-radius: 4px;
  cursor: pointer;
}

.status-progress { background-color: var(--crt-cyber-cyan, #00f0ff); color: var(--crt-obsidian); }
.status-done { background-color: var(--crt-electric-lime, #ccff00); color: var(--crt-obsidian); }
.status-review { background-color: var(--crt-sunburst-yellow, #ffd600); color: var(--crt-obsidian); }
.status-blocked { background-color: var(--crt-hot-pink, #ff007f); color: white; }
.status-todo { background-color: var(--crml-bg-elevated, #e0e0e0); color: var(--crt-obsidian); }

.card-extra-footer {
  border-top: 1.5px dashed var(--crt-obsidian);
  padding-top: 0.5rem;
  margin-top: 0.15rem;
}
</style>
