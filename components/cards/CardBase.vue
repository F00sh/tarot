<template>
  <div
    class="relative bg-tarot-card rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02] cursor-pointer select-none border border-purple-900/60"
    :class="[sizeClass, { 'z-50 ring-2 ring-tarot-accent': bringToFront }, 'z-10']"
    @click="raise"
  >
    <!-- Content -->
    <div class="absolute inset-0 px-3 py-4 flex flex-col items-center text-center text-gray-200">
      <h3 class="text-lg font-semibold">{{ name }}</h3>
      <div class="mt-2 text-[10px] uppercase tracking-wide text-gray-400">Keywords</div>
      <ul class="mt-1 space-y-1 text-sm text-gray-200">
        <li v-for="(k, i) in shownKeywords" :key="i">{{ k }}</li>
      </ul>
      <div class="mt-auto" />
    </div>

    <!-- Soft overlay to give depth; keep orientation hint via subtle flip -->
    <div
      class="absolute inset-0 bg-gradient-to-b from-white/5 to-black/30"
      :class="{ 'rotate-180': isReversed }"
      style="transition: transform 300ms; transform-origin: center;"
    />

    <!-- Bottom footer: name + orientation (always visible even when overlapping) -->
    <div class="absolute bottom-0 inset-x-0 bg-black/60 text-gray-200 text-xs px-2 py-1 flex items-center justify-between">
      <span class="truncate">{{ name }}</span>
      <span class="ml-2 shrink-0 text-gray-300">{{ isReversed ? 'Reversed' : 'Upright' }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string
  uprightKeywords: string[]
  reversedKeywords: string[]
  reversed?: boolean
  size?: 'sm' | 'md'
}>()

const isReversed = computed(() => !!props.reversed)
const shownKeywords = computed(() => (isReversed.value ? props.reversedKeywords : props.uprightKeywords).slice(0, 4))

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'w-24 h-36'
    case 'md':
    default:
      return 'w-48 h-72'
  }
})

const bringToFront = ref(false)
let timer: any
function raise() {
  bringToFront.value = true
  clearTimeout(timer)
  timer = setTimeout(() => (bringToFront.value = false), 4000)
}
</script>

