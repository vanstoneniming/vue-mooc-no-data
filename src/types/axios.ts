export interface MoocResponseConfig<T> {
  code: number;
  msg?: string;
  data: T;
}
export interface ResponseConfig<T> {
  code: number;
  message: string;
  result: T;
}

export interface ResolveResponseConfig {
  code: number;
  message: string;
  result: { resolve_result: string };
}

export interface MoocCeciResponseConfig<T> {
  code: number;
  msg?: string;
  result: { items: T; total: number};
}
export interface MoocDictCodeResponseConfig<T> {
  code: number;
  message?: string;
  result: T;
}
export interface MoocCourseResponseConfig<T> {
  code: number;
  msg?: string;
  result: { items: T; total: number } ;
}

export interface MoocListResponseConfig<T> {
  list: T[];
  total: number;
}
