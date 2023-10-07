/**
 * Make short abbreviation of number
 * 123 -> 123
 * 1234 -> 1.2K
 * 1234367 -> 1.2M
 *
 * @param val The value to make short
 */
export function shortNumber(val: number): string {
  if (val < 1000) {
    return val.toString()
  }

  if (val < 1000000) {
    /**
     * Do not add .0
     */
    if (val % 1000 === 0) {
      return `${(val / 1000).toFixed(0)}K`
    }

    return `${(val / 1000).toFixed(1)}K`
  }

  return `${(val / 1000000).toFixed(1)}M`
}

/**
 * Add spaces to number
 * 1234567 -> 1 234 567
 *
 * @param val The value to add spaces to
 */
export function spaced(val: number): string {
  if (val < 10000) {
    return val.toString()
  }

  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}
