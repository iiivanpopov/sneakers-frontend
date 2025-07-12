import { api } from '@/shared/api/instance'
import { buildSearchParams } from '@/shared/lib/buildSearchParams'

export type GetPopularSneakersRequestParams = GetPopularSneakersDto
export type GetPopularSneakersRequestConfig =
  AxiosRequestConfig<GetPopularSneakersRequestParams>

export async function getPopularSneakers({
  config,
  params
}: GetPopularSneakersRequestConfig) {
  return api.get<GetPopularSneakersResponse>(
    `/popular${buildSearchParams({ ...params })}`,
    config
  )
}
