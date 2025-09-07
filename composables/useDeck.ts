import { cards, type CardInfo } from '@/data/cards'

export type DeckCard = CardInfo & {
  id: number
  componentName: string
  isReversed: boolean
}

const componentModules = import.meta.glob('~/components/cards/*.vue', { eager: true }) as Record<string, any>

const componentMap: Record<string, any> = {}
for (const path in componentModules) {
  const mod = componentModules[path]
  const file = path.split('/').pop() || ''
  const name = file.replace(/\.vue$/, '')
  componentMap[name] = mod.default
}

function pascalFromSlug(slug: string) {
  return slug
    .split('-')
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join('')
}

export const useDeck = () => {
  const deck = ref<DeckCard[]>([])
  const dealt = ref<DeckCard[]>([])

  function createDeck() {
    deck.value = cards.map((c, idx) => ({
      ...c,
      id: idx + 1,
      componentName: pascalFromSlug(c.slug),
      isReversed: false
    }))
    dealt.value = []
  }

  function shuffleDeck() {
    // Fisher-Yates
    for (let i = deck.value.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[deck.value[i], deck.value[j]] = [deck.value[j], deck.value[i]]
    }
  }

  function cutDeck(point?: number) {
    if (deck.value.length === 0) return
    const cutPoint = Math.max(1, Math.min(deck.value.length - 1, point ?? Math.floor(Math.random() * deck.value.length)))
    const top = deck.value.slice(0, cutPoint)
    const bottom = deck.value.slice(cutPoint)
    deck.value = bottom.concat(top)
  }

  function deal(n: number) {
    const count = Math.max(1, Math.min(n, deck.value.length))
    const cardsOut: DeckCard[] = []
    for (let i = 0; i < count; i++) {
      const card = deck.value.shift()
      if (!card) break
      card.isReversed = Math.random() < 0.5
      cardsOut.push(card)
    }
    dealt.value.push(...cardsOut)
    return cardsOut
  }

  function getComponentFor(card: DeckCard) {
    const Comp = componentMap[card.componentName]
    return Comp
  }


  // initialize deck on first use
  if (deck.value.length === 0) createDeck()

  return {
    deck,
    dealt,
    createDeck,
    shuffleDeck,
    cutDeck,
    deal,
    getComponentFor
  }
}

// Back-compat: re-export getCardData for any imports from useDeck
export { getCardData } from './useCards'
