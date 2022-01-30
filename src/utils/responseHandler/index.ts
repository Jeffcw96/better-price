import {Response} from "express"
import generateResponseData from "./generateResponseData";

export default function responseHandler(res:Response, result:any){
    const {responseStatusCode,responseData} = generateResponseData(result)
    res.status(responseStatusCode).send(responseData)
    return
}