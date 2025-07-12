import type { SearchSneakersRequestParams } from '../requests/sneakers/search'
import { useQuery } from '@tanstack/react-query'
import { searchSneakers } from '../requests/sneakers/search'

export function useSearchSneakersQuery(
  params: SearchSneakersRequestParams,
  settings?: QuerySettings<typeof searchSneakers>
) {
  return useQuery({
    queryKey: ['searchSneakersQuery', params.q, params.limit, params.offset],
    queryFn: () => searchSneakers({ params, config: settings?.config }),
    ...settings?.options
  })
}
