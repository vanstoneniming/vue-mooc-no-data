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
export interface QuestionrowConfig {
  id: number;
  qrquestion: string;
  isExpanded: boolean;
}
export interface QuestionConfig {
  id: number;
  question: string;
  questionrow: number;
}
export interface PaperConfig {
  id: number;
  papername: string;
  url: string;
  name: string;
  size: number;
  previewimages: string;
  paperfile: string;
  papercontent: string;
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
  label: string;
  value: string;
  code: string;
}
export interface CodeOptionsConfig {
  label: string;
  value: string;
}

// Define the type for dictCodeOptions
interface DictCodeOption {
  label: string;
  value: string;
  data: CodeOptionsConfig[];
}

// Define the type for the entire dictCodeOptions object
export interface DictCodeOptions {
  [key: string]: DictCodeOption;
}

export interface ResLinkConfig {
  id: number;
  title: string;
  storages: string;
}

// login or register参数
export interface LoginParams {
  account: string;
  password: string;
  name?: string;
}

// userInfo类型
export interface UserInfo {
  id: string | number;
  avatar?: string;
  name?: string;
  username?: string;
  nickname?: string;
  experience?: string;
  points?: string;
  job?: string;
  integral?: number | string;
  exp?: number | string;
  city?: string;
  gender?: number | string;
  update_datetime?: string;
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
  email: string;
  email_verify_status: boolean;
  mobile: string;
  mobile_verify_status: boolean;
}
// binding 类型
export interface DonateConfig {
  QRcode_url: string;
  code_url: string;
  donate_id: string;
}
export interface DonatePayConfig {
  pay_status: number;
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
  'course': number;
  'ceci': number;
  'resource': number;
  'resUrl': number;
  'questionRow': number;
  'question': number;
  'paper': number;
}

// address 类型
export interface AddressConfig {
  id: string;
  name: string;
  mobile: string;
  address: string;
  postcode: string;
  isDefault: boolean;
}
