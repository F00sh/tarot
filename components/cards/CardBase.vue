<template>
  <div
    class="relative bg-tarot-card rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02] cursor-pointer select-none border border-purple-900/60"
    :class="[sizeClass, { 'z-50 ring-2 ring-tarot-accent': bringToFront }, 'z-10']"
    @click="toggleOverlay"
  >
    <!-- Image layer (rotated on reversed) -->
    <div class="absolute inset-0">
      <!-- Loading shimmer -->
      <div v-if="!imageLoaded && !imgError" class="absolute inset-0 animate-pulse bg-gradient-to-b from-purple-950/40 via-purple-900/30 to-black/50" />
      <div class="absolute inset-0" :class="{ 'rotate-180': isReversed }" style="transition: transform 300ms; transform-origin: center;">
        <img v-if="currentImgSrc && !imgError" :src="currentImgSrc" alt="card image" class="w-full h-full object-contain bg-black select-none pointer-events-none" @load="onImgLoad" @error="onImgError" />
      </div>
      <!-- Fallback gradient if no image -->
      <div v-if="imgError" class="absolute inset-0 bg-gradient-to-br from-purple-950 via-purple-800/60 to-black" />
      <div class="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
    </div>

    <!-- Content appears only when overlay is open -->
    <div v-if="overlayOpen" class="absolute inset-0 px-3 py-4 flex flex-col items-center text-center text-gray-200">
      <h3 class="text-base md:text-lg font-semibold drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">{{ name }}</h3>
      <div class="mt-2 text-[10px] md:text-xs uppercase tracking-wide text-gray-300">Keywords</div>
      <ul class="mt-1 space-y-1 text-sm md:text-base text-gray-100">
        <li v-for="(k, i) in shownKeywords" :key="i">{{ k }}</li>
      </ul>
      <div class="mt-auto" />
    </div>

    <!-- Dark overlay when open -->
    <div v-if="overlayOpen" class="absolute inset-0 bg-black/60" />

    <!-- Close button when overlay open -->
    <button
      v-if="overlayOpen"
      class="absolute top-2 right-2 z-10 px-2 py-1 text-xs rounded border border-purple-900/60 bg-black/40 hover:bg-black/60"
      @click.stop="overlayOpen = false"
    >
      Close
    </button>

    <!-- Bottom footer: name + orientation (only when overlay open) -->
    <div v-if="overlayOpen" class="absolute bottom-0 inset-x-0 bg-black/60 text-gray-200 text-xs px-2 py-1 flex items-center justify-between">
      <span class="truncate">{{ name }}</span>
      <span class="ml-2 shrink-0 text-gray-300">{{ isReversed ? 'Reversed' : 'Upright' }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
const props = defineProps<{
  name: string
  uprightKeywords: string[]
  reversedKeywords: string[]
  reversed?: boolean
  size?: 'sm' | 'md' | 'lg'
  imageSrc?: string | null
  imageBase?: string | null
  clear?: boolean
  interactive?: boolean
}>()

const isReversed = computed(() => !!props.reversed)
const shownKeywords = computed(() => (isReversed.value ? props.reversedKeywords : props.uprightKeywords).slice(0, 4))

const providedSize = inject('cardSize', 'md') as any
const effectiveSize = computed<'sm'|'md'|'lg'>(() => (props.size ?? (typeof providedSize === 'string' ? providedSize : (providedSize?.value ?? 'md'))))

const sizeClass = computed(() => {
  switch (effectiveSize.value) {
    case 'sm':
      return 'w-24 h-36'
    case 'lg':
      return 'w-64 h-96'
    case 'md':
    default:
      return 'w-48 h-72'
  }
})
const providedClear = inject('cardClear', false) as boolean
const isClear = computed(() => props.clear ?? providedClear)
const overlayOpen = ref(false)
const bringToFront = computed(() => overlayOpen.value)
function toggleOverlay() {
  if (props.interactive === false) return
  overlayOpen.value = !overlayOpen.value
}

const imgError = ref(false)
const imageLoaded = ref(false)
function onImgLoad() {
  imageLoaded.value = true
}
function onImgError() {
  if (imageBase.value && extIndex.value < exts.length - 1) {
    extIndex.value++
  } else {
    imgError.value = true
  }
}

const exts = ['.jpg', '.jpeg', '.png', '.webp']
const extIndex = ref(0)
const base = computed(() => props.imageBase || null)
const currentImgSrc = computed(() => {
  if (base.value) return base.value + exts[extIndex.value]
  return props.imageSrc || null
})

watch(() => props.imageBase, () => {
  extIndex.value = 0
  imgError.value = false
  imageLoaded.value = false
})
</script>

