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

export interface MoocCeciResponseConfig<T> {
  code: number;
  msg?: string;
  result: { items: T; total: number};
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
