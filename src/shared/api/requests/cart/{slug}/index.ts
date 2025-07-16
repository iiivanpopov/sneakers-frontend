import { api } from '@/shared/api/instance'

export type UpdateSneakerInCartRequestParams = UpdateSneakerInCartDto
export type UpdateSneakerInCartRequestConfig =
  AxiosRequestConfig<UpdateSneakerInCartRequestParams>

export async function updateSneakerInCart({
  params,
  config
}: UpdateSneakerInCartRequestConfig) {
  return api.patch<GetSneakerResponse>(
    `/cart/${params.slug}`,
    { quantity: params.quantity },
    config
  )
}

export type RemoveSneakerFromCartRequestParams = DeleteSneakerFromCartDto
export type RemoveSneakerFromCartRequestConfig =
  AxiosRequestConfig<RemoveSneakerFromCartRequestParams>

export async function removeSneakerFromCart({
  params,
  config
}: RemoveSneakerFromCartRequestConfig) {
  return api.delete<RemoveSneakerFromCartResponse>(
    `/cart/${params.slug}`,
    config
  )
}
