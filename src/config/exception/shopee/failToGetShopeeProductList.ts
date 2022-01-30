import Exception from "@/utils/responseHandler/exception";
import { failToGetShopeeProductList } from "@/config/constant/exception/shopee";

export default class FailToGetShopeeProductListException extends Exception{
    constructor(){
        super(failToGetShopeeProductList())
    }
}