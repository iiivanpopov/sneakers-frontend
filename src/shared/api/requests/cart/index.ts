import { api } from '../../instance'

export type GetCartRequestConfig = AxiosRequestConfig

export async function getCart(params?: GetCartRequestConfig) {
  return api.get<GetCartResponse>(`/cart`, params?.config)
}

export type AddToCartRequestParams = AddToCartDto
export type AddToCartRequestConfig = AxiosRequestConfig<AddToCartRequestParams>

export async function addToCart({ params, config }: AddToCartRequestConfig) {
  return api.post<AddToCartResponse>(`/cart`, params, config)
}

export type ClearCartRequestConfig = AxiosRequestConfig

export async function clearCart({ config }: ClearCartRequestConfig) {
  return api.delete<ClearCartResponse>(`/cart`, config)
}
