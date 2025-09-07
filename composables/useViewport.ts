export function useViewport() {
  const isPortrait = ref(true)
  const width = ref(0)
  const height = ref(0)

  function update() {
    if (process.client) {
      width.value = window.innerWidth
      height.value = window.innerHeight
      isPortrait.value = window.matchMedia('(orientation: portrait)').matches || height.value >= width.value
    }
  }

  if (process.client) {
    update()
    window.addEventListener('resize', update)
    window.addEventListener('orientationchange', update)
  }

  onBeforeUnmount(() => {
    if (process.client) {
      window.removeEventListener('resize', update)
      window.removeEventListener('orientationchange', update)
    }
  })

  return { isPortrait, width, height }
}

