import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios'
import axios from 'axios'
import { toast } from 'sonner'
import { clearToken, getToken } from '@/lib/token.ts'

export interface HttpResp<T = unknown> {
  error?: string
  data?: T
  pagination?: Pagination
}

export type JSONValue = string | number | null | boolean | JSONValue[] | { [key: string]: JSONValue }

export class Http {
  instance: AxiosInstance

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
    })
  }

  get<R = unknown>(
    url: string,
    query?: Record<string, string | boolean | number | undefined>,
    config?: Omit<AxiosRequestConfig, 'url' | 'params' | 'method'>,
  ) {
    return this.instance.request<HttpResp<R>>({ url, params: query, method: 'GET', ...config })
  }

  post<R = unknown>(
    url: string,
    data?: any,
    config?: Omit<AxiosRequestConfig, 'url' | 'data' | 'method'>,
  ) {
    return this.instance.request<HttpResp<R>>({ url, data, method: 'POST', ...config })
  }

  patch<R = unknown>(
    url: string,
    data?: Record<string, JSONValue>,
    config?: Omit<AxiosRequestConfig, 'url' | 'data' | 'method'>,
  ) {
    return this.instance.request<HttpResp<R>>({ url, data, method: 'PATCH', ...config })
  }

  put<R = unknown>(
    url: string,
    data?: Record<string, JSONValue>,
    config?: Omit<AxiosRequestConfig, 'url' | 'data' | 'method'>,
  ) {
    return this.instance.request<HttpResp<R>>({ url, data, method: 'PUT', ...config })
  }

  delete<R = unknown>(
    url: string,
    query?: Record<string, string>,
    config?: Omit<AxiosRequestConfig, 'url' | 'params' | 'method'>,
  ) {
    return this.instance.request<HttpResp<R>>({ url, params: query, method: 'DELETE', ...config })
  }
}

export const http = new Http('/api/v1')

http.instance.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    if (!config.headers)
      config.headers = {} as AxiosRequestHeaders

    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

http.instance.interceptors.response.use(
  (response: AxiosResponse<HttpResp | Blob>) => {
    if (response.data instanceof Blob) {
      // download file
      const url = window.URL.createObjectURL(response.data)
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', (response.headers['content-disposition']).split(';')[1].split('=')[1])
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    }
    return response
  },
  (error: AxiosError<HttpResp>) => {
    if (error.response?.status === 401) {
      if (getToken()) {
        toast.info('登录状态已过期，请重新登录', { position: 'top-center' })
        clearToken()
      }
      return
    }

    if (error.response?.status === 404) {
      // window.location.href = '/404'
      return
    }

    toast.error(error.response?.data.error || error.message, {
      position: 'top-center',
    })
    throw error
  },
)
