import type { GetOtpRequestConfig } from '../requests'
import { useMutation } from '@tanstack/react-query'

import { getOtp } from '../requests'

export function useGetOtpMutation(
  settings?: MutationSettings<GetOtpRequestConfig, typeof getOtp>
) {
  return useMutation({
    mutationKey: ['getOtpMutation'],
    mutationFn: ({ params, config }) =>
      getOtp({ params, config: { ...settings?.config, ...config } }),
    ...settings?.options
  })
}
