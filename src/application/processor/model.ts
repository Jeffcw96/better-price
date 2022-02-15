import { ProductListResponse as ShopeeProductList } from "@/config/types/shopee";
import { ProductListResponse as LazadaProductList } from "@/config/types/lazada";
import { compareTwoStrings } from "string-similarity";

export default class Processor{
    lazada:LazadaProductList[]
    shopee:ShopeeProductList[]

    constructor(lazada:LazadaProductList[],shopee:ShopeeProductList[]){
        this.lazada = lazada
        this.shopee = shopee
    }

    getLazadaIndexAdjustment(){
        const lazadaRanking = this.lazada.reduce((acc:number[],val,ind)=>{
            let closestShopeeIndex = 0
            let highestRank = 0
            for(let i =0; i< this.shopee.length; i++){
                const shopeeProduct = this.shopee[i]
                const rank = compareTwoStrings(val.name,shopeeProduct.name) * 100
                
                console.log(`current rank => ${rank} | highest rank => ${highestRank}`)
                if(rank > highestRank){
                    highestRank = rank
                    closestShopeeIndex = ind
                }
            }
            return [...acc,closestShopeeIndex]
        },[])

        return lazadaRanking
    }

}