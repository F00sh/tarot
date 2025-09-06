<template>
  <CardBase :name="card.name" :upright-keywords="card.uprightKeywords" :reversed-keywords="card.reversedKeywords" :reversed="reversed" />
</template>

<script setup lang="ts">
import CardBase from './CardBase.vue'
import { getCardData } from '#imports'

defineProps<{ reversed?: boolean }>()

const card = getCardData('the-fool')
</script>

