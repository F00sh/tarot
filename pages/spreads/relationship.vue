<template>
  <div class="max-w-none mx-auto px-4 py-8 w-full overflow-hidden">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-2xl font-semibold">Relationship Spread</h1>
      <p class="text-gray-300 mt-1">How many cards: 6 • You • Them • Relationship now • Challenges • Strengths • Future potential.</p>

      <div class="mt-4 flex items-center gap-3">
        <button @click="draw" class="px-4 py-2 rounded bg-yellow-500 text-black font-medium hover:bg-yellow-400">Draw</button>
        <button @click="reset" class="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600">Reset</button>
      </div>

      <!-- Mobile column list -->
      <div class="md:hidden mt-6 space-y-6">
        <div v-for="(c, i) in cards" :key="'m-' + i" class="flex flex-col items-center text-center">
          <div class="text-sm text-gray-300 mb-1">{{ positions[i] }}</div>
          <PositionProvider :label="positions[i]">
            <component v-if="c" :is="getComponentFor(c)" :reversed="c.isReversed" />
          </PositionProvider>
          <div class="mt-2 text-base font-medium">{{ c?.name }} <span class="text-gray-400">({{ c?.isReversed ? 'Reversed' : 'Upright' }})</span></div>
          <div class="mt-1 text-sm text-gray-300 max-w-prose">Keywords: {{ (c?.isReversed ? c?.reversedKeywords : c?.uprightKeywords).join(', ') }}</div>
        </div>
      </div>

      <!-- Desktop scaled layout -->
      <div class="hidden md:block mt-6 w-full overflow-hidden grid place-items-center" style="height: calc(100dvh - 140px);">
        <SpreadScaler :width="980" :height="460">
        <div class="relative" style="width: 980px; height: 460px;">
        <!-- Row 1: You (left), Relationship Now (center), Them (right) -->
        <div class="absolute" style="left: 60px; top: 30px;">
          <PositionProvider :label="positions[0]">
            <component v-if="cards[0]" :is="getComponentFor(cards[0])" :reversed="cards[0].isReversed" />
          </PositionProvider>
        </div>
        <div class="absolute" style="left: 380px; top: 30px;">
          <PositionProvider :label="positions[2]">
            <component v-if="cards[2]" :is="getComponentFor(cards[2])" :reversed="cards[2].isReversed" />
          </PositionProvider>
        </div>
        <div class="absolute" style="left: 700px; top: 30px;">
          <PositionProvider :label="positions[1]">
            <component v-if="cards[1]" :is="getComponentFor(cards[1])" :reversed="cards[1].isReversed" />
          </PositionProvider>
        </div>

        <!-- Row 2: Challenges (left), Strengths (right) -->
        <div class="absolute" style="left: 240px; top: 240px;">
          <PositionProvider :label="positions[3]">
            <component v-if="cards[3]" :is="getComponentFor(cards[3])" :reversed="cards[3].isReversed" />
          </PositionProvider>
        </div>
        <div class="absolute" style="left: 520px; top: 240px;">
          <PositionProvider :label="positions[4]">
            <component v-if="cards[4]" :is="getComponentFor(cards[4])" :reversed="cards[4].isReversed" />
          </PositionProvider>
        </div>

        <!-- Bottom center: Future Potential (6) -->
        <div class="absolute" style="left: 380px; top: 350px;">
          <PositionProvider :label="positions[5]">
            <component v-if="cards[5]" :is="getComponentFor(cards[5])" :reversed="cards[5].isReversed" />
          </PositionProvider>
        </div>

        <!-- Separate captions outside card space -->
        <div class="absolute z-20 pointer-events-none" style="left: 60px; top: 10px;">
          <div class="inline-block bg-black/70 text-gray-100 text-xs px-2 py-0.5 rounded">1. {{ positions[0] }}</div>
        </div>
        <div class="absolute z-20 pointer-events-none" style="left: 380px; top: 10px;">
          <div class="inline-block bg-black/70 text-gray-100 text-xs px-2 py-0.5 rounded">3. {{ positions[2] }}</div>
        </div>
        <div class="absolute z-20 pointer-events-none" style="left: 700px; top: 10px;">
          <div class="inline-block bg-black/70 text-gray-100 text-xs px-2 py-0.5 rounded">2. {{ positions[1] }}</div>
        </div>
        <div class="absolute z-20 pointer-events-none" style="left: 160px; top: 240px;">
          <div class="inline-block bg-black/70 text-gray-100 text-xs px-2 py-0.5 rounded">4. {{ positions[3] }}</div>
        </div>
        <div class="absolute z-20 pointer-events-none" style="left: 640px; top: 240px;">
          <div class="inline-block bg-black/70 text-gray-100 text-xs px-2 py-0.5 rounded">5. {{ positions[4] }}</div>
        </div>
        <div class="absolute z-20 pointer-events-none" style="left: 380px; top: 430px;">
          <div class="inline-block bg-black/70 text-gray-100 text-xs px-2 py-0.5 rounded">6. {{ positions[5] }}</div>
        </div>
        </div>
        </SpreadScaler>
      </div>
    </div>
  </div>
  <ChatPanelLauncher v-if="cards.length === 6" :cards="promptCards" :positions="positions" spread="Relationship" placeholder="What should I understand about this relationship?" />
</template>

<script setup lang="ts">
import { provide } from 'vue'
import { useDeck } from '@/composables/useDeck'
import ChatPanelLauncher from '@/components/ChatPanelLauncher.vue'
import SpreadScaler from '@/components/SpreadScaler.vue'
import PromptPanel from '@/components/PromptPanel.vue'
import PositionProvider from '@/components/PositionProvider.vue'
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
provide('cardSize', 'md')
</script>

