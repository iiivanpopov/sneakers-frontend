import { api } from '../../instance'

export type GetProfileRequestConfig = AxiosRequestConfig

export async function getProfile(params?: GetProfileRequestConfig) {
  return api.get<GetProfileResponse>(`/session`, params?.config)
}
