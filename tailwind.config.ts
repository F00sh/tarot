import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './composables/**/*.{js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue'
  ],
  theme: {
    extend: {
      colors: {
        tarot: {
          bg: '#0b0f19',
          card: '#111827',
          accent: '#eab308'
        }
      }
    }
  },
  plugins: []
} satisfies Config

