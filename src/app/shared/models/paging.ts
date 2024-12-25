export interface Pagination<T>{
    totalRecords : number,
    totalPages : number,
    pageIndex : number,
    pageSize : number,
    data : T
}

export class PagingParams{
    pageIndex = 1;
    pageSize = 8;
}
