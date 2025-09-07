<template>
  <div class="max-w-6xl mx-auto px-4 py-8 pb-64">
    <h1 class="text-3xl font-semibold mb-6">Tarot Deck</h1>

    <div class="flex flex-wrap items-center gap-3">
      <button @click="onShuffle" class="px-4 py-2 rounded bg-yellow-500 text-black font-medium hover:bg-yellow-400">Shuffle</button>
      <button @click="onCut" class="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600">Cut</button>
      <div class="flex items-center gap-2">
        <label for="dealCount" class="text-sm text-gray-300">Deal</label>
        <input id="dealCount" type="number" v-model.number="dealCount" min="1" class="w-20 px-2 py-1 rounded bg-gray-800 border border-gray-700" />
        <button @click="onDeal" class="px-3 py-1.5 rounded bg-indigo-500 text-white hover:bg-indigo-400">Deal</button>
        <button @click="onReset" class="px-3 py-1.5 rounded bg-gray-700 hover:bg-gray-600">Reset</button>
      </div>
    </div>

    <div class="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      <component
        v-for="card in dealt"
        :key="card.id + '-' + (card.isReversed ? 'r' : 'u')"
        :is="getComponentFor(card)"
        :reversed="card.isReversed"
      />
    </div>

    
  </div>
  <BottomDock v-if="dealt.length">
    <PromptPanel :cards="promptCards" spread="Free Draw" />
  </BottomDock>
  
</template>

<script setup lang="ts">
import { provide } from 'vue'
import { useDeck } from '@/composables/useDeck'
import PromptPanel from '@/components/PromptPanel.vue'
import BottomDock from '@/components/BottomDock.vue'

const { dealt, shuffleDeck, cutDeck, deal, createDeck, getComponentFor } = useDeck()

const dealCount = ref(3)
function onShuffle() { shuffleDeck() }
function onCut() { cutDeck() }
async function onDeal() { deal(dealCount.value || 1) }
function onReset() { createDeck() }

const promptCards = computed(() => dealt.value.map(c => ({
  name: c.name,
  isReversed: c.isReversed,
  uprightKeywords: c.uprightKeywords,
  reversedKeywords: c.reversedKeywords,
})))

// Show clear cards by default on this page
provide('cardClear', true)
</script>
