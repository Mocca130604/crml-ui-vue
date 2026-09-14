<template>
  <div :class="['crml-hypebeast-banner', `crml-hypebeast-banner--${variant}`]">
    <div class="banner-left">
      <slot name="header">
        <span class="drop-tag">{{ tagText }}</span>
        <h3 class="drop-title">{{ title }}</h3>
        <p v-if="subtitle" class="drop-subtitle">{{ subtitle }}</p>
      </slot>
    </div>

    <div class="banner-timer">
      <div class="timer-box">
        <span class="timer-num">{{ hours }}</span>
        <span class="timer-unit">{{ hrsLabel }}</span>
      </div>
      <span class="timer-colon">{{ timerSeparator }}</span>
      <div class="timer-box">
        <span class="timer-num">{{ minutes }}</span>
        <span class="timer-unit">{{ minLabel }}</span>
      </div>
      <span class="timer-colon">{{ timerSeparator }}</span>
      <div class="timer-box">
        <span class="timer-num">{{ seconds }}</span>
        <span class="timer-unit">{{ secLabel }}</span>
      </div>
    </div>

    <div v-if="$slots.action" class="banner-action">
      <slot name="action" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';

export interface CrmlHypebeastDropBannerProps {
  /** Main title text */
  title?: string;
  /** Subtitle text */
  subtitle?: string;
  /** Tag text above title */
  tagText?: string;
  /** Total hours for countdown */
  targetHours?: number;
  /** Or specify a target date directly */
  targetDate?: Date | string;
  /** Color variant */
  variant?: 'obsidian' | 'lime' | 'pink' | 'cyan' | 'yellow';
  /** Label for hours */
  hrsLabel?: string;
  /** Label for minutes */
  minLabel?: string;
  /** Label for seconds */
  secLabel?: string;
  /** Timer separator character */
  timerSeparator?: string;
}

const props = withDefaults(defineProps<CrmlHypebeastDropBannerProps>(), {
  title: 'CYBER-MECHA OVERSIZED TEE',
  tagText: '⚡ SECRET DROP UNLOCKS IN',
  variant: 'obsidian',
  targetHours: 10,
  hrsLabel: 'HRS',
  minLabel: 'MIN',
  secLabel: 'SEC',
  timerSeparator: ':',
});

const emit = defineEmits<{
  (e: 'expired'): void;
  (e: 'tick', remaining: number): void;
}>();

const totalSeconds = ref(0);
let timerInterval: any = null;

const hours = ref('00');
const minutes = ref('00');
const seconds = ref('00');

const calculateTotal = () => {
  if (props.targetDate) {
    const target = new Date(props.targetDate).getTime();
    const diff = Math.max(0, Math.floor((target - Date.now()) / 1000));
    return diff;
  }
  return props.targetHours * 3600;
};

const updateTime = () => {
  if (totalSeconds.value <= 0) {
    emit('expired');
    if (timerInterval) clearInterval(timerInterval);
    return;
  }
  totalSeconds.value--;
  emit('tick', totalSeconds.value);

  const h = Math.floor(totalSeconds.value / 3600);
  const m = Math.floor((totalSeconds.value % 3600) / 60);
  const s = totalSeconds.value % 60;

  hours.value = String(h).padStart(2, '0');
  minutes.value = String(m).padStart(2, '0');
  seconds.value = String(s).padStart(2, '0');
};

watch(() => [props.targetHours, props.targetDate], () => {
  totalSeconds.value = calculateTotal();
  updateTime();
});

onMounted(() => {
  totalSeconds.value = calculateTotal();
  updateTime();
  timerInterval = setInterval(updateTime, 1000);
});

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval);
});
</script>

<style scoped>
.crml-hypebeast-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 1.25rem 1.75rem;
  border: var(--crml-border-brutal);
  border-radius: var(--crml-radius-lg);
  flex-wrap: wrap;
  font-family: var(--crml-font-heading);
}

/* Variants */
.crml-hypebeast-banner--obsidian {
  background: var(--crt-obsidian); color: var(--crt-electric-lime);
  box-shadow: 6px 6px 0px var(--crt-hot-pink);
}
.crml-hypebeast-banner--lime {
  background: var(--crt-electric-lime); color: var(--crt-obsidian);
  box-shadow: 6px 6px 0px var(--crml-shadow-ink, #0D0D0D);
}
.crml-hypebeast-banner--pink {
  background: var(--crt-hot-pink); color: var(--crt-pure-white);
  box-shadow: 6px 6px 0px var(--crml-shadow-ink, #0D0D0D);
}
.crml-hypebeast-banner--cyan {
  background: var(--crt-cyber-cyan); color: var(--crt-obsidian);
  box-shadow: 6px 6px 0px var(--crml-shadow-ink, #0D0D0D);
}
.crml-hypebeast-banner--yellow {
  background: var(--crt-sunburst-yellow); color: var(--crt-obsidian);
  box-shadow: 6px 6px 0px var(--crml-shadow-ink, #0D0D0D);
}

.banner-left {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.drop-tag {
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  opacity: 0.85;
}

.crml-hypebeast-banner--obsidian .drop-tag { color: var(--crt-hot-pink); }

.drop-title {
  font-size: 1.25rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.crml-hypebeast-banner--obsidian .drop-title { color: var(--crt-pure-white); }

.drop-subtitle {
  font-size: 0.8rem;
  font-weight: 600;
  opacity: 0.7;
}

.banner-timer {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.timer-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--crt-electric-lime);
  color: var(--crt-obsidian);
  border: 2px solid var(--crml-border-ink, #0D0D0D);
  border-radius: var(--crml-radius-md);
  padding: 0.35rem 0.65rem;
  min-width: 3.25rem;
  box-shadow: 2px 2px 0px var(--crml-shadow-ink, #0D0D0D);
}

.timer-num {
  font-family: var(--crml-font-mono);
  font-weight: 900;
  font-size: 1.35rem;
  line-height: 1;
}

.timer-unit {
  font-size: 0.65rem;
  font-weight: 800;
  margin-top: 0.15rem;
}

.timer-colon {
  font-family: var(--crml-font-mono);
  font-weight: 900;
  font-size: 1.5rem;
}

.crml-hypebeast-banner--obsidian .timer-colon { color: var(--crt-hot-pink); }

.banner-action {
  display: flex;
  align-items: center;
}
</style>
