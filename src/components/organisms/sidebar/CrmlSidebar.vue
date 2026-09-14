<script setup lang="ts">
import { ref } from 'vue'

export interface SidebarItem {
  id: string
  label: string
  icon?: string
  badge?: string
  active?: boolean
  section?: string
}

const props = withDefaults(
  defineProps<{
    title?: string
    userHandle?: string
    items?: SidebarItem[]
    collapsed?: boolean
  }>(),
  {
    title: 'CRML DASHBOARD',
    userHandle: '@CRML_MECHA',
    collapsed: false,
    items: () => [
      { id: 'overview', label: 'OVERVIEW', icon: '📊', section: 'MAIN', active: true },
      { id: 'analytics', label: 'ANALYTICS', icon: '⚡', section: 'MAIN', badge: 'LIVE' },
      { id: 'inventory', label: 'INVENTORY', icon: '📦', section: 'STORE' },
      { id: 'orders', label: 'ORDERS', icon: '🛒', section: 'STORE', badge: '12' },
      { id: 'settings', label: 'SETTINGS', icon: '⚙️', section: 'SYSTEM' }
    ]
  }
)

const emit = defineEmits<{
  (e: 'select', item: SidebarItem): void
  (e: 'update:collapsed', value: boolean): void
}>()

const isCollapsed = ref(props.collapsed)

function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value
  emit('update:collapsed', isCollapsed.value)
}

function selectItem(item: SidebarItem) {
  emit('select', item)
}
</script>

<template>
  <aside
    class="crml-sidebar font-mono"
    :class="{ collapsed: isCollapsed }"
  >
    <!-- Header Titlebar & Toggle Button -->
    <div class="sidebar-header">
      <div class="header-brand" v-if="!isCollapsed">
        <span class="brand-avatar">👾</span>
        <span class="brand-name font-heading">{{ title }}</span>
      </div>

      <button class="collapse-toggle-btn" @click="toggleCollapse">
        {{ isCollapsed ? '▶' : '◀' }}
      </button>
    </div>

    <!-- Main Nav Items List -->
    <div class="sidebar-nav-body">
      <template v-for="(item, idx) in items" :key="item.id">
        <!-- Section Header if Section Changes -->
        <div
          v-if="!isCollapsed && (idx === 0 || item.section !== items[idx - 1].section)"
          class="section-label font-heading"
        >
          // {{ item.section || 'MENU' }}
        </div>

        <!-- Menu Item Row -->
        <button
          class="sidebar-item-btn"
          :class="{ active: item.active }"
          :title="isCollapsed ? item.label : undefined"
          @click="selectItem(item)"
        >
          <span class="item-icon">{{ item.icon || '✦' }}</span>
          <span v-if="!isCollapsed" class="item-label font-mono">{{ item.label }}</span>
          <span v-if="!isCollapsed && item.badge" class="item-badge-chip">
            {{ item.badge }}
          </span>
        </button>
      </template>
    </div>

    <!-- User Profile Footer -->
    <div class="sidebar-footer" v-if="!isCollapsed">
      <div class="user-chip">
        <span class="user-status-dot"></span>
        <span class="user-handle font-mono">{{ userHandle }}</span>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.crml-sidebar {
  width: 260px;
  background: var(--crml-bg-surface, #ffffff);
  border: 3px solid var(--crt-obsidian, #0d0d0d);
  border-radius: var(--crml-radius-lg, 14px);
  box-shadow: 4px 4px 0px var(--crt-obsidian, #0d0d0d);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px;
  transition: width 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-sizing: border-box;
}

.crml-sidebar.collapsed {
  width: 72px;
  padding: 12px 8px;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2.5px solid var(--crt-obsidian, #0d0d0d);
  padding-bottom: 10px;
}

.header-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  overflow: hidden;
}

.brand-avatar {
  font-size: 20px;
}

.brand-name {
  font-size: 13px;
  font-weight: 900;
  color: var(--crml-text-main, #0d0d0d);
  letter-spacing: -0.5px;
  white-space: nowrap;
}

.collapse-toggle-btn {
  background: var(--crt-cyber-cyan, #00f0ff);
  border: 2px solid var(--crt-obsidian, #0d0d0d);
  border-radius: 6px;
  width: 30px;
  height: 30px;
  font-size: 11px;
  font-weight: 900;
  cursor: pointer;
  box-shadow: 2px 2px 0px var(--crt-obsidian, #0d0d0d);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.sidebar-nav-body {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 12px;
  flex: 1;
}

.section-label {
  font-size: 9.5px;
  font-weight: 900;
  color: var(--crml-text-muted, #757575);
  margin-top: 8px;
  margin-bottom: 2px;
  padding-left: 4px;
}

.sidebar-item-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 8px 10px;
  background: var(--crml-bg-surface, #ffffff);
  border: 2px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.1s ease;
  color: var(--crml-text-main, #0d0d0d);
}

.crml-sidebar.collapsed .sidebar-item-btn {
  justify-content: center;
  padding: 10px;
}

.sidebar-item-btn:hover {
  background: var(--crml-bg-elevated, #f4f4f5);
  border-color: var(--crt-obsidian, #0d0d0d);
  transform: translate(-1px, -1px);
  box-shadow: 2px 2px 0px var(--crt-obsidian, #0d0d0d);
}

.sidebar-item-btn.active {
  background: var(--crt-electric-lime, #ccff00);
  border-color: var(--crt-obsidian, #0d0d0d);
  box-shadow: 3px 3px 0px var(--crt-obsidian, #0d0d0d);
}

.item-icon {
  font-size: 16px;
}

.item-label {
  font-size: 12px;
  font-weight: 900;
  flex: 1;
  text-align: left;
}

.item-badge-chip {
  background: var(--crt-hot-pink, #ff007f);
  color: #ffffff;
  border: 1.5px solid var(--crt-obsidian, #0d0d0d);
  font-size: 9px;
  font-weight: 900;
  padding: 1px 5px;
  border-radius: 4px;
}

.sidebar-footer {
  border-top: 2.5px solid var(--crt-obsidian, #0d0d0d);
  padding-top: 10px;
  margin-top: 12px;
}

.user-chip {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--crml-bg-elevated, #f4f4f5);
  border: 2px solid var(--crt-obsidian, #0d0d0d);
  padding: 6px 10px;
  border-radius: 8px;
  box-shadow: 2px 2px 0px var(--crt-obsidian, #0d0d0d);
}

.user-status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #2ed573;
  border: 1px solid #000;
}

.user-handle {
  font-size: 11px;
  font-weight: 900;
  color: var(--crml-text-main, #0d0d0d);
}
</style>
