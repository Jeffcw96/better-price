import { SearchInputInterface } from "@/config/types/getProductList"
import axios from "axios"


const uri = "https://shopee.com.my/api/v4/search/search_items"
export default class Shopee{
    keyword:string
    
    constructor(params:SearchInputInterface){
        this.keyword = params.q
    }

    processURL():string{
        let apiUri = uri + "?"
        apiUri += `by=$relavancy&`
        apiUri += `keyword=${encodeURI(this.keyword)}&`
        apiUri += `limit=40&`
        apiUri += `newest=0&`
        apiUri += 'page_type=search&scenerio=PAGE_GLOBAL_SEARCH&version=2'

        return apiUri
    }

    async getProductList(url:string){
        return await axios.get(url)
    }

}