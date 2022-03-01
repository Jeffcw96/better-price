import { Countries } from "../types/shopee"
const baseUrl = "https://shopee.com.my/api/v4/search"
export default{
    url:`${baseUrl}/search_items`,
    brandUrl: `${baseUrl}/search_filter_config`,
    converter:{
        [Countries.MY]:10000
    }
}