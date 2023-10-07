interface useScrollComposableState {
  /**
   * Lock the scroll
   */
  lock: () => void;

  /**
   * Unlock the scroll
   */
  unlock: () => void;

  /**
   * Scroll to element
   */
  scrollTo: (el: HTMLElement, offset?: number) => void;
}

/**
 * Methods for working with the scroll
 */
export const useScroll = (): useScrollComposableState => {
  /**
   * Lock the scroll
   */
  function lock(): void {
    document.body.style.overflow = 'hidden'
  }

  /**
   * Unlock the scroll
   */
  function unlock(): void {
    document.body.style.overflow = 'unset'
  }

  /**
   * Scroll to element
   *
   * @param el The element to scroll to
   * @param offset The offset to scroll to
   */
  function scrollTo(el: HTMLElement, offset = 0): void {
    window.scrollTo({
      top: el.offsetTop - offset,
      behavior: 'smooth',
    })
  }

  return {
    lock,
    unlock,
    scrollTo,
  }
}
