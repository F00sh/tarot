<template>
  <div class="max-w-none mx-auto px-4 py-8 w-full">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-2xl font-semibold text-center">Three-Card Spread</h1>
      <p class="text-gray-300 mt-1 text-center">How many cards: 3 • Positions: Past • Present • Future.</p>

      <div class="mt-4 flex items-center justify-center gap-3">
        <button @click="draw" class="btn-warn">Draw</button>
        <button @click="reset" class="btn-muted">Reset</button>
      </div>

      <!-- Unified layout: responsive 3-up grid with spacing -->
      <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
        <div v-for="(c, i) in cards" :key="i" class="flex flex-col items-center text-center">
          <div class="mb-2 chip">
            <span class="font-semibold">{{ positions[i] }}</span>
            <template v-if="c"> — {{ c.name }} <span class="text-gray-300">({{ c.isReversed ? 'Reversed' : 'Upright' }})</span></template>
          </div>
          <PositionProvider :label="positions[i]">
            <component v-if="c" :is="getComponentFor(c)" :reversed="c.isReversed" />
          </PositionProvider>
          <div class="mt-2 text-sm text-gray-300">Keywords: {{ (c?.isReversed ? c?.reversedKeywords : c?.uprightKeywords).slice(0,4).join(', ') }}</div>
        </div>
      </div>
    </div>
  </div>
  <ChatPanelLauncher v-if="cards.length === 3" :cards="promptCards" :positions="positions" spread="Three-Card (Past-Present-Future)" placeholder="What is the situation and how does it evolve?" />
</template>

<script setup lang="ts">
import { provide } from 'vue'
import { useDeck } from '@/composables/useDeck'
import ChatPanelLauncher from '@/components/ChatPanelLauncher.vue'
import PositionProvider from '@/components/PositionProvider.vue'
const { createDeck, shuffleDeck, deal, getComponentFor } = useDeck()
const positions = ['Past', 'Present', 'Future']
const cards = ref<any[]>([])

function draw() { createDeck(); shuffleDeck(); cards.value = deal(3) }
function reset() { cards.value = []; createDeck() }

const promptCards = computed(() => cards.value.map((c: any) => ({
  name: c.name,
  isReversed: c.isReversed,
  uprightKeywords: c.uprightKeywords,
  reversedKeywords: c.reversedKeywords,
})))

provide('cardClear', true)
provide('cardSize', 'lg')
</script>
