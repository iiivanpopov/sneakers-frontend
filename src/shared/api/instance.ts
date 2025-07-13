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

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._isRetry) {
      try {
        const refreshResponse = await axios.get<{ accessToken: string }>(
          'https://localhost:4213/auth/refresh',
          { withCredentials: true }
        )

        const accessToken = refreshResponse.data.accessToken
        if (accessToken) {
          localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, accessToken)
          originalRequest._isRetry = true
          originalRequest.headers.Authorization = `Bearer ${accessToken}`
          return api.request(originalRequest)
        }
      } catch (refreshError) {
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)
