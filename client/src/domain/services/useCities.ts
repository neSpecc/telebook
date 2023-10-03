import { ref, type Ref } from 'vue'
import type Location from '../entities/City'
import { createSharedComposable } from '@vueuse/core'
import { getCitiesAvailable } from '@/infra/store/cities'

interface useCitiesComposableState {
  /**
   * Cities available as locations
   */
  cities: Ref<Location[]>;
}

/**
 * Composable to work with cities
 */
export const useCities = createSharedComposable((): useCitiesComposableState => {
  const cities = ref<Location[]>(getCitiesAvailable())

  return {
    cities,
  }
})
