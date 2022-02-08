import axios from "axios"
import { TypedRequestQuery } from "@/utils/requestHandler"
import { ShopeeProductList, ProductListResponse,ItemPrice} from "@/config/types/shopee"
import config from '@/config/constant/lazada'


export default class Lazada{
    keyword:string | null
    
    constructor(request:TypedRequestQuery<{q:string}>){
        this.keyword = request.query.q
    }

    async getProductList(url:string){
        return await axios.get(url)
    }

    processURL():string{
        if(this.keyword && this.keyword.length !== 0){
            let apiUri = config.uri + "?"
            apiUri += `q=${encodeURI(this.keyword)}&`
            apiUri += `limit=40&`            
            apiUri += 'ajax=true&from=input&_keyori=ss&sort=popularity'
            return apiUri
        }
        return ""
    }
 
}