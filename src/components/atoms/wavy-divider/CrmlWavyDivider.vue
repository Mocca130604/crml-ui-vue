<template>
  <div :class="['crml-wavy-divider', `crml-wavy-divider--${styleType}`]">
    <svg v-if="styleType === 'wave'" class="wavy-svg" viewBox="0 0 1200 24" preserveAspectRatio="none">
      <path
        d="M0,12 C150,24 350,0 500,12 C650,24 850,0 1000,12 C1100,20 1150,8 1200,12"
        fill="none"
        :stroke="color"
        stroke-width="4"
        stroke-linecap="round"
      />
    </svg>

    <svg v-else class="wavy-svg" viewBox="0 0 1200 20" preserveAspectRatio="none">
      <path
        d="M0,10 L30,0 L60,20 L90,0 L120,20 L150,0 L180,20 L210,0 L240,20 L270,0 L300,20 L330,0 L360,20 L390,0 L420,20 L450,0 L480,20 L510,0 L540,20 L570,0 L600,20 L630,0 L660,20 L690,0 L720,20 L750,0 L780,20 L810,0 L840,20 L870,0 L900,20 L930,0 L960,20 L990,0 L1020,20 L1050,0 L1080,20 L1110,0 L1140,20 L1170,0 L1200,10"
        fill="none"
        :stroke="color"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
export interface CrmlWavyDividerProps {
  styleType?: 'wave' | 'zigzag';
  color?: string;
}

withDefaults(defineProps<CrmlWavyDividerProps>(), {
  styleType: 'wave',
  color: '#FF007F',
});
</script>

<style scoped>
.crml-wavy-divider {
  width: 100%;
  margin: 1.5rem 0;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.wavy-svg {
  width: 100%;
  height: 24px;
}
</style>
