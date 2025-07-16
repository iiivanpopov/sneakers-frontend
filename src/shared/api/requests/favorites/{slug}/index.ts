import { api } from '@/shared/api/instance'

export type AddToFavoritesRequestParams = AddToFavoritesDto
export type AddToFavoritesRequestConfig =
  AxiosRequestConfig<AddToFavoritesRequestParams>

export async function addToFavorites({
  params,
  config
}: AddToFavoritesRequestConfig) {
  return api.post<AddToFavoritesResponse>(
    `/favorites/${params.slug}`,
    undefined,
    config
  )
}

export type RemoveFromFavoritesRequestParams = RemoveFromFavoritesDto
export type RemoveFromFavoritesRequestConfig =
  AxiosRequestConfig<RemoveFromFavoritesRequestParams>

export async function removeFromFavorites({
  params,
  config
}: RemoveFromFavoritesRequestConfig) {
  return api.delete<RemoveFromFavoritesResponse>(
    `/favorites/${params.slug}`,
    config
  )
}
