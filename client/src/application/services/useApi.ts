import Transport from '@/infra/transport/api'
import type JSONValue from '@/infra/transport/types/json'

interface useApiComposableState {
  post: (endpoint: string, data: any) => Promise<JSONValue>;
}

export const useApi = (): useApiComposableState => {
  const url = 'https://1fc4-51-158-186-93.ngrok-free.app'

  const transport = new Transport(url)

  return {
    post: async (endpoint: string, data: any) => {
      return await transport.post(endpoint, data)
    },
  }
}
