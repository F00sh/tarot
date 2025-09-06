<template>
  <div class="max-w-6xl mx-auto px-4 py-8">
    <h1 class="text-2xl font-semibold">Relationship Spread</h1>
    <p class="text-gray-300 mt-1">How many cards: 6 • You • Them • Relationship now • Challenges • Strengths • Future potential.</p>

    <div class="mt-4 flex items-center gap-3">
      <button @click="draw" class="px-4 py-2 rounded bg-yellow-500 text-black font-medium hover:bg-yellow-400">Draw</button>
      <button @click="reset" class="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600">Reset</button>
    </div>

    <div class="mt-6 grid sm:grid-cols-3 md:grid-cols-6 gap-6">
      <div v-for="(c, i) in cards" :key="i" class="flex flex-col items-center">
        <div class="text-xs text-gray-400 mb-2 text-center">{{ positions[i] }}</div>
        <component v-if="c" :is="getComponentFor(c)" :reversed="c.isReversed" />
      </div>
    </div>

    <PromptPanel v-if="cards.length === 6" :cards="promptCards" :positions="positions" spread="Relationship" placeholder="What should I understand about this relationship?" />
  </div>
</template>

<script setup lang="ts">
import { useDeck } from '@/composables/useDeck'
import PromptPanel from '@/components/PromptPanel.vue'
const { createDeck, shuffleDeck, deal, getComponentFor } = useDeck()
const positions = ['You','Them','Relationship Now','Challenges','Strengths','Future Potential']
const cards = ref<any[]>([])

function draw() { createDeck(); shuffleDeck(); cards.value = deal(6) }
function reset() { cards.value = []; createDeck() }

const promptCards = computed(() => cards.value.map((c: any) => ({
  name: c.name,
  isReversed: c.isReversed,
  uprightKeywords: c.uprightKeywords,
  reversedKeywords: c.reversedKeywords,
})))
</script>

