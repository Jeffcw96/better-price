import { maxProductBrandQueryError } from "@/config/constant/exception/lazada";
import Exception from "@/utils/responseHandler/exception";

export default class MaxProductBrandQueryErrorException extends Exception{
    constructor(){
        super(maxProductBrandQueryError())
    }
}