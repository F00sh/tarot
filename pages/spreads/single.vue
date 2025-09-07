<template>
  <div class="max-w-5xl mx-auto px-4 py-8 pb-64">
    <h1 class="text-2xl font-semibold">Single Card Draw</h1>
    <p class="text-gray-300 mt-1">How many cards: 1 • Quick daily guidance or yes/no.</p>

    <div class="mt-4 flex items-center gap-3">
      <button @click="draw" class="px-4 py-2 rounded bg-yellow-500 text-black font-medium hover:bg-yellow-400">Draw</button>
      <button @click="reset" class="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600">Reset</button>
    </div>

    <div class="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-items-center w-full overflow-hidden">
      <component v-if="cards[0]" :is="getComponentFor(cards[0])" :reversed="cards[0].isReversed" />
    </div>

    
  </div>
  <BottomDock v-if="cards.length">
    <PromptPanel :cards="promptCards" :positions="['Focus']" spread="Single Card Draw" placeholder="What guidance do I need today?" />
  </BottomDock>
</template>

<script setup lang="ts">
import { provide } from 'vue'
import { useDeck } from '@/composables/useDeck'
import PromptPanel from '@/components/PromptPanel.vue'
import BottomDock from '@/components/BottomDock.vue'

const { createDeck, shuffleDeck, deal, getComponentFor } = useDeck()
const cards = ref<any[]>([])

function draw() {
  createDeck()
  shuffleDeck()
  cards.value = deal(1)
}
function reset() {
  cards.value = []
  createDeck()
}

const promptCards = computed(() => cards.value.map((c: any) => ({
  name: c.name,
  isReversed: c.isReversed,
  uprightKeywords: c.uprightKeywords,
  reversedKeywords: c.reversedKeywords,
})))

provide('cardClear', true)
provide('cardSize', 'sm')
</script>

