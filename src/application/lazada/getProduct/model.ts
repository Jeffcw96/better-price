import axios from "axios"
import { TypedRequestQuery } from "@/utils/requestHandler"
import { LazadaProductList , Filter} from "@/config/types/lazada"
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

    getProductBrand(products:LazadaProductList){
        if(!products.mods || !products.mods.filter || !products.mods.filter.filterItems){
            return {}
        }

        const filterItems = products.mods.filter.filterItems

        if(filterItems.length === 0){
            return {}
        }

        // to do filter the brand filter type here then return the object
        // loop through the options title and use stringSimilarity.compareTwoStrings to get the higher ranked between search keyword and brand title



    }
 
}