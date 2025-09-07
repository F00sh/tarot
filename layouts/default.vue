<template>
  <div class="min-h-screen flex flex-col">
    <header class="sticky top-0 z-10 bg-tarot-bg/80 backdrop-blur border-b border-gray-800">
      <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <NuxtLink to="/" class="text-lg font-semibold">Tarot Deck</NuxtLink>
        <nav class="flex items-center gap-4 text-sm text-gray-300">
          <NuxtLink to="/deck" class="hover:text-white">Deck</NuxtLink>
          <NuxtLink to="/spreads" class="hover:text-white">Spreads</NuxtLink>
        </nav>
      </div>
    </header>

    <main class="flex-1">
      <slot />
    </main>

    
  </div>
</template>

<script setup lang="ts">
import { provide } from 'vue'
provide('cardClear', true)
</script>
