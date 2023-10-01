import type JSONValue from '../types/json.ts'

/**
 * Additional options for fetch transport
 */
export interface FetchTransportOptions {
  /**
   * Error formatter to create an Error based on status and payload
   */
  errorFormatter?: (status: number, payload: JSONValue, endpoint: string) => Error;
}

/**
 * Fetch transport to make HTTP requests
 */
export default class FetchTransport {
  /**
   * Common headers for all requests
   * For example, may contain authorization
   */
  protected readonly headers = new Headers()

  /**
   * Fetch constructor
   *
   * @param baseUrl - Base URL
   * @param options - Transport options
   */
  constructor(private readonly baseUrl: string, private readonly options?: FetchTransportOptions) {
  }

  /**
   * Gets specific resource
   *
   * @template Response - Response data type
   * @param endpoint - API endpoint
   * @param data - data to be sent url encoded
   */
  public async get(endpoint: string, data?: JSONValue): Promise<JSONValue> {
    const resourceUrl = new URL(this.baseUrl + endpoint)

    if (data !== undefined) {
      resourceUrl.search = new URLSearchParams(data as Record<string, string>).toString()
    }

    const response = await fetch(resourceUrl.toString(), {
      method: 'GET',
      headers: this.headers,
    })

    return await this.parseResponse(response, endpoint)
  }

  /**
   * Make POST request to update some resource
   *
   * @template Response - Response data type
   * @param endpoint - API endpoint
   * @param payload - JSON POST data body
   */
  public async post(endpoint: string, payload?: JSONValue): Promise<JSONValue> {
    this.headers.set('Content-Type', 'application/json')

    /**
     * Send payload as body to allow Fastify accept it
     */
    const response = await fetch(this.baseUrl + endpoint, {
      method: 'POST',
      headers: this.headers,
      body: payload !== undefined ? JSON.stringify(payload) : undefined,
    })

    return await this.parseResponse(response, endpoint)
  }

  /**
   * Check response for errors
   *
   * @param response - Response object
   * @param endpoint - API endpoint used for logging
   * @throws Error
   */
  private async parseResponse(response: Response, endpoint: string): Promise<JSONValue> {
    let payload

    /**
     * Try to parse error data. If it is not valid JSON, throw error
     */
    try {
      payload = await response.json()
    } catch (error) {
      throw new Error(`The response is not valid JSON (requesting ${endpoint})`)
    }

    /**
     * The 'ok' read-only property of the Response interface contains a Boolean
     * stating whether the response was successful (status in the range 200-299) or not
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
     */
    if (response.ok) {
      return payload
    }

    /**
     * If error formatter is provided, use it to create an Error based on status and payload
     */
    if (this.options?.errorFormatter !== undefined) {
      throw this.options.errorFormatter(response.status, payload, endpoint)
    } else {
      throw new Error(`${response.statusText || 'Bad response'} (requesting ${endpoint}))`)
    }
  }
}
