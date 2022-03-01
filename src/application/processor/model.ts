import { ProductListResponse as ShopeeProductList } from "@/config/types/shopee";
import { ProductListResponse as LazadaProductList } from "@/config/types/lazada";
import { compareTwoStrings } from "string-similarity";

export default class Processor{
    lazada:{products:LazadaProductList[], brands:string[]}
    shopee:ShopeeProductList[]

    constructor(lazada:{products:LazadaProductList[], brands:string[]},shopee:ShopeeProductList[]){
        this.lazada = lazada
        this.shopee = shopee
    }

    getLazadaIndexAdjustment(){
        console.time("process")
        let lazadaRanking:number[] = []
        this.lazada.products.forEach((val)=>{
            let tempRankObject:{[k:number]: number} = {}
            for(let i =0; i< this.shopee.length; i++){
                const shopeeProduct = this.shopee[i]
                const rank = compareTwoStrings(val.name,shopeeProduct.name) * 100
                tempRankObject[i] = rank
            }

            /*
                update object with {index: rank}
                If current closestShopeeIndex is being called/ used in previous process.
                use the second/ following rank
            */
            const sortedRankIndex = this.sortRankByIndex(tempRankObject)
            for(let index of sortedRankIndex){
                if(lazadaRanking.includes(index)){
                    continue
                }
                lazadaRanking.push(index)
                break
            }
        })

        console.timeEnd("process")
        return lazadaRanking
    }

    sortRankByIndex(object:{[k:number]: number}){
        /*
            Object payload:
                {
                    {
                        [index] : rank value from compare naming
                    },
                    {
                        xxxx
                    }
                }
        */
        const result = Object
                        .entries(object) 
                        .sort((a, b) => { return b[1] - a[1]}) // sort the array [[index, rank], [index, rank]] with rank value
                        .reduce((acc:number[],[index,_])=>{ //only cares about their index in order to do deduplication
                            return [...acc,parseInt(index)]
                        },[])

        return result
    }


    arrangeProductIndex(lazada:LazadaProductList[], indexArr:number[]){
        let mappedProducts:LazadaProductList[] = Array(indexArr.length).fill(null)

        for(let index of indexArr){            
            mappedProducts[index] = lazada[index]
        }

        return mappedProducts
    }

}