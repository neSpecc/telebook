import { createSharedComposable } from '@vueuse/core'
import { ref } from 'vue'

interface useAppStyleComposableState {
  /**
   * Allows to set/unset the whole app background color
   */
  setAppBackground: (color: string | undefined) => void;
}

export const useAppStyle = createSharedComposable((): useAppStyleComposableState => {
  const setAppBackground = (color: string | undefined) => {
    const app = document.getElementById('app')

    const initialAppBackground = ref('')

    if (app !== null) {
      initialAppBackground.value = app.style.backgroundColor
      app.style.backgroundColor = color ?? initialAppBackground.value
    }
  }

  return {
    setAppBackground,
  }
})
