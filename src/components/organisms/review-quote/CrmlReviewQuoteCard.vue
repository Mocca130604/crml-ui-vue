<script setup lang="ts">
export interface ReviewQuoteProps {
  /** Quote text */
  quote?: string;
  /** Author's name */
  authorName?: string;
  /** Author's role/title */
  authorRole?: string;
  /** Author avatar image URL (overrides emoji) */
  authorAvatar?: string;
  /** Author avatar emoji (fallback) */
  authorAvatarEmoji?: string;
  /** Star rating (0-maxRating) */
  rating?: number;
  /** Maximum rating */
  maxRating?: number;
  /** Show verified badge */
  verified?: boolean;
  /** Verified label text */
  verifiedLabel?: string;
  /** Tag/badge text */
  tag?: string;
  /** Background color */
  bgColor?: string;
  /** Color variant (overrides bgColor with preset) */
  variant?: 'blue' | 'primary' | 'yellow' | 'lime' | 'pink' | 'cyan' | 'white';
  /** Star active icon */
  starActiveIcon?: string;
  /** Star inactive icon */
  starInactiveIcon?: string;
  /** Rating score format */
  ratingFormat?: string;
  /** Decorative quote mark character */
  quoteMark?: string;
  /** Show decorative quote mark */
  showQuoteMark?: boolean;
}

withDefaults(defineProps<ReviewQuoteProps>(), {
  quote: 'CRML-UI is the most tactile, responsive, and visually striking Vue 3 design system we have ever deployed.',
  authorName: 'Evelyn V. Vance',
  authorRole: 'Principal Design Engineer',
  rating: 5,
  maxRating: 5,
  verified: true,
  verifiedLabel: 'VERIFIED BUYER',
  tag: 'EDITORIAL CHOICE',
  variant: 'yellow',
  authorAvatarEmoji: '👤',
  starActiveIcon: '★',
  starInactiveIcon: '★',
  ratingFormat: '{rating}.0 / {max}.0',
  quoteMark: '\u201C',
  showQuoteMark: true,
})

const emit = defineEmits<{
  (e: 'click'): void;
}>()
</script>

<template>
  <div
    :class="['crml-review-quote-card', `crml-review-quote-card--${variant}`]"
    :style="bgColor ? { backgroundColor: bgColor } : undefined"
    @click="emit('click')"
  >
    <!-- Top Bar Tag & Verified Chip -->
    <div class="quote-header">
      <span v-if="tag" class="quote-tag-badge">
        <slot name="tag">{{ tag }}</slot>
      </span>
      <div v-if="verified" class="verified-chip">
        <slot name="verified">
          <span class="check-icon">✓</span>
          <span>{{ verifiedLabel }}</span>
        </slot>
      </div>
    </div>

    <!-- Giant Decorative Quote Mark -->
    <div v-if="showQuoteMark" class="giant-quote-mark">{{ quoteMark }}</div>

    <!-- Quote Body Text -->
    <div class="quote-text">
      <slot>{{ quote }}</slot>
    </div>

    <!-- Star Rating Bar -->
    <div v-if="maxRating > 0" class="rating-stars">
      <span
        v-for="star in maxRating"
        :key="star"
        class="star-icon"
        :class="{ active: star <= rating }"
      >
        {{ star <= rating ? starActiveIcon : starInactiveIcon }}
      </span>
      <span class="rating-score">
        {{ ratingFormat.replace('{rating}', String(rating)).replace('{max}', String(maxRating)) }}
      </span>
    </div>

    <!-- Author Details Footer -->
    <div class="author-section">
      <div class="avatar-frame">
        <slot name="avatar">
          <img v-if="authorAvatar" :src="authorAvatar" :alt="authorName" class="avatar-img" />
          <span v-else class="avatar-emoji">{{ authorAvatarEmoji }}</span>
        </slot>
      </div>
      <div class="author-meta">
        <h4 class="author-name">{{ authorName }}</h4>
        <p v-if="authorRole" class="author-role">{{ authorRole }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.crml-review-quote-card {
  position: relative;
  border: 3.5px solid var(--crml-border-ink, #0D0D0D);
  border-radius: 14px;
  padding: 24px;
  box-shadow: 6px 6px 0 var(--crt-obsidian);
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 420px;
  overflow: hidden;
}

.crml-review-quote-card--yellow { background-color: var(--crt-sunburst-yellow, #FFE600); }
.crml-review-quote-card--lime { background-color: var(--crml-action-primary); }
.crml-review-quote-card--pink { background-color: var(--crt-hot-pink); color: var(--crt-pure-white); }
.crml-review-quote-card--cyan { background-color: var(--crt-cyber-cyan); }
.crml-review-quote-card--white { background-color: var(--crt-pure-white); }

.quote-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
}

.quote-tag-badge {
  background: var(--crt-obsidian);
  color: #fff;
  font-family: var(--crml-font-mono, monospace);
  font-weight: 900;
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 4px;
  letter-spacing: 0.5px;
}

.verified-chip {
  background: var(--crt-cyber-cyan, #00f0ff);
  color: var(--crt-obsidian);
  border: 2px solid var(--crml-border-ink, #0D0D0D);
  padding: 2px 8px;
  border-radius: 12px;
  font-family: var(--crml-font-mono, monospace);
  font-weight: 900;
  font-size: 10px;
  display: flex;
  align-items: center;
  gap: 4px;
  box-shadow: 2px 2px 0 var(--crt-obsidian);
}

.check-icon { font-weight: 900; }

.giant-quote-mark {
  position: absolute;
  top: -10px;
  right: 15px;
  font-size: 140px;
  font-family: Georgia, serif;
  font-weight: 900;
  color: rgba(0, 0, 0, 0.12);
  line-height: 1;
  pointer-events: none;
  user-select: none;
}

.quote-text {
  margin: 0;
  font-size: 15px;
  font-weight: 800;
  color: var(--crt-obsidian);
  line-height: 1.45;
  z-index: 2;
}

.crml-review-quote-card--pink .quote-text { color: var(--crt-pure-white); }

.rating-stars {
  display: flex;
  align-items: center;
  gap: 4px;
  z-index: 2;
}

.star-icon {
  font-size: 20px;
  color: #ccc;
  -webkit-text-stroke: 1.5px var(--crt-obsidian);
}

.star-icon.active { color: var(--crt-hot-pink); }
.crml-review-quote-card--pink .star-icon.active { color: var(--crt-sunburst-yellow); }

.rating-score {
  font-family: var(--crml-font-mono, monospace);
  font-weight: 900;
  font-size: 12px;
  margin-left: 6px;
  color: var(--crt-obsidian);
}

.author-section {
  display: flex;
  align-items: center;
  gap: 12px;
  border-top: 2.5px solid var(--crml-border-ink, #0D0D0D);
  padding-top: 14px;
  z-index: 2;
}

.avatar-frame {
  width: 44px;
  height: 44px;
  background: var(--crt-pure-white);
  border: 2.5px solid var(--crml-border-ink, #0D0D0D);
  border-radius: 50%;
  box-shadow: 2.5px 2.5px 0 var(--crt-obsidian);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
}

.avatar-img { width: 100%; height: 100%; object-fit: cover; }
.avatar-emoji { font-size: 22px; }

.author-meta {
  display: flex;
  flex-direction: column;
}

.author-name {
  margin: 0;
  font-weight: 900;
  font-size: 14px;
  color: var(--crt-obsidian);
}

.crml-review-quote-card--pink .author-name { color: var(--crt-pure-white); }

.author-role {
  margin: 0;
  font-family: var(--crml-font-mono, monospace);
  font-size: 11px;
  font-weight: 700;
  color: #333;
}

.crml-review-quote-card--pink .author-role { color: rgba(255,255,255,0.8); }
</style>
