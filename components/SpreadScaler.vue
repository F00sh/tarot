<template>
  <div ref="outer" class="w-full h-full flex items-center justify-center overflow-hidden">
    <div
      class="relative"
      :style="{
        width: designWidth + 'px',
        height: designHeight + 'px',
        transform: 'scale(' + scale + ')',
        transformOrigin: 'top left'
      }"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps<{ width: number; height: number }>()
const outer = ref<HTMLElement | null>(null)
const scale = ref(1)
const designWidth = props.width
const designHeight = props.height

let ro: ResizeObserver | null = null
function recompute() {
  const el = outer.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const s = Math.min(rect.width / designWidth, rect.height / designHeight, 1)
  scale.value = isFinite(s) && s > 0 ? s : 1
}

onMounted(() => {
  recompute()
  ro = new ResizeObserver(() => recompute())
  if (outer.value) ro.observe(outer.value)
  window.addEventListener('orientationchange', recompute)
  window.addEventListener('resize', recompute)
})

onBeforeUnmount(() => {
  if (ro && outer.value) ro.unobserve(outer.value)
  window.removeEventListener('orientationchange', recompute)
  window.removeEventListener('resize', recompute)
})
</script>

