import type { GetSneakersRequestParams } from '../requests'
import { useQuery } from '@tanstack/react-query'
import { getSneakers } from '../requests'

export function useGetSneakersQuery(
  params: GetSneakersRequestParams,
  settings?: QuerySettings<typeof getSneakers>
) {
  return useQuery({
    queryKey: ['getSneakersQuery', params.limit, params.offset],
    queryFn: () => getSneakers({ params, config: settings?.config }),
    ...settings?.options
  })
}
