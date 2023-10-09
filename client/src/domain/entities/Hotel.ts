import type { Award, Room, Chart, Rating } from '.'

export default interface Hotel {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  address: string;
  price: number;
  picture: string;
  pictureThumb?: string;
  ratingsCount: number;
  rating: Rating;
  award: Award;
  chart: Chart;
  rooms: Room[];
}
