import { SearchInputInterface } from "@/config/types/getProductList"
import axios from "axios"
import { TypedRequestQuery } from "@/utils/requestHandler"

const uri = "https://shopee.com.my/api/v4/search/search_items"

export default class Shopee{
    keyword:string | null
    
    constructor(request:TypedRequestQuery<{q:string}>){
        this.keyword = request.query.q
    }

    processURL():string{
        if(this.keyword && this.keyword.length !== 0){
            let apiUri = uri + "?"
            apiUri += `by=relavancy&`
            apiUri += `keyword=${encodeURI(this.keyword)}&`
            apiUri += `limit=40&`
            apiUri += `newest=0&`
            apiUri += 'page_type=search&scenerio=PAGE_GLOBAL_SEARCH&version=2'
            return apiUri
        }
        return ""
    }

    async getProductList(url:string){
        return await axios.get(url)
    }

}