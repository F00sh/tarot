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
          bg: '#0a0910',
          card: '#130a1f',
          accent: '#7c3aed' // deep violet accent
        }
      }
    }
  },
  plugins: []
} satisfies Config
