<template>
  <div class="max-w-6xl mx-auto px-4 py-10 space-y-8">
    <section class="text-center">
      <h1 class="text-4xl sm:text-5xl font-semibold tracking-tight">Tarot Deck</h1>
      <p class="text-gray-300 mt-3 max-w-2xl mx-auto">Explore, shuffle, cut, and deal cards. Then ask the chat for an interpretation.</p>
      <div class="mt-7 flex flex-wrap gap-3 justify-center">
        <NuxtLink to="/deck" class="btn-warn">Open Free Deck</NuxtLink>
        <NuxtLink to="/spreads" class="btn-primary">Browse Spreads</NuxtLink>
        <NuxtLink to="/info" class="btn-muted">Info</NuxtLink>
      </div>
    </section>

    <section class="space-y-6">
      <h2 class="text-2xl font-semibold">Popular Spreads</h2>

      <div class="grid md:grid-cols-2 gap-5">
        <div class="panel">
          <div class="text-lg font-medium">🔮 1. Single Card Draw</div>
          <div class="text-sm text-gray-400 mt-1">How many cards: 1</div>
          <p class="mt-2 text-gray-200">Use: Quick daily guidance or yes/no style question.</p>
          <p class="mt-2 text-gray-300 text-sm">Example: You draw The Fool (upright) – Keywords: beginnings, freedom, innocence. Reading: A new phase is opening. You're encouraged to take a leap, even if the outcome isn't certain. Trust in spontaneity.</p>
          <div class="mt-3">
            <NuxtLink to="/spreads/single" class="btn-emerald">Try Single Draw</NuxtLink>
          </div>
        </div>

        <div class="panel">
          <div class="text-lg font-medium">🔮 2. Three-Card Spread</div>
          <div class="text-sm text-gray-400 mt-1">How many cards: 3</div>
          <p class="mt-2 text-gray-200">Positions: Past • Present • Future (common) or Situation • Obstacle • Advice.</p>
          <p class="mt-2 text-gray-300 text-sm">Example: Hermit (Past – introspection), Tower (Present – upheaval), Star (Future – hope). Reading: Introspection offered insight (Hermit). Disruption clears the way (Tower). The future promises renewal (Star).</p>
          <div class="mt-3">
            <NuxtLink to="/spreads/three" class="btn-emerald">Try Three-Card</NuxtLink>
          </div>
        </div>

        <div class="panel">
          <div class="text-lg font-medium">🔮 3. Celtic Cross</div>
          <div class="text-sm text-gray-400 mt-1">How many cards: 10</div>
          <p class="mt-2 text-gray-200">Use: Full, detailed reading of a situation.</p>
          <p class="mt-2 text-gray-300 text-sm">Positions: Present, Challenge, Past, Future, Above, Below, Advice, External influences, Hopes/Fears, Outcome.</p>
          <div class="mt-3">
            <NuxtLink to="/spreads/celtic-cross" class="btn-emerald">Try Celtic Cross</NuxtLink>
          </div>
        </div>

        <div class="panel">
          <div class="text-lg font-medium">🔮 4. Relationship Spread</div>
          <div class="text-sm text-gray-400 mt-1">How many cards: 6</div>
          <p class="mt-2 text-gray-200">Positions: You • Them • Relationship now • Challenges • Strengths • Future potential.</p>
          <div class="mt-3">
            <NuxtLink to="/spreads/relationship" class="btn-emerald">Try Relationship</NuxtLink>
          </div>
        </div>

        <div class="panel md:col-span-2">
          <div class="text-lg font-medium">🔮 5. Year Ahead Spread</div>
          <div class="text-sm text-gray-400 mt-1">How many cards: 12</div>
          <p class="mt-2 text-gray-200">Positions: One for each month to forecast the year ahead.</p>
          <div class="mt-3">
            <NuxtLink to="/spreads/year-ahead" class="btn-emerald">Try Year Ahead</NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
  
</template>

<script setup lang="ts"></script>
