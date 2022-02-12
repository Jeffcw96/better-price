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
        console.log("lazada application")
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

            model.setRequestStatus(true)
            await new Promise((resolve,_) =>{
                const queryInterval = setInterval(async()=>{
                    time = randomTime(4, 15)
                    const query = await model.getProductList(url)
                    if(query.success === true){  
                        clearInterval(queryInterval)                  
                        result = query.data
                        total_count = query.data.total_count
                        model.setRequestCall(Command.RESET)
                        model.setRequestStatus(false)
                        resolve("")
                    }else{
                        if(query.numberOfRequest >= 5){
                            model.setRequestStatus(false)
                            return new MaxProductQueryErrorException()
                        }
                    }
                },time)
            })

            console.log("outside lazada query")   

        } catch (error) {
           throw new FailToGetLazadaProductListException()
        }
    
        //Get closest category link
        const brandPath = model.getClosestBrandLink(result)        

        if(brandPath !== ""){
            try {
                /*
                    Todo:
                    need some postprocess for the url as currently it just contain a brunch of string
                */ 
                const brandUrl = model.processBrandUrl(brandPath)
                model.setRequestStatus(true)  
                await new Promise((resolve,_)=>{
                    const queryInterval = setInterval(async()=>{
                        time = randomTime(4, 15)
                        const brandSearchQuery = await model.getProductList(brandUrl)
        
                        if(brandSearchQuery.success === true){  
                            clearInterval(queryInterval)                  
                            result = brandSearchQuery.data
                            total_count = brandSearchQuery.data.total_count
                            model.setRequestCall(Command.RESET)
                            model.setRequestStatus(false)
                            resolve("")
                        }else{
                            if(brandSearchQuery.numberOfRequest >= 5){
                                model.setRequestStatus(false)
                                return new MaxProductBrandQueryErrorException()
                            }
                        }
                    },time)
                })                                             

            } catch (error) {
                throw new FailToGetLazadaProductListException()
            }
        }
        console.log("outside lazada brand query") 
        if(model.getRequestStatus() === false){            
            return model.processQueryData(result)
        }

    } catch (error) {
        return error
    }
}