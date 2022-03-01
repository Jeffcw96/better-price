import axios from "@/utils/axios"
import { Provider } from "@/utils/axios"
import { TypedRequestQuery } from "@/utils/requestHandler"
import { ShopeeProductList, ProductListResponse,ItemPrice} from "@/config/types/shopee"
import config from '@/config/constant/shopee'

const request = axios(Provider.SHOPEE)
export default class Shopee{
    keyword:string | null
    
    constructor(request:TypedRequestQuery<{q:string, brand:string}>){
        this.keyword = request.query.q
    }

    async getProductList(url:string){
        return await request.get(url)
    }

    processURL():string{
        if(this.keyword && this.keyword.length !== 0){
            let apiUrl = config.brandUrl + "?"
            apiUrl += `keyword=${encodeURI(this.keyword)}&`
            apiUrl += `page_type=search`

            return apiUrl
        }
        return ""
    }

    getBrandOptions(results:{[k:string]:any}){
        const brands = results?.data?.filter_configuration?.dynamic_filter_group_data?.brands || []
        return brands

    }
}