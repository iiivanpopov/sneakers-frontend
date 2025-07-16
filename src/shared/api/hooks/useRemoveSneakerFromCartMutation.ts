import type { RemoveSneakerFromCartRequestConfig } from '../requests/cart/{slug}'
import { useMutation } from '@tanstack/react-query'
import { removeSneakerFromCart } from '../requests/cart/{slug}'

export function useRemoveSneakerFromCartMutation(
  settings?: MutationSettings<
    RemoveSneakerFromCartRequestConfig,
    typeof removeSneakerFromCart
  >
) {
  return useMutation({
    mutationKey: ['removeSneakerFromCartMutation'],
    mutationFn: ({ params, config }) =>
      removeSneakerFromCart({
        params,
        config: { ...settings?.config, ...config }
      }),
    ...settings?.options
  })
}
