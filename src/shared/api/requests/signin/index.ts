import { api } from '../../instance'

export type SignInRequestParams = SignInDto
export type SignInRequestConfig = AxiosRequestConfig<SignInRequestParams>

export function signIn({ params, config }: SignInRequestConfig) {
  return api.post<SignInResponse>('/auth/signin', params, config)
}
