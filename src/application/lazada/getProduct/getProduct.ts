import Model from './model'
import {InvalidParamException} from '@/config/exception/common'
import { FailToGetLazadaProductListException } from '@/config/exception/lazada'
import { TypedRequestQuery } from '@/utils/requestHandler'
import { ProductListResponse } from '@/config/types/shopee'


export default async function getLazadaProduct(inputData:TypedRequestQuery<{q:string}>):Promise<ProductListResponse | any>{
    try {
        let result 
        let total_count

        const model = new Model(inputData)

        //Execute API query
        try {
            const url = model.processURL()
            if(url === ""){
                return new InvalidParamException()
            }
            const query = await model.getProductList(url)
            result = query.data
            total_count = query.data.total_count

        } catch (error) {
           throw new FailToGetLazadaProductListException()
        }

        //Get closest category link




        return result

    } catch (error) {
        return error
    }
}