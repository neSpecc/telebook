import type TripDetails from '@/domain/entities/TripDetails'
import { createSharedComposable } from '@vueuse/core'
import { computed, ref, type Ref, type ComputedRef } from 'vue'
import { useCities } from './useCities'
import type City from '../entities/City'

/**
 * Attributes of the useTripDetails composable
 */
interface useTripDetailsComposableState {
  /**
   * Selects the start date of the trip
   *
   * @param date - The date of the trip
   */
  selectStartDate: (date: TripDetails['fromDate']) => void;

  /**
   * Selects the end date of the trip
   *
   * @param date - The end date of the trip
   */
  selectEndDate: (date: TripDetails['toDate']) => void;

  /**
   * Selects the location of the trip
   *
   * @param location - Id of the location of the trip
   */
  selectLocation: (location: TripDetails['location']) => void;

  /**
   * Selects the hotel of the trip
   *
   * @param hotel - Id of the hotel of the trip
   */
  selectHotel: (hotel: TripDetails['hotel']) => void;

  /**
   * Selects the room of the trip
   *
   * @param room - Id of the room of the trip
   */
  selectRoom: (room: TripDetails['room']) => void;

  /**
   * Information about current trip
   */
  trip: Ref<TripDetails>;

  /**
   * Location based on trip details
   */
  location: ComputedRef<City | undefined>;

  /**
   * Selects default trip details:
   *  - current date as start date
   *  - current date + 1 day as end date
   *  - first location as location
   */
  selectDefault: () => void;
}

/**
 * Composable to handle trip details
 */
export const useTripDetails = createSharedComposable((): useTripDetailsComposableState => {
  /**
   * Information about current trip
   */
  const trip = ref<TripDetails>({
    fromDate: '',
    toDate: '',
    location: 0,
    hotel: 0,
    room: 0,
  })

  const { cities } = useCities()

  /**
   * Selects the start date of the trip
   *
   * @param date - The date of the trip
   */
  function selectStartDate(date: TripDetails['fromDate']): void {
    trip.value.fromDate = date
  }

  /**
   * Selects the end date of the trip
   *
   * @param date - The end date of the trip
   */
  function selectEndDate(date: TripDetails['toDate']): void {
    trip.value.toDate = date
  }

  /**
   * Selects the location of the trip
   *
   * @param location - The location of the trip
   */
  function selectLocation(location: TripDetails['location']): void {
    trip.value.location = location
  }

  /**
   * Selects the hotel of the trip
   *
   * @param hotel - The hotel of the trip
   */
  function selectHotel(hotel: TripDetails['hotel']): void {
    trip.value.hotel = hotel
  }

  /**
   * Selects the room of the trip
   *
   * @param room - The room of the trip
   */
  function selectRoom(room: TripDetails['room']): void {
    trip.value.room = room
  }

  /**
   * Currently selected location based on trip details
   */
  const location = computed(() => {
    return cities.value.find((city) => city.id === trip.value.location)
  })

  /**
   * Selects default trip details:
   *  - current date as start date
   *  - current date + 1 day as end date
   *  - first location as location
   */
  function selectDefault(): void {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    selectStartDate(today.toISOString().split('T')[0])
    selectEndDate(tomorrow.toISOString().split('T')[0])

    if (cities.value.length > 0) {
      selectLocation(cities.value[0].id)
    }
  }

  return {
    selectStartDate,
    selectEndDate,
    selectLocation,
    selectHotel,
    selectRoom,
    trip,
    location,
    selectDefault,
  }
})
