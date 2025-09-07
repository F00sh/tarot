<template>
  <div class="max-w-6xl mx-auto px-4 py-8 pb-64">
    <h1 class="text-2xl font-semibold">Three-Card Spread</h1>
    <p class="text-gray-300 mt-1">How many cards: 3 • Positions: Past • Present • Future.</p>

    <div class="mt-4 flex items-center gap-3">
      <button @click="draw" class="px-4 py-2 rounded bg-yellow-500 text-black font-medium hover:bg-yellow-400">Draw</button>
      <button @click="reset" class="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600">Reset</button>
    </div>

    <div class="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div v-for="(c, i) in cards" :key="i" class="flex flex-col items-center">
        <div class="text-sm text-gray-400 mb-2">{{ positions[i] }}</div>
        <component v-if="c" :is="getComponentFor(c)" :reversed="c.isReversed" />
      </div>
    </div>

    
  </div>
  <BottomDock v-if="cards.length === 3">
    <PromptPanel :cards="promptCards" :positions="positions" spread="Three-Card (Past-Present-Future)" placeholder="What is the situation and how does it evolve?" />
  </BottomDock>
</template>

<script setup lang="ts">
import { provide } from 'vue'
import { useDeck } from '@/composables/useDeck'
import PromptPanel from '@/components/PromptPanel.vue'
import BottomDock from '@/components/BottomDock.vue'
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
</script>

