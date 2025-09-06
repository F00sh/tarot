export type CardInfo = {
  name: string
  slug: string
  uprightKeywords: string[]
  reversedKeywords: string[]
}

// Helper: Title Case builder
function titleCase(str: string) {
  return str.replace(/(^|\s)\w/g, (m) => m.toUpperCase())
}

// Majors (explicit keywords)
const majors: CardInfo[] = [
  { name: 'The Fool', slug: 'the-fool', uprightKeywords: ['beginnings', 'trust', 'adventure'], reversedKeywords: ['recklessness', 'naivety', 'hesitation'] },
  { name: 'The Magician', slug: 'the-magician', uprightKeywords: ['manifestation', 'skill', 'willpower'], reversedKeywords: ['manipulation', 'untapped potential', 'trickery'] },
  { name: 'The High Priestess', slug: 'the-high-priestess', uprightKeywords: ['intuition', 'mystery', 'inner voice'], reversedKeywords: ['secrets', 'disconnection', 'hidden motives'] },
  { name: 'The Empress', slug: 'the-empress', uprightKeywords: ['nurture', 'abundance', 'creativity'], reversedKeywords: ['dependence', 'creative block', 'smothering'] },
  { name: 'The Emperor', slug: 'the-emperor', uprightKeywords: ['authority', 'structure', 'stability'], reversedKeywords: ['control', 'rigidity', 'domination'] },
  { name: 'The Hierophant', slug: 'the-hierophant', uprightKeywords: ['tradition', 'learning', 'guidance'], reversedKeywords: ['rebellion', 'unconventional', 'dogma'] },
  { name: 'The Lovers', slug: 'the-lovers', uprightKeywords: ['union', 'choices', 'alignment'], reversedKeywords: ['disharmony', 'imbalance', 'indecision'] },
  { name: 'The Chariot', slug: 'the-chariot', uprightKeywords: ['drive', 'determination', 'victory'], reversedKeywords: ['scattered focus', 'aggression', 'stalling'] },
  { name: 'Strength', slug: 'strength', uprightKeywords: ['courage', 'compassion', 'resilience'], reversedKeywords: ['self-doubt', 'insecurity', 'weakness'] },
  { name: 'The Hermit', slug: 'the-hermit', uprightKeywords: ['introspection', 'solitude', 'wisdom'], reversedKeywords: ['isolation', 'withdrawal', 'loneliness'] },
  { name: 'Wheel of Fortune', slug: 'wheel-of-fortune', uprightKeywords: ['cycles', 'change', 'destiny'], reversedKeywords: ['resistance', 'bad luck', 'stagnation'] },
  { name: 'Justice', slug: 'justice', uprightKeywords: ['truth', 'fairness', 'accountability'], reversedKeywords: ['bias', 'injustice', 'evasion'] },
  { name: 'The Hanged Man', slug: 'the-hanged-man', uprightKeywords: ['surrender', 'new perspective', 'pause'], reversedKeywords: ['stalling', 'indecision', 'martyrdom'] },
  { name: 'Death', slug: 'death', uprightKeywords: ['transformation', 'endings', 'release'], reversedKeywords: ['resistance', 'fear of change', 'stagnation'] },
  { name: 'Temperance', slug: 'temperance', uprightKeywords: ['balance', 'moderation', 'patience'], reversedKeywords: ['imbalance', 'excess', 'friction'] },
  { name: 'The Devil', slug: 'the-devil', uprightKeywords: ['bondage', 'materialism', 'temptation'], reversedKeywords: ['detachment', 'awareness', 'freedom'] },
  { name: 'The Tower', slug: 'the-tower', uprightKeywords: ['upheaval', 'revelation', 'breakdown'], reversedKeywords: ['averted disaster', 'fear of change', 'resistance'] },
  { name: 'The Star', slug: 'the-star', uprightKeywords: ['hope', 'healing', 'inspiration'], reversedKeywords: ['doubt', 'discouragement', 'disconnection'] },
  { name: 'The Moon', slug: 'the-moon', uprightKeywords: ['illusion', 'intuition', 'dreams'], reversedKeywords: ['clarity', 'release fear', 'confusion lifting'] },
  { name: 'The Sun', slug: 'the-sun', uprightKeywords: ['vitality', 'success', 'joy'], reversedKeywords: ['temporary setbacks', 'overexposure', 'pessimism'] },
  { name: 'Judgement', slug: 'judgement', uprightKeywords: ['awakening', 'reckoning', 'renewal'], reversedKeywords: ['self-doubt', 'denial', 'delay'] },
  { name: 'The World', slug: 'the-world', uprightKeywords: ['completion', 'integration', 'wholeness'], reversedKeywords: ['incomplete', 'shortcuts', 'delay'] }
]

// Minors (generated keywords)
type Suit = 'Wands' | 'Cups' | 'Swords' | 'Pentacles'
const suitThemes: Record<Suit, { up: string[]; rev: string[] }> = {
  Wands: { up: ['creativity', 'ambition', 'energy'], rev: ['delays', 'scattered energy', 'lack of direction'] },
  Cups: { up: ['emotion', 'relationship', 'intuition'], rev: ['imbalance', 'repression', 'codependency'] },
  Swords: { up: ['intellect', 'truth', 'clarity'], rev: ['confusion', 'cruelty', 'miscommunication'] },
  Pentacles: { up: ['work', 'resources', 'stability'], rev: ['insecurity', 'financial worry', 'poor planning'] }
}

const numberNames = ['Ace','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten']
const numberThemesUp = [
  'beginnings','planning','growth','stability','conflict','harmony','assessment','progress','fulfillment','burden'
]
const numberThemesRev = [
  'hesitation','poor planning','setback','stagnation','loss','discord','doubt','frustration','lack of closure','release'
]

function makeMinorCards(suit: Suit): CardInfo[] {
  const cards: CardInfo[] = []
  // Aces to Tens
  for (let i = 0; i < 10; i++) {
    const rank = numberNames[i]
    const slug = `${rank.toLowerCase()}-of-${suit.toLowerCase()}`
    const name = `${rank} of ${suit}`
    cards.push({
      name,
      slug,
      uprightKeywords: [numberThemesUp[i], ...suitThemes[suit].up.slice(0, 2)],
      reversedKeywords: [numberThemesRev[i], ...suitThemes[suit].rev.slice(0, 2)]
    })
  }
  // Courts
  const courts: { rank: string; up: string; rev: string }[] = [
    { rank: 'Page', up: 'curiosity', rev: 'immaturity' },
    { rank: 'Knight', up: 'action', rev: 'impulsiveness' },
    { rank: 'Queen', up: 'mastery', rev: 'insecurity' },
    { rank: 'King', up: 'leadership', rev: 'rigidity' }
  ]
  for (const c of courts) {
    const slug = `${c.rank.toLowerCase()}-of-${suit.toLowerCase()}`
    const name = `${c.rank} of ${suit}`
    cards.push({
      name,
      slug,
      uprightKeywords: [c.up, ...suitThemes[suit].up.slice(0, 2)],
      reversedKeywords: [c.rev, ...suitThemes[suit].rev.slice(0, 2)]
    })
  }
  return cards
}

export const cards: CardInfo[] = [
  ...majors,
  ...makeMinorCards('Wands'),
  ...makeMinorCards('Cups'),
  ...makeMinorCards('Swords'),
  ...makeMinorCards('Pentacles')
]

export function bySlug(slug: string): CardInfo | undefined {
  return cards.find(c => c.slug === slug)
}
