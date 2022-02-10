import Model, {Command} from './model'
import {InvalidParamException} from '@/config/exception/common'
import { TypedRequestQuery } from '@/utils/requestHandler'
import randomTime from '@/utils/randomTime'
import { ProductListResponse } from '@/config/types/shopee'
import { LazadaProductList } from '@/config/types/lazada'

import { FailToGetLazadaProductListException,
    MaxProductQueryErrorException,
    MaxProductBrandQueryErrorException } from '@/config/exception/lazada'


export default async function getLazadaProduct(inputData:TypedRequestQuery<{q:string}>):Promise<ProductListResponse | any>{
    try {
        let time = randomTime(4, 15) //400ms to 1500ms
        let result:LazadaProductList = {}
        let total_count

        const model = new Model(inputData)

        //Execute API query
        try {
            const url = model.processURL()
            if(url === ""){
                return new InvalidParamException()
            }

            const queryInterval = setInterval(async()=>{
                time = randomTime(4, 15)
                const query = await model.getProductList(url)

                if(query.success === true){  
                    clearInterval(queryInterval)                  
                    result = query.data
                    total_count = query.data.total_count
                    model.setRequestCall(Command.RESET)

                }else{
                    if(query.numberOfRequest >= 5){
                        return new MaxProductQueryErrorException()
                    }
                }
            },time)
                   

        } catch (error) {
           throw new FailToGetLazadaProductListException()
        }
    
        //Get closest category link
        const brandUrl = model.getClosestBrandLink(result)
    
        if(brandUrl !== ""){
            try {
                /*
                    Todo:
                    need some postprocess for the url as currently it just contain a brunch of string
                */                
                const queryInterval = setInterval(async()=>{
                    time = randomTime(4, 15)
                    const brandSearchQuery = await model.getProductList(brandUrl)
    
                    if(brandSearchQuery.success === true){  
                        clearInterval(queryInterval)                  
                        result = brandSearchQuery.data
                        total_count = brandSearchQuery.data.total_count
                        model.setRequestCall(Command.RESET)
    
                    }else{
                        if(brandSearchQuery.numberOfRequest >= 5){
                            return new MaxProductBrandQueryErrorException()
                        }
                    }
                },time)
                

            } catch (error) {
                throw new FailToGetLazadaProductListException()
            }
        }
        
    
        return result

    } catch (error) {
        return error
    }
}