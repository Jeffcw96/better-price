import Exception from "@/utils/responseHandler/exception";
import { failToGetLazadaProductList } from "@/config/constant/exception/lazada";

export default class FailToGetLazadaProductListException extends Exception{
    constructor(){
        super(failToGetLazadaProductList())
    }
}