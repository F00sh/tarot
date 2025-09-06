<template>
  <CardBySlug slug="page-of-pentacles" :reversed="reversed" />
</template>
<script setup lang="ts">
import CardBySlug from './_CardBySlug.vue'
defineProps<{ reversed?: boolean }>()
</script>

