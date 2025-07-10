import type {GetSneakerRequestParams} from '../requests';

import { useQuery } from '@tanstack/react-query'
import { getSneaker  } from '../requests'

export function useGetSneakerQuery(
  params: GetSneakerRequestParams,
  settings?: QuerySettings<typeof getSneaker>
) {
  return useQuery({
    queryKey: ['getSneakerQuery', params.slug],
    queryFn: () => getSneaker({ params, config: settings?.config }),
    ...settings?.options
  })
}
