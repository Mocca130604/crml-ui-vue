<template>
  <div
    :class="[
      'crml-neubrutal-card',
      `crml-neubrutal-card--header-${headerColor}`,
      { 'crml-neubrutal-card--hoverable': hoverable }
    ]"
  >
    <div v-if="$slots.header || title" class="crml-neubrutal-card__header">
      <div class="header-content">
        <h3 v-if="title" class="crml-neubrutal-card__title">{{ title }}</h3>
        <p v-if="subtitle" class="crml-neubrutal-card__subtitle">{{ subtitle }}</p>
      </div>
      <div v-if="$slots.badge" class="header-badge">
        <slot name="badge" />
      </div>
    </div>

    <div class="crml-neubrutal-card__body">
      <slot />
    </div>

    <div v-if="$slots.footer" class="crml-neubrutal-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
export interface CrmlNeubrutalCardProps {
  title?: string;
  subtitle?: string;
  headerColor?: 'white' | 'lavender' | 'peach' | 'mint' | 'lime' | 'pink' | 'cyan' | 'yellow';
  hoverable?: boolean;
}

withDefaults(defineProps<CrmlNeubrutalCardProps>(), {
  headerColor: 'lavender',
  hoverable: true,
});
</script>

<style scoped>
.crml-neubrutal-card {
  background-color: var(--crml-bg-surface);
  border: var(--crml-border-brutal);
  border-radius: var(--crml-radius-lg);
  box-shadow: var(--crml-shadow-brutal);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  color: var(--crml-text-main);
  font-family: var(--crml-font-body);
}

.crml-neubrutal-card--hoverable:hover {
  transform: translate(-3px, -3px);
  box-shadow: var(--crml-shadow-brutal-lg);
}

.crml-neubrutal-card__header {
  padding: 1rem 1.25rem;
  border-bottom: var(--crml-border-brutal);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.crml-neubrutal-card--header-white .crml-neubrutal-card__header { background-color: var(--crt-pure-white); color: var(--crt-obsidian); }
.crml-neubrutal-card--header-lavender .crml-neubrutal-card__header { background-color: var(--crt-lavender); color: var(--crt-obsidian); }
.crml-neubrutal-card--header-peach .crml-neubrutal-card__header { background-color: var(--crt-peach); color: var(--crt-obsidian); }
.crml-neubrutal-card--header-mint .crml-neubrutal-card__header { background-color: var(--crt-mint); color: var(--crt-obsidian); }
.crml-neubrutal-card--header-lime .crml-neubrutal-card__header { background-color: var(--crml-action-primary); color: var(--crt-obsidian); }
.crml-neubrutal-card--header-pink .crml-neubrutal-card__header { background-color: var(--crt-hot-pink); color: var(--crt-pure-white); }
.crml-neubrutal-card--header-cyan .crml-neubrutal-card__header { background-color: var(--crt-cyber-cyan); color: var(--crt-obsidian); }
.crml-neubrutal-card--header-yellow .crml-neubrutal-card__header { background-color: var(--crt-sunburst-yellow); color: var(--crt-obsidian); }

.crml-neubrutal-card--header-white .crml-neubrutal-card__title,
.crml-neubrutal-card--header-lavender .crml-neubrutal-card__title,
.crml-neubrutal-card--header-peach .crml-neubrutal-card__title,
.crml-neubrutal-card--header-mint .crml-neubrutal-card__title,
.crml-neubrutal-card--header-lime .crml-neubrutal-card__title,
.crml-neubrutal-card--header-cyan .crml-neubrutal-card__title,
.crml-neubrutal-card--header-yellow .crml-neubrutal-card__title {
  color: var(--crt-obsidian) !important;
}

.crml-neubrutal-card--header-white .crml-neubrutal-card__subtitle,
.crml-neubrutal-card--header-lavender .crml-neubrutal-card__subtitle,
.crml-neubrutal-card--header-peach .crml-neubrutal-card__subtitle,
.crml-neubrutal-card--header-mint .crml-neubrutal-card__subtitle,
.crml-neubrutal-card--header-lime .crml-neubrutal-card__subtitle,
.crml-neubrutal-card--header-cyan .crml-neubrutal-card__subtitle,
.crml-neubrutal-card--header-yellow .crml-neubrutal-card__subtitle {
  color: rgba(13, 13, 13, 0.75) !important;
}

.crml-neubrutal-card--header-pink .crml-neubrutal-card__title {
  color: #fff !important;
}
.crml-neubrutal-card--header-pink .crml-neubrutal-card__subtitle {
  color: rgba(255, 255, 255, 0.85) !important;
}

.crml-neubrutal-card__title {
  font-family: var(--crml-font-heading);
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1.3;
}

.crml-neubrutal-card__subtitle {
  font-size: 0.8125rem;
  opacity: 0.85;
  margin-top: 0.2rem;
}

.crml-neubrutal-card__body { padding: 1.25rem; }

.crml-neubrutal-card__footer {
  padding: 0.85rem 1.25rem;
  border-top: var(--crml-border-brutal);
  background-color: var(--crml-bg-elevated);
}
</style>
