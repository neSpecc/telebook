import DomainError from './Base'

/**
 * Domain error thrown when some resource is not found
 */
export default class NotFoundError extends DomainError {
  /**
   * Constructor for NotFound error
   *
   * @param message - Error message
   */
  constructor(message: string = 'NotFound') {
    super(message)
    this.name = 'NotFoundError'
  }
}
