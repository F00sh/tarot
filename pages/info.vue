<template>
  <div class="max-w-6xl mx-auto px-4 py-10">
    <h1 class="text-3xl font-semibold">Card Info</h1>
    <p class="text-gray-300 mt-2">Browse all cards by arcana. Click a card for keywords and details.</p>

    <!-- Filters -->
    <div class="mt-6 p-3 rounded border border-purple-900/60 bg-black/30">
      <div class="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <input v-model="q" type="text" placeholder="Search name or keyword..." class="w-full sm:w-1/2 px-3 py-2 rounded bg-black/60 border border-purple-900/60 text-gray-200 placeholder:text-gray-500" />
        <div class="flex flex-wrap items-center gap-3 text-sm">
          <label class="inline-flex items-center gap-1"><input type="checkbox" v-model="show.majors" /> Majors</label>
          <label class="inline-flex items-center gap-1"><input type="checkbox" v-model="show.wands" /> Wands</label>
          <label class="inline-flex items-center gap-1"><input type="checkbox" v-model="show.cups" /> Cups</label>
          <label class="inline-flex items-center gap-1"><input type="checkbox" v-model="show.swords" /> Swords</label>
          <label class="inline-flex items-center gap-1"><input type="checkbox" v-model="show.pentacles" /> Pentacles</label>
        </div>
      </div>
    </div>

    <!-- Major Arcana -->
    <section v-if="show.majors" class="mt-8">
      <h2 class="text-2xl font-semibold">Major Arcana</h2>
      <div class="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
        <button
          v-for="c in filteredMajors"
          :key="c.slug"
          class="group focus:outline-none flex flex-col items-center"
          @click="openCard(c)"
        >
          <CardBySlug :slug="c.slug" size="sm" :clear="true" />
          <div class="mt-1 text-xs text-gray-300 text-center">{{ c.name }}</div>
        </button>
      </div>
    </section>

    <!-- Minor Arcana by suit -->
    <section v-for="s in filteredSuits" :key="s.name" class="mt-10">
      <h2 class="text-2xl font-semibold">Minor Arcana — {{ s.name }}</h2>
      <div class="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
        <button
          v-for="c in s.cards"
          :key="c.slug"
          class="group focus:outline-none flex flex-col items-center"
          @click="openCard(c)"
        >
          <CardBySlug :slug="c.slug" size="sm" :clear="true" />
          <div class="mt-1 text-xs text-gray-300 text-center">{{ c.name }}</div>
        </button>
      </div>
    </section>

    <CardModal :open="activeIndex !== -1" :card="activeCard" @close="closeModal" @prev="prevCard" @next="nextCard" />
  </div>
</template>

<script setup lang="ts">
import { cards, type CardInfo } from '@/data/cards'
import CardBySlug from '@/components/cards/_CardBySlug.vue'
import CardModal from '@/components/CardModal.vue'

const majors = cards.filter(c => !c.slug.includes('-of-'))

function suitOf(c: CardInfo) {
  const m = c.slug.match(/-of-(wands|cups|swords|pentacles)$/)
  return m ? (m[1].charAt(0).toUpperCase() + m[1].slice(1)) : null
}

const suitsBase = [
  { name: 'Wands', cards: cards.filter(c => suitOf(c) === 'Wands') },
  { name: 'Cups', cards: cards.filter(c => suitOf(c) === 'Cups') },
  { name: 'Swords', cards: cards.filter(c => suitOf(c) === 'Swords') },
  { name: 'Pentacles', cards: cards.filter(c => suitOf(c) === 'Pentacles') },
]

const q = ref('')
const show = reactive({ majors: true, wands: true, cups: true, swords: true, pentacles: true })

function matchesQuery(c: CardInfo) {
  const query = q.value.trim().toLowerCase()
  if (!query) return true
  const inName = c.name.toLowerCase().includes(query)
  const inUp = c.uprightKeywords.some(k => k.toLowerCase().includes(query))
  const inRev = c.reversedKeywords.some(k => k.toLowerCase().includes(query))
  return inName || inUp || inRev
}

const filteredMajors = computed(() => majors.filter(matchesQuery))
const filteredSuits = computed(() => {
  const out: { name: string; cards: CardInfo[] }[] = []
  for (const s of suitsBase) {
    if (!show[s.name.toLowerCase() as 'wands'|'cups'|'swords'|'pentacles']) continue
    out.push({ name: s.name, cards: s.cards.filter(matchesQuery) })
  }
  return out
})

// Modal navigation across all visible cards
const visibleCards = computed<CardInfo[]>(() => {
  const arr: CardInfo[] = []
  if (show.majors) arr.push(...filteredMajors.value)
  for (const s of filteredSuits.value) arr.push(...s.cards)
  return arr
})

const activeIndex = ref(-1)
const activeCard = computed(() => visibleCards.value[activeIndex.value])

function openCard(c: CardInfo) {
  activeIndex.value = visibleCards.value.findIndex(v => v.slug === c.slug)
}
function closeModal() { activeIndex.value = -1 }
function prevCard() {
  if (!visibleCards.value.length) return
  activeIndex.value = (activeIndex.value - 1 + visibleCards.value.length) % visibleCards.value.length
}
function nextCard() {
  if (!visibleCards.value.length) return
  activeIndex.value = (activeIndex.value + 1) % visibleCards.value.length
}

// Keyboard shortcuts
function onKey(e: KeyboardEvent) {
  if (activeIndex.value === -1) return
  if (e.key === 'Escape') closeModal()
  else if (e.key === 'ArrowLeft') prevCard()
  else if (e.key === 'ArrowRight') nextCard()
}

onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>
