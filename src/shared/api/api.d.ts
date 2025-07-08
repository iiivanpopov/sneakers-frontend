type AxiosRequestConfig<Params = undefined> = Params extends undefined
  ? { config?: import('axios').AxiosRequestConfig }
  : { params: Params; config?: import('axios').AxiosRequestConfig }

interface MutationSettings<Params = void, Func = unknown> {
  config?: AxiosRequestConfig
  options?: import('@tanstack/react-query').UseMutationOptions<
    Awaited<ReturnType<Func>>,
    any,
    Params,
    any
  >
}

interface QuerySettings<Func = unknown> {
  config?: AxiosRequestConfig
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
