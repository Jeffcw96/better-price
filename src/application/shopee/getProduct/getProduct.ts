import Model from './model'
import {InvalidParamException} from '@/config/exception/common'
import { FailToGetShopeeProductListException } from '@/config/exception/shopee'
import { TypedRequestQuery } from '@/utils/requestHandler'

export default async function getShopeeProduct(inputData:TypedRequestQuery<{q:string}>){
    try {
        let result
        const model = new Model(inputData)

        try {
            const url = model.processURL()

            if(url === ""){
                return new InvalidParamException()
            }

            result = await model.getProductList(url)

        } catch (error) {
           throw new FailToGetShopeeProductListException()
        }

        return result.data

    } catch (error) {
        return error
    }
}