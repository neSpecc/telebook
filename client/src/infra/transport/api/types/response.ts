/**
 * Api successfully response type
 *
 * @template Payload - Response payload type
 */
export type ApiSuccessfulResponse<Payload> = Payload

/**
 * Api error response type
 */
export interface ApiErrorResponse {
  /**
   * Message identifier used for translation on client side
   *
   * NOT HTTP STATUS CODE — it will be send in `status` field
   */
  code?: number;

  /**
   * Message text for better DX. Should not be showed to users.
   */
  message?: string;
}

/**
 * Api response type
 */
export type ApiResponse<Payload> = ApiSuccessfulResponse<Payload> | ApiErrorResponse
