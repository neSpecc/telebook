
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(request: VercelRequest, response: VercelResponse): Promise<any> {
  return response.send(`Hello test!` + 'TS');
}
