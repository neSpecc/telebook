/**
 * Get CSS property value
 *
 * @param property - CSS property name
 * @param element - element that owns the property
 */
export function getCSSVariable(property: string, element?: HTMLElement): string | undefined {
  return window.getComputedStyle(element ?? document.documentElement).getPropertyValue(property)
}

/**
 * Loads an image and converts it to base64
 *
 * @param src - image source
 */
export async function imageToBase64(src: string): Promise<string> {
  const response = await fetch(src)
  const blob = await response.blob()

  return await new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}
