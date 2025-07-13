import { api } from '../../instance'

export interface SignOutRequestParams {}
export type SignOutRequestConfig = AxiosRequestConfig<SignOutRequestParams>

export function signOut({ config }: SignOutRequestConfig) {
  return api.post<SignOutResponse>('/auth/logout', config)
}
