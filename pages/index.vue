<template>
  <div class="max-w-6xl mx-auto px-4 py-10 space-y-8">
    <section>
      <h1 class="text-3xl font-semibold">Tarot Deck</h1>
      <p class="text-gray-300 mt-2">Explore, shuffle, cut, and deal cards. Then ask the chat for an interpretation.</p>
      <div class="mt-6 flex gap-3">
        <NuxtLink to="/deck" class="inline-flex items-center gap-2 px-4 py-2 rounded bg-yellow-500 text-black font-medium hover:bg-yellow-400 transition">Open Free Deck</NuxtLink>
        <NuxtLink to="/spreads" class="inline-flex items-center gap-2 px-4 py-2 rounded bg-indigo-500 text-white font-medium hover:bg-indigo-400 transition">Browse Spreads</NuxtLink>
        <NuxtLink to="/info" class="inline-flex items-center gap-2 px-4 py-2 rounded bg-tarot-accent text-white font-medium hover:opacity-90 transition">Info</NuxtLink>
      </div>
    </section>

    <section class="space-y-6">
      <h2 class="text-2xl font-semibold">Popular Spreads</h2>

      <div class="grid md:grid-cols-2 gap-5">
        <div class="p-4 rounded border border-gray-700 bg-black/20">
          <div class="text-lg font-medium">🔮 1. Single Card Draw</div>
          <div class="text-sm text-gray-400 mt-1">How many cards: 1</div>
          <p class="mt-2 text-gray-200">Use: Quick daily guidance or yes/no style question.</p>
          <p class="mt-2 text-gray-300 text-sm">Example: You draw The Fool (upright) – Keywords: beginnings, freedom, innocence. Reading: A new phase is opening. You're encouraged to take a leap, even if the outcome isn't certain. Trust in spontaneity.</p>
          <div class="mt-3">
            <NuxtLink to="/spreads/single" class="px-3 py-1.5 rounded bg-emerald-500 text-black font-medium hover:bg-emerald-400">Try Single Draw</NuxtLink>
          </div>
        </div>

        <div class="p-4 rounded border border-gray-700 bg-black/20">
          <div class="text-lg font-medium">🔮 2. Three-Card Spread</div>
          <div class="text-sm text-gray-400 mt-1">How many cards: 3</div>
          <p class="mt-2 text-gray-200">Positions: Past • Present • Future (common) or Situation • Obstacle • Advice.</p>
          <p class="mt-2 text-gray-300 text-sm">Example: Hermit (Past – introspection), Tower (Present – upheaval), Star (Future – hope). Reading: Introspection offered insight (Hermit). Disruption clears the way (Tower). The future promises renewal (Star).</p>
          <div class="mt-3">
            <NuxtLink to="/spreads/three" class="px-3 py-1.5 rounded bg-emerald-500 text-black font-medium hover:bg-emerald-400">Try Three-Card</NuxtLink>
          </div>
        </div>

        <div class="p-4 rounded border border-gray-700 bg-black/20">
          <div class="text-lg font-medium">🔮 3. Celtic Cross</div>
          <div class="text-sm text-gray-400 mt-1">How many cards: 10</div>
          <p class="mt-2 text-gray-200">Use: Full, detailed reading of a situation.</p>
          <p class="mt-2 text-gray-300 text-sm">Positions: Present, Challenge, Past, Future, Above, Below, Advice, External influences, Hopes/Fears, Outcome.</p>
          <div class="mt-3">
            <NuxtLink to="/spreads/celtic-cross" class="px-3 py-1.5 rounded bg-emerald-500 text-black font-medium hover:bg-emerald-400">Try Celtic Cross</NuxtLink>
          </div>
        </div>

        <div class="p-4 rounded border border-gray-700 bg-black/20">
          <div class="text-lg font-medium">🔮 4. Relationship Spread</div>
          <div class="text-sm text-gray-400 mt-1">How many cards: 6</div>
          <p class="mt-2 text-gray-200">Positions: You • Them • Relationship now • Challenges • Strengths • Future potential.</p>
          <div class="mt-3">
            <NuxtLink to="/spreads/relationship" class="px-3 py-1.5 rounded bg-emerald-500 text-black font-medium hover:bg-emerald-400">Try Relationship</NuxtLink>
          </div>
        </div>

        <div class="p-4 rounded border border-gray-700 bg-black/20 md:col-span-2">
          <div class="text-lg font-medium">🔮 5. Year Ahead Spread</div>
          <div class="text-sm text-gray-400 mt-1">How many cards: 12</div>
          <p class="mt-2 text-gray-200">Positions: One for each month to forecast the year ahead.</p>
          <div class="mt-3">
            <NuxtLink to="/spreads/year-ahead" class="px-3 py-1.5 rounded bg-emerald-500 text-black font-medium hover:bg-emerald-400">Try Year Ahead</NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
  
</template>

<script setup lang="ts"></script>
