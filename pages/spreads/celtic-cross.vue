<template>
  <div class="max-w-6xl mx-auto px-4 py-8">
    <h1 class="text-2xl font-semibold">Celtic Cross</h1>
    <p class="text-gray-300 mt-1">How many cards: 10 • Full, detailed reading.</p>

    <div class="mt-4 flex items-center gap-3">
      <button @click="draw" class="px-4 py-2 rounded bg-yellow-500 text-black font-medium hover:bg-yellow-400">Draw</button>
      <button @click="reset" class="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600">Reset</button>
    </div>

    <div class="mt-6 grid md:grid-cols-5 gap-6">
      <div v-for="(c, i) in cards" :key="i" class="flex flex-col items-center">
        <div class="text-xs text-gray-400 mb-2 text-center">{{ i + 1 }}. {{ positions[i] }}</div>
        <component v-if="c" :is="getComponentFor(c)" :reversed="c.isReversed" />
      </div>
    </div>

    <PromptPanel v-if="cards.length === 10" :cards="promptCards" :positions="positions" spread="Celtic Cross" placeholder="What would you like to understand in depth?" />
  </div>
</template>

<script setup lang="ts">
import { useDeck } from '@/composables/useDeck'
import PromptPanel from '@/components/PromptPanel.vue'
const { createDeck, shuffleDeck, deal, getComponentFor } = useDeck()
const positions = [
  'Present','Challenge','Past','Future','Above','Below','Advice','External Influences','Hopes / Fears','Outcome'
]
const cards = ref<any[]>([])

function draw() { createDeck(); shuffleDeck(); cards.value = deal(10) }
function reset() { cards.value = []; createDeck() }

const promptCards = computed(() => cards.value.map((c: any) => ({
  name: c.name,
  isReversed: c.isReversed,
  uprightKeywords: c.uprightKeywords,
  reversedKeywords: c.reversedKeywords,
})))
</script>

