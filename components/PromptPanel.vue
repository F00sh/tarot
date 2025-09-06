<template>
  <div class="mt-8 p-4 rounded border border-gray-700 bg-black/20">
    <h2 class="text-xl font-semibold">Chat with ChatGPT</h2>
    <p class="text-sm text-gray-400 mt-1">We’ll generate a concise prompt with your cards. Click Copy then Open ChatGPT and paste.</p>

    <div class="mt-4 space-y-3">
      <label class="text-sm text-gray-300">Optional question</label>
      <textarea v-model="question" rows="3" class="w-full px-3 py-2 rounded bg-gray-900 border border-gray-700" :placeholder="placeholder"></textarea>

      <div class="flex flex-wrap items-center gap-3">
        <button @click="copyPrompt" class="px-3 py-1.5 rounded bg-emerald-500 text-black font-medium hover:bg-emerald-400">Copy Prompt</button>
        <button @click="openChatGPT" class="px-3 py-1.5 rounded bg-indigo-500 text-white font-medium hover:bg-indigo-400">Open ChatGPT</button>
        <span v-if="copied" class="text-xs text-gray-400">Copied!</span>
      </div>

      <div>
        <label class="text-sm text-gray-300">Generated prompt</label>
        <textarea :value="prompt" readonly rows="8" class="mt-1 w-full px-3 py-2 rounded bg-gray-900 border border-gray-700 font-mono text-xs"></textarea>
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
  cards: Card[]
  positions?: string[]
  spread?: string
  placeholder?: string
}>()

const question = ref('')
const copied = ref(false)

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

