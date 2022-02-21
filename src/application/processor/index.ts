import { ProductListResponse as ShopeeProductList } from "@/config/types/shopee";
import { ProductListResponse as LazadaProductList } from "@/config/types/lazada";
import Model from './model'

export default async function processor(products:{shopee:ShopeeProductList[], lazada:LazadaProductList[]}){
    try {
        const {shopee, lazada} = products
        const model = new Model(lazada,shopee)
        const lazadaProductIndexAdjustments = model.getLazadaIndexAdjustment()        
        console.log("index adjustment", lazadaProductIndexAdjustments)
        const mappedLazadaRankProduct = model.arrangeProductIndex(lazada,lazadaProductIndexAdjustments)
        return mappedLazadaRankProduct
    } catch (error) {
        
    }
}