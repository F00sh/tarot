<template>
  <div>
    <!-- Reading button fixed to bottom on all screens -->
    <button
      class="fixed z-[70] left-1/2 -translate-x-1/2 bottom-4 btn-primary shadow-lg"
      @click="open = true"
    >
      Reading
    </button>

    <!-- New reading modal -->
    <TarotReadingModal
      v-if="open"
      :open="open"
      :cards="cards"
      :positions="positions"
      :spread="spread"
      @close="close"
    />
  </div>
  
</template>

<script setup lang="ts">
import TarotReadingModal from '@/components/TarotReadingModal.vue'

type Card = {
  name: string
  isReversed: boolean
  uprightKeywords: string[]
  reversedKeywords: string[]
}

// Keeping props for backward-compat with callers, though unused here
defineProps<{
  cards: Card[]
  positions?: string[]
  spread?: string
  placeholder?: string
}>()

const open = ref(false)

function close() {
  open.value = false
}
</script>
