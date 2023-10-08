
export default async function handler(request, response): Promise<any> {
  return response.send(`Hello test!` + 'TS');
}
