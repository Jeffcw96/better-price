import { ProductListResponse as ShopeeProductList } from "@/config/types/shopee";
import { ProductListResponse as LazadaProductList } from "@/config/types/lazada";
import Model from './model'

export default async function processor(products:{shopee:ShopeeProductList[], lazada:{products:LazadaProductList[], brands:string[]}}){
    try {
        const {shopee, lazada} = products
        const model = new Model(lazada,shopee)
        const lazadaProductIndexAdjustments = model.getLazadaIndexAdjustment()        
        const mappedLazadaRankProduct = model.arrangeProductIndex(lazada.products,lazadaProductIndexAdjustments)

        return {products:mappedLazadaRankProduct, brands: lazada.brands}
    } catch (error) {
        return error
    }
}