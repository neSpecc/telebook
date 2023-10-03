import type City from '@/domain/entities/City.js'

/**
 * Cities Store simple example
 * ---------------------------
 */

/**
 * Cities available as cities (Mocked data)
 */
const citiesAvailable: City[] = []

/**
 * Get cities available as Cities
 */
export function getCitiesAvailable(): City[] {
  return citiesAvailable
}

/**
 * Get city by id
 *
 * @param id - City id
 */
export function getCityById(id: City['id']): City | undefined {
  return citiesAvailable.find((city) => city.id === id)
}

/**
 * Example of loading data.
 * In real app data should be loaded from API in Domain layer using Transport
 */
export async function loadCities(): Promise<City[]> {
  const cities = (await import('./mock/cities.js')).citiesAvailable

  citiesAvailable.push(...cities)

  return cities
}
