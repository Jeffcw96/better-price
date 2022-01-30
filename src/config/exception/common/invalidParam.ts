import Exception from "@/utils/responseHandler/exception";
import { invalidParam } from "@/config/constant/exception/common";

export default class InvalidParamException extends Exception{
    constructor(){
        super(invalidParam())
    }
}