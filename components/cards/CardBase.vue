<template>
  <div
    class="relative w-48 h-72 bg-tarot-card rounded-xl shadow-lg overflow-hidden transform transition hover:scale-[1.02] cursor-pointer select-none border border-gray-700"
    @click="flip"
  >
    <div class="absolute inset-0 p-4 flex flex-col">
      <div class="text-sm text-gray-400">{{ isReversed ? 'Reversed' : 'Upright' }}</div>
      <h3 class="text-xl font-bold mt-1">{{ name }}</h3>

      <div class="mt-3 text-xs uppercase tracking-wide text-gray-400">Keywords</div>
      <ul class="mt-1 space-y-1 text-sm text-gray-200">
        <li v-for="(k, i) in shownKeywords" :key="i">• {{ k }}</li>
      </ul>
      <div class="mt-auto pt-3 text-xs text-gray-500">Click to flip</div>
    </div>

    <div
      class="absolute inset-0 bg-gradient-to-b from-white/5 to-black/20"
      :class="{ 'rotate-180': isReversed }"
      style="transition: transform 300ms; transform-origin: center;"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string
  uprightKeywords: string[]
  reversedKeywords: string[]
  reversed?: boolean
}>()

const isReversed = ref(!!props.reversed)
function flip() {
  isReversed.value = !isReversed.value
}

const shownKeywords = computed(() => (isReversed.value ? props.reversedKeywords : props.uprightKeywords))
</script>

