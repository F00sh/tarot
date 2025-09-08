<template>
  <div class="mt-3 p-2 sm:p-3 panel w-full">
    <div class="flex flex-wrap items-center justify-between gap-2">
      <h2 class="text-base font-semibold text-gray-200">ChatGPT Prompt</h2>
      <div class="flex flex-wrap items-center gap-2">
        <button @click="copyPrompt" class="btn-emerald px-3 py-1">Copy</button>
        <button @click="openChatGPT" class="btn-primary px-3 py-1">Open</button>
        <span v-if="copied" class="text-[11px] text-gray-400">Copied!</span>
        <button @click="collapsed = !collapsed" class="btn-muted px-3 py-1">{{ collapsed ? 'Show' : 'Hide' }}</button>
      </div>
    </div>

    <div v-show="!collapsed" class="mt-2 grid grid-cols-1 gap-2">
      <textarea v-model="question" rows="2" class="w-full px-2 py-1.5 rounded bg-white/10 border border-white/20 text-gray-100 placeholder:text-gray-400 text-sm backdrop-blur" :placeholder="placeholder"></textarea>
      <textarea :value="prompt" readonly rows="4" class="w-full px-2 py-1.5 rounded bg-white/10 border border-white/20 font-mono text-[11px] text-gray-100 whitespace-pre-wrap break-words max-h-40 overflow-auto backdrop-blur"></textarea>
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
  cards: Card[]
  positions?: string[]
  spread?: string
  placeholder?: string
}>()

const question = ref('')
const copied = ref(false)
const collapsed = ref(true)

const prompt = computed(() => {
  const lines: string[] = []
  lines.push('You are an insightful tarot reader. Be specific, kind, and practical. Always output plain text (no markdown).')
  if (props.spread) lines.push(`Spread: ${props.spread}`)
  if (question.value.trim()) {
    lines.push('Question:')
    lines.push(question.value.trim())
  }
  lines.push('', 'Cards:')
  props.cards.forEach((c, i) => {
    const pos = props.positions?.[i] ? props.positions[i] + ': ' : ''
    const kws = c.isReversed ? c.reversedKeywords : c.uprightKeywords
    lines.push(`${i + 1}. ${pos}${c.name} (${c.isReversed ? 'reversed' : 'upright'})`)
    lines.push(`   Keywords: ${kws.join(', ')}`)
  })
  lines.push('', 'Guidelines: 3–6 short paragraphs. Mention each card by name/orientation/position. Use given keywords as anchors. Conclude with one practical next step.')
  return lines.join('\n')
})

async function copyPrompt() {
  try {
    await navigator.clipboard.writeText(prompt.value)
    copied.value = true
    setTimeout(() => (copied.value = false), 1500)
  } catch (e) {
    copied.value = false
    console.error('Clipboard error', e)
  }
}

function openChatGPT() {
  // Open ChatGPT new chat. User pastes the prompt manually.
  const url = 'https://chat.openai.com/'
  window.open(url, '_blank')
}

const placeholder = computed(() => props.placeholder || 'What guidance do these cards offer about ...?')
</script>
