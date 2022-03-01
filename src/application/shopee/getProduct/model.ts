import axios from "@/utils/axios"
import { Provider } from "@/utils/axios"
import { TypedRequestQuery } from "@/utils/requestHandler"
import { ShopeeProductList, ProductListResponse,ItemPrice} from "@/config/types/shopee"
import config from '@/config/constant/shopee'

const request = axios(Provider.SHOPEE)
export default class Shopee{
    keyword:string | null
    
    constructor(request:TypedRequestQuery<{q:string, brand:string}>){
        this.keyword = request.query.q
    }

    async getProductList(url:string){
        return await request.get(url)
    }

    processURL():string{
        if(this.keyword && this.keyword.length !== 0){
            let apiUri = config.uri + "?"
            apiUri += `by=relavancy&`
            apiUri += `keyword=${encodeURI(this.keyword)}&`
            apiUri += `limit=40&`
            apiUri += `newest=0&`
            apiUri += 'page_type=search&scenerio=PAGE_GLOBAL_SEARCH&version=2'
            return apiUri
        }
        return ""
    }

    processPrice(priceInfo:any):any{
        return Object.keys(priceInfo).reduce((acc,info: string) =>{
            //some product might not have discounted value
            if(priceInfo[info] !== -1){
                return {...acc, [info]: Math.round(priceInfo[info] / config.converter.MY).toFixed(2)} 
            }

            return acc
                        
        }, {})
        
    }

    infoMapping(products:ShopeeProductList):ProductListResponse[]{
        return products.items.reduce((acc:any,item)=>{
            const { item_basic:
                    {
                        name, 
                        image, 
                        price_min, 
                        price_max,
                        price_min_before_discount,
                        price_max_before_discount,
                        discount,
                        currency,
                        sold,
                        item_rating,
                        has_lowest_price_guarantee}} = item

            const rating = item_rating.rating_star
            const priceInfo = this.processPrice({price_min, price_max, price_min_before_discount, price_max_before_discount })
                    
            
            const price = {
                currency,
                min:priceInfo.price_min,
                max:priceInfo.price_max,
                before_discount_min:priceInfo.price_min_before_discount,
                before_discount_max:priceInfo.price_max_before_discount
            }

            return [...acc , {
                name,
                image,
                price,
                rating,
                discount,
                sold,
                is_lowest_price: has_lowest_price_guarantee
            }]
        },[])
    }    
}