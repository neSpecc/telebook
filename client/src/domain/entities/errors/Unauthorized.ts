import DomainError from './Base'

/**
 * Domain error thrown when user is not authorized to perform some action
 */
export default class UnauthorizedError extends DomainError {
  /**
   * Constructor for unauthorized error
   *
   * @param message - Error message
   */
  constructor(message: string = 'Unauthorized') {
    super(message)
    this.name = 'UnauthorizedError'
  }
}
