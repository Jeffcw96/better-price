import {Request,Response} from 'express'
import requestHandler from '@/utils/requestHandler';
import responseHandler from '@/utils/responseHandler';
import shopee from "@/application/shopee";
import { TypedRequestQuery } from '@/utils/requestHandler';


export default async function getProductList(req:TypedRequestQuery<{ q: string}>, res:Response){
    // const inputData = requestHandler(req)
    const result = await shopee.getProduct(req)
    responseHandler(res,result)
}

