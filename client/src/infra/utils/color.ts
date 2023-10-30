/**
 * Makes passed hex color darker
 */
export function darkenColor(color: string, percent: number): string {
  const num = parseInt(color.replace('#', ''), 16)
  const amt = Math.round(2.55 * percent)
  const R = (num >> 16) - amt
  const B = ((num >> 8) & 0x00FF) - amt
  const G = (num & 0x0000FF) - amt

  return '#' + (0x1000000 + (R > 0 ? R : 0) * 0x10000 + (B > 0 ? B : 0) * 0x100 + (G > 0 ? G : 0)).toString(16).slice(1)
}
