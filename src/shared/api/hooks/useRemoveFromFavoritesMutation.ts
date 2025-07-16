import type { RemoveFromFavoritesRequestConfig } from '../requests/favorites/{slug}'
import { useMutation } from '@tanstack/react-query'
import { removeFromFavorites } from '../requests/favorites/{slug}'

export function useRemoveFromFavoritesMutation(
  settings?: MutationSettings<
    RemoveFromFavoritesRequestConfig,
    typeof removeFromFavorites
  >
) {
  return useMutation({
    mutationKey: ['removeFromFavoritesMutation'],
    mutationFn: ({ params, config }) =>
      removeFromFavorites({
        params,
        config: { ...settings?.config, ...config }
      }),
    ...settings?.options
  })
}
