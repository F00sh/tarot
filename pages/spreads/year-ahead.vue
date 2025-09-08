<template>
  <div class="max-w-none mx-auto px-4 py-8 w-full">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-2xl font-semibold text-center">Year Ahead</h1>
      <p class="text-gray-300 mt-1 text-center">How many cards: 12 • One for each month.</p>

      <div class="mt-4 flex items-center justify-center gap-3">
        <button @click="draw" class="btn-warn">Draw</button>
        <button @click="reset" class="btn-muted">Reset</button>
      </div>

      <!-- Unified responsive grid: always visible, spaced cards -->
      <div class="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 justify-items-center">
        <div v-for="(c, i) in cards" :key="i" class="flex flex-col items-center text-center">
          <div class="mb-2 chip">
            <span class="font-semibold">{{ months[i] }}</span>
            <template v-if="c"> — {{ c.name }} <span class="text-gray-300">({{ c.isReversed ? 'Reversed' : 'Upright' }})</span></template>
          </div>
          <PositionProvider :label="months[i]">
            <component v-if="c" :is="getComponentFor(c)" :reversed="c.isReversed" />
          </PositionProvider>
        </div>
      </div>
    </div>
  </div>
  <ChatPanelLauncher v-if="cards.length === 12" :cards="promptCards" :positions="months" spread="Year Ahead" placeholder="What themes define my upcoming year?" />
</template>

<script setup lang="ts">
import { provide } from 'vue'
import { useDeck } from '@/composables/useDeck'
import ChatPanelLauncher from '@/components/ChatPanelLauncher.vue'
import PositionProvider from '@/components/PositionProvider.vue'
const { createDeck, shuffleDeck, deal, getComponentFor } = useDeck()
const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
const cards = ref<any[]>([])

function draw() { createDeck(); shuffleDeck(); cards.value = deal(12) }
function reset() { cards.value = []; createDeck() }

const promptCards = computed(() => cards.value.map((c: any) => ({
  name: c.name,
  isReversed: c.isReversed,
  uprightKeywords: c.uprightKeywords,
  reversedKeywords: c.reversedKeywords,
})))

provide('cardClear', true)
// Smaller cards to keep all 12 visible without overlap
provide('cardSize', 'sm')
</script>
