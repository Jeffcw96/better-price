import {Response} from 'express'
import { TypedRequestQuery } from '@/utils/requestHandler';
import responseHandler from '@/utils/responseHandler';
import shopee from "@/application/shopee";

export default async function getBrands(req:TypedRequestQuery<{ q: string, brand:string}>, res:Response){
    // const inputData = requestHandler(req)
    const result = await shopee.getBrands(req)    
    responseHandler(res,result)
}

