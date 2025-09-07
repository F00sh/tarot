<template>
  <CardBase :name="card.name" :upright-keywords="card.uprightKeywords" :reversed-keywords="card.reversedKeywords" :reversed="reversed" :size="size" />
</template>

<script setup lang="ts">
import CardBase from './CardBase.vue'
import { getCardData } from '@/composables/useCards'

const props = defineProps<{ slug: string; reversed?: boolean; size?: 'sm' | 'md' }>()
const card = computed(() => getCardData(props.slug))
</script>

