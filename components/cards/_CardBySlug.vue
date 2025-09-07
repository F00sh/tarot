<template>
  <CardBase :name="card.name" :upright-keywords="card.uprightKeywords" :reversed-keywords="card.reversedKeywords" :reversed="reversed" :size="size" :image-base="imageBase" :clear="clear" :interactive="interactive" />
</template>

<script setup lang="ts">
import CardBase from './CardBase.vue'
import { getCardData } from '@/composables/useCards'

const props = defineProps<{ slug: string; reversed?: boolean; size?: 'sm' | 'md' | 'lg'; clear?: boolean; interactive?: boolean }>()
const card = computed(() => getCardData(props.slug))

// Base path for images (user assets are under /public/images/cards-jpg)
const imageBase = computed(() => `/images/cards-jpg/${props.slug}`)
</script>

