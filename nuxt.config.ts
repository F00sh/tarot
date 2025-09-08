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
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap'
        }
      ]
    }
  },
  tailwindcss: {
    viewer: false
  },
})
