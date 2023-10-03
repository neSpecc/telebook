/* eslint-disable @typescript-eslint/no-magic-numbers */
import type { ApiErrorResponse } from './types/response.ts'
import NotFoundError from '@/domain/entities/errors/NotFound.ts'
import UnauthorizedError from '@/domain/entities/errors/Unauthorized.ts'
import FetchTransport from '../fetch/index.ts'

/**
 * Api transport — wrapper around FetchTransport working with our API formats
 */
export default class ApiTransport extends FetchTransport {
  /**
   * Constructor for api transport
   *
   * @param baseUrl - Base URL
   */
  constructor(baseUrl: string) {
    super(baseUrl, {
      /**
       * Method for creating an Error based on API response
       *
       * @param status - HTTP status
       * @param payload - Response JSON payload
       * @param endpoint - API endpoint we requested
       */
      errorFormatter(status, payload) {
        const { message, code } = (payload as ApiErrorResponse)

        let errorText = ''

        /**
         * If 'code' is provided, use it as an error text so we can show it to the user using corresponded i18n message
         */
        if (code !== undefined) {
          errorText = code.toString()
        } else if (message !== undefined) {
          errorText = message
        } else {
          errorText = 'Unknown error'
        }

        /**
         * Create error based on response status
         */
        switch (status) {
          case 401:
          case 403:
            return new UnauthorizedError(errorText)
          case 404:
            return new NotFoundError(errorText)
          default:
            return new Error(errorText)
        }
      },
    })
  }

  /**
   * Make GET request to the API
   *
   * @param endpoint - API endpoint
   * @param data - data to be sent url encoded
   */
  public async get<Payload>(endpoint: string, data?: any): Promise<Payload> {
    const response = await super.get(endpoint, data)

    return response as Payload
  }

  /**
   * Make POST request to theAPI
   *
   * @param endpoint - API endpoint
   * @param data - data to be sent with request body
   */
  public async post<Payload>(endpoint: string, data?: any): Promise<Payload> {
    const response = await super.post(endpoint, data)

    return response as Payload
  }
}
