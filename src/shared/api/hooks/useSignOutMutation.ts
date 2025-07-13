import type { SignOutRequestConfig } from '../requests/signout'
import { useMutation } from '@tanstack/react-query'
import { signOut } from '../requests/signout'

export function useSignOutMutation(
  settings?: MutationSettings<SignOutRequestConfig, typeof signOut>
) {
  return useMutation({
    mutationKey: ['signOutMutation'],
    mutationFn: ({ config, params }) =>
      signOut({ params, config: { ...settings?.config, ...config } }),
    ...settings?.options
  })
}
