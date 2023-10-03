/**
 * Describes a trip target (City)
 */
export default interface City {
  /**
   * Identifier
   */
  id: number;

  /**
   * Visible title
   */
  title: string;

  /**
   * Just picture of a country flag
   */
  emoji: string;

  /**
   * Country name
   */
  country: string;
}
