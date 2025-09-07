<template>
  <NuxtLayout>
    <div class="min-h-screen bg-tarot-bg text-gray-100">
      <NuxtPage />
    </div>
  </NuxtLayout>
  
</template>

<script setup lang="ts"></script>

<style>
@import '@/assets/css/tailwind.css';
html, body {
  background-color: #0a0910; /* tarot.bg */
  min-height: 100%;
  overflow-x: hidden;
}
</style>
