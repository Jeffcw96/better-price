import {Request,Response} from 'express'
import requestHandler from '@/utils/requestHandler';
import responseHandler from '@/utils/responseHandler';
import shopee from "@/application/shopee";

export default async function getProductList(req:Request, res:Response){
    const inputData = requestHandler(req)
    const result = await shopee.getProduct(inputData)
    responseHandler(res,result)
}

