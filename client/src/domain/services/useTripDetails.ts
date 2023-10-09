import type TripDetails from '@/domain/entities/TripDetails'
import { createSharedComposable } from '@vueuse/core'
import { computed, type ComputedRef, reactive, type UnwrapNestedRefs } from 'vue'
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
  setStartDate: (date: TripDetails['startDate']) => void;

  /**
   * Selects the end date of the trip
   *
   * @param date - The end date of the trip
   */
  setEndDate: (date: TripDetails['endDate']) => void;

  /**
   * Selects the location of the trip
   *
   * @param id - Id of the location of the trip
   */
  setCity: (id: TripDetails['city']) => void;

  /**
   * Selects the hotel of the trip
   *
   * @param hotel - Id of the hotel of the trip
   */
  setHotel: (hotel: TripDetails['hotel']) => void;

  /**
   * Selects the room of the trip
   *
   * @param room - Id of the room of the trip
   */
  setRoom: (room: TripDetails['room']) => void;

  /**
   * Information about current trip
   */
  trip: UnwrapNestedRefs<TripDetails>;

  /**
   * Location based on trip details
   */
  location: ComputedRef<City | undefined>;

  /**
   * Number of days of the trip
   */
  days: ComputedRef<number>;

  /**
   * Selects default trip details:
   *  - current date as start date
   *  - current date + 1 day as end date
   *  - first location as location
   */
  selectDefault: () => void;
}

/**
 * Information about current trip
 */
const trip = reactive<TripDetails>({
  startDate: new Date(),
  endDate: new Date(),
  city: 0,
  hotel: 0,
  room: 0,
})

/**
 * Composable to handle trip details
 */
export const useTripDetails = createSharedComposable((): useTripDetailsComposableState => {
  const { cities } = useCities()

  /**
   * Selects the start date of the trip
   *
   * @param date - The date of the trip
   */
  function setStartDate(date: TripDetails['startDate']): void {
    trip.startDate = date
  }

  /**
   * Selects the end date of the trip
   *
   * @param date - The end date of the trip
   */
  function setEndDate(date: TripDetails['endDate']): void {
    trip.endDate = date
  }

  /**
   * Selects the location of the trip
   *
   * @param cityId - The location of the trip
   */
  function setCity(cityId: TripDetails['city']): void {
    trip.city = cityId
  }

  /**
   * Selects the hotel of the trip
   *
   * @param hotel - The hotel of the trip
   */
  function setHotel(hotel: TripDetails['hotel']): void {
    trip.hotel = hotel
  }

  /**
   * Selects the room of the trip
   *
   * @param room - The room of the trip
   */
  function setRoom(room: TripDetails['room']): void {
    trip.room = room
  }

  /**
   * Currently selected location based on trip details
   */
  const location = computed(() => {
    return cities.value.find((city) => city.id === trip.city)
  })

  /**
   * Number of days of the trip
   */
  const days = computed(() => {
    const diffTime = Math.abs(trip.endDate.getTime() - trip.startDate.getTime())
    return Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 1)
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

    setStartDate(today)
    setEndDate(tomorrow)

    if (cities.value.length > 0) {
      setCity(cities.value[0].id)
    }
  }

  return {
    setStartDate,
    setEndDate,
    setCity,
    setHotel,
    setRoom,
    trip,
    location,
    selectDefault,
    days
  }
})
