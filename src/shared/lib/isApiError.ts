import axios from 'axios'

export function isApiError(
  error: unknown
): error is ApiError & { response: BaseResponse } {
  return axios.isAxiosError(error) && error.response?.data?.success === false
}
