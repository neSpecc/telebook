/**
 * This class is used to cache loaded images data
 * It represents a Stack: keys are image urls, values are image data
 */
class ImageCache {
  /**
   * Cache data
   */
  private readonly cache = new Map<string, string>()

  /**
   * Max size of the cache
   */
  private readonly maxSize: number = 15

  /**
   * Get image data from cache
   * @param url image url
   */
  public get(url: string): string | undefined {
    return this.cache.get(url)
  }

  /**
   * Set image data in cache
   * @param url image url
   * @param data image data
   */
  public set(url: string, data: string): void {
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value

      this.cache.delete(firstKey)
    }

    this.cache.set(url, data)
  }
}

export default new ImageCache()
