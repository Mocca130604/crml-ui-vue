<script setup lang="ts">
import { ref, computed } from 'vue'

export interface NotificationItem {
  id: string | number
  title: string
  message: string
  time: string
  type?: 'info' | 'warning' | 'success' | 'danger'
  unread?: boolean
}

const props = withDefaults(
  defineProps<{
    notifications?: NotificationItem[]
  }>(),
  {
    notifications: () => [
      {
        id: 1,
        title: 'DROP ALERT: MECHA V1',
        message: 'Limited collection goes live in 5 minutes.',
        time: '2m ago',
        type: 'warning',
        unread: true
      },
      {
        id: 2,
        title: 'PAYMENT VERIFIED',
        message: 'Order #CRML-9081 processed successfully.',
        time: '1h ago',
        type: 'success',
        unread: true
      },
      {
        id: 3,
        title: 'SYSTEM OVERLOAD',
        message: 'CPU load reached 94% on node-eu-west.',
        time: '3h ago',
        type: 'danger',
        unread: false
      }
    ]
  }
)

const isOpen = ref(false)
const items = ref<NotificationItem[]>([...props.notifications])

const unreadCount = computed(() => items.value.filter(n => n.unread).length)

function toggleDrawer() {
  isOpen.value = !isOpen.value
}

function markAllRead() {
  items.value = items.value.map(n => ({ ...n, unread: false }))
}

function removeNotification(id: string | number) {
  items.value = items.value.filter(n => n.id !== id)
}
</script>

<template>
  <div class="crml-notification-wrapper">
    <!-- Trigger Bell Button -->
    <button class="notif-bell-btn" @click="toggleDrawer">
      <span class="bell-icon">🔔</span>
      <span class="bell-label">NOTIFS</span>
      <span v-if="unreadCount > 0" class="notif-badge-pill">
        {{ unreadCount }}
      </span>
    </button>

    <!-- Popover Notification Drawer -->
    <div v-if="isOpen" class="notif-popover">
      <div class="popover-header">
        <div class="popover-title-group">
          <span class="popover-title">NOTIFICATIONS</span>
          <span class="unread-pill">{{ unreadCount }} UNREAD</span>
        </div>
        <button class="mark-btn" @click="markAllRead">
          MARK ALL READ
        </button>
      </div>

      <div class="notif-list">
        <div
          v-for="item in items"
          :key="item.id"
          class="notif-card"
          :class="[
            item.type || 'info',
            { 'is-unread': item.unread }
          ]"
        >
          <div class="notif-icon-box">
            <span v-if="item.type === 'success'">✅</span>
            <span v-else-if="item.type === 'warning'">⚠️</span>
            <span v-else-if="item.type === 'danger'">🚨</span>
            <span v-else>💬</span>
          </div>

          <div class="notif-body">
            <div class="notif-top">
              <h4 class="notif-item-title">{{ item.title }}</h4>
              <span class="notif-time">{{ item.time }}</span>
            </div>
            <p class="notif-item-msg">{{ item.message }}</p>
          </div>

          <button
            class="dismiss-btn"
            title="Dismiss"
            @click="removeNotification(item.id)"
          >
            ✕
          </button>
        </div>

        <div v-if="items.length === 0" class="empty-notif">
          <span>✨</span>
          <p>No new notifications!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.crml-notification-wrapper {
  position: relative;
  display: inline-block;
}

.notif-bell-btn {
  background: var(--crt-sunburst-yellow, #ffe600);
  border: 3px solid var(--crml-border-ink, #000);
  border-radius: 8px;
  padding: 8px 14px;
  box-shadow: 4px 4px 0 var(--crml-shadow-ink, #000);
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: monospace;
  font-weight: 900;
  font-size: 13px;
  cursor: pointer;
  transition: transform 0.1s ease, box-shadow 0.1s ease;
}

.notif-bell-btn:hover {
  transform: translate(-1px, -1px);
  box-shadow: 5px 5px 0 var(--crml-shadow-ink, #000);
}

.notif-bell-btn:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 var(--crml-shadow-ink, #000);
}

.bell-icon {
  font-size: 16px;
}

.notif-badge-pill {
  background: var(--crt-hot-pink, #ff0055);
  color: #fff;
  border: 2px solid var(--crml-border-ink, #000);
  border-radius: 10px;
  padding: 0 6px;
  font-size: 11px;
  font-weight: 900;
}

.notif-popover {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: 320px;
  background: var(--crml-bg-popover);
  border: 3px solid var(--crml-border-ink, #000);
  border-radius: 12px;
  box-shadow: 6px 6px 0 var(--crml-shadow-ink, #000);
  z-index: 100;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.popover-header {
  background: var(--crt-obsidian, #000);
  color: #fff;
  padding: 10px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: monospace;
}

.popover-title-group {
  display: flex;
  align-items: center;
  gap: 6px;
}

.popover-title {
  font-weight: 900;
  font-size: 12px;
}

.unread-pill {
  background: #00f0ff;
  color: var(--crml-text-on-accent, #000);
  font-size: 9px;
  font-weight: 900;
  padding: 1px 5px;
  border-radius: 3px;
}

.mark-btn {
  background: var(--crt-sunburst-yellow, #ffe600);
  border: 2px solid var(--crml-border-ink, #000);
  color: var(--crml-text-on-accent, #000);
  font-size: 9px;
  font-weight: 900;
  padding: 2px 6px;
  border-radius: 4px;
  cursor: pointer;
}

.notif-list {
  display: flex;
  flex-direction: column;
  max-height: 280px;
  overflow-y: auto;
  padding: 10px;
  gap: 8px;
}

.notif-card {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  padding: 10px;
  border: 2px solid var(--crml-border-ink, #000);
  border-radius: 8px;
  box-shadow: 3px 3px 0 var(--crml-shadow-ink, #000);
  background: var(--crml-bg-card-alt);
  position: relative;
}

.notif-card.is-unread {
  background: var(--crml-bg-surface);
  border-width: 2.5px;
}

.notif-card.warning { border-left: 6px solid #ffe600; }
.notif-card.success { border-left: 6px solid #2ed573; }
.notif-card.danger { border-left: 6px solid #ff4757; }
.notif-card.info { border-left: 6px solid #00f0ff; }

.notif-icon-box {
  font-size: 18px;
}

.notif-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.notif-top {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.notif-item-title {
  margin: 0;
  font-size: 11px;
  font-weight: 900;
  color: var(--crml-text-main);
  font-family: monospace;
}

.notif-time {
  font-size: 9px;
  font-family: monospace;
  color: var(--crml-text-muted);
  font-weight: 700;
}

.notif-item-msg {
  margin: 0;
  font-size: 11px;
  color: var(--crml-text-secondary);
  line-height: 1.3;
}

.dismiss-btn {
  background: transparent;
  border: none;
  font-size: 12px;
  font-weight: 900;
  cursor: pointer;
  color: var(--crml-text-muted);
  padding: 0 4px;
}

.dismiss-btn:hover {
  color: var(--crml-text-main);
}

.empty-notif {
  text-align: center;
  padding: 20px;
  color: var(--crml-text-muted);
  font-family: monospace;
  font-weight: 800;
  font-size: 12px;
}
</style>
