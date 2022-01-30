export type ShopeeProductApiType = {
    by         : SortBy,
    keyword    : string,
    limit      : number,
    newest     : number,
    page_search: 'search',
    scenario   : 'PAGE_GLOBAL_SEARCH',
    version    : 2
}

export enum Countries{
    MY = 'MY'
}

export enum SortBy {
    RELAVANT = 'relevancy',
    CTIME    = 'CTIME',
    SALES    = 'sales'
}

export interface ShopeeProductList{
    items: ProductInfo[]
}

export interface ProductListResponse{
    name           : string
    image          : string
    price          : ProductPrice
    is_lowest_price: boolean
    discount       : string
    sold           : number
    rating         : number
}

export interface ItemPrice{
    price_min                 : number
    price_max                 : number
    price_min_before_discount : number
    price_max_before_discount : number    
}

interface ProductPrice{
    currency           : string
    min                : string
    max                : string
    before_discount_min: string
    before_discount_max: string
}

interface ProductInfo{
    item_basic : ItemBasic
    match_type : number
    ads_keyword: string
    itemid     : number
    shopid     : number
}

export interface ItemBasic{
    itemid                    : number
    shopid                    : number
    name                      : number
    label_ids                 : number[]
    image                     : string
    images                    : string[]
    currency                  : string
    stock                     : number
    status                    : number
    ctime                     : number
    sold                      : number
    historical_sold           : number
    liked                     : string
    liked_count               : number
    view_count                : number
    catid                     : number
    brand                     : string
    cmt_count                 : number
    flag                      : number
    cb_option                 : number
    item_status               : string
    price                     : number
    price_min                 : number
    price_max                 : number
    price_min_before_discount : number
    price_max_before_discount : number
    price_before_discount     : number
    has_lowest_price_guarantee: boolean
    show_discount             : number
    raw_discount              : number
    discount                  : string
    is_category_failed        : boolean
    video_info_list           : Video[]
    tier_variations           : Variation[]
    item_rating               : Rating
    vouncher_info             : Voucher

}

type Video = {
    video_id : string
    thumb_url: string
    duration : number
    version  : number
    vid      : string
}

type Variation = {
    name   : string
    options: string[]
    images : string[]
}

type Rating = {
    rating_star        : number
    rating_count       : number[]
    rcount_with_context: number
    rcount_with_image  : number
}

type Voucher = {
    promotion_id: number
    voucher_code: string
    label       : string
}