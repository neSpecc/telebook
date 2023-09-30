interface useScrollComposableState {
  /**
   * Lock the scroll
   */
  lock: () => void;

  /**
   * Unlock the scroll
   */
  unlock: () => void;
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

  return {
    lock,
    unlock,
  }
}
