import type { AddToCartRequestConfig } from '../requests/cart'
import { useMutation } from '@tanstack/react-query'
import { addToCart } from '../requests/cart'

export function useAddToCartMutation(
  settings?: MutationSettings<AddToCartRequestConfig, typeof addToCart>
) {
  return useMutation({
    mutationKey: ['addToCartMutation'],
    mutationFn: ({ params, config }) =>
      addToCart({ params, config: { ...settings?.config, ...config } }),
    ...settings?.options
  })
}
