import axios from 'axios'
import { LOCAL_STORAGE } from '../constants/localStorage'

export const api = axios.create({
  baseURL: 'https://localhost:4213',
  withCredentials: true
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(undefined, async error => {
  if (error.status === 401) {
    const baseConfig = { ...error.config, _isRetry: false }
    const refreshResponse = await axios.get<RefreshResponse>(
      'https://localhost:4213/auth/refresh',
      {
        withCredentials: true
      }
    )
    const accessToken = refreshResponse.data.accessToken

    if (accessToken) {
      localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, accessToken)
      await axios.request({
        ...baseConfig,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          _isRetry: true
        }
      })
    }

    return error
  }

  return error
})
