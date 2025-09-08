<template>
  <div
    class="relative rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02] cursor-pointer select-none border border-white/15 bg-black/50 backdrop-blur"
    :class="[sizeClass, { 'z-[80] ring-2 ring-tarot-accent': bringToFront }, 'z-10']"
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

    <!-- Full black overlay and centered text when open -->
    <div v-if="overlayOpen" class="absolute inset-0 bg-black animate-card-overlay z-[90]" />
    <div v-if="overlayOpen" class="absolute inset-0 px-4 py-4 flex flex-col items-center justify-center text-center text-gray-100 animate-card-text z-[95]">
      <div v-if="positionText" class="text-xs md:text-sm uppercase tracking-wide text-gray-300">{{ positionText }}</div>
      <h3 class="mt-1 text-xl md:text-2xl font-bold">{{ name }} <span class="text-gray-300 text-base md:text-lg">({{ isReversed ? 'Reversed' : 'Upright' }})</span></h3>
      <div class="mt-3 text-sm md:text-base text-gray-100 max-w-prose">{{ meaningLine }}</div>
      <ul class="mt-2 space-y-1 text-sm md:text-base text-gray-200">
        <li v-for="(k, i) in shownKeywords" :key="i">{{ k }}</li>
      </ul>
    </div>

    <!-- Close button when overlay open -->
    <button
      v-if="overlayOpen"
      class="absolute top-2 right-2 z-[96] px-2 py-1 text-xs rounded border border-white/20 bg-black/40 hover:bg-black/60 backdrop-blur"
      @click.stop="overlayOpen = false"
      aria-label="Close"
    >
      ×
    </button>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
const props = defineProps<{
  name: string
  uprightKeywords: string[]
  reversedKeywords: string[]
  reversed?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  imageSrc?: string | null
  imageBase?: string | null
  clear?: boolean
  interactive?: boolean
}>()

const isReversed = computed(() => !!props.reversed)
const shownKeywords = computed(() => (isReversed.value ? props.reversedKeywords : props.uprightKeywords).slice(0, 4))
const injectedPosition = inject('positionLabel', '') as string
const positionText = computed(() => injectedPosition || '')
const meaningLine = computed(() => {
  const kws = shownKeywords.value
  const pos = positionText.value || 'this position'
  const ori = isReversed.value ? 'reversed' : 'upright'
  if (!kws.length) return `${props.name} (${ori}) at ${pos}.`
  const [k1, k2, k3] = kws
  const first = `${props.name} (${ori}) at ${pos} highlights ${k1}${k2 ? ` and ${k2}` : ''}.`
  const second = k3
    ? `In this role, it suggests ${k1}, ${k2 || k1}, and ${k3}.`
    : `In this role, it suggests ${k1}${k2 ? ` and ${k2}` : ''}.`
  return `${first} ${second}`
})

const providedSize = inject('cardSize', 'md') as any
const effectiveSize = computed<'sm'|'md'|'lg'|'xl'|'xxl'>(() => (props.size ?? (typeof providedSize === 'string' ? providedSize : (providedSize?.value ?? 'md'))))

const sizeClass = computed(() => {
  switch (effectiveSize.value) {
    case 'sm':
      return 'w-24 h-36'
    case 'xxl':
      return 'w-96 h-[36rem]'
    case 'xl':
      return 'w-72 h-[27rem]'
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

<style scoped>
@keyframes cardOverlayIn { from { opacity: 0 } to { opacity: 1 } }
@keyframes cardTextIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
.animate-card-overlay { animation: cardOverlayIn 180ms ease-out both; }
.animate-card-text { animation: cardTextIn 220ms ease-out both; }
</style>
