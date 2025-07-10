import type {GetSneakerStockRequestParams} from '../requests';

import { useQuery } from '@tanstack/react-query'
import { getSneakerStock  } from '../requests'

export function useGetSneakerStockQuery(
  params: GetSneakerStockRequestParams,
  settings?: QuerySettings<typeof getSneakerStock>
) {
  return useQuery({
    queryKey: ['getSneakerQuery', params.slug],
    queryFn: () => getSneakerStock({ params, config: settings?.config }),
    ...settings?.options
  })
}
