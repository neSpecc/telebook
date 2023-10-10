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
   * @param maxSize — Max size of the cache. If cache is full, first element will be removed
   */
  constructor(private readonly maxSize = 100) {}

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
    /**
     * Check if image already exists in cache
     */
    if (this.cache.has(url)) {
      return
    }

    /**
     * If cache is full, remove first element
     */
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value

      this.cache.delete(firstKey)
    }

    /**
     * Add new image data to cache
     */
    this.cache.set(url, data)
  }
}

export default new ImageCache(15)
