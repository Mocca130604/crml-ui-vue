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
    actionText?: string
    actionHref?: string
  }>(),
  {
    brandText: 'CRML - UI',
    brandBadge: 'v5.0',
    actionText: '☕ BUY ME A COFFEE',
    actionHref: 'https://buymeacoffee.com/crml',
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

        <slot name="action">
          <a
            v-if="actionHref"
            :href="actionHref"
            target="_blank"
            rel="noopener noreferrer"
            class="action-btn cta-btn font-heading"
            style="text-decoration: none;"
            @click="emit('action-click')"
          >
            <span>{{ actionText }}</span>
          </a>
          <button
            v-else
            class="action-btn cta-btn font-heading"
            @click="emit('action-click')"
          >
            <span>{{ actionText }}</span>
          </button>
        </slot>

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
      <a
        v-if="actionHref"
        :href="actionHref"
        target="_blank"
        rel="noopener noreferrer"
        class="mobile-nav-link cta-btn font-heading"
        style="text-decoration: none; text-align: center; justify-content: center; margin-top: 4px;"
        @click="isMobileOpen = false; emit('action-click')"
      >
        <span>{{ actionText }}</span>
      </a>
    </div>
  </nav>
</template>

<style scoped>
.crml-navbar {
  width: 100%;
  background: var(--crml-bg-surface, #ffffff);
  border: 3px solid var(--crml-border-ink, #0D0D0D);
  border-radius: var(--crml-radius-lg, 12px);
  box-shadow: 4px 4px 0px var(--crml-shadow-ink, #0D0D0D);
  position: relative;
  box-sizing: border-box;
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 14px;
  gap: 12px;
  min-width: 0;
  box-sizing: border-box;
}

.brand-group {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.brand-logo {
  font-weight: 900;
  font-size: 15px;
  letter-spacing: -0.5px;
  background: var(--crt-obsidian, #0d0d0d);
  color: #FFFFFF;
  border: 2px solid var(--crml-border-ink, #0D0D0D);
  padding: 3px 8px;
  border-radius: 6px;
  box-shadow: 2px 2px 0px var(--crml-shadow-ink, #0D0D0D);
  white-space: nowrap;
}

.brand-badge {
  background: var(--crt-hot-pink, #ff007f);
  color: #ffffff;
  border: 1.5px solid var(--crml-border-ink, #0D0D0D);
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 9.5px;
  font-weight: 900;
  white-space: nowrap;
}

.desktop-nav-links {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  flex-wrap: nowrap;
}

.desktop-nav-links::-webkit-scrollbar {
  display: none;
}

.nav-item-link {
  display: flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  font-size: 11.5px;
  font-weight: 900;
  color: var(--crml-text-main, #0d0d0d);
  padding: 5px 10px;
  border: 2px solid transparent;
  border-radius: 6px;
  white-space: nowrap;
  flex-shrink: 0;
  transition: all 0.1s ease;
}

.nav-item-link:hover {
  background: var(--crml-bg-elevated, #f4f4f5);
  border-color: var(--crml-border-ink, #0D0D0D);
  transform: translate(-1px, -1px);
  box-shadow: 2px 2px 0px var(--crml-shadow-ink, #0D0D0D);
}

.nav-item-link.active {
  background: var(--crml-action-primary, #1B6FFF);
  color: #FFFFFF;
  border-color: var(--crml-border-ink, #0D0D0D);
  box-shadow: 2px 2px 0px var(--crml-shadow-ink, #0D0D0D);
}

.item-badge {
  background: var(--crt-cyber-cyan, #00f0ff);
  color: var(--crt-obsidian, #0d0d0d);
  border: 1px solid var(--crml-border-ink, #0D0D0D);
  font-size: 8px;
  font-weight: 900;
  padding: 0 4px;
  border-radius: 3px;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: var(--crml-bg-elevated, #f4f4f5);
  border: 2px solid var(--crml-border-ink, #0D0D0D);
  border-radius: 6px;
  padding: 5px 10px;
  font-weight: 900;
  font-size: 11.5px;
  cursor: pointer;
  box-shadow: 2px 2px 0px var(--crml-shadow-ink, #0D0D0D);
  transition: transform 0.1s ease;
  white-space: nowrap;
}

.action-btn:hover {
  transform: translate(-1px, -1px);
  box-shadow: 3px 3px 0px var(--crml-shadow-ink, #0D0D0D);
}

.cmd-kbd {
  background: var(--crt-obsidian, #0d0d0d);
  color: #ffffff;
  padding: 1px 4px;
  border-radius: 3px;
  font-size: 9px;
}

.cta-btn {
  background: var(--crt-hot-pink, #ff007f);
  color: #ffffff;
}

.mobile-toggle-btn {
  display: none;
  background: var(--crt-sunburst-yellow, #ffd600);
  border: 2.5px solid var(--crml-border-ink, #0D0D0D);
  border-radius: 6px;
  width: 36px;
  height: 36px;
  font-size: 16px;
  font-weight: 900;
  cursor: pointer;
  box-shadow: 2px 2px 0px var(--crml-shadow-ink, #0D0D0D);
  flex-shrink: 0;
}

@media (max-width: 1024px) {
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
  border-top: 2.5px solid var(--crml-border-ink, #0D0D0D);
  background: var(--crml-bg-elevated, #f4f4f5);
}

.mobile-nav-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: var(--crml-bg-surface);
  border: 2px solid var(--crml-border-ink, #0D0D0D);
  border-radius: 6px;
  text-decoration: none;
  font-size: 12px;
  font-weight: 900;
  color: var(--crml-text-main, #0d0d0d);
  box-shadow: 2px 2px 0px var(--crml-shadow-ink, #0D0D0D);
}

.mobile-nav-link.active {
  background: var(--crml-action-primary, #1B6FFF);
  color: #FFFFFF;
}
</style>
