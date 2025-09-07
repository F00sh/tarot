// Nuxt 4 configuration
export default defineNuxtConfig({
  srcDir: '.',
  pages: true,
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  runtimeConfig: {},
  devtools: { enabled: true },
  compatibilityDate: '2024-09-01',
  app: {
    head: {
      title: 'Tarot Deck',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover' }
      ]
    }
  },
  tailwindcss: {
    viewer: false
  },
})
