<template>
  <NuxtLayout>
    <div class="min-h-[100dvh] text-gray-100 w-full max-w-full overflow-x-hidden">
      <NuxtPage />
    </div>
  </NuxtLayout>
  
</template>

<script setup lang="ts"></script>

<style>
@import '@/assets/css/tailwind.css';
html, body {
  /* Fallback background color */
  background-color: #0a0910; /* tarot.bg */
  /* Layered gradient + image for depth */
  background-image:
    radial-gradient(1200px 600px at 50% -10%, rgba(124, 58, 237, 0.25), transparent 60%),
    radial-gradient(900px 500px at 80% 20%, rgba(20, 184, 166, 0.18), transparent 70%),
    linear-gradient(to bottom, rgba(10,9,16,0.85), rgba(10,9,16,0.95)),
    url('/images/background.webp');
  background-size: cover, cover, cover, cover;
  background-position: center, center, center, center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  min-height: 100%;
  overflow-x: hidden;
}
#__nuxt, #__layout {
  max-width: 100vw;
  overflow-x: hidden;
}
</style>
