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
  /* Responsive background image served from /public */
  background-image: url('/images/background.webp');
  background-size: cover;
  background-position: center;
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
