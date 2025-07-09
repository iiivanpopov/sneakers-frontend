import { api } from '../../instance'

export type GetOtpRequestParams = CreateOtpDto
export type GetOtpRequestConfig = AxiosRequestConfig<GetOtpRequestParams>

export function getOtp({ params, config }: GetOtpRequestConfig) {
  return api.post<OtpResponse>('/auth/otp', params, config)
}

export type GetOtpStatusRequestParams = CreateOtpDto
export type GetOtpStatusRequestConfig = AxiosRequestConfig<GetOtpRequestParams>

export function getOtpStatus({ params, config }: GetOtpStatusRequestConfig) {
  return api.get<OtpStatusResponse>(`/auth/otp/${params.email}`, config)
}
