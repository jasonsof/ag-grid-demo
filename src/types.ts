export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface DataGridMeta {
  page: number;
  pages: number;
  count: number;
}

export interface DataGridResponse<T> {
  data: T[];
  meta: DataGridMeta;
}
