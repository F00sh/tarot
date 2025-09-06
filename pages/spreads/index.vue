<template>
  <div class="max-w-6xl mx-auto px-4 py-10 space-y-6">
    <h1 class="text-3xl font-semibold">Spreads</h1>
    <p class="text-gray-300">Choose a spread mode below. Each page lets you draw the exact number of cards and ask a question for an interpretation.</p>

    <ul class="grid md:grid-cols-2 gap-5">
      <li class="p-4 rounded border border-gray-700 bg-black/20">
        <div class="text-lg font-medium">🔮 Single Card Draw</div>
        <div class="text-sm text-gray-400">1 card • Quick daily guidance or yes/no</div>
        <NuxtLink to="/spreads/single" class="inline-block mt-3 px-3 py-1.5 rounded bg-indigo-500 text-white hover:bg-indigo-400">Open</NuxtLink>
      </li>
      <li class="p-4 rounded border border-gray-700 bg-black/20">
        <div class="text-lg font-medium">🔮 Three-Card Spread</div>
        <div class="text-sm text-gray-400">3 cards • Past • Present • Future</div>
        <NuxtLink to="/spreads/three" class="inline-block mt-3 px-3 py-1.5 rounded bg-indigo-500 text-white hover:bg-indigo-400">Open</NuxtLink>
      </li>
      <li class="p-4 rounded border border-gray-700 bg-black/20">
        <div class="text-lg font-medium">🔮 Celtic Cross</div>
        <div class="text-sm text-gray-400">10 cards • Full reading</div>
        <NuxtLink to="/spreads/celtic-cross" class="inline-block mt-3 px-3 py-1.5 rounded bg-indigo-500 text-white hover:bg-indigo-400">Open</NuxtLink>
      </li>
      <li class="p-4 rounded border border-gray-700 bg-black/20">
        <div class="text-lg font-medium">🔮 Relationship Spread</div>
        <div class="text-sm text-gray-400">6 cards • Dynamics and outlook</div>
        <NuxtLink to="/spreads/relationship" class="inline-block mt-3 px-3 py-1.5 rounded bg-indigo-500 text-white hover:bg-indigo-400">Open</NuxtLink>
      </li>
      <li class="p-4 rounded border border-gray-700 bg-black/20 md:col-span-2">
        <div class="text-lg font-medium">🔮 Year Ahead</div>
        <div class="text-sm text-gray-400">12 cards • Monthly forecast</div>
        <NuxtLink to="/spreads/year-ahead" class="inline-block mt-3 px-3 py-1.5 rounded bg-indigo-500 text-white hover:bg-indigo-400">Open</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts"></script>

