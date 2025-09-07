<template>
  <div v-if="open" class="fixed inset-0 z-[100]">
    <div class="absolute inset-0 bg-black/70" @click="emit('close')"></div>
    <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(96vw,1100px)] max-h-[88vh] overflow-hidden rounded-xl border border-purple-900/60 bg-[#0a0910] text-gray-200 shadow-2xl">
      <div class="p-3 border-b border-purple-900/60 flex items-center justify-between">
        <h3 class="text-lg font-semibold">{{ card?.name }}</h3>
        <div class="flex items-center gap-2">
          <button @click="emit('prev')" class="px-2 py-1 text-xs rounded border border-purple-900/60 hover:bg-purple-900/20">Prev</button>
          <button @click="emit('next')" class="px-2 py-1 text-xs rounded border border-purple-900/60 hover:bg-purple-900/20">Next</button>
          <button @click="emit('close')" class="px-2 py-1 text-xs rounded border border-purple-900/60 hover:bg-purple-900/20">Close</button>
        </div>
      </div>
      <div class="p-5 flex flex-col sm:flex-row gap-8">
        <div class="flex justify-center sm:w-[420px] flex-shrink-0">
          <CardBySlug v-if="card" :key="card.slug" :slug="card.slug" :reversed="false" size="lg" :clear="true" />
        </div>
        <div class="sm:flex-1 overflow-auto max-h-[72vh] pr-2 flex items-center">
          <div class="w-full max-w-prose mx-auto">
            <div class="text-base font-semibold text-center text-gray-200">Upright Keywords</div>
            <ul class="mt-2 text-sm list-disc list-inside text-gray-200" style="text-align: justify;">
              <li v-for="(k, i) in card?.uprightKeywords || []" :key="'u-'+i">{{ k }}</li>
            </ul>
            <div class="mt-5 text-base font-semibold text-center text-gray-200">Reversed Keywords</div>
            <ul class="mt-2 text-sm list-disc list-inside text-gray-200" style="text-align: justify;">
              <li v-for="(k, i) in card?.reversedKeywords || []" :key="'r-'+i">{{ k }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script setup lang="ts">
import CardBySlug from '@/components/cards/_CardBySlug.vue'
import type { CardInfo } from '@/data/cards'

const props = defineProps<{ open: boolean; card?: CardInfo | null }>()
const emit = defineEmits<{ (e: 'close'): void; (e: 'prev'): void; (e: 'next'): void }>()
</script>
