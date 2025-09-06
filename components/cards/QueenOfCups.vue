<template>
  <CardBySlug slug="queen-of-cups" :reversed="reversed" />
</template>
<script setup lang="ts">
import CardBySlug from './_CardBySlug.vue'
defineProps<{ reversed?: boolean }>()
</script>

