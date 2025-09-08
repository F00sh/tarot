<template>
  <div class="max-w-none mx-auto px-4 py-8 w-full overflow-hidden">
    <div class="max-w-5xl mx-auto">
      <h1 class="text-2xl font-semibold text-center">Single Card Draw</h1>
      <p class="text-gray-300 mt-1 text-center">How many cards: 1 • Quick daily guidance or yes/no.</p>

      <div class="mt-4 flex items-center justify-center gap-3">
        <button @click="draw" class="btn-warn">Draw</button>
        <button @click="reset" class="btn-muted">Reset</button>
      </div>

      <!-- Mobile: single column -->
      <div class="md:hidden mt-6 grid grid-cols-1 justify-items-center w-full overflow-hidden">
        <div v-if="cards[0]" class="flex flex-col items-center text-center">
          <!-- Mobile: caption above -->
          <div class="md:hidden text-left w-full max-w-xs sm:max-w-sm">
            <div class="chip">
              <span class="font-semibold">Focus</span>
              — {{ cards[0].name }} <span class="text-gray-300">({{ cards[0].isReversed ? 'Reversed' : 'Upright' }})</span>
              <span class="block text-xs text-gray-200/90 mt-0.5">{{ (cards[0].isReversed ? cards[0].reversedKeywords : cards[0].uprightKeywords).slice(0,3).join(', ') }}</span>
            </div>
          </div>
          <!-- Card with desktop overlay caption -->
          <div class="relative">
            <PositionProvider label="Focus">
              <component :is="getComponentFor(cards[0])" :reversed="cards[0].isReversed" />
            </PositionProvider>
            <div class="hidden md:block absolute top-2 left-2 z-20 pointer-events-none chip">
              <span class="font-semibold">Focus</span> — {{ cards[0].name }}
            </div>
          </div>
          <div class="mt-2 text-base font-medium md:hidden">{{ cards[0]?.name }} <span class="text-gray-400">({{ cards[0]?.isReversed ? 'Reversed' : 'Upright' }})</span></div>
          <div class="mt-1 text-sm text-gray-300 max-w-prose md:hidden">Keywords: {{ (cards[0]?.isReversed ? cards[0]?.reversedKeywords : cards[0]?.uprightKeywords).join(', ') }}</div>
        </div>
      </div>

      <!-- Desktop: scaled single card centered with caption above -->
      <div class="hidden md:block mt-6 w-full overflow-hidden grid place-items-center" style="height: calc(100dvh - 140px);">
        <SpreadScaler>
          <div class="flex flex-col items-center text-center">
            <div class="mb-2 inline-block bg-black/70 text-gray-100 text-sm px-2 py-0.5 rounded">
              <span class="font-semibold">Focus</span>
              <template v-if="cards[0]"> — {{ cards[0].name }}</template>
            </div>
            <PositionProvider label="Focus">
              <component v-if="cards[0]" :is="getComponentFor(cards[0])" :reversed="cards[0].isReversed" />
            </PositionProvider>
          </div>
        </SpreadScaler>
      </div>
    </div>
  </div>
  <ChatPanelLauncher v-if="cards.length" :cards="promptCards" :positions="['Focus']" spread="Single Card Draw" placeholder="What guidance do I need today?" />
</template>

<script setup lang="ts">
import { provide } from 'vue'
import { useDeck } from '@/composables/useDeck'
import ChatPanelLauncher from '@/components/ChatPanelLauncher.vue'
import PromptPanel from '@/components/PromptPanel.vue'
import PositionProvider from '@/components/PositionProvider.vue'
import SpreadScaler from '@/components/SpreadScaler.vue'

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
provide('cardSize', 'md')
</script>
