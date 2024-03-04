import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
// import { ElMessage } from 'element-plus'
import { getToken } from './cache'
import { baseURL } from '@/api/config'
const instance = axios.create({
  timeout: 10000,
  baseURL: baseURL
})

// 请求拦截
instance.interceptors.request.use((config: AxiosRequestConfig) => {
  // add token TDD
  // const { url } = config
  config.headers.Authorization = getToken()
  // if (url?.indexOf('/userinfo') !== -1) {
  //   config.headers.Authorization = getToken()
  // }
  return config
})

// 响应拦截
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const { status, data } = response
    if (status !== 200) {
      return Promise.reject(data)
    } else {
      return Promise.resolve(data)
    }
  },
  (err: AxiosError) => {
    console.log(err)
    // ElMessage.error(err.message || '接口请求异常')
  }
)

export default instance
