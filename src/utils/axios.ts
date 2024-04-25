import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus/lib'
import { getToken } from './cache'
import { baseURL } from '@/api/config'
import { config } from '@vue/test-utils'
import router from '@/router'

const instance = axios.create({
  timeout: 10000,
  baseURL
})

// 请求拦截
instance.interceptors.request.use((config: AxiosRequestConfig) => {
  // add token TDD
  const { url } = config
  const urlsToExclude = ['/login',
    '/api/header', '/api/footer', '/api/sidebar',
    '/api/generator/course', '/api/generator/ceci',
    '/api/system/dict_item/by/code']
  if (!urlsToExclude.some(excludedUrl => url === excludedUrl)) {
    config.headers.Authorization = getToken()
  }

  return config
})

// 响应拦截
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const { status, data } = response
    if (status === 200) {
      if (data.code === 401) {
        router.push('/login').then(() => ElMessage.info('Token过期，重新登录！'))
      }
      return Promise.resolve(data)
    }
    return Promise.reject(data)
  },
  (err: AxiosError) => {
    if (err.response?.status === 401) {
      router.push('/login').then(() => ElMessage.info('认证失败，需要登录！')
      )
    } else {
      ElMessage.error(err.message || '接口请求异常')
    }
  }
)

export default instance
