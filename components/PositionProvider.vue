<template>
  <slot />
  
</template>

<script setup lang="ts">
import { provide } from 'vue'

const props = defineProps<{ label: string }>()
provide('positionLabel', props.label)
</script>

