import { useQuery } from '@tanstack/react-query'
import { getPopularSneakers } from '../requests'

export function useGetPopularSneakersQuery(
  params: GetPopularSneakersDto,
  settings?: QuerySettings<typeof getPopularSneakers>
) {
  return useQuery({
    queryKey: ['getPopularSneakersQuery'],
    queryFn: () => getPopularSneakers({ params, config: settings?.config }),
    ...settings?.options
  })
}
