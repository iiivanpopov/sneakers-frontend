import { api } from '@/shared/api/instance'

export type GetSneakerRequestParams = GetSneakerDto
export type GetSneakerRequestConfig =
  AxiosRequestConfig<GetSneakerRequestParams>

export async function getSneaker({ params, config }: GetSneakerRequestConfig) {
  return api.get<GetSneakerResponse>(`/sneakers/${params.slug}`, config)
}

export type GetSneakerStockRequestParams = GetSneakerStockDto
export type GetSneakerStockRequestConfig =
  AxiosRequestConfig<GetSneakerStockRequestParams>

export async function getSneakerStock({
  params,
  config
}: GetSneakerStockRequestConfig) {
  return api.get<GetSneakerStockResponse>(
    `/sneakers/${params.slug}/stock`,
    config
  )
}
