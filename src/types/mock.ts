// header导航数组类型
export interface NavConfig {
  title: string;
  url?: string;
}

// footer链接数组类型
export interface FooterLinkConfig extends NavConfig {
  target?: string;
}

// sidebar数组类型
export interface SidebarItemConfig extends NavConfig {
  icon: string;
}

export interface CourseConfig {
  id: number;
  title: string;
  ceci_name: string;
  teachers: string;
  year: string;
}
export interface CeciConfig {
  id: number;
  title: string;
  edition: string;
  grade: string;
  period: string;
  platform: string;
  subject: string;
  term: string;
}
export interface ResConfig {
  id: number;
  title: string;
}
export interface DictCodeConfig {
  id: number;
  label: string;
  value: string;
  sort: number;
  status: boolean;
}
export interface CodeOptionsConfig {
  label: string;
  value: string;
}

export interface ResLinkConfig {
  id: number;
  title: string;
  storages: string;
}

// login or register参数
export interface LoginParams {
  username: string;
  password: string;
}

// userInfo类型
export interface UserInfo {
  id: string | number;
  avatar?: string;
  nickname?: string;
  job?: string;
  integral?: number | string;
  exp?: number | string;
  city?: string;
  signature?: string;
  notice?: number | string;
  latest?: any;
}

// notice通知类型
export interface NoticeConfig {
  isRead: boolean;
  code: number;
  title: string;
  time: string;
}

// binding 类型
export interface BindingConfig {
  email?: string;
  phone?: string;
  password?: boolean;
}

// log 类型
export interface LogConfig {
  type: string;
  time: string;
  city: string;
  ip: string;
  device: string;
  system: string;
}

export interface DataCountConfig {
  'course_count': number;
  'ceci_count': number;
  'resource_count': number;
  'resource_url_count': number;
}

// address 类型
export interface AddressConfig {
  id: string;
  name: string;
  phone: string;
  address: string;
  postcode: string;
  isDefault: boolean;
}
