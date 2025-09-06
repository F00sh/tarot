<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <h1 class="text-2xl font-semibold">Year Ahead</h1>
    <p class="text-gray-300 mt-1">How many cards: 12 • One for each month.</p>

    <div class="mt-4 flex items-center gap-3">
      <button @click="draw" class="px-4 py-2 rounded bg-yellow-500 text-black font-medium hover:bg-yellow-400">Draw</button>
      <button @click="reset" class="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600">Reset</button>
    </div>

    <div class="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
      <div v-for="(c, i) in cards" :key="i" class="flex flex-col items-center">
        <div class="text-xs text-gray-400 mb-2 text-center">{{ months[i] }}</div>
        <component v-if="c" :is="getComponentFor(c)" :reversed="c.isReversed" />
      </div>
    </div>

    <PromptPanel v-if="cards.length === 12" :cards="promptCards" :positions="months" spread="Year Ahead" placeholder="What themes define my upcoming year?" />
  </div>
</template>

<script setup lang="ts">
import { useDeck } from '@/composables/useDeck'
import PromptPanel from '@/components/PromptPanel.vue'
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
</script>

