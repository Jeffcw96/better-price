import Model from './model'
import {InvalidParamException} from '@/config/exception/common'
import { FailToGetShopeeProductListException } from '@/config/exception/shopee'
import { TypedRequestQuery } from '@/utils/requestHandler'
import { ProductListResponse } from '@/config/types/shopee'

export default async function getShopeeProduct(inputData:TypedRequestQuery<{q:string}>):Promise<ProductListResponse | any>{
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
           throw new FailToGetShopeeProductListException()
        }

        //Mapping
        result = model.infoMapping(result)



        return result

    } catch (error) {
        return error
    }
}