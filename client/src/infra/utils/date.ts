/**
 * Convert Date to "4 Oct 2023" format
 *
 * @param date - Date to format
 * @param short - Whether to use short month name "4/06/23" instead of "4 Jun 2023"
 */
export function formatDate(date: Date, short: boolean = false): string {
  const day = date.getDate()

  if (!short) {
    const month = date.toLocaleString('default', { month: 'short' })
    const year = date.getFullYear()

    return `${day} ${month} ${year}`
  }

  const month = date.toLocaleString('default', { month: 'numeric' })
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}
