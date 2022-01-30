import { Countries } from "../types/shopee"

export default{
    uri:"https://shopee.com.my/api/v4/search/search_items",
    converter:{
        [Countries.MY]:10000
    }
}