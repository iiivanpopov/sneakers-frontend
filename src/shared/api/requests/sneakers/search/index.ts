import { api } from '@/shared/api/instance'
import { buildSearchParams } from '@/shared/lib/buildSearchParams'

export type SearchSneakersRequestParams = SearchSneakersDto
export type SearchSneakersRequestConfig =
  AxiosRequestConfig<SearchSneakersRequestParams>

export async function searchSneakers({
  params,
  config
}: SearchSneakersRequestConfig) {
  return api.get<SearchSneakersResponse>(
    `/sneakers${buildSearchParams({ ...params })}`,
    config
  )
}
