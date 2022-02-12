export type ShopeeProductApiType = {
    sort   : SortBy,
    q      : string,
    page   : number,
    limit  : 40,
    ajax   : 'true',
    _keyori: 'ss',
    from   : 'input' | 'search_history'
}

export enum SortBy {
    POPULARITY = 'popularity',
    PRICE_ASC  = 'priceasc',
    PRICE_DESC = 'pricedesc'
}

export interface LazadaProductList{
    mods?:{
        filter:{
            tItemType  : string,
            filterItems: Filter[]
        },
        listItems: ListItem[]
    }
}

export interface Filter{
    options      : FilterOption[]
    name         ?: string
    title        ?: string
    type         ?: string
}

export interface FilterOption{
    value ?: string
    title ?: string
    url   ?: string
    id    ?: string
    order ?: number
}


export interface ListItem{
    name             : string
    image            : string
    productUrl       : string
    originalPrice    : string
    originalPriceShow: string
    price            : string
    priceShow        : string
    discount         : string
    ratingScore      : string
    review           : string
}

export interface ProductListResponse{
    name             : string
    image            : string
    productUrl       : string
    originalPrice    : number
    price            : number
    discount         : string
    rating           : number
}
