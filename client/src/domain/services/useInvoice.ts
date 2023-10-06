import type LabeledPrice from '@/domain/entities/LabeledPrice'
import Transport from '@/infra/transport/api'

interface useInvoiceComposableState {
  create: (params: CreateInvoiceParams) => Promise<string | null>;
  toPrice: (usdAmount: number) => number;
}

/**
 * Params for creating a new invoice
 *
 * @see https://core.telegram.org/bots/api#createinvoicelink
 */
interface CreateInvoiceParams {
  /**
   * Product name, 1-32 characters
   */
  title: string;

  /**
   * Product description, 1-255 characters
   */
  description: string;

  /**
   * Three-letter ISO 4217 currency code, see more on currencies
   *
   * @see https://core.telegram.org/bots/payments#supported-currencies
   */
  currency: string;

  /**
   * Price breakdown, a JSON-serialized list of components (e.g. product price, tax, discount, delivery cost, delivery tax, bonus, etc.)
   */
  prices: LabeledPrice[];

  /**
   * JSON-serialized data about the invoice, which will be shared with the payment provider. A detailed description of required fields should be provided by the payment provider.
   */
  provider_data?: string;

  /**
   * URL of the product photo for the invoice. Can be a photo of the goods or a marketing image for a service. People like it better when they see what they are paying for.
   */
  photo_url?: string;

  /**
   * Photo size
   */
  photo_size?: number;

  /**
   * Photo width
   */
  photo_width?: number;

  /**
   * Photo height
   */
  photo_height?: number;

  /**
   * Pass True, if you require the user's full name to complete the order
   */
  need_name?: boolean;

  /**
   * Pass True, if you require the user's phone number to complete the order
   */
  need_phone_number?: boolean;

  /**
   * Pass True, if you require the user's email address to complete the order
   */
  need_email?: boolean;

  /**
   * Pass True, if you require the user's shipping address to complete the order
   */
  need_shipping_address?: boolean;

  /**
   * Pass True, if user's phone number should be sent to provider
   */
  send_phone_number_to_provider?: boolean;

  /**
   * Pass True, if user's email address should be sent to provider
   */
  send_email_to_provider?: boolean;

  /**
   * Pass True, if the final price depends on the shipping method
   */
  is_flexible?: boolean;
}

/**
 * Service to create a new invoice
 */
export default function useInvoice(): useInvoiceComposableState {
  const url = import.meta.env.VITE_API_HOST

  /**
   * @todo use IoC container
   */
  const transport = new Transport(url)

  /**
   * Create a new invoice
   *
   * @param params - Params for creating a new invoice
   */
  const create = async (params: CreateInvoiceParams): Promise<string | null> => {
    try {
      const response = await transport.post('/createInvoice', params)

      return (response as { invoiceLink: string }).invoiceLink
    } catch (e) {
      return null
    }
  }

  /**
   * Convert USD amount to price in cents
   *
   * @param usdAmount - USD amount
   */
  function toPrice(usdAmount: number): number {
    return Math.round(usdAmount * 100)
  }

  return {
    create,
    toPrice,
  }
}
