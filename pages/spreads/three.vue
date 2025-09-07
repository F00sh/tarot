<template>
  <div class="max-w-none mx-auto px-4 py-8 w-full overflow-hidden md:grid md:grid-cols-12 md:gap-6">
    <div class="md:col-span-8">
      <h1 class="text-2xl font-semibold">Three-Card Spread</h1>
      <p class="text-gray-300 mt-1">How many cards: 3 • Positions: Past • Present • Future.</p>

      <div class="mt-4 flex items-center gap-3">
        <button @click="draw" class="px-4 py-2 rounded bg-yellow-500 text-black font-medium hover:bg-yellow-400">Draw</button>
        <button @click="reset" class="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600">Reset</button>
      </div>

      <!-- Mobile single-column list; desktop 3-column grid -->
      <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 justify-items-center w-full overflow-hidden">
        <div v-for="(c, i) in cards" :key="i" class="flex flex-col items-center text-center">
          <div class="text-sm text-gray-400 mb-2">{{ positions[i] }}</div>
          <component v-if="c" :is="getComponentFor(c)" :reversed="c.isReversed" />
          <div class="mt-2 text-base font-medium md:hidden">{{ c?.name }} <span class="text-gray-400">({{ c?.isReversed ? 'Reversed' : 'Upright' }})</span></div>
          <div class="mt-1 text-sm text-gray-300 max-w-prose md:hidden">Keywords: {{ (c?.isReversed ? c?.reversedKeywords : c?.uprightKeywords).join(', ') }}</div>
        </div>
      </div>
    </div>
    <aside class="hidden md:block md:col-span-4 pt-12">
      <div class="sticky top-24">
        <PromptPanel v-if="cards.length === 3" :cards="promptCards" :positions="positions" spread="Three-Card (Past-Present-Future)" placeholder="What is the situation and how does it evolve?" />
      </div>
    </aside>
  </div>
  <ChatPanelLauncher class="md:hidden" v-if="cards.length === 3" :cards="promptCards" :positions="positions" spread="Three-Card (Past-Present-Future)" placeholder="What is the situation and how does it evolve?" />
</template>

<script setup lang="ts">
import { provide } from 'vue'
import { useDeck } from '@/composables/useDeck'
import ChatPanelLauncher from '@/components/ChatPanelLauncher.vue'
import PromptPanel from '@/components/PromptPanel.vue'
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
