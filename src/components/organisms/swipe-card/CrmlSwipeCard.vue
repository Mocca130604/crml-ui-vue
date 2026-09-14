<script setup lang="ts">
import { ref, computed } from 'vue'

export interface SwipeCardItem {
  id: string | number
  name: string
  tagline: string
  image?: string
  tags?: string[]
  color?: string
}

const props = withDefaults(
  defineProps<{
    cards?: SwipeCardItem[]
  }>(),
  {
    cards: () => [
      {
        id: 1,
        name: 'NEO_BOT_01',
        tagline: 'Cybernetic UI Designer & Mech Pilot',
        tags: ['VUE3', 'BRUTALISM', 'NEON'],
        color: '#FFE600'
      },
      {
        id: 2,
        name: 'CYBER_PUNK_X',
        tagline: 'Audio Visual Synthesizer Lead',
        tags: ['RETRO', 'SYNTH', '16-BIT'],
        color: '#FF0055'
      },
      {
        id: 3,
        name: 'PIXEL_GOBLIN',
        tagline: 'Retro Arcade Game Developer',
        tags: ['PIXEL', 'ARCADE', 'GAME'],
        color: '#00F0FF'
      }
    ]
  }
)

const emit = defineEmits<{
  (e: 'pass', card: SwipeCardItem): void
  (e: 'like', card: SwipeCardItem): void
  (e: 'superlike', card: SwipeCardItem): void
}>()

const currentIndex = ref(0)
const swipeState = ref<'pass' | 'like' | 'superlike' | null>(null)

const currentCard = computed(() => props.cards[currentIndex.value] || null)

function handlePass() {
  if (!currentCard.value) return
  swipeState.value = 'pass'
  emit('pass', currentCard.value)
  setTimeout(() => {
    swipeState.value = null
    currentIndex.value = (currentIndex.value + 1) % props.cards.length
  }, 250)
}

function handleLike() {
  if (!currentCard.value) return
  swipeState.value = 'like'
  emit('like', currentCard.value)
  setTimeout(() => {
    swipeState.value = null
    currentIndex.value = (currentIndex.value + 1) % props.cards.length
  }, 250)
}

function handleSuperlike() {
  if (!currentCard.value) return
  swipeState.value = 'superlike'
  emit('superlike', currentCard.value)
  setTimeout(() => {
    swipeState.value = null
    currentIndex.value = (currentIndex.value + 1) % props.cards.length
  }, 250)
}
</script>

<template>
  <div class="crml-swipe-deck">
    <div class="deck-container">
      <template v-if="currentCard">
        <!-- Background Stack Indicator -->
        <div class="card-stack-bg card-3"></div>
        <div class="card-stack-bg card-2"></div>
        
        <!-- Active Front Card -->
        <div
          class="swipe-card-front"
          :class="[
            swipeState ? `swipe-${swipeState}` : ''
          ]"
          :style="{ backgroundColor: currentCard.color || '#FFE600' }"
        >
          <!-- Card Header & Badge -->
          <div class="card-top-bar">
            <span class="card-deck-idx">#{{ currentIndex + 1 }} / {{ cards.length }}</span>
            <span class="card-status-badge">ONLINE</span>
          </div>

          <!-- Card Content Area -->
          <div class="card-main-content">
            <div class="card-avatar-box">
              <span class="avatar-icon">👾</span>
            </div>

            <div class="card-meta">
              <h3 class="card-title">{{ currentCard.name }}</h3>
              <p class="card-subtitle">{{ currentCard.tagline }}</p>
              
              <div class="card-tags" v-if="currentCard.tags">
                <span v-for="t in currentCard.tags" :key="t" class="tag-pill">#{{ t }}</span>
              </div>
            </div>
          </div>

          <!-- Swipe Feedback Overlay -->
          <div v-if="swipeState === 'pass'" class="swipe-overlay pass-overlay">PASS ✕</div>
          <div v-if="swipeState === 'like'" class="swipe-overlay like-overlay">LIKE ♥</div>
          <div v-if="swipeState === 'superlike'" class="swipe-overlay superlike-overlay">★ SUPER</div>
        </div>
      </template>

      <div v-else class="empty-deck-card">
        <span class="empty-icon">🎴</span>
        <p class="empty-text">NO MORE CARDS</p>
        <button class="crml-btn-reset" @click="currentIndex = 0">RESET DECK</button>
      </div>
    </div>

    <!-- Action Buttons Bar -->
    <div class="action-bar">
      <button class="action-btn pass-btn" title="Pass" @click="handlePass">
        ✕
      </button>
      <button class="action-btn superlike-btn" title="Super Like" @click="handleSuperlike">
        ★
      </button>
      <button class="action-btn like-btn" title="Like" @click="handleLike">
        ♥
      </button>
    </div>
  </div>
</template>

<style scoped>
.crml-swipe-deck {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
  max-width: 320px;
  margin: 0 auto;
}

.deck-container {
  position: relative;
  width: 100%;
  height: 280px;
}

.card-stack-bg {
  position: absolute;
  inset: 0;
  border: 3px solid #000;
  border-radius: 12px;
  background: #f0f0f0;
  box-shadow: 4px 4px 0 #000;
}

.card-3 {
  transform: rotate(-4deg) translateY(6px);
  background: #b8c0ff;
}

.card-2 {
  transform: rotate(3deg) translateY(3px);
  background: #a0c4ff;
}

.swipe-card-front {
  position: absolute;
  inset: 0;
  border: 3px solid #000;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 5px 5px 0 #000;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.2s ease;
  user-select: none;
  overflow: hidden;
}

.swipe-card-front.swipe-pass {
  transform: translateX(-120px) rotate(-15deg);
  opacity: 0;
}

.swipe-card-front.swipe-like {
  transform: translateX(120px) rotate(15deg);
  opacity: 0;
}

.swipe-card-front.swipe-superlike {
  transform: translateY(-120px) scale(0.9);
  opacity: 0;
}

.card-top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: monospace;
  font-weight: 800;
  font-size: 11px;
}

.card-deck-idx {
  background: #000;
  color: #fff;
  padding: 2px 6px;
  border-radius: 4px;
}

.card-status-badge {
  background: #00f0ff;
  color: #000;
  border: 2px solid #000;
  padding: 2px 6px;
  font-weight: 900;
}

.card-main-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 10px;
}

.card-avatar-box {
  width: 64px;
  height: 64px;
  background: #fff;
  border: 3px solid #000;
  border-radius: 10px;
  box-shadow: 3px 3px 0 #000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
}

.card-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.card-title {
  margin: 0;
  font-size: 20px;
  font-weight: 900;
  color: #000;
  letter-spacing: -0.5px;
}

.card-subtitle {
  margin: 0;
  font-size: 12px;
  font-weight: 700;
  color: #333;
}

.card-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: 6px;
}

.tag-pill {
  background: #fff;
  border: 2px solid #000;
  font-size: 10px;
  font-weight: 800;
  padding: 1px 6px;
  border-radius: 4px;
  box-shadow: 1.5px 1.5px 0 #000;
}

.empty-deck-card {
  position: absolute;
  inset: 0;
  border: 3px dashed #000;
  border-radius: 12px;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.empty-icon {
  font-size: 36px;
}

.empty-text {
  font-weight: 900;
  font-family: monospace;
  margin: 0;
}

.crml-btn-reset {
  background: #ffe600;
  border: 2px solid #000;
  font-weight: 900;
  padding: 6px 12px;
  border-radius: 6px;
  box-shadow: 2px 2px 0 #000;
  cursor: pointer;
}

.crml-btn-reset:hover {
  transform: translate(-1px, -1px);
  box-shadow: 3px 3px 0 #000;
}

.action-bar {
  display: flex;
  gap: 16px;
  align-items: center;
}

.action-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 3px solid #000;
  font-size: 20px;
  font-weight: 900;
  cursor: pointer;
  box-shadow: 3px 3px 0 #000;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.1s ease, box-shadow 0.1s ease;
}

.action-btn:hover {
  transform: translate(-2px, -2px);
  box-shadow: 5px 5px 0 #000;
}

.action-btn:active {
  transform: translate(1px, 1px);
  box-shadow: 1px 1px 0 #000;
}

.pass-btn {
  background: #ff4757;
  color: #fff;
}

.superlike-btn {
  background: #00f0ff;
  color: #000;
  width: 40px;
  height: 40px;
  font-size: 16px;
}

.like-btn {
  background: #2ed573;
  color: #fff;
}

.swipe-overlay {
  position: absolute;
  top: 20px;
  right: 20px;
  border: 3px solid #000;
  padding: 4px 10px;
  font-weight: 900;
  font-size: 16px;
  border-radius: 6px;
  box-shadow: 3px 3px 0 #000;
  transform: rotate(12deg);
}

.pass-overlay {
  background: #ff4757;
  color: #fff;
}

.like-overlay {
  background: #2ed573;
  color: #fff;
  right: auto;
  left: 20px;
  transform: rotate(-12deg);
}

.superlike-overlay {
  background: #00f0ff;
  color: #000;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1.1);
}
</style>
