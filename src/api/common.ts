import axios from '@/utils/axios'
import {
  FooterLinkConfig,
  NavConfig,
  MoocResponseConfig,
  SidebarItemConfig,
  CeciConfig,
  MoocCeciResponseConfig
} from '@/types'

// header navigation list
export function getHeaderNav (): Promise<MoocResponseConfig<NavConfig[]>> {
  return axios.get('/api/mock/common/header.json')
}

// footer link list
export function getFooterLink (): Promise<MoocResponseConfig<FooterLinkConfig[]>> {
  return axios.get('/api/mock/common/footer.json')
}

// sidebar list
export function getSidebar (): Promise<MoocResponseConfig<SidebarItemConfig[]>> {
  return axios.get('/api/mock/common/sidebar.json')
}

export function getCeci (): Promise<MoocCeciResponseConfig<CeciConfig[]>> {
  return axios.get('/api/mock/generator/ceci.json')
}

export function getCeciDetail (id: string): Promise<MoocCeciResponseConfig<CeciConfig[]>> {
  return axios.get('/api/mock/generator/ceci_detail.json?id=' + id)
}

export function getCourse (): Promise<MoocCeciResponseConfig<CeciConfig[]>> {
  return axios.get('/api/mock/generator/course.json')
}

export function getRes (): Promise<MoocCeciResponseConfig<CeciConfig[]>> {
  return axios.get('/api/mock/generator/res.json')
}

export function getReslink (): Promise<MoocCeciResponseConfig<CeciConfig[]>> {
  return axios.get('/api/mock/generator/reslink.json')
}
