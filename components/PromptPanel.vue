<template>
  <div class="mt-6 p-3 rounded border border-purple-900/60 bg-black/40">
    <div class="flex items-center justify-between">
      <h2 class="text-base font-semibold text-gray-200">ChatGPT Prompt</h2>
      <div class="flex items-center gap-2">
        <button @click="copyPrompt" class="px-2 py-1 rounded bg-emerald-500 text-black text-xs font-medium hover:bg-emerald-400">Copy</button>
        <button @click="openChatGPT" class="px-2 py-1 rounded bg-tarot-accent text-white text-xs font-medium hover:opacity-90">Open</button>
        <span v-if="copied" class="text-[11px] text-gray-400">Copied!</span>
        <button @click="collapsed = !collapsed" class="px-2 py-1 rounded border border-purple-900/60 text-xs text-gray-200 hover:bg-purple-900/20">{{ collapsed ? 'Show' : 'Hide' }}</button>
      </div>
    </div>

    <div v-show="!collapsed" class="mt-3 space-y-2">
      <textarea v-model="question" rows="2" class="w-full px-2 py-1.5 rounded bg-black/60 border border-purple-900/60 text-gray-200 placeholder:text-gray-500 text-sm" :placeholder="placeholder"></textarea>
      <textarea :value="prompt" readonly rows="5" class="w-full px-2 py-1.5 rounded bg-black/60 border border-purple-900/60 font-mono text-[11px] text-gray-200"></textarea>
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

