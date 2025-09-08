<template>
  <div v-if="open" class="fixed inset-0 z-[90]">
    <div class="absolute inset-0 bg-black/70" @click="onCloseClick" />
    <div
      role="dialog"
      aria-modal="true"
      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(96vw,640px)] max-h-[85vh] overflow-hidden rounded-2xl glass text-gray-100 shadow-2xl"
    >
      <!-- Header -->
      <div class="px-4 py-3 border-b border-white/15 flex items-center justify-between">
        <h3 class="text-lg font-semibold">Tarot Reading</h3>
        <button
          aria-label="Close"
          class="p-1.5 rounded-md border border-white/20 hover:bg-white/10 text-xl leading-none"
          @click="onCloseClick"
        >
          ×
        </button>
      </div>

      <!-- Body -->
      <div class="p-4 space-y-4 overflow-auto max-h-[70vh]">
        <!-- Prompt selector -->
        <div>
          <div class="text-sm text-gray-300 mb-2">Choose tone</div>
          <div class="flex flex-wrap gap-3">
            <button
              type="button"
              :class="buttonClass('optimist')"
              @click="selected = 'optimist'"
            >Optimist</button>
            <button
              type="button"
              :class="buttonClass('realist')"
              @click="selected = 'realist'"
            >Realist</button>
            <button
              type="button"
              :class="buttonClass('pessimist')"
              @click="selected = 'pessimist'"
            >Pessimist</button>
          </div>
        </div>

        <!-- Question input -->
        <div>
          <label for="tarot-question" class="block text-sm text-gray-300 mb-1">Your question</label>
          <textarea
            id="tarot-question"
            v-model="userInput"
            rows="6"
            placeholder="Ask a specific question for the reading..."
            class="w-full p-3 rounded-md bg-white/10 placeholder:text-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 backdrop-blur"
          />
        </div>

        <!-- Actions -->
        <div class="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div class="text-xs text-gray-400">Hidden prompt: {{ selectedLabel }}</div>
          <div class="flex items-center gap-3">
            <button type="button" class="btn-muted" @click="handleCopy">Copy</button>
            <button type="button" class="btn-primary" @click="openChatGPT">ChatGPT</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script setup lang="ts">
type Card = {
  name: string
  isReversed: boolean
  uprightKeywords: string[]
  reversedKeywords: string[]
}

const props = defineProps<{
  open: boolean
  cards?: Card[]
  positions?: string[]
  spread?: string
}>()
const emit = defineEmits<{ (e: 'close'): void }>()

type PromptKey = 'optimist' | 'realist' | 'pessimist'
const prompts: Record<PromptKey, string> = {
  optimist: 'You are an optimistic tarot reader. Provide uplifting, hopeful, and positive guidance.',
  realist: 'You are a realistic tarot reader. Provide grounded, balanced, and practical guidance.',
  pessimist: 'You are a cautious tarot reader. Provide critical, challenging, and warning-focused guidance.'
}

const selected = ref<PromptKey>('optimist')
const userInput = ref('')

const selectedLabel = computed(() => {
  switch (selected.value) {
    case 'optimist': return 'Optimist'
    case 'realist': return 'Realist'
    case 'pessimist': return 'Pessimist'
  }
})

function buttonClass(key: PromptKey) {
  const active = selected.value === key
  return [
    'px-6 py-2 rounded-full border transition-colors',
    active
      ? 'border-purple-400 bg-purple-900/40 shadow-[inset_0_0_0_1px_rgba(168,85,247,0.6)]'
      : 'border-purple-500/70 hover:bg-purple-900/30 hover:border-purple-400'
  ]
}

function onCloseClick() {
  emit('close')
}

function buildCopyText() {
  const lines: string[] = []
  lines.push(prompts[selected.value])
  if (props.spread) lines.push(`Spread: ${props.spread}`)
  const q = userInput.value?.trim() || ''
  if (q) {
    lines.push('', 'User Question:', q)
  }
  if (props.cards && props.cards.length) {
    lines.push('', 'Cards:')
    props.cards.forEach((c, i) => {
      const pos = props.positions?.[i] ? props.positions[i] + ': ' : ''
      const kws = c.isReversed ? c.reversedKeywords : c.uprightKeywords
      lines.push(`${i + 1}. ${pos}${c.name} (${c.isReversed ? 'reversed' : 'upright'})`)
      if (kws?.length) lines.push(`   Keywords: ${kws.join(', ')}`)
    })
  }
  return lines.join('\n')
}

async function handleCopy() {
  try {
    const text = buildCopyText()
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
    } else {
      // Fallback: create temporary textarea
      const ta = document.createElement('textarea')
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    // Lightweight feedback
    window.dispatchEvent(new CustomEvent('toast', { detail: { message: 'Copied to clipboard!' } }))
  } catch (e) {
    console.error('Copy failed', e)
    alert('Copy failed — please try again.')
  }
}

function openChatGPT() {
  window.open('https://chatgpt.com', '_blank', 'noopener')
}
</script>

<style scoped>
</style>
