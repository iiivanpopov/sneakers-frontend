import { api } from '../../instance'

export type GetFavoritesRequestConfig = AxiosRequestConfig

export async function getFavorites({ config }: GetFavoritesRequestConfig = {}) {
  return api.get<GetFavoritesResponse>('/favorites', config)
}
