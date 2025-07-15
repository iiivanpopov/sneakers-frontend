import { api } from '@/shared/api/instance'

export type AddToFavoritesRequestParams = AddToFavoritesDto
export type AddToFavoritesRequestConfig =
  AxiosRequestConfig<AddToFavoritesRequestParams>

export async function addToFavorites({
  params,
  config
}: AddToFavoritesRequestConfig) {
  return api.post<BaseResponse>(`/favorites/${params.slug}`, undefined, config)
}

export type RemoveFromFavoritesRequestParams = RemoveToFavoritesDto
export type RemoveFromFavoritesRequestConfig =
  AxiosRequestConfig<RemoveFromFavoritesRequestParams>

export async function removeFromFavorites({
  params,
  config
}: RemoveFromFavoritesRequestConfig) {
  return api.delete<BaseResponse>(`/favorites/${params.slug}`, config)
}
