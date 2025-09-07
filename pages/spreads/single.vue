<template>
  <div class="max-w-none mx-auto px-4 py-8 w-full overflow-hidden md:grid md:grid-cols-12 md:gap-6">
    <div class="md:col-span-8">
      <h1 class="text-2xl font-semibold">Single Card Draw</h1>
      <p class="text-gray-300 mt-1">How many cards: 1 • Quick daily guidance or yes/no.</p>

      <div class="mt-4 flex items-center gap-3">
        <button @click="draw" class="px-4 py-2 rounded bg-yellow-500 text-black font-medium hover:bg-yellow-400">Draw</button>
        <button @click="reset" class="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600">Reset</button>
      </div>

      <div class="mt-6 grid grid-cols-1 justify-items-center w-full overflow-hidden">
        <div v-if="cards[0]" class="flex flex-col items-center text-center">
          <component :is="getComponentFor(cards[0])" :reversed="cards[0].isReversed" />
          <div class="mt-2 text-base font-medium md:hidden">{{ cards[0]?.name }} <span class="text-gray-400">({{ cards[0]?.isReversed ? 'Reversed' : 'Upright' }})</span></div>
          <div class="mt-1 text-sm text-gray-300 max-w-prose md:hidden">Keywords: {{ (cards[0]?.isReversed ? cards[0]?.reversedKeywords : cards[0]?.uprightKeywords).join(', ') }}</div>
        </div>
      </div>
    </div>
    <!-- Chat sidebar removed; use floating launcher -->
  </div>
  <ChatPanelLauncher v-if="cards.length" :cards="promptCards" :positions="['Focus']" spread="Single Card Draw" placeholder="What guidance do I need today?" />
</template>

<script setup lang="ts">
import { provide } from 'vue'
import { useDeck } from '@/composables/useDeck'
import ChatPanelLauncher from '@/components/ChatPanelLauncher.vue'
import PromptPanel from '@/components/PromptPanel.vue'

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
provide('cardSize', 'lg')
</script>
