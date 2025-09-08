<template>
  <div class="max-w-6xl mx-auto px-4 py-10 space-y-6">
    <h1 class="text-3xl font-semibold text-center">Spreads</h1>
    <p class="text-gray-300 text-center max-w-2xl mx-auto">Choose a spread mode below. Each page lets you draw the exact number of cards and ask a question for an interpretation.</p>

    <ul class="grid md:grid-cols-2 gap-5">
      <li class="panel">
        <div class="text-lg font-medium">🔮 Single Card Draw</div>
        <div class="text-sm text-gray-400">1 card • Quick daily guidance or yes/no</div>
        <NuxtLink to="/spreads/single" class="inline-block mt-3 btn-primary">Open</NuxtLink>
      </li>
      <li class="panel">
        <div class="text-lg font-medium">🔮 Three-Card Spread</div>
        <div class="text-sm text-gray-400">3 cards • Past • Present • Future</div>
        <NuxtLink to="/spreads/three" class="inline-block mt-3 btn-primary">Open</NuxtLink>
      </li>
      <li class="panel">
        <div class="text-lg font-medium">🔮 Celtic Cross</div>
        <div class="text-sm text-gray-400">10 cards • Full reading</div>
        <NuxtLink to="/spreads/celtic-cross" class="inline-block mt-3 btn-primary">Open</NuxtLink>
      </li>
      <li class="panel">
        <div class="text-lg font-medium">🔮 Relationship Spread</div>
        <div class="text-sm text-gray-400">6 cards • Dynamics and outlook</div>
        <NuxtLink to="/spreads/relationship" class="inline-block mt-3 btn-primary">Open</NuxtLink>
      </li>
      <li class="panel">
        <div class="text-lg font-medium">🔮 Celtic Cross — Extended</div>
        <div class="text-sm text-gray-400">10 cards • Draw one by one with optional pre-draw shuffle/cut.</div>
        <NuxtLink to="/spreads/celtic-cross-extended" class="inline-block mt-3 btn-primary">Open</NuxtLink>
      </li>
      <li class="panel">
        <div class="text-lg font-medium">🔮 Relationship — Extended</div>
        <div class="text-sm text-gray-400">6 cards • Draw one by one with optional pre-draw shuffle/cut.</div>
        <NuxtLink to="/spreads/relationship-extended" class="inline-block mt-3 btn-primary">Open</NuxtLink>
      </li>
      <li class="panel md:col-span-2">
        <div class="text-lg font-medium">🔮 Year Ahead</div>
        <div class="text-sm text-gray-400">12 cards • Monthly forecast</div>
        <NuxtLink to="/spreads/year-ahead" class="inline-block mt-3 btn-primary">Open</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts"></script>
