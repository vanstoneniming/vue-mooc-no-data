import axios from '@/utils/axios'
import {
  CeciConfig,
  CourseConfig,
  FooterLinkConfig,
  MoocCeciResponseConfig,
  MoocCourseResponseConfig,
  MoocResponseConfig,
  NavConfig, ResConfig, ResLinkConfig,
  SidebarItemConfig
} from '@/types'

// header navigation list
export function getHeaderNav (): Promise<MoocResponseConfig<NavConfig[]>> {
  return axios.get('/api/header')
}

// footer link list
export function getFooterLink (): Promise<MoocResponseConfig<FooterLinkConfig[]>> {
  return axios.get('/api/footer')
}

// sidebar list
export function getSidebar (): Promise<MoocResponseConfig<SidebarItemConfig[]>> {
  return axios.get('/api/sidebar')
}

export function getCeci (params: Record<any, any>): Promise<MoocCeciResponseConfig<CeciConfig[]>> {
  return axios.get('/api/generator/ceci', params)
}

export function getCeciDetail (id: string, params: Record<any, any>): Promise<MoocCourseResponseConfig<CourseConfig[]>> {
  return axios.get('/api/generator/ceci/' + id, params)
}

export function getCourse (params: Record<any, any>): Promise<MoocCeciResponseConfig<CourseConfig[]>> {
  return axios.get('/api/generator/course', params)
}

export function getCourseDetail (id: string, params: Record<any, any>): Promise<MoocCourseResponseConfig<ResConfig[]>> {
  return axios.get('/api/generator/course/' + id, params)
}

export function getRes (params: Record<any, any>): Promise<MoocCeciResponseConfig<ResConfig[]>> {
  return axios.get('/api/generator/resource', params)
}
export function getResDetail (id: string, params: Record<any, any>): Promise<MoocCeciResponseConfig<ResLinkConfig[]>> {
  return axios.get('/api/generator/resource/' + id, params)
}
