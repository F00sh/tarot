<template>
  <div class="max-w-none mx-auto px-4 py-8 w-full overflow-hidden">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-2xl font-semibold">Celtic Cross</h1>
      <p class="text-gray-300 mt-1">How many cards: 10 • Full, detailed reading.</p>

      <div class="mt-4 flex items-center gap-3">
        <button @click="draw" class="px-4 py-2 rounded bg-yellow-500 text-black font-medium hover:bg-yellow-400">Draw</button>
        <button @click="reset" class="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600">Reset</button>
      </div>

      <!-- Mobile column list -->
      <div class="md:hidden mt-6 space-y-6">
        <div v-for="(c, i) in cards" :key="'m-' + i" class="flex flex-col items-center text-center">
          <div class="text-sm text-gray-300 mb-1">{{ i + 1 }}. {{ positions[i] }}</div>
          <component v-if="c" :is="getComponentFor(c)" :reversed="c.isReversed" />
          <div class="mt-2 text-base font-medium">{{ c?.name }} <span class="text-gray-400">({{ c?.isReversed ? 'Reversed' : 'Upright' }})</span></div>
          <div class="mt-1 text-sm text-gray-300 max-w-prose">Keywords: {{ (c?.isReversed ? c?.reversedKeywords : c?.uprightKeywords).join(', ') }}</div>
        </div>
      </div>

      <!-- Desktop: scaled spread canvas -->
      <div class="hidden md:block mt-6 w-full overflow-hidden grid place-items-center" style="height: calc(100dvh - 140px);">
        <SpreadScaler :width="900" :height="520">
        <div class="relative" style="width: 980px; height: 560px;">
          <!-- Cross center (1) -->
          <div class="absolute" style="left: 300px; top: 170px;">
            <div class="relative">
              <PositionProvider :label="positions[0]">
                <component v-if="cards[0]" :is="getComponentFor(cards[0])" :reversed="cards[0].isReversed" />
              </PositionProvider>
              <div class="absolute -top-3 left-0 z-20 pointer-events-none bg-black/60 text-gray-100 text-xs px-2 py-0.5 rounded">1. {{ positions[0] }}</div>
            </div>
          </div>
          <!-- Crossing (2) slightly offset to overlap without rotation for readability -->
          <div class="absolute" style="left: 315px; top: 155px;">
            <div class="relative">
              <PositionProvider :label="positions[1]">
                <component v-if="cards[1]" :is="getComponentFor(cards[1])" :reversed="cards[1].isReversed" />
              </PositionProvider>
              <div class="absolute -top-3 left-0 z-20 pointer-events-none bg-black/60 text-gray-100 text-xs px-2 py-0.5 rounded">2. {{ positions[1] }}</div>
            </div>
          </div>
          <!-- Left (3 - Past) -->
          <div class="absolute" style="left: 40px; top: 170px;">
            <div class="relative">
              <PositionProvider :label="positions[2]">
                <component v-if="cards[2]" :is="getComponentFor(cards[2])" :reversed="cards[2].isReversed" />
              </PositionProvider>
              <div class="absolute -top-3 left-0 z-20 pointer-events-none bg-black/60 text-gray-100 text-xs px-2 py-0.5 rounded">3. {{ positions[2] }}</div>
            </div>
          </div>
          <!-- Above (5) -->
          <div class="absolute" style="left: 300px; top: -60px;">
            <div class="relative">
              <PositionProvider :label="positions[4]">
                <component v-if="cards[4]" :is="getComponentFor(cards[4])" :reversed="cards[4].isReversed" />
              </PositionProvider>
              <div class="absolute -top-3 left-0 z-20 pointer-events-none bg-black/60 text-gray-100 text-xs px-2 py-0.5 rounded">5. {{ positions[4] }}</div>
            </div>
          </div>
          <!-- Right (4 - Future) -->
          <div class="absolute" style="left: 540px; top: 170px;">
            <div class="relative">
              <PositionProvider :label="positions[3]">
                <component v-if="cards[3]" :is="getComponentFor(cards[3])" :reversed="cards[3].isReversed" />
              </PositionProvider>
              <div class="absolute -top-3 left-0 z-20 pointer-events-none bg-black/60 text-gray-100 text-xs px-2 py-0.5 rounded">4. {{ positions[3] }}</div>
            </div>
          </div>
          <!-- Below (6 - Subconscious/Foundation) -->
          <div class="absolute" style="left: 300px; top: 390px;">
            <div class="relative">
              <PositionProvider :label="positions[5]">
                <component v-if="cards[5]" :is="getComponentFor(cards[5])" :reversed="cards[5].isReversed" />
              </PositionProvider>
              <div class="absolute -top-3 left-0 z-20 pointer-events-none bg-black/60 text-gray-100 text-xs px-2 py-0.5 rounded">6. {{ positions[5] }}</div>
            </div>
          </div>
          <!-- Staff on the right (7-10, bottom to top) -->
          <div class="absolute" style="left: 760px; top: 400px;">
            <div class="relative">
              <PositionProvider :label="positions[6]">
                <component v-if="cards[6]" :is="getComponentFor(cards[6])" :reversed="cards[6].isReversed" />
              </PositionProvider>
              <div class="absolute -top-3 left-0 z-20 pointer-events-none bg-black/60 text-gray-100 text-xs px-2 py-0.5 rounded">7. {{ positions[6] }}</div>
            </div>
          </div>
          <div class="absolute" style="left: 760px; top: 290px;">
            <div class="relative">
              <PositionProvider :label="positions[7]">
                <component v-if="cards[7]" :is="getComponentFor(cards[7])" :reversed="cards[7].isReversed" />
              </PositionProvider>
              <div class="absolute -top-3 left-0 z-20 pointer-events-none bg-black/60 text-gray-100 text-xs px-2 py-0.5 rounded">8. {{ positions[7] }}</div>
            </div>
          </div>
          <div class="absolute" style="left: 760px; top: 180px;">
            <div class="relative">
              <PositionProvider :label="positions[8]">
                <component v-if="cards[8]" :is="getComponentFor(cards[8])" :reversed="cards[8].isReversed" />
              </PositionProvider>
              <div class="absolute -top-3 left-0 z-20 pointer-events-none bg-black/60 text-gray-100 text-xs px-2 py-0.5 rounded">9. {{ positions[8] }}</div>
            </div>
          </div>
          <div class="absolute" style="left: 760px; top: 70px;">
            <div class="relative">
              <PositionProvider :label="positions[9]">
                <component v-if="cards[9]" :is="getComponentFor(cards[9])" :reversed="cards[9].isReversed" />
              </PositionProvider>
              <div class="absolute -top-3 left-0 z-20 pointer-events-none bg-black/60 text-gray-100 text-xs px-2 py-0.5 rounded">10. {{ positions[9] }}</div>
            </div>
          </div>
        </div>
        </SpreadScaler>
      </div>
    </div>
  </div>

  <!-- Mobile chat launcher -->
  <ChatPanelLauncher v-if="cards.length === 10" :cards="promptCards" :positions="positions" spread="Celtic Cross" placeholder="What would you like to understand in depth?" />
</template>

<script setup lang="ts">
import { provide } from 'vue'
import { useDeck } from '@/composables/useDeck'
import ChatPanelLauncher from '@/components/ChatPanelLauncher.vue'
import PromptPanel from '@/components/PromptPanel.vue'
import SpreadScaler from '@/components/SpreadScaler.vue'
import PositionProvider from '@/components/PositionProvider.vue'
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
provide('cardSize', 'md')
</script>

