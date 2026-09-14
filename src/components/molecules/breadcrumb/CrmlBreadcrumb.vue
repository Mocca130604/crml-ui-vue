<template>
  <nav class="crml-breadcrumb" aria-label="Breadcrumb">
    <ol class="crml-breadcrumb-list">
      <li v-for="(item, index) in items" :key="index" class="crml-breadcrumb-item">
        <a
          v-if="item.href && index < items.length - 1"
          :href="item.href"
          class="crumb-link"
        >
          <span v-if="item.icon" class="crumb-icon">{{ item.icon }}</span>
          {{ item.label }}
        </a>
        <span v-else class="crumb-active">
          <span v-if="item.icon" class="crumb-icon">{{ item.icon }}</span>
          {{ item.label }}
        </span>

        <span v-if="index < items.length - 1" class="crumb-divider">
          {{ separator }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: string;
}

export interface CrmlBreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: string;
}

withDefaults(defineProps<CrmlBreadcrumbProps>(), {
  separator: '/',
});
</script>

<style scoped>
.crml-breadcrumb {
  display: inline-flex;
  font-family: var(--crml-font-heading);
}

.crml-breadcrumb-list {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.crml-breadcrumb-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  font-weight: 700;
}

.crumb-link {
  color: var(--crml-text-muted);
  text-decoration: none;
  transition: color 0.15s ease;
}

.crumb-link:hover {
  color: var(--crt-hot-pink);
  text-decoration: underline;
}

.crumb-active {
  color: var(--crml-text-main);
  font-weight: 800;
}

.crumb-divider {
  color: var(--crt-hot-pink);
  font-weight: 900;
}
</style>
