<template>
  <div class="md:hidden">
    <!-- Toggle button (mobile only by default) -->
    <button
      class="fixed z-70 bottom-4 right-4 px-3 py-2 rounded bg-tarot-accent text-white text-sm font-medium shadow-lg hover:opacity-90"
      @click="open = !open"
    >
      {{ open ? 'Close Chat' : 'ChatGPT' }}
    </button>

    <!-- Mobile bottom sheet -->
    <div v-if="open"
      class="fixed z-70 left-0 right-0 bottom-0 w-full border-t border-purple-900/60 bg-black/85 backdrop-blur"
      style="padding-bottom: env(safe-area-inset-bottom);"
    >
      <div class="px-3 py-2">
        <PromptPanel :cards="cards" :positions="positions" :spread="spread" :placeholder="placeholder" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PromptPanel from '@/components/PromptPanel.vue'

type Card = {
  name: string
  isReversed: boolean
  uprightKeywords: string[]
  reversedKeywords: string[]
}

const props = defineProps<{
  cards: Card[]
  positions?: string[]
  spread?: string
  placeholder?: string
}>()

const open = ref(false)
</script>
