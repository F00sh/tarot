import { bySlug } from '@/data/cards'

export function getCardData(slug: string) {
  const info = bySlug(slug)
  if (!info) throw new Error(`Unknown card slug: ${slug}`)
  return info
}

