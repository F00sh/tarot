<template>
  <CardBySlug slug="king-of-swords" :reversed="reversed" />
</template>
<script setup lang="ts">
import CardBySlug from './_CardBySlug.vue'
defineProps<{ reversed?: boolean }>()
</script>

