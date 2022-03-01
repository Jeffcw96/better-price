import Exception from "@/utils/responseHandler/exception";
import { failToGetShopeeBrands } from "@/config/constant/exception/shopee";

export default class FailToGetShopeeBrandsException extends Exception{
    constructor(){
        super(failToGetShopeeBrands())
    }
}