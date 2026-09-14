<template>
  <div
    :class="[
      'crml-blob-avatar',
      `crml-blob-avatar--${shape}`,
      `crml-blob-avatar--${size}`,
      { 'crml-blob-avatar--clickable': clickable }
    ]"
    @click="clickable ? $emit('click', $event) : undefined"
  >
    <div
      class="crml-blob-avatar__wrapper"
      :style="borderColor ? { borderColor } : undefined"
    >
      <img v-if="src" :src="src" :alt="alt" class="crml-blob-avatar__img" />
      <div v-else class="crml-blob-avatar__fallback">
        <slot name="fallback">
          {{ initials || fallbackIcon }}
        </slot>
      </div>
    </div>

    <div
      v-if="status || $slots.status"
      :class="['crml-blob-avatar__status', status ? `crml-blob-avatar__status--${status}` : '']"
    >
      <slot name="status">
        <span v-if="statusIcon" class="status-icon">{{ statusIcon }}</span>
      </slot>
    </div>

    <span v-if="name" class="crml-blob-avatar__name">{{ name }}</span>
  </div>
</template>

<script setup lang="ts">
export interface CrmlBlobAvatarProps {
  /** Image source URL */
  src?: string;
  /** Alt text for image */
  alt?: string;
  /** Initials to display when no image */
  initials?: string;
  /** Fallback icon when no image or initials */
  fallbackIcon?: string;
  /** Display name below avatar */
  name?: string;
  /** Shape variant */
  shape?: 'blob1' | 'blob2' | 'squircle' | 'circle';
  /** Size variant */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Status indicator */
  status?: 'online' | 'busy' | 'fire' | 'star' | 'offline';
  /** Custom status icon */
  statusIcon?: string;
  /** Custom border color */
  borderColor?: string;
  /** Make avatar clickable */
  clickable?: boolean;
}

withDefaults(defineProps<CrmlBlobAvatarProps>(), {
  shape: 'blob1',
  size: 'md',
  alt: 'Avatar',
  fallbackIcon: '⚡',
  clickable: false,
});

defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();
</script>

<style scoped>
.crml-blob-avatar { position: relative; display: inline-flex; flex-direction: column; align-items: center; gap: 0.35rem; }
.crml-blob-avatar--clickable { cursor: pointer; }

.crml-blob-avatar__wrapper {
  overflow: hidden;
  border: var(--crml-border-brutal);
  box-shadow: 3px 3px 0px var(--crml-shadow-ink, #0D0D0D);
  background: var(--grad-y2k-sunset);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.crml-blob-avatar:hover .crml-blob-avatar__wrapper { transform: scale(1.06) rotate(-3deg); }

.crml-blob-avatar--blob1 .crml-blob-avatar__wrapper { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
.crml-blob-avatar--blob2 .crml-blob-avatar__wrapper { border-radius: 40% 60% 70% 30% / 50% 60% 30% 50%; }
.crml-blob-avatar--squircle .crml-blob-avatar__wrapper { border-radius: 28%; }
.crml-blob-avatar--circle .crml-blob-avatar__wrapper { border-radius: 50%; }

.crml-blob-avatar--xs .crml-blob-avatar__wrapper { width: 1.75rem; height: 1.75rem; }
.crml-blob-avatar--sm .crml-blob-avatar__wrapper { width: 2.5rem; height: 2.5rem; }
.crml-blob-avatar--md .crml-blob-avatar__wrapper { width: 3.5rem; height: 3.5rem; }
.crml-blob-avatar--lg .crml-blob-avatar__wrapper { width: 4.75rem; height: 4.75rem; }
.crml-blob-avatar--xl .crml-blob-avatar__wrapper { width: 6.25rem; height: 6.25rem; }

.crml-blob-avatar__img { width: 100%; height: 100%; object-fit: cover; }

.crml-blob-avatar__fallback {
  font-family: var(--crml-font-heading);
  font-weight: 800;
  color: var(--crt-pure-white);
}
.crml-blob-avatar--xs .crml-blob-avatar__fallback { font-size: 0.65rem; }
.crml-blob-avatar--sm .crml-blob-avatar__fallback { font-size: 0.875rem; }
.crml-blob-avatar--md .crml-blob-avatar__fallback { font-size: 1.25rem; }
.crml-blob-avatar--lg .crml-blob-avatar__fallback { font-size: 1.75rem; }
.crml-blob-avatar--xl .crml-blob-avatar__fallback { font-size: 2.25rem; }

.crml-blob-avatar__status {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  border: 2px solid var(--crml-border-ink, #0D0D0D);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  box-shadow: 1px 1px 0px var(--crml-shadow-ink, #0D0D0D);
}

.crml-blob-avatar__status--online { background-color: var(--crt-electric-lime); }
.crml-blob-avatar__status--busy { background-color: var(--crt-hot-pink); color: white; }
.crml-blob-avatar__status--fire { background-color: var(--crt-sunburst-yellow); }
.crml-blob-avatar__status--star { background-color: var(--crt-cyber-cyan); }
.crml-blob-avatar__status--offline { background-color: var(--crml-bg-elevated); }

.crml-blob-avatar__name {
  font-family: var(--crml-font-heading);
  font-weight: 700;
  font-size: 0.75rem;
  color: var(--crml-text-main);
  text-align: center;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
