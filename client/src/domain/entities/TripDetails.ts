import type City from './City'

/**
 * Structure describing information of the trip
 */
export default interface TripDetails {
  /**
   * The date of the trip
   */
  startDate: Date;

  /**
   * The end date of the trip
   */
  endDate: Date;

  /**
   * Idd of the location of the trip
   */
  city: City['id'];

  /**
   * Selected hotel id
   */
  hotel: number;

  /**
   * The room in the selected hotel
   */
  room: number;
}
