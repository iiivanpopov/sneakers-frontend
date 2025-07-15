import { useQuery } from '@tanstack/react-query'
import { getCart } from '../requests/cart'

export function useGetCartQuery(settings?: QuerySettings<typeof getCart>) {
  return useQuery({
    queryKey: ['getCartQuery'],
    queryFn: () => getCart({ config: settings?.config }),
    ...settings?.options
  })
}
