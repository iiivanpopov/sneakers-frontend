import type { UpdateProfileRequestConfig } from '../requests'
import { useMutation } from '@tanstack/react-query'
import { updateProfile } from '../requests'

export function useUpdateProfileMutation(
  settings?: MutationSettings<UpdateProfileRequestConfig, typeof updateProfile>
) {
  return useMutation({
    mutationKey: ['updateProfileMutation'],
    mutationFn: ({ params, config }) =>
      updateProfile({ params, config: { ...settings?.config, ...config } }),
    ...settings?.options
  })
}
