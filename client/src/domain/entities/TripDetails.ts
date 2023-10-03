import type City from './City'

/**
 * Structure describing information of the trip
 */
export default interface TripDetails {
  /**
   * The date of the trip
   */
  fromDate: string;

  /**
   * The end date of the trip
   */
  toDate: string;

  /**
   * Idd of the location of the trip
   */
  location: City['id'];

  /**
   * Selected hotel id
   */
  hotel: number;

  /**
   * The room in the selected hotel
   */
  room: number;
}
