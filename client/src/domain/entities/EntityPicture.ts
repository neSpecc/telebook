/**
 * Represents data to render some entity picture.
 */
export default interface EntityPicture {
  /**
   * Unique identifier of the entity
   */
  id?: number;
  /**
   * Picture url.
   */
  src?: string;

  /**
   * Entity name to use as placeholder when entity picture is not defined
   */
  placeholder?: string;

  /**
   * Picture thumbnail base64 url
   */
  pictureThumb?: string;
}

