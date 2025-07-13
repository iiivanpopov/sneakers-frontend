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

interface GetProfileResponse extends BaseResponse {
  user: {
    id: string
    email: string
    firstName: string
    middleName: string
    lastName: string
    country: string
    city: string
    role: string
  }
}

interface User {
  id: string
  email: string
  firstName: string
  middleName: string
  lastName: string
  country: string
  city: string
  role: string
}

interface ProfileDto {
  firstName: string
  middleName: string
  lastName: string
  email: string
  city: string
  country: string
}

interface UpdateProfileDto {
  profile: ProfileDto
  email: string
}

interface UpdateProfileResponse extends BaseResponse {
  user: {
    id: string
    email: string
    firstName: string
    middleName: string
    lastName: string
    country: string
    city: string
    role: string
  }
}

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
  user: User
}

interface SignOutResponse extends BaseResponse {}

interface RefreshResponse extends BaseResponse {
  accessToken: string
}

interface SignInDto {
  email: string
  code: number
}

interface GetSneakersDto {
  limit?: string
  offset?: string
  brandName: string
  hasDiscount: string
  minPrice: string
  maxPrice: string
}

interface SneakerItem {
  id: string
  name: string
  slug: string
  description: string
  price: number
  images: string[]
  brandName: string
  views: number
  purchases: number
  finalPrice: number
  hasActiveDiscount: boolean
  discountSavings?: number
}

interface GetSneakersResponse extends BaseResponse {
  data: SneakerItem[]
}

interface SearchSneakersDto {
  q: string
  limit?: string
  offset?: string
}

interface SearchSneakersResponse extends BaseResponse {
  data: SneakerItem[]
}

interface GetPopularSneakersDto {
  limit?: string
  offset?: string
}

interface GetPopularSneakersResponse extends BaseResponse {
  data: SneakerItem[]
}

interface SneakerBrandItem {
  id: string
  name: string
  logo: string | null
  createdAt: string
  updatedAt: string
}

interface GetSneakerBrandsResponse extends BaseResponse {
  data: SneakerBrandItem[]
}

interface GetSneakerDto {
  slug: string
}

interface GetSneakerResponse extends BaseResponse {
  data: SneakerItem
}

interface GetSneakerStockDto {
  slug: string
}

interface StockItem {
  id: string
  sneakerId: string
  size: number
  quantity: number
  createdAt: string
  updatedAt: string
}

interface GetSneakerStockResponse extends BaseResponse {
  data: StockItem[]
}
