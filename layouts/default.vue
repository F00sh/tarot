<template>
  <div class="min-h-screen flex flex-col overflow-x-hidden w-full">
    <header class="sticky top-0 z-10 bg-tarot-bg/80 backdrop-blur border-b border-gray-800">
      <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <NuxtLink to="/" class="text-lg font-semibold text-purple-300 hover:text-purple-200">Tarot Deck</NuxtLink>
        <nav class="flex items-center gap-4 text-sm text-gray-300">
          <NuxtLink to="/deck" class="hover:text-white">Deck</NuxtLink>
          <NuxtLink to="/spreads" class="hover:text-white">Spreads</NuxtLink>
        </nav>
      </div>
    </header>

    <main class="flex-1 overflow-x-hidden w-full">
      <slot />
    </main>

    
  </div>
</template>

<script setup lang="ts">
import { provide, computed } from 'vue'
import { useViewport } from '@/composables/useViewport'

provide('cardClear', true)
const { isPortrait } = useViewport()
const globalCardSize = computed(() => (isPortrait.value ? 'xl' : 'lg'))
provide('cardSize', globalCardSize)
</script>
