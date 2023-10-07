import { hotels } from '@/infra/store/hotels/mock/hotels'
import { type ComputedRef, computed, type MaybeRefOrGetter, unref } from 'vue'
import type Hotel from '../entities/Hotel'

interface useHotelComposableState {
  hotel: ComputedRef<Hotel | undefined>;
}

export function useHotel(id: MaybeRefOrGetter<number | undefined>): useHotelComposableState {
  const hotelId = unref(id)

  if (hotelId === undefined) {
    throw new Error('Hotel ID is not defined')
  }

  const hotel = computed(() => {
    return hotels.find((hotel) => hotel.id === hotelId)
  })

  return {
    hotel,
  }
}
