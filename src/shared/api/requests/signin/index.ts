import { api } from '../../instance'

export type SignInRequestParams = SignInDto
export type SignInRequestConfig = AxiosRequestConfig<SignInRequestParams>

export async function signIn({ params, config }: SignInRequestConfig) {
  return await api.post<SignInResponse>('/auth/signin', params, config)
}
