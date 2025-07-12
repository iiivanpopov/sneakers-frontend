import { api } from '../../instance'

export type GetProfileRequestConfig = AxiosRequestConfig

export async function getProfile(params?: GetProfileRequestConfig) {
  return api.get<GetProfileResponse>(`/session`, params?.config)
}

export type UpdateProfileRequestParams = UpdateProfileDto
export type UpdateProfileRequestConfig =
  AxiosRequestConfig<UpdateProfileRequestParams>

export async function updateProfile({
  params,
  config
}: UpdateProfileRequestConfig) {
  return api.patch<UpdateProfileResponse>(`/profile`, params, config)
}
