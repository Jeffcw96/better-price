import Model from './model'
import {InvalidParamException} from '@/config/exception/common'
import { FailToGetLazadaProductListException } from '@/config/exception/lazada'
import { TypedRequestQuery } from '@/utils/requestHandler'
import randomTime from '@/utils/randomTime'
import { ProductListResponse } from '@/config/types/shopee'
import { LazadaProductList } from '@/config/types/lazada'


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
                    result = query.data
                    total_count = query.data.total_count

                }else{
                    if(query.numberOfRequest >= 5){
                        return 'Lazada Product API page got problem' //TBC to formatted error message
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
                    reset numberReqCall
                    try access the new endpoint again (repeatly try until success as how we do on above)
                */

                const brandSearchQuery = await model.getProductList(brandUrl)

            } catch (error) {
                // log the error message
            }
        }
        
    
        return result

    } catch (error) {
        return error
    }
}