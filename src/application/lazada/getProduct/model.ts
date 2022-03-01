import axios from "@/utils/axios"
import { Provider } from "@/utils/axios"
import stringSimilarity from 'string-similarity'
import { TypedRequestQuery } from "@/utils/requestHandler"
import { LazadaProductList , Filter} from "@/config/types/lazada"
import config from '@/config/constant/lazada'
import { ProductListResponse } from "@/config/types/lazada"

const request = axios(Provider.LAZADA)
export enum Command{
    INCR  = 'incr',
    DECR  = 'decr',
    RESET = 'reset',
}

export default class Lazada{
    keyword:string
    isRequestProcessing:boolean
    numberOfRequestCall:number
    
    constructor(request:TypedRequestQuery<{q:string, brand:string}>){
        this.keyword = request.query.q
        this.numberOfRequestCall = 0
        this.isRequestProcessing = false
    }

    async getProductList(url:string){
        this.setRequestCall(Command.INCR)        
        const errorField = 'rgv587_flag'        
        const result = await request.get(url, {
            headers: config.uriHeaders
        })

        return {
            success: result.data.hasOwnProperty(errorField) ? false : true,
            data: result.data,
            numberOfRequest:this.numberOfRequestCall
        }

    }

    getRequestStatus():boolean{
        return this.isRequestProcessing
    }

    setRequestStatus(flag:boolean){
        return this.isRequestProcessing = flag
    }

    setRequestCall(command:Command):void{
        if(command === Command.INCR){
            this.numberOfRequestCall++

        }else if(command === Command.DECR){
            this.numberOfRequestCall++

        }else if(command === Command.RESET){
            this.numberOfRequestCall = 0
        }
    }

    processQueryData(query:LazadaProductList):{products:ProductListResponse[], brands:string[]}{
        if(!query.mods || !query.mods.listItems){
            return {products:[], brands:[]}
        }

        const products = query.mods.listItems
        const processedProducts = products.reduce((acc:any,product)=>{
            const {
                name,
                image,
                productUrl,
                originalPrice,
                price,
                discount,
                ratingScore
            } = product

            const processedOriginalPrice =  originalPrice ? parseFloat(originalPrice) : 0.00
            const processedPrice = price ? parseFloat(price) : 0.00
            const processedRating = ratingScore ? parseFloat(ratingScore) : -1

            return [...acc,{
                name,
                image,
                productUrl:`https:${productUrl}`,
                originalPrice: processedOriginalPrice,
                price: processedPrice,
                discount,
                rating: processedRating
            }]

        },[])

        return {products: processedProducts, brands:this.processBrandData(query)}
    }

    processBrandData(products:LazadaProductList):string[]{
        const filterItems = products?.mods?.filter?.filterItems || []

        if(!filterItems || filterItems.length === 0){
            return []
        }

        // to do filter the brand filter type here then return the object
        // loop through the options title and use stringSimilarity.compareTwoStrings to get the higher ranked between search keyword and brand title
        const brandInfo = filterItems.find(item =>{
            return item.name === 'brand' || item.type === 'brand'
        })

        if(!brandInfo || brandInfo === undefined){
            return []            
        }
        
        const brands = brandInfo.options.reduce<string[]>((acc,val)=>{
            if(val.title){
                return [...acc, val.title]
            }else if(val.value){
                return [...acc, val.value]
            }
            return acc

        },[])

        return brands
    }

    processURL():string{
        if(this.keyword && this.keyword.length !== 0){
            let apiUri = config.catalogUri + "?"
            apiUri += `q=${encodeURI(this.keyword)}&`
            apiUri += `limit=40&`            
            apiUri += 'ajax=true&from=input&_keyori=ss&sort=popularity'
            return apiUri
        }
        return ""
    }

    processBrandUrl(brandUrl:string):string{
        return `${config.baseUri}/${brandUrl}/?q=${encodeURI(this.keyword)}&limit=40&from=input&ajax=true`      
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
        
        return (bestMatch.rating >= 0.75) ? brandInfo.options[bestMatchIndex].value || "" : ""

    }
 
}