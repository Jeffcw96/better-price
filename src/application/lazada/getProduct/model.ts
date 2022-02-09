import axios from "axios"
import stringSimilarity from 'string-similarity'
import { TypedRequestQuery } from "@/utils/requestHandler"
import { LazadaProductList , Filter} from "@/config/types/lazada"
import config from '@/config/constant/lazada'


enum Command{
    INCR  = 'incr',
    DECR  = 'decr',
    RESET = 'reset',
}

export default class Lazada{
    keyword:string
    numberOfRequestCall:number
    
    constructor(request:TypedRequestQuery<{q:string}>){
        this.keyword = request.query.q
        this.numberOfRequestCall = 0
    }

    async getProductList(url:string){
        this.setRequestCall(Command.INCR)        
        const errorField = 'rgv587_flag'        
        const result = await axios.get(url, {
            headers: config.uri_headers
        })

        return {
            success: result.data.hasOwnProperty(errorField) ? false : true,
            data: result.data,
            numberOfRequest:this.numberOfRequestCall
        }

    }

    setRequestCall(command:Command){
        if(command === Command.INCR){
            this.numberOfRequestCall++

        }else if(command === Command.DECR){
            this.numberOfRequestCall++

        }else if(command === Command.RESET){
            this.numberOfRequestCall = 0
        }
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

    getClosestBrandLink(products:LazadaProductList):string{        
        if(!products.mods || !products.mods.filter || !products.mods.filter.filterItems){
            return ""
        }

        const filterItems = products.mods.filter.filterItems

        if(filterItems.length === 0){
            return ""
        }
        
        // to do filter the brand filter type here then return the object
        // loop through the options title and use stringSimilarity.compareTwoStrings to get the higher ranked between search keyword and brand title
        const brandInfo = filterItems.find(item =>{
            return item.name === 'brand' || item.type === 'brand'
        })

        if(!brandInfo || brandInfo === undefined){
            return ""            
        }
        
        const brands = brandInfo.options.reduce<string[]>((acc,val)=>{
            if(val.title){
                return [...acc, val.title]
            }else if(val.value){
                return [...acc, val.value]
            }
            return acc

        },[])

        const {bestMatch, bestMatchIndex} = stringSimilarity.findBestMatch(this.keyword, brands)

        console.log('bestMatch',bestMatch)
        console.log('bestMatchIndex',bestMatchIndex)
        console.log('brandInfo.options[bestMatchIndex]',brandInfo.options[bestMatchIndex].value)
        
        return brandInfo.options[bestMatchIndex].value || ""

    }
 
}