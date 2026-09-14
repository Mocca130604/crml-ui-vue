<script setup lang="ts">
import { ref } from 'vue'

export interface NavItem {
  id: string
  label: string
  href?: string
  badge?: string
  active?: boolean
}

const props = withDefaults(
  defineProps<{
    brandText?: string
    brandBadge?: string
    items?: NavItem[]
  }>(),
  {
    brandText: 'CRML - UI',
    brandBadge: 'v5.0',
    items: () => [
      { id: 'home', label: 'OVERVIEW', active: true },
      { id: 'docs', label: 'DOCS', badge: 'NEW' },
      { id: 'components', label: 'COMPONENTS' },
      { id: 'tokens', label: 'TOKENS' }
    ]
  }
)

const emit = defineEmits<{
  (e: 'nav-click', item: NavItem): void
  (e: 'search-click'): void
  (e: 'action-click'): void
}>()

const isMobileOpen = ref(false)
</script>

<template>
  <nav class="crml-navbar font-mono">
    <div class="navbar-container">
      <!-- Brand Logo Group -->
      <div class="brand-group">
        <div class="brand-logo font-heading">
          {{ brandText }}
        </div>
        <span v-if="brandBadge" class="brand-badge font-mono">
          {{ brandBadge }}
        </span>
      </div>

      <!-- Desktop Nav Links -->
      <div class="desktop-nav-links">
        <a
          v-for="item in items"
          :key="item.id"
          :href="item.href || '#'"
          class="nav-item-link"
          :class="{ active: item.active }"
          @click.prevent="emit('nav-click', item)"
        >
          <span>{{ item.label }}</span>
          <span v-if="item.badge" class="item-badge">{{ item.badge }}</span>
        </a>
      </div>

      <!-- Action Buttons Right -->
      <div class="nav-actions">
        <button class="action-btn search-btn" @click="emit('search-click')">
          <span>🔍</span>
          <span class="cmd-kbd font-mono">⌘K</span>
        </button>

        <button class="action-btn cta-btn font-heading" @click="emit('action-click')">
          <span>⚡ GO PRO</span>
        </button>

        <!-- Mobile Hamburger Toggle -->
        <button class="mobile-toggle-btn" @click="isMobileOpen = !isMobileOpen">
          {{ isMobileOpen ? '✕' : '☰' }}
        </button>
      </div>
    </div>

    <!-- Mobile Dropdown Menu -->
    <div v-if="isMobileOpen" class="mobile-menu-drawer">
      <a
        v-for="item in items"
        :key="item.id"
        :href="item.href || '#'"
        class="mobile-nav-link"
        :class="{ active: item.active }"
        @click="isMobileOpen = false; emit('nav-click', item)"
      >
        <span>{{ item.label }}</span>
        <span v-if="item.badge" class="item-badge">{{ item.badge }}</span>
      </a>
    </div>
  </nav>
</template>

<style scoped>
.crml-navbar {
  width: 100%;
  background: var(--crml-bg-surface, #ffffff);
  border: 3px solid var(--crt-obsidian, #0d0d0d);
  border-radius: var(--crml-radius-lg, 12px);
  box-shadow: 4px 4px 0px var(--crt-obsidian, #0d0d0d);
  position: relative;
  box-sizing: border-box;
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  gap: 16px;
}

.brand-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.brand-logo {
  font-weight: 900;
  font-size: 16px;
  letter-spacing: -0.5px;
  background: var(--crt-obsidian, #0d0d0d);
  color: var(--crt-electric-lime, #ccff00);
  border: 2px solid var(--crt-obsidian, #0d0d0d);
  padding: 3px 10px;
  border-radius: 6px;
  box-shadow: 2px 2px 0px var(--crt-electric-lime, #ccff00);
}

.brand-badge {
  background: var(--crt-hot-pink, #ff007f);
  color: #ffffff;
  border: 1.5px solid var(--crt-obsidian, #0d0d0d);
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 900;
}

.desktop-nav-links {
  display: flex;
  align-items: center;
  gap: 12px;
}

.nav-item-link {
  display: flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  font-size: 12px;
  font-weight: 900;
  color: var(--crml-text-main, #0d0d0d);
  padding: 6px 12px;
  border: 2px solid transparent;
  border-radius: 6px;
  transition: all 0.1s ease;
}

.nav-item-link:hover {
  background: var(--crml-bg-elevated, #f4f4f5);
  border-color: var(--crt-obsidian, #0d0d0d);
  transform: translate(-1px, -1px);
  box-shadow: 2px 2px 0px var(--crt-obsidian, #0d0d0d);
}

.nav-item-link.active {
  background: var(--crt-electric-lime, #ccff00);
  color: var(--crt-obsidian, #0d0d0d);
  border-color: var(--crt-obsidian, #0d0d0d);
  box-shadow: 2.5px 2.5px 0px var(--crt-obsidian, #0d0d0d);
}

.item-badge {
  background: var(--crt-cyber-cyan, #00f0ff);
  color: var(--crt-obsidian, #0d0d0d);
  border: 1px solid var(--crt-obsidian, #0d0d0d);
  font-size: 8.5px;
  font-weight: 900;
  padding: 0 4px;
  border-radius: 3px;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: var(--crml-bg-elevated, #f4f4f5);
  border: 2.5px solid var(--crt-obsidian, #0d0d0d);
  border-radius: 6px;
  padding: 6px 12px;
  font-weight: 900;
  font-size: 12px;
  cursor: pointer;
  box-shadow: 2px 2px 0px var(--crt-obsidian, #0d0d0d);
  transition: transform 0.1s ease;
}

.action-btn:hover {
  transform: translate(-1px, -1px);
  box-shadow: 3px 3px 0px var(--crt-obsidian, #0d0d0d);
}

.cmd-kbd {
  background: var(--crt-obsidian, #0d0d0d);
  color: #ffffff;
  padding: 1px 4px;
  border-radius: 3px;
  font-size: 10px;
}

.cta-btn {
  background: var(--crt-hot-pink, #ff007f);
  color: #ffffff;
}

.mobile-toggle-btn {
  display: none;
  background: var(--crt-sunburst-yellow, #ffd600);
  border: 2.5px solid var(--crt-obsidian, #0d0d0d);
  border-radius: 6px;
  width: 36px;
  height: 36px;
  font-size: 16px;
  font-weight: 900;
  cursor: pointer;
  box-shadow: 2px 2px 0px var(--crt-obsidian, #0d0d0d);
}

@media (max-width: 768px) {
  .desktop-nav-links {
    display: none;
  }
  .cmd-kbd {
    display: none;
  }
  .mobile-toggle-btn {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.mobile-menu-drawer {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px;
  border-top: 2.5px solid var(--crt-obsidian, #0d0d0d);
  background: var(--crml-bg-elevated, #f4f4f5);
}

.mobile-nav-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: #ffffff;
  border: 2px solid var(--crt-obsidian, #0d0d0d);
  border-radius: 6px;
  text-decoration: none;
  font-size: 12px;
  font-weight: 900;
  color: var(--crml-text-main, #0d0d0d);
  box-shadow: 2px 2px 0px var(--crt-obsidian, #0d0d0d);
}

.mobile-nav-link.active {
  background: var(--crt-electric-lime, #ccff00);
}
</style>
