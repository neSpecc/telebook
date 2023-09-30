import { createSharedComposable } from '@vueuse/core'
import { type Ref, ref } from 'vue'

/**
 * App layout attributes
 */
interface useLayoutComposableState {
  /**
   * Visible application width
   */
  appWidth: Ref<number>;
}

/**
 * Service for for working with layout
 */
export const useLayout = createSharedComposable((): useLayoutComposableState => {
  const appWidth = ref(0)

  if (appWidth.value === 0) {
    appWidth.value = document.getElementById('app')?.offsetWidth ?? 0
  }

  return {
    appWidth,
  }
})
