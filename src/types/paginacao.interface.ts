export interface Metadata {
  total: number,
  perPage: number,
  currentPage: number;
  lastPage: number;
  firstPage: number;
  firstPageUrl: string;
  lastPageUrl: string;
  nextPageUrl: string | null;
  previewsPageUrl: string | null;
}

export interface Paginacao<T>{
  data: T[],
  metadata: Metadata;
}