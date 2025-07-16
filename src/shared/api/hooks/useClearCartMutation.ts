import type { ClearCartRequestConfig } from '../requests/cart'
import { useMutation } from '@tanstack/react-query'
import { clearCart } from '../requests/cart'

export function useClearCartMutation(
  settings?: MutationSettings<ClearCartRequestConfig, typeof clearCart>
) {
  return useMutation({
    mutationKey: ['clearCartMutation'],
    mutationFn: ({ config }) =>
      clearCart({ config: { ...settings?.config, ...config } }),
    ...settings?.options
  })
}
