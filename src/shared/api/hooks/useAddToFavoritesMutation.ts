import type { AddToFavoritesRequestConfig } from '../requests/favorites/{slug}'
import { useMutation } from '@tanstack/react-query'
import { addToFavorites } from '../requests/favorites/{slug}'

export function useAddToFavoritesMutation(
  settings?: MutationSettings<
    AddToFavoritesRequestConfig,
    typeof addToFavorites
  >
) {
  return useMutation({
    mutationKey: ['addToFavoritesMutation'],
    mutationFn: ({ params, config }) =>
      addToFavorites({ params, config: { ...settings?.config, ...config } }),
    ...settings?.options
  })
}
