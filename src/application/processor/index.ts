import { ProductListResponse as ShopeeProductList } from "@/config/types/shopee";
import { ProductListResponse as LazadaProductList } from "@/config/types/lazada";
import Model from './model'

export default async function processor(products:{shopee:ShopeeProductList[], lazada:LazadaProductList[]}){
    try {
        const model = new Model(products.lazada,products.shopee)
        const lazadaProductIndexAdjustments = model.getLazadaIndexAdjustment()
        console.log("index adjustment", lazadaProductIndexAdjustments)

    } catch (error) {
        
    }
}