<template>
  <div
    class="fixed bottom-0 left-0 right-0 z-60 border-t border-purple-900/60 bg-black/80 backdrop-blur w-full max-w-full overflow-x-hidden"
    style="padding-bottom: env(safe-area-inset-bottom);"
  >
    <div class="max-w-6xl mx-auto w-full px-2 sm:px-3 py-2">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts"></script>
