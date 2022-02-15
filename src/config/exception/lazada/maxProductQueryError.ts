import { maxProductQueryError } from "@/config/constant/exception/lazada";
import Exception from "@/utils/responseHandler/exception";

export default class MaxProductQueryErrorException extends Exception{
    constructor(){
        super(maxProductQueryError())
    }
}