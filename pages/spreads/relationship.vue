<template>
  <div class="max-w-6xl mx-auto px-4 py-8 pb-64 w-full overflow-hidden">
    <h1 class="text-2xl font-semibold">Relationship Spread</h1>
    <p class="text-gray-300 mt-1">How many cards: 6 • You • Them • Relationship now • Challenges • Strengths • Future potential.</p>

    <div class="mt-4 flex items-center gap-3">
      <button @click="draw" class="px-4 py-2 rounded bg-yellow-500 text-black font-medium hover:bg-yellow-400">Draw</button>
      <button @click="reset" class="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600">Reset</button>
    </div>

    <!-- Scaled relationship composition, fits viewport -->
    <div class="mt-6" style="height: min(60vh, 600px);">
      <SpreadScaler :width="900" :height="420">
      <div class="relative" style="width: 900px; height: 420px;">
        <!-- Row 1: You (left), Relationship Now (center), Them (right) -->
        <div class="absolute" style="left: 80px; top: 20px;">
          <div class="text-xs text-gray-400 mb-1 text-center">1. {{ positions[0] }}</div>
          <component v-if="cards[0]" :is="getComponentFor(cards[0])" :reversed="cards[0].isReversed" />
        </div>
        <div class="absolute" style="left: 360px; top: 20px;">
          <div class="text-xs text-gray-400 mb-1 text-center">3. {{ positions[2] }}</div>
          <component v-if="cards[2]" :is="getComponentFor(cards[2])" :reversed="cards[2].isReversed" />
        </div>
        <div class="absolute" style="left: 640px; top: 20px;">
          <div class="text-xs text-gray-400 mb-1 text-center">2. {{ positions[1] }}</div>
          <component v-if="cards[1]" :is="getComponentFor(cards[1])" :reversed="cards[1].isReversed" />
        </div>

        <!-- Row 2: Challenges (left), Strengths (right) -->
        <div class="absolute" style="left: 220px; top: 220px;">
          <div class="text-xs text-gray-400 mb-1 text-center">4. {{ positions[3] }}</div>
          <component v-if="cards[3]" :is="getComponentFor(cards[3])" :reversed="cards[3].isReversed" />
        </div>
        <div class="absolute" style="left: 500px; top: 220px;">
          <div class="text-xs text-gray-400 mb-1 text-center">5. {{ positions[4] }}</div>
          <component v-if="cards[4]" :is="getComponentFor(cards[4])" :reversed="cards[4].isReversed" />
        </div>

        <!-- Bottom center: Future Potential (6) -->
        <div class="absolute" style="left: 360px; top: 220px;">
          <div class="text-xs text-gray-400 mb-1 text-center">6. {{ positions[5] }}</div>
          <component v-if="cards[5]" :is="getComponentFor(cards[5])" :reversed="cards[5].isReversed" />
        </div>
      </div>
      </SpreadScaler>
    </div>

    
  </div>
  <ChatPanelLauncher v-if="cards.length === 6" :cards="promptCards" :positions="positions" spread="Relationship" placeholder="What should I understand about this relationship?" />
</template>

<script setup lang="ts">
import { provide } from 'vue'
import { useDeck } from '@/composables/useDeck'
import PromptPanel from '@/components/PromptPanel.vue'
import ChatPanelLauncher from '@/components/ChatPanelLauncher.vue'
import SpreadScaler from '@/components/SpreadScaler.vue'
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

provide('cardClear', true)
provide('cardSize', 'sm')
</script>

