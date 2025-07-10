import { buildSearchParams } from '@/shared/lib/buildSearchParams'
import { api } from '../../instance'

export type GetSneakersRequestParams = GetSneakersDto
export type GetSneakersRequestConfig =
  AxiosRequestConfig<GetSneakersRequestParams>

export async function getSneakers({
  params,
  config
}: GetSneakersRequestConfig) {
  return api.get<GetSneakersResponse>(
    `/sneakers${buildSearchParams({ ...params })}`,
    config
  )
}

export * from './brands'
export * from './popular'
export * from './search'
export * from './{slug}'
