export type ShopeeProductApiType = {
    by: SortBy,
    keyword:string,
    limit:number,
    newest:number,
    page_search:'search',
    scenario:'PAGE_GLOBAL_SEARCH',
    version:2
}

export enum SortBy {
    RELAVANT = 'relevancy',
    CTIME = 'CTIME',
    SALES = 'sales'
}