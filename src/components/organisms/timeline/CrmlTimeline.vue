<script setup lang="ts">
import { computed } from 'vue';

export interface TimelineItem {
  id: string
  title: string
  date?: string
  description?: string
  badgeText?: string
  badgeVariant?: 'primary' | 'success' | 'warning' | 'danger' | 'lime' | 'pink' | 'cyan' | 'yellow' | 'obsidian'
  icon?: string
  color?: 'lime' | 'pink' | 'cyan' | 'yellow' | 'obsidian'
}

const props = withDefaults(
  defineProps<{
    items: TimelineItem[]
    accentColor?: 'lime' | 'pink' | 'cyan' | 'yellow' | 'obsidian'
    connectorStyle?: 'solid' | 'dashed' | 'dotted'
    size?: 'sm' | 'md' | 'lg'
    dense?: boolean
  }>(),
  {
    accentColor: 'lime',
    connectorStyle: 'solid',
    size: 'md',
    dense: false,
    items: () => [
      { id: '1', title: 'v1.0 Initial Neubrutal Release', date: 'AUG 12', description: 'Core tokens & primitive buttons launched.', badgeText: 'RELEASED', badgeVariant: 'lime', icon: '🚀' },
      { id: '2', title: 'v2.0 Y2K Cyber Expansion', date: 'AUG 28', description: 'Added glassmorphism, vaporwave EQ, & hypebeast drop timer.', badgeText: 'STABLE', badgeVariant: 'cyan', icon: '⚡' },
      { id: '3', title: 'v3.0 Form Suite & Data Tables', date: 'SEP 12', description: 'Complete 30+ components unified with 0% blur policy.', badgeText: 'CURRENT', badgeVariant: 'yellow', icon: '🔥' }
    ]
  }
)
</script>

<template>
  <div
    :class="[
      'crml-timeline-wrapper',
      `accent-${accentColor}`,
      `size-${size}`,
      `connector-${connectorStyle}`,
      { 'is-dense': dense }
    ]"
  >
    <div v-for="(item, idx) in items" :key="item.id" class="timeline-step-item">
      <div class="step-left-column">
        <div :class="['node-bullet-box', item.color ? `node-${item.color}` : '']">
          <slot name="icon" :item="item" :index="idx">
            <span class="node-icon">{{ item.icon || '●' }}</span>
          </slot>
        </div>
        <div v-if="idx < items.length - 1" class="step-connector-line"></div>
      </div>

      <div class="step-right-content">
        <slot name="content" :item="item" :index="idx">
          <div class="step-header">
            <slot name="title" :item="item" :index="idx">
              <h4 class="step-title">{{ item.title }}</h4>
            </slot>
            <slot name="date" :item="item" :index="idx">
              <span v-if="item.date" class="step-date-tag font-mono">{{ item.date }}</span>
            </slot>
            <slot name="badge" :item="item" :index="idx">
              <span v-if="item.badgeText" :class="['step-badge', item.badgeVariant ? `badge-${item.badgeVariant}` : '']">
                {{ item.badgeText }}
              </span>
            </slot>
          </div>
          <slot name="description" :item="item" :index="idx">
            <p v-if="item.description" class="step-desc">{{ item.description }}</p>
          </slot>
          <slot name="extra" :item="item" :index="idx" />
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.crml-timeline-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  font-family: var(--crml-font-body);
}

.timeline-step-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.step-left-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  min-height: 4rem;
}

.node-bullet-box {
  width: 2.25rem;
  height: 2.25rem;
  background-color: var(--crt-electric-lime, var(--crml-action-primary));
  border: 2px solid var(--crml-border-ink, #0D0D0D);
  border-radius: var(--crml-radius-md, 8px);
  box-shadow: 2px 2px 0px var(--crml-shadow-ink, #0D0D0D);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  flex-shrink: 0;
}

.accent-pink .node-bullet-box {
  background-color: var(--crt-hot-pink, #ff007f);
  color: #ffffff;
}

.accent-cyan .node-bullet-box {
  background-color: var(--crt-cyber-cyan, #00f0ff);
}

.accent-yellow .node-bullet-box {
  background-color: var(--crt-sunburst-yellow, #ffd600);
}

.node-icon {
  font-size: 1rem;
  line-height: 1;
}

.step-connector-line {
  width: 3px;
  flex: 1;
  background-color: var(--crt-obsidian, #0d0d0d);
  margin-top: 0.25rem;
  margin-bottom: -0.5rem;
}

.step-right-content {
  flex: 1;
  background-color: var(--crml-bg-surface, #ffffff);
  border: 2px solid var(--crml-border-ink, #0D0D0D);
  border-radius: var(--crml-radius-md, 8px);
  padding: 0.85rem 1rem;
  box-shadow: 3px 3px 0px var(--crml-shadow-ink, #0D0D0D);
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.step-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.step-title {
  font-family: var(--crml-font-heading);
  font-weight: 800;
  font-size: 0.9rem;
  color: var(--crml-text-main, #0d0d0d);
  margin: 0;
}

.step-date-tag {
  font-family: var(--crml-font-mono);
  font-size: 0.7rem;
  font-weight: 800;
  background-color: var(--crml-bg-elevated, #e0e0e0);
  border: 1px solid var(--crml-border-ink, #0D0D0D);
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
}

.step-badge {
  font-family: var(--crml-font-mono);
  font-size: 0.65rem;
  font-weight: 800;
  padding: 0.1rem 0.4rem;
  border: 1px solid var(--crml-border-ink, #0D0D0D);
  border-radius: 4px;
  margin-left: auto;
}

.badge-success,
.badge-lime { background-color: var(--crt-electric-lime, var(--crml-action-primary)); color: var(--crml-text-on-accent, #0d0d0d); }
.badge-primary,
.badge-cyan { background-color: var(--crt-cyber-cyan, #00f0ff); color: var(--crml-text-on-accent, #0d0d0d); }
.badge-warning,
.badge-yellow { background-color: var(--crt-sunburst-yellow, #ffd600); color: var(--crml-text-on-accent, #0d0d0d); }
.badge-danger,
.badge-pink { background-color: var(--crt-hot-pink, #ff007f); color: #fff; }
.badge-default { background-color: var(--crml-bg-elevated, #e0e0e0); }
.badge-obsidian { background-color: var(--crt-obsidian, #0d0d0d); color: var(--crt-electric-lime, var(--crml-action-primary)); }

.node-lime { background-color: var(--crt-electric-lime, var(--crml-action-primary)) !important; color: var(--crml-text-on-accent, #0d0d0d) !important; }
.node-pink { background-color: var(--crt-hot-pink, #ff007f) !important; color: #fff !important; }
.node-cyan { background-color: var(--crt-cyber-cyan, #00f0ff) !important; color: var(--crml-text-on-accent, #0d0d0d) !important; }
.node-yellow { background-color: var(--crt-sunburst-yellow, #ffd600) !important; color: var(--crml-text-on-accent, #0d0d0d) !important; }
.node-obsidian { background-color: var(--crt-obsidian, #0d0d0d) !important; color: var(--crt-electric-lime, var(--crml-action-primary)) !important; }

.connector-dashed .step-connector-line {
  background-color: transparent;
  border-left: 3px dashed var(--crt-obsidian, #0d0d0d);
  width: 0;
}

.connector-dotted .step-connector-line {
  background-color: transparent;
  border-left: 3px dotted var(--crt-obsidian, #0d0d0d);
  width: 0;
}

.is-dense .step-left-column {
  min-height: 2.5rem;
}

.is-dense .step-right-content {
  padding: 0.5rem 0.75rem;
}

.step-desc {
  font-size: 0.8rem;
  color: var(--crml-text-muted, #555555);
  line-height: 1.4;
  margin: 0;
}
</style>
