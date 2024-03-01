export interface MoocResponseConfig<T> {
  code: number;
  msg?: string;
  data: T;
}

export interface MoocCeciResponseConfig<T> {
  code: number;
  msg?: string;
  result: { items: T };
}

export interface MoocListResponseConfig<T> {
  list: T[];
  total: number;
}
