import { api } from '@/shared/api/instance'

export type GetSneakerBrandsRequestConfig = AxiosRequestConfig

export async function getSneakerBrands({
  config
}: GetSneakerBrandsRequestConfig) {
  return api.get<GetSneakerBrandsResponse>(`/sneakers/brands`, config)
}
