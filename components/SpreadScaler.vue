<template>
  <div ref="outer" class="w-full h-full grid place-items-center overflow-hidden max-w-[100vw]">
    <div
      class="relative"
      :style="{
        width: contentW + 'px',
        height: contentH + 'px',
        transform: 'scale(' + scale + ')',
        transformOrigin: 'top left'
      }"
    >
      <div ref="content" class="relative inline-block">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps<{ width?: number; height?: number }>()
const outer = ref<HTMLElement | null>(null)
const content = ref<HTMLElement | null>(null)
const scale = ref(1)
const contentW = ref(props.width || 900)
const contentH = ref(props.height || 520)

let ro: ResizeObserver | null = null
function recompute() {
  const el = outer.value
  const cnt = content.value
  if (!el || !cnt) return
  // Measure natural content size
  const prev = scale.value
  scale.value = 1
  // Use scrollWidth/Height to capture full abs-pos extents
  const w = Math.max(cnt.scrollWidth, cnt.getBoundingClientRect().width)
  const h = Math.max(cnt.scrollHeight, cnt.getBoundingClientRect().height)
  contentW.value = Math.max(1, Math.floor(w))
  contentH.value = Math.max(1, Math.floor(h))
  const rect = el.getBoundingClientRect()
  const s = Math.min(rect.width / contentW.value, rect.height / contentH.value, 1)
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
