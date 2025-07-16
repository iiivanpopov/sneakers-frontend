import type { UpdateSneakerInCartRequestConfig } from '../requests/cart/{slug}'
import { useMutation } from '@tanstack/react-query'
import { updateSneakerInCart } from '../requests/cart/{slug}'

export function useUpdateSneakerInCartMutation(
  settings?: MutationSettings<
    UpdateSneakerInCartRequestConfig,
    typeof updateSneakerInCart
  >
) {
  return useMutation({
    mutationKey: ['updateSneakerInCartMutation'],
    mutationFn: ({ params, config }) =>
      updateSneakerInCart({
        params,
        config: { ...settings?.config, ...config }
      }),
    ...settings?.options
  })
}
