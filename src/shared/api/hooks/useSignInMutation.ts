import type { SignInRequestConfig } from '../requests/signin'
import { useMutation } from '@tanstack/react-query'
import { signIn } from '../requests/signin'

export function useSignInMutation(
  settings?: MutationSettings<SignInRequestConfig, typeof signIn>
) {
  return useMutation({
    mutationKey: ['signInMutation'],
    mutationFn: async ({ params, config }) =>
      await signIn({ params, config: { ...settings?.config, ...config } }),
    ...settings?.options
  })
}
