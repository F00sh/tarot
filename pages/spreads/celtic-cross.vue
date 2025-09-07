<template>
  <div class="max-w-6xl mx-auto px-4 py-8 pb-64 w-full overflow-hidden">
    <h1 class="text-2xl font-semibold">Celtic Cross</h1>
    <p class="text-gray-300 mt-1">How many cards: 10 • Full, detailed reading.</p>

    <div class="mt-4 flex items-center gap-3">
      <button @click="draw" class="px-4 py-2 rounded bg-yellow-500 text-black font-medium hover:bg-yellow-400">Draw</button>
      <button @click="reset" class="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600">Reset</button>
    </div>

    <!-- Scaled realistic Celtic Cross layout, fits viewport -->
    <div class="mt-6" style="height: min(65vh, 700px);">
      <SpreadScaler :width="900" :height="520">
      <div class="relative" style="width: 900px; height: 520px;">
        <!-- Cross center (1) -->
        <div class="absolute" style="left: 260px; top: 160px;">
          <div class="text-xs text-gray-400 mb-1 text-center">1. {{ positions[0] }}</div>
          <component v-if="cards[0]" :is="getComponentFor(cards[0])" :reversed="cards[0].isReversed" />
        </div>
        <!-- Crossing (2) slightly offset to overlap without rotation for readability -->
        <div class="absolute" style="left: 275px; top: 145px;">
          <div class="text-xs text-gray-400 mb-1 text-center">2. {{ positions[1] }}</div>
          <component v-if="cards[1]" :is="getComponentFor(cards[1])" :reversed="cards[1].isReversed" />
        </div>
        <!-- Left (3 - Past) -->
        <div class="absolute" style="left: 60px; top: 160px;">
          <div class="text-xs text-gray-400 mb-1 text-center">3. {{ positions[2] }}</div>
          <component v-if="cards[2]" :is="getComponentFor(cards[2])" :reversed="cards[2].isReversed" />
        </div>
        <!-- Above (5) -->
        <div class="absolute" style="left: 260px; top: -40px;">
          <div class="text-xs text-gray-400 mb-1 text-center">5. {{ positions[4] }}</div>
          <component v-if="cards[4]" :is="getComponentFor(cards[4])" :reversed="cards[4].isReversed" />
        </div>
        <!-- Right (4 - Future) -->
        <div class="absolute" style="left: 460px; top: 160px;">
          <div class="text-xs text-gray-400 mb-1 text-center">4. {{ positions[3] }}</div>
          <component v-if="cards[3]" :is="getComponentFor(cards[3])" :reversed="cards[3].isReversed" />
        </div>

        <!-- Below (6 - Subconscious/Foundation) -->
        <div class="absolute" style="left: 260px; top: 360px;">
          <div class="text-xs text-gray-400 mb-1 text-center">6. {{ positions[5] }}</div>
          <component v-if="cards[5]" :is="getComponentFor(cards[5])" :reversed="cards[5].isReversed" />
        </div>

        <!-- Staff on the right (7-10, bottom to top) -->
        <div class="absolute" style="left: 700px; top: 360px;">
          <div class="text-xs text-gray-400 mb-1 text-center">7. {{ positions[6] }}</div>
          <component v-if="cards[6]" :is="getComponentFor(cards[6])" :reversed="cards[6].isReversed" />
        </div>
        <div class="absolute" style="left: 700px; top: 260px;">
          <div class="text-xs text-gray-400 mb-1 text-center">8. {{ positions[7] }}</div>
          <component v-if="cards[7]" :is="getComponentFor(cards[7])" :reversed="cards[7].isReversed" />
        </div>
        <div class="absolute" style="left: 700px; top: 160px;">
          <div class="text-xs text-gray-400 mb-1 text-center">9. {{ positions[8] }}</div>
          <component v-if="cards[8]" :is="getComponentFor(cards[8])" :reversed="cards[8].isReversed" />
        </div>
        <div class="absolute" style="left: 700px; top: 60px;">
          <div class="text-xs text-gray-400 mb-1 text-center">10. {{ positions[9] }}</div>
          <component v-if="cards[9]" :is="getComponentFor(cards[9])" :reversed="cards[9].isReversed" />
        </div>
      </div>
      </SpreadScaler>
    </div>

    
  </div>
  <ChatPanelLauncher v-if="cards.length === 10" :cards="promptCards" :positions="positions" spread="Celtic Cross" placeholder="What would you like to understand in depth?" />
</template>

<script setup lang="ts">
import { provide } from 'vue'
import { useDeck } from '@/composables/useDeck'
import ChatPanelLauncher from '@/components/ChatPanelLauncher.vue'
import SpreadScaler from '@/components/SpreadScaler.vue'
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

provide('cardClear', true)
provide('cardSize', 'sm')
</script>

