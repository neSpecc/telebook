/**
 * Get CSS property value
 *
 * @param property - CSS property name
 * @param element - element that owns the property
 */
export function getCSSVariable(property: string, element?: HTMLElement): string | undefined {
  return window.getComputedStyle(element ?? document.documentElement).getPropertyValue(property)
}
