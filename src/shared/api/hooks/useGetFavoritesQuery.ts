import { useQuery } from '@tanstack/react-query'
import { getFavorites } from '../requests/favorites'

export function useGetFavoritesQuery(
  settings?: QuerySettings<typeof getFavorites>
) {
  return useQuery({
    queryKey: ['getFavoritesQuery'],
    queryFn: () => getFavorites({ config: settings?.config }),
    ...settings?.options
  })
}
