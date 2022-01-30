import Model from './model'
import { FailToGetShopeeProductListException } from '@/config/exception/shopee'
import { RequestInputInterface } from '@/utils/requestHandler'
import { SearchInputInterface } from '@/config/types/getProductList'

export default async function getShopeeProduct(inputData:any){
    try {
        let result
        const model = new Model(inputData)

        try {
            const url = model.processURL()
            result = await model.getProductList(url)
        } catch (error) {
           throw new FailToGetShopeeProductListException()
        }

        return result

    } catch (error) {
        return error
    }
}