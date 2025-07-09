type AxiosRequestConfig<Params = undefined> = Params extends undefined
  ? { config?: import('axios').AxiosRequestConfig }
  : { params: Params; config?: import('axios').AxiosRequestConfig }

interface MutationSettings<Params = void, Func = unknown>
  extends AxiosRequestConfig {
  options?: import('@tanstack/react-query').UseMutationOptions<
    Awaited<ReturnType<Func>>,
    any,
    Params,
    any
  >
}

interface QuerySettings<Func = unknown> extends AxiosRequestConfig {
  options?: Omit<
    import('@tanstack/react-query').UseQueryOptions<
      Awaited<ReturnType<Func>>,
      any,
      Awaited<ReturnType<Func>>,
      any
    >,
    'queryKey'
  >
}

interface BaseResponse {
  reason?: string | null
  success: boolean
}

type ApiError = import('axios').AxiosError<{
  reason: string
  success: false
}>

interface OtpResponse extends BaseResponse {
  retryAt: number
}

interface OtpStatusResponse extends BaseResponse {
  retryAt: number
}

interface CreateOtpDto {
  email: string
}

interface SignInResponse extends BaseResponse {
  accessToken: string
}

interface SignInDto {
  email: string
  code: number
}
