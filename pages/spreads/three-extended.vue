<template>
  <div class="max-w-none mx-auto px-4 py-8 w-full">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-2xl font-semibold text-center">Three-Card — Extended</h1>
      <p class="text-gray-300 mt-1 text-center">Draw one by one with optional shuffle/cut before each draw.</p>

      <!-- Toggles and controls -->
      <div class="mt-4 flex flex-wrap items-center justify-center gap-3">
        <button @click="toggleShuffle" :class="toggleClass(shuffleBefore)" aria-pressed="shuffleBefore">Shuffle before draw</button>
        <button @click="toggleCut" :class="toggleClass(cutBefore)" aria-pressed="cutBefore">Cut before draw</button>
        <span class="chip">{{ drawnCount }} / {{ positions.length }}</span>
      </div>
      <div class="mt-3 flex items-center justify-center gap-3">
        <button @click="drawNext" class="btn-warn" :disabled="drawnCount >= positions.length">Draw Next</button>
        <button @click="reset" class="btn-muted">Reset</button>
      </div>

      <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
        <div v-for="(c, i) in cards" :key="i" class="flex flex-col items-center text-center">
          <div class="mb-2 chip">
            <span class="font-semibold">{{ positions[i] }}</span>
            <template v-if="c"> — {{ c.name }} <span class="text-gray-300">({{ c.isReversed ? 'Reversed' : 'Upright' }})</span></template>
          </div>
          <PositionProvider :label="positions[i]">
            <component v-if="c" :is="getComponentFor(c)" :reversed="c.isReversed" />
          </PositionProvider>
        </div>
      </div>
    </div>
  </div>
  <ChatPanelLauncher v-if="drawnCount > 0" :cards="promptCards" :positions="positions.slice(0, drawnCount)" spread="Three-Card — Extended" />
</template>

<script setup lang="ts">
import { provide } from 'vue'
import { useDeck } from '@/composables/useDeck'
import PositionProvider from '@/components/PositionProvider.vue'
import ChatPanelLauncher from '@/components/ChatPanelLauncher.vue'

const { createDeck, shuffleDeck, cutDeck, deal, getComponentFor } = useDeck()
const positions = ['Past', 'Present', 'Future']
const cards = ref<any[]>(Array(positions.length).fill(null))
const drawnCount = computed(() => cards.value.filter(Boolean).length)

const shuffleBefore = ref(true)
const cutBefore = ref(false)
function toggleShuffle() { shuffleBefore.value = !shuffleBefore.value }
function toggleCut() { cutBefore.value = !cutBefore.value }

function ensureDeck() { if (!drawnCount.value) createDeck() }
function drawNext() {
  if (drawnCount.value >= positions.length) return
  ensureDeck()
  if (shuffleBefore.value) shuffleDeck()
  if (cutBefore.value) cutDeck()
  const [next] = deal(1)
  const idx = drawnCount.value
  if (next) cards.value[idx] = next
}
function reset() {
  cards.value = Array(positions.length).fill(null)
  createDeck()
}

const drawnOnly = computed(() => cards.value.filter(Boolean))
const promptCards = computed(() => drawnOnly.value.map((c: any) => ({
  name: c.name,
  isReversed: c.isReversed,
  uprightKeywords: c.uprightKeywords,
  reversedKeywords: c.reversedKeywords,
})))

function toggleClass(active: boolean) {
  return active ? 'btn-primary' : 'btn-muted'
}

provide('cardClear', true)
provide('cardSize', 'lg')
</script>

