import {Request,Response} from 'express'
import requestHandler from '@/utils/requestHandler';
import responseHandler from '@/utils/responseHandler';
import shopee from "@/application/shopee";
import lazada from '@/application/lazada';
import { TypedRequestQuery } from '@/utils/requestHandler';


export default async function getProductList(req:TypedRequestQuery<{ q: string}>, res:Response){
    // const inputData = requestHandler(req)
    const [shopeeResult, lazadaResult] = await Promise.all([shopee.getProduct(req),lazada.getProduct(req)])
    responseHandler(res,{shopee:shopeeResult, lazada:lazadaResult})
}

