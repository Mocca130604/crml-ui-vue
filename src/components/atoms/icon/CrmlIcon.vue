<script setup lang="ts">
import { computed } from 'vue'
import type { CrmlIconName, CrmlIconSize, CrmlIconVariant } from '../../../icons/types'
import { CRML_ICONS } from '../../../icons/defs'

export interface CrmlIconProps {
  name: CrmlIconName
  size?: CrmlIconSize
  variant?: CrmlIconVariant
  strokeWidth?: number | string
  spin?: boolean
  title?: string
}

const props = withDefaults(defineProps<CrmlIconProps>(), {
  name: 'bolt',
  size: 'md',
  variant: 'current',
  strokeWidth: 2.5,
  spin: false
})

const iconDef = computed(() => {
  return CRML_ICONS[props.name] || CRML_ICONS['bolt']
})

const sizePixels = computed(() => {
  if (typeof props.size === 'number') return `${props.size}px`
  switch (props.size) {
    case 'xs': return '16px'
    case 'sm': return '20px'
    case 'md': return '24px'
    case 'lg': return '32px'
    case 'xl': return '40px'
    default: return '24px'
  }
})

const iconColor = computed(() => {
  switch (props.variant) {
    case 'lime': return 'var(--crt-electric-lime, #CCFF00)'
    case 'pink': return 'var(--crt-hot-pink, #FF007F)'
    case 'cyan': return 'var(--crt-cyber-cyan, #00F0FF)'
    case 'yellow': return 'var(--crt-sunburst-yellow, #FFD600)'
    case 'obsidian': return 'var(--crt-obsidian, #0D0D0D)'
    case 'white': return 'var(--crt-pure-white, #FFFFFF)'
    case 'ghost': return 'rgba(13, 13, 13, 0.4)'
    case 'current':
    default:
      return 'currentColor'
  }
})
</script>

<template>
  <svg
    class="crml-icon"
    :class="[
      `crml-icon--${variant}`,
      { 'crml-icon--spin': spin }
    ]"
    :style="{
      width: sizePixels,
      height: sizePixels,
      color: iconColor
    }"
    :viewBox="iconDef.viewBox || '0 0 24 24'"
    fill="none"
    stroke="currentColor"
    :stroke-width="strokeWidth"
    stroke-linecap="square"
    stroke-linejoin="miter"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    :aria-label="title || name"
  >
    <title v-if="title">{{ title }}</title>
    <template v-for="(el, idx) in iconDef.elements" :key="idx">
      <path
        v-if="!el.tag || el.tag === 'path'"
        :d="el.d"
        :fill="el.fill || 'none'"
        :stroke="el.stroke || 'currentColor'"
        :stroke-width="el.strokeWidth || strokeWidth"
        :stroke-linecap="el.strokeLinecap || 'square'"
        :stroke-linejoin="el.strokeLinejoin || 'miter'"
      />
      <circle
        v-else-if="el.tag === 'circle'"
        :cx="el.cx"
        :cy="el.cy"
        :r="el.r"
        :fill="el.fill || 'none'"
        :stroke="el.stroke || 'currentColor'"
        :stroke-width="el.strokeWidth || strokeWidth"
      />
      <ellipse
        v-else-if="el.tag === 'ellipse'"
        :cx="el.cx"
        :cy="el.cy"
        :rx="el.rx"
        :ry="el.ry"
        :fill="el.fill || 'none'"
        :stroke="el.stroke || 'currentColor'"
        :stroke-width="el.strokeWidth || strokeWidth"
      />
      <rect
        v-else-if="el.tag === 'rect'"
        :x="el.x"
        :y="el.y"
        :width="el.width"
        :height="el.height"
        :rx="el.rx"
        :ry="el.ry"
        :fill="el.fill || 'none'"
        :stroke="el.stroke || 'currentColor'"
        :stroke-width="el.strokeWidth || strokeWidth"
      />
      <line
        v-else-if="el.tag === 'line'"
        :x1="el.x1"
        :y1="el.y1"
        :x2="el.x2"
        :y2="el.y2"
        :stroke="el.stroke || 'currentColor'"
        :stroke-width="el.strokeWidth || strokeWidth"
        :stroke-linecap="el.strokeLinecap || 'square'"
      />
      <polyline
        v-else-if="el.tag === 'polyline'"
        :points="el.points"
        :fill="el.fill || 'none'"
        :stroke="el.stroke || 'currentColor'"
        :stroke-width="el.strokeWidth || strokeWidth"
        :stroke-linecap="el.strokeLinecap || 'square'"
        :stroke-linejoin="el.strokeLinejoin || 'miter'"
      />
      <polygon
        v-else-if="el.tag === 'polygon'"
        :points="el.points"
        :fill="el.fill || 'none'"
        :stroke="el.stroke || 'currentColor'"
        :stroke-width="el.strokeWidth || strokeWidth"
        :stroke-linecap="el.strokeLinecap || 'square'"
        :stroke-linejoin="el.strokeLinejoin || 'miter'"
      />
    </template>
  </svg>
</template>

<style scoped>
.crml-icon {
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
  user-select: none;
  transition: transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.15s ease;
}

.crml-icon--spin {
  animation: crml-spin 1s linear infinite;
}

@keyframes crml-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
