<template>
  <div class="min-h-screen flex flex-col overflow-x-hidden w-full">
    <header class="sticky top-0 z-10">
      <div class="mx-auto max-w-6xl px-4 pt-4">
        <div class="surface px-4 py-3 flex items-center justify-between">
          <NuxtLink to="/" class="text-lg font-semibold text-white">Tarot Deck</NuxtLink>
          <nav class="flex items-center gap-2">
            <NuxtLink to="/deck" class="btn-ghost px-3 py-1.5">Deck</NuxtLink>
            <NuxtLink to="/spreads" class="btn-ghost px-3 py-1.5">Spreads</NuxtLink>
          </nav>
        </div>
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
