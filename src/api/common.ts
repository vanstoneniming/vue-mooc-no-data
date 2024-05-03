import axios from '@/utils/axios'
import {
  CeciConfig,
  CourseConfig,
  FooterLinkConfig,
  MoocCeciResponseConfig,
  MoocCourseResponseConfig,
  MoocResponseConfig, MoocDictCodeResponseConfig,
  NavConfig, ResConfig, ResLinkConfig,
  SidebarItemConfig, DictCodeConfig, ResponseConfig, DataCountConfig, QuestionrowConfig, QuestionConfig, PaperConfig
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
export function getQuestionrow (params: Record<any, any>): Promise<MoocCeciResponseConfig<QuestionrowConfig[]>> {
  return axios.get('/api/generator/questionrow', params)
}

export function getQuestionsByIds (ids: string): Promise<ResponseConfig<QuestionConfig[]>> {
  return axios.get('/api/generator/question_id/' + ids)
}

export function getQuestion (params: Record<any, any>): Promise<MoocCeciResponseConfig<QuestionConfig[]>> {
  return axios.get('/api/generator/question', params)
}

export function getPaper (params: Record<any, any>): Promise<MoocCeciResponseConfig<PaperConfig[]>> {
  return axios.get('/api/generator/paperfrom', params)
}

export function getPaperDetail (id: string): Promise<MoocCeciResponseConfig<PaperConfig>> {
  return axios.get('/api/generator/paperfrom/' + id)
}
export function getPaperFile (ids: string): Promise<MoocDictCodeResponseConfig<PaperConfig>> {
  return axios.get('/api/system/file/paper/' + ids)
}

export function getCeciDetail (id: string): Promise<MoocCourseResponseConfig<CourseConfig[]>> {
  return axios.get('/api/generator/ceci/' + id)
}

export function getCourse (params: Record<any, any>): Promise<MoocCeciResponseConfig<CourseConfig[]>> {
  return axios.get('/api/generator/course', params)
}

export function getCourseDetail (id: string): Promise<MoocCourseResponseConfig<ResConfig[]>> {
  return axios.get('/api/generator/course/' + id)
}

export function getRes (params: Record<any, any>): Promise<MoocCeciResponseConfig<ResConfig[]>> {
  return axios.get('/api/generator/resource', params)
}
export function getResDetail (id: string): Promise<MoocCeciResponseConfig<ResLinkConfig[]>> {
  return axios.get('/api/generator/resource/' + id)
}
export function getDictCode (params: Record<any, any>): Promise<MoocDictCodeResponseConfig<DictCodeConfig[]>> {
  return axios.get('/api/system/dict_item/by/code', params)
}
export function getDictCodes (codes: string): Promise<MoocDictCodeResponseConfig<DictCodeConfig[]>> {
  return axios.get('/api/system/dict_item/codes/' + codes)
}
export function getDataCount (): Promise<ResponseConfig<DataCountConfig>> {
  return axios.get('/api/system/data_count')
}

export function getImages (thumbs: string, width: number) {
  return '//api.ke.video/get-image/' +
          btoa(thumbs + '?x-bce-process=image/format,f_webp/resize,m_lfit,w_' + width) + '/'
}
